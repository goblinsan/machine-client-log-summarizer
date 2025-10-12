import { fileIngest } from './fileIngest';

describe('fileIngest', () => {
  it('should parse valid JSON logs and return normalized records', async () => {
    const mockValidLog = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test log entry"}
{"timestamp": "2023-01-01T01:00:00Z", "level": "ERROR", "message": "Another test log entry"}
{"timestamp": "2023-01-01T02:00:00Z", "level": "DEBUG", "message": "Debug log entry"}`;

    const result = await fileIngest('mockValidLog');
    expect(result).toEqual([
      { timestamp: '2023-01-01T00:00:00Z', level: 'INFO', message: 'Test log entry' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'ERROR', message: 'Another test log entry' },
      { timestamp: '2023-01-01T02:00:00Z', level: 'DEBUG', message: 'Debug log entry' },
    ]);
  });

  it('should handle invalid JSON logs gracefully', async () => {
    const mockInvalidLog = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test log entry"}
{"timestamp": "2023-01-01T01:00:00Z", "level": "ERROR", "message": "Another test log entry"}`;

    const result = await fileIngest('mockInvalidLog');
    expect(result).toEqual([]);
  });

  it('should handle empty log files gracefully', async () => {
    const mockEmptyLog = ``;

    const result = await fileIngest('mockEmptyLog');
    expect(result).toEqual([]);
  });

  it('should handle file not found errors', async () => {
    const result = await fileIngest('nonexistent.log');
    expect(result).toEqual([]);
  });
});