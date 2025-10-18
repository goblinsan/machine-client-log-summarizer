import * as fs from 'fs';
import { parse } from '@types/json';

export async function fileIngest(filePath: string): Promise<LogEntry[]> {
  const data = await fs.promises.readFile(filePath, 'utf8');
  return data.split('\n').map((line) => {
    try {
      return parse(JSON.parse(line));
    } catch (error) {
      console.error(error);
      return null;
    }
  }).filter(Boolean);