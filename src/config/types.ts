export type Config = {
  logPath: string;
  store: 'memory' | 'file';
  lmStudioEndpoint: string;
  port: number;
  host: string;
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  apiKey: string;
  apiEndpoint: string;
};

export type ConfigSchema = {
  logPath?: string;
  store?: 'memory' | 'file';
  lmStudioEndpoint?: string;
  port?: number;
  host?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  apiKey?: string;
  apiEndpoint?: string;
};