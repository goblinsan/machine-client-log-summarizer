import { readFileSync } from 'fs';

export interface LogEntry {
  timestamp: Date;
  message: string;
  data?: { type: 'array'; items: any[] } | { type: 'object'; properties: any };
}

export class FileIngest {
  public readJsonFile(filePath: string): Promise<LogEntry[]> {
    const jsonData = readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  }
}