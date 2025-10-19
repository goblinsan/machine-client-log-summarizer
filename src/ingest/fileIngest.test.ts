import { fileIngest } from './fileIngest';

const filePath = 'path/to/example.json';
const jsonData = [
  { timestamp: new Date('2022-01-01T00:00:00.000Z'), message: 'example log entry', data: [] },
];
expect(fileIngest(filePath)).resolves.toEqual([jsonData[0]]);