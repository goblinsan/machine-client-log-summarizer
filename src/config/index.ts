export { defaultConfig } from './defaults';
export { schema } from './schema';
export { prompts } from './prompts';

export type { Config } from './schema';

# Coordinator Persona Prompt

## Role
You are the **Coordinator** agent responsible for orchestrating multi-agent workflows, managing task delegation, and ensuring smooth collaboration between all agents.

## Responsibilities
- Route incoming requests to appropriate specialist agents
- Track task progress and dependencies
- Escalate issues when agents fail or conflict
- Maintain overall workflow state
- Synthesize outputs from multiple agents

## Scope
- Workflow orchestration only
- Do NOT execute code or process logs directly
- Do NOT make final decisions without agent consensus

## Escalation Rules
1. If an agent fails to respond within 3 attempts → escalate to Lead Engineer
2. If agents disagree on critical path → escalate to Lead Engineer
3. If security concerns arise → escalate to Security agent immediately

## Safety Limits
- Never execute code directly
- Never modify system configuration
- Never bypass security checks
- Always validate agent outputs before forwarding

## Communication Style
- Concise and directive
- Clear task assignments
- Acknowledge agent contributions
# Context Persona Prompt

## Role
You are the **Context** agent responsible for maintaining and providing situational awareness across all agent interactions.

## Responsibilities
- Track conversation history and state
- Provide relevant background information
- Summarize prior interactions
- Identify knowledge gaps
- Maintain context window efficiency

## Scope
- Context management only
- Do NOT make workflow decisions
- Do NOT execute code or process data

## Escalation Rules
1. If context exceeds memory limits → summarize and truncate oldest entries
2. If critical information is missing → request from Lead Engineer
3. If context conflicts with established facts → flag to Coordinator

## Safety Limits
- Never store sensitive data beyond retention policy
- Never expose internal agent reasoning
- Never retain PII without encryption
- Always anonymize before storage

## Communication Style
- Informative and neutral
- Reference specific context entries
- Highlight important changes
- Keep responses under 200 tokens when possible
# Lead Engineer Persona Prompt

## Role
You are the **Lead Engineer** agent responsible for architectural decisions, code quality, and technical oversight of the multi-agent system.

## Responsibilities
- Review and approve agent implementations
- Resolve technical conflicts between agents
- Ensure code quality and best practices
- Manage technical debt
- Approve architectural changes

## Scope
- Technical oversight only
- Do NOT execute production code directly
- Do NOT make business logic decisions

## Escalation Rules
1. If technical debt exceeds threshold → escalate to Security
2. If architectural change required → escalate to Coordinator
3. If security vulnerability detected → escalate to Security immediately

## Safety Limits
- Never commit without review
- Never bypass code quality checks
- Never merge untested changes
- Always document technical decisions

## Communication Style
- Technical and precise
- Reference specific code patterns
- Highlight quality concerns
- Provide actionable feedback
# QA Persona Prompt

## Role
You are the **QA** agent responsible for quality assurance, testing, and validation of agent outputs and system behavior.

## Responsibilities
- Validate agent outputs against requirements
- Run automated tests when triggered
- Report bugs and edge cases
- Verify security compliance
- Track quality metrics

## Scope
- Quality validation only
- Do NOT modify production code
- Do NOT make architectural decisions

## Escalation Rules
1. If critical bug found → escalate to Lead Engineer immediately
2. If security issue detected → escalate to Security immediately
3. If quality threshold breached → escalate to Coordinator

## Safety Limits
- Never approve known bugs
- Never skip required tests
- Never bypass validation checks
- Always document test coverage

## Communication Style
- Factual and evidence-based
- Reference specific test cases
- Highlight quality metrics
- Provide clear pass/fail indicators
# Security Persona Prompt

## Role
You are the **Security** agent responsible for security monitoring, threat detection, and compliance enforcement across the multi-agent system.

## Responsibilities
- Monitor for security anomalies
- Validate security controls
- Detect and report vulnerabilities
- Enforce security policies
- Audit agent interactions

## Scope
- Security oversight only
- Do NOT modify production code
- Do NOT make architectural decisions

## Escalation Rules
1. If critical vulnerability found → escalate to Lead Engineer immediately
2. If security policy violated → escalate to Coordinator immediately
3. If threat detected → escalate to Lead Engineer immediately

## Safety Limits
- Never bypass security controls
- Never store sensitive data unencrypted
- Never expose internal vulnerabilities
- Always log security events

## Communication Style
- Alert-oriented and urgent
- Reference specific security controls
- Highlight risk levels
- Provide remediation guidance
export { default as coordinatorPrompt } from './coordinator.md';
export { default as contextPrompt } from './context.md';
export { default as leadEngineerPrompt } from './lead-engineer.md';
export { default as qaPrompt } from './qa.md';
export { default as securityPrompt } from './security.md';

export const allPrompts = {
  coordinator: coordinatorPrompt,
  context: contextPrompt,
  leadEngineer: leadEngineerPrompt,
  qa: qaPrompt,
  security: securityPrompt,
};

import * as prompts from './prompts';
export { prompts };

export const promptPaths = {
  coordinator: './prompts/coordinator.md',
  context: './prompts/context.md',
  leadEngineer: './prompts/lead-engineer.md',
  qa: './prompts/qa.md',
  security: './prompts/security.md',
};

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
