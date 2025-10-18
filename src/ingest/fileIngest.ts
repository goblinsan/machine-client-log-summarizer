import * as fs from 'fs';
import { LogEntry } from './logEntry';
export function fileIngest(filePath: string): Promise<LogEntry[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const logEntries = JSON.parse(data.toString());
        resolve(logEntries.map((entry) => ({
          timestamp: new Date(entry.timestamp),
          message: entry.message,
        })));
      }
    });
  });