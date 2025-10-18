import { fileIngest } from './fileIngest';
import fs from 'fs';
describe('fileIngest', () => {
  it('should return an array of LogEntry objects', async () => {
    const filePath = 'path/to/log.json';
    const logEntries = await fileIngest(filePath);
    expect(logEntries).toBeInstanceOf(Array);
  });
});