import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Vendor libraries are split into their own files: smaller first load,
// and returning visitors keep them cached when only the site's own code changes.
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    chunkSizeWarningLimit: 400,
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'react-vendor', test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/ },
            { name: 'motion-vendor', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
            { name: 'gsap-vendor', test: /node_modules[\\/]gsap[\\/]/ },
          ],
        },
      },
    },
  },
})
