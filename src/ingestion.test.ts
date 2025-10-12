import { describe, it, expect } from '@jest/globals';
import { processFile } from './ingestion';

/**
 * Test suite for ingestion functionality
 */
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

  it('should handle non-JSON files gracefully', async () => {
    const mockFile = new File(['not json content'], 'text.txt', {
      type: 'text/plain',
    });

    // Test that non-JSON files throw an error
    await expect(processFile(mockFile)).rejects.toThrow('Failed to parse file as JSON');
  });

  it('should handle valid JSON with complex structure', async () => {
    const mockFile = new File(['{"logs": [{"timestamp": "2023-01-01T00:00:00Z", "message": "test log"}]}'], 'complex.json', {
      type: 'application/json',
    });

    const result = await processFile(mockFile);

    expect(result).toEqual({
      logs: [
        {
          timestamp: '2023-01-01T00:00:00Z',
          message: 'test log'
        }
      ]
    });
  });

  it('should handle empty JSON object', async () => {
    const mockFile = new File(['{}'], 'empty.json', {
      type: 'application/json',
    });

    const result = await processFile(mockFile);

    expect(result).toEqual({});
  });
});