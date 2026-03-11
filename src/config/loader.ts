import { z } from 'zod';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { configSchema } from './schema';
import { defaults } from './defaults';

// Load environment variables from .env file
const envPath = join(dirname(fileURLToPath(import.meta.url)), '../../.env');
if (require('fs').existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

export interface Config {
  logPath: string;
  logStore: string;
  lmStudioEndpoint: string;
  model: string;
  temperature: number;
  maxTokens: number;
  enableSecurity: boolean;
  enableQa: boolean;
}

export function loadConfig(cliArgs: Record<string, string> = {}): Config {
  // Build config object from environment variables
  const envConfig: Partial<Config> = {
    logPath: process.env.LOG_PATH || '',
    logStore: process.env.LOG_STORE || '',
    lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT || '',
    model: process.env.MODEL || '',
    temperature: process.env.TEMPERATURE ? parseFloat(process.env.TEMPERATURE) : 0,
    maxTokens: process.env.MAX_TOKENS ? parseInt(process.env.MAX_TOKENS, 10) : 0,
    enableSecurity: process.env.ENABLE_SECURITY === 'true',
    enableQa: process.env.ENABLE_QA === 'true',
  };

  // Merge with defaults
  const mergedConfig: Partial<Config> = {
    ...defaults,
    ...envConfig,
  };

  // Override with CLI args
  const cliConfig: Partial<Config> = {};
  if (cliArgs['log-path']) {
    cliConfig.logPath = cliArgs['log-path'];
  }
  if (cliArgs['log-store']) {
    cliConfig.logStore = cliArgs['log-store'];
  }
  if (cliArgs['lm-studio-endpoint']) {
    cliConfig.lmStudioEndpoint = cliArgs['lm-studio-endpoint'];
  }
  if (cliArgs['model']) {
    cliConfig.model = cliArgs['model'];
  }
  if (cliArgs['temperature']) {
    cliConfig.temperature = parseFloat(cliArgs['temperature']);
  }
  if (cliArgs['max-tokens']) {
    cliConfig.maxTokens = parseInt(cliArgs['max-tokens'], 10);
  }
  if (cliArgs['enable-security']) {
    cliConfig.enableSecurity = true;
  }
  if (cliArgs['enable-qa']) {
    cliConfig.enableQa = true;
  }

  const finalConfig: Config = {
    ...mergedConfig,
    ...cliConfig,
  };

  // Validate against schema
  const validated = configSchema.parse(finalConfig);

  return validated;
}

export function getEnvConfig(): Partial<Config> {
  const envConfig: Partial<Config> = {
    logPath: process.env.LOG_PATH || '',
    logStore: process.env.LOG_STORE || '',
    lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT || '',
    model: process.env.MODEL || '',
    temperature: process.env.TEMPERATURE ? parseFloat(process.env.TEMPERATURE) : 0,
    maxTokens: process.env.MAX_TOKENS ? parseInt(process.env.MAX_TOKENS, 10) : 0,
    enableSecurity: process.env.ENABLE_SECURITY === 'true',
    enableQa: process.env.ENABLE_QA === 'true',
  };

  return envConfig;
}

export function getDefaults(): Config {
  return { ...defaults };
}