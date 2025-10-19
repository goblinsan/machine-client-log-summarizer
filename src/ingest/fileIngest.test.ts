import { fileIngest } from './fileIngest';
import fs from 'fs';

describe('fileIngest', () => {
  it('should read JSON file and return normalized records', async () => {
    const filePath = 'path/to/example.json';
    const expectedData = [];
    expect(fileIngest(filePath)).resolves.toEqual(expectedData);
  });
});