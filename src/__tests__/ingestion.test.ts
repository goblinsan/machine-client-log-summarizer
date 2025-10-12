import { describe, it, expect, vi } from 'vitest';
import { parseJsonFile, processFile } from '../ingestion';

describe('ingestion', () => {
  describe('parseJsonFile', () => {
    it('should parse valid JSON content', () => {
      const validJson = '{"name": "test", "value": 42}';
      const result = parseJsonFile(validJson);
      expect(result).toEqual({ name: 'test', value: 42 });
    });

    it('should throw an error for invalid JSON content', () => {
      const invalidJson = '{"name": "test", "value":}';
      expect(() => parseJsonFile(invalidJson)).toThrow('Invalid JSON content');
    });

    it('should handle empty string gracefully', () => {
      const emptyJson = '';
      expect(() => parseJsonFile(emptyJson)).toThrow('Invalid JSON content');
    });
  });

  describe('processFile', () => {
    it('should process a valid JSON file and return parsed data', async () => {
      const mockFile = new File(['{"message": "test log entry"}'], 'test.json', {
        type: 'application/json',
      });

      const result = await processFile(mockFile);
      expect(result).toEqual({ message: 'test log entry' });
    });

    it('should reject with error for invalid JSON file', async () => {
      const mockFile = new File(['{"message": "test log entry",}'], 'invalid.json', {
        type: 'application/json',
      });

      await expect(processFile(mockFile)).rejects.toThrow('Failed to parse file');
    });

    it('should handle file reading errors gracefully', async () => {
      const mockFile = new File(['{"message": "test log entry"}'], 'test.json', {
        type: 'application/json',
      });

      // Mock FileReader to simulate read error
      const originalReadAsText = FileReader.prototype.readAsText;
      vi.spyOn(FileReader.prototype, 'readAsText').mockImplementation(function () {
        // @ts-expect-error - we're mocking the prototype
        this.onerror?.({ target: { result: null } });
      });

      await expect(processFile(mockFile)).rejects.toThrow('Failed to read file');

      // Restore original implementation
      vi.spyOn(FileReader.prototype, 'readAsText').mockImplementation(originalReadAsText);
    });
  });
});