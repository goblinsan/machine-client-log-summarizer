import fs from 'fs';

// Define the structure of a log record
export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

// Normalize a single log record to ensure consistent structure
export function normalizeRecord(record: any): LogRecord {
  return {
    timestamp: record.timestamp || '',
    level: record.level || '',
    message: record.message || '',
  };
}

// Ingest multiple JSON files and return normalized records
export function ingestFiles(filePaths: string[]): LogRecord[] {
  const allRecords: LogRecord[] = [];

  for (const filePath of filePaths) {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist: ${filePath}`);
    }

    try {
      // Read and parse the file content
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsedRecords: any[] = JSON.parse(fileContent);

      // Normalize each record and add to the result
      const normalizedRecords = parsedRecords.map(normalizeRecord);
      allRecords.push(...normalizedRecords);
    } catch (error) {
      throw new Error(`Failed to parse JSON from file ${filePath}: ${error}`);
    }
  }

  return allRecords;
}