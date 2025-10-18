import { readFileSync } from 'fs';
import { LogEntry } from './logEntry';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = JSON.parse(readFileSync(filePath, 'utf8'));
  return data.map((entry) => ({
    timestamp: new Date(entry.timestamp),
    message: entry.message,
    data: entry.data,
  }));