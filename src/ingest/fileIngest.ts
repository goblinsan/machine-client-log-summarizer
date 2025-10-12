import fs from 'fs/promises';
import path from 'path';

// Define the structure of a normalized log record
export interface NormalizedLogRecord {
  timestamp: string;
  level: string;
  message: string;
  service?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

// Define the structure of a raw log record (from JSON)
export interface RawLogRecord {
  timestamp?: string;
  level?: string;
  message?: string;
  service?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Normalize a raw log record into a standardized format
 */
export function normalizeLogRecord(raw: RawLogRecord): NormalizedLogRecord {
  return {
    timestamp: raw.timestamp || new Date().toISOString(),
    level: raw.level || 'info',
    message: raw.message || '',
    service: raw.service,
    source: raw.source,
    metadata: raw.metadata || {}
  };
}

/**
 * Read and parse a JSON file containing log records
 * Returns an array of normalized log records
 */
export async function ingestFile(filePath: string): Promise<NormalizedLogRecord[]> {
  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf8');
    
    // Parse the JSON content
    const parsedContent = JSON.parse(fileContent);

    // Handle single log record (object) vs array of records
    let records: RawLogRecord[];

    if (Array.isArray(parsedContent)) {
      records = parsedContent;
    } else if (typeof parsedContent === 'object' && parsedContent !== null) {
      records = [parsedContent];
    } else {
      throw new Error('Invalid JSON format: expected array or object');
    }

    // Normalize each record
    return records.map(normalizeLogRecord);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to ingest file ${filePath}: ${error.message}`);
    }
    throw new Error(`Failed to ingest file ${filePath}: Unknown error`);
  }
}

/**
 * Read and parse multiple JSON files
 * Returns a flattened array of normalized log records
 */
export async function ingestFiles(filePaths: string[]): Promise<NormalizedLogRecord[]> {
  const allRecords: NormalizedLogRecord[] = [];

  for (const filePath of filePaths) {
    const records = await ingestFile(filePath);
    allRecords.push(...records);
  }

  return allRecords;
}