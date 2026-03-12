import { LogEvent, LogEventType, RawLogMessage } from '../types/logEvent';

/**
 * Normalizes raw log messages into typed LogEvent objects
 * Classifies events into known types and extracts structured fields
 */
export class LogEventNormalizer {
  private readonly knownEventTypes: LogEventType[] = [
    'worker_ready',
    'request_started',
    'git_op',
    'persona_response',
    'persona_apply',
    'persona_completed',
    'unknown'
  ];

  /**
   * Classifies a raw log message into a known event type
   */
  private classifyEventType(raw: RawLogMessage): LogEventType {
    const message = String(raw.message || raw.msg || '').toLowerCase();
    const content = String(raw.content || raw.body || '').toLowerCase();
    const data = raw.data || {};

    // worker_ready: agent initialization events
    if (
      message.includes('ready') ||
      message.includes('initialized') ||
      message.includes('started') ||
      content.includes('ready') ||
      data.type === 'worker_ready'
    ) {
      return 'worker_ready';
    }

    // request_started: incoming request events
    if (
      message.includes('request') ||
      message.includes('incoming') ||
      content.includes('request') ||
      data.type === 'request_started'
    ) {
      return 'request_started';
    }

    // git_op: git operation events
    if (
      message.includes('git') ||
      message.includes('commit') ||
      message.includes('push') ||
      message.includes('pull') ||
      message.includes('clone') ||
      message.includes('branch') ||
      content.includes('git') ||
      data.type === 'git_op'
    ) {
      return 'git_op';
    }

    // persona_response: agent response events
    if (
      message.includes('response') ||
      message.includes('answer') ||
      message.includes('reply') ||
      content.includes('response') ||
      data.type === 'persona_response'
    ) {
      return 'persona_response';
    }

    // persona_apply: agent applying changes
    if (
      message.includes('apply') ||
      message.includes('applied') ||
      message.includes('modified') ||
      content.includes('apply') ||
      data.type === 'persona_apply'
    ) {
      return 'persona_apply';
    }

    // persona_completed: agent completion events
    if (
      message.includes('completed') ||
      message.includes('finished') ||
      message.includes('done') ||
      content.includes('completed') ||
      data.type === 'persona_completed'
    ) {
      return 'persona_completed';
    }

    return 'unknown';
  }

  /**
   * Extracts and normalizes preview field (string or object)
   */
  private normalizePreview(raw: RawLogMessage): string | object | undefined {
    const previewRaw = raw.preview_raw || raw.preview || undefined;
    const previewJson = raw.preview_json || raw.preview || undefined;

    // If we have both, prefer raw string
    if (previewRaw !== undefined) {
      return previewRaw;
    }

    // If we have JSON, return as object
    if (previewJson !== undefined) {
      return previewJson;
    }

    return undefined;
  }

  /**
   * Normalizes a raw log message into a typed LogEvent
   */
  normalize(raw: RawLogMessage): LogEvent {
    const eventType = this.classifyEventType(raw);

    // Extract timestamp
    const ts = raw.ts || raw.timestamp || raw.time || new Date().toISOString();

    // Extract level
    const level = raw.level || raw.logLevel || 'info';

    // Extract persona
    const persona = raw.persona || raw.agent || undefined;

    // Extract workflowId
    const workflowId = raw.workflowId || raw.workflow_id || raw.requestId || undefined;

    // Extract intent
    const intent = raw.intent || raw.userIntent || raw.user_intent || undefined;

    // Extract repo
    const repo = raw.repo || raw.repository || undefined;

    // Extract branch
    const branch = raw.branch || raw.gitBranch || undefined;

    // Extract projectId
    const projectId = raw.projectId || raw.project_id || raw.projectId || undefined;

    // Extract corrId
    const corrId = raw.corrId || raw.correlationId || raw.correlation_id || undefined;

    // Extract duration_ms
    const durationMs = raw.duration_ms || raw.duration || undefined;

    // Extract preview
    const preview = this.normalizePreview(raw);

    // Extract paths
    const paths = raw.paths || raw.files || undefined;

    // Extract source
    const source = raw.source || raw.eventSource || undefined;

    // Extract hash
    const hash = raw.hash || raw.correlationHash || undefined;

    return {
      ts,
      level,
      persona,
      workflowId,
      intent,
      repo,
      branch,
      projectId,
      corrId,
      duration_ms: durationMs,
      preview,
      paths,
      source,
      hash,
      type: eventType
    };
  }

  /**
   * Normalizes multiple raw log messages
   */
  normalizeBatch(rawMessages: RawLogMessage[]): LogEvent[] {
    return rawMessages.map(msg => this.normalize(msg));
  }
}

export const logEventNormalizer = new LogEventNormalizer();
export default logEventNormalizer;