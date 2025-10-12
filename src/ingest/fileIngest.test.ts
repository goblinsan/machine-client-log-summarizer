import { describe, it, expect, vi } from 'vitest';
import { readAndNormalizeJsonFile } from './fileIngest';

// Mock file system operations
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}));

describe('readAndNormalizeJsonFile', () => {
  it('should parse and normalize valid JSON file content', () => {
    const mockContent = JSON.stringify({
      logs: [
        { timestamp: '2023-01-01T00:00:00Z', level: 'INFO', message: 'Test log entry' },
        { timestamp: '2023-01-01T01:00:00Z', level: 'ERROR', message: 'Another error' }
      ]
    });

    const mockReadFileSync = vi.fn().mockReturnValue(mockContent);
    vi.spyOn(require('fs'), 'readFileSync').mockImplementation(mockReadFileSync);

    const result = readAndNormalizeJsonFile('mock-path.json');

    expect(result).toEqual([
      { timestamp: '2023-01-01T00:00:00Z', level: 'INFO', message: 'Test log entry' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'ERROR', message: 'Another error' }
    ]);

    expect(mockReadFileSync).toHaveBeenCalledWith('mock-path.json', 'utf8');
  });

  it('should throw an error for invalid JSON content', () => {
    const mockContent = '{ invalid json }';

    const mockReadFileSync = vi.fn().mockReturnValue(mockContent);
    vi.spyOn(require('fs'), 'readFileSync').mockImplementation(mockReadFileSync);

    expect(() => readAndNormalizeJsonFile('mock-path.json')).toThrow('Failed to parse JSON');
  });

  it('should handle missing file gracefully', () => {
    const mockReadFileSync = vi.fn().mockImplementation(() => {
      throw new Error('File not found');
    });

    vi.spyOn(require('fs'), 'readFileSync').mockImplementation(mockReadFileSync);

    expect(() => readAndNormalizeJsonFile('nonexistent.json')).toThrow('Failed to read file');
  });

  it('should normalize timestamp format', () => {
    const mockContent = JSON.stringify({
      logs: [
        { timestamp: '2023-01-01 00:00:00', level: 'DEBUG', message: 'Timestamp test' }
      ]
    });

    const mockReadFileSync = vi.fn().mockReturnValue(mockContent);
    vi.spyOn(require('fs'), 'readFileSync').mockImplementation(mockReadFileSync);

    const result = readAndNormalizeJsonFile('mock-path.json');

    expect(result[0].timestamp).toBe('2023-01-01T00:00:00Z');
  });

  it('should filter out invalid log entries', () => {
    const mockContent = JSON.stringify({
      logs: [
        { timestamp: '2023-01-01T00:00:00Z', level: 'INFO', message: 'Valid log' },
        { timestamp: 'invalid', level: 'ERROR', message: 'Invalid timestamp' },
        { timestamp: '2023-01-01T02:00:00Z', level: 'WARN', message: undefined }
      ]
    });

    const mockReadFileSync = vi.fn().mockReturnValue(mockContent);
    vi.spyOn(require('fs'), 'readFileSync').mockImplementation(mockReadFileSync);

    const result = readAndNormalizeJsonFile('mock-path.json');

    expect(result).toHaveLength(1);
    expect(result[0].message).toBe('Valid log');
  });
});