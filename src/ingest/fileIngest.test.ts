import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import { fileIngest } from './fileIngest';

// Mock fs module to simulate file reading
vi.mock('fs', () => ({
  default: {
    readFileSync: vi.fn(),
  },
}));

describe('fileIngest', () => {
  it('should parse valid JSON log file and return normalized records', () => {
    const mockLogContent = `{"timestamp": "2023-01-01T00:00:00.000Z", "level": "info", "message": "test message"}
{"timestamp": "2023-01-01T01:00:00.000Z", "level": "error", "message": "error message"}`;

    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockLogContent);

    const result = fileIngest('test.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00.000Z',
        level: 'info',
        message: 'test message'
      },
      {
        timestamp: '2023-01-01T01:00:00.000Z',
        level: 'error',
      }
    ]);
  });

  it('should handle malformed JSON lines gracefully', () => {
    const mockLogContent = `{"timestamp": "2023-01-01T00:00:00.000Z", "level": "info", "message": "test message"}
{"invalid": json}
{"timestamp": "2023-01-01T01:00:00.000Z", "level": "error", "message": "error message"}`;

    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockLogContent);

    const result = fileIngest('test.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00.000Z',
        level: 'info',
        message: 'test message'
      },
      {
        timestamp: new Date().toISOString(),
        level: 'info',
        message: ''
      },
      {
        timestamp: '2023-01-01T01:00:00.000Z',
        level: 'error',
        message: 'error message'
      }
    ]);
  });

  it('should normalize invalid log levels to info', () => {
    const mockLogContent = `{"timestamp": "2023-01-01T00:00:00.000Z", "level": "invalid", "message": "test message"}`;

    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockLogContent);

    const result = fileIngest('test.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00.000Z',
        level: 'info',
        message: 'test message'
      }
    ]);
  });

  it('should handle missing message field', () => {
    const mockLogContent = `{"timestamp": "2023-01-01T00:00:00.000Z", "level": "info"}`;

    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockLogContent);

    const result = fileIngest('test.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00.000Z',
        level: 'info',
        message: ''
      }
    ]);
  });

  it('should handle invalid timestamp gracefully', () => {
    const mockLogContent = `{"timestamp": "invalid", "level": "info", "message": "test message"}`;

    vi.spyOn(fs, 'readFileSync').mockReturnValue(mockLogContent);

    const result = fileIngest('test.log');

    expect(result).toEqual([
      {
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'test message'
      }
    ]);
  });

  it('should return empty array for invalid file path', () => {
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('File not found');
    });

    const result = fileIngest('nonexistent.log');

    expect(result).toEqual([]);
  });
});