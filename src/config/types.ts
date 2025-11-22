export interface Config {
  logPath: string;
  storePath: string;
  lmStudioEndpoint: string;
}

export interface ConfigSchema {
  type: 'object';
  properties: {
    logPath: {
      type: 'string';
    };
    storePath: {
      type: 'string';
    };
    lmStudioEndpoint: {
      type: 'string';
    };
  };
  required: ['logPath', 'storePath', 'lmStudioEndpoint'];
}