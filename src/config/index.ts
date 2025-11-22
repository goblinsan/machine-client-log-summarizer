import { z } from 'zod';
import { configSchema } from './schema';
import fs from 'fs';
import path from 'path';

// Load config from environment, file, and CLI args in order of precedence
export const loadConfig = (): z.infer<typeof configSchema> => {
  // Load from environment variables
  const envConfig = process.env;

  // Load from file (e.g., config.json)
  const configFile = path.join(process.cwd(), 'config.json');
  let fileConfig = {};
  if (fs.existsSync(configFile)) {
    const fileContent = fs.readFileSync(configFile, 'utf-8');
    fileConfig = JSON.parse(fileContent);
  }

  // Merge in CLI args (mocked here for now)
  const cliConfig = {};

  // Merge configs in order of precedence (CLI > file > env)
  const mergedConfig = { ...envConfig, ...fileConfig, ...cliConfig };

  // Validate and parse with Zod
  const parsed = configSchema.parse(mergedConfig);

  return parsed;
};