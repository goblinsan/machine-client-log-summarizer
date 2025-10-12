import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import { fileIngest } from './fileIngest';

describe('fileIngest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return an empty array for non-existent files', async () => {
    const result = await fileIngest('non-existent-file.json');
    expect(result).toEqual([]);
  });

  it('should return an empty array for invalid JSON', async () => {
    const mockReadFileSync = vi.spyOn(fs, 'readFileSync');
    mockReadFileSync.mockImplementation(() => {
      throw new Error('Invalid JSON');
    });

    const result = await fileIngest('invalid.json');
    expect(result).toEqual([]);
  });

  it('should return normalized records from valid JSON', async () => {
    const mockReadFileSync = vi.spyOn(fs, 'readFileSync');
    mockReadFileSync.mockReturnValue(
      JSON.stringify([
        {
          timestamp: '2023-01-01T00:00:00.000Z',
          level: 'info',
          message: 'Test log entry'
        }
      ])
    );

    const result = await fileIngest('valid.json');
    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00.000Z',
        level: 'info',
        message: 'Test log entry'
      }
    ]);
  });

  it('should handle missing fields and normalize them', async () => {
    const mockReadFileSync = vi.spyOn(fs, 'readFileSync');
    mockReadFileSync.mockReturnValue(
      JSON.stringify([
        {
          timestamp: '2023-01-01T00:00:00.000Z',
          level: 'warn',
          message: 'Test log entry'
        },
        {
          timestamp: '2023-01-01T00:00:01.000Z',
          message: 'Another test log entry'
        }
      ])
    );

    const result = await fileIngest('partial.json');
    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00.000Z',
        level: 'warn',
        message: 'Test log entry'
      },
      {
        timestamp: '2023-01-01T00:00:01.000Z',
        level: 'info',
        message: 'Another test log entry'
      }
    ]);
  });

  it('should handle invalid timestamp and normalize to current time', async () => {
    const mockReadFileSync = vi.spyOn(fs, 'readFileSync');
    mockReadFileSync.mockReturnValue(
      JSON.stringify([
        {
          timestamp: 'invalid-timestamp',
          level: 'error',
          message: 'Test log entry'
        }
      ])
    );

    const result = await fileIngest('invalid-timestamp.json');
    expect(result[0].timestamp).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000Z/);
    expect(result[0].level).toBe('error');
    expect(result[0].message).toBe('Test log entry');
  });

  it('should handle invalid level and normalize to info', async () => {
    const mockReadFileSync = vi.spyOn(fs, 'readFileSync');
    mockReadFileSync.mockReturnValue(
      JSON.stringify([
        {
          timestamp: '2023-01-01T00:00:00.000Z',
          level: 'invalid-level',
          message: 'Test log entry'
        }
      ])
    );

    const result = await fileIngest('invalid-level.json');
    expect(result[0].timestamp).toBe('2023-01-01T00:00:00.000Z');
    expect(result[0].level).toBe('info');
    expect(result[0].message).toBe('Test log entry');
  });

  it('should handle missing array and return empty array', async () => {
    const mockReadFileSync = vi.spyOn(fs, 'readFileSync');
    mockReadFileSync.mockReturnValue(
      JSON.stringify({
        timestamp: '2023-01-01T00:00:00.000Z',
        level: 'info',
        message: 'Test log entry'
      })
    );

    const result = await fileIngest('non-array.json');
    expect(result).toEqual([]);
  });

  it('should handle empty array and return empty array', async () => {
    const mockReadFileSync = vi.spyOn(fs, 'readFileSync');
    mockReadFileSync.mockReturnValue(
      JSON.stringify([])
    );

    const result = await fileIngest('empty-array.json');
    expect(result).toEqual([]);
  });

  it('should handle file read errors gracefully', async () => {
    const mockReadFileSync = vi.spyOn(fs, 'readFileSync');
    mockReadFileSync.mockImplementation(() => {
      throw new Error('File read error');
    });

    const result = await fileIngest('read-error.json');
    expect(result).toEqual([]);
  });
});