/**
 * LogEvent schema for Multi-Agent Log Summarizer
 * Captures structured log events from agent workflows
 */

export type LogEventType = 
  | 'worker_ready'
  | 'request_started'
  | 'git_op'
  | 'persona_response'
  | 'persona_apply'
  | 'persona_completed'
  | 'unknown';

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
  preview?: string;
  raw?: string;
  json?: Record<string, unknown>;
  paths?: string[];
  source?: string;
  hash?: string;
}

export interface RawLogMessage {
  [key: string]: unknown;
}

export interface LogEventMapping {
  type: LogEventType;
  event: LogEvent;
}

export const LOG_EVENT_TYPES: LogEventType[] = [
  'worker_ready',
  'request_started',
  'git_op',
  'persona_response',
  'persona_apply',
  'persona_completed',
  'unknown'
];

export const LOG_EVENT_TYPE_NAMES: Record<LogEventType, string> = {
  worker_ready: 'Worker Ready',
  request_started: 'Request Started',
  git_op: 'Git Operation',
  persona_response: 'Persona Response',
  persona_apply: 'Persona Apply',
  persona_completed: 'Persona Completed',
  unknown: 'Unknown'
};