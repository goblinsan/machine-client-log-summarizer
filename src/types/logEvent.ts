/**
 * Event store schemas for multi-agent log summarizer
 * Captures all required fields for log event normalization
 */
export interface LogEvent {
  ts: string;              // Timestamp of the event
  level: string;           // Log level (info, warn, error, debug)
  persona?: string;        // Agent persona name
  workflow_id?: string;    // Workflow identifier for grouping events
  projectId?: string;      // Project identifier
  corrId?: string;         // Correlation ID for tracing
  hash?: string;           // Hash for deduplication
  type: LogEventType;      // Event type classification
}

/**
 * Event metadata schema for additional event information
 */
export interface EventMeta {
  event_id: string;        // Unique event identifier
  workflow_id: string;     // Workflow this event belongs to
  persona?: string;        // Agent persona that generated the event
  type: LogEventType;      // Event type classification
  ts: string;              // Timestamp of the event
  metadata?: Record<string, unknown>; // Additional flexible metadata
}

/**
 * Event store schema combining events and metadata
 */
export interface EventStoreSchema {
  events: LogEvent[];      // Main events collection
  event_meta: EventMeta[]; // Metadata collection
}

export type LogEventType = 'log' | 'metric' | 'alert' | 'trace';

/**
 * Index definitions for event store queries
 */
export interface EventStoreIndex {
  name: string;            // Index name
  fields: (keyof LogEvent | keyof EventMeta)[]; // Indexed fields
  composite?: boolean;     // Whether this is a composite index
}


