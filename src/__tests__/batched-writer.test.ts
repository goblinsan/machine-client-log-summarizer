import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BatchWriter } from '../utils/batched-writer';
import type { LogEvent, LogEventType } from '../types/logEvent';

describe('BatchWriter', () => {
  let writer: BatchWriter;
  const mockFlushCallback = vi.fn();

  beforeEach(() => {
    writer = new BatchWriter({ batchSize: 3, flushIntervalMs: 100 });
    writer.setOnFlushCallback(mockFlushCallback);
  });

  afterEach(() => {
    mockFlushCallback.mockClear();
  });

  it('should flush when batch is full', async () => {
    const events: LogEvent[] = [
      { ts: '2024-01-01T00:00:00.000Z', level: 'info' as const, type: 'log' },
      { ts: '2024-01-01T00:00:01.000Z', level: 'info' as const, type: 'log' },
      { ts: '2024-01-01T00:00:02.000Z', level: 'info' as const, type: 'log' },
    ];

    await Promise.all(events.map((e) => writer.write(e)));

    expect(mockFlushCallback).toHaveBeenCalledTimes(1);
  });

  it('should flush after interval when batch not full', async () => {
    const event: LogEvent = { ts: '2024-01-01T00:00:00.000Z', level: 'info' as const, type: 'log' };

    await writer.write(event);

    // Wait for flush interval
    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(mockFlushCallback).toHaveBeenCalledTimes(1);
  });

  it('should track write latency metrics', async () => {
    const event: LogEvent = { ts: '2024-01-01T00:00:00.000Z', level: 'info' as const, type: 'log' };

    await writer.write(event);

    const metrics = writer.getMetrics();
    expect(metrics.totalWrites).toBe(1);
    expect(metrics.writeLatencyMs.length).toBe(1);
  });

  it('should reset metrics correctly', async () => {
    const event: LogEvent = { ts: '2024-01-01T00:00:00.000Z', level: 'info' as const, type: 'log' };

    await writer.write(event);
    writer.resetMetrics();

    const metrics = writer.getMetrics();
    expect(metrics.totalWrites).toBe(0);
    expect(metrics.flushCount).toBe(0);
  });
});
