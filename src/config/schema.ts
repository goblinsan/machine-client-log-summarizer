import { z } from 'zod';

export const configSchema = z.object({
  logPath: z.string().default('logs'),
  store: z.object({
    type: z.enum(['memory', 'file']).default('memory'),
  }).default({ type: 'memory' }),
  lmStudioEndpoint: z.string().default('http://localhost:1234'),
  // ... other fields
});

export type Config = z.infer<typeof configSchema>;