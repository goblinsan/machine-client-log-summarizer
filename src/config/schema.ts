import { z } from 'zod';

export const configSchema = z.object({
  name: z.string(),
 * JSON Schema for configuration validation
 */
export const schema = z.object({
  // Logging
  logPath: z.string().min(1),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  timeout: z.number().default(30000),
});

export const prompts = {
  coordinator: require('./prompts/coordinator.md'),
  context: require('./prompts/context.md'),
  leadEngineer: require('./prompts/lead-engineer.md'),
  qa: require('./prompts/qa.md'),
  security: require('./prompts/security.md'),
};

  storeType: z.enum(['json', 'sqlite', 'mongodb']).default('json'),
  
  // LM Studio endpoint
  lmStudioEndpoint: z.string().url().or(z.string().min(1)),
  
  // Application
  appName: z.string().min(1),
  version: z.string().min(1),
  
  // Processing
  batchSize: z.number().int().positive().default(10),
  maxRetries: z.number().int().positive().default(3),
  
  // Environment
  env: z.enum(['development', 'production', 'test']).default('development'),
  
  // Features
  enableStreaming: z.boolean().default(true),
  enableCache: z.boolean().default(true),
  
  // Security
  allowCors: z.boolean().default(true),
  corsOrigins: z.string().min(1),
});

/**
 * Export individual schema components for reuse
 */
export const logSchema = schema.pick({ logPath, logLevel });
export const storeSchema = schema.pick({ storePath, storeType });
export const lmStudioSchema = schema.pick({ lmStudioEndpoint });
export const appSchema = schema.pick({ appName, version });
export const processingSchema = schema.pick({ batchSize, maxRetries });
export const envSchema = schema.pick({ env });
export const featuresSchema = schema.pick({ enableStreaming, enableCache });
export const securitySchema = schema.pick({ allowCors, corsOrigins });
