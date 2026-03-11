import { z } from 'zod';

export const SyntheticLogSchema = z.object({
  status: z.enum(['ok', 'flaky', 'fail', 'timeout']),
  persona: z.string(),
  workflowId: z.string(),
  intent: z.string(),
  timestamp: z.string(),
  durationMs: z.number().optional(),
  error: z.string().optional(),
});

export type LogEntry = z.infer<typeof SyntheticLogSchema>;

export const syntheticLogs: LogEntry[] = [
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

export const logsByStatus = {
  ok: syntheticLogs.filter((l) => l.status === 'ok'),
  flaky: syntheticLogs.filter((l) => l.status === 'flaky'),
  fail: syntheticLogs.filter((l) => l.status === 'fail'),
  timeout: syntheticLogs.filter((l) => l.status === 'timeout'),
};

export const personas = Array.from(
  new Set(syntheticLogs.map((l) => l.persona))
);

export const workflowIds = syntheticLogs.map((l) => l.workflowId);
export const intents = syntheticLogs.map((l) => l.intent);
export const totalCount = syntheticLogs.length;

export const timestampRange = {
  start: syntheticLogs[0].timestamp,
  end: syntheticLogs[syntheticLogs.length - 1].timestamp,
};
