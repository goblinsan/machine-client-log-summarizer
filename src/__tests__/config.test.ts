import { describe, it, expect } from 'vitest';
import { loadConfig, schema, defaults } from '../config';

describe('Config Loader', () => {
  describe('loadConfig', () => {
    it('should return default configuration when no overrides are provided', () => {
      const config = loadConfig();

      expect(config.enableStreaming).toBe(true);
      expect(config.enableCache).toBe(true);
      expect(config.export.type).toBe('console');
    });

    it('should accept partial overrides', () => {
      const config = loadConfig({ enableStreaming: false, export: { type: 'file', path: './logs' } });

      expect(config.enableStreaming).toBe(false);
      expect(config.export.type).toBe('file');
      expect(config.export.path).toBe('./logs');
    });

    it('should validate configuration against schema', () => {
      const config = loadConfig();
      expect(() => schema.parse(config)).not.toThrow();
    });
  });

  describe('defaults', () => {
    it('should provide default values for all config keys', () => {
      expect(defaults).toBeDefined();
      expect(defaults.enableStreaming).toBe(true);
      expect(defaults.enableCache).toBe(true);
    });
  });

  describe('schema', () => {
    it('should have all expected fields', () => {
      const shape = schema.shape;

      expect(shape.enableStreaming).toBeDefined();
      expect(shape.enableCache).toBeDefined();
      expect(shape.export).toBeDefined();
    });
  });
});
