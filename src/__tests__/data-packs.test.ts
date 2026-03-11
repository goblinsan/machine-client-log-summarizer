import { describe, it, expect } from 'vitest';
import {
  ok,
  flaky,
  fail,
  timeout,
  allEntries,
  totalCount,
  totalCountByStatus,
  personas,
  workflowIds,
  intents,
  timestampRange,
} from '../config/data-packs/synthetic-log-runs';
import { SyntheticLogSchema, type LogEntry } from '../config/synthetic-logs';

describe('Data Packs', () => {
  it('exports all 4 status types', () => {
    expect(ok).toBeDefined();
    expect(flaky).toBeDefined();
    expect(fail).toBeDefined();
    expect(timeout).toBeDefined();
  });

  it('validates all log entries against schema', () => {
    const allLogs = [
      ...ok,
      ...flaky,
      ...fail,
      ...timeout,
    ];
    allLogs.forEach((log) => {
      expect(() => SyntheticLogSchema.parse(log)).not.toThrow();
    });
  });

  it('validates each log entry has required fields', () => {
    const allLogs = [
      ...ok,
      ...flaky,
      ...fail,
      ...timeout,
    ];
    allLogs.forEach((log) => {
      expect(log.persona).toBeDefined();
      expect(log.workflowId).toBeDefined();
      expect(log.intent).toBeDefined();
      expect(log.status).toBeDefined();
      expect(log.timestamp).toBeDefined();
    });
  });

  it('confirms sample sizes match expected counts', () => {
    expect(ok.length).toBe(5);
    expect(flaky.length).toBe(5);
    expect(fail.length).toBe(5);
    expect(timeout.length).toBe(5);
    expect(totalCount).toBe(20);
  });

  it('validates timestamp range', () => {
    expect(timestampRange.start).toBe(allEntries[0].timestamp);
    expect(timestampRange.end).toBe(allEntries[allEntries.length - 1].timestamp);
  });
});