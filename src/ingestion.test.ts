import { describe, it, expect, vi } from 'vitest';
import { processLogFiles } from './ingestion';

// Mock file system operations
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    stat: vi.fn(),
  },
}));

describe('processLogFiles', () => {
  it('should process multiple log files correctly', async () => {
    const mockContent1 = `2023-01-01 10:00:00 INFO User logged in
2023-01-01 10:01:00 ERROR Failed to connect to database`;

    const mockContent2 = `2023-01-01 10:02:00 WARN Memory usage high
2023-01-01 10:03:00 INFO User logged out`;

    const mockStat1 = {
      size: 100,
      mtime: new Date(),
    };

    const mockStat2 = {
      size: 100,
      mtime: new Date(),
    };

    vi.mocked(require('fs').promises.readFile).mockResolvedValue(mockContent1);
    vi.mocked(require('fs').promises.stat).mockResolvedValue(mockStat1);

    const result = await processLogFiles(['file1.log', 'file2.log']);

    expect(result).toEqual([
      {
        fileName: 'file1.log',
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
        ],
      },
      {
        fileName: 'file2.log',
        fileSize: 100,
        parsedContent: [
          {
            timestamp: '2023-01-01 10:02:00',
            level: 'WARN',
            message: 'Memory usage high',
          },
          {
            timestamp: '2023-01-01 10:03:00',
            level: 'INFO',
            message: 'User logged out',
          },
        ],
      },
    ]);
  });

  it('should handle empty file list gracefully', async () => {
    const result = await processLogFiles([]);

    expect(result).toEqual([]);
  });
});