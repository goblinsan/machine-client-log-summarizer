import { FileIngest } from './fileIngest';

describe('FileIngest', () => {
  it('should read JSON file and return normalized records', async () => {
    const fileContent = '{"timestamp": "2022-01-01T00:00:00.000Z", "message": "Hello World"}';
    const options = { filePath: 'test.json' };
    const fileIngest = new FileIngest();
    const logEntries = await fileIngest.readJsonFile(options);
    expect(logEntries).toEqual([{ timestamp: new Date('2022-01-01T00:00:00.000Z'), message: 'Hello World' }]);
  });

  it('should ingest JSON file and return normalized records', async () => {
    const fileContent = '{"timestamp": "2022-01-01T00:00:00.000Z", "message": "Hello World"}';
    const options = { filePath: 'test.json' };
    const fileIngest = new FileIngest();
    const logEntries = await fileIngest.ingest(options);
    expect(logEntries).toEqual([{ timestamp: new Date('2022-01-01T00:00:00.000Z'), message: 'Hello World' }]);
  });
});