import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ← LA LIGNE LA PLUS IMPORTANTE
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
