import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import { ingestFiles } from './ingestion';

// Mock fs module to simulate file system operations
vi.mock('fs', () => ({
  default: {
    readFileSync: vi.fn(),
    existsSync: vi.fn(),
  },
}));

describe('ingestFiles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should process a single valid JSON file', () => {
    const mockFileContent = JSON.stringify([
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'Test log entry' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'Another log entry' },
    ]);

    vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent);
    vi.mocked(fs.existsSync).mockReturnValue(true);

    const result = ingestFiles(['test.json']);

    expect(result).toEqual([
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'Test log entry' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'Another log entry' },
    ]);
  });

  it('should handle multiple JSON files', () => {
    const file1Content = JSON.stringify([
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'First log entry' },
    ]);

    const file2Content = JSON.stringify([
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'Second log entry' },
    ]);

    vi.mocked(fs.readFileSync).mockImplementation((path) => {
      if (path === 'file1.json') return file1Content;
      if (path === 'file2.json') return file2Content;
      return '';
    });

    vi.mocked(fs.existsSync).mockReturnValue(true);

    const result = ingestFiles(['file1.json', 'file2.json']);

    expect(result).toEqual([
      { timestamp: '2023-01-01T00:00:00Z', level: 'info', message: 'First log entry' },
      { timestamp: '2023-01-01T01:00:00Z', level: 'error', message: 'Second log entry' },
    ]);
  });

  it('should throw an error for invalid JSON content', () => {
    vi.mocked(fs.readFileSync).mockReturnValue('invalid json');
    vi.mocked(fs.existsSync).mockReturnValue(true);

    expect(() => ingestFiles(['invalid.json'])).toThrow('Failed to parse JSON');
  });

  it('should throw an error for non-existent files', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    expect(() => ingestFiles(['nonexistent.json'])).toThrow('File does not exist');
  });
});