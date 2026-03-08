// Synthetic log schema and data pack definitions
import { z } from 'zod';

export const SyntheticLogSchema = z.object({
 * Synthetic log entry interface for demo/test data
 */
export interface LogEntry {
  status: 'ok' | 'flaky' | 'fail' | 'timeout';
  persona: string;
  workflowId: string;
  intent: string;
  timestamp: string;
  durationMs: number;
  error?: string;
}
  status: z.enum(['ok', 'flaky', 'fail', 'timeout']),
});

// Data pack exports will be added in synthetic-logs-data.ts
 */
export const syntheticLogs: LogEntry[] = [
  // OK status - successful workflow completion
  {
    status: 'ok',
    persona: 'coordinator',
    workflowId: 'wf-2026-03-08-001',
    intent: 'initiate multi-agent workflow',
    timestamp: '2026-03-08T14:00:00.000Z',
    durationMs: 1250,
  },
  {
    status: 'ok',
    persona: 'lead-engineer',
    workflowId: 'wf-2026-03-08-002',
    intent: 'architect solution design',
    timestamp: '2026-03-08T14:01:00.000Z',
    durationMs: 980,
  },
  {
    status: 'ok',
    persona: 'context',
    workflowId: 'wf-2026-03-08-003',
    intent: 'gather repository context',
    timestamp: '2026-03-08T14:02:00.000Z',
    durationMs: 2100,
  },
  // Flaky status - intermittent failures
  {
    status: 'flaky',
    persona: 'qa',
    workflowId: 'wf-2026-03-08-004',
    intent: 'validate output quality',
    timestamp: '2026-03-08T14:03:00.000Z',
    durationMs: 3500,
    error: 'Intermittent validation timeout',
  },
  {
    status: 'flaky',
    persona: 'security',
    workflowId: 'wf-2026-03-08-005',
    intent: 'scan for vulnerabilities',
    timestamp: '2026-03-08T14:04:00.000Z',
    durationMs: 4200,
    error: 'Network instability during scan',
  },
  // Fail status - definitive failures
  {
    status: 'fail',
    persona: 'coordinator',
    workflowId: 'wf-2026-03-08-006',
    intent: 'orchestrate agent responses',
    timestamp: '2026-03-08T14:05:00.000Z',
    durationMs: 500,
    error: 'Agent timeout exceeded max retries',
  },
  {
    status: 'fail',
    persona: 'lead-engineer',
    workflowId: 'wf-2026-03-08-007',
    intent: 'generate code implementation',
    timestamp: '2026-03-08T14:06:00.000Z',
    durationMs: 0,
    error: 'Invalid syntax in generated code',
  },
  // Timeout status - exceeded time limits
  {
    status: 'timeout',
    persona: 'context',
    workflowId: 'wf-2026-03-08-008',
    intent: 'fetch external documentation',
    timestamp: '2026-03-08T14:07:00.000Z',
    durationMs: 30000,
    error: 'Request exceeded 30s timeout',
  },
  {
    status: 'timeout',
    persona: 'security',
    workflowId: 'wf-2026-03-08-009',
    intent: 'perform deep dependency analysis',
    timestamp: '2026-03-08T14:08:00.000Z',
    durationMs: 30000,
    error: 'Analysis exceeded configured timeout',
  },
];

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
