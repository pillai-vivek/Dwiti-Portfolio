import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` -> dist/ (deploy anywhere static).
// Set SINGLE=1 to emit one self-contained index.html (used for previews).
export default defineConfig({
  plugins: [react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
  build: { assetsInlineLimit: process.env.SINGLE ? 100000000 : 4096 },
})
