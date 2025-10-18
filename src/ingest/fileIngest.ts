import { readFileSync } from 'fs';
import { LogEntry } from './logEntry';
export function fileIngest(filePath: string): LogEntry[] {
  const jsonData = JSON.parse(readFileSync(filePath, 'utf8'));

  // Normalize the records
  const normalizedRecords: LogEntry[] = jsonData.map((record) => ({
    timestamp: new Date(record.timestamp),
    message: record.message,
    data: record.data || [],
  }));
  return normalizedRecords;