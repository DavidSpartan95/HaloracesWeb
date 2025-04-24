import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/HaloracesWeb/', // <-- Root path for custom domain
  plugins: [vue()],
  server: {
    
  },
})


