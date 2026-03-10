import { describe, it, expect } from 'vitest';
import { normalizeLogEvent } from '../utils/logEventNormalizer';

describe('Smoke Tests', () => {
  it('should run successfully', () => {
    expect(true).toBe(true);
  });

  it('should normalize a basic log event', () => {
    const event = {
      timestamp: '2024-01-01T00:00:00.000Z',
      level: 'INFO',
      message: 'Test message',
      service: 'test-service',
    };

    const normalized = normalizeLogEvent(event);

    expect(normalized).toBeDefined();
    expect(normalized.timestamp).toBe('2024-01-01T00:00:00.000Z');
    expect(normalized.level).toBe('INFO');
  });
});