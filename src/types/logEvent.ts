/**
 * LogEvent schema for Multi-Agent Log Summarizer
 * Captures all required fields for log event normalization
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export type PersonaType = 'worker' | 'request' | 'git' | 'persona_response' | 'persona_apply' | 'persona_completed' | 'unknown';

export type WorkflowIntent = 'prepare' | 'execute' | 'analyze' | 'summarize' | 'unknown';

export interface LogEvent {
  ts: string; // ISO timestamp
  level: LogLevel;
  persona: PersonaType;
  workflowId: string;
  intent: WorkflowIntent;
  repo: string;
  branch: string;
  projectId: string;
  corrId: string;
  duration_ms: number;
  preview_raw: string; // JSON string representation of raw message
  preview_json: Record<string, unknown>; // Parsed JSON object
  paths: string[]; // File paths involved
  source: string; // Source of the log event
  hash: string; // Message hash for deduplication
}

export type LogEventPreview = {
  ts: string;
  level: LogLevel;
  persona: PersonaType;
  workflowId: string;
  intent: WorkflowIntent;
  repo: string;
  branch: string;
  projectId: string;
  corrId: string;
  duration_ms: number;
  preview_raw: string;
  preview_json: Record<string, unknown>;
  paths: string[];
  source: string;
  hash: string;
};