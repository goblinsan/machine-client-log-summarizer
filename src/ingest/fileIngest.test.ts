import { fileIngest } from './fileIngest';
 it('should return an array of LogEntry objects', async () => {
   const filePath = 'path/to/example.json';
   const expectedRecords = [
     { timestamp: new Date(), message: 'example', data: ['value'] },
   ];
   expect(fileIngest(filePath)).toEqual(expectedRecords);
 });