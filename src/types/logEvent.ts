/**
 * LogEvent schema for multi-agent log summarizer
 * Captures all required fields for log event normalization
 */
export interface LogEvent {
  ts: string;              // Timestamp of the event
  level: string;           // Log level (info, warn, error, debug)
  persona?: string;        // Agent persona name
  dedupHash?: string;      // Deduplication hash for idempotency
  projectId?: string;      // Project identifier
  corrId?: string;         // Correlation ID for tracing
  hash?: string;           // Hash for deduplication
  preview?: string | object; // Preview data (string or object)
  paths?: string[];        // File paths
  source?: string;         // Event source
  type?: LogEventType;     // Event type classification
  dedupHash?: string;      // Deduplication hash for idempotency
}

export type LogEventType =
