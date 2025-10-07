// fileIngest.ts

/**
 * Represents a normalized log record.
 */
export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

/**
 * Reads and parses a JSON file containing log records.
 * @param fileContent - The content of the JSON file as a string.
 * @returns An array of normalized log records.
 */
export function parseLogContent(fileContent: string): LogRecord[] {
  try {
    const parsed = JSON.parse(fileContent);

    if (!Array.isArray(parsed)) {
      throw new Error('Expected an array of log records');
    }

    return parsed.map((entry: any) => ({
      timestamp: entry.timestamp || '',
      level: entry.level || '',
      message: entry.message || '',
    }));
  } catch (error) {
    throw new Error(`Failed to parse log content: ${(error as Error).message}`);
  }
}
