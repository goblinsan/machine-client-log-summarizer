import { describe, it, expect, vi } from 'vitest';
import { processFile } from './fileIngest';

describe('processFile', () => {
  it('should parse valid JSON and return normalized records', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test message"}`;
    const mockFile = new File([mockFileContent], 'test.json');

    const result = await processFile(mockFile);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Test message'
      }
    ]);
  });

  it('should handle multiple JSON objects in file', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "First message"}
{"timestamp": "2023-01-01T01:00:00Z", "level": "ERROR", "message": "Second message"}`;
    const mockFile = new File([mockFileContent], 'test.json');

    const result = await processFile(mockFile);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
       level: 'INFO',
       message: 'First message'
     },
      {
        timestamp: '2023-01-01T01:00:00Z',
        level: 'ERROR',
        message: 'Second message'
      }
    ]);
  });

  it('should throw error for invalid JSON', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO"`;
    const mockFile = new File([mockFileContent], 'test.json');

    await expect(processFile(mockFile)).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle missing required fields gracefully', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T00:00:00Z", "message": "Test message"}`;
    const mockFile = new File([mockFileContent], 'test.json');

    const result = await processFile(mockFile);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'UNKNOWN',
        message: 'Test message'
      }
    ]);
  });
});