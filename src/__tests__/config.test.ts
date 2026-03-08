import { describe, it, expect } from 'vitest';
import { loadConfig, Config } from '../config';
import { defaultConfig } from '../config/defaults';
import { configSchema } from '../config/schema';

describe('Config', () => {
  it('should load default config when no env or file provided', () => {
    const config = loadConfig({}, {}, '');
    expect(config).toBeDefined();
    expect(config.logPath).toBe(defaultConfig.logPath);
    expect(config.storePath).toBe(defaultConfig.storePath);
    expect(config.lmStudioEndpoint).toBe(defaultConfig.lmStudioEndpoint);
  });

  it('should load config from env variables', () => {
    const env = {
      LOG_PATH: '/custom/logs',
      STORE_PATH: '/custom/store',
      LM_STUDIO_ENDPOINT: 'http://localhost:1234/v1',
    };
    const config = loadConfig(env, {}, '');
    expect(config.logPath).toBe(env.LOG_PATH);
    expect(config.storePath).toBe(env.STORE_PATH);
    expect(config.lmStudioEndpoint).toBe(env.LM_STUDIO_ENDPOINT);
  });

  it('should load config from file when provided', () => {
    const fileConfig = {
      logPath: '/file/logs',
      storePath: '/file/store',
    };
    const env = {
      LOG_PATH: '/env/logs',
    };
    const config = loadConfig(env, fileConfig, '');
    expect(config.logPath).toBe(fileConfig.logPath);
    expect(config.storePath).toBe(fileConfig.storePath);
    expect(config.lmStudioEndpoint).toBe(defaultConfig.lmStudioEndpoint);
  });

  it('should prioritize file over env', () => {
    const env = {
      LOG_PATH: '/env/logs',
      STORE_PATH: '/env/store',
    };
    const fileConfig = {
      logPath: '/file/logs',
      storePath: '/file/store',
    };
    const config = loadConfig(env, fileConfig, '');
    expect(config.logPath).toBe(fileConfig.logPath);
    expect(config.storePath).toBe(fileConfig.storePath);
  });

  it('should validate config against schema', () => {
    const config = loadConfig({}, {}, '');
    expect(config).toMatchObject(configSchema);
  });
});