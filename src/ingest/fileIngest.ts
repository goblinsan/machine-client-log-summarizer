import { LogEntry } from './logEntry';

export class FileIngest {
  async readJsonFile(filePath: string): Promise<LogEntry[]> {
    const fileContent = await this.readFile(filePath);
    return JSON.parse(fileContent).map((entry) => this.normalizeLogEntry(entry));
  }

  private async readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  private normalizeLogEntry(entry: any): LogEntry {
    return {
      timestamp: new Date(entry.timestamp),
      message: entry.message,
      data: entry.data,
    };
  }