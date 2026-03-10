import { describe, it, expect } from 'vitest';
import { getConfiguration } from '../config';

describe('Smoke Tests', () => {
  it('should export getConfiguration', () => {
    expect(typeof getConfiguration).toBe('function');
  });

  it('should return a valid configuration object', () => {
    const config = getConfiguration();
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });
});