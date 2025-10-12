import fs from 'fs';
import path from 'path';

export interface LogRecord {
  timestamp: string;
  level: string;
  message: string | null;
  raw: string;
}

export interface ProcessedLogData {
  records: LogRecord[];
}

/**
 * Processes a JSON log file and returns normalized records
 * Each line in the file is expected to be a valid JSON object
 * @param filePath - Path to the log file
 * @returns Array of normalized log records
 */
export function processLogFile(filePath: string): LogRecord[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    if (!fileContent.trim()) {
      return [];
    }

    const lines = fileContent.split(/\r?\n/);
    const records: LogRecord[] = [];

    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }

      try {
        const parsed = JSON.parse(line);

        // Validate required fields
        if (!parsed.timestamp || !parsed.level || parsed.message === undefined) {
          throw new Error('Missing required fields: timestamp, level, or message');
        }

        // Normalize the record structure
        const normalizedRecord: LogRecord = {
          timestamp: parsed.timestamp,
          level: parsed.level,
          message: parsed.message,
          raw: line
        };

        records.push(normalizedRecord);
      } catch (parseError) {
        // Re-throw with more context
        throw new Error(`Failed to parse JSON line: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
      }
    }

    return records;
  } catch (error) {
    // Re-throw with more context
    throw new Error(`Failed to read file ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Processes multiple log files and returns combined normalized records
 * @param filePaths - Array of paths to log files
 * @returns Array of normalized log records from all files
 */
export function processLogFiles(filePaths: string[]): LogRecord[] {
  const allRecords: LogRecord[] = [];

  for (const filePath of filePaths) {
    try {
      const records = processLogFile(filePath);
      allRecords.push(...records);
    } catch (error) {
      // Log error but continue processing other files
      console.error(`Error processing file ${filePath}:`, error instanceof Error ? error.message : String(error));
    }
  }

  return allRecords;
}

/**
 * Processes a directory of log files and returns combined normalized records
 * @param dirPath - Path to the directory containing log files
 * @returns Array of normalized log records from all files in directory
 */
export function processLogDirectory(dirPath: string): LogRecord[] {
  try {
    const files = fs.readdirSync(dirPath);
    const logFiles = files.filter(file => file.endsWith('.log'));

    const filePaths = logFiles.map(file => path.join(dirPath, file));
    return processLogFiles(filePaths);
  } catch (error) {
    throw new Error(`Failed to process directory ${dirPath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}