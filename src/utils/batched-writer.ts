import type { LogEvent } from '../types/logEvent';

export interface WriteMetrics {
  writeLatencyMs: number[];
  totalWrites: number;
  flushCount: number;
}

export class BatchWriter {
  private queue: LogEvent[] = [];
  private batchSize: number;
  private flushIntervalMs: number;
  private timerId: NodeJS.Timeout | null = null;
  private metrics: WriteMetrics = {
    writeLatencyMs: [],
    totalWrites: 0,
    flushCount: 0,
  };
  private onFlushCallback?: (batch: LogEvent[]) => Promise<void>;

  constructor(options: { batchSize: number; flushIntervalMs: number }) {
    this.batchSize = options.batchSize;
    this.flushIntervalMs = options.flushIntervalMs;
  }

  setOnFlushCallback(callback: (batch: LogEvent[]) => Promise<void>): void {
    this.onFlushCallback = callback;
  }

  async write(event: LogEvent): Promise<void> {
    const startTime = Date.now();
    this.queue.push(event);
    this.metrics.totalWrites++;

    if (this.queue.length >= this.batchSize) {
      await this.flush();
    } else if (!this.timerId) {
      this.timerId = setTimeout(() => this.flush(), this.flushIntervalMs);
    }

    const latency = Date.now() - startTime;
    this.metrics.writeLatencyMs.push(latency);
  }

  private async flush(): Promise<void> {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.queue.length === 0 || !this.onFlushCallback) return;

    const batch = [...this.queue];
    this.queue = [];
    this.metrics.flushCount++;

    await this.onFlushCallback(batch);
  }

  getMetrics(): WriteMetrics {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.metrics = {
      writeLatencyMs: [],
      totalWrites: 0,
      flushCount: 0,
    };
  }
}