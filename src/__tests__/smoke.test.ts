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

  it('should have valid lmStudioEndpoint', () => {
    expect(config.lmStudioEndpoint).toMatch(/^https?:\/\//);
  });
});
