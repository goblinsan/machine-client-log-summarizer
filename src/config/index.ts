import { Config } from './types';
import fs from 'fs';
import path from 'path';
import { parse } from 'dotenv';
import { validateConfig } from './validator';

export function loadConfig(): Config {
  // Load config from environment variables
  const envConfig: Partial<Config> = {};

  if (process.env.LOG_PATH) {
    envConfig.logPath = process.env.LOG_PATH;
  }

  if (process.env.STORE_PATH) {
    envConfig.storePath = process.env.STORE_PATH;
  }

  if (process.env.LM_STUDIO_ENDPOINT) {
    envConfig.lmStudioEndpoint = process.env.LM_STUDIO_ENDPOINT;
  }

  // Load config from .env file if exists
  const envPath = path.resolve(process.cwd(), '.env');
  let fileConfig: Partial<Config> = {};

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const parsedEnv = parse(envContent);

    if (parsedEnv.LOG_PATH) {
      fileConfig.logPath = parsedEnv.LOG_PATH;
    }

    if (parsedEnv.STORE_PATH) {
      fileConfig.storePath = parsedEnv.STORE_PATH;
    }

    if (parsedEnv.LM_STUDIO_ENDPOINT) {
      fileConfig.lmStudioEndpoint = parsedEnv.LM_STUDIO_ENDPOINT;
    }
  }

  // Merge configurations with precedence: CLI > file > env
  const config: Config = {
    logPath: fileConfig.logPath || envConfig.logPath || './logs',
    storePath: fileConfig.storePath || envConfig.storePath || './store',
    lmStudioEndpoint: fileConfig.lmStudioEndpoint || envConfig.lmStudioEndpoint || 'http://localhost:1234',
  };

  const validation = validateConfig(config);
  if (!validation.valid) {
    throw new Error(`Configuration validation failed: ${validation.errors?.map(e => e.message).join(', ')}`);
  }

  return config;
}