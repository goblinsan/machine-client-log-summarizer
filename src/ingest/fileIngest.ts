import { LogEntry } from './logEntry';

export function fileIngest(filePath: string): Promise<LogEntry[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const logEntries = JSON.parse(data).map((entry: any) => ({
            timestamp: new Date(entry.timestamp),
            message: entry.message,
            data: entry.data,
          }));
          resolve(logEntries);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}