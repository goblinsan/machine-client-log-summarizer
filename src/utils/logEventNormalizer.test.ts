import { describe, it, expect } from 'vitest';
import { logEventNormalizer } from './logEventNormalizer';
import { LogEvent } from '../types/logEvent';

describe('LogEventNormalizer', () => {
  describe('classifyEventType', () => {
    it('should classify worker_ready events', () => {
      const raw = {
        message: 'Agent worker ready',
        type: 'worker_ready'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBe('worker_ready');
    });

    it('should classify request_started events', () => {
      const raw = {
        message: 'Incoming request received',
        type: 'request_started'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBe('request_started');
    });

    it('should classify git_op events', () => {
      const raw = {
        message: 'Git commit pushed',
        type: 'git_op'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBe('git_op');
    });

    it('should classify persona_response events', () => {
      const raw = {
        message: 'Persona response generated',
        type: 'persona_response'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBe('persona_response');
    });

    it('should classify persona_apply events', () => {
      const raw = {
        message: 'Changes applied to files',
        type: 'persona_apply'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBe('persona_apply');
    });

    it('should classify persona_completed events', () => {
      const raw = {
        message: 'Workflow completed successfully',
        type: 'persona_completed'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBe('persona_completed');
    });

    it('should classify unknown events', () => {
      const raw = {
        message: 'Unknown event type',
        type: 'unknown'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBe('unknown');
    });
  });

  describe('normalize', () => {
    it('should extract all fields from raw message', () => {
      const raw: any = {
        ts: '2026-03-12T12:00:00.000Z',
        level: 'info',
        persona: 'code-reviewer',
        workflow_id: 'wf-123',
        projectId: 'proj-456',
        corrId: 'corr-789',
        hash: 'abc123',
        type: 'log'
      };

      const normalized = logEventNormalizer.normalize(raw);

      expect(normalized.ts).toBe('2026-03-12T12:00:00.000Z');
      expect(normalized.level).toBe('info');
      expect(normalized.persona).toBe('code-reviewer');
      expect(normalized.workflow_id).toBe('wf-123');
      expect(normalized.projectId).toBe('proj-456');
      expect(normalized.corrId).toBe('corr-789');
      expect(normalized.hash).toBe('abc123');
    });

    it('should handle missing optional fields gracefully', () => {
      const raw: any = {
        ts: '2026-03-12T12:00:00.000Z',
        level: 'info'
      };

      const normalized = logEventNormalizer.normalize(raw);

      expect(normalized.ts).toBe('2026-03-12T12:00:00.000Z');
      expect(normalized.level).toBe('info');
      expect(normalized.persona).toBeUndefined();
      expect(normalized.workflow_id).toBeUndefined();
      expect(normalized.projectId).toBeUndefined();
      expect(normalized.corrId).toBeUndefined();
      expect(normalized.hash).toBeUndefined();
    });

    it('should handle alternate field names', () => {
      const raw: any = {
        timestamp: '2026-03-12T12:00:00.000Z',
        logLevel: 'warn',
        agent: 'deployer',
        workflow_id: 'wf-456',
        projectId: 'proj-789',
        correlationId: 'corr-abc',
        hash: 'def456',
        type: 'metric'
      };

      const normalized = logEventNormalizer.normalize(raw);

      expect(normalized.ts).toBe('2026-03-12T12:00:00.000Z');
      expect(normalized.level).toBe('warn');
      expect(normalized.persona).toBe('deployer');
      expect(normalized.workflow_id).toBe('wf-456');
      expect(normalized.projectId).toBe('proj-789');
      expect(normalized.corrId).toBe('corr-abc');
      expect(normalized.hash).toBe('def456');
    });

    it('should extract repo field from raw message', () => {
      const raw: any = {
        ts: '2026-03-12T12:00:00.000Z',
        level: 'info',
        repo: 'github.com/owner/repo',
        type: 'git_op'
      };

      const normalized = logEventNormalizer.normalize(raw);

      expect(normalized.repo).toBe('github.com/owner/repo');
    });

    it('should handle missing repo field gracefully', () => {
      const raw: any = {
        ts: '2026-03-12T12:00:00.000Z',
        level: 'info',
        type: 'log'
      };

      const normalized = logEventNormalizer.normalize(raw);

      expect(normalized.repo).toBeUndefined();
    });

    it('should handle alternate repo field names', () => {
      const raw: any = {
        ts: '2026-03-12T12:00:00.000Z',
        level: 'info',
        repository: 'github.com/owner/repo',
        type: 'git_op'
      };

      const normalized = logEventNormalizer.normalize(raw);

      expect(normalized.repo).toBe('github.com/owner/repo');
    });
  });

  describe('normalizeBatch', () => {
    it('should normalize multiple raw messages', () => {
      const rawMessages: any[] = [
        { message: 'Ready', type: 'worker_ready' },
        { message: 'Request received', type: 'request_started' },
        { message: 'Git push', type: 'git_op' }
      ];

      const normalized = logEventNormalizer.normalizeBatch(rawMessages);

      expect(normalized).toHaveLength(3);
      expect(normalized[0].type).toBe('worker_ready');
      expect(normalized[1].type).toBe('request_started');
      expect(normalized[2].type).toBe('git_op');
    });
  });
});
