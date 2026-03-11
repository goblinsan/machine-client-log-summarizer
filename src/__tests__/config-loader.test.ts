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
  });

  describe('getDefaults', () => {
    it('should return default config', () => {
      const config = getDefaults();
      expect(config.logPath).toBe('./logs');
      expect(config.logLevel).toBe('info');
    });
  });
});
