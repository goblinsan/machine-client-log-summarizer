import { LogEvent, LogEventType } from '../types/logEvent';

/**
 * Normalizer for raw log messages to typed LogEvent objects
 * Maps raw messages to one of 7 event types
 */

const EVENT_TYPE_PATTERNS: Record<LogEventType, RegExp[]> = {
  worker_ready: [/worker_ready/i, /ready/i, /initialized/i],
  request_started: [/request_started/i, /request_start/i, /started/i],
  git_op: [/git_op/i, /git/i, /commit/i, /push/i, /pull/i, /clone/i],
  persona_response: [/persona_response/i, /response/i, /reply/i],
  persona_apply: [/persona_apply/i, /apply/i, /applied/i],
  persona_completed: [/persona_completed/i, /completed/i, /finished/i],
  unknown: [/unknown/i, /unrecognized/i, /fallback/i],
};

/**
 * Extract timestamp from various formats
 */
function extractTimestamp(raw: string): string {
  const match = raw.match(/\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/);
  return match ? match[0] : new Date().toISOString();
}

/**
 * Extract duration from raw message
 */
function extractDuration(raw: string): number | undefined {
  const match = raw.match(/duration[_\s]*=?\s*(\d+)/i);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Extract hash from raw message
 */
function extractHash(raw: string): string | undefined {
  const match = raw.match(/hash[_\s]*=?\s*['"]?([^'"]+)['"]?/i);
  return match ? match[1] : undefined;
}

/**
 * Extract paths from raw message
 */
function extractPaths(raw: string): string[] | undefined {
  const match = raw.match(/paths[_\s]*=?\s*['"]?([^'"]+)['"]?/i);
  if (!match) return undefined;
  return match[1].split(',').map(p => p.trim()).filter(Boolean);
}

/**
 * Extract JSON preview from raw message
 */
function extractPreviewJson(raw: string): object | undefined {
  const match = raw.match(/preview[_\s]*=?\s*['"]?(\{[\s\S]*\})['"]?/i);
  if (!match) return undefined;
  try {
    return JSON.parse(match[1]);
  } catch {
    return undefined;
  }
}

/**
 * Extract raw preview from raw message
 */
function extractPreviewRaw(raw: string): string | undefined {
  const match = raw.match(/preview_raw[_\s]*=?\s*['"]?([^'"]+)['"]?/i);
  return match ? match[1] : undefined;
}

/**
 * Map raw message to typed LogEvent
 */
export function normalizeLogEvent(raw: string): LogEvent {
  const timestamp = extractTimestamp(raw);
  const duration = extractDuration(raw);
  const hash = extractHash(raw);
  const paths = extractPaths(raw);
  const previewJson = extractPreviewJson(raw);
  const previewRaw = extractPreviewRaw(raw);

  // Determine event type
  let eventType: LogEventType = 'unknown';
  for (const [type, patterns] of Object.entries(EVENT_TYPE_PATTERNS) as [LogEventType, RegExp[]][]) {
    if (patterns.some(pattern => pattern.test(raw))) {
      eventType = type;
      break;
    }
  }

  return {
    ts: timestamp,
    level: 'info',
    preview_raw: previewRaw,
    preview_json: previewJson,
    paths: paths,
    hash: hash,
    duration_ms: duration,
    source: eventType,
  };
}

/**
 * Map raw message to typed LogEvent with persona fields
 */
export function normalizeLogEventWithPersona(raw: string): LogEvent {
  const normalized = normalizeLogEvent(raw);

  // Extract persona-specific fields
  const personaMatch = raw.match(/persona[_\s]*=?\s*['"]?([^'"]+)['"]?/i);
  const workflowIdMatch = raw.match(/workflowId[_\s]*=?\s*['"]?([^'"]+)['"]?/i);
  const intentMatch = raw.match(/intent[_\s]*=?\s*['"]?([^'"]+)['"]?/i);
  const repoMatch = raw.match(/repo[_\s]*=?\s*['"]?([^'"]+)['"]?/i);
  const branchMatch = raw.match(/branch[_\s]*=?\s*['"]?([^'"]+)['"]?/i);
  const projectIdMatch = raw.match(/projectId[_\s]*=?\s*['"]?([^'"]+)['"]?/i);
  const corrIdMatch = raw.match(/corrId[_\s]*=?\s*['"]?([^'"]+)['"]?/i);

  return {
    ...normalized,
    persona: personaMatch ? personaMatch[1] : undefined,
    workflowId: workflowIdMatch ? workflowIdMatch[1] : undefined,
    intent: intentMatch ? intentMatch[1] : undefined,
    repo: repoMatch ? repoMatch[1] : undefined,
    branch: branchMatch ? branchMatch[1] : undefined,
    projectId: projectIdMatch ? projectIdMatch[1] : undefined,
    corrId: corrIdMatch ? corrIdMatch[1] : undefined,
  };
}

export { normalizeLogEvent, normalizeLogEventWithPersona };
 * Normalizes raw log messages to the LogEvent schema
 */
export function normalizeLogEvent(raw: RawLogMessage): LogEvent {
  const event: LogEvent = {
    ts: raw.ts || raw.timestamp || new Date().toISOString(),
    level: raw.level || 'info',
    preview: raw.preview || raw.json || raw.message || '',
    source: raw.source || 'unknown',
    hash: raw.hash,
  };

  // Map known fields
  if (raw.persona) event.persona = String(raw.persona);
  if (raw.workflowId) event.workflowId = String(raw.workflowId);
  if (raw.intent) event.intent = String(raw.intent);
  if (raw.repo) event.repo = String(raw.repo);
  if (raw.branch) event.branch = String(raw.branch);
  if (raw.projectId) event.projectId = String(raw.projectId);
  if (raw.corrId) event.corrId = String(raw.corrId);
  if (raw.duration_ms) event.duration_ms = Number(raw.duration_ms);
  if (raw.paths) event.paths = Array.isArray(raw.paths) ? raw.paths : [raw.paths];

  // Classify event type
  const eventType = classifyEventType(raw);
  event._type = eventType;

  return event;
}

/**
 * Classifies the event type based on content
 */
function classifyEventType(raw: RawLogMessage): LogEventType {
  const ts = String(raw.ts || raw.timestamp);
  const level = String(raw.level || '');
  const persona = String(raw.persona || '');
  const intent = String(raw.intent || '');
  const workflowId = String(raw.workflowId || '');
  const message = String(raw.message || raw.preview || '');

  // worker_ready
  if (level === 'info' && (message.includes('ready') || message.includes('initialized'))) {
    return 'worker_ready';
  }

  // request_started
  if (level === 'info' && (message.includes('request') || message.includes('started'))) {
    return 'request_started';
  }

  // git_op
  if (message.includes('git') || message.includes('commit') || message.includes('push') || message.includes('pull')) {
    return 'git_op';
  }

  // persona_response
  if (persona && (message.includes('response') || message.includes('answer') || message.includes('reply'))) {
    return 'persona_response';
  }

  // persona_apply
  if (persona && (message.includes('apply') || message.includes('applied'))) {
    return 'persona_apply';
  }

  // persona_completed
  if (level === 'info' && (message.includes('completed') || message.includes('finished') || message.includes('done'))) {
    return 'persona_completed';
  }

  return 'unknown';
}

/**
 * Extracts the event type from a normalized LogEvent
 */
export function getEventType(event: LogEvent): LogEventType {
  return event._type || 'unknown';
}

/**
 * Filters events by type
 */
export function filterByType(events: LogEvent[], type: LogEventType): LogEvent[] {
  return events.filter(e => getEventType(e) === type);
}

/**
 * Groups events by workflowId
 */
export function groupByWorkflowId(events: LogEvent[]): Map<string, LogEvent[]> {
  const groups = new Map<string, LogEvent[]>();
  for (const event of events) {
    const workflowId = event.workflowId || 'unknown';
    if (!groups.has(workflowId)) {
      groups.set(workflowId, []);
    }
    groups.get(workflowId)!.push(event);
  }
  return groups;
}
    return 'persona_apply';
  }

  // persona_completed
  if (level === 'info' && (message.includes('completed') || message.includes('finished') || message.includes('done'))) {
    return 'persona_completed';
  }

  return 'unknown';
}

/**
 * Extracts the event type from a normalized LogEvent
 */
export function getEventType(event: LogEvent): LogEventType {
  return event._type || 'unknown';
}

/**
 * Filters events by type
 */
export function filterByType(events: LogEvent[], type: LogEventType): LogEvent[] {
  return events.filter(e => getEventType(e) === type);
}

/**
 * Groups events by workflowId
 */
export function groupByWorkflowId(events: LogEvent[]): Map<string, LogEvent[]> {
  const groups = new Map<string, LogEvent[]>();
  for (const event of events) {
    const workflowId = event.workflowId || 'unknown';
    if (!groups.has(workflowId)) {
      groups.set(workflowId, []);
    }
    groups.get(workflowId)!.push(event);
  }
  return groups;
}

