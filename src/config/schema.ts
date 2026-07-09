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
  }),

  /**
   * Parse and validate configuration object
   */
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
