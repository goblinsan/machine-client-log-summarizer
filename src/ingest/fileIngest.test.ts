import { describe, it, expect, vi } from 'vitest';
import { readJsonFile } from './fileIngest';

// Mock fs module
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}));

describe('readJsonFile', () => {
  it('should parse valid JSON file and return normalized records', () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'test log' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'error log' },
    ];

    vi.mocked(require('fs')).readFileSync.mockReturnValueOnce(JSON.stringify(mockData));

    const result = readJsonFile('mock-path.json');

    expect(result).toEqual(mockData);
  });

  it('should throw an error for invalid JSON', () => {
    vi.mocked(require('fs')).readFileSync.mockReturnValueOnce('{ invalid json }');

    expect(() => readJsonFile('mock-path.json')).toThrow('Invalid JSON in file');
  });

  it('should handle missing file gracefully', () => {
    vi.mocked(require('fs')).readFileSync.mockImplementationOnce(() => {
      throw new Error('File not found');
    });

    expect(() => readJsonFile('nonexistent.json')).toThrow('File not found');
  });

  it('should normalize records by ensuring required fields exist', () => {
    const mockData = [
      { timestamp: '2023-01-01T00:00:00Z', level: 'info' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test error' },
    ];

    vi.mocked(require('fs')).readFileSync.mockReturnValueOnce(JSON.stringify(mockData));

    const result = readJsonFile('mock-path.json');

    expect(result).toEqual([
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: '' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'test error' },
    ]);
  });
});