import { describe, it, expect } from 'vitest';

describe('Smoke Tests', () => {
  it('should run successfully', () => {
    expect(true).toBe(true);
  });

  it('should have vitest available', () => {
    expect(typeof window).toBe('undefined'); // node environment
  });

  it('should import config', () => {
    const config = await import('../config/index.ts');
    expect(config).toBeDefined();
  });
});