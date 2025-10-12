import fs from 'fs';
import path from 'path';

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

export function parseLogContent(content: string): LogEntry[] {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed.map(entry => ({
        timestamp: entry.timestamp,
        level: entry.level,
        message: entry.message
      }));
    }
    return [];
  } catch (e) {
    return [];
  }
}

export function readLogFromFile(filePath: string): Promise<LogEntry[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(parseLogContent(data));
    });
  });
}

export function processLogFiles(filePaths: string[]): Promise<LogEntry[]> {
  const promises = filePaths.map(filePath => readLogFromFile(filePath));
  return Promise.all(promises).then(results => {
    return results.flat();
  });
}