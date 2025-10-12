import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processLogFile } from './fileIngest';

// Mock file system operations
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    stat: vi.fn(),
  },
}));

describe('processLogFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should process a valid log file and return parsed content', async () => {
    const mockContent = `2023-01-01 10:00:00 INFO User logged in
2023-01-01 10:01:00 ERROR Failed to connect to database
2023-01-01 10:02:00 WARN Memory usage high`;

    const mockStat = {
      size: 100,
      mtime: new Date(),
    };

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(mockContent);
    vi.mocked(require('fs').promises.stat).mockResolvedValue(mockStat);

    const result = await processLogFile('test.log');

    expect(result).toEqual({
      fileName: 'test.log',
      fileSize: 100,
      parsedContent: [
        {
          timestamp: '2023-01-01 10:00:00',
          level: 'INFO',
          message: 'User logged in',
        },
        {
          timestamp: '2023-01-01 10:01:00',
          level: 'ERROR',
          message: 'Failed to connect to database',
        },
        {
          timestamp: '2023-01-01 10:02:00',
         level: 'WARN',
          message: 'Memory usage high',
        },
      ],
    });
  });

  it('should handle empty file gracefully', async () => {
    const mockContent = '';

    const mockStat = {
      size: 0,
      mtime: new Date(),
    };

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(mockContent);
    vi.mocked(require('fs').promises.stat).mockResolvedValue(mockStat);

    const result = await processLogFile('empty.log');

    expect(result).toEqual({
      fileName: 'empty.log',
      fileSize: 0,
      parsedContent: [],
    });
  });

  it('should handle file with invalid timestamp format', async () => {
    const mockContent = `2023-01-01 10:00:00 INFO User logged in
invalid-timestamp ERROR Failed to connect to database
2023-01-01 10:02:00 WARN Memory usage high`;

    const mockStat = {
      size: 100,
      mtime: new Date(),
    };

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(mockContent);
    vi.mocked(require('fs').promises.stat).mockResolvedValue(mockStat);

    const result = await processLogFile('invalid.log');

    expect(result).toEqual({
      fileName: 'invalid.log',
      fileSize: 100,
      parsedContent: [
        {
          timestamp: '2023-01-01 10:00:00',
          level: 'INFO',
          message: 'User logged in',
        },
        {
          timestamp: 'invalid-timestamp',
          level: 'ERROR',
          message: 'Failed to connect to database',
        },
        {
          timestamp: '2023-01-01 10:02:00',
          level: 'WARN',
          message: 'Memory usage high',
        },
      ],
    });
  });

  it('should throw error for non-existent file', async () => {
    vi.mocked(require('fs').promises.readFile).mockRejectedValue(
      new Error('File not found')
    );

    await expect(processLogFile('nonexistent.log')).rejects.toThrow(
      'File not found'
    );
  });

  it('should handle file with only whitespace', async () => {
    const mockContent = '   \n  \n  ';

    const mockStat = {
      size: 5,
      mtime: new Date(),
    };

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(mockContent);
    vi.mocked(require('fs').promises.stat).mockResolvedValue(mockStat);

    const result = await processLogFile('whitespace.log');

    expect(result).toEqual({
      fileName: 'whitespace.log',
      fileSize: 5,
      parsedContent: [],
    });
  });

  it('should parse log entries with special characters', async () => {
    const mockContent = `2023-01-01 10:00:00 INFO User logged in with special chars: "test"
2023-01-01 10:01:00 ERROR Failed to connect to database with special chars: "test"`;

    const mockStat = {
      size: 100,
      mtime: new Date(),
    };

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(mockContent);
    vi.mocked(require('fs').promises.stat).mockResolvedValue(mockStat);

    const result = await processLogFile('special.log');

    expect(result).toEqual({
      fileName: 'special.log',
      fileSize: 100,
      parsedContent: [
        {
          timestamp: '2023-01-01 10:00:00',
          level: 'INFO',
          message: 'User logged in with special chars: "test"',
        },
        {
          timestamp: '2023-01-01 10:01:00',
          level: 'ERROR',
          message: 'Failed to connect to database with special chars: "test"',
        },
      ],
    });
  });

  it('should handle log entries with missing fields', async () => {
    const mockContent = `2023-01-01 10:00:00 INFO User logged in
2023-01-01 10:01:00 ERROR
2023-01-01 10:02:00 WARN Memory usage high`;

    const mockStat = {
      size: 100,
      mtime: new Date(),
    };

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(mockContent);
    vi.mocked(require('fs').promises.stat).mockResolvedValue(mockStat);

    const result = await processLogFile('missing.log');

    expect(result).toEqual({
      fileName: 'missing.log',
      fileSize: 100,
      parsedContent: [
        {
          timestamp: '2023-01-01 10:00:00',
          level: 'INFO',
          message: 'User logged in',
        },
        {
          timestamp: '2023-01-01 10:01:00',
          level: 'ERROR',
          message: '',
        },
        {
          timestamp: '2023-01-01 10:02:00',
          level: 'WARN',
          message: 'Memory usage high',
        },
      ],
    });
  });
});