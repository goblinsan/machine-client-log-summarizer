import { describe, it, expect } from 'vitest';
import { syntheticLogs } from '../config/synthetic-logs';
import { syntheticLogsData } from '../config/synthetic-logs-data';

describe('Regression Gap Tests', () => {
  it('should handle empty log array gracefully', () => {
    const result = syntheticLogs([]);
    expect(result).toBeDefined();
    expect(result.summary).toBeDefined();
  });

  it('should handle single log entry', () => {
    const logs = [{ timestamp: '2024-01-01T00:00:00Z', level: 'INFO', message: 'Test log' }];
    const result = syntheticLogs(logs);
    expect(result.summary).toBeDefined();
    expect(result.summary.length).toBeGreaterThan(0);
  });

  it('should handle multiple log entries with different levels', () => {
    const logs = [
      { timestamp: '2024-01-01T00:00:00Z', level: 'INFO', message: 'Info message' },
      { timestamp: '2024-01-01T00:00:01Z', level: 'ERROR', message: 'Error message' },
      { timestamp: '2024-01-01T00:00:02Z', level: 'WARN', message: 'Warning message' }
    ];
    const result = syntheticLogs(logs);
    expect(result.summary).toBeDefined();
    expect(result.summary.length).toBeGreaterThan(0);
  });

  it('should handle synthetic logs data generation', () => {
    const data = syntheticLogsData();
    expect(data).toBeDefined();
    expect(data.logs).toBeDefined();
    expect(data.logs.length).toBeGreaterThan(0);
  });

  it('should handle logs with special characters', () => {
    const logs = [
      { timestamp: '2024-01-01T00:00:00Z', level: 'INFO', message: 'Test with "quotes" and <special> chars' }
    ];
    const result = syntheticLogs(logs);
    expect(result.summary).toBeDefined();
  });

  it('should handle logs with unicode characters', () => {
    const logs = [
      { timestamp: '2024-01-01T00:00:00Z', level: 'INFO', message: 'Test with unicode: 你好世界 🌍' }
    ];
    const result = syntheticLogs(logs);
    expect(result.summary).toBeDefined();
  });
});