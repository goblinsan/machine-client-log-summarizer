export interface Config {
  logPath?: string;
  store?: {
    type: 'memory' | 'file';
    path?: string;
  };
  lmStudioEndpoint?: string;
}

export const defaultConfig: Config = {
  logPath: './logs',
  store: {
    type: 'memory',
    path: './store.json'
  },
  lmStudioEndpoint: 'http://localhost:1234/v1'
};
