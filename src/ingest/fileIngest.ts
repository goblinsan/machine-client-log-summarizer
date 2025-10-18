import { fs } from 'fs';
import { join } from 'path';
import { LogEntry } from './logEntry';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(data).map((record) => ({
    timestamp: new Date(record.timestamp),
    message: record.message,
    data: record.data || [],
  }));
}