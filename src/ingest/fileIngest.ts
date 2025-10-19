import * as fs from 'fs';
import { LogEntry } from './logEntry';
export class FileIngest {
  public async readJsonFile(filePath: string): Promise<LogEntry[]> {
    const fileContent = await this.readFile(filePath);
    return JSON.parse(fileContent).map((entry) => ({
      timestamp: new Date(entry.timestamp),
      message: entry.message,
      data: entry.data,
    }));
  }
  private async readFile(filePath: string): Promise<string> {
    return fs.promises.readFile(filePath, 'utf8');
  }
}