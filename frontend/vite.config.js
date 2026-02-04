import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    open: true,
    fs: {
      allow: ['..'] 
    }
  },
  optimizeDeps: {
    exclude: ['@cidqueiroz/cdkteck-ui']
  },
  resolve: {
    preserveSymlinks: true 
  }
});