import { join } from 'path';
export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(data).map((entry) => ({ timestamp: new Date(entry.timestamp), message: entry.message }));