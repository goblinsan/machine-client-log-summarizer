import * as fs from 'fs';
import { LogEntry } from './logEntry';
export function fileIngest(filePath: string): LogEntry[] | undefined {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data.map((entry) => ({ timestamp: new Date(entry.timestamp), message: entry.message }));
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return undefined;
  }