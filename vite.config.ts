import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5198,
    strictPort: false,
    host: '127.0.0.1',
    proxy: { '/api': process.env.ELWAFA_API_TARGET || 'http://127.0.0.1:5201' }
  },
  preview: {
    port: 4174,
    strictPort: false,
    host: '127.0.0.1',
    proxy: { '/api': process.env.ELWAFA_API_TARGET || 'http://127.0.0.1:5201' }
  }
});
