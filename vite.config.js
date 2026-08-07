import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative assets work both locally and under a GitHub Pages repository path.
  base: './',
  plugins: [vue(), tailwindcss()],
  test: {
    environment: 'jsdom',
  },
})
