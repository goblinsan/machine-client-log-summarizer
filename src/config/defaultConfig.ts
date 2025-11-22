import { Config } from './types';

export const defaultConfig: Config = {
  logPath: './logs',
  storePath: './store',
  lmStudioEndpoint: 'http://localhost:1234/v1',
  cli: {
    port: 3000,
    host: 'localhost',
  },
  env: 'development',
};
