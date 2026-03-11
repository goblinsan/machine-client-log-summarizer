import { schema } from './schema';
import type { Config } from './schema';
import { defaults } from './defaults';

export type { Config };

export type EnvError = {
  key: string;
  value: string;
  reason: string;
};

export function validateEnvValue(
  key: string,
  value: string | undefined,
): string | undefined {
  if (value === undefined) return undefined;

  if (value === '') return undefined;

  if (value === null) return undefined;

  if (typeof value !== 'string') return undefined;

  return value;
}

export function loadConfig(cliArgs: Record<string, string> = {}): Config {
  const envConfig: Partial<Config> = {
    logPath: process.env.LOG_PATH,
    logLevel: process.env.LOG_LEVEL as Config['logLevel'],
    lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT,
  };

  const filtered: Record<string, string> = {};
  for (const [key, value] of Object.entries(envConfig)) {
    const validated = validateEnvValue(key, value);
    if (validated !== undefined) {
      filtered[key] = validated;
    }
  }

  const cliConfig: Record<string, unknown> = {};

export function getEnvConfig(): Partial<Config> {
  return Object.fromEntries(
    Object.entries({
      logPath: process.env.LOG_PATH,
      logLevel: process.env.LOG_LEVEL,
      lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT,
    }).map(([key, value]) => {
      const validated = validateEnvValue(key, value);
      return validated !== undefined ? [key, validated] : undefined;
    }).filter((entry): entry is [string, string] => entry !== undefined),
  );
}

export function getDefaults(): Partial<Config> {
  return { ...defaults };
}
      lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT,
    }).filter(([, v]) => v !== undefined),
  );
}

export function getDefaults(): Partial<Config> {
  return { ...defaults };
}

