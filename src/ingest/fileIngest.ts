import fs from 'fs';
import path from 'path';

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

/**
 * Processes a log file and returns parsed entries.
 * Each line is expected to follow the format:
 * YYYY-MM-DDTHH:mm:ssZ LEVEL Message
 *
 * @param filePath - Path to the log file to process
 * @returns Array of parsed log entries
 */
export function processLogFile(filePath: string): LogEntry[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    const entries: LogEntry[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Skip empty lines and comments
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }

      // Match log line format: YYYY-MM-DDTHH:mm:ssZ LEVEL Message
      const logRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\s+(\w+)\s+(.+)$/;
      const match = trimmedLine.match(logRegex);

      if (match) {
        const [, timestamp, level, message] = match;

        // Validate log level
        if (isValidLogLevel(level)) {
          entries.push({
            timestamp,
            level,
            message
          });
        } else {
          // Optionally log warning for invalid levels or skip
          console.warn(`Invalid log level found: ${level}`);
        }
      } else {
        // Optionally log warning for malformed lines or skip
        console.warn(`Malformed log line skipped: ${trimmedLine}`);
      }
    }

    return entries;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to process log file: ${error.message}`);
    } else {
      throw new Error('Failed to process log file: Unknown error');
    }
  }
}

/**
 * Validates if the log level is one of the expected values.
 *
 * @param level - Log level to validate
 * @returns True if valid, false otherwise
 */
function isValidLogLevel(level: string): boolean {
  const validLevels = ['INFO', 'WARN', 'ERROR', 'DEBUG', 'TRACE'];
  return validLevels.includes(level);
}