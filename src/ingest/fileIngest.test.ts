import { describe, it, expect } from 'vitest';
import { parseJsonFile } from './fileIngest';

describe('parseJsonFile', () => {
  it('should parse a valid JSON log file and normalize records', () => {
    const mockJsonContent = `{"timestamp": "2023-04-01T10:00:00Z", "level": "INFO", "message": "Application started"}\n{"timestamp": "2023-04-01T11:00:00Z", "level": "ERROR", "message": "Database connection failed"}`;

    const result = parseJsonFile(mockJsonContent);

    expect(result).toEqual([
      {
        timestamp: "2023-04-01T10:00:00Z",
        level: "INFO",
        message: "Application started"
      },
      {
        timestamp: "2023-04-01T11:00:00Z",
        level: "ERROR",
        message: "Database connection failed"
      }
    ]);
  });

  it('should handle malformed JSON lines gracefully', () => {
    const mockJsonContent = `{"timestamp": "2023-04-01T10:00:00Z", "level": "INFO"}\n{"malformed": json}\n{"timestamp": "2023-04-01T11:00:00Z", "level": "ERROR", "message": "Error occurred"}`;

    const result = parseJsonFile(mockJsonContent);

    expect(result).toEqual([
      {
        timestamp: "2023-04-01T10:00:00Z",
        level: "INFO"
      },
      {
        timestamp: "2023-04-01T11:00:00Z",
        level: "ERROR",
        message: "Error occurred"
      }
    ]);
  });

  it('should return an empty array for empty input', () => {
    const result = parseJsonFile('');

    expect(result).toEqual([]);
  });

  it('should handle multiple newlines and whitespace', () => {
    const mockJsonContent = `\n\n{"timestamp": "2023-04-01T10:00:00Z", "level": "INFO"}\n\n{"timestamp": "2023-04-01T11:00:00Z", "level": "ERROR"}\n\n`;

    const result = parseJsonFile(mockJsonContent);

    expect(result).toEqual([
      {
        timestamp: "2023-04-01T10:00:00Z",
        level: "INFO"
      },
      {
        timestamp: "2023-04-01T11:00:00Z",
        level: "ERROR"
      }
    ]);
  });
});