import { promises as fs } from 'fs';
import path from 'path';

/**
 * Represents a normalized log record
 */
export interface LogRecord {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Reads a JSON file and returns normalized log records
 * @param filePath - Path to the JSON file
 * @returns Promise resolving to array of normalized log records
 */
export async function fileIngest(filePath: string): Promise<LogRecord[]> {
  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Parse the JSON content
    const parsedContent = JSON.parse(fileContent);

    // Handle different JSON structures
    let records: LogRecord[] = [];

    if (Array.isArray(parsedContent)) {
      // If it's an array of log entries
      records = parsedContent.map(entry => normalizeLogRecord(entry));
    } else if (typeof parsedContent === 'object') {
      // If it's a single log entry or object with logs
      records = [normalizeLogRecord(parsedContent)];
    } else {
      // If it's a string or other primitive, treat as single message
      records = [{
        timestamp: new Date().toISOString(),
        level: 'info',
        message: String(parsedContent)
      }];
    }

    return records;
  } catch (error) {
    throw new Error(`Failed to ingest file ${filePath}: ${(error as Error).message}`);
  }
}

/**
 * Normalizes a log record to ensure consistent structure
 * @param rawRecord - Raw log record from file
 * @returns Normalized log record
 */
function normalizeLogRecord(rawRecord: any): LogRecord {
  // Ensure required fields exist with defaults
  const normalizedRecord: LogRecord = {
    timestamp: rawRecord.timestamp || new Date().toISOString(),
    level: rawRecord.level || 'info',
    message: rawRecord.message || '',
    source: rawRecord.source,
    metadata: rawRecord.metadata
  };

  // Validate level
  if (!['info', 'warn', 'error', 'debug'].includes(normalizedRecord.level)) {
    normalizedRecord.level = 'info';
  }

  return normalizedRecord;
}