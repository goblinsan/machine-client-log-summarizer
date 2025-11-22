import { z } from 'zod';
import { ConfigSchema, type Config } from './types';

const defaultConfig: Config = {
  logPath: './logs',
  store: {
    type: 'memory',
    path: './store'
  },
  lmStudioEndpoint: 'http://localhost:1234'
};

export function loadConfig(): Config {
  // TODO: Implement loading from env, file, CLI with proper precedence
  return defaultConfig;
}