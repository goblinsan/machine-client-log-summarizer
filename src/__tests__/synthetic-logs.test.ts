import { describe, it, expect } from 'vitest';
import {
  syntheticLogs,
  logsByStatus,
  personas,
  workflowIds,
  intents,
  totalCount,
  timestampRange,
} from '../config/synthetic-logs';

describe('Synthetic Logs', () => {
  describe('totalCount', () => {
    it('should have exactly 9 log entries', () => {
      expect(totalCount).toBe(9);
    });
  });

  describe('logsByStatus', () => {
    it('should have 3 ok entries', () => {
      expect(logsByStatus.ok.length).toBe(3);
    });

    it('should have 2 flaky entries', () => {
      expect(logsByStatus.flaky.length).toBe(2);
    });

    it('should have 2 fail entries', () => {
      expect(logsByStatus.fail.length).toBe(2);
    });

    it('should have 2 timeout entries', () => {
      expect(logsByStatus.timeout.length).toBe(2);
    });
  });

  describe('persona coverage', () => {
    it('should include all persona types', () => {
      expect(personas).toContain('coordinator');
      expect(personas).toContain('lead-engineer');
      expect(personas).toContain('context');
      expect(personas).toContain('qa');
      expect(personas).toContain('security');
    });
  });

  describe('required fields', () => {
    it('should have status field on all entries', () => {
      for (const entry of syntheticLogs) {
        expect(entry.status).toBeDefined();
        expect(['ok', 'flaky', 'fail', 'timeout']).toContain(entry.status);
      }
    });

    it('should have persona field on all entries', () => {
      for (const entry of syntheticLogs) {
        expect(entry.persona).toBeDefined();
        expect(typeof entry.persona).toBe('string');
      }
    });

    it('should have workflowId field on all entries', () => {
      for (const entry of syntheticLogs) {
        expect(entry.workflowId).toBeDefined();
        expect(typeof entry.workflowId).toBe('string');
      }
    });

    it('should have intent field on all entries', () => {
      for (const entry of syntheticLogs) {
        expect(entry.intent).toBeDefined();
        expect(typeof entry.intent).toBe('string');
      }
    });
  });
});