import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // When deploying to GitHub Pages under a repository (not a user/page at root),
  // set the base to '/<repo-name>/' so asset URLs are generated correctly.
  // This project is hosted at: https://aoshi346.github.io/Streaming/
  base: '/Streaming/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: true,
  },
})
