import * as fs from 'fs';
import { LogEntry } from './logEntry';
export async function fileIngest(filePath: string): Promise<LogEntry> {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return {
      timestamp: new Date(data.timestamp),
      message: data.message,
      data: data.data || undefined
    };
  } catch (error) {
    throw error;
  }
}