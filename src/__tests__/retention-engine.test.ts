import { describe, it, expect, beforeEach } from 'vitest';
import { RetentionEngine } from '../config/retention-engine';
import type { Config } from '../config/schema';
import type { LogEvent } from '../types/logEvent';

describe('RetentionEngine', () => {
  let engine: RetentionEngine;
  const baseConfig: Partial<Config> = {
    retentionDays: 30,
    ttlSeconds: undefined,
    maxBytes: undefined,
    maxEvents: undefined,
  };

  beforeEach(() => {
    engine = new RetentionEngine(baseConfig as Config);
  });

  it('should enforce time-based retention', () => {
    const now = Date.now();
    const events: LogEvent[] = [
      { id: '1', timestamp: now - 35 * 24 * 60 * 60 * 1000, type: 'test' },
      { id: '2', timestamp: now - 25 * 24 * 60 * 60 * 1000, type: 'test' },
    ];

    const result = engine.enforceRetention(events);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });

  it('should enforce TTL-based retention', () => {
    const now = Date.now();
    const events: LogEvent[] = [
      { id: '1', timestamp: now - 61 * 1000, type: 'test' },
      { id: '2', timestamp: now - 30 * 1000, type: 'test' },
    ];

    const config: Config = { ...baseConfig, ttlSeconds: 60 } as Config;
    engine = new RetentionEngine(config);

    const result = engine.enforceRetention(events);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });

  it('should enforce maxEvents retention', () => {
    const now = Date.now();
    const events: LogEvent[] = Array.from({ length: 5 }, (_, i) => ({
      id: `${i}`,
      timestamp: now - i * 1000,
      type: 'test',
    }));

    const config: Config = { ...baseConfig, maxEvents: 3 } as Config;
    engine = new RetentionEngine(config);

    const result = engine.enforceRetention(events);
    expect(result.length).toBe(3);
    expect(result[0].id).toBe('2'); // Keep newest 3
  });

  it('should track metrics correctly', () => {
    const now = Date.now();
    const events: LogEvent[] = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      timestamp: now - i * 1000,
      type: 'test',
    }));

    const config: Config = { ...baseConfig, maxEvents: 5 } as Config;
    engine = new RetentionEngine(config);

    engine.enforceRetention(events);
    const metrics = engine.getMetrics();

    expect(metrics.eventsRemoved).toBe(5);
    expect(metrics.retentionActionsCount).toBeGreaterThan(0);
  });
});