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
      { ts: '2024-01-01T00:00:00Z', level: 'info', type: 'log' },
      { ts: '2024-01-08T00:00:00Z', level: 'info', type: 'log' },
    ];

    const result = engine.enforceRetention(events);
    expect(result.length).toBe(1);
    expect(result[0].ts).toBe('2024-01-08T00:00:00Z');
  });

  it('should enforce TTL-based retention', () => {
    const now = Date.now();
    const events: LogEvent[] = [
      { ts: '2024-01-01T00:00:00Z', level: 'info', type: 'log' },
      { ts: '2024-01-08T00:00:00Z', level: 'info', type: 'log' },
    ];

    const config: Config = { ...baseConfig, ttlSeconds: 60 } as Config;
    engine = new RetentionEngine(config);

    const result = engine.enforceRetention(events);
    expect(result.length).toBe(1);
    expect(result[0].ts).toBe('2024-01-08T00:00:00Z');
  });

  it('should enforce maxEvents retention', () => {
    const now = Date.now();
    const events: LogEvent[] = Array.from({ length: 5 }, (_, i) => ({
      ts: `2024-01-${(i + 1).toString().padStart(2, '0')}`,
      level: 'info',
      type: 'log' as const,
    }));

    const config: Config = { ...baseConfig, maxEvents: 3 } as Config;
    engine = new RetentionEngine(config);

    const result = engine.enforceRetention(events);
    expect(result.length).toBe(3);
    // Verify the newest 3 events are kept (sorted by timestamp)
    expect(result[0].ts).toBe('2024-01-03');
  });

  it('should track metrics correctly', () => {
    const now = Date.now();
    const events: LogEvent[] = Array.from({ length: 10 }, (_, i) => ({
      ts: `2024-01-${(i + 1).toString().padStart(2, '0')}`,
      level: 'info',
      type: 'log' as const,
    }));

    const config: Config = { ...baseConfig, maxEvents: 5 } as Config;
    engine = new RetentionEngine(config);

    engine.enforceRetention(events);
    const metrics = engine.getMetrics();

    expect(metrics.eventsRemoved).toBe(5);
    expect(metrics.retentionActionsCount).toBeGreaterThan(0);
  });
});
