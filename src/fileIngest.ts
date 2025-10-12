import fs from 'fs/promises';

// Define the expected log record structure
export interface LogRecord {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
}

/**
 * Process a file and return normalized log records
 * @param filePath - Path to the JSON file containing log records
 * @returns Promise resolving to array of normalized LogRecord objects
 */
export async function processFile(filePath: string): Promise<LogRecord[]> {
  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf8');

    // Parse the JSON content
    const parsedData = JSON.parse(fileContent);

    // Validate that the parsed data is an array
    if (!Array.isArray(parsedData)) {
      throw new Error('Invalid JSON in file: Expected an array of log records');
    }

    // Validate and normalize each record in the array
    const normalizedRecords: LogRecord[] = [];

    for (const record of parsedData) {
      // Validate that each record is an object
      if (typeof record !== 'object' || record === null) {
        throw new Error('Invalid JSON in file: Array contains non-object elements');
      }

      // Validate required fields
      if (!('timestamp' in record) || typeof record.timestamp !== 'string') {
        throw new Error('Invalid JSON in file: Missing or invalid timestamp field');
      }

      if (!('level' in record) || !['info', 'warn', 'error', 'debug'].includes(record.level)) {
        throw new Error('Invalid JSON in file: Missing or invalid level field');
      }

      if (!('message' in record) || typeof record.message !== 'string') {
        throw new Error('Invalid JSON in file: Missing or invalid message field');
      }

      // Create normalized record
      const normalizedRecord: LogRecord = {
        timestamp: record.timestamp,
        level: record.level as 'info' | 'warn' | 'error' | 'debug',
        message: record.message
      };

      normalizedRecords.push(normalizedRecord);
    }

    return normalizedRecords;
  } catch (error) {
    // Re-throw the error with more context if it's not already an Error instance
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Failed to process file: ${error}`);
    }
  }
}