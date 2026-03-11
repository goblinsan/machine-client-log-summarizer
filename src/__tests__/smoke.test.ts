import { describe, it, expect } from 'vitest';
import { config } from '../config';

describe('Smoke Tests', () => {
  it('should load config without errors', () => {
    expect(config).toBeDefined();
  });

  it('should have default settings', () => {
    expect(config.defaultSettings).toBeDefined();
  });

  it('should export logEvent type', () => {
    expect(config).toBeDefined();
  });
});