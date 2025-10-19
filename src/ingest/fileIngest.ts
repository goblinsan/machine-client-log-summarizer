import fs from 'fs';
import * as path from 'path';
import { LogEntry } from './logEntry';
export class FileIngest {
  private filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }
  public readJsonFile(): Promise<LogEntry[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const logEntries = JSON.parse(data).map((entry: any) => ({
            timestamp: new Date(entry.timestamp),
            message: entry.message,
            data: entry.data,
          }));
          resolve(logEntries);
        }
      });
    });
  }
}