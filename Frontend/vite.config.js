import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    },
    define: {
      'import.meta.env.VITE_NEWS_API_KEY': JSON.stringify(env.VITE_NEWS_API_KEY),
      'import.meta.env.VITE_COINRANKING_API_KEY': JSON.stringify(env.VITE_COINRANKING_API_KEY),
      'import.meta.env.VITE_CRYPTOCOMPARE_API_KEY': JSON.stringify(env.VITE_CRYPTOCOMPARE_API_KEY)
    },
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  };
});