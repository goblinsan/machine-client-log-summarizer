import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,js}'],
    exclude: ['node_modules/**', '**/.git/**'],
    setupFiles: ['src/test/setup.ts'],
    testTimeout: 10000,
    isolate: true,
    deps: {
      interopDefault: true
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx,js}'],
    setupFiles: ['src/test/setup.ts'],
  },
});

