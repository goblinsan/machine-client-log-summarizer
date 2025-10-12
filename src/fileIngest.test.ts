import { describe, it, expect } from 'vitest';

import { parseLogContent } from './fileIngest';

describe('parseLogContent', () => {
  });
});

describe('parseLogContent with invalid input', () => {
  it('should handle empty content gracefully', () => {
    const result = parseLogContent('');
    expect(result).toEqual([]);
  });

  it('should handle malformed JSON', () => {
    const result = parseLogContent('{ invalid json }');
    expect(result).toEqual([]);
  });

  it('should handle non-array JSON', () => {
    const result = parseLogContent('{ "key": "value" }');
    expect(result).toEqual([]);
  });
});

describe('parseLogContent with valid input', () => {
  it('should parse valid JSON array', () => {
    const content = '[{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "test"}]';
    const result = parseLogContent(content);
    expect(result).toEqual([
      {
        timestamp: "2023-01-01T00:00:00Z",
        level: "INFO",
        message: "test"
      }
    ]);
  });

  it('should handle multiple log entries', () => {
    const content = '[{"timestamp": "2023-01-01T00:00:00Z", "level": "INFO", "message": "test1"}, {"timestamp": "2023-01-01T00:01:00Z", "level": "ERROR", "message": "test2"}]';
    const result = parseLogContent(content);
    expect(result).toEqual([
      {
        timestamp: "2023-01-01T00:00:00Z",
        level: "INFO",
        message: "test1"
      },
      {
        timestamp: "2023-01-01T00:01:00Z",
        level: "ERROR",
       message: "test2"
     }
   ]);
  });
});