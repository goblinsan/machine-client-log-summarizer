import { SyntheticLogSchema, type LogEntry } from '../synthetic-logs';

/**
 * Curated synthetic log runs for demos, tests, and documentation.
 * Each status type (ok, flaky, fail, timeout) has 5-10 deterministic entries
 * reflecting agent workflow fields: persona, workflowId, intent.
 */

const okEntries: LogEntry[] = [
  {
    status: 'ok',
    persona: 'coordinator',
    workflowId: 'wf-2026-03-11-001',
    intent: 'initiate multi-agent workflow',
    timestamp: '2026-03-11T14:00:00.000Z',
    durationMs: 1250,
  },
  {
    status: 'ok',
    persona: 'lead-engineer',
    workflowId: 'wf-2026-03-11-002',
    intent: 'architect solution design',
    timestamp: '2026-03-11T14:01:00.000Z',
    durationMs: 980,
  },
  {
    status: 'ok',
    persona: 'context',
    workflowId: 'wf-2026-03-11-003',
    intent: 'gather repository context',
    timestamp: '2026-03-11T14:02:00.000Z',
    durationMs: 2100,
  },
  {
    status: 'ok',
    persona: 'qa',
    workflowId: 'wf-2026-03-11-004',
    intent: 'validate output quality',
    timestamp: '2026-03-11T14:03:00.000Z',
    durationMs: 1800,
  },
  {
    status: 'ok',
    persona: 'security',
    workflowId: 'wf-2026-03-11-005',
    intent: 'scan for vulnerabilities',
    timestamp: '2026-03-11T14:04:00.000Z',
    durationMs: 2500,
  },
];

const flakyEntries: LogEntry[] = [
  {
    status: 'flaky',
    persona: 'qa',
    workflowId: 'wf-2026-03-11-006',
    intent: 'validate output quality',
    timestamp: '2026-03-11T14:05:00.000Z',
    durationMs: 3500,
    error: 'Intermittent validation timeout',
  },
  {
    status: 'flaky',
    persona: 'security',
    workflowId: 'wf-2026-03-11-007',
    intent: 'scan for vulnerabilities',
    timestamp: '2026-03-11T14:06:00.000Z',
    durationMs: 4200,
    error: 'Network instability during scan',
  },
  {
    status: 'flaky',
    persona: 'lead-engineer',
    workflowId: 'wf-2026-03-11-008',
    intent: 'generate code implementation',
    timestamp: '2026-03-11T14:07:00.000Z',
    durationMs: 2800,
    error: 'Race condition in code generation',
  },
  {
    status: 'flaky',
    persona: 'coordinator',
    workflowId: 'wf-2026-03-11-009',
    intent: 'orchestrate agent responses',
    timestamp: '2026-03-11T14:08:00.000Z',
    durationMs: 3100,
    error: 'Agent heartbeat lost temporarily',
  },
  {
    status: 'flaky',
    persona: 'context',
    workflowId: 'wf-2026-03-11-010',
    intent: 'fetch external documentation',
    timestamp: '2026-03-11T14:09:00.000Z',
    durationMs: 2900,
    error: 'Temporary DNS resolution failure',
  },
];

const failEntries: LogEntry[] = [
  {
    status: 'fail',
    persona: 'coordinator',
    workflowId: 'wf-2026-03-11-011',
    intent: 'orchestrate agent responses',
    timestamp: '2026-03-11T14:10:00.000Z',
    durationMs: 500,
    error: 'Agent timeout exceeded max retries',
  },
  {
    status: 'fail',
    persona: 'lead-engineer',
    workflowId: 'wf-2026-03-11-012',
    intent: 'generate code implementation',
    timestamp: '2026-03-11T14:11:00.000Z',
    durationMs: 0,
    error: 'Invalid syntax in generated code',
  },
  {
    status: 'fail',
    persona: 'qa',
    workflowId: 'wf-2026-03-11-013',
    intent: 'validate output quality',
    timestamp: '2026-03-11T14:12:00.000Z',
    durationMs: 1500,
    error: 'Validation schema mismatch',
  },
  {
    status: 'fail',
    persona: 'security',
    workflowId: 'wf-2026-03-11-014',
    intent: 'scan for vulnerabilities',
    timestamp: '2026-03-11T14:13:00.000Z',
    durationMs: 2200,
    error: 'Critical vulnerability detected',
  },
  {
    status: 'fail',
    persona: 'context',
    workflowId: 'wf-2026-03-11-015',
    intent: 'gather repository context',
    timestamp: '2026-03-11T14:14:00.000Z',
    durationMs: 1800,
    error: 'Repository access denied',
  },
];

const timeoutEntries: LogEntry[] = [
  {
    status: 'timeout',
    persona: 'context',
    workflowId: 'wf-2026-03-11-016',
    intent: 'fetch external documentation',
    timestamp: '2026-03-11T14:15:00.000Z',
    durationMs: 30000,
    error: 'Request exceeded 30s timeout',
  },
  {
    status: 'timeout',
    persona: 'security',
    workflowId: 'wf-2026-03-11-017',
    intent: 'perform deep dependency analysis',
    timestamp: '2026-03-11T14:16:00.000Z',
    durationMs: 30000,
    error: 'Analysis exceeded configured timeout',
  },
  {
    status: 'timeout',
    persona: 'lead-engineer',
    workflowId: 'wf-2026-03-11-018',
    intent: 'generate code implementation',
    timestamp: '2026-03-11T14:17:00.000Z',
    durationMs: 30000,
    error: 'Code generation exceeded time budget',
  },
  {
    status: 'timeout',
    persona: 'coordinator',
    workflowId: 'wf-2026-03-11-019',
    intent: 'orchestrate agent responses',
    timestamp: '2026-03-11T14:18:00.000Z',
    durationMs: 30000,
    error: 'Orchestration loop exceeded timeout',
  },
  {
    status: 'timeout',
    persona: 'qa',
    workflowId: 'wf-2026-03-11-020',
    intent: 'validate output quality',
    timestamp: '2026-03-11T14:19:00.000Z',
    durationMs: 30000,
    error: 'Validation pipeline exceeded timeout',
  },
];

export const syntheticLogRuns = {
  ok: okEntries,
  flaky: flakyEntries,
  fail: failEntries,
  timeout: timeoutEntries,
};

export const ok = okEntries;
export const flaky = flakyEntries;
export const fail = failEntries;
export const timeout = timeoutEntries;

export const allEntries = [
  ...okEntries,
  ...flakyEntries,
  ...failEntries,
  ...timeoutEntries,
];

export const totalCount = allEntries.length;

export const totalCountByStatus = {
  ok: okEntries.length,
  flaky: flakyEntries.length,
  fail: failEntries.length,
  timeout: timeoutEntries.length,
};

export const personas = Array.from(
  new Set(allEntries.map((l) => l.persona))
);

export const workflowIds = allEntries.map((l) => l.workflowId);
export const intents = allEntries.map((l) => l.intent);

export const timestampRange = {
  start: allEntries[0].timestamp,
  end: allEntries[allEntries.length - 1].timestamp,
};

// Validation
const validateAll = () => {
  Object.entries(syntheticLogRuns).forEach(([_key, logs]) => {
    logs.forEach((log) => {
      SyntheticLogSchema.parse(log);
    });
  });
};

validateAll();