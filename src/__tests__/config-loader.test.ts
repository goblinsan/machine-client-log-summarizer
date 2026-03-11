import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadConfig, getEnvConfig, getDefaults } from '../config/loader';

describe('Config Loader', () => {
  const origEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...origEnv };
  });

  describe('loadConfig', () => {
    it('should load config with defaults when no env vars are set', () => {
      const config = loadConfig({});
      expect(config).toBeDefined();
      expect(config.logPath).toBe('./logs');
      expect(config.logLevel).toBe('info');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
    });

    it('should override defaults with environment variables', () => {
      process.env.LOG_PATH = '/custom/logs';
      process.env.LM_STUDIO_ENDPOINT = 'http://localhost:1235/v1';

      const config = loadConfig({});
      expect(config.logPath).toBe('/custom/logs');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1235/v1');
    });

    it('should override environment variables with CLI arguments', () => {
      process.env.LOG_PATH = '/env/logs';

      const config = loadConfig({ 'log-path': '/cli/logs' });
      expect(config.logPath).toBe('/cli/logs');
    });

    it('should handle empty string environment variables', () => {
      process.env.LOG_PATH = '';
      process.env.LOG_LEVEL = '';
      process.env.LM_STUDIO_ENDPOINT = '';

      const config = loadConfig({});
      expect(config.logPath).toBe('./logs');
      expect(config.logLevel).toBe('info');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
    });

    it('should handle null environment variables', () => {
      process.env.LOG_PATH = null;
      process.env.LOG_LEVEL = null;
      process.env.LM_STUDIO_ENDPOINT = null;

      const config = loadConfig({});
      expect(config.logPath).toBe('./logs');
      expect(config.logLevel).toBe('info');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
    });

    it('should handle whitespace-only environment variables', () => {
      process.env.LOG_PATH = '   ';
      process.env.LOG_LEVEL = '   ';
      process.env.LM_STUDIO_ENDPOINT = '   ';

      const config = loadConfig({});
      expect(config.logPath).toBe('./logs');
      expect(config.logLevel).toBe('info');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
    });

    it('should handle special characters in environment variables', () => {
      process.env.LOG_PATH = '/path/with spaces';
      process.env.LOG_LEVEL = 'debug';
      process.env.LM_STUDIO_ENDPOINT = 'http://localhost:1234/v1?param=value&other=123';

      const config = loadConfig({});
      expect(config.logPath).toBe('/path/with spaces');
      expect(config.logLevel).toBe('debug');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1?param=value&other=123');
    });

    it('should handle very long environment variable values', () => {
      const longPath = 'a'.repeat(1000);
      process.env.LOG_PATH = longPath;

      const config = loadConfig({});
      expect(config.logPath).toBe(longPath);
    });

    it('should handle unicode characters in environment variables', () => {
      process.env.LOG_PATH = '/path/with/unicode/🔥/path';
      process.env.LOG_LEVEL = 'info';
      process.env.LM_STUDIO_ENDPOINT = 'http://localhost:1234/v1';

      const config = loadConfig({});
      expect(config.logPath).toBe('/path/with/unicode/🔥/path');
      expect(config.logLevel).toBe('info');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
    });

    it('should handle environment variables with leading/trailing whitespace', () => {
      process.env.LOG_PATH = '  /path/to/logs  ';
      process.env.LOG_LEVEL = '  info  ';
      process.env.LM_STUDIO_ENDPOINT = '  http://localhost:1234/v1  ';

      const config = loadConfig({});
      expect(config.logPath).toBe('  /path/to/logs  ');
      expect(config.logLevel).toBe('  info  ');
      expect(config.lmStudioEndpoint).toBe('  http://localhost:1234/v1  ');
    });

    it('should handle environment variables with newlines', () => {
      process.env.LOG_PATH = '/path\nwith\nnewlines';
      process.env.LOG_LEVEL = 'info';
      process.env.LM_STUDIO_ENDPOINT = 'http://localhost:1234/v1';

      const config = loadConfig({});
      expect(config.logPath).toBe('/path\nwith\nnewlines');
      expect(config.logLevel).toBe('info');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
    });

    it('should handle environment variables with tabs', () => {
      process.env.LOG_PATH = '/path\twith\ttabs';
      process.env.LOG_LEVEL = 'info';
      process.env.LM_STUDIO_ENDPOINT = 'http://localhost:1234/v1';

      const config = loadConfig({});
      expect(config.logPath).toBe('/path\twith\ttabs');
      expect(config.logLevel).toBe('info');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
    });

    it('should handle environment variables with backslashes', () => {
      process.env.LOG_PATH = '/path\\with\\backslashes';
      process.env.LOG_LEVEL = 'info';
      process.env.LM_STUDIO_ENDPOINT = 'http://localhost:1234/v1';

      const config = loadConfig({});
      expect(config.logPath).toBe('/path\\with\\backslashes');
      expect(config.logLevel).toBe('info');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
    });

  });

  describe('getEnvConfig', () => {
    it('should return empty config when no env vars are set', () => {
      delete process.env.LOG_PATH;
      delete process.env.LOG_LEVEL;
      delete process.env.LM_STUDIO_ENDPOINT;
      const config = getEnvConfig();
      expect(Object.keys(config).length).toBe(0);
    });

    it('should return config with env vars', () => {
      process.env.LOG_PATH = '/test/logs';
      const config = getEnvConfig();
      expect(config.logPath).toBe('/test/logs');
    });

    it('should handle empty string environment variables', () => {
      process.env.LOG_PATH = '';
      process.env.LOG_LEVEL = '';
      process.env.LM_STUDIO_ENDPOINT = '';
      const config = getEnvConfig();
      expect(Object.keys(config).length).toBe(0);
    });

    it('should handle null environment variables', () => {
      process.env.LOG_PATH = null;
      process.env.LOG_LEVEL = null;
      process.env.LM_STUDIO_ENDPOINT = null;
      const config = getEnvConfig();
      expect(Object.keys(config).length).toBe(0);
    });

    it('should handle whitespace-only environment variables', () => {
      process.env.LOG_PATH = '   ';
      process.env.LOG_LEVEL = '   ';
      process.env.LM_STUDIO_ENDPOINT = '   ';
      const config = getEnvConfig();
      expect(Object.keys(config).length).toBe(0);
    });

    it('should handle environment variables with special characters', () => {
      process.env.LOG_PATH = '/path/with spaces';
      process.env.LOG_LEVEL = 'debug';
      process.env.LM_STUDIO_ENDPOINT = 'http://localhost:1234/v1?param=value';
      const config = getEnvConfig();
      expect(config.logPath).toBe('/path/with spaces');
      expect(config.logLevel).toBe('debug');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1?param=value');
    });
  });

  describe('getDefaults', () => {
    it('should return default config', () => {
      const config = getDefaults();
      expect(config.logPath).toBe('./logs');
      expect(config.logLevel).toBe('info');
    });
  });
});
      const config = getEnvConfig();
      expect(Object.keys(config).length).toBe(0);
    });

    it('should return config with env vars', () => {
      process.env.LOG_PATH = '/test/logs';
      const config = getEnvConfig();
      expect(config.logPath).toBe('/test/logs');
    });
  });

  describe('getDefaults', () => {
    it('should return default config', () => {
      const config = getDefaults();
      expect(config.logPath).toBe('./logs');
      expect(config.logLevel).toBe('info');
    });
  });
});

