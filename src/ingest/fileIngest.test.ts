import { fileIngest } from './fileIngest';

describe('fileIngest', () => {
  it('should parse valid JSON log file and return normalized records', () => {
    const mockFileContent = `{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO", "message": "Test message"}\n{"timestamp": "2023-01-01T11:00:00Z", "level": "ERROR", "message": "Error occurred"}`;
    const result = fileIngest(mockFileContent);

    expect(result).toEqual([
      {
        timestamp: "2023-01-01T10:00:00Z",
        level: "INFO",
        message: "Test message"
      },
      {
        timestamp: "2023-01-01T11:00:00Z",
        level: "ERROR",
       message: "Error occurred"
      }
    ]);
  });

  it('should handle invalid JSON gracefully', () => {
    const mockFileContent = `{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO", "message": "Test message"}\n{"invalid": json}`;
    expect(() => fileIngest(mockFileContent)).toThrow('Invalid JSON in log line');
  });

  it('should handle missing required fields', () => {
    const mockFileContent = `{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO"}\n{"timestamp": "2023-01-01T11:00:00Z", "level": "ERROR", "message": "Error occurred"}`;
    expect(() => fileIngest(mockFileContent)).toThrow('Missing required fields in log line');
  });

  it('should handle empty file content', () => {
    const mockFileContent = '';
    const result = fileIngest(mockFileContent);
    expect(result).toEqual([]);
  });

  it('should handle file with only whitespace', () => {
    const mockFileContent = '   \n  \n  ';
    const result = fileIngest(mockFileContent);
    expect(result).toEqual([]);
  });

  it('should handle malformed JSON lines', () => {
    const mockFileContent = `{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO", "message": "Test message"}\n{"timestamp": "2023-01-01T11:00:00Z", "level": "ERROR"}`;
    expect(() => fileIngest(mockFileContent)).toThrow('Missing required fields in log line');
  });

  it('should handle valid JSON with extra fields', () => {
    const mockFileContent = `{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO", "message": "Test message", "extraField": "ignored"}`;
    const result = fileIngest(mockFileContent);

    expect(result).toEqual([
      {
        timestamp: "2023-01-01T10:00:00Z",
        level: "INFO",
        message: "Test message"
      }
    ]);
  });

  it('should handle JSON with escaped quotes', () => {
    const mockFileContent = `{"timestamp": "2023-01-01T10:00:00Z", "level": "INFO", "message": "He said \\"Hello\\""}\n{"timestamp": "2023-01-01T11:00:00Z", "level": "ERROR", "message": "Error occurred"}`;
    const result = fileIngest(mockFileContent);

    expect(result).toEqual([
      {
        timestamp: "2023-01-01T10:00:00Z",
        level: "INFO",
        message: 'He said "Hello"'
      },
      {
        timestamp: "2023-01-01T11:00:00Z",
        level: "ERROR",
        message: "Error occurred"
      }
    ]);
  });
});