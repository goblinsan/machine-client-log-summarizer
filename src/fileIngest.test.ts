import { ingestFile } from './fileIngest';

describe('ingestFile', () => {
  it('should return normalized records', async () => {
    const filePath = 'path/to/log.json';
    const logRecords = await ingestFile(filePath);
    expect(logRecords).toBeInstanceOf(Array);
  });
});