import { processLogFiles } from './fileIngest';
describe('processLogFiles', () => {
  it('should handle empty file list gracefully', async () => {
    const result = await processLogFiles([]);

    expect(result).toEqual([]);
  });
  it('should read and normalize log entries from files', async () => {
    // Mock file contents
    const fileList = ['path/to/file1.json', 'path/to/file2.json'];
    const fileContents = [
      { timestamp: '2023-02-15T14:30:00.000Z', client_id: 'client-123' },
      { timestamp: '2023-02-16T10:45:00.000Z', client_id: 'client-456' }
    ];

    // Mock fs.readFile to return the file contents
    const mockReadFile = jest.spyOn(fs, 'readFile').mockImplementationOnce((file) => {
      if (file === fileList[0]) {
        return Promise.resolve(JSON.stringify(fileContents[0]));
      } else if (file === fileList[1]) {
        return Promise.resolve(JSON.stringify(fileContents[1]));
      }
    });

    const result = await processLogFiles(fileList);

    expect(result).toEqual([
      { timestamp: '2023-02-15T14:30:00.000Z', client_id: 'client-123' },
      { timestamp: '2023-02-16T10:45:00.000Z', client_id: 'client-456' }
    ]);

    mockReadFile.mockRestore();
  });
});