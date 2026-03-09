import { describe, it, expect } from 'vitest';
import { loadConfig, schema, defaults } from '../config';
import * as fs from 'fs';
import * as path from 'path';

describe('Config Loader', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Clear environment variables before each test
    Object.keys(originalEnv).forEach(key => {
      if (key.startsWith('LOG_') || key.startsWith('STORE_') || 
          key.startsWith('LM_') || key.startsWith('APP_') || 
          key.startsWith('BATCH_') || key.startsWith('MAX_') ||
          key.startsWith('ENV_') || key.startsWith('ENABLE_') ||
          key.startsWith('ALLOW_') || key.startsWith('CORS_')) {
        delete process.env[key];
      }
    });
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

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

    it('should override defaults with environment variables', () => {
      process.env.LOG_PATH = '/custom/logs';
      process.env.LOG_LEVEL = 'debug';
      process.env.LM_STUDIO_ENDPOINT = 'http://localhost:1235/v1';
      
      const config = loadConfig();
      
      expect(config.logPath).toBe('/custom/logs');
      expect(config.logLevel).toBe('debug');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1235/v1');
    });

    it('should prioritize CLI arguments over environment variables', () => {
      process.env.LOG_LEVEL = 'debug';
      
      const config = loadConfig('--log-level=warn');
      
      expect(config.logLevel).toBe('warn');
    });

    it('should prioritize config file over environment variables', () => {
      const configPath = path.join(process.cwd(), 'src/config.json');
      const configContent = JSON.stringify({
        logPath: '/file/logs',
        logLevel: 'error'
      });
      fs.writeFileSync(configPath, configContent);
      
      process.env.LOG_LEVEL = 'debug';
      
      const config = loadConfig();
      
      expect(config.logPath).toBe('/file/logs');
      expect(config.logLevel).toBe('error');
      
      fs.unlinkSync(configPath);
    });

    it('should validate configuration against schema', () => {
      const config = loadConfig();
      
      expect(() => schema.parse(config)).not.toThrow();
    });

    it('should throw validation error for invalid log level', () => {
      process.env.LOG_LEVEL = 'invalid';
      
      expect(() => loadConfig()).toThrow(/invalid log level/i);
    });

    it('should throw validation error for invalid timeout', () => {
      process.env.TIMEOUT = '-100';
      
      expect(() => loadConfig()).toThrow(/timeout must be positive/i);
    });

    it('should throw validation error for invalid URL', () => {
      process.env.LM_STUDIO_ENDPOINT = 'not-a-url';
      
      expect(() => loadConfig()).toThrow(/invalid url/i);
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