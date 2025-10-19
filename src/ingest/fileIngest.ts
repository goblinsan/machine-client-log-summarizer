import { LogEntry } from './logEntry';

export class FileIngest {
  private logEntries: LogEntry[] = [];

  public async readJsonFile(filePath: string): Promise<LogEntry[]> {
    const fileContent = await this.readFile(filePath);
    return JSON.parse(fileContent).map((entry) => ({
      timestamp: new Date(entry.timestamp),
      message: entry.message,
      data: entry.data,
    }));
  }

  private async readFile(filePath: string): Promise<string> {
    const fs = require('fs');
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }