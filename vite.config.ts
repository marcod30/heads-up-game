import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: funciona igual en la raíz de un dominio que en GitHub Pages (/heads-up-game/)
export default defineConfig({
  base: './',
  plugins: [react()],
});
