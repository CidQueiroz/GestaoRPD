import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command }) => {
  const isDevelopment = command === 'serve';

  return {
    plugins: [react()],
    resolve: {
      alias: isDevelopment ? {
        '@cidqueiroz/cdkteck-ui': path.resolve(__dirname, '../../cdkteck-ui/src')
      } : {}
    },
    server: {
      port: 3002,
      open: true,
      fs: {
        // Allow serving files from two levels up to the project root
        allow: ['../..']
      }
    },
    optimizeDeps: {
      exclude: ['@cidqueiroz/cdkteck-ui']
    }
  }
});