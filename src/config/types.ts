export interface Config {
  logPath: string;
  store: {
    type: string;
    path: string;
  };
  lmStudioEndpoint: string;
}

export interface ConfigSchema {
  logPath: string;
  store: {
    type: string;
    path: string;
  };
  lmStudioEndpoint: string;
}