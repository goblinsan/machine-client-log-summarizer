// Test setup file for Vitest
// Can be used to configure test environment, mocks, etc.

import '@testing-library/jest-dom';

// Configure test environment
import { afterEach, beforeEach, vi } from 'vitest';

// Clear mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Setup any global mocks or configurations here
