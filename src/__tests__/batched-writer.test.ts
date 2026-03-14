import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BatchWriter } from '../utils/batched-writer';
import type { LogEvent } from '../types/logEvent';

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
      { id: '1', timestamp: Date.now(), type: 'test' },
      { id: '2', timestamp: Date.now(), type: 'test' },
      { id: '3', timestamp: Date.now(), type: 'test' },
    ];

    await Promise.all(events.map((e) => writer.write(e)));

    expect(mockFlushCallback).toHaveBeenCalledTimes(1);
  });

  it('should flush after interval when batch not full', async () => {
    const event: LogEvent = { id: '1', timestamp: Date.now(), type: 'test' };

    await writer.write(event);

    // Wait for flush interval
    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(mockFlushCallback).toHaveBeenCalledTimes(1);
  });

  it('should track write latency metrics', async () => {
    const event: LogEvent = { id: '1', timestamp: Date.now(), type: 'test' };

    await writer.write(event);

    const metrics = writer.getMetrics();
    expect(metrics.totalWrites).toBe(1);
    expect(metrics.writeLatencyMs.length).toBe(1);
  });

  it('should reset metrics correctly', async () => {
    const event: LogEvent = { id: '1', timestamp: Date.now(), type: 'test' };

    await writer.write(event);
    writer.resetMetrics();

    const metrics = writer.getMetrics();
    expect(metrics.totalWrites).toBe(0);
    expect(metrics.flushCount).toBe(0);
  });
});