import { Config } from './types';

export function validateConfig(config: Config): void {
  const errors: string[] = [];

  if (!config.logPath || typeof config.logPath !== 'string') {
    errors.push('logPath must be a non-empty string');
  }

  if (!config.store || typeof config.store !== 'string') {
    errors.push('store must be a non-empty string');
  }

  if (!config.lmStudioEndpoint || typeof config.lmStudioEndpoint !== 'string') {
    errors.push('lmStudioEndpoint must be a non-empty string');
  }

  if (errors.length > 0) {
    throw new Error(`Invalid config: ${errors.join(', ')}`);
  }
}
