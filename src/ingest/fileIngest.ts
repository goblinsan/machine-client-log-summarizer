import * as fs from 'fs';
import { LogEntry } from './logEntry';
export function fileIngest(filePath: string): Promise<LogEntry[]> {
  return new Promise((resolve) => {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    resolve(jsonData);
  });
}