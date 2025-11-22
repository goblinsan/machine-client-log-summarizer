import { z } from 'zod';

export const configSchema = z.object({
  logPath: z.string().default('./logs'),
  store: z.object({
    type: z.enum(['memory', 'file']).default('memory'),
    path: z.string().default('./store')
  }).default({ type: 'memory', path: './store' }),
  lmStudioEndpoint: z.string().default('http://localhost:1234'),
  // ... existing schema properties
});

export type Config = z.infer<typeof configSchema>;