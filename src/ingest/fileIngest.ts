import { join } from 'path';
import fs from 'fs/promises';
import { LogEntry } from './logEntry';
export class FileIngest {
  async readJsonFile(filePath: string): Promise<LogEntry[]> {
    const fileContent = await fs.readFile(join(process.cwd(), filePath), 'utf8');
    return JSON.parse(fileContent).map((entry) => ({
      timestamp: new Date(entry.timestamp),
      message: entry.message,
      data: entry.data,
    }));
  }
}