import { z } from 'zod';

export const configSchema = z.object({
  logPath: z.string().default('/var/log/ai'),
  store: z.string().default('/tmp/ai-store'),
  lmStudioEndpoint: z.string().default('http://localhost:1234'),
  // ... other config fields
});