import { fileIngest } from './fileIngest';
import * as fs from 'fs';
import { LogEntry } from '../logEntry';
test('fileIngest', async () => {
  const filePath = 'path/to/log.json';
  const logEntries = await fileIngest(filePath);
  expect(logEntries).toHaveLength(1);
});