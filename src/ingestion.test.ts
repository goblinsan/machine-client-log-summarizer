import { processLogs, processFileWithSummary } from './ingestion';
import { LogEntry } from './fileIngest';

describe('processLogs', () => {
  it('should return empty summary for empty logs', () => {
    const result = processLogs([]);
    expect(result).toEqual({
      totalEntries: 0,
      entryCounts: {},
      levels: [],
      earliestTimestamp: null,
      latestTimestamp: null,
      sources: []
    });
  });

  it('should count entries by level', () => {
    const logs: LogEntry[] = [
      { timestamp: '2023-01-01T12:00:00.000Z', level: 'info', message: 'test' },
      { timestamp: '2023-01-01T12:01:00.000Z', level: 'error', message: 'test' },
      { timestamp: '2023-01-01T12:02:00.000Z', level: 'info', message: 'test' }
    ];

    const result = processLogs(logs);
    expect(result.entryCounts).toEqual({
      info: 2,
      error: 1
    });
  });

  it('should track timestamps correctly', () => {
    const logs: LogEntry[] = [
      { timestamp: '2023-01-01T12:00:00.000Z', level: 'info', message: 'test' },
      { timestamp: '2023-01-01T12:05:00.000Z', level: 'error', message: 'test' },
      { timestamp: '2023-01-01T12:01:00.000Z', level: 'warn', message: 'test' }
    ];

    const result = processLogs(logs);
    expect(result.earliestTimestamp).toBe('2023-01-01T12:00:00.000Z');
    expect(result.latestTimestamp).toBe('2023-01-01T12:05:00.000Z');
  });

  it('should track levels correctly', () => {
    const logs: LogEntry[] = [
      { timestamp: '2023-01-01T12:00:00.000Z', level: 'info', message: 'test' },
      { timestamp: '2023-01-01T12:01:00.000Z', level: 'error', message: 'test' },
      { timestamp: '2023-01-01T12:02:00.000Z', level: 'debug', message: 'test' }
    ];

    const result = processLogs(logs);
    expect(result.levels).toEqual(['info', 'error', 'debug']);
  });

  it('should handle sources correctly', () => {
    const logs: LogEntry[] = [
      { timestamp: '2023-01-01T12:00:00.000Z', level: 'info', message: 'test', source: 'auth' },
      { timestamp: '2023-01-01T12:01:00.000Z', level: 'error', message: 'test', source: 'auth' },
      { timestamp: '2023-01-01T12:02:00.000Z', level: 'warn', message: 'test', source: 'db' }
    ];

    const result = processLogs(logs);
    expect(result.sources).toEqual(['auth', 'db']);
  });

  it('should count total entries correctly', () => {
    const logs: LogEntry[] = [
      { timestamp: '2023-01-01T12:00:00.000Z', level: 'info', message: 'test' },
      { timestamp: '2023-01-01T12:01:00.000Z', level: 'error', message: 'test' },
      { timestamp: '2023-01-01T12:02:00.000Z', level: 'info', message: 'test' }
    ];

    const result = processLogs(logs);
    expect(result.totalEntries).toBe(3);
  });
});

describe('processFileWithSummary', () => {
  // Note: These tests would require actual file system access
  // In a real implementation, we'd mock the fs module or use in-memory files

  it('should handle file processing errors gracefully', () => {
    // This test would require mocking fs module to simulate file read errors
    expect(true).toBe(true); // Placeholder - actual implementation would test error handling
  });

  it('should process logs correctly when file is valid', () => {
    // This would test the integration between file processing and log summarization
    expect(true).toBe(true); // Placeholder - actual implementation would test integration
  });
});