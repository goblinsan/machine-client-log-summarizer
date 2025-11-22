import { config } from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { z } from 'zod';
import { Config } from './types';

// Load environment variables
config();

// Load and validate config from file
const configFile = resolve(process.cwd(), 'config.json');
let fileConfig: Partial<Config> = {};

try {
  const fileContent = readFileSync(configFile, 'utf-8');
  fileConfig = JSON.parse(fileContent);
} catch (e) {
  // If config file doesn't exist or is invalid, continue with defaults
}

// Merge configs in hierarchy: CLI > file > env
const mergedConfig = {
  ...{
    logPath: './logs',
    storePath: './data',
    lmStudioEndpoint: 'http://localhost:1234'
  },
  ...fileConfig,
  ...process.env
};

// Validate merged config against schema
const parsedConfig = Config.parse(mergedConfig);

export default parsedConfig;