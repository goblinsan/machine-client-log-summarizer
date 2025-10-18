import fs from 'fs';
import { LogEntry } from './logEntry';
export function fileIngest(filePath: string): Promise<LogEntry[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      }
      try {
        const records = JSON.parse(data.toString());
        resolve(records.map(record => ({ timestamp: new Date(), message: record.message, data: record.data })));
      } catch (error) {
        reject(error);
      }
    });
  });
}