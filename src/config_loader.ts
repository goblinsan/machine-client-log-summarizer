import { Config } from './config_schema';
import fs from 'fs';
import path from 'path';
import { defaultConfig } from './config_schema';

export function loadConfig(configPath?: string): Config {
  const config = fs.readFileSync(configPath || path.join(process.cwd(), 'config.yaml'), 'utf-8');
  const parsed = YAML.parse(config);
  return { ...defaultConfig, ...parsed };
}

export function getConfigPath(): string {