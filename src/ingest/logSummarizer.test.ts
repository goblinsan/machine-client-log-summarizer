import { ingestLogRecords } from './ingestion';
import fs from 'fs/promises';
describe('ingestLogRecords', () => {
  it('should return an array of log entries', async () => {
    const filePaths = ['path/to/file1.json', 'path/to/file2.json'];
    expect(logEntries).toBeInstanceOf(Array);
    afterEach(async () => {
      await Promise.all(filePaths.map((filePath) => fs.unlink(filePath)));
    });
  });
});