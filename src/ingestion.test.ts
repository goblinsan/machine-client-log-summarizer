import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processLogFiles } from './ingestion';

// Mock the fs module to avoid actual file system operations
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    readdir: vi.fn(),
  },
}));

// Mock the path module to avoid actual path operations
vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
}));

describe('processLogFiles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should process a single valid JSON log file', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Test log entry',
      service: 'test-service'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'info',
        message: 'Test log entry',
        service: 'test-service'
      }
    ]);
  });

  it('should process multiple valid JSON log files', async () => {
    const mockFile1Content = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Test log entry 1',
      service: 'test-service'
    });

    const mockFile2Content = JSON.stringify({
      timestamp: '2023-01-01T01:00:00Z',
      level: 'error',
      message: 'Test log entry 2',
      service: 'test-service'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValueOnce(mockFile1Content);
    vi.mocked((await import('fs')).promises.readFile).mockResolvedValueOnce(mockFile2Content);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['file1.log', 'file2.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'info',
        message: 'Test log entry 1',
        service: 'test-service'
      },
      {
        timestamp: '2023-01-01T01:00:00Z',
        level: 'error',
        message: 'Test log entry 2',
        service: 'test-service'
      }
    ]);
  });

  it('should skip non-JSON files', async () => {
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.txt', 'test.log']);
    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue('not json');

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should filter out invalid JSON files', async () => {
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);
    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue('invalid json');

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle empty directory', async () => {
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue([]);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle directory read errors', async () => {
    vi.mocked((await import('fs')).promises.readdir).mockRejectedValue(new Error('Read error'));

    await expect(processLogFiles('./logs')).rejects.toThrow('Read error');
  });

  it('should handle file read errors', async () => {
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);
    vi.mocked((await import('fs')).promises.readFile).mockRejectedValue(new Error('File read error'));

    await expect(processLogFiles('./logs')).rejects.toThrow('File read error');
  });

  it('should handle missing required fields', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info'
      // missing message and service fields
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle malformed timestamp', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: 'not-a-date',
      level: 'info',
      message: 'Test log entry',
      service: 'test-service'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle missing timestamp', async () => {
    const mockFileContent = JSON.stringify({
      level: 'info',
      message: 'Test log entry',
      service: 'test-service'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle missing level', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      message: 'Test log entry',
      service: 'test-service'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle missing message', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      service: 'test-service'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle missing service', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Test log entry'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle invalid JSON content', async () => {
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);
    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue('{ invalid json }');

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle valid JSON with extra fields', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Test log entry',
      service: 'test-service',
      extraField: 'should be ignored'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'info',
        message: 'Test log entry',
        service: 'test-service'
      }
    ]);
  });

  it('should handle valid JSON with empty string values', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: '',
      service: ''
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle valid JSON with null values', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: null,
      service: null
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle valid JSON with numeric values', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 123,
      message: 'Test log entry',
      service: 'test-service'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle valid JSON with boolean values', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: true,
      message: 'Test log entry',
      service: 'test-service'
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle valid JSON with array values', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Test log entry',
      service: ['test-service']
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });

  it('should handle valid JSON with object values', async () => {
    const mockFileContent = JSON.stringify({
      timestamp: '2023-01-01T00:00:00Z',
      level: 'info',
      message: 'Test log entry',
      service: { name: 'test-service' }
    });

    vi.mocked((await import('fs')).promises.readFile).mockResolvedValue(mockFileContent);
    vi.mocked((await import('fs')).promises.readdir).mockResolvedValue(['test.log']);

    const result = await processLogFiles('./logs');

    expect(result).toEqual([]);
  });
});