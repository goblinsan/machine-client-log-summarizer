import { describe, it, expect } from 'vitest';
import { computeHash, isDuplicate, markSeen, getSeenCount } from './hash';

describe('Hash Utility', () => {
  const baseInput = {
    ts: '2024-01-01T00:00:00Z',
    msg: 'test message',
    persona: 'agent',
    workflowId: 'wf-123',
    corrId: 'corr-456',
    preview_raw: 'test preview data',
  };

  it('computes deterministic hash for identical inputs', () => {
    const hash1 = computeHash(baseInput);
    const hash2 = computeHash(baseInput);
    expect(hash1).toBe(hash2);
  });

  it('produces different hashes for different inputs', () => {
    const input1 = { ...baseInput, msg: 'message one' };
    const input2 = { ...baseInput, msg: 'message two' };
    expect(computeHash(input1)).not.toBe(computeHash(input2));
  });

  it('truncates preview_raw to 512 characters before hashing', () => {
    const longPreview = 'a'.repeat(1000);
    const input = { ...baseInput, preview_raw: longPreview };
    const hash1 = computeHash(input);
    const hash2 = computeHash({ ...baseInput, preview_raw: longPreview.substring(0, 512) });
    expect(hash1).toBe(hash2);
  });

  it('handles missing fields gracefully', () => {
    const minimalInput = {};
    const hash = computeHash(minimalInput);
    expect(hash).toBeDefined();
    expect(hash.length).toBe(64); // SHA-256 hex output
  });

  it('detects duplicates correctly', () => {
    const seenHashes = new Set<string>();
    const hash = computeHash(baseInput);
    expect(isDuplicate(hash, seenHashes)).toBe(false);
    markSeen(hash, seenHashes);
    expect(isDuplicate(hash, seenHashes)).toBe(true);
  });

  it('tracks seen count correctly', () => {
    const seenHashes = new Set<string>();
    const hash1 = computeHash(baseInput);
    const hash2 = computeHash({ ...baseInput, msg: 'different' });
    markSeen(hash1, seenHashes);
    markSeen(hash2, seenHashes);
    expect(getSeenCount(seenHashes)).toBe(2);
  });
});