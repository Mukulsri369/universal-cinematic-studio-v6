import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: '0.0.0.0', port: 3000, strictPort: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) return 'vendor-three';
          if (id.includes('node_modules/@react-three/') || id.includes('node_modules/postprocessing/')) return 'vendor-r3f';
          if (id.includes('node_modules/gsap/') || id.includes('node_modules/motion/') || id.includes('node_modules/lenis/')) return 'vendor-motion';
          if (id.includes('node_modules/@radix-ui/')) return 'vendor-radix';
        },
      },
    },
  },
});
