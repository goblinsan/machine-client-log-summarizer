import { readFileSync } from 'fs';
import { LogEntry } from './logEntry';
export class FileIngest {
  public async readJsonFile(filePath: string): Promise<LogEntry[]> {
    const jsonData = JSON.parse(readFileSync(filePath, 'utf8'));
    return this.normalizeRecords(jsonData);
  }
  private normalizeRecords(data: any[]): LogEntry[] {
    return data.map((record) => ({
      timestamp: new Date(record.timestamp),
      message: record.message,
      data: record.data,
    }));
  }
}