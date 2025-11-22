import { z } from 'zod';

export const configSchema = z.object({
  log: z.object({
    path: z.string().default('logs/app.log'),
  }).default({ path: 'logs/app.log' }),
  store: z.object({
    type: z.enum(['memory', 'file']).default('memory'),
  }).default({ type: 'memory' }),
  lmStudio: z.object({
    endpoint: z.string().default('http://localhost:1234'),
  }).default({ endpoint: 'http://localhost:1234' }),
  // ... existing schema properties
});

export type Config = z.infer<typeof configSchema>;