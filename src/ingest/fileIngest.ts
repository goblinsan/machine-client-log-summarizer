import { parse } from 'ndjson';
import * as fs from 'fs';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = await fs.promises.readFile(filePath, 'utf8');
  if (data.includes('\n')) {
    return parse(data).map((entry) => ({
      timestamp: new Date(entry.timestamp),
      message: entry.message,
    }));
  } else {
    try {
      const json = JSON.parse(data);
      return [json];
    } catch (error) {
      throw new Error(`Error parsing JSON file: ${error.message}`);
    }
  }