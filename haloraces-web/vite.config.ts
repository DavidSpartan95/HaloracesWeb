import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// Replace with your actual repo name!
const repoName = 'HaloracesWeb'

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [vue()],
})
