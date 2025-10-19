import { LogEntry } from './logEntry';

export interface FileIngestOptions {
  filePath: string;
}

export class FileIngest {
  private logEntries: LogEntry[] = [];

  async readJsonFile(options: FileIngestOptions): Promise<LogEntry[]> {
    const fileContent = await import('fs').promises.readFile(options.filePath, 'utf8');
    return JSON.parse(fileContent).map((entry) => ({ ...entry }));
  }

  async ingest(options: FileIngestOptions): Promise<LogEntry[]> {
    this.logEntries = await this.readJsonFile(options);
    return this.logEntries;
  }