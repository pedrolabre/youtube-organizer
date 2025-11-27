import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', 
  server: {
    // Usa a porta 3000, mas permite que o Vite use a próxima livre se houver conflito
    port: 3000, 
    // O 'open: true' tenta abrir o navegador automaticamente
    open: true, 
    // ESSA LINHA FORÇA O VITE A OUVIR EM TODAS AS INTERFACES (resolve problemas de localhost)
    host: true 
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});