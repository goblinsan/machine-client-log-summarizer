import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import { processJsonFile } from './fileIngest';

// Mock fs module to simulate file reading
vi.mock('fs', () => ({
  default: {
    readFileSync: vi.fn(),
  },
}));

describe('processJsonFile', () => {
  it('should parse valid JSON and return normalized records', () => {
    const mockJsonContent = JSON.stringify([
      { timestamp: '2023-01-01T00:00:00Z', level: 'INFO', message: 'Test log entry 1' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'ERROR', message: 'Test log entry 2' },
    ]);

    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockJsonContent);

    const result = processJsonFile('mock-path.json');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Test log entry 1',
      },
      {
        timestamp: '2023-01-01T01:00:00Z',
        level: 'ERROR',
        message: 'Test log entry 2',
      },
    ]);
  });

  it('should throw an error for invalid JSON', () => {
    vi.spyOn(fs, 'readFileSync').mockReturnValue('invalid json content');

    expect(() => processJsonFile('mock-path.json')).toThrow('Failed to parse JSON');
  });

  it('should handle empty array', () => {
    const mockJsonContent = JSON.stringify([]);

    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockJsonContent);

    const result = processJsonFile('mock-path.json');

    expect(result).toEqual([]);
  });

  it('should normalize log levels to uppercase', () => {
    const mockJsonContent = JSON.stringify([
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'Test log entry' },
    ]);

    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockJsonContent);

    const result = processJsonFile('mock-path.json');

    expect(result[0].level).toBe('INFO');
  });
});