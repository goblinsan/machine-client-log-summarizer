import { readFileSync } from 'fs';
import { LogEntry } from './logEntry';
export class FileIngest {
  public async ingest(filePath: string): Promise<LogEntry[]> {
    const fileContent = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent).map((entry) => ({
      timestamp: new Date(entry.timestamp),
      message: entry.message,
      data: entry.data,
    }));
  }
}