import fs from 'fs';

// Define the structure of a normalized log record
export interface LogRecord {
  timestamp: string;
  level: string;
  message: string;
}

// Normalize timestamp to ISO format
function normalizeTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return timestamp; // Return original if invalid
  }
  return date.toISOString();
}

// Validate and normalize a log record
function normalizeLogRecord(record: any): LogRecord | null {
  if (!record || typeof record !== 'object') return null;

  const { timestamp, level, message } = record;

  if (!timestamp || !level || message === undefined) return null;

  return {
    timestamp: normalizeTimestamp(timestamp),
    level,
    message: String(message)
  };
}

// Read and normalize JSON file content
export function readAndNormalizeJsonFile(filePath: string): LogRecord[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(fileContent);

    if (!Array.isArray(parsed.logs)) {
      throw new Error('Invalid JSON structure: expected logs array');
    }

    return parsed.logs
      .map(normalizeLogRecord)
      .filter((record): record is LogRecord => record !== null);

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    } else {
      throw new Error('Failed to read file');
    }
  }
}