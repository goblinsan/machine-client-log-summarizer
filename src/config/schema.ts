import { Config } from './types';

export const configSchema: Record<string, any> = {
  type: 'object',
  properties: {
    },
  },
  required: ['logPath', 'store', 'lmStudioEndpoint'],
  default: {
    logPath: './logs',
    store: 'memory',
    lmStudioEndpoint: 'http://localhost:1234'
  }
};