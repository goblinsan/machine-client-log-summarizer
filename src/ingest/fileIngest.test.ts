import { FileIngest } from './fileIngest';

describe('FileIngest', () => {
  it('should read a JSON file and return an array of log entries', async () => {
    const filePath = 'path/to/file.json';
    const fileIngest = new FileIngest();
    const logEntries = await fileIngest.readJsonFile(filePath);
    expect(logEntries).toBeInstanceOf(Array);
  });
});