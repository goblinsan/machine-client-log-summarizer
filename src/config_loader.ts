import { Config } from './config_schema';
import fs from 'fs';
import path from 'path';
import { defaultConfig } from './config_schema';

export function loadConfig(configPath: string): Config {
  const configContent = fs.readFileSync(configPath, 'utf-8');
  const parsedConfig = JSON.parse(configContent);
  const mergedConfig = { ...defaultConfig, ...parsedConfig };
  return mergedConfig;
}
