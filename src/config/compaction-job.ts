import type { Config } from './schema';
import type { LogEvent } from '../types/logEvent';
import { RetentionEngine, type RetentionMetrics } from './retention-engine';

export interface CompactionMetrics {
  compactionRunsCount: number;
  avgDurationMs: number;
}

export class CompactionJob {
  private config: Config;
  private jobEnabled: boolean;
  private schedule?: string;
  private timerId: NodeJS.Timeout | null = null;
  private metrics: CompactionMetrics = {
    compactionRunsCount: 0,
    avgDurationMs: 0,
  };
  private durations: number[] = [];
  private onCompactCallback?: (events: LogEvent[]) => Promise<LogEvent[]>;

  constructor(config: Config) {
    this.config = config;
    this.jobEnabled = config.enableCompaction ?? false;
    this.schedule = config.compactionSchedule;
  }

  setOnCompactCallback(callback: (events: LogEvent[]) => Promise<LogEvent[]>): void {
    this.onCompactCallback = callback;
  }

  start(): void {
    if (!this.jobEnabled) return;

    // Simple cron-like scheduling (disabled by default for safety)
    // In production, use a proper cron library like node-cron
    this.timerId = setInterval(() => this.run(), 60 * 60 * 1000); // Default: hourly if enabled
  }

  stop(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private async run(): Promise<void> {
    const startTime = Date.now();

    try {
      if (!this.onCompactCallback) return;

      // Run compaction logic here
      await this.onCompactCallback([]);

      const duration = Date.now() - startTime;
      this.durations.push(duration);
      this.metrics.compactionRunsCount++;
      this.metrics.avgDurationMs =
        this.durations.reduce((a, b) => a + b, 0) / this.durations.length;
    } catch (error) {
      console.error('Compaction job failed:', error);
    }
  }

  getMetrics(): CompactionMetrics {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.metrics = { compactionRunsCount: 0, avgDurationMs: 0 };
    this.durations = [];
  }
}