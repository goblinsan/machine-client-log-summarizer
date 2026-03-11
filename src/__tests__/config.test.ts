import { describe, it, expect } from 'vitest';
import { loadConfig, schema, defaults } from '../config';

describe('Config Loader', () => {
  describe('loadConfig', () => {
    it('should return default configuration when no overrides are provided', () => {
      const config = loadConfig();

      expect(config.logPath).toBe('./logs');
      expect(config.logLevel).toBe('info');
      expect(config.timeout).toBe(30000);
      expect(config.storePath).toBe('./data');
      expect(config.storeType).toBe('json');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
      expect(config.appName).toBe('Multi-Agent Log Summarizer');
      expect(config.version).toBe('1.0.0');
      expect(config.batchSize).toBe(10);
      expect(config.maxRetries).toBe(3);
      expect(config.env).toBe('development');
      expect(config.enableStreaming).toBe(true);
      expect(config.enableCache).toBe(true);
      expect(config.allowCors).toBe(true);
      expect(config.corsOrigins).toBe('*');
    });

    it('should accept partial overrides', () => {
      const config = loadConfig({ logLevel: 'debug', timeout: 60000 });

      expect(config.logLevel).toBe('debug');
      expect(config.timeout).toBe(60000);
      expect(config.logPath).toBe('./logs');
    });

    it('should validate configuration against schema', () => {
      const config = loadConfig();
      expect(() => schema.parse(config)).not.toThrow();
    });
  });

  describe('defaults', () => {
    it('should provide default values for all config keys', () => {
      expect(defaults).toBeDefined();
      expect(defaults.logPath).toBe('./logs');
      expect(defaults.logLevel).toBe('info');
    });
  });

  describe('schema', () => {
    it('should have all expected fields', () => {
      const shape = schema.shape;

      expect(shape.logPath).toBeDefined();
      expect(shape.logLevel).toBeDefined();
      expect(shape.timeout).toBeDefined();
      expect(shape.storePath).toBeDefined();
      expect(shape.storeType).toBeDefined();
      expect(shape.lmStudioEndpoint).toBeDefined();
      expect(shape.appName).toBeDefined();
      expect(shape.version).toBeDefined();
      expect(shape.batchSize).toBeDefined();
      expect(shape.maxRetries).toBeDefined();
      expect(shape.env).toBeDefined();
      expect(shape.enableStreaming).toBeDefined();
      expect(shape.enableCache).toBeDefined();
      expect(shape.allowCors).toBeDefined();
      expect(shape.corsOrigins).toBeDefined();
    });
  });
});
