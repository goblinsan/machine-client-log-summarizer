import { promises as fs } from 'fs';

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

export interface ProcessedLogFile {
  fileName: string;
  fileSize: number;
  parsedContent: LogEntry[];
}

export async function processLogFile(filePath: string): Promise<ProcessedLogFile> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const stats = await fs.stat(filePath);

    // Split content into lines and filter out empty lines
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');

    // Parse each line into log entries
    const parsedContent: LogEntry[] = lines.map(line => {
      // Match timestamp, level and message
      const logEntryRegex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+(\w+)\s+(.*)$/;
      const match = line.match(logEntryRegex);

      if (match) {
        return {
          timestamp: match[1],
          level: match[2],
          message: match[3] || '',
        };
      } else {
        // If line doesn't match expected format, treat as invalid log entry
        return {
          timestamp: line,
          level: 'UNKNOWN',
          message: '',
        };
      }
    });

    return {
      fileName: filePath,
      fileSize: stats.size,
      parsedContent,
    };
  } catch (error) {
    throw new Error(`Failed to process log file ${filePath}: ${(error as Error).message}`);
  }
}