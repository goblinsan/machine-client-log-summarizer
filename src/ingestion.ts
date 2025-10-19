import { FileIngest } from './fileIngest';
export default function ingestLogRecords(filePaths: string[]): Promise<LogEntry[]> {
  const fileIngest = new FileIngest();
  return Promise.all(filePaths.map((filePath) => fileIngest.readJsonFile(filePath).then((logEntries) => logEntries)));
}