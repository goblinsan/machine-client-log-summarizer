import { FileIngest } from './fileIngest';
import fs from 'fs/promises';
describe('FileIngest', () => {
  it('should read a JSON file and return an array of log entries', async () => {
    const filePath = 'path/to/file.json';
    const fileContent = '{"timestamp": "2022-01-01T00:00:00.000Z", "message": "test message"}';
    fs.writeFileSync(filePath, fileContent);
    const fileIngest = new FileIngest();
    expect(await fileIngest.readJsonFile(filePath)).toBeInstanceOf(Array);
  });
});