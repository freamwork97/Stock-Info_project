import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/stock': 'http://localhost:8000',
      '/get_stock_price': 'http://localhost:8000',
      '/company_names': 'http://localhost:8000',
      '/financial_statements': 'http://localhost:8000',
      '/predict_stock': 'http://localhost:8000',
      '/news': 'http://localhost:8000',
      '/key_index': 'http://localhost:8000',
      '/exchange_rate': 'http://localhost:8000',
      '/post': 'http://localhost:8000',
    },
  },
  build: {
    outDir: 'dist',
  },
});
