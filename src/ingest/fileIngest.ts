import fs from 'fs';
import path from 'path';

export type LogRecord = {
  timestamp: string;
  level: string;
  message: string;
};

export const fileIngest = async (filePath: string): Promise<LogRecord[]> => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(fileContent);

    // If parsed data is not an array, return empty array
    if (!Array.isArray(parsedData)) {
      return [];
    }

    const normalizedRecords: LogRecord[] = parsedData.map((record) => {
      // Normalize timestamp - if invalid, set to current time
      let normalizedTimestamp = record.timestamp;
      try {
        const timestampDate = new Date(record.timestamp);
        if (isNaN(timestampDate.getTime())) {
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
    });

    return normalizedRecords;
  } catch (error) {
    // Log error or handle as needed
    return [];
  }
};