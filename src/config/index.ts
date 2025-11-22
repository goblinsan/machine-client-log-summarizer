import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

import { validateConfig } from './schema';
import type { Config } from './types';

// Load and validate configuration
const configData: Config = {
  logPath: process.env.LOG_PATH || './logs',
  storePath: process.env.STORE_PATH || './store',
  lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT || 'http://localhost:1234/v1',
};

const validationResult = validateConfig(configData);

if (!validationResult.isValid) {
  console.error('Configuration validation failed:', validationResult.errors);
  process.exit(1);
}

export { configData as config };