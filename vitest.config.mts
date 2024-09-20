import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vitest/config';
import typescript from '@rollup/plugin-typescript';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';


export default defineConfig({
  plugins: [
    vue(),
    typescript()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ['**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
    coverage: {
      reporter: ['lcov', 'text', 'json', 'html', 'json-summary'],
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
    setupFiles: ['./config/vitest/setupVitest.js'],
    restoreMocks: true,
  },
});
