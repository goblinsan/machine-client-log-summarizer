/**
 * Default configuration values
 */

export const defaults = {
  // Logging
  logPath: './logs',
  logLevel: 'info',
  
  // Data store
  storePath: './data',
  storeType: 'json',
  
  // LM Studio endpoint
  lmStudioEndpoint: 'http://localhost:1234/v1',
  
  // Application
  appName: 'LogSummarizer',
  version: '0.1.0',
  
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
} as const;