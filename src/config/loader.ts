import { config } from 'dotenv';
import path from 'path';

// Default configuration values
const DEFAULT_LOG_PATH = './logs';
const DEFAULT_STORE_PATH = './store';
const DEFAULT_LM_STUDIO_ENDPOINT = 'http://localhost:1234';

config({ path: path.resolve(process.cwd(), '.env') });

interface Config {
  logPath: string;
  storePath: string;
  lmStudioEndpoint: string;
}

const configLoader = (): Config => {
  return {
    logPath: process.env.LOG_PATH || DEFAULT_LOG_PATH,
    storePath: process.env.STORE_PATH || DEFAULT_STORE_PATH,
    lmStudioEndpoint: process.env.LM_STUDIO_ENDPOINT || DEFAULT_LM_STUDIO_ENDPOINT
  };
};

export default configLoader;