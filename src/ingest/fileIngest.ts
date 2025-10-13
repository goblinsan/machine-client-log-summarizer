import fs from 'fs';

// Define the structure of a normalized log record
export interface NormalizedLogRecord {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
}

/**
 * Reads a JSON log file and returns an array of normalized records
 * @param filePath - Path to the JSON log file
 * @returns Array of normalized log records
 */
export const fileIngest = (filePath: string): NormalizedLogRecord[] => {
  try {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split content into lines
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');

    // Process each line
    const normalizedRecords = lines.map(line => {
      try {
        // Parse the JSON line
        const record = JSON.parse(line);

        // Normalize timestamp - if invalid or missing, set to current time
        let normalizedTimestamp = record.timestamp;
        try {
          if (record.timestamp) {
            const timestampDate = new Date(record.timestamp);
            if (isNaN(timestampDate.getTime())) {
              normalizedTimestamp = new Date().toISOString();
            }
          } else {
            normalizedTimestamp = new Date().toISOString();
          }
        } catch (error) {
          normalizedTimestamp = new Date().toISOString();
        }

        // Normalize level - if invalid, set to 'info'
        const normalizedLevel = ['info', 'warn', 'error', 'debug'].includes(record.level)
          ? record.level
          : 'info';

        // Ensure message exists, default to empty string if missing
        const normalizedMessage = record.message || '';

        return {
          timestamp: normalizedTimestamp,
          level: normalizedLevel,
          message: normalizedMessage
        };
      } catch (error) {
        // If JSON parsing fails, return a default record with current timestamp
        return {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: ''
        };
      }
    });

    return normalizedRecords;
  } catch (error) {
    // Log error or handle as needed
    return [];
  }
};