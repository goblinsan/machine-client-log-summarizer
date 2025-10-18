import { fileIngest } from './fileIngest';
import fs from 'fs';

describe('fileIngest', () => {
  it('should return an array of LogEntry objects', async () => {
    const filePath = join(__dirname, 'example.json');
    const data = JSON.stringify([{ timestamp: '2022-01-01T00:00:00.000Z', message: 'Hello World' }]);
    fs.writeFileSync(filePath, data);
    const result = await fileIngest(filePath);
    expect(result).toEqual([{ timestamp: new Date('2022-01-01T00:00:00.000Z'), message: 'Hello World' }]);
  });
});