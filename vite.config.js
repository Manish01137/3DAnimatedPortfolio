import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Serving from the root of a domain (Hostinger public_html, Vercel, Netlify, etc.)
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Hostinger shared plans don't need source maps in production
    sourcemap: false,
  },
})
