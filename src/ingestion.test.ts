import { describe, it, expect } from '@jest/globals';
import { readJSONFile } from './ingestion';

/**
 * Test suite for ingestion functionality
 */
describe('Ingestion functionality', () => {
  it('should read and parse a JSON file correctly', async () => {
    const mockFile = new File(['{"test": "value"}'], 'test.json', {
      type: 'application/json',
    });

    // Test the actual readJSONFile function
    const result = await readJSONFile(mockFile);

    expect(result).toEqual({ test: 'value' });
  });

  it('should handle invalid JSON gracefully', async () => {
    const mockFile = new File(['{invalid: json}'], 'invalid.json', {
      type: 'application/json',
    });

    // Test that invalid JSON throws an error
    await expect(readJSONFile(mockFile)).rejects.toThrow('Failed to parse file as JSON');
  });

  it('should handle non-JSON files gracefully', async () => {
    const mockFile = new File(['not json content'], 'text.txt', {
      type: 'text/plain',
    });

    // Test that non-JSON files throw an error
    await expect(readJSONFile(mockFile)).rejects.toThrow('Failed to parse file as JSON');
  });

  it('should handle valid JSON with complex structure', async () => {
    const mockFile = new File(['{"logs": [{"timestamp": "2023-01-01T00:00:00Z", "message": "test log"}]}'], 'complex.json', {
      type: 'application/json',
    });

    const result = await readJSONFile(mockFile);

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

    const result = await readJSONFile(mockFile);

    expect(result).toEqual({});
  });

  it('should normalize records to consistent structure', async () => {
    const mockFile = new File(['{"message": "test", "timestamp": "2023-01-01T00:00:00Z"}'], 'normalized.json', {
      type: 'application/json',
    });

    const result = await readJSONFile(mockFile);

    // Should return normalized record with consistent structure
    expect(result).toEqual({
      message: 'test',
      timestamp: '2023-01-01T00:00:00Z'
    });
  });

  it('should handle file read errors gracefully', async () => {
    // Create a mock file that will fail to read
    const mockFile = new File(['{"test": "value"}'], 'error.json', {
      type: 'application/json',
    });

    // Mock FileReader to simulate read error
    const originalFileReader = global.FileReader;
    const mockReader = {
      readAsText: jest.fn().mockImplementation(function() {
        // Simulate error in reader
        setTimeout(() => {
          this.onerror?.();
        }, 0);
      }),
      onload: jest.fn(),
      onerror: jest.fn(),
      result: null
    };

    // @ts-ignore - we're mocking FileReader for testing purposes
    global.FileReader = jest.fn().mockImplementation(() => mockReader);

    await expect(readJSONFile(mockFile)).rejects.toThrow('Failed to read file');

    // Restore original FileReader
    global.FileReader = originalFileReader;
  });
});