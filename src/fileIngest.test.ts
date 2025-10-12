import { describe, it, expect, vi } from 'vitest';
import { processFile } from './fileIngest';

describe('processFile', () => {
  it('should parse valid JSON file and return normalized records', async () => {
    const mockFileContent = `{
      "records": [
        {
          "timestamp": "2023-01-01T00:00:00Z",
          "level": "INFO",
          "message": "Application started"
        },
        {
          "timestamp": "2023-01-01T01:00:00Z",
          "level": "ERROR",
          "message": "Database connection failed"
        }
      ]
    }`;

    const mockFile = new File([mockFileContent], 'test.json');

    const result = await processFile(mockFile);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Application started'
      },
      {
        timestamp: '2023-01-01T01:00:00Z',
        level: 'ERROR',
 +        message: 'Database connection failed'
      }
    ]);
  });

  it('should handle invalid JSON gracefully', async () => {
    const mockFileContent = `{
      "records": [
        {
          "timestamp": "2023-01-01T00:00:00Z",
          "level": "INFO",
          "message": "Application started"
        },
        {
          "timestamp": "2023-01-01T01:00:00Z",
          "level": "ERROR",
          "message": "Database connection failed"
        }
      ]
    }`;

    const mockFile = new File([mockFileContent], 'test.json');

    // Mock the file reader to simulate invalid JSON
    const originalReadAsText = FileReader.prototype.readAsText;
    vi.spyOn(FileReader.prototype, 'readAsText').mockImplementation(function (file) {
      // Simulate reading invalid JSON content
      const mockInvalidContent = '{ "invalid": json }';
      (this as any).onload?.({ target: { result: mockInvalidContent } } as any);
      return undefined as any;
    });

    const result = await processFile(mockFile);

    expect(result).toEqual([]);
  });

  it('should return empty array for missing file', async () => {
    const mockFile = new File([], 'nonexistent.json');

    const result = await processFile(mockFile);

    expect(result).toEqual([]);
  });

  it('should handle file with no records', async () => {
    const mockFileContent = `{
      "records": []
    }`;

    const mockFile = new File([mockFileContent], 'empty.json');

    const result = await processFile(mockFile);

    expect(result).toEqual([]);
  });

  it('should handle file with malformed records', async () => {
    const mockFileContent = `{
      "records": [
        {
          "timestamp": "2023-01-01T00:00:00Z",
          "level": "INFO"
        }
      ]
    }`;

    const mockFile = new File([mockFileContent], 'malformed.json');

    const result = await processFile(mockFile);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: ''
      }
    ]);
  });
});