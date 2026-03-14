import type { Config } from './schema';
import type { LogEvent } from '../types/logEvent';

export interface RetentionMetrics {
  retentionActionsCount: number;
  bytesFreed: number;
  eventsRemoved: number;
}

export class RetentionEngine {
  private config: Config;
  private metrics: RetentionMetrics = {
    retentionActionsCount: 0,
    bytesFreed: 0,
    eventsRemoved: 0,
  };

  constructor(config: Config) {
    this.config = config;
  }

  enforceRetention(events: LogEvent[]): LogEvent[] {
    const now = Date.now();
    let filteredEvents = [...events];

    // Time-based retention
    if (this.config.retentionDays > 0) {
      const cutoffTime = now - this.config.retentionDays * 24 * 60 * 60 * 1000;
      filteredEvents = filteredEvents.filter(
        (event) => event.timestamp >= cutoffTime,
      );
    }

    // TTL-based retention
    if (this.config.ttlSeconds && this.config.ttlSeconds > 0) {
      const ttlCutoff = now - this.config.ttlSeconds * 1000;
      filteredEvents = filteredEvents.filter(
        (event) => event.timestamp >= ttlCutoff,
      );
    }

    // Size-based retention: maxBytes
    if (this.config.maxBytes && this.config.maxBytes > 0) {
      const totalSize = JSON.stringify(filteredEvents).length;
      if (totalSize > this.config.maxBytes) {
        filteredEvents = this.enforceMaxBytes(filteredEvents);
      }
    }

    // Size-based retention: maxEvents
    if (this.config.maxEvents && this.config.maxEvents > 0) {
      if (filteredEvents.length > this.config.maxEvents) {
        filteredEvents = this.enforceMaxEvents(filteredEvents);
      }
    }

    return filteredEvents;
  }

  private enforceMaxBytes(events: LogEvent[]): LogEvent[] {
    const sorted = [...events].sort((a, b) => a.timestamp - b.timestamp);
    let currentSize = 0;
    const result: LogEvent[] = [];

    for (const event of sorted.reverse()) {
      const size = JSON.stringify(event).length;
      if (currentSize + size <= this.config.maxBytes!) {
        result.unshift(event);
        currentSize += size;
      } else {
        this.metrics.bytesFreed += size;
        this.metrics.eventsRemoved++;
      }
    }

    return result;
  }

  private enforceMaxEvents(events: LogEvent[]): LogEvent[] {
    const sorted = [...events].sort((a, b) => a.timestamp - b.timestamp);
    const removedCount = events.length - this.config.maxEvents!;
    const result = sorted.slice(-this.config.maxEvents!);

    for (let i = 0; i < removedCount; i++) {
      this.metrics.eventsRemoved++;
    }

    return result;
  }

  getMetrics(): RetentionMetrics {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.metrics = {
      retentionActionsCount: 0,
      bytesFreed: 0,
      eventsRemoved: 0,
    };
  }
}