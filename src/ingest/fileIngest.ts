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
 * Parses log content (assumed to be JSON) and returns normalized records.
 * @param content - Raw log file content as a string
 * @returns Array of normalized log records
 */
export function parseLogContent(content: string): LogRecord[] {
  try {
    const parsed = JSON.parse(content);

    // If the parsed content is an array, assume each item is a log record
    if (Array.isArray(parsed)) {
      return parsed.map((entry) => ({
        timestamp: entry.timestamp || '',
        level: entry.level || '',
        message: entry.message || '',
      }));
    }

    // If it's a single object, wrap it in an array
    return [
      {
        timestamp: parsed.timestamp || '',
        level: parsed.level || '',
        message: parsed.message || '',
      },
    ];
  } catch (error) {
    throw new Error(`Failed to parse log content: ${(error as Error).message}`);
  }
}
