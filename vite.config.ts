import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Если вам действительно нужны пути, используйте этот подход для ESM:
// import { fileURLToPath } from 'url';
// import { dirname, resolve } from 'path';
// const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});