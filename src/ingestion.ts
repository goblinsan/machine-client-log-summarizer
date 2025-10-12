import fs from 'fs';
import path from 'path';

// Define the structure of a log entry
export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  service: string;
}

/**
 * Processes log files from a directory and returns parsed entries
 * @param directoryPath - Path to the directory containing log files
 * @returns Promise resolving to array of parsed LogEntry objects
 */
export async function processLogFiles(directoryPath: string): Promise<LogEntry[]> {
  try {
    // Read directory contents
    const files = await fs.promises.readdir(directoryPath);

    // Filter for JSON files
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    // Process each JSON file
    const logEntries: LogEntry[] = [];

    for (const file of jsonFiles) {
      try {
        const filePath = path.join(directoryPath, file);
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');

        // Parse JSON content
        const parsedContent = JSON.parse(fileContent);

        // Validate required fields and types
        if (
          typeof parsedContent.timestamp === 'string' &&
          typeof parsedContent.level === 'string' &&
          typeof parsedContent.message === 'string' &&
          typeof parsedContent.service === 'string' &&
          parsedContent.timestamp.trim() !== '' &&
          parsedContent.level.trim() !== '' &&
          parsedContent.message.trim() !== '' &&
          parsedContent.service.trim() !== ''
        ) {
          // Validate timestamp format (ISO 8601)
          const timestamp = new Date(parsedContent.timestamp);
          if (isNaN(timestamp.getTime())) {
            continue; // Skip invalid timestamp
          }

          // Add to results if all validations pass
          logEntries.push({
            timestamp: parsedContent.timestamp,
            level: parsedContent.level,
            message: parsedContent.message,
            service: parsedContent.service
          });
        }
      } catch (error) {
        // Skip files that fail to parse or validate
        continue;
      }
    }

    return logEntries;
  } catch (error) {
    throw new Error(`Failed to process log files: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Processes a single log file and returns parsed entries
 * @param filePath - Path to the log file
 * @returns Promise resolving to array of parsed LogEntry objects
 */
export async function processLogFile(filePath: string): Promise<LogEntry[]> {
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const parsedContent = JSON.parse(fileContent);

    // Validate required fields and types
    if (
      typeof parsedContent.timestamp === 'string' &&
      typeof parsedContent.level === 'string' &&
      typeof parsedContent.message === 'string' &&
      typeof parsedContent.service === 'string' &&
      parsedContent.timestamp.trim() !== '' &&
      parsedContent.level.trim() !== '' &&
      parsedContent.message.trim() !== '' &&
      parsedContent.service.trim() !== ''
    ) {
      // Validate timestamp format (ISO 8601)
      const timestamp = new Date(parsedContent.timestamp);
      if (isNaN(timestamp.getTime())) {
        return []; // Return empty array for invalid timestamp
      }

      return [{
        timestamp: parsedContent.timestamp,
        level: parsedContent.level,
        message: parsedContent.message,
        service: parsedContent.service
      }];
    }

    return [];
  } catch (error) {
    // Return empty array for invalid JSON or other errors
    return [];
  }
}