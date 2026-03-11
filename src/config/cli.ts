import { parseArgs } from 'util';

export function parseCliArgs(args: string[]): Record<string, string> {
  const options = {
    'log-path': { type: 'string' },
    'log-store': { type: 'string' },
    'lm-studio-endpoint': { type: 'string' },
    model: { type: 'string' },
    temperature: { type: 'string' },
    'max-tokens': { type: 'string' },
    'enable-security': { type: 'boolean' },
    'enable-qa': { type: 'boolean' },
    help: { type: 'boolean' },
  };

  const { values, positionals } = parseArgs({
    args,
    options,
    allowPositionals: true,
  });

  // Convert boolean flags
  const config: Record<string, string> = {};
  if (values['enable-security']) {
    config['enable-security'] = 'true';
  }
  if (values['enable-qa']) {
    config['enable-qa'] = 'true';
  }

  return config;
}

export function showHelp(): void {
  console.log(`
Multi-Agent Log Summarizer Configuration

Usage:
  npx machine-client-log-summarizer [options]

Options:
  --log-path <path>         Path to log directory
  --log-store <store>       Log store type (e.g., 'file', 's3')
  --lm-studio-endpoint <url> LM Studio endpoint URL
  --model <model>           Model name to use
  --temperature <num>       Temperature for generation
  --max-tokens <num>        Maximum tokens to generate
  --enable-security         Enable security features
  --enable-qa               Enable QA mode
  --help                    Show this help message

Environment Variables:
  LOG_PATH                  Path to log directory
  LOG_STORE                 Log store type
  LM_STUDIO_ENDPOINT        LM Studio endpoint URL
  MODEL                     Model name
  TEMPERATURE               Temperature for generation
  MAX_TOKENS                Maximum tokens
  ENABLE_SECURITY           Enable security (true/false)
  ENABLE_QA                 Enable QA mode (true/false)
  `);
}