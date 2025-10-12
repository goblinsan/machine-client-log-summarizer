import fs from 'fs';
import { readJsonFile, normalizeRecord, processFile } from './fileIngest';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('fileIngest', () => {
  const mockData = {
    timestamp: '2023-01-01T00:00:00Z',
    level: 'info',
    message: 'Test log message',
    service: 'test-service',
    host: 'localhost'
  };

  const mockNormalizedData = {
    timestamp: '2023-01-01T00:00:00Z',
    level: 'info',
    message: 'Test log message',
    service: 'test-service',
    host: 'localhost'
  };

  const mockFileContent = JSON.stringify(mockData);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should read and parse JSON file correctly', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const result = readJsonFile('test.json');
    expect(result).toEqual(mockData);
  });

  it('should normalize a record correctly', () => {
    const result = normalizeRecord(mockData);
    expect(result).toEqual(mockNormalizedData);
  });

  it('should process a file and return normalized records', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const result = processFile('test.json');
    expect(result).toEqual([mockNormalizedData]);
  });

  it('should handle invalid JSON gracefully', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue('invalid json');

    expect(() => readJsonFile('test.json')).toThrow();
  });
});