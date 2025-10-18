import { join } from 'path';
import fs from 'fs';

export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = JSON.parse(fs.readFileSync(join(__dirname, filePath), 'utf8'));
  return data.map((entry) => ({
    timestamp: new Date(entry.timestamp),
    message: entry.message,
    data: entry.data,
  }));