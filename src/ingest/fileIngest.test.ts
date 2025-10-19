import { FileIngest } from './fileIngest';
import * as fs from 'fs';

describe('FileIngest', () => {
  it('should read a JSON file and return normalized log entries', async () => {
    const filePath = 'path/to/example.json';
    const expectedLogEntries = [
      { timestamp: new Date('2022-01-01T00:00:00.000Z'), message: 'Example message 1' },
      { timestamp: new Date('2022-01-02T00:00:00.000Z'), message: 'Example message 2' },
    ];

    const fileIngest = new FileIngest();
    const logEntries = await fileIngest.readJsonFile(filePath);
    expect(logEntries).toEqual(expectedLogEntries);
  });
});