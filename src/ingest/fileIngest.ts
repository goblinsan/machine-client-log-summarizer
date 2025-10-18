import * as fs from 'fs';
import { LogEntry } from './logEntry';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = fs.readFileSync(filePath, 'utf8');
  const logEntries = JSON.parse(data);

  // Normalize the log entries
  return logEntries.map((entry) => ({
    timestamp: new Date(entry.timestamp),
    message: entry.message,
    data: entry.data,
  }));
}