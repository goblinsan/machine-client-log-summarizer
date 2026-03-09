# Plan: Sample Data Packs for Multi-Agent Log Summarizer

## Overview

Create small synthetic log runs that reflect the agent workflow fields (persona, workflowId, intent). These will be used for demos, tests, and documentation.

## Required Files

These files must exist in the diff:

- `src/config/synthetic-logs-data.ts` - Contains synthetic log data definitions
- `src/config/synthetic-logs.ts` - Contains synthetic log generation logic
- `src/types/logEvent.ts` - Contains log event type definitions
- `src/__tests__/synthetic-logs-data.test.ts` - Contains tests for synthetic log data

## Implementation Steps

### Step 1: Create Type Definitions

Create `src/types/logEvent.ts` with the following structure:

```typescript
export interface LogEvent {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  persona?: string;
  workflowId?: string;
  intent?: string;
  duration?: number;
  status?: 'ok' | 'fail' | 'timeout' | 'flaky';
  metadata?: Record<string, unknown>;
}

export type LogRun = LogEvent[];

export type LogRunType = 'ok' | 'fail' | 'timeout' | 'flaky';
```

### Step 2: Create Synthetic Logs Data

Create `src/config/synthetic-logs-data.ts` with predefined log runs:

```typescript
import { LogRun, LogRunType } from '../types/logEvent';

export const syntheticLogRuns: Record<LogRunType, LogRun> = {
  ok: [
    {
      timestamp: '2026-03-09T14:54:40.000Z',
      level: 'info',
      message: 'Workflow completed successfully',
      persona: 'coordinator',
      workflowId: 'wf-001',
      intent: 'summarize',
      duration: 1250,
      status: 'ok',
      metadata: { agentCount: 3, stepsCompleted: 5 }
    }
  ],
  fail: [
    {
      timestamp: '2026-03-09T14:54:40.000Z',
      level: 'error',
      message: 'Workflow failed: validation error',
      persona: 'lead-engineer',
      workflowId: 'wf-002',
      intent: 'validate',
      duration: 450,
      status: 'fail',
      metadata: { errorType: 'ValidationError', errorCode: 'E001' }
    }
  ],
  timeout: [
    {
      timestamp: '2026-03-09T14:54:40.000Z',
      level: 'warn',
      message: 'Workflow timed out after 30s',
      persona: 'coordinator',
      workflowId: 'wf-003',
      intent: 'execute',
      duration: 30000,
      status: 'timeout',
      metadata: { timeoutThreshold: 30000 }
    }
  ],
  flaky: [
    {
      timestamp: '2026-03-09T14:54:40.000Z',
      level: 'warn',
      message: 'Workflow completed with intermittent failures',
      persona: 'qa',
      workflowId: 'wf-004',
      intent: 'test',
      duration: 2100,
      status: 'flaky',
      metadata: { retryCount: 3, successRate: 0.66 }
    }
  ]
};
```

### Step 3: Create Synthetic Logs Generator

Create `src/config/synthetic-logs.ts` with generation logic:

```typescript
import { LogRun, LogRunType } from '../types/logEvent';
import { syntheticLogRuns } from './synthetic-logs-data';

export function getSyntheticLogRun(type: LogRunType): LogRun {
  return syntheticLogRuns[type];
}

export function getAllSyntheticLogRuns(): Record<LogRunType, LogRun> {
  return syntheticLogRuns;
}

export function getRandomSyntheticLogRun(): LogRun {
  const types: LogRunType[] = ['ok', 'fail', 'timeout', 'flaky'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  return getSyntheticLogRun(randomType);
}

export function generateSyntheticLogRun(
  type: LogRunType,
  customData?: Partial<LogRun>
): LogRun {
  const baseRun = getSyntheticLogRun(type);
  return customData ? baseRun.map((event, i) => ({
    ...event,
    ...customData,
    timestamp: event.timestamp
  })) : baseRun;
}
```

### Step 4: Create Tests

Create `src/__tests__/synthetic-logs-data.test.ts` with comprehensive tests:

```typescript
import { describe, it, expect } from 'vitest';
import { syntheticLogRuns } from '../config/synthetic-logs-data';
import { getSyntheticLogRun, getAllSyntheticLogRuns, getRandomSyntheticLogRun } from '../config/synthetic-logs';
import { LogRunType } from '../types/logEvent';

describe('synthetic-logs-data', () => {
  it('should have all log run types', () => {
    const types: LogRunType[] = ['ok', 'fail', 'timeout', 'flaky'];
    types.forEach(type => {
      expect(syntheticLogRuns[type]).toBeDefined();
      expect(Array.isArray(syntheticLogRuns[type])).toBe(true);
    });
  });

  it('should have correct structure for ok run', () => {
    const okRun = syntheticLogRuns.ok;
    expect(okRun.length).toBeGreaterThan(0);
    expect(okRun[0].status).toBe('ok');
    expect(okRun[0].level).toBe('info');
  });

  it('should have correct structure for fail run', () => {
    const failRun = syntheticLogRuns.fail;
    expect(failRun.length).toBeGreaterThan(0);
    expect(failRun[0].status).toBe('fail');
    expect(failRun[0].level).toBe('error');
  });

  it('should have correct structure for timeout run', () => {
    const timeoutRun = syntheticLogRuns.timeout;
    expect(timeoutRun.length).toBeGreaterThan(0);
    expect(timeoutRun[0].status).toBe('timeout');
    expect(timeoutRun[0].level).toBe('warn');
  });

  it('should have correct structure for flaky run', () => {
    const flakyRun = syntheticLogRuns.flaky;
    expect(flakyRun.length).toBeGreaterThan(0);
    expect(flakyRun[0].status).toBe('flaky');
    expect(flakyRun[0].level).toBe('warn');
  });

  it('should get synthetic log run by type', () => {
    const okRun = getSyntheticLogRun('ok');
    expect(okRun.length).toBeGreaterThan(0);
    expect(okRun[0].status).toBe('ok');
  });

  it('should get all synthetic log runs', () => {
    const allRuns = getAllSyntheticLogRuns();
    expect(allRuns).toHaveProperty('ok');
    expect(allRuns).toHaveProperty('fail');
    expect(allRuns).toHaveProperty('timeout');
    expect(allRuns).toHaveProperty('flaky');
  });

  it('should get random synthetic log run', () => {
    const randomRun = getRandomSyntheticLogRun();
    expect(randomRun.length).toBeGreaterThan(0);
    expect(['ok', 'fail', 'timeout', 'flaky'].includes(randomRun[0].status)).toBe(true);
  });
});
```

## Validation

After implementation, run:

```bash
npm run test
```

Expected: All tests pass

## Notes

- Keep files minimal and focused
- Ensure all required files exist in the diff
- Do not modify .git/ or any git internals
