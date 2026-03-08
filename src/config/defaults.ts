import { schema } from './schema';
import { z } from 'zod';

/**
 * Default configuration values
 */
export const defaults = schema.parse({});

/**
 * Type for configuration
 */
export type Config = z.infer<typeof schema>;
  
  // Security
  allowCors: true,
  corsOrigins: '*',
} as const;

