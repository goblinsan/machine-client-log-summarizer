import { z } from 'zod';
import { configSchema } from './schema';

// Load and validate configuration
const loadConfig = (): z.infer<typeof configSchema> => {
  // Priority order: env > file > CLI (not implemented yet)
  const configFromEnv = {
    logPath: process.env.LOG_PATH,
    storePath: process.env.STORE_PATH,
    lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT,
  };

  const validatedConfig = configSchema.parse(configFromEnv);

  return validatedConfig;
};

export const config = loadConfig();

// Export types
export type Config = z.infer<typeof configSchema>;

// Placeholder for future implementation
export default {};