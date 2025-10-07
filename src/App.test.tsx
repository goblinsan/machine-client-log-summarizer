// src/App.test.tsx

import { describe, it, expect } from 'vitest';
import { parseJsonFile } from './ingest/fileIngest';

describe('App Component', () => {
  it('should parse log content correctly', () => {
    const mockContent = `
{"timestamp": "2025-04-01T10:00:00Z", "level": "INFO", "message": "Application started"}
{"timestamp": "2025-04-01T10:01:00Z", "level": "ERROR", "message": "Failed to connect to DB"}
{"timestamp": "2025-04-01T10:02:00Z", "level": "DEBUG", "message": "Database query executed"}
`;

    // Mock the parseLogContent function to simulate file reading
    const mockParseLogContent = (content: string) => {
      return [
        { timestamp: "2025-04-01T10:00:00Z", level: "INFO", message: "Application started" },
        { timestamp: "2025-04-01T10:01:00Z", level: "ERROR", message: "Failed to connect to DB" },
        { timestamp: "2025-04-01T10:02:00Z", level: "DEBUG", message: "Database query executed" }
      ];
    };

    // This test currently fails because parseJsonFile is not yet implemented correctly
    const result = parseJsonFile('mock-path');

    expect(result).toEqual([
      { timestamp: "2025-04-01T10:00:00Z", level: "INFO", message: "Application started" },
      { timestamp: "2025-04-01T10:01:00Z", level: "ERROR", message: "Failed to connect to DB" },
      { timestamp: "2025-04-01T10:02:00Z", level: "DEBUG", message: "Database query executed" }
    ]);
  });
});
