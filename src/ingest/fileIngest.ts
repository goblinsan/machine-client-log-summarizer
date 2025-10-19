import { readFile } from 'fs/promises';
import { join } from 'path';
import { LogEntry } from './logEntry';
export class FileIngest {
  async readJsonFile(filePath: string): Promise<LogEntry[]> {
    const fileContent = await readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  }
}