import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import { ingestFile, ingestFiles, normalizeLogRecord } from './ingest/fileIngest';

// Mock fs module to avoid actual file system operations
vi.mock('fs/promises');

describe('normalizeLogRecord', () => {
  it('should normalize a raw log record with all fields', () => {
    const rawRecord = {
      timestamp: '2023-01-01T12:00:00Z',
      level: 'error',
      message: 'Test error message',
      service: 'auth-service',
      source: 'login-endpoint',
      metadata: {
        userId: '12345',
        sessionId: 'abc123'
      }
    };

    const normalized = normalizeLogRecord(rawRecord);

    expect(normalized).toEqual({
      timestamp: '2023-01-01T12:00:00Z',
      level: 'error',
      message: 'Test error message',
      service: 'auth-service',
      source: 'login-endpoint',
      metadata: {
        userId: '12345',
        sessionId: 'abc123'
      }
    });
  });

  it('should provide default values for missing fields', () => {
    const rawRecord = {
      timestamp: '2023-01-01T12:00:00Z',
      message: 'Test message'
      // level, service, source, metadata missing
    };

    const normalized = normalizeLogRecord(rawRecord);

    expect(normalized).toEqual({
      timestamp: '2023-01-01T12:00:00Z',
      level: 'info',
      message: 'Test message',
      service: undefined,
      source: undefined,
      metadata: {}
    });
  });

  it('should use current timestamp when missing', () => {
    const rawRecord = {
      level: 'warn',
      message: 'Test warning'
    };

    const normalized = normalizeLogRecord(rawRecord);

    // Check that timestamp is a valid ISO string
    expect(normalized.timestamp).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    expect(normalized.level).toBe('warn');
    expect(normalized.message).toBe('Test warning');
  });
});

describe('ingestFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should read and parse a valid JSON array file', async () => {
    const mockJsonContent = JSON.stringify([
      {
        timestamp: '2023-01-01T12:00:00Z',
        level: 'info',
        message: 'First log entry'
      },
      {
        timestamp: '2023-01-01T13:00:00Z',
        level: 'error',
        message: 'Second log entry'
      }
    ]);

    vi.mocked(fs.readFile).mockResolvedValue(mockJsonContent);

    const result = await ingestFile('/mock/path/to/logs.json');

    expect(fs.readFile).toHaveBeenCalledWith('/mock/path/to/logs.json', 'utf8');
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T12:00:00Z',
      level: 'info',
      message: 'First log entry',
      service: undefined,
      source: undefined,
      metadata: {}
    });
    expect(result[1]).toEqual({
      timestamp: '2023-01-01T13:00:00Z',
      level: 'error',
      message: 'Second log entry',
      service: undefined,
      source: undefined,
      metadata: {}
    });
  });

  it('should read and parse a valid JSON object file', async () => {
    const mockJsonContent = JSON.stringify({
      timestamp: '2023-01-01T12:00:00Z',
      level: 'debug',
      message: 'Single log entry'
    });

    vi.mocked(fs.readFile).mockResolvedValue(mockJsonContent);

    const result = await ingestFile('/mock/path/to/log.json');

    expect(fs.readFile).toHaveBeenCalledWith('/mock/path/to/log.json', 'utf8');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T12:00:00Z',
      level: 'debug',
      message: 'Single log entry',
      service: undefined,
      source: undefined,
      metadata: {}
    });
  });

  it('should handle missing fields in JSON records', async () => {
    const mockJsonContent = JSON.stringify([
      {
        timestamp: '2023-01-01T12:00:00Z',
        message: 'Log with missing level'
      },
      {
        timestamp: '2023-01-01T13:00:00Z',
        level: 'warn',
        message: 'Log with missing service'
      }
    ]);

    vi.mocked(fs.readFile).mockResolvedValue(mockJsonContent);

    const result = await ingestFile('/mock/path/to/logs.json');

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T12:00:00Z',
      level: 'info', // default value
      message: 'Log with missing level',
      service: undefined,
      source: undefined,
      metadata: {}
    });
    expect(result[1]).toEqual({
      timestamp: '2023-01-01T13:00:00Z',
      level: 'warn',
      message: 'Log with missing service',
      service: undefined,
      source: undefined,
      metadata: {}
    });
  });

  it('should throw an error for invalid JSON content', async () => {
    vi.mocked(fs.readFile).mockResolvedValue('{ invalid json }');

    await expect(ingestFile('/mock/path/to/invalid.json'))
      .rejects
      .toThrow('Failed to ingest file /mock/path/to/invalid.json: Unexpected token');
  });

  it('should throw an error for invalid file format', async () => {
    vi.mocked(fs.readFile).mockResolvedValue('not json content');

    await expect(ingestFile('/mock/path/to/invalid.json'))
      .rejects
      .toThrow('Failed to ingest file /mock/path/to/invalid.json: Invalid JSON format');
  });

  it('should throw an error for file system issues', async () => {
    vi.mocked(fs.readFile).mockRejectedValue(new Error('File not found'));

    await expect(ingestFile('/nonexistent/file.json'))
      .rejects
      .toThrow('Failed to ingest file /nonexistent/file.json: File not found');
  });

  it('should handle empty JSON array', async () => {
    const mockJsonContent = JSON.stringify([]);

    vi.mocked(fs.readFile).mockResolvedValue(mockJsonContent);

    const result = await ingestFile('/mock/path/to/empty.json');

    expect(result).toHaveLength(0);
  });
});

describe('ingestFiles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should ingest multiple files and flatten results', async () => {
    const mockJsonContent1 = JSON.stringify([
      {
        timestamp: '2023-01-01T12:00:00Z',
        level: 'info',
        message: 'First log entry'
      }
    ]);

    const mockJsonContent2 = JSON.stringify([
      {
        timestamp: '2023-01-01T13:00:00Z',
        level: 'error',
        message: 'Second log entry'
      }
    ]);

    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(mockJsonContent1)
      .mockResolvedValueOnce(mockJsonContent2);

    const result = await ingestFiles(['/mock/path/to/logs1.json', '/mock/path/to/logs2.json']);

    expect(fs.readFile).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T12:00:00Z',
      level: 'info',
      message: 'First log entry',
      service: undefined,
      source: undefined,
      metadata: {}
    });
    expect(result[1]).toEqual({
      timestamp: '2023-01-01T13:00:00Z',
      level: 'error',
      message: 'Second log entry',
      service: undefined,
      source: undefined,
      metadata: {}
    });
  });

  it('should handle mixed content types in files', async () => {
    const mockJsonContent1 = JSON.stringify({
      timestamp: '2023-01-01T12:00:00Z',
      level: 'info',
      message: 'Single log entry'
    });

    const mockJsonContent2 = JSON.stringify([
      {
        timestamp: '2023-01-01T13:00:00Z',
        level: 'debug',
        message: 'Array log entry'
      }
    ]);

    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(mockJsonContent1)
      .mockResolvedValueOnce(mockJsonContent2);

    const result = await ingestFiles(['/mock/path/to/single.json', '/mock/path/to/array.json']);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      timestamp: '2023-01-01T12:00:00Z',
      level: 'info',
      message: 'Single log entry',
      service: undefined,
      source: undefined,
      metadata: {}
    });
    expect(result[1]).toEqual({
      timestamp: '2023-01-01T13:00:00Z',
      level: 'debug',
      message: 'Array log entry',
      service: undefined,
      source: undefined,
      metadata: {}
    });
  });
});