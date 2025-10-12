import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readAndNormalizeJsonFiles } from './fileIngest';

// Mock file system operations
vi.mock('fs/promises', () => ({
  readFile: vi.fn(),
}));

describe('readAndNormalizeJsonFiles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should read and normalize valid JSON files', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test message"}`;
    const mockFileContent2 = `{"timestamp": "2023-01-01T01:00:00Z", "level": "ERROR", "message": "Error message"}`;

    const mockReadFile = vi.fn()
      .mockResolvedValueOnce(mockFileContent)
      .mockResolvedValueOnce(mockFileContent2);

    const result = await readAndNormalizeJsonFiles(['file1.json', 'file2.json']);

    expect(result).toEqual([
      {
        timestamp: "2023-01-01T00:00:00Z",
        level: "INFO",
        message: "Test message",
        source: "file1.json"
      },
      {
        timestamp: "2023-01-01T01:00:00Z",
        level: "ERROR",
 +        message: "Error message",
        source: "file2.json"
      }
    ]);
  });

  it('should handle malformed JSON gracefully', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test message"}`;
    const malformedContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test message"`;

    const mockReadFile = vi.fn()
      .mockResolvedValueOnce(mockFileContent)
      .mockResolvedValueOnce(malformedContent);

    const result = await readAndNormalizeJsonFiles(['file1.json', 'file2.json']);

    expect(result).toEqual([
      {
        timestamp: "2023-01-01T00:00:00Z",
        level: "INFO",
        message: "Test message",
        source: "file1.json"
      }
    ]);
  });

  it('should filter out records with missing required fields', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Test message"}`;
    const incompleteContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO"}`;

    const mockReadFile = vi.fn()
      .mockResolvedValueOnce(mockFileContent)
      .mockResolvedValueOnce(incompleteContent);

    const result = await readAndNormalizeJsonFiles(['file1.json', 'file2.json']);

    expect(result).toEqual([
      {
        timestamp: "2023-01-01T00:00:00Z",
        level: "INFO",
        message: "Test message",
        source: "file1.json"
      }
    ]);
  });

  it('should handle empty files gracefully', async () => {
    const mockReadFile = vi.fn()
      .mockResolvedValueOnce('');

    const result = await readAndNormalizeJsonFiles(['empty.json']);

    expect(result).toEqual([]);
  });

  it('should handle files that do not exist gracefully', async () => {
    const mockReadFile = vi.fn()
      .mockRejectedValueOnce(new Error('File not found'));

    const result = await readAndNormalizeJsonFiles(['nonexistent.json']);

    expect(result).toEqual([]);
  });

  it('should normalize timestamp format', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01 00:00:00", "level": "INFO", "message": "Test message"}`;

    const mockReadFile = vi.fn()
      .mockResolvedValueOnce(mockFileContent);

    const result = await readAndNormalizeJsonFiles(['file.json']);

    expect(result).toEqual([
      {
        timestamp: "2023-01-01T00:00:00Z",
        level: "INFO",
        message: "Test message",
        source: "file.json"
      }
    ]);
  });

  it('should handle arrays of JSON objects', async () => {
    const mockFileContent = `[
      {"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "First message"},
      {"timestamp": "2023-01-01T01:00:00Z", "level": "ERROR", "message": "Second message"}
    ]`;

    const mockReadFile = vi.fn()
      .mockResolvedValueOnce(mockFileContent);

    const result = await readAndNormalizeJsonFiles(['array.json']);

    expect(result).toEqual([
      {
        timestamp: "2023-01-01T00:00:00Z",
        level: "INFO",
        message: "First message",
        source: "array.json"
      },
      {
        timestamp: "2023-01-01T01:00:00Z",
        level: "ERROR",
        message: "Second message",
        source: "array.json"
      }
    ]);
  });
});