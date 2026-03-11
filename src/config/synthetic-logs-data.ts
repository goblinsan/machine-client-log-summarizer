import { SyntheticLogSchema, type LogEntry } from './synthetic-logs';

const okScenario: LogEntry = {
  persona: 'lead-engineer',
  workflowId: 'wf-001-ok',
  intent: 'summarize-success',
  status: 'ok',
  timestamp: new Date().toISOString(),
};

const flakyScenario: LogEntry = {
  persona: 'qa',
  workflowId: 'wf-002-flaky',
  intent: 'investigate-retry',
  status: 'flaky',
  timestamp: new Date().toISOString(),
};

const failScenario: LogEntry = {
  persona: 'security',
  workflowId: 'wf-003-fail',
  intent: 'analyze-failure',
  status: 'fail',
  timestamp: new Date().toISOString(),
};

const timeoutScenario: LogEntry = {
  persona: 'coordinator',
  workflowId: 'wf-004-timeout',
  intent: 'handle-timeout',
  status: 'timeout',
  timestamp: new Date().toISOString(),
};

export const syntheticLogsData = {
  ok: okScenario,
  flaky: flakyScenario,
  fail: failScenario,
  timeout: timeoutScenario,
};

const validateAll = () => {
  Object.entries(syntheticLogsData).forEach(([_key, log]) => {
    SyntheticLogSchema.parse(log);
  });
};

validateAll();
