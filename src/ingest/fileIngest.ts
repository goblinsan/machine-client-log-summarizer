import * as fs from 'fs';
import { LogEntry } from './logEntry';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = await fs.promises.readFile(filePath, 'utf8');
  const logEntries = JSON.parse(data);

  // Normalize log entries
  return logEntries.map((entry) => ({
    timestamp: new Date(entry.timestamp),
    message: entry.message,
    data: entry.data || undefined,
  }));