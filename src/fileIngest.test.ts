import { processFile, processLogs, processFileWithSummary } from './fileIngest';
import fs from 'fs';
import path from 'path';
import { Summary } from './fileIngest';

describe('fileIngest', () => {
  const mockLogData = [
    { level: 'info', source: 'app1', timestamp: '2023-01-01T00:00:00Z', message: 'test log 1' },
    { level: 'error', source: 'app2', timestamp: '2023-01-01T01:00:00Z', message: 'test log 2' },
    { level: 'debug', source: 'app1', timestamp: '2023-01-01T02:00:00Z', message: 'test log 3' }
  ];

  const mockSummary: Summary = {
    totalEntries: 3,
    entryCounts: { info: 1, error: 1, debug: 1 },
    levels: ['info', 'error', 'debug'],
    earliestTimestamp: '2023-01-01T00:00:00Z',
    latestTimestamp: '2023-01-01T02:00:00Z',
    sources: ['app1', 'app2']
  };

  beforeEach(() => {
    // Mock fs.readFile to return mock log data
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, encoding, callback) => {
      const mockData = JSON.stringify(mockLogData);
      (callback as any)(null, mockData);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should process a file and return its logs', async () => {
    const result = await processFile('mock-file-path');
    expect(result).toEqual(mockLogData);
  });

  it('should process logs and return a summary', () => {
    const result = processLogs(mockLogData);
    expect(result).toEqual(mockSummary);
  });

  it('should process a file with summary', async () => {
    const result = await processFileWithSummary('mock-file-path');
    expect(result).toEqual(mockSummary);
  });

  it('should handle file processing errors gracefully', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, encoding, callback) => {
      (callback as any)(new Error('File not found'), null);
    });

    await expect(processFile('mock-file-path')).rejects.toThrow();
  });

  it('should handle JSON parsing errors gracefully', async () => {
    jest.spyOn(fs, 'readFile').mockImplementation((filePath, encoding, callback) => {
      (callback as any)(null, 'invalid json');
    });

    await expect(processFile('mock-file-path')).rejects.toThrow();
  });
});