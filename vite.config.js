import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.VERCEL ? '/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    host: true
  },
  esbuild: {
    jsx: 'automatic'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
}))