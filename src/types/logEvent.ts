/**
 * LogEvent schema for multi-agent log summarizer
 * Captures all required fields for log event normalization
 */
export interface LogEvent {
  ts: string;              // Timestamp of the event
  level: string;           // Log level (info, warn, error, debug)
  persona?: string;        // Agent persona name
import { LogEvent, RawLogMessage } from '../types/logEvent';

/**
 * Normalizes raw log messages into typed LogEvent objects
  projectId?: string;      // Project identifier
  corrId?: string;         // Correlation ID for tracing
import { describe, it, expect, vi } from 'vitest';
import { logEventNormalizer } from './logEventNormalizer';
import { LogEvent, LogEventType } from '../types/logEvent';

describe('LogEventNormalizer', () => {
  describe('classifyEventType', () => {
  hash?: string;           // Hash for deduplication
  type?: LogEventType;     // Event type classification
}

export type LogEventType = 
  | 'worker_ready'
  | 'request_started'
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
 * Raw log message structure before normalization
 */
export interface RawLogMessage {
  [key: string]: unknown;
}

}

/**
 * LogEvent normalizer module exports
 */
 */
export type LogEventType =
  | 'worker_ready'
  | 'request_started'
  | 'git_op'
  | 'persona_response'
  | 'persona_apply'
  | 'persona_completed'
  | 'unknown';

/**
 * Raw log message structure before normalization
 */
export interface RawLogMessage {
  [key: string]: unknown;
}
  | 'request_started'
  | 'git_op'
  | 'persona_response'
  | 'persona_apply'
  | 'persona_completed'
  | 'unknown';

/**
 * Raw log message structure before normalization
 */
export interface RawLogMessage {
  [key: string]: unknown;
}




export default logEventNormalizer;

      expect(normalized[2].type).toBe('git_op');
    });
  });

  describe('edge cases', () => {
    it('should handle null values gracefully', () => {
      const raw: any = {
        message: null,
        type: null
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBe('unknown');
      expect(normalized.ts).toBeDefined();
    });

    it('should handle empty strings', () => {
      const raw: any = {
        message: '',
        type: ''
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBe('unknown');
    });

    it('should handle missing message field', () => {
      const raw: any = {
        type: 'worker_ready'
{
  "name": "machine-client-log-summarizer",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "add-plan": "node scripts/add_project_plan.js",
    "add-remaining": "node scripts/add_remaining_milestones.js",
    "lint:css": "stylelint \"src/**/*.scss\""
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zod": "^3.22.4",
    "typescript": "^5.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^5.0.4",
    "sass": "^1.76.1",
    "stylelint": "^16.25.0",
    "stylelint-config-standard": "^39.0.0",
    "stylelint-config-standard-scss": "^16.0.0",
    "stylelint-scss": "^6.12.1",
    "typescript": "^5.2.2",
    "vite": "^7.1.9",
    "vitest": "^3.2.1"
  },
  "exports": {
    "./types/logEvent": "./src/types/logEvent.ts",
    "./utils/logEventNormalizer": "./src/utils/logEventNormalizer.ts"
  }
}


    it('should handle preview_json as object', () => {
      const raw: any = {
        preview_json: { key: 'value', nested: { data: 'test' } }
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.preview).toEqual({ key: 'value', nested: { data: 'test' } });
    });

    it('should handle preview_raw as string', () => {
      const raw: any = {
        preview_raw: 'Plain text preview'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.preview).toBe('Plain text preview');
    });

    it('should prioritize preview_raw over preview_json', () => {
      const raw: any = {
        preview_raw: 'Raw string',
        preview_json: { json: 'object' }
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.preview).toBe('Raw string');
    });

    it('should handle duration_ms as string number', () => {
      const raw: any = {
        duration_ms: '1500'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.duration_ms).toBe(1500);
    });

    it('should handle all optional fields as undefined', () => {
      const raw: any = {};
      const normalized = logEventNormalizer.normalize(raw);
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
  });

  describe('LogEventType type', () => {
    it('should have correct type for normalized events', () => {
      const raw: any = {
        message: 'Ready',
        type: 'worker_ready'
      };
      const normalized = logEventNormalizer.normalize(raw);
      expect(normalized.type).toBeTypeOf('string');
      expect(normalized.type).toMatch<LogEventType>(/^(worker_ready|request_started|git_op|persona_response|persona_apply|persona_completed|unknown)$/);
    });
  });
});
