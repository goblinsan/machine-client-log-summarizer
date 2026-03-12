import { describe, it, expect } from 'vitest';
import { normalizeLogEvent, normalizeLogEventWithPersona } from './logEventNormalizer';
import { LogEvent } from '../types/logEvent';

describe('LogEventNormalizer', () => {
  describe('normalizeLogEvent', () => {
    it('should extract timestamp from ISO format', () => {
      const raw = 'ts=2026-03-12T07:00:00.000Z level=info';
      const result = normalizeLogEvent(raw);
      expect(result.ts).toBe('2026-03-12T07:00:00.000Z');
    });

    it('should extract duration_ms', () => {
      const raw = 'duration=1500';
      const result = normalizeLogEvent(raw);
      expect(result.duration_ms).toBe(1500);
    });

    it('should extract hash', () => {
      const raw = 'hash=abc123def456';
      const result = normalizeLogEvent(raw);
      expect(result.hash).toBe('abc123def456');
    });

    it('should extract paths', () => {
      const raw = 'paths=src/file.ts,src/file2.ts';
      const result = normalizeLogEvent(raw);
      expect(result.paths).toEqual(['src/file.ts', 'src/file2.ts']);
    });

    it('should extract preview_json', () => {
      const raw = 'preview={"key":"value"}';
      const result = normalizeLogEvent(raw);
      expect(result.preview_json).toEqual({ key: 'value' });
    });

    it('should extract preview_raw', () => {
      const raw = 'preview_raw=Hello World';
      const result = normalizeLogEvent(raw);
      expect(result.preview_raw).toBe('Hello World');
    });

    it('should default to unknown event type when no pattern matches', () => {
      const raw = 'some random message';
      const result = normalizeLogEvent(raw);
      expect(result.source).toBe('unknown');
    });
  });

  describe('normalizeLogEventWithPersona', () => {
    it('should extract persona field', () => {
      const raw = 'persona=code-reviewer';
      const result = normalizeLogEventWithPersona(raw);
      expect(result.persona).toBe('code-reviewer');
    });

    it('should extract workflowId', () => {
      const raw = 'workflowId=wf-12345';
      const result = normalizeLogEventWithPersona(raw);
      expect(result.workflowId).toBe('wf-12345');
    });

    it('should extract intent', () => {
      const raw = 'intent=review code';
      const result = normalizeLogEventWithPersona(raw);
      expect(result.intent).toBe('review code');
    });

    it('should extract repo', () => {
      const raw = 'repo=multi-agent-log-summarizer';
      const result = normalizeLogEventWithPersona(raw);
      expect(result.repo).toBe('multi-agent-log-summarizer');
    });

    it('should extract branch', () => {
      const raw = 'branch=main';
      const result = normalizeLogEventWithPersona(raw);
      expect(result.branch).toBe('main');
    });

    it('should extract projectId', () => {
      const raw = 'projectId=proj-001';
      const result = normalizeLogEventWithPersona(raw);
      expect(result.projectId).toBe('proj-001');
    });

    it('should extract corrId', () => {
      const raw = 'corrId=corr-abc123';
      const result = normalizeLogEventWithPersona(raw);
      expect(result.corrId).toBe('corr-abc123');
    });

    it('should handle all fields together', () => {
      const raw = `ts=2026-03-12T07:00:00.000Z level=info persona=code-reviewer workflowId=wf-12345 intent=review code repo=multi-agent-log-summarizer branch=main projectId=proj-001 corrId=corr-abc123 duration=1500 hash=abc123def456 paths=src/file.ts,src/file2.ts preview={"status":"success"} preview_raw=Success`;
      const result = normalizeLogEventWithPersona(raw);
      expect(result.ts).toBe('2026-03-12T07:00:00.000Z');
      expect(result.persona).toBe('code-reviewer');
      expect(result.workflowId).toBe('wf-12345');
      expect(result.intent).toBe('review code');
      expect(result.repo).toBe('multi-agent-log-summarizer');
      expect(result.branch).toBe('main');
      expect(result.projectId).toBe('proj-001');
      expect(result.corrId).toBe('corr-abc123');
      expect(result.duration_ms).toBe(1500);
      expect(result.hash).toBe('abc123def456');
      expect(result.paths).toEqual(['src/file.ts', 'src/file2.ts']);
      expect(result.preview_json).toEqual({ status: 'success' });
      expect(result.preview_raw).toBe('Success');
    });

    it('should handle worker_ready event type', () => {
      const raw = 'worker_ready=initialized';
      const result = normalizeLogEvent(raw);
      expect(result.source).toBe('worker_ready');
    });

    it('should handle request_started event type', () => {
      const raw = 'request_started=true';
      const result = normalizeLogEvent(raw);
      expect(result.source).toBe('request_started');
    });

    it('should handle git_op event type', () => {
      const raw = 'git_op=commit';
      const result = normalizeLogEvent(raw);
      expect(result.source).toBe('git_op');
    });

    it('should handle persona_response event type', () => {
      const raw = 'persona_response=review';
      const result = normalizeLogEvent(raw);
      expect(result.source).toBe('persona_response');
    });

    it('should handle persona_apply event type', () => {
      const raw = 'persona_apply=applied';
      const result = normalizeLogEvent(raw);
      expect(result.source).toBe('persona_apply');
    });

    it('should handle persona_completed event type', () => {
      const raw = 'persona_completed=done';
      const result = normalizeLogEvent(raw);
      expect(result.source).toBe('persona_completed');
    });
  });
});

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

