import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/social_cred/', // Ensures assets and routing use this prefix
  plugins: [react()],
  server: {
    port: 5047,
    proxy: {
      '/api': {
        target: 'http://localhost:5700/social_credit',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
