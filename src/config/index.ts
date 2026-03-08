import { defaults } from './defaults';
import { schema } from './schema';
import { parseArgs } from 'node:util';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Configuration loader with hierarchical priority:
 * 1. CLI arguments (highest)
 * 2. Environment variables
 * 3. Config file (JSON)
 * 4. Defaults (lowest)
 */

export interface Config {
  logPath: string;
  logLevel: string;
  storePath: string;
  storeType: string;
  lmStudioEndpoint: string;
  appName: string;
  version: string;
  batchSize: number;
  maxRetries: number;
  env: string;
  enableStreaming: boolean;
  enableCache: boolean;
  allowCors: boolean;
  corsOrigins: string;
}

export type ConfigKeys = keyof Config;

/**
 * Load configuration from environment variables
 */
function loadEnvConfig(): Partial<Config> {
  const env = process.env;
  
  return {
    logPath: env.LOG_PATH || undefined,
    logLevel: env.LOG_LEVEL || undefined,
    storePath: env.STORE_PATH || undefined,
    storeType: env.STORE_TYPE || undefined,
    lmStudioEndpoint: env.LM_STUDIO_ENDPOINT || undefined,
    appName: env.APP_NAME || undefined,
    version: env.VERSION || undefined,
    batchSize: env.BATCH_SIZE ? parseInt(env.BATCH_SIZE, 10) : undefined,
    maxRetries: env.MAX_RETRIES ? parseInt(env.MAX_RETRIES, 10) : undefined,
    env: env.ENV || undefined,
    enableStreaming: env.ENABLE_STREAMING === 'true' ? true : undefined,
    enableCache: env.ENABLE_CACHE === 'true' ? true : undefined,
    allowCors: env.ALLOW_CORS === 'true' ? true : undefined,
    corsOrigins: env.CORS_ORIGINS || undefined,
  };
}

/**
 * Load configuration from JSON file
 */
function loadFileConfig(filePath: string): Partial<Config> {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const config = JSON.parse(fileContent);
    
    // Validate against schema
    const validated = schema.parse(config);
    
    return validated;
  } catch (error) {
    console.error(`Failed to load config from ${filePath}:`, error);
    return {};
  }
}

/**
 * Load configuration from CLI arguments
 */
function loadCliConfig(): Partial<Config> {
  const args = parseArgs({
    options: {
      'log-path': { type: 'string' },
      'log-level': { type: 'string' },
      'store-path': { type: 'string' },
      'store-type': { type: 'string' },
      'lm-studio-endpoint': { type: 'string' },
      'app-name': { type: 'string' },
      'version': { type: 'string' },
      'batch-size': { type: 'string' },
      'max-retries': { type: 'string' },
      'env': { type: 'string' },
      'enable-streaming': { type: 'boolean' },
      'enable-cache': { type: 'boolean' },
      'allow-cors': { type: 'boolean' },
      'cors-origins': { type: 'string' },
    },
    allowPositionals: false,
  });
  
  return {
    logPath: args['log-path'] || undefined,
    logLevel: args['log-level'] || undefined,
    storePath: args['store-path'] || undefined,
    storeType: args['store-type'] || undefined,
    lmStudioEndpoint: args['lm-studio-endpoint'] || undefined,
    appName: args['app-name'] || undefined,
    version: args['version'] || undefined,
    batchSize: args['batch-size'] ? parseInt(args['batch-size'], 10) : undefined,
    maxRetries: args['max-retries'] ? parseInt(args['max-retries'], 10) : undefined,
    env: args['env'] || undefined,
    enableStreaming: args['enable-streaming'] || undefined,
    enableCache: args['enable-cache'] || undefined,
    allowCors: args['allow-cors'] || undefined,
    corsOrigins: args['cors-origins'] || undefined,
  };
}

/**
 * Load configuration from config file
 */
function loadConfigFile(): Partial<Config> {
  const configPath = resolve(process.cwd(), 'config.json');
  return loadFileConfig(configPath);
}

/**
 * Load configuration from environment file
 */
function loadEnvFile(): Partial<Config> {
  const envPath = resolve(process.cwd(), '.env');
  if (!readFileSync(envPath, 'utf-8')) {
    return {};
  }
  return loadEnvConfig();
}

/**
 * Main configuration loader with hierarchical priority
 */
export function loadConfig(): Config {
  // Load in priority order: CLI > Env File > Config File > Defaults
  const cliConfig = loadCliConfig();
  const envFileConfig = loadEnvFile();
  const configFile = loadConfigFile();
  const envConfig = loadEnvConfig();
  
  // Merge configs with priority: CLI > Env File > Config File > Env > Defaults
  const merged = { ...defaults, ...envConfig, ...configFile, ...envFileConfig, ...cliConfig };
  
  // Validate against schema
  const validated = schema.parse(merged);
  
  return validated;
}

/**
 * Export default config for use without loading
 */
export const config = loadConfig();