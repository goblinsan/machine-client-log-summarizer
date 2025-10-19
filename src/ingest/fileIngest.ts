import { readFileSync } from 'fs';

export interface FileIngestOptions {
  filePath: string;
}
export class FileIngest {
  async readJsonFile(options: FileIngestOptions): Promise<LogEntry[]> {
    const fileContent = readFileSync(options.filePath, 'utf8');
    return JSON.parse(fileContent).map((entry) => ({
      timestamp: new Date(entry.timestamp),
      message: entry.message,
    }));
  }
  async ingest(options: FileIngestOptions): Promise<LogEntry[]> {
    const logEntries = await this.readJsonFile(options);
    return logEntries;
  }