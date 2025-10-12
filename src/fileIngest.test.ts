import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import { processFile } from './fileIngest';

// Mock fs module
vi.mock('fs/promises');

describe('processFile', () => {
  const mockReadFile = fs.readFile as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should process a valid JSON file and return normalized records', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'test message 1' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    const result = await processFile('test.json');

    expect(result).toEqual([
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'test message 1' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ]);

    expect(mockReadFile).toHaveBeenCalledWith('test.json', 'utf8');
  });

  it('should handle invalid JSON gracefully', async () => {
    mockReadFile.mockResolvedValue('{ invalid: json }');

    await expect(processFile('test.json')).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle missing file', async () => {
    const mockError = new Error('File not found');
    (mockError as any).code = 'ENOENT';

    mockReadFile.mockRejectedValue(mockError);

    await expect(processFile('nonexistent.json')).rejects.toThrow('File not found');
  });

  it('should handle file read errors', async () => {
    const mockError = new Error('Permission denied');

    mockReadFile.mockRejectedValue(mockError);

    await expect(processFile('test.json')).rejects.toThrow('Permission denied');
  });

  it('should handle empty file', async () => {
    mockReadFile.mockResolvedValue('');

    await expect(processFile('empty.json')).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle array with non-object elements', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'test message 1' },
      'invalid element',
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    await expect(processFile('test.json')).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle array with missing required fields', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    await expect(processFile('test.json')).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle array with malformed timestamp', async () => {
    const mockData = [
      { timestamp: 'not-a-timestamp', level: 'info', message: 'test message 1' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    await expect(processFile('test.json')).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle array with invalid level', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'invalid-level', message: 'test message 1' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    await expect(processFile('test.json')).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle array with missing message', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    await expect(processFile('test.json')).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle array with null values', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: null },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    await expect(processFile('test.json')).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle array with undefined values', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: undefined },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    await expect(processFile('test.json')).rejects.toThrow('Invalid JSON in file');
  });

  it('should handle array with extra fields', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'test message 1', extraField: 'extra' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2', extraField: 'extra' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    const result = await processFile('test.json');

    expect(result).toEqual([
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'test message 1' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test message 2' }
    ]);
  });

  it('should handle array with valid records and invalid records mixed', async () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'test message 1' },
      { timestamp: 'not-a-timestamp', level: 'error', message: 'test message 2' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'info', message: 'test message 3' }
    ];

    mockReadFile.mockResolvedValue(JSON.stringify(mockData));

    await expect(processFile('test.json')).rejects.toThrow('Invalid JSON in file');
  });
});