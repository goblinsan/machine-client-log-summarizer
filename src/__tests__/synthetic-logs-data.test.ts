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
});