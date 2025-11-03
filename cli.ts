import { loadConfig } from './load-config';

const config = await loadConfig();

if (!validateConfig(config)) {
  console.error('Invalid config');
}