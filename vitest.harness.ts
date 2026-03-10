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

export const vitestSetup = {
  enabled: true,
  runner: 'vitest',
  isolation: true
};