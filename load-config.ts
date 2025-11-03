import { readFileSync } from 'fs';
import { parseEnv } from 'dotenv';

export async function loadConfig(): Promise<any> {
  const configFile = process.env.CONFIG_FILE || 'config.json';
  let config;

  try {
    config = JSON.parse(readFileSync(configFile, 'utf8'));
  } catch (error) {
    console.error('Error loading config:', error);
    return {};
  }

  const envConfig = parseEnv();
  Object.assign(config, envConfig);

  return config;