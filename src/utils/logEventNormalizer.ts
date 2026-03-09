import { LogEvent, LogLevel, PersonaType, WorkflowIntent } from '../types/logEvent';

/**
 * LogEventNormalizer - Maps raw log messages to typed LogEvent objects
 */

const MESSAGE_PATTERNS: Record<PersonaType, RegExp> = {
  worker_ready: /worker_ready/i,
  request_started: /request_started/i,
  git_op: /git_op/i,
  persona_response: /persona_response/i,
  persona_apply: /persona_apply/i,
  persona_completed: /persona_completed/i,
  unknown: /unknown/i,
};

const INTENT_PATTERNS: Record<WorkflowIntent, RegExp> = {
  prepare: /prepare/i,
  execute: /execute/i,
  analyze: /analyze/i,
  summarize: /summarize/i,
  unknown: /unknown/i,
};

/**
 * Extract timestamp from raw message
 */
function extractTimestamp(raw: string): string {
  const match = raw.match(/\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/);
  return match ? match[0] : new Date().toISOString();
}

/**
 * Extract duration from raw message
 */
function extractDuration(raw: string): number {
  const match = raw.match(/duration_ms[:\s]+(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Extract hash from raw message
 */
function extractHash(raw: string): string {
  const match = raw.match(/hash[:\s]+["']?([^"'\s]+)["']?/i);
  return match ? match[1] : '';
}

/**
 * Extract paths from raw message
 */
function extractPaths(raw: string): string[] {
  const matches = raw.matchAll(/["']([^"'\s]+\.ts|[^"'\s]+\.js)["']/g);
  return Array.from(matches).map(m => m[1]);
}

/**
 * Extract source from raw message
 */
function extractSource(raw: string): string {
  const match = raw.match(/source[:\s]+["']([^"'\s]+)["']/i);
  return match ? match[1] : 'unknown';
}

/**
 * Determine persona type from raw message
 */
function determinePersona(raw: string): PersonaType {
  for (const [type, pattern] of Object.entries(MESSAGE_PATTERNS) as [PersonaType, RegExp][]) {
    if (pattern.test(raw)) {
      return type;
    }
  }
  return 'unknown';
}

/**
 * Determine workflow intent from raw message
 */
function determineIntent(raw: string): WorkflowIntent {
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS) as [WorkflowIntent, RegExp][]) {
    if (pattern.test(raw)) {
      return intent;
    }
  }
  return 'unknown';
}

/**
 * Determine log level from raw message
 */
function determineLevel(raw: string): LogLevel {
  if (/error/i.test(raw)) return 'error';
  if (/warn/i.test(raw)) return 'warn';
  if (/debug/i.test(raw)) return 'debug';
  return 'info';
}

/**
 * Normalize raw log message to typed LogEvent
 */
export function normalizeLogEvent(raw: string): LogEvent {
  const preview_json: Record<string, unknown> = {};
  try {
    preview_json.raw = raw;
  } catch (e) {
    preview_json.raw = raw;
  }

  return {
    ts: extractTimestamp(raw),
    level: determineLevel(raw),
    persona: determinePersona(raw),
    workflowId: raw.match(/workflowId[:\s]+["']([^"'\s]+)["']/)?.[1] || '',
    intent: determineIntent(raw),
    repo: raw.match(/repo[:\s]+["']([^"'\s]+)["']/)?.[1] || '',
    branch: raw.match(/branch[:\s]+["']([^"'\s]+)["']/)?.[1] || '',
    projectId: raw.match(/projectId[:\s]+["']([^"'\s]+)["']/)?.[1] || '',
    corrId: raw.match(/corrId[:\s]+["']([^"'\s]+)["']/)?.[1] || '',
    duration_ms: extractDuration(raw),
    preview_raw: raw,
    preview_json,
    paths: extractPaths(raw),
    source: extractSource(raw),
    hash: extractHash(raw),
  };
}

/**
 * Validate LogEvent structure
 */
export function validateLogEvent(event: LogEvent): boolean {
  return (
    !!event.ts &&
    !!event.level &&
    !!event.persona &&
    !!event.workflowId &&
    !!event.repo &&
    !!event.branch &&
    !!event.projectId &&
    !!event.corrId &&
    event.duration_ms >= 0 &&
    !!event.preview_raw &&
    !!event.preview_json &&
    Array.isArray(event.paths) &&
    !!event.source &&
    !!event.hash
  );
}