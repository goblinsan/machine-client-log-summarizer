import { z } from 'zod';

/**
 * Configuration schema for the log summarizer.
 */
export const schema = z.object({
  enableStreaming: z.boolean().default(true),
  enableCache: z.boolean().default(true),

  /**
   * Type for configuration
   */
  export: z.object({
    type: z.enum(['console', 'file']).default('console'),
    path: z.string().optional(),
  }).optional(),

  logPath: z.string().optional(),
  logLevel: z.string().optional(),
  timeout: z.number().optional(),
  storePath: z.string().optional(),
  storeType: z.string().optional(),
  lmStudioEndpoint: z.string().optional(),
  appName: z.string().optional(),
  version: z.string().optional(),
  batchSize: z.number().optional(),
  maxRetries: z.number().optional(),
  env: z.string().optional(),
  allowCors: z.boolean().optional(),
  corsOrigins: z.string().optional(),
  enableCompaction: z.boolean().optional(),
  compactionSchedule: z.string().optional(),
  retentionDays: z.number().optional(),
  ttlSeconds: z.number().optional(),
  maxBytes: z.number().optional(),
  maxEvents: z.number().optional(),
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

export default schema;
