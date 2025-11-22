import { z } from 'zod';

export const configSchema = z.object({
  logPath: z.string().default('logs/app.log'),
  store: z.object({
    type: z.enum(['memory', 'file']).default('memory'),
    path: z.string().default('./data/store.json')
  }).default({ type: 'memory', path: './data/store.json' }),
  lmStudioEndpoint: z.string().default('http://localhost:1234/v1'),
  // ... existing schema properties
});

export type Config = z.infer<typeof configSchema>;