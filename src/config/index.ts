import { createRequire } from 'module';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { z } from 'zod';

import { ConfigSchema, type Config } from './types';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

// Load config from environment variables
const envConfig = {
  logPath: process.env.LOG_PATH,
  storePath: process.env.STORE_PATH,
  lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT,
};

// Load config from file if it exists
const fileConfig: Partial<Config> = {};
try {
  const configFile = readFileSync(resolve(process.cwd(), 'config.json'), 'utf-8');
  Object.assign(fileConfig, JSON.parse(configFile));
} catch (e) {
  // Ignore if file doesn't exist or is invalid
}

// Merge configs in order of priority: CLI > file > env
const mergedConfig = {
  logPath: fileConfig.logPath || envConfig.logPath || './logs',
  storePath: fileConfig.storePath || envConfig.storePath || './store',
  lmStudioEndpoint:
    fileConfig.lmStudioEndpoint || envConfig.lmStudioEndpoint || 'http://localhost:1234',
};

// Validate merged config against schema
const validatedConfig = ConfigSchema.parse(mergedConfig);

export const getConfig = (): Config => {
  return validatedConfig;
};