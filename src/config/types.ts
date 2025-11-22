export interface Config {
  logPath: string;
  storePath: string;
  lmStudioEndpoint: string;
  [key: string]: any;
}

export interface ConfigSchema {
  type: 'object';
  properties: {
    },
  };
}

export interface DefaultConfig {
  logPath: string;
  storePath: string;
  lmStudioEndpoint: string;
}