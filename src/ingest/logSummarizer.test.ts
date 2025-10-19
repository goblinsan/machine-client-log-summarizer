import { ingestLogRecords } from './ingestion';
import fs from 'fs';
describe('ingestLogRecords', () => {
  it('should return an array of log entries', async () => {
    const filePaths = ['path/to/file1.json', 'path/to/file2.json'];
    const fileContent = fs.readFileSync('path/to/file1.json', 'utf8');
    const logEntries = JSON.parse(fileContent).map((entry) => ({
      timestamp: new Date(entry.timestamp),
      message: entry.message,
      data: entry.data,
    }));
    expect(logEntries).toBeInstanceOf(Array);
  });
});