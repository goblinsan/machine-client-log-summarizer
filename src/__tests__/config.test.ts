import { describe, it, expect } from 'vitest';
import { getConfiguration, getPrompts } from '../config';

describe('Configuration Tests', () => {
  it('should export getConfiguration', () => {
    expect(typeof getConfiguration).toBe('function');
  });

  it('should export getPrompts', () => {
    expect(typeof getPrompts).toBe('function');
  });

  it('should return a valid configuration object', () => {
    const config = getConfiguration();
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  it('should return prompts object', () => {
    const prompts = getPrompts();
    expect(prompts).toBeDefined();
    expect(typeof prompts).toBe('object');
  });
});