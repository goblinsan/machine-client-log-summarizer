import fs from 'fs';
import path from 'path';

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source?: string;
}

/**
 * Parse a log line into structured data
 */
export function parseLogLine(line: string): LogEntry | null {
  // Basic log line parsing - assumes format like:
  // "2023-01-01T12:00:00.000Z [INFO] - User login successful"
  
  const timestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d*Z?/;
  const levelRegex = /\[(INFO|WARN|ERROR|DEBUG)\]/;

  const timestampMatch = line.match(timestampRegex);
  const levelMatch = line.match(levelRegex);

  if (!timestampMatch || !levelMatch) {
    return null;
  }

  const timestamp = timestampMatch[0];
  const level = levelMatch[1].toLowerCase() as 'info' | 'warn' | 'error' | 'debug';
  const message = line.substring(line.indexOf(']') + 2).trim();

  return {
    timestamp,
    level,
    message
  };
}

/**
 * Read and parse a log file into structured entries
 */
export async function processFile(filePath: string): Promise<LogEntry[]> {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist: ${filePath}`);
    }

    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split into lines and process each line
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');

    const logs: LogEntry[] = [];

    for (const line of lines) {
      const parsedLog = parseLogLine(line);
      if (parsedLog) {
        logs.push(parsedLog);
      }
    }

    return logs;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw new Error(`Failed to process log file: ${error}`);
  }
}

/**
 * Process a file and return its content as string
 */
export async function readRawFile(filePath: string): Promise<string> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading raw file ${filePath}:`, error);
    throw new Error(`Failed to read raw file: ${error}`);
  }
}

/**
 * Validate if a file is a log file based on extension
 */
export function isLogFile(filePath: string): boolean {
  const validExtensions = ['.log', '.txt'];
  const ext = path.extname(filePath).toLowerCase();
  return validExtensions.includes(ext);
}