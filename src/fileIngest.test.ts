import { fileIngest } from './fileIngest';
 it('should read JSON files and return normalized records', async () => {
   const file = 'path/to/file.json';
   const data = await fileIngest(file);
   expect(data).toBeInstanceOf(Array);
 });