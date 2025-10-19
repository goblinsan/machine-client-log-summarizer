import { ingestLogRecords } from './ingestion';

describe('ingestLogRecords', () => {
  it('should return an array of log entries', async () => {
    const filePaths = ['path/to/file1.json', 'path/to/file2.json'];
    const logEntries = await ingestLogRecords(filePaths);
    expect(logEntries).toBeInstanceOf(Array);
  });
});