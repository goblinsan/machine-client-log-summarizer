import fs from 'fs';
import { LogEntry } from './logEntry';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = await fs.promises.readFile(filePath, 'utf8');
  const records = JSON.parse(data);

  return records.map((record) => ({
    timestamp: new Date(record.timestamp),
    message: record.message,
  }));