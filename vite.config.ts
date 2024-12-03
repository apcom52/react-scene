import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: ['es2022'],
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: '@apcom/react-scene',
      formats: ['es'],
      fileName: 'index',
    },
  }
})
