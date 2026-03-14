  enableStreaming: z.boolean().default(true),
  enableCache: z.boolean().default(true),

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

