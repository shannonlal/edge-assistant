/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: [
      'src/**/*.test.{ts,tsx}',
      'src/**/*.spec.{ts,tsx}',
      'src/pages/api/**/__tests__/**/*.test.{ts,tsx}',
    ],
    exclude: ['.next/**', 'node_modules/**', '**/node_modules/**', 'dist/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    server: {
      deps: {
        inline: [/^(?!.*vitest).*$/],
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
