import { z } from 'zod';

/**
 * Configuration schema for the log summarizer.
 */
export const schema = z.object({
  enableStreaming: z.boolean().default(true),
  enableCache: z.boolean().default(true),

  /**
   * Type for configuration
   */
  export: z.object({
    type: z.enum(['console', 'file']).default('console'),
    path: z.string().optional(),
  }).optional(),

  logPath: z.string().optional(),
  logLevel: z.string().optional(),
  timeout: z.number().optional(),
  storePath: z.string().optional(),
  storeType: z.string().optional(),
  lmStudioEndpoint: z.string().optional(),
  appName: z.string().optional(),
  version: z.string().optional(),
  batchSize: z.number().optional(),
  maxRetries: z.number().optional(),
  env: z.string().optional(),
  allowCors: z.boolean().optional(),
  corsOrigins: z.string().optional(),
  enableCompaction: z.boolean().optional(),
  compactionSchedule: z.string().optional(),
  retentionDays: z.number().optional(),
  ttlSeconds: z.number().optional(),
  maxBytes: z.number().optional(),
  maxEvents: z.number().optional(),

  // Additional properties from defaults.ts and loader.ts
  logStore: z.string().optional(),
  model: z.string().optional(),
  temperature: z.number().optional(),
  maxTokens: z.number().optional(),
  enableSecurity: z.boolean().default(true),
  enableQA: z.boolean().default(false),

  // For metrics export configuration
  metricsExport: z.object({
    enabled: z.boolean().default(false),
    endpoint: z.string().optional(),
  }).optional(),

  // For migrations
  migrations: z.array(z.object({
    name: z.string(),
    path: z.string().optional(),
  })).default([]),

  // For prompts configuration
  prompts: z.object({
    context: z.string().optional(),
    coordinator: z.string().optional(),
    leadEngineer: z.string().optional(),
    qa: z.string().optional(),
    security: z.string().optional(),
  }),

  // For data packs configuration
  dataPacks: z.object({
    syntheticLogRuns: z.array(z.object({
      persona: z.string(),
      workflowId: z.string().optional(),
      intent: z.string(),
      status: z.enum(['timeout', 'ok', 'flaky', 'fail']).default('ok'),
      timestamp: z.string(),
      durationMs: z.number().optional(),
      error: z.string().optional(),
    })).default([]),
  }),

  // For retention engine configuration
  retentionEngine: z.object({
    schedule: z.string().optional(),
    retentionDays: z.number().default(30),
    ttlSeconds: z.number().optional(),
    maxBytes: z.number().default(1073741824), // 1GB
    maxEvents: z.number().default(10000),
    cleanupStrategy: z.enum(['delete', 'archive']).default('delete'),
  }),

  // For settings panel configuration
  settingsPanel: z.object({
    showMetrics: z.boolean().default(true),
    showSettings: z.boolean().default(true),
    showDebugInfo: z.boolean().default(false),
  }),

  // For batched writer configuration
  batchedWriter: z.object({
    batchSize: z.number().default(10),
    flushIntervalMs: z.number().default(5000),
  }),

  // For event store configuration
  eventStore: z.object({
    type: z.enum(['memory', 'file', 'redis']).default('memory'),
    path: z.string().optional(),
    connectionString: z.string().optional(),
    writeLatencyTargetMs: z.number().default(10),
  }),

  // For compaction job configuration
  compactionJob: z.object({
    schedule: z.string().optional(),
    targetSizeBytes: z.number().default(1073741824), // 1GB
    maxParallelJobs: z.number().default(2),
  }),

  // For synthetic logs configuration
  syntheticLogs: z.object({
    enabled: z.boolean().default(false),
    count: z.number().optional(),
    seed: z.number().int().default(42),
  }),

  // For hash utility configuration
  hashConfig: z.object({
    algorithm: z.enum(['md5', 'sha256']).default('md5'),
    salt: z.string().optional(),
  }),

  // For path extractor configuration
  pathExtractor: z.object({
    defaultRepoUrl: z.string().optional(),
    includeHiddenFiles: z.boolean().default(false),
  }),

  // For JSON preview parser configuration
  jsonPreviewParser: z.object({
    maxDepth: z.number().default(3),
    maxItems: z.number().default(10),
  }),

  // For deduplication configuration
  dedupConfig: z.object({
    windowMs: z.number().default(60000), // 1 minute
    maxItemsPerWindow: z.number().default(100),
  }),

  // For regression gap detection configuration
  regressionGapConfig: z.object({
    thresholdMs: z.number().default(300000), // 5 minutes
    minGapSize: z.number().default(10),
  }),

  // For config loader configuration
  configLoader: z.object({
    envPrefix: z.string().default('LOG_'),
    cliOverridePriority: z.boolean().default(true),
  }),

  // For event store schema configuration
  eventStoreSchema: z.object({
    events: z.array(z.object({
      ts: z.string(),
      level: z.enum(['info', 'warn', 'error', 'debug']),
      persona: z.string().optional(),
      workflow_id: z.string().optional(),
      project_id: z.string().optional(),
      corr_id: z.string().optional(),
      hash: z.string().optional(),
      type: z.enum(['log', 'metric', 'alert', 'trace']),
    })),
    event_meta: z.array(z.object({
      event_id: z.string(),
      workflow_id: z.string(),
      persona: z.string().optional(),
      type: z.enum(['log', 'metric', 'alert', 'trace']),
      ts: z.string(),
      metadata: z.record(z.any()).optional(),
    })),
  }),

  // For settings panel configuration (duplicate - keep one)
});

/**
 * Type for configuration
 */
export type Config = z.infer<typeof schema>;

/**
 * Parse and validate configuration object
 */
export function parseConfig(config: Partial<Config>): Config {
  return schema.parse(config);
}

export default schema;
