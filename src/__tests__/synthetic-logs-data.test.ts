import { describe, it, expect } from 'vitest';
import { syntheticLogsData } from '../config/synthetic-logs-data';

describe('syntheticLogsData', () => {
  it('should export all four scenario types', () => {
    expect(syntheticLogsData).toHaveProperty('ok');
    expect(syntheticLogsData).toHaveProperty('flaky');
    expect(syntheticLogsData).toHaveProperty('fail');
    expect(syntheticLogsData).toHaveProperty('timeout');
  });

  it('should have correct status for each scenario', () => {
    expect(syntheticLogsData.ok.status).toBe('ok');
    expect(syntheticLogsData.flaky.status).toBe('flaky');
    expect(syntheticLogsData.fail.status).toBe('fail');
    expect(syntheticLogsData.timeout.status).toBe('timeout');
  });

  it('should have persona, workflowId, and intent fields', () => {
    const { ok, flaky, fail, timeout } = syntheticLogsData;
    expect(ok).toHaveProperty('persona');
    expect(ok).toHaveProperty('workflowId');
    expect(ok).toHaveProperty('intent');
    expect(flaky).toHaveProperty('persona');
    expect(flaky).toHaveProperty('workflowId');
    expect(flaky).toHaveProperty('intent');
    expect(fail).toHaveProperty('persona');
    expect(fail).toHaveProperty('workflowId');
    expect(fail).toHaveProperty('intent');
    expect(timeout).toHaveProperty('persona');
    expect(timeout).toHaveProperty('workflowId');
    expect(timeout).toHaveProperty('intent');
  });

  it('should have valid timestamp in ISO format for each scenario', () => {
    const { ok, flaky, fail, timeout } = syntheticLogsData;
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    expect(ok.timestamp).toMatch(isoRegex);
    expect(flaky.timestamp).toMatch(isoRegex);
    expect(fail.timestamp).toMatch(isoRegex);
    expect(timeout.timestamp).toMatch(isoRegex);
  });

  it('should have correct persona assignments for each scenario', () => {
    expect(syntheticLogsData.ok.persona).toBe('lead-engineer');
    expect(syntheticLogsData.flaky.persona).toBe('qa');
    expect(syntheticLogsData.fail.persona).toBe('security');
    expect(syntheticLogsData.timeout.persona).toBe('coordinator');
  });

  it('should have correct workflowId format for each scenario', () => {
    expect(syntheticLogsData.ok.workflowId).toBe('wf-001-ok');
    expect(syntheticLogsData.flaky.workflowId).toBe('wf-002-flaky');
    expect(syntheticLogsData.fail.workflowId).toBe('wf-003-fail');
    expect(syntheticLogsData.timeout.workflowId).toBe('wf-004-timeout');
  });

  it('should have correct intent values for each scenario', () => {
    expect(syntheticLogsData.ok.intent).toBe('summarize-success');
    expect(syntheticLogsData.flaky.intent).toBe('investigate-retry');
    expect(syntheticLogsData.fail.intent).toBe('analyze-failure');
    expect(syntheticLogsData.timeout.intent).toBe('handle-timeout');
  });

});
