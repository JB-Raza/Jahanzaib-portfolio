import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    /* vendor-three is intentionally large (three + r3f + drei) and is
       deferred via requestIdleCallback so it never blocks initial load. */
    chunkSizeWarningLimit: 950,

    rollupOptions: {
      output: {
        /**
         * Rolldown (Vite 8) requires manualChunks to be a FUNCTION.
         * Returns a chunk name for a module ID, or undefined to let
         * the bundler decide.
         *
         * three + r3f + drei (~1 MB) → separate chunk, loaded lazily
         * framer-motion (~150 KB)     → separate chunk, cached independently
         * react + react-dom (~150 KB) → separate chunk, rarely changes
         */
        manualChunks(id) {
          if (
            id.includes('/three/') ||
            id.includes('@react-three/fiber') ||
            id.includes('@react-three/drei')
          ) {
            return 'vendor-three'
          }
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
