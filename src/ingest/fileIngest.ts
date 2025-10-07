// src/ingest/fileIngest.ts

export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

/**
 * Parses a JSON file and returns an array of normalized log records.
 * Each record includes timestamp, level, and message fields.
 * Handles malformed JSON gracefully by logging errors.
 *
 * @param fileContent - The content of the JSON file as a string
 * @returns An array of parsed log records or an empty array if parsing fails
 */
export function parseJsonFile(fileContent: string): LogRecord[] {
  try {
    const parsed = JSON.parse(fileContent);

    // If the parsed content is an array, assume it's a list of log records
    if (Array.isArray(parsed)) {
      return parsed.map((entry: any) => ({
        timestamp: entry.timestamp || '',
        level: entry.level || '',
        message: entry.message || '',
      }));
    }

    // If it's a single object, wrap it in an array
    if (typeof parsed === 'object' && parsed !== null) {
      return [
        {
          timestamp: parsed.timestamp || '',
          level: parsed.level || '',
          message: parsed.message || '',
        },
      ];
    }

    // If parsing succeeded but content is not an object or array, return empty array
    return [];
  } catch (error) {
    console.error('Failed to parse JSON file:', error);
    return [];
  }
}
