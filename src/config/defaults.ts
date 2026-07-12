import type { Config } from './schema';

export const defaults: Partial<Config> = {
  export: {
    type: 'file' as const,
    path: './data',
  },
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
  logPath: '',
  logLevel: '',
  timeout: undefined,
};

export default defaults;
