import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx,js}'],
    setupFiles: ['src/test/setup.ts'],
    testTimeout: 10000,
  },
  plugins: [react()],
});
