import { schema } from './schema';
import { z } from 'zod';

/**
 * Default configuration values
 */
export const defaults: Partial<Config> = {
  // Logging
  logPath: './logs',
  logLevel: 'info',
  timeout: 30000,

  // Storage
  storePath: './data',
  storeType: 'json',

  // LM Studio endpoint
  lmStudioEndpoint: 'http://localhost:1234/v1',

  // Application
  appName: 'Multi-Agent Log Summarizer',
  version: '1.0.0',

  // Processing
  batchSize: 10,
  maxRetries: 3,

  // Environment
  env: 'development',

  // Features
  enableStreaming: true,
  enableCache: true,

  // Security
  allowCors: true,
  corsOrigins: '*',
};

  // LM Studio endpoint
  lmStudioEndpoint: 'http://localhost:1234/v1',

  // Application
  appName: 'Multi-Agent Log Summarizer',
  version: '1.0.0',

  // Processing
  batchSize: 10,
  maxRetries: 3,

  // Environment
  env: 'development',

  // Features
  enableStreaming: true,
  enableCache: true,

  // Security
  allowCors: true,
  corsOrigins: '*',
});

/**
 * Type for configuration
 */
export type Config = z.infer<typeof schema>;
  
  // Security
  allowCors: true,
  corsOrigins: '*',
} as const;



