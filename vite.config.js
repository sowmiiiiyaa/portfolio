import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 5173,
    host: true
  },
  esbuild: {
    jsx: 'automatic'
  }
})