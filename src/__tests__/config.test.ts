import { describe, it, expect } from 'vitest';
import { loadConfig, schema, defaults } from '../config';

describe('Config Loader', () => {
  describe('loadConfig', () => {
    it('should return default configuration when no overrides are provided', () => {
      const config = loadConfig();

      expect(config.enableStreaming).toBe(true);
      expect(config.enableCache).toBe(true);
    });

    it('should accept partial overrides', () => {
      const config = loadConfig({ enableStreaming: false, export: { type: 'file', path: './logs' } });

      expect(config.enableStreaming).toBe(false);
    });

    it('should validate configuration against schema', () => {
      const config = loadConfig();
      expect(() => schema.parse(config)).not.toThrow();
    });
  });

  describe('defaults', () => {
    it('should provide default values for all config keys', () => {
      expect(defaults).toBeDefined();
    });
  });

  describe('schema', () => {
    it('should have all expected fields', () => {
      const shape = schema.shape;

      expect(shape.enableStreaming).toBeDefined();
      expect(shape.enableCache).toBeDefined();
    });
  });
});
