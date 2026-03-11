import type { Config } from './schema';

export const defaults: Partial<Config> = {
  logPath: './logs',
  logLevel: 'info',
  timeout: 30000,
  storePath: './data',
  storeType: 'json',
  lmStudioEndpoint: 'http://localhost:1234/v1',
  appName: 'Multi-Agent Log Summarizer',
  version: '1.0.0',
  batchSize: 10,
  maxRetries: 3,
  env: 'development',
  enableStreaming: true,
  enableCache: true,
  allowCors: true,
  corsOrigins: '*',
};
