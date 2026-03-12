import { describe, it, expect } from 'vitest';
import { logEventNormalizer } from './logEventNormalizer';
import { LogEvent, LogEventType } from '../types/logEvent';

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
        workflowId: 'wf-123',
        intent: 'Review PR',
        repo: 'my-repo',
        branch: 'main',
        projectId: 'proj-456',
        corrId: 'corr-789',
        duration_ms: 1500,
        preview_raw: 'Some preview text',
        preview_json: { key: 'value' },
        paths: ['file1.ts', 'file2.ts'],
        source: 'agent',
        hash: 'abc123'
      };

      const normalized = logEventNormalizer.normalize(raw);

      expect(normalized.ts).toBe('2026-03-12T12:00:00.000Z');
      expect(normalized.level).toBe('info');
      expect(normalized.persona).toBe('code-reviewer');
      expect(normalized.workflowId).toBe('wf-123');
      expect(normalized.intent).toBe('Review PR');
      expect(normalized.repo).toBe('my-repo');
      expect(normalized.branch).toBe('main');
      expect(normalized.projectId).toBe('proj-456');
      expect(normalized.corrId).toBe('corr-789');
      expect(normalized.duration_ms).toBe(1500);
      expect(normalized.preview).toBe('Some preview text');
      expect(normalized.paths).toEqual(['file1.ts', 'file2.ts']);
      expect(normalized.source).toBe('agent');
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
      expect(normalized.workflowId).toBeUndefined();
      expect(normalized.intent).toBeUndefined();
      expect(normalized.repo).toBeUndefined();
      expect(normalized.branch).toBeUndefined();
      expect(normalized.projectId).toBeUndefined();
      expect(normalized.corrId).toBeUndefined();
      expect(normalized.duration_ms).toBeUndefined();
      expect(normalized.preview).toBeUndefined();
      expect(normalized.paths).toBeUndefined();
      expect(normalized.source).toBeUndefined();
      expect(normalized.hash).toBeUndefined();
    });

    it('should handle alternate field names', () => {
      const raw: any = {
        timestamp: '2026-03-12T12:00:00.000Z',
        logLevel: 'warn',
        agent: 'deployer',
        workflow_id: 'wf-456',
        userIntent: 'Deploy',
        repository: 'deploy-repo',
        gitBranch: 'deploy',
        project_id: 'proj-789',
        correlation_id: 'corr-abc',
        duration: 2000,
        preview: 'Preview content',
        files: ['deploy.sh'],
        eventSource: 'deployer',
        correlationHash: 'def456'
      };

      const normalized = logEventNormalizer.normalize(raw);

      expect(normalized.ts).toBe('2026-03-12T12:00:00.000Z');
      expect(normalized.level).toBe('warn');
      expect(normalized.persona).toBe('deployer');
      expect(normalized.workflowId).toBe('wf-456');
      expect(normalized.intent).toBe('Deploy');
      expect(normalized.repo).toBe('deploy-repo');
      expect(normalized.branch).toBe('deploy');
      expect(normalized.projectId).toBe('proj-789');
      expect(normalized.corrId).toBe('corr-abc');
      expect(normalized.duration_ms).toBe(2000);
      expect(normalized.preview).toBe('Preview content');
      expect(normalized.paths).toEqual(['deploy.sh']);
      expect(normalized.source).toBe('deployer');
      expect(normalized.hash).toBe('def456');
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