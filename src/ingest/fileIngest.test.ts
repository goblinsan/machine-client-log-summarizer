import { FileIngest } from './fileIngest';
const filePath = 'path/to/json/file.json';

export default function testFileIngest() {
  const fileIngest = new FileIngest();
  return fileIngest.readJsonFile(filePath).then((logEntries) => logEntries);
}