import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processFile } from './fileIngest';

describe('processFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should process valid JSON file and return normalized records', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO", "message": "Test message", "service": "test-service"}\n{"timestamp": "2023-01-01T11:00:00Z", "level": "ERROR", "message": "Error message", "service": "test-service"}`;
    
    const result = await processFile(mockFileContent);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: "2023-01-01T10:00:00Z",
      level: "INFO",
      message: "Test message",
      service: "test-service"
    });
    expect(result[1]).toEqual({
      timestamp: "2023-01-01T11:00:00Z",
      level: "ERROR",
      message: "Error message",
      service: "test-service"
    });
  });

  it('should handle malformed JSON lines gracefully', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO", "message": "Test message"}\n{"malformed": json}\n{"timestamp": "2023-01-01T11:00:00Z", "level": "ERROR", "message": "Error message"}`;

    const result = await processFile(mockFileContent);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: "2023-01-01T10:00:00Z",
      level: "INFO",
      message: "Test message"
    });
    expect(result[1]).toEqual({
      timestamp: "2023-01-01T11:00:00Z",
      level: "ERROR",
      message: "Error message"
    });
  });

  it('should handle missing fields in JSON records', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO"}\n{"timestamp": "2023-01-01T11:00:00Z", "level": "ERROR", "message": "Error message"}`;

    const result = await processFile(mockFileContent);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: "2023-01-01T10:00:00Z",
      level: "INFO"
    });
    expect(result[1]).toEqual({
      timestamp: "2023-01-01T11:00:00Z",
      level: "ERROR",
      message: "Error message"
    });
  });

  it('should handle empty file', async () => {
    const mockFileContent = '';

    const result = await processFile(mockFileContent);

    expect(result).toHaveLength(0);
  });

  it('should handle file with only whitespace', async () => {
    const mockFileContent = '   \n  \n\t\n';

    const result = await processFile(mockFileContent);

    expect(result).toHaveLength(0);
  });

  it('should normalize timestamp format', async () => {
    const mockFileContent = `{"timestamp": "2023-01-01 10:00:00", "level": "INFO", "message": "Test message"}`;

    const result = await processFile(mockFileContent);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      timestamp: "2023-01-01 10:00:00",
      level: "INFO",
      message: "Test message"
    });
  });

  it('should handle JSON array format', async () => {
    const mockFileContent = `[{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO", "message": "Test message"}, {"timestamp": "2023-01-01T11:00:00Z", "level": "ERROR", "message": "Error message"}]`;

    const result = await processFile(mockFileContent);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: "2023-01-01T10:00:00Z",
      level: "INFO",
      message: "Test message"
    });
    expect(result[1]).toEqual({
      timestamp: "2023-01-01T11:00:00Z",
      level: "ERROR",
      message: "Error message"
    });
  });

  it('should handle mixed JSON array and newline format', async () => {
    const mockFileContent = `[{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO", "message": "Test message"}]\n{"timestamp": "2023-01-01T11:00:00Z", "level": "ERROR", "message": "Error message"}`;

    const result = await processFile(mockFileContent);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: "2023-01-01T10:00:00Z",
      level: "INFO",
      message: "Test message"
    });
    expect(result[1]).toEqual({
      timestamp: "2023-01-01T11:00:00Z",
      level: "ERROR",
      message: "Error message"
    });
  });
});