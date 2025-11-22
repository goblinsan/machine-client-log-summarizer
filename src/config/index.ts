import { z } from 'zod';
import { configSchema } from './schema';

export interface Config {
  logPath: string;
  storePath: string;
  lmStudioEndpoint: string;
}

export function loadConfig(): Config {
  // Placeholder implementation - actual loading logic to be added
  return {
    logPath: './logs',
    storePath: './store',
    lmStudioEndpoint: 'http://localhost:1234/v1'
  };
}

export function validateConfig(config: any): Config {
  const parsed = configSchema.parse(config);
  return parsed;
}