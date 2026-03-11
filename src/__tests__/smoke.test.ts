import { describe, it, expect } from 'vitest';
import { config } from '../config';

describe('Smoke Tests', () => {
  it('should load config without errors', () => {
    expect(config).toBeDefined();
  });

  it('should have default log settings', () => {
    expect(config.logPath).toBeDefined();
    expect(config.logLevel).toBeDefined();
  });

  it('should have valid app name and version', () => {
    expect(config.appName).toBe('Multi-Agent Log Summarizer');
    expect(config.version).toBe('1.0.0');
  });
});
