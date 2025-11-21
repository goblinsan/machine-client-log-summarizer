import { Config } from './types'

export const defaultConfig: Config = {
  logPath: './logs',
  store: {
    type: 'memory',
    path: './store'
  },
  lmStudioEndpoint: 'http://localhost:1234/v1'
}

export const defaultConfigValues = {
  logPath: './logs',
  storeType: 'memory',
  storePath: './store',
  lmStudioEndpoint: 'http://localhost:1234/v1'
}