// fileIngest.ts

import fs from 'fs';
import { promisify } from 'util';

// Define the structure of a normalized log record
export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

// Normalize a single log record
export function normalizeRecord(logLine: any): LogRecord | null {
  // Validate that the log line has required fields
  if (!logLine.timestamp || !logLine.level || !logLine.message) {
    return null;
  }

  // Return normalized record
  return {
    timestamp: logLine.timestamp,
    level: logLine.level,
    message: logLine.message,
  };
}

// Read and parse JSON logs into normalized records
export async function fileIngest(filePath: string): Promise<LogRecord[]> {
  try {
    // Read file content
    const readFile = promisify(fs.readFile);
    const content = await readFile(filePath, 'utf-8');

    // Split content into lines
    const lines = content.split('\n').filter(line => line.trim() !== '');

    // Parse each line as JSON and normalize
    const records: LogRecord[] = [];

    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        const normalized = normalizeRecord(parsed);

        if (normalized) {
          records.push(normalized);
        }
      } catch (e) {
        // Skip invalid JSON lines
        continue;
      }
    }

    return records;
  } catch (e) {
    // Return empty array on file read errors
    return [];
  }
}