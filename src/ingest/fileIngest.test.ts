import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import { processJsonFiles } from './fileIngest';

// Mock fs module to simulate file reading
vi.mock('fs', () => ({
  default: {
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  },
}));

describe('processJsonFiles', () => {
  it('should process a single JSON file and return normalized records', () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Test log entry',
      service: 'test-service',
    });

    vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent);
    vi.mocked(fs.existsSync).mockReturnValue(true);

    const result = processJsonFiles(['test.json']);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'info',
        message: 'Test log entry',
        service: 'test-service',
        sourceFile: 'test.json',
      },
    ]);
  });

  it('should process multiple JSON files and return normalized records', () => {
    const mockFile1Content = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Test log entry 1',
      service: 'test-service-1',
    });

    const mockFile2Content = JSON.stringify({
      timestamp: '2023-01-02T00:00:00Z',
      level: 'error',
      message: 'Test log entry 2',
      service: 'test-service-2',
    });

    vi.mocked(fs.readFileSync).mockImplementation((filePath) => {
      if (filePath === 'file1.json') return mockFile1Content;
      if (filePath === 'file2.json') return mockFile2Content;
      return '';
    });

    vi.mocked(fs.existsSync).mockReturnValue(true);

    const result = processJsonFiles(['file1.json', 'file2.json']);

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'info',
        message: 'Test log entry 1',
        service: 'test-service-1',
        sourceFile: 'file1.json',
      },
      {
        timestamp: '2023-01-02T00:00:00Z',
        level: 'error',
 +        message: 'Test log entry 2',
        service: 'test-service-2',
        sourceFile: 'file2.json',
      },
    ]);
  });

  it('should skip files that do not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = processJsonFiles(['nonexistent.json']);

    expect(result).toEqual([]);
  });

  it('should skip files with invalid JSON content', () => {
    vi.mocked(fs.readFileSync).mockReturnValue('invalid json');
    vi.mocked(fs.existsSync).mockReturnValue(true);

    const result = processJsonFiles(['invalid.json']);

    expect(result).toEqual([]);
  });
});