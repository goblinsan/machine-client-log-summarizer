export { SyntheticLogSchema, type LogEntry } from './synthetic-logs';
export { syntheticLogsData } from './synthetic-logs-data';
export { schema, type Config } from './schema';
export { defaults } from './defaults';

import { schema } from './schema';
import type { Config } from './schema';

export function loadConfig(overrides: Partial<Config> = {}): Config {
  return schema.parse(overrides);
}

export const config = loadConfig();






