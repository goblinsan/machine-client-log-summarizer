import { fileIngest } from './fileIngest';
import fs from 'fs';
import path from 'path';

jest.mock('fs');

describe('fileIngest', () => {
  const mockFileContent = JSON.stringify({
    timestamp: '2023-01-01T00:00:00Z',
    level: 'info',
    message: 'Test log entry',
    service: 'test-service'
  });

  const mockFileContentWithExtraFields = JSON.stringify({
    timestamp: '2023-01-01T00:00:00Z',
    level: 'error',
    message: 'Another test log entry',
    service: 'test-service-2',
    extraField: 'extraValue'
  });

  const mockFileContentWithInvalidJson = '{ invalid json }';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should read a single JSON file and return normalized records', () => {
    const mockFilePath = '/mock/path/file.json';

    (fs.readFile as jest.Mock).mockImplementationOnce(
      (filePath: string, encoding: string, callback: Function) => {
        callback(null, mockFileContent);
      }
    );

    const result = fileIngest(mockFilePath);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'info',
        message: 'Test log entry',
        service: 'test-service'
      }
    ]);
  });

  it('should handle extra fields in JSON', () => {
    const mockFilePath = '/mock/path/file2.json';

    (fs.readFile as jest.Mock).mockImplementationOnce(
      (filePath: string, encoding: string, callback: Function) => {
        callback(null, mockFileContentWithExtraFields);
      }
    );

    const result = fileIngest(mockFilePath);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'error',
        message: 'Another test log entry',
        service: 'test-service-2'
      }
    ]);
  });

  it('should throw an error for invalid JSON', () => {
    const mockFilePath = '/mock/path/invalid.json';

    (fs.readFile as jest.Mock).mockImplementationOnce(
      (filePath: string, encoding: string, callback: Function) => {
        callback(null, mockFileContentWithInvalidJson);
      }
    );

    expect(() => fileIngest(mockFilePath)).toThrow('Failed to parse JSON');
  });

  it('should throw an error for file read errors', () => {
    const mockFilePath = '/mock/path/error.json';

    (fs.readFile as jest.Mock).mockImplementationOnce(
      (filePath: string, encoding: string, callback: Function) => {
        callback(new Error('File read error'), null);
      }
    );

    expect(() => fileIngest(mockFilePath)).toThrow('Failed to read file');
  });

  it('should handle multiple JSON entries in one file', () => {
    const mockFilePath = '/mock/path/multi.json';

    const multiEntryContent = `[${mockFileContent}, ${mockFileContentWithExtraFields}]`;

    (fs.readFile as jest.Mock).mockImplementationOnce(
      (filePath: string, encoding: string, callback: Function) => {
        callback(null, multiEntryContent);
      }
    );

    const result = fileIngest(mockFilePath);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'info',
        message: 'Test log entry',
        service: 'test-service'
      },
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'error',
        message: 'Another test log entry',
        service: 'test-service-2'
      }
    ]);
  });

  it('should filter out records with missing required fields', () => {
    const mockFilePath = '/mock/path/missing.json';

    const invalidEntryContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info'
      // missing message and service fields
    });

    const validEntryContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Valid entry',
      service: 'valid-service'
    });

    const multiEntryContent = `[${invalidEntryContent}, ${validEntryContent}]`;

    (fs.readFile as jest.Mock).mockImplementationOnce(
      (filePath: string, encoding: string, callback: Function) => {
        callback(null, multiEntryContent);
      }
    );

    const result = fileIngest(mockFilePath);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'info',
        message: 'Valid entry',
        service: 'valid-service'
      }
    ]);
  });
});