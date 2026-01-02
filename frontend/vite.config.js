import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Aponta para a pasta src inteira para melhor resolução de módulos
      '@cidqueiroz/cdkteck-ui': path.resolve(__dirname, '../../cdkteck-ui/src'),
    }
  },
  server: {
    port: 3002,
    open: true,
    fs: {
      // Permite que o Vite acesse a pasta raiz do projeto
      allow: ['../..']
    }
  },
  optimizeDeps: {
    // Exclui o pacote linkado da pré-otimização do Vite
    exclude: ['@cidqueiroz/cdkteck-ui']
  }
});