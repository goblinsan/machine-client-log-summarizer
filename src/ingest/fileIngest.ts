// src/ingest/fileIngest.ts

/**
 * Represents a normalized log record.
 */
export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

/**
 * Parses log content (as a string) into an array of normalized records.
 * @param content - Raw log content as a string (e.g., JSON lines or array).
 * @returns Array of normalized log records.
 */
export function parseLogContent(content: string): LogRecord[] {
  const lines = content.trim().split('\n');
  const records: LogRecord[] = [];

  for (const line of lines) {
    try {
      const parsed = JSON.parse(line);
      records.push({
        timestamp: parsed.timestamp || '',
        level: parsed.level || '',
        message: parsed.message || '',
      });
    } catch (e) {
      // Optionally log or handle parsing errors
      console.error('Failed to parse line:', line);
    }
  }

  return records;
}

/**
 * Reads and parses a file path (mocked for now).
 * @param filePath - Path to the log file.
 * @returns Parsed records from the file.
 */
export function parseJsonFile(filePath: string): LogRecord[] {
  // In a real app, this would read from the filesystem.
  // For now, we simulate reading content from a mock file.
  const mockContent = `
{"timestamp": "2025-04-01T10:00:00Z", "level": "INFO", "message": "Application started"}
{"timestamp": "2025-04-01T10:01:00Z", "level": "ERROR", "message": "Failed to connect to DB"}
{"timestamp": "2025-04-01T10:02:00Z", "level": "DEBUG", "message": "Database query executed"}
`;

  return parseLogContent(mockContent);
}
