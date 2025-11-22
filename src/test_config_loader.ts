import { loadConfig } from './config_loader';
import fs from 'fs';
import path from 'path';
import { defaultConfig } from './config_schema';

describe('Config Loader', () => {
  it('should load config with defaults when fields are missing', () => {
    const config = loadConfig('./test_configs/missing_fields.json');
    expect(config.logPath).toBe(defaultConfig.logPath);
    expect(config.store).toEqual(defaultConfig.store);
    expect(config.lmStudioEndpoint).toBe(defaultConfig.lmStudioEndpoint);
  });

  it('should use default values when config is empty', () => {
    const config = loadConfig('./test_configs/empty.json');
    expect(config.logPath).toBe(defaultConfig.logPath);
    expect(config.store).toEqual(defaultConfig.store);
    expect(config.lmStudioEndpoint).toBe(defaultConfig.lmStudioEndpoint);
  });
});