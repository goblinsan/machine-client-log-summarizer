/**
 * LogEvent schema for multi-agent log summarizer
 * Captures all required fields for log event normalization
 */
export interface LogEvent {
  ts: string;              // Timestamp of the event
  level: string;           // Log level (info, warn, error, debug)
  persona?: string;        // Agent persona name
  workflowId?: string;     // Workflow identifier
  intent?: string;         // User intent or action
  repo?: string;           // Repository name
  branch?: string;         // Git branch
  projectId?: string;      // Project identifier
  corrId?: string;         // Correlation ID for tracing
  duration_ms?: number;    // Duration in milliseconds
  preview?: string | object; // Raw or parsed preview text
  paths?: string[];        // File paths involved
  source?: string;         // Event source
  hash?: string;           // Hash for deduplication
}

export type LogEventType = 
  | 'worker_ready'
  | 'request_started'
  | 'git_op'
  | 'persona_response'
  | 'persona_apply'
  | 'persona_completed'
  | 'unknown';

/**
 * Known event types for classification
 */
export type LogEventType =
  | 'worker_ready'
  | 'request_started'
  | 'git_op'
  | 'persona_response'
  | 'persona_apply'
  | 'persona_completed'
  | 'unknown';

/**
 * Raw log message structure before normalization
 */
export interface RawLogMessage {
  [key: string]: unknown;
}
  source?: string;
  hash?: string;
}

/**
 * Known event types for classification
 */
export type LogEventType =
  | 'worker_ready'
  | 'request_started'
  | 'git_op'
  | 'persona_response'
  | 'persona_apply'
  | 'persona_completed'
  | 'unknown';

/**
 * Raw log message structure before normalization
 */
export interface RawLogMessage {
  [key: string]: unknown;
}
  | 'request_started'
  | 'git_op'
  | 'persona_response'
  | 'persona_apply'
  | 'persona_completed'
  | 'unknown';

/**
 * Raw log message structure before normalization
 */
export interface RawLogMessage {
  [key: string]: unknown;
}


