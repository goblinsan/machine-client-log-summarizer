import { describe, it, expect } from 'vitest';
import { config } from '../config';

describe('Smoke Tests', () => {
  it('should load config successfully', () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  it('should have default values', () => {
    expect(config).toHaveProperty('appName');
    expect(config).toHaveProperty('logLevel');
  });

  it('should export synthetic logs', () => {
    expect(config).toHaveProperty('syntheticLogs');
    expect(Array.isArray(config.syntheticLogs)).toBe(true);
  });
});