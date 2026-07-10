import { defineConfig } from 'vite';

// No @vitejs/plugin-react: its Fast-Refresh transform corrupts the precompiled
// _ds_bundle.js IIFE. esbuild handles JSX in .jsx files directly.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  build: { outDir: 'dist', emptyOutDir: true },
});
