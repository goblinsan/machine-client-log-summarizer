import { defineConfig, type UserConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,js}'],
  }
});

const __dirname = dirname(fileURLToPath(import.meta.url));
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,js}'],
    exclude: ['node_modules/**'],
    setupFiles: ['src/test/setup.ts'],
  },
});
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,js}'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});


