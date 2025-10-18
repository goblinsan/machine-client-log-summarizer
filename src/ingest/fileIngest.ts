import { LogEntry } from '../logEntry';
import * as fs from 'fs';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = await fs.promises.readFile(filePath, 'utf8');
  const logEntries = JSON.parse(data);
  return logEntries.map((entry) => ({ timestamp: new Date(entry.timestamp), message: entry.message }));