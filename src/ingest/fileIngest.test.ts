import { describe, it, expect, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { processLogFile } from './fileIngest';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn(),
}));

describe('processLogFile', () => {
  const mockLogContent = `{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "System started"}\n{"timestamp": "2023-01-01T00:01:00Z", "level": "ERROR", "message": "Database connection failed"}\n{"timestamp": "2023-01-01T00:02:00Z", "level": "WARN", "message": "High memory usage"}`;

  it('should parse valid JSON lines and return normalized records', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(mockLogContent);

    const result = processLogFile('test.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'System started',
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "System started"}'
      },
      {
        timestamp: '2023-01-01T00:01:00Z',
        level: 'ERROR',
        message: 'Database connection failed',
        raw: '{"timestamp": "2023-01-01T00:01:00Z", "level": "ERROR", "message": "Database connection failed"}'
      },
      {
        timestamp: '2023-01-01T00:02:00Z',
        level: 'WARN',
        message: 'High memory usage',
        raw: '{"timestamp": "2023-01-01T00:02:00Z", "level": "WARN", "message": "High memory usage"}'
      }
    ]);
  });

  it('should handle single JSON line', () => {
    const singleLineContent = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Single line log"}';
    (fs.readFileSync as jest.Mock).mockReturnValue(singleLineContent);

    const result = processLogFile('single.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Single line log',
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Single line log"}'
      }
    ]);
  });

  it('should handle empty file', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue('');

    const result = processLogFile('empty.log');

    expect(result).toEqual([]);
  });

  it('should handle file with only whitespace', () => {
    (fs.readFileSync as jest.Mock).mockReturnValue('   \n  \n\t  ');

    const result = processLogFile('whitespace.log');

    expect(result).toEqual([]);
  });

  it('should throw error for invalid JSON', () => {
    const invalidJsonContent = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Invalid JSON"}\n{"timestamp": "2023-01-01T00:01:00Z", "level": "ERROR", "message": "Invalid JSON"}';
    (fs.readFileSync as jest.Mock).mockReturnValue(invalidJsonContent);

    expect(() => processLogFile('invalid.log')).toThrow('Failed to parse JSON line');
  });

  it('should throw error for missing file', () => {
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error('File not found');
    });

    expect(() => processLogFile('missing.log')).toThrow('Failed to read file');
  });

  it('should handle malformed JSON lines gracefully', () => {
    const malformedContent = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Valid line"}\n{"timestamp": "2023-01-01T00:01:00Z", "level": "ERROR", "message": "Invalid JSON"\n{"timestamp": "2023-01-01T00:02:00Z", "level": "WARN", "message": "Another valid line"}';
    (fs.readFileSync as jest.Mock).mockReturnValue(malformedContent);

    expect(() => processLogFile('malformed.log')).toThrow('Failed to parse JSON line');
  });

  it('should handle valid JSON with extra fields', () => {
    const contentWithExtraFields = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Extra fields test", "extraField": "value"}';
    (fs.readFileSync as jest.Mock).mockReturnValue(contentWithExtraFields);

    const result = processLogFile('extra.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Extra fields test',
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Extra fields test", "extraField": "value"}'
      }
    ]);
  });

  it('should handle JSON with special characters in message', () => {
    const contentWithSpecialChars = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Special chars: \\"quotes\\" and \\\\backslashes\\\\ and \\/slashes"}';
    (fs.readFileSync as jest.Mock).mockReturnValue(contentWithSpecialChars);

    const result = processLogFile('special.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Special chars: "quotes" and \\backslashes\\ and /slashes',
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Special chars: \\"quotes\\" and \\\\backslashes\\\\ and \\/slashes"}'
      }
    ]);
  });

  it('should handle JSON with null values', () => {
    const contentWithNulls = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": null}';
    (fs.readFileSync as jest.Mock).mockReturnValue(contentWithNulls);

    const result = processLogFile('nulls.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: null,
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": null}'
      }
    ]);
  });

  it('should handle JSON with numeric values', () => {
    const contentWithNumbers = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Number test", "count": 42}';
    (fs.readFileSync as jest.Mock).mockReturnValue(contentWithNumbers);

    const result = processLogFile('numbers.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Number test',
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Number test", "count": 42}'
      }
    ]);
  });

  it('should handle JSON with arrays', () => {
    const contentWithArrays = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Array test", "tags": ["tag1", "tag2"]}';
    (fs.readFileSync as jest.Mock).mockReturnValue(contentWithArrays);

    const result = processLogFile('arrays.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Array test',
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Array test", "tags": ["tag1", "tag2"]}'
      }
    ]);
  });

  it('should handle JSON with nested objects', () => {
    const contentWithNested = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Nested test", "metadata": {"key": "value"}}';
    (fs.readFileSync as jest.Mock).mockReturnValue(contentWithNested);

    const result = processLogFile('nested.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Nested test',
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Nested test", "metadata": {"key": "value"}}'
      }
    ]);
  });

  it('should handle file with trailing newlines', () => {
    const contentWithTrailing = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Trailing newlines test"}\n\n';
    (fs.readFileSync as jest.Mock).mockReturnValue(contentWithTrailing);

    const result = processLogFile('trailing.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Trailing newlines test',
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Trailing newlines test"}'
      }
    ]);
  });

  it('should handle file with mixed line endings', () => {
    const contentWithMixedEndings = '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Mixed endings test"}\r\n{"timestamp": "2023-01-01T00:01:00Z", "level": "ERROR", "message": "Another line"}';
    (fs.readFileSync as jest.Mock).mockReturnValue(contentWithMixedEndings);

    const result = processLogFile('mixed.log');

    expect(result).toEqual([
      {
        timestamp: '2023-01-01T00:00:00Z',
        level: 'INFO',
        message: 'Mixed endings test',
        raw: '{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "Mixed endings test"}'
      },
      {
        timestamp: '2023-01-01T00:01:00Z',
        level: 'ERROR',
        message: 'Another line',
        raw: '{"timestamp": "2023-01-01T00:01:00Z", "level": "ERROR", "message": "Another line"}'
      }
    ]);
  });
});