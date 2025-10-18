import { fileIngest } from './fileIngest';
import * as fs from 'fs';
import { LogEntry } from '../logEntry';
jest.setTimeout(10000);
describe('fileIngest', () => {
  it('should read JSON file and return normalized records', async () => {
    const filePath = 'path/to/log.json';
    const logEntries = await fileIngest(filePath);
    expect(logEntries).toBeInstanceOf(Array);
  });
});