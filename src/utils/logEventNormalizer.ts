import { 
  LogEvent, 
  RawLogMessage, 
  LogEventMapping, 
  LogEventType,
  LOG_EVENT_TYPES
} from '../types/logEvent';

/**
 * Normalizer for raw log messages to structured LogEvent objects
 * Maps raw messages to their appropriate event types
 */

export class LogEventNormalizer {
  private readonly requiredFields = ['ts', 'level'];
  private readonly optionalFields = [
    'persona', 'workflowId', 'intent', 'repo', 'branch',
    'projectId', 'corrId', 'duration_ms', 'preview', 'raw',
    'json', 'paths', 'source', 'hash'
  ];

  /**
   * Normalize a raw log message to a structured LogEvent
   */
  normalize(rawMessage: RawLogMessage): LogEvent {
    const event: LogEvent = {
      ts: this.extractField(rawMessage, 'ts', ''),
      level: this.extractField(rawMessage, 'level', 'info'),
      preview: this.extractField(rawMessage, 'preview', ''),
      raw: this.extractField(rawMessage, 'raw', ''),
      json: this.extractField(rawMessage, 'json', {}) as Record<string, unknown>,
      paths: this.extractField(rawMessage, 'paths', []) as string[],
      source: this.extractField(rawMessage, 'source', ''),
      hash: this.extractField(rawMessage, 'hash', '')
    };

    // Add optional fields if present
    if (rawMessage.persona) event.persona = rawMessage.persona as string;
    if (rawMessage.workflowId) event.workflowId = rawMessage.workflowId as string;
    if (rawMessage.intent) event.intent = rawMessage.intent as string;
    if (rawMessage.repo) event.repo = rawMessage.repo as string;
    if (rawMessage.branch) event.branch = rawMessage.branch as string;
    if (rawMessage.projectId) event.projectId = rawMessage.projectId as string;
    if (rawMessage.corrId) event.corrId = rawMessage.corrId as string;
    if (rawMessage.duration_ms) event.duration_ms = rawMessage.duration_ms as number;

    return event;
  }

  /**
   * Map a raw log message to its appropriate event type
   */
  mapToType(rawMessage: RawLogMessage): LogEventMapping {
    const eventType = this.determineEventType(rawMessage);
    const event = this.normalize(rawMessage);

    return {
      type: eventType,
      event
    };
  }

  /**
   * Determine the event type based on message content
   */
  private determineEventType(rawMessage: RawLogMessage): LogEventType {
    const message = rawMessage as Record<string, unknown>;
    const messageStr = typeof message.message === 'string' 
      ? message.message 
      : typeof message.msg === 'string' 
      ? message.msg 
      : '';

    const preview = typeof message.preview === 'string' ? message.preview : '';
    const raw = typeof message.raw === 'string' ? message.raw : '';

    // worker_ready
    if (messageStr.includes('ready') || messageStr.includes('initialized') || 
        preview.includes('ready') || preview.includes('initialized')) {
      return 'worker_ready';
    }

    // request_started
    if (messageStr.includes('request') || messageStr.includes('started') ||
        preview.includes('request') || preview.includes('started')) {
      return 'request_started';
    }

    // git_op
    if (messageStr.includes('git') || messageStr.includes('clone') || 
        messageStr.includes('push') || messageStr.includes('pull') ||
        messageStr.includes('commit') || messageStr.includes('branch') ||
        preview.includes('git') || preview.includes('clone') || 
        preview.includes('push') || preview.includes('pull') ||
        preview.includes('commit') || preview.includes('branch')) {
      return 'git_op';
    }

    // persona_response
    if (messageStr.includes('response') || messageStr.includes('answer') ||
        preview.includes('response') || preview.includes('answer')) {
      return 'persona_response';
    }

    // persona_apply
    if (messageStr.includes('apply') || messageStr.includes('applied') ||
        preview.includes('apply') || preview.includes('applied')) {
      return 'persona_apply';
    }

    // persona_completed
    if (messageStr.includes('completed') || messageStr.includes('finished') ||
        preview.includes('completed') || preview.includes('finished')) {
      return 'persona_completed';
    }

    // unknown
    return 'unknown';
  }

  /**
   * Extract a field value with fallback
   */
  private extractField<T>(obj: Record<string, unknown>, key: string, fallback: T): T {
    const value = obj[key];
    if (value === undefined || value === null) {
      return fallback;
    }
    return value as T;
  }
}

export const logEventNormalizer = new LogEventNormalizer();
export default logEventNormalizer;