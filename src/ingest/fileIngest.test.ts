import { fileIngest } from './fileIngest';
import fs from 'fs';

describe('fileIngest', () => {
  it('should return an array of log entries', async () => {
    const filePath = 'path/to/log.json';
    const data = JSON.stringify([{ timestamp: 1643723400, message: 'Test' }]);
    fs.writeFileSync('path/to/log.json', data);
    const logEntries = await fileIngest(filePath);
    expect(logEntries.length).toBe(1);
  });
});