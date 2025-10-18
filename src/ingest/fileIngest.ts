import * as fs from 'fs';
import { LogEntry } from './logEntry';
export function fileIngest(filePath: string): Promise<LogEntry[]> {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    try {
      const data = JSON.parse(fileContent);
      resolve(data.map((entry: any) => ({
        timestamp: new Date(entry.timestamp),
        message: entry.message,
        data: entry.data
      })));
    } catch (error) {
      reject(error);
    }
  });