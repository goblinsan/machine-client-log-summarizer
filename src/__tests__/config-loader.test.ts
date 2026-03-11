import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadConfig, getEnvConfig, getDefaults } from '../config/loader';
import { parseCliArgs } from '../config/cli';

describe('Config Loader', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('loadConfig', () => {
    it('should load config with defaults when no env vars are set', () => {
      const config = loadConfig({});
      expect(config).toBeDefined();
      expect(config.logPath).toBe('logs');
      expect(config.logStore).toBe('file');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
      expect(config.model).toBe('mistralai/Mistral-7B-Instruct-v0.1');
      expect(config.temperature).toBe(0.7);
      expect(config.maxTokens).toBe(4096);
      expect(config.enableSecurity).toBe(true);
      expect(config.enableQa).toBe(true);
    });

    it('should override defaults with environment variables', () => {
      process.env.LOG_PATH = '/custom/logs';
      process.env.LOG_STORE = 's3';
      process.env.LM_STUDIO_ENDPOINT = 'http://localhost:1235/v1';
      process.env.MODEL = 'meta-llama/Llama-2-7b';
      process.env.TEMPERATURE = '0.5';
      process.env.MAX_TOKENS = '2048';
      process.env.ENABLE_SECURITY = 'false';
      process.env.ENABLE_QA = 'false';

      const config = loadConfig({});

      expect(config.logPath).toBe('/custom/logs');
      expect(config.logStore).toBe('s3');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1235/v1');
      expect(config.model).toBe('meta-llama/Llama-2-7b');
      expect(config.temperature).toBe(0.5);
      expect(config.maxTokens).toBe(2048);
      expect(config.enableSecurity).toBe(false);
      expect(config.enableQa).toBe(false);

      delete process.env.LOG_PATH;
      delete process.env.LOG_STORE;
      delete process.env.LM_STUDIO_ENDPOINT;
      delete process.env.MODEL;
      delete process.env.TEMPERATURE;
      delete process.env.MAX_TOKENS;
      delete process.env.ENABLE_SECURITY;
      delete process.env.ENABLE_QA;
    });

    it('should override environment variables with CLI arguments', () => {
      process.env.LOG_PATH = '/env/logs';
      process.env.LOG_STORE = 's3';

      const config = loadConfig({
        'log-path': '/cli/logs',
        'log-store': 'file',
      });

      expect(config.logPath).toBe('/cli/logs');
      expect(config.logStore).toBe('file');

      delete process.env.LOG_PATH;
      delete process.env.LOG_STORE;
    });

    it('should handle boolean CLI flags correctly', () => {
      const config = loadConfig({
        'enable-security': 'true',
        'enable-qa': 'true',
      });

      expect(config.enableSecurity).toBe(true);
      expect(config.enableQa).toBe(true);
    });

    it('should parse numeric values correctly', () => {
      const config = loadConfig({
        temperature: '0.3',
        'max-tokens': '1024',
      });

      expect(config.temperature).toBe(0.3);
      expect(config.maxTokens).toBe(1024);
    });

    it('should validate config against schema', () => {
      const config = loadConfig({
        'log-path': '/valid/path',
        'log-store': 'file',
        'lm-studio-endpoint': 'http://localhost:1234/v1',
        model: 'test-model',
        temperature: '0.5',
        'max-tokens': '512',
      });

      expect(config.logPath).toBe('/valid/path');
      expect(config.logStore).toBe('file');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
      expect(config.model).toBe('test-model');
      expect(config.temperature).toBe(0.5);
      expect(config.maxTokens).toBe(512);
    });
  });

  describe('getEnvConfig', () => {
    it('should return empty config when no env vars are set', () => {
      const config = getEnvConfig();
      expect(config).toEqual({});
    });

    it('should return config with env vars', () => {
      process.env.LOG_PATH = '/test/logs';
      process.env.LOG_STORE = 's3';

      const config = getEnvConfig();

      expect(config.logPath).toBe('/test/logs');
      expect(config.logStore).toBe('s3');

      delete process.env.LOG_PATH;
      delete process.env.LOG_STORE;
    });
  });

  describe('getDefaults', () => {
    it('should return default config', () => {
      const config = getDefaults();
      expect(config.logPath).toBe('logs');
      expect(config.logStore).toBe('file');
      expect(config.lmStudioEndpoint).toBe('http://localhost:1234/v1');
      expect(config.model).toBe('mistralai/Mistral-7B-Instruct-v0.1');
      expect(config.temperature).toBe(0.7);
      expect(config.maxTokens).toBe(4096);
      expect(config.enableSecurity).toBe(true);
      expect(config.enableQa).toBe(true);
    });
  });
});