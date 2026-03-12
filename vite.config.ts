import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6006
  }
})

// Ensure TypeScript is properly configured for the project
export const tsConfig = {
  compilerOptions: {
    target: 'ES2020',
    module: 'ESNext',
    moduleResolution: 'bundler',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    jsx: 'react-jsx',
    lib: ['ES2020', 'DOM'],
    types: ['node', 'vite/client']
  }
};
