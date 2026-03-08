import { describe, it, expect } from 'vitest';
import { App } from '../App';

describe('Smoke Tests', () => {
  it('should export App component', () => {
    expect(App).toBeDefined();
  });

  it('should have App component with name', () => {
    expect(App.name).toBe('App');
  });

  it('should have main entry point', () => {
    const main = require('../main');
    expect(main).toBeDefined();
  });
});