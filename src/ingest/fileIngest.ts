import * as fs from 'fs';
import * as path from 'path';
import * as json5 from 'json5';
export interface LogEntry {
  timestamp: Date;
  message: string;
}
export function fileIngest(filePath: string): LogEntry[] {
  const data = fs.readFileSync(filePath, 'utf8');
  if (data.includes('\n')) {
    return json5.parse(data);
  } else {
    try {
      return [json5.parse(data)];
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  }