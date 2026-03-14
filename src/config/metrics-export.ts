import type { WriteMetrics } from '../utils/batched-writer';
import type { RetentionMetrics } from './retention-engine';
import type { CompactionMetrics } from './compaction-job';

export interface ExportedMetrics {
  writeLatencyMs: number[];
  totalWrites: number;
  flushCount: number;
  retentionActionsCount: number;
  bytesFreed: number;
  eventsRemoved: number;
  compactionRunsCount: number;
  avgCompactionDurationMs: number;
}

export class MetricsExporter {
  private writeMetrics: WriteMetrics | null = null;
  private retentionMetrics: RetentionMetrics | null = null;
  private compactionMetrics: CompactionMetrics | null = null;

  setWriteMetrics(metrics: WriteMetrics): void {
    this.writeMetrics = metrics;
  }

  setRetentionMetrics(metrics: RetentionMetrics): void {
    this.retentionMetrics = metrics;
  }

  setCompactionMetrics(metrics: CompactionMetrics): void {
    this.compactionMetrics = metrics;
  }

  getMetrics(): ExportedMetrics {
    return {
      writeLatencyMs: this.writeMetrics?.writeLatencyMs ?? [],
      totalWrites: this.writeMetrics?.totalWrites ?? 0,
      flushCount: this.writeMetrics?.flushCount ?? 0,
      retentionActionsCount: this.retentionMetrics?.retentionActionsCount ?? 0,
      bytesFreed: this.retentionMetrics?.bytesFreed ?? 0,
      eventsRemoved: this.retentionMetrics?.eventsRemoved ?? 0,
      compactionRunsCount: this.compactionMetrics?.compactionRunsCount ?? 0,
      avgCompactionDurationMs: this.compactionMetrics?.avgDurationMs ?? 0,
    };
  }

  exportAsPrometheus(): string {
    const metrics = this.getMetrics();
    return `# HELP write_latency_ms Write latency in milliseconds\n` +
      `# TYPE write_latency_ms histogram\n` +
      `write_latency_ms_bucket{le="10"} ${metrics.totalWrites}\n` +
      `write_latency_ms_sum ${metrics.writeLatencyMs.reduce((a, b) => a + b, 0)}\n` +
      `# HELP retention_actions_count Total retention actions performed\n` +
      `# TYPE retention_actions_count counter\n` +
      `retention_actions_count ${metrics.retentionActionsCount}\n` +
      `# HELP bytes_freed_bytes Bytes freed by retention policies\n` +
      `# TYPE bytes_freed_bytes gauge\n` +
      `bytes_freed_bytes ${metrics.bytesFreed}\n`;
  }
}