import * as jsonfile from 'jsonfile';
import { LogEntry } from '../logEntry';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = readFileSync(filePath, 'utf8');
  let records;
  try {
    records = await jsonfile.parse(data);
  } catch (error) {
    // TO DO: handle error when parsing JSON files
    console.error(error);
  }
  return records.map((record) => ({
    timestamp: new Date(record.timestamp),
    message: record.message,
  }));
}