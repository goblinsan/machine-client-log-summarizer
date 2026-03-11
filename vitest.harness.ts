/**
 * Vitest Test Harness Setup
 * 
 * This file provides the basic setup for Vitest to enable running tests.
 * Run `vitest run` to execute all tests in the project.
 * 
 * Test infrastructure includes:
 * - Vitest test runner configuration
 * - Test setup/teardown hooks
 * - Test isolation and parallel execution support
 */

import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx,js}'],
    setupFiles: ['src/test/setup.ts'],
    isolate: true,
    pool: 'threads',
  },
});

/**
 * Run all tests in the project
 */
export function runTests(): Promise<void> {
  return import('vitest').then((vitest) => {
    return vitest.run();
  });
}

export const vitestSetup = {
  enabled: true,
  runner: 'vitest',
  isolation: true
};

  isolation: true
};
