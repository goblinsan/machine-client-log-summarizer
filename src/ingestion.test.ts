import { processLogFiles, processLogFile, processLogFilesFromMultipleSources } from './ingestion';
import { readAndNormalizeRecords } from './ingest/fileIngest';
import { promises as fs } from 'fs';
import path from 'path';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

describe('ingestion', () => {
  const mockLogRecords = [
    {
      timestamp: '2023-01-01T00:00:00.000Z',
      level: 'INFO',
      message: 'Test log message',
      service: 'test-service'
    }
  ];

  const mockNormalizedRecords = [
    {
      timestamp: new Date('2023-01-01T00:00:00.000Z'),
      level: 'INFO',
      message: 'Test log message',
      service: 'test-service'
    }
  ];

  it('should process a single log file', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockLogRecords));

    const result = await processLogFile('test.json');
    expect(result).toEqual(mockNormalizedRecords);
  });

  it('should process multiple log files', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockLogRecords));

    const result = await processLogFilesFromMultipleSources(['file1.json', 'file2.json']);
    expect(result).toEqual(mockNormalizedRecords);
  });

  it('should process log files from multiple sources', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockLogRecords));

    const result = await processLogFiles(['file1.json', 'file2.json']);
    expect(result).toEqual(mockNormalizedRecords);
  });

  it('should handle file reading errors', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

    await expect(processLogFile('nonexistent.json')).rejects.toThrow('File not found');
  });
});