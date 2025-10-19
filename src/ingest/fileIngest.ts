import * as fs from 'fs';
import { LogEntry } from './logEntry';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return jsonData.map((entry) => ({
    timestamp: new Date(entry.timestamp),
    message: entry.message,
    data: entry.data || [],
  }));
}