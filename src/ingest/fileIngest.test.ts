import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { processLogFile } from './fileIngest';

// Mock fs module to avoid actual file system access during tests
jest.mock('fs');

describe('processLogFile', () => {
  const mockLogContent = `
2023-10-01T10:00:00Z INFO Starting application
2023-10-01T10:01:00Z ERROR Failed to connect to database
2023-10-01T10:02:00Z WARN Memory usage high
2023-10-01T10:03:00Z INFO Shutdown initiated
`;

  const mockLogContentWithInvalid = `
2023-10-01T10:00:00Z INFO Starting application
2023-10-01T10:01:00Z ERROR Failed to connect to database
2023-10-01T10:02:00Z WARN Memory usage high
invalid log line
2023-10-01T10:03:00Z INFO Shutdown initiated
`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process a valid log file and return parsed entries', () => {
    const mockReadFile = fs.readFile as jest.Mock;
    mockReadFile.mockImplementation((filePath, encoding, callback) => {
      if (typeof callback === 'function') {
        callback(null, mockLogContent);
      }
    });

    const result = processLogFile('mock-path.log');

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({
      timestamp: '2023-10-01T10:00:00Z',
      level: 'INFO',
      message: 'Starting application'
    });
    expect(result[1]).toEqual({
      timestamp: '2023-10-01T10:01:00Z',
      level: 'ERROR',
      message: 'Failed to connect to database'
    });
    expect(result[2]).toEqual({
      timestamp: '2023-10-01T10:02:00Z',
      level: 'WARN',
      message: 'Memory usage high'
    });
    expect(result[3]).toEqual({
      timestamp: '2023-10-01T10:03:00Z',
      level: 'INFO',
      message: 'Shutdown initiated'
    });
  });

  it('should skip invalid log lines', () => {
    const mockReadFile = fs.readFile as jest.Mock;
    mockReadFile.mockImplementation((filePath, encoding, callback) => {
      if (typeof callback === 'function') {
        callback(null, mockLogContentWithInvalid);
      }
    });

    const result = processLogFile('mock-path.log');

    expect(result).toHaveLength(4);
    expect(result[3]).toEqual({
      timestamp: '2023-10-01T10:03:00Z',
      level: 'INFO',
      message: 'Shutdown initiated'
    });
  });

  it('should handle file read errors gracefully', () => {
    const mockReadFile = fs.readFile as jest.Mock;
    mockReadFile.mockImplementation((filePath, encoding, callback) => {
      if (typeof callback === 'function') {
        callback(new Error('File not found'), null);
      }
    });

    expect(() => processLogFile('nonexistent.log')).toThrow('File not found');
  });

  it('should return empty array for empty log file', () => {
    const mockReadFile = fs.readFile as jest.Mock;
    mockReadFile.mockImplementation((filePath, encoding, callback) => {
      if (typeof callback === 'function') {
        callback(null, '');
      }
    });

    const result = processLogFile('empty.log');

    expect(result).toHaveLength(0);
  });

  it('should handle logs with missing fields', () => {
    const mockLogContentWithMissingFields = `
2023-10-01T10:00:00Z INFO Starting application
2023-10-01T10:01:00Z ERROR
2023-10-01T10:02:00Z
`;

    const mockReadFile = fs.readFile as jest.Mock;
    mockReadFile.mockImplementation((filePath, encoding, callback) => {
      if (typeof callback === 'function') {
        callback(null, mockLogContentWithMissingFields);
      }
    });

    const result = processLogFile('mock-path.log');

    expect(result).toHaveLength(3);
  });
});