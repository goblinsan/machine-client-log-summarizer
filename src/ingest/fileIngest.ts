import * as fs from 'fs';
import { LogEntry } from './logEntry';
export function fileIngest(filePath: string): Promise<LogEntry[]> {
  return new Promise((resolve) => {
    const data = fs.readFileSync(filePath, 'utf8');
    try {
      const jsonData = JSON.parse(data);
      resolve(jsonData.map((entry) => ({ timestamp: entry.timestamp, message: entry.message, data: entry.data })));
    } catch (error) {
      console.error(`Error parsing JSON file at ${filePath}:`, error);
      resolve([]);
    }
  });
}