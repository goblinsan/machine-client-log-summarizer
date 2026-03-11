/**
 * LogEvent schema for normalized log messages
 */
export interface LogEvent {
  ts: string;
  level: string;
  persona?: string;
  workflowId?: string;
  intent?: string;
  repo?: string;
  branch?: string;
  projectId?: string;
  corrId?: string;
  duration_ms?: number;
  preview?: string | object;
  paths?: string[];
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