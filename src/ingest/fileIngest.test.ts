import { fileIngest } from './fileIngest';

describe('fileIngest', () => {
  it('should read and parse JSON files', async () => {
    const filePath = 'path/to/example.json';
    const data = await fileIngest(filePath);
    expect(data).toBeInstanceOf(Object);
  });
});