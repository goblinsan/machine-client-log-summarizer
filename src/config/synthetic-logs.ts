// Synthetic logs generator - regression test coverage

export function generateSyntheticLogs(count: number): any[] {
  const logs: any[] = [];
  for (let i = 0; i < count; i++) {
    logs.push({ timestamp: `2024-01-01T00:${i.toString().padStart(2, '0')}:00Z`, level: ['info', 'warn', 'error'][i % 3], message: `Log entry ${i}` });
  }
  return logs;
}

export const SyntheticLogSchema = z.object({
  status: 'ok' | 'flaky' | 'fail' | 'timeout';
  persona: string;
  workflowId: string;
  intent: string;
  timestamp: string;
  durationMs: number;
  error?: string;
});

export type LogEntry = z.infer<typeof SyntheticLogSchema>;

/**
 * Export individual status arrays for targeted testing
 */
export const logsByStatus = {
  ok: syntheticLogs.filter((l) => l.status === 'ok'),
  flaky: syntheticLogs.filter((l) => l.status === 'flaky'),
  fail: syntheticLogs.filter((l) => l.status === 'fail'),
  timeout: syntheticLogs.filter((l) => l.status === 'timeout'),
};

/**
 * Export all persona types for validation
 */
export const personas = Array.from(
  new Set(syntheticLogs.map((l) => l.persona))
);

/**
 * Export all workflow IDs for reference
 */
export const workflowIds = syntheticLogs.map((l) => l.workflowId);

/**
 * Export all intents for reference
 */
export const intents = syntheticLogs.map((l) => l.intent);

/**
 * Export total count
 */
export const totalCount = syntheticLogs.length;

/**
 * Export timestamp range
 */
export const timestampRange = {
  start: syntheticLogs[0].timestamp,
  end: syntheticLogs[syntheticLogs.length - 1].timestamp,
};

export type { LogEntry };

export { syntheticLogs, logsByStatus, personas, workflowIds, intents, totalCount, timestampRange };
