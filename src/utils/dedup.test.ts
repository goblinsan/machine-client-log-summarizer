import { describe, it, expect } from 'vitest';
import { deduplicationTracker } from './dedup';
import { computeHash } from './hash';

describe('Deduplication Tracker', () => {
  const baseInput = {
    ts: '2024-01-01T00:00:00Z',
    msg: 'test message',
    persona: 'agent',
    workflowId: 'wf-123',
    corrId: 'corr-456',
    preview_raw: 'test preview data',
  };

  describe('processRecord', () => {
    it('identifies first occurrence as unique', () => {
      const result = deduplicationTracker.processRecord(baseInput);
      expect(result.isDuplicate).toBe(false);
      expect(result.hash.length).toBe(64); // SHA-256 hex
    });

    it('identifies subsequent occurrences as duplicates', () => {
      deduplicationTracker.processRecord(baseInput);
      const result = deduplicationTracker.processRecord(baseInput);
      expect(result.isDuplicate).toBe(true);
    });

    it('produces consistent hashes for identical inputs', () => {
      const hash1 = computeHash(baseInput);
      const hash2 = computeHash(baseInput);
      expect(hash1).toBe(hash2);
    });

    it('handles missing fields gracefully', () => {
      const minimalInput = {};
      const result = deduplicationTracker.processRecord(minimalInput);
      expect(result.isDuplicate).toBe(false);
      expect(result.hash.length).toBe(64);
    });
  });

  describe('processBatch', () => {
    it('handles empty arrays', () => {
      const result = deduplicationTracker.processBatch([]);
      expect(result.stats.totalRecords).toBe(0);
      expect(result.stats.uniqueRecords).toBe(0);
      expect(result.stats.duplicateRecords).toBe(0);
    });

    it('handles all duplicates', () => {
      const records = [baseInput, baseInput, baseInput];
      const result = deduplicationTracker.processBatch(records);
      expect(result.stats.totalRecords).toBe(3);
      expect(result.stats.uniqueRecords).toBe(1);
      expect(result.stats.duplicateRecords).toBe(2);
    });

    it('handles no duplicates', () => {
      const records = [
        { ...baseInput, msg: 'message one' },
        { ...baseInput, msg: 'message two' },
        { ...baseInput, msg: 'message three' },
      ];
      const result = deduplicationTracker.processBatch(records);
      expect(result.stats.totalRecords).toBe(3);
      expect(result.stats.uniqueRecords).toBe(3);
      expect(result.stats.duplicateRecords).toBe(0);
    });

    it('handles mixed duplicates and unique records', () => {
      const records = [
        baseInput,
        { ...baseInput, msg: 'different' },
        baseInput,
        { ...baseInput, msg: 'another' },
        baseInput,
      ];
      const result = deduplicationTracker.processBatch(records);
      expect(result.stats.totalRecords).toBe(5);
      expect(result.stats.uniqueRecords).toBe(2);
      expect(result.stats.duplicateRecords).toBe(3);
    });

    it('tracks seen hashes across multiple batches', () => {
      const batch1 = [baseInput];
      const batch2 = [baseInput];

      deduplicationTracker.processBatch(batch1);
      const result = deduplicationTracker.processBatch(batch2);

      expect(result.stats.uniqueRecords).toBe(0);
      expect(result.stats.duplicateRecords).toBe(1);
    });

    it('handles large datasets efficiently', () => {
      const records = Array.from({ length: 1000 }, (_, i) => ({
        ...baseInput,
        msg: `message ${i}`,
      }));
      const result = deduplicationTracker.processBatch(records);
      expect(result.stats.totalRecords).toBe(1000);
      expect(result.stats.uniqueRecords).toBe(1000);
      expect(result.stats.duplicateRecords).toBe(0);
    });
  });

  describe('reset', () => {
    it('clears seen hashes', () => {
      deduplicationTracker.processRecord(baseInput);
      deduplicationTracker.processRecord(baseInput);
      expect(deduplicationTracker.seenHashes.size).toBe(1);

      deduplicationTracker.reset();
      expect(deduplicationTracker.seenHashes.size).toBe(0);
    });

    it('allows re-processing after reset', () => {
      deduplicationTracker.processRecord(baseInput);
      deduplicationTracker.reset();
      const result = deduplicationTracker.processRecord(baseInput);
      expect(result.isDuplicate).toBe(false);
    });
  });
});