// Synthetic log data packs for demos, tests, and docs
import { SyntheticLogSchema } from './synthetic-logs';

const okScenario: SyntheticLogSchema = {
  persona: 'lead-engineer',
  workflowId: 'wf-001-ok',
  intent: 'summarize-success',
  status: 'ok',
  timestamp: new Date().toISOString(),
};

const flakyScenario: SyntheticLogSchema = {
  persona: 'qa',
  workflowId: 'wf-002-flaky',
  intent: 'investigate-retry',
  status: 'flaky',
  timestamp: new Date().toISOString(),
};

const failScenario: SyntheticLogSchema = {
  persona: 'security',
  workflowId: 'wf-003-fail',
  intent: 'analyze-failure',
  status: 'fail',
  timestamp: new Date().toISOString(),
};

const timeoutScenario: SyntheticLogSchema = {
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

// Validate all scenarios
const validateAll = () => {
  Object.entries(syntheticLogsData).forEach(([key, log]) => {
    SyntheticLogSchema.parse(log);
  });
};

validateAll();