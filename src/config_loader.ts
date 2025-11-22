// config_loader.ts
import { Config } from './types';

const DEFAULT_LOG_PATH = './logs';
const DEFAULT_STORE_CONFIG = {
  type: 'memory',
  path: './store'
};
const DEFAULT_LM_STUDIO_ENDPOINT = 'http://localhost:1234';

export function loadConfig(): Config {
  const config = {
    // ... existing config loading logic
    logPath: process.env.LOG_PATH || DEFAULT_LOG_PATH,
    store: {
      type: process.env.STORE_TYPE || DEFAULT_STORE_CONFIG.type,
      path: process.env.STORE_PATH || DEFAULT_STORE_CONFIG.path
    },
    lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT || DEFAULT_LM_STUDIO_ENDPOINT
  };

  return config;
}