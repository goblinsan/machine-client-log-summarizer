/**
 * Default configuration values for the application.
 * These values are used when no configuration is provided or when fields are missing.
 */

export const defaultValues = {
  logPath: './logs',
  storePath: './store',
  lmStudioEndpoint: 'http://localhost:1234',
};

export type DefaultValues = typeof defaultValues;