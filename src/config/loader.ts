import { schema } from './schema';
import type { Config } from './schema';
import { defaults } from './defaults';

export type { Config };

export function loadConfig(cliArgs: Record<string, string> = {}): Config {
  const envConfig: Partial<Config> = {
    logPath: process.env.LOG_PATH,
    logLevel: process.env.LOG_LEVEL as Config['logLevel'],
    lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT,
  };

  const filtered = Object.fromEntries(
    Object.entries(envConfig).filter(([, v]) => v !== undefined),
  );

  const cliConfig: Record<string, unknown> = {};
  if (cliArgs['log-path']) cliConfig.logPath = cliArgs['log-path'];
  if (cliArgs['log-level']) cliConfig.logLevel = cliArgs['log-level'];
  if (cliArgs['lm-studio-endpoint']) cliConfig.lmStudioEndpoint = cliArgs['lm-studio-endpoint'];

  return schema.parse({ ...defaults, ...filtered, ...cliConfig });
}

export function getEnvConfig(): Partial<Config> {
  return Object.fromEntries(
    Object.entries({
      logPath: process.env.LOG_PATH,
      logLevel: process.env.LOG_LEVEL,
      lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT,
    }).filter(([, v]) => v !== undefined),
  );
}

export function getDefaults(): Partial<Config> {
  return { ...defaults };
}
