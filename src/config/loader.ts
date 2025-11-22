import { Config } from './types';
import { defaultValues } from './defaultValues';
import * as fs from 'fs';
import * as path from 'path';

export function loadConfig(): Config {
  const config: Config = { ...defaultValues };

  // Load from environment variables
  if (process.env.LOG_PATH) {
    config.logPath = process.env.LOG_PATH;
  }

  if (process.env.STORE) {
    config.store = process.env.STORE;
  }

  if (process.env.LM_STUDIO_ENDPOINT) {
    config.lmStudioEndpoint = process.env.LM_STUDIO_ENDPOINT;
  }

  // Load from file (JSON or YAML)
  const configPath = path.join(process.cwd(), 'config.json');
  if (fs.existsSync(configPath)) {
    const fileContent = fs.readFileSync(configPath, 'utf-8');
    try {
      const fileConfig: Partial<Config> = JSON.parse(fileContent);
      Object.assign(config, fileConfig);
    } catch (error) {
      throw new Error(`Failed to parse config file: ${error}`);
    }
  }

  // Load from CLI arguments (mocked here for example)
  const cliArgs = process.argv.slice(2);
  const argsMap: { [key: string]: string } = {};
  for (let i = 0; i < cliArgs.length; i += 2) {
    const key = cliArgs[i].replace('--', '');
    const value = cliArgs[i + 1];
    if (key && value) {
      argsMap[key] = value;
    }
  }

  if (argsMap.logPath) {
    config.logPath = argsMap.logPath;
  }

  if (argsMap.store) {
    config.store = argsMap.store;
  }

  if (argsMap.lmStudioEndpoint) {
    config.lmStudioEndpoint = argsMap.lmStudioEndpoint;
  }

  return config;
}
