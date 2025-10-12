import { fileIngest } from './fileIngest';
import { promises as fs } from 'fs';
import path from 'path';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

describe('fileIngest', () => {
  const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should read and parse a JSON array of log records', async () => {
    const mockLogData = [
      {
        timestamp: '2023-01-01T00:00:00.000Z',
        level: 'info',
        message: 'Application started',
        source: 'app.js'
      },
      {
        timestamp: '2023-01-01T00:01:00.000Z',
        level: 'error',
        message: 'Database connection failed',
        source: 'db.js'
      }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockLogData));

    const result = await fileIngest('/mock/path/logs.json');

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T00:00:00.000Z',
      level: 'info',
      message: 'Application started',
      source: 'app.js'
    });
    expect(result[1]).toEqual({
      timestamp: '2023-01-01T00:01:00.000Z',
      level: 'error',
      message: 'Database connection failed',
      source: 'db.js'
    });
  });

  it('should handle a single log record object', async () => {
    const mockLogData = {
      timestamp: '2023-01-01T00:00:00.000Z',
      level: 'debug',
      message: 'Debug information',
      source: 'debug.js'
    };

    mockReadFile.mockResolvedValue(JSON.stringify(mockLogData));

    const result = await fileIngest('/mock/path/log.json');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T00:00:00.000Z',
      level: 'debug',
      message: 'Debug information',
      source: 'debug.js'
    });
  });

  it('should handle primitive values as single messages', async () => {
    mockReadFile.mockResolvedValue('Application error occurred');

    const result = await fileIngest('/mock/path/error.txt');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      timestamp: expect.any(String),
      level: 'info',
      message: 'Application error occurred'
    });
  });

  it('should normalize log levels to valid values', async () => {
    const mockLogData = [
      {
        timestamp: '2023-01-01T00:00:00.000Z',
        level: 'invalid-level',
        message: 'Test message'
      }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockLogData));

    const result = await fileIngest('/mock/path/logs.json');

    expect(result[0].level).toBe('info'); // Should default to 'info'
  });

  it('should handle missing required fields with defaults', async () => {
    const mockLogData = [
      {
        message: 'Test message without timestamp'
      }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockLogData));

    const result = await fileIngest('/mock/path/logs.json');

    expect(result[0]).toEqual({
      timestamp: expect.any(String),
      level: 'info',
      message: 'Test message without timestamp'
    });
  });

  it('should throw an error for invalid JSON', async () => {
    mockReadFile.mockResolvedValue('{ invalid json }');

    await expect(fileIngest('/mock/path/invalid.json')).rejects.toThrow(
      'Failed to ingest file /mock/path/invalid.json'
    );
  });

  it('should handle missing file gracefully', async () => {
    mockReadFile.mockRejectedValue(new Error('File not found'));

    await expect(fileIngest('/mock/path/missing.json')).rejects.toThrow(
      'Failed to ingest file /mock/path/missing.json'
    );
  });
});