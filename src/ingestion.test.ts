import { describe, it, expect } from '@jest/globals';
import { processFile } from './ingestion';

// Mock the FileReader API

describe('Ingestion functionality', () => {
  it('should read and parse a JSON file correctly', async () => {
    const mockFile = new File(['{"test": "value"}'], 'test.json', {
      type: 'application/json',
    });

    // Test the actual processFile function
    const result = await processFile(mockFile);

    expect(result).toEqual({ test: 'value' });
  });

  it('should handle invalid JSON gracefully', async () => {
    const mockFile = new File(['{invalid: json}'], 'invalid.json', {
      type: 'application/json',
    });

    // Test that invalid JSON throws an error
    await expect(processFile(mockFile)).rejects.toThrow('Failed to parse file as JSON');
  });
});