import { describe, it, expect, vi } from 'vitest';
import { readAndNormalizeFile } from './fileIngest';

// Mock the fs module to simulate file reading
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
  },
}));

describe('readAndNormalizeFile', () => {
  it('should read and normalize a valid JSON file', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'Test log entry 1' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'Test log entry 2' },
    ];

    const mockFileContent = JSON.stringify(mockData);

    vi.mocked(require('fs').promises.readFile).mockResolvedValueOnce(mockFileContent);

    const result = await readAndNormalizeFile('test.json');

    expect(result).toEqual(mockData);
  });

  it('should throw an error for invalid JSON', async () => {
    const mockFileContent = '{ invalid json }';

    vi.mocked(require('fs').promises.readFile).mockResolvedValueOnce(mockFileContent);

    await expect(readAndNormalizeFile('test.json')).rejects.toThrow('Failed to parse JSON');
  });

  it('should throw an error for missing file', async () => {
    vi.mocked(require('fs').promises.readFile).mockRejectedValueOnce(new Error('File not found'));

    await expect(readAndNormalizeFile('nonexistent.json')).rejects.toThrow('Failed to read file');
  });

  it('should handle empty array in JSON', async () => {
    const mockFileContent = '[]';

    vi.mocked(require('fs').promises.readFile).mockResolvedValueOnce(mockFileContent);

    const result = await readAndNormalizeFile('empty.json');

    expect(result).toEqual([]);
  });

  it('should handle single log entry', async () => {
    const mockData = { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'Single log entry' };

    const mockFileContent = JSON.stringify(mockData);

    vi.mocked(require('fs').promises.readFile).mockResolvedValueOnce(mockFileContent);

    const result = await readAndNormalizeFile('single.json');

    expect(result).toEqual([mockData]);
  });

  it('should normalize log entries with missing fields', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'Test log entry 2' },
    ];

    const mockFileContent = JSON.stringify(mockData);

    vi.mocked(require('fs').promises.readFile).mockResolvedValueOnce(mockFileContent);

    const result = await readAndNormalizeFile('normalized.json');

    expect(result).toEqual([
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: '' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'Test log entry 2' },
    ]);
  });
});