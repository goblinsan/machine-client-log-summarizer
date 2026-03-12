import { LogEvent, LogEventType, RawLogMessage } from '../types/logEvent';

/**
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
