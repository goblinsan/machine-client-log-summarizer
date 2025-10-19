import { FileIngest } from './fileIngest';
import fs from 'fs/promises';
describe('FileIngest', () => {
  it('should read a JSON file and return an array of log entries', async () => {
    const filePath = 'path/to/file.json';
    fs.writeFileSync(filePath, fileContent);
    const fileIngest = new FileIngest();
    beforeEach(async () => {
      await fs.unlink(filePath);
    });
    expect(await fileIngest.readJsonFile(filePath)).toBeInstanceOf(Array);
  });
});