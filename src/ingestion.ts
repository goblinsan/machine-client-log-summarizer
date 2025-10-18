import { fileIngest } from '../ingest/fileIngest';
export function ingest(filePath: string): LogEntry[] {
  return fileIngest(filePath);
}