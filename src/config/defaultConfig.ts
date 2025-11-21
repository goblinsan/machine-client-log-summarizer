import { Config } from './types';

export const defaultConfig: Config = {
  logPath: './logs',
  store: {
    type: 'memory',
    path: './store.json',
  },
  lmStudioEndpoint: 'http://localhost:1234',
  port: 3000,
  host: 'localhost',
  model: 'gpt-4',
  apiKey: '',
  maxTokens: 1000,
  temperature: 0.7,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
};