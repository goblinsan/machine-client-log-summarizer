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
 * Run all tests in the project and return detailed results.
 */
export async function runTests(): Promise<{ testResults: any }> {
  const vitest = await import('vitest');

  // Run tests and capture results
  const { state, mode } = await vitest.run({ watch: false });

  // Extract detailed test results
  const testResults = {
    passed: state?.passed || 0,
    failed: state?.failed || 0,
    skipped: state?.skipped || 0,
    tests: state?.tests || [],
    errors: state?.errors || [],
  };

  return { testResults };
}

export const vitestSetup = {
  enabled: true,
  runner: 'vitest',
  isolation: true
};

export default {
  enabled: true,
  runner: 'vitest',
  isolation: true
};
