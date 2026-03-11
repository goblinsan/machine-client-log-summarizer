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

  it('should handle large log arrays efficiently', () => {
    const logs = Array.from({ length: 100 }, (_, i) => ({
      timestamp: `2024-01-01T00:00:${String(i).padStart(2, '0')}Z`,
      level: i % 5 === 0 ? 'ERROR' : i % 3 === 0 ? 'WARN' : 'INFO',
      message: `Log message ${i}`
    }));
    const result = syntheticLogs(logs);
    expect(result).toBeDefined();
    expect(result.summary).toBeDefined();
    expect(result.summary.length).toBeGreaterThan(0);
  });

  it('should handle logs with missing timestamp gracefully', () => {
    const logs = [
      { level: 'INFO', message: 'Message without timestamp' },
      { timestamp: '2024-01-01T00:00:00Z', level: 'INFO', message: 'Message with timestamp' }
    ];
    const result = syntheticLogs(logs);
    expect(result).toBeDefined();
    expect(result.summary).toBeDefined();
  });

  it('should handle logs with invalid level values', () => {
    const logs = [
      { timestamp: '2024-01-01T00:00:00Z', level: 'INVALID', message: 'Invalid level' },
      { timestamp: '2024-01-01T00:00:01Z', level: 'INFO', message: 'Valid level' }
    ];
    const result = syntheticLogs(logs);
    expect(result).toBeDefined();
    expect(result.summary).toBeDefined();
  });

});

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
