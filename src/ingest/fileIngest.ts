import * as fs from 'fs';
import { LogEntry } from './logEntry';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = await fs.promises.readFile(filePath, 'utf8');
  const logEntries = JSON.parse(data);

  // Handle ndjson and array edge cases
  if (Array.isArray(logEntries)) {
    return logEntries.map((entry) => ({ ...entry }));
  } else {
    return [logEntries];
  }