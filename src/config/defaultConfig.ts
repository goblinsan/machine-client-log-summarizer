import { Config } from './types';

export const defaultConfig: Config = {
  logPath: './logs',
  storePath: './store',
  lmStudioEndpoint: 'http://localhost:1234',
  cli: {
    port: 3000,
    host: 'localhost',
  },
  env: {
    NODE_ENV: 'development',
  },
  file: {
    path: './config.json',
  },
};
