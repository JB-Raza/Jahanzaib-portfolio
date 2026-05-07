import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    rollupOptions: {
      output: {
        /**
         * Rolldown (Vite 8) requires manualChunks to be a FUNCTION.
         *
         * framer-motion (~150 KB) → separate chunk, cached independently
         * react + react-dom (~150 KB) → separate chunk, rarely changes
         *
         * Three.js removed — replaced by native Canvas 2D (zero deps)
         */
        manualChunks(id) {
          if (id.includes('framer-motion')) {
            return 'vendor-motion'
          }
          if (id.includes('react-dom') || id.includes('react/jsx')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
