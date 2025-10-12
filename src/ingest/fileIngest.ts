import fs from 'fs';

export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

/**
 * Reads a JSON file and returns normalized log records.
 *
 * @param filePath - Path to the JSON file containing log entries
 * @returns Array of normalized log records
 */
export function readJsonFile(filePath: string): LogRecord[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(fileContent);

    if (!Array.isArray(parsedData)) {
      throw new Error('Invalid JSON in file: expected array of log records');
    }

    // Normalize each record to ensure required fields exist
    return parsedData.map((record: any) => ({
      timestamp: record.timestamp || '',
      level: record.level || '',
      message: record.message || '',
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read or parse JSON file: ${error.message}`);
    }
    throw new Error('Failed to read or parse JSON file');
  }
}