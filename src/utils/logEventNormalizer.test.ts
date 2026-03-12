import { describe, it, expect } from 'vitest';
import { normalizeLogEvent, getEventType, filterByType, groupByWorkflowId } from './logEventNormalizer';
import { LogEventType } from '../types/logEvent';

describe('LogEventNormalizer', () => {
  describe('normalizeLogEvent', () => {
    it('should normalize a worker_ready event', () => {
      const raw = {
        ts: '2024-01-01T00:00:00.000Z',
        level: 'info',
        message: 'Worker initialized and ready',
        source: 'worker',
      };
      const normalized = normalizeLogEvent(raw);

      expect(normalized.ts).toBe('2024-01-01T00:00:00.000Z');
      expect(normalized.level).toBe('info');
      expect(normalized._type).toBe('worker_ready');
    });

    it('should normalize a request_started event', () => {
      const raw = {
        ts: '2024-01-01T00:00:01.000Z',
        level: 'info',
        message: 'Request started for workflow abc123',
        workflowId: 'abc123',
        source: 'orchestrator',
      };
      const normalized = normalizeLogEvent(raw);

      expect(normalized.workflowId).toBe('abc123');
      expect(normalized._type).toBe('request_started');
    });

    it('should normalize a git_op event', () => {
      const raw = {
        ts: '2024-01-01T00:00:02.000Z',
        level: 'info',
        message: 'git push origin main',
        repo: 'my-repo',
        branch: 'main',
        source: 'git',
      };
      const normalized = normalizeLogEvent(raw);

      expect(normalized.repo).toBe('my-repo');
      expect(normalized.branch).toBe('main');
      expect(normalized._type).toBe('git_op');
    });

    it('should normalize a persona_response event', () => {
      const raw = {
        ts: '2024-01-01T00:00:03.000Z',
        level: 'info',
        message: 'Persona response: The answer is 42',
        persona: 'assistant',
        source: 'persona',
      };
      const normalized = normalizeLogEvent(raw);

      expect(normalized.persona).toBe('assistant');
      expect(normalized._type).toBe('persona_response');
    });

    it('should normalize a persona_apply event', () => {
      const raw = {
        ts: '2024-01-01T00:00:04.000Z',
        level: 'info',
        message: 'Persona applied changes to file',
        persona: 'assistant',
        source: 'persona',
      };
      const normalized = normalizeLogEvent(raw);

      expect(normalized.persona).toBe('assistant');
      expect(normalized._type).toBe('persona_apply');
    });

    it('should normalize a persona_completed event', () => {
      const raw = {
        ts: '2024-01-01T00:00:05.000Z',
        level: 'info',
        message: 'Persona completed workflow successfully',
        persona: 'assistant',
        workflowId: 'abc123',
        source: 'persona',
      };
      const normalized = normalizeLogEvent(raw);

      expect(normalized.persona).toBe('assistant');
      expect(normalized.workflowId).toBe('abc123');
      expect(normalized._type).toBe('persona_completed');
    });

    it('should default to unknown type for unrecognized events', () => {
      const raw = {
        ts: '2024-01-01T00:00:06.000Z',
        level: 'debug',
        message: 'Some random debug message',
        source: 'debugger',
      };
      const normalized = normalizeLogEvent(raw);

      expect(normalized._type).toBe('unknown');
    });

    it('should handle missing optional fields gracefully', () => {
      const raw = {
        ts: '2024-01-01T00:00:07.000Z',
        level: 'info',
        message: 'Minimal event',
      };
      const normalized = normalizeLogEvent(raw);

      expect(normalized.ts).toBe('2024-01-01T00:00:07.000Z');
      expect(normalized.level).toBe('info');
      expect(normalized.preview).toBe('Minimal event');
      expect(normalized.source).toBe('unknown');
    });
  });

  describe('getEventType', () => {
    it('should return the event type from a normalized event', () => {
      const event = normalizeLogEvent({
        ts: '2024-01-01T00:00:00.000Z',
        level: 'info',
        message: 'Worker initialized',
      });
      expect(getEventType(event)).toBe('worker_ready');
    });
  });

  describe('filterByType', () => {
    it('should filter events by type', () => {
      const events = [
        normalizeLogEvent({ ts: '1', level: 'info', message: 'Worker ready' }),
        normalizeLogEvent({ ts: '2', level: 'info', message: 'Request started' }),
        normalizeLogEvent({ ts: '3', level: 'info', message: 'Git push' }),
      ];
      const filtered = filterByType(events, 'git_op');
      expect(filtered.length).toBe(1);
      expect(filtered[0]._type).toBe('git_op');
    });
  });

  describe('groupByWorkflowId', () => {
    it('should group events by workflowId', () => {
      const events = [
        normalizeLogEvent({ ts: '1', level: 'info', message: 'Start', workflowId: 'abc' }),
        normalizeLogEvent({ ts: '2', level: 'info', message: 'End', workflowId: 'abc' }),
        normalizeLogEvent({ ts: '3', level: 'info', message: 'Other', workflowId: 'def' }),
      ];
      const groups = groupByWorkflowId(events);
      expect(groups.get('abc')?.length).toBe(2);
      expect(groups.get('def')?.length).toBe(1);
    });
  });
});

      expect(normalized._type).toBe('unknown');
    });

    it('should handle missing optional fields gracefully', () => {
      const raw = {
        ts: '2024-01-01T00:00:07.000Z',
        level: 'info',
        message: 'Minimal event',
      };
      const normalized = normalizeLogEvent(raw);

      expect(normalized.ts).toBe('2024-01-01T00:00:07.000Z');
      expect(normalized.level).toBe('info');
      expect(normalized.preview).toBe('Minimal event');
      expect(normalized.source).toBe('unknown');
    });
  });

  describe('getEventType', () => {
    it('should return the event type from a normalized event', () => {
      const event = normalizeLogEvent({
        ts: '2024-01-01T00:00:00.000Z',
        level: 'info',
        message: 'Worker initialized',
      });
      expect(getEventType(event)).toBe('worker_ready');
    });
  });

  describe('filterByType', () => {
    it('should filter events by type', () => {
      const events = [
        normalizeLogEvent({ ts: '1', level: 'info', message: 'Worker ready' }),
        normalizeLogEvent({ ts: '2', level: 'info', message: 'Request started' }),
        normalizeLogEvent({ ts: '3', level: 'info', message: 'Git push' }),
      ];
      const filtered = filterByType(events, 'git_op');
      expect(filtered.length).toBe(1);
      expect(filtered[0]._type).toBe('git_op');
    });
  });

  describe('groupByWorkflowId', () => {
    it('should group events by workflowId', () => {
      const events = [
        normalizeLogEvent({ ts: '1', level: 'info', message: 'Start', workflowId: 'abc' }),
        normalizeLogEvent({ ts: '2', level: 'info', message: 'End', workflowId: 'abc' }),
        normalizeLogEvent({ ts: '3', level: 'info', message: 'Other', workflowId: 'def' }),
      ];
      const groups = groupByWorkflowId(events);
      expect(groups.get('abc')?.length).toBe(2);
      expect(groups.get('def')?.length).toBe(1);
    });
  });
});
