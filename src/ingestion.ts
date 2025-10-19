import { FileIngest } from './fileIngest';

export function ingestLogRecords(filePaths: string[]): Promise<LogEntry[]> {
  const fileIngest = new FileIngest();
  return Promise.all(filePaths.map((filePath) => fileIngest.readJsonFile(filePath)));