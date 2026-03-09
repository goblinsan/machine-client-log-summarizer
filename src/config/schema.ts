import { z } from 'zod';

/**
 * JSON Schema for configuration validation
 */
export const schema = z.object({
  // Logging
  logPath: z.string().default('./logs'),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  timeout: z.number().positive().default(30000),

  // Storage
  storePath: z.string().default('./data'),
  storeType: z.enum(['json', 'sqlite', 'mongodb']).default('json'),

  // LM Studio endpoint
  lmStudioEndpoint: z.string().url().default('http://localhost:1234/v1'),

  // Application
  appName: z.string().default('Multi-Agent Log Summarizer'),
  version: z.string().default('1.0.0'),

  // Processing
  batchSize: z.number().positive().default(10),
  maxRetries: z.number().positive().default(3),

  // Environment
  env: z.enum(['development', 'production', 'test']).default('development'),

  // Features
  enableStreaming: z.boolean().default(true),
  enableCache: z.boolean().default(true),

  // Security
  allowCors: z.boolean().default(true),
  corsOrigins: z.string().default('*'),
});

/**
 * Type for configuration
 */
export type Config = z.infer<typeof schema>;

/**
 * Parse and validate configuration object
 */
export function parseConfig(config: Partial<Config>): Config {
  return schema.parse(config);
}