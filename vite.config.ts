import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * base נקבע לפי סביבת הפריסה:
 *   Vercel / דומיין ייעודי → '/'  (ברירת המחדל)
 *   GitHub Pages           → '/<repo>/'  דרך VITE_BASE
 */
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  server: { port: 5173, open: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/firestore'],
        },
      },
    },
  },
})
