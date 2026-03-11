export { schema, parseConfig } from './schema';
export type { Config } from './schema';
export { defaults } from './defaults';
export { getEnvConfig, getDefaults } from './loader';
export { loadConfig as loadConfigFromCli } from './loader';
export { parseCliArgs, showHelp } from './cli';
export { GUARDRAILS, ESCALATION_RULES, PERSONA_CONSTRAINTS, GUARDRAIL_CONFIG } from './guardrails';

import { schema } from './schema';
import type { Config } from './schema';

export function loadConfig(overrides: Partial<Config> = {}): Config {
  return schema.parse(overrides);
}

export const config = loadConfig();
