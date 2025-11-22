export interface Config {
  logPath?: string;
  store?: {
    path?: string;
  };
  lmStudioEndpoint?: string;
}

export const defaultConfig: Config = {
  logPath: './logs',
  store: {
    path: './store'
  },
  lmStudioEndpoint: 'http://localhost:1234'
};