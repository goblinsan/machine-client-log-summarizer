import fs from 'fs';
import path from 'path';

// Define the structure of a normalized log record
interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
  service: string;
}

// Define the structure of a raw log entry (from JSON file)
interface RawLogEntry {
  timestamp?: string;
  level?: string;
  message?: string;
  service?: string;
  [key: string]: any; // Allow for extra fields
}

/**
 * Reads a JSON file and returns normalized log records.
 * @param filePath - Path to the JSON file
 * @returns Array of normalized log records
 */
export function fileIngest(filePath: string): LogRecord[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON content
    const parsedContent: RawLogEntry | RawLogEntry[] = JSON.parse(fileContent);

    // Handle both single object and array of objects
    const entries = Array.isArray(parsedContent) ? parsedContent : [parsedContent];

    // Normalize each entry
    const normalizedRecords: LogRecord[] = [];

    for (const entry of entries) {
      // Check if required fields are present
      if (!entry.timestamp || !entry.level || !entry.message || !entry.service) {
        continue; // Skip invalid entries
      }

      // Create normalized record with only required fields
      const normalizedRecord: LogRecord = {
        timestamp: entry.timestamp,
        level: entry.level,
        message: entry.message,
        service: entry.service
      };

      normalizedRecords.push(normalizedRecord);
    }

    return normalizedRecords;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse JSON');
    } else {
      throw new Error('Failed to read file');
    }
  }
}