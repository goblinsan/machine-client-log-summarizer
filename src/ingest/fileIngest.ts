import fs from 'fs/promises';
import path from 'path';
export async function fileIngest(file: string): Promise<any[]> {
  const data = await fs.readFile(file, 'utf8');
  const records = JSON.parse(data);

  // Normalize log entries
  return records.map((record) => ({
    timestamp: record.timestamp,
    level: record.level,
    message: record.message,
  }));
}