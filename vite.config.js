import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cspMeta } from './security.config.js'

// Inject the Content-Security-Policy only into production builds:
// the dev server relies on inline scripts for hot reloading.
const cspPlugin = () => ({
  name: 'inject-csp',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler: (html) =>
      html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${cspMeta()}" />`,
      ),
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), cspPlugin()],
  build: {
    target: 'es2020',
    sourcemap: false,
    rolldownOptions: {
      output: {
        // Long-cached vendor chunks: content edits don't invalidate React / Motion for returning visitors.
        manualChunks(id) {
          if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          if (/node_modules[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion'
        },
      },
    },
  },
})
