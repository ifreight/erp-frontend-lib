import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathSrc = resolve(__dirname, './src');

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: '9001',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main-lib.js'),
      name: 'ErpFrontendLib',
      fileName: (format) => `erp-frontend-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // This will export both abstracts and all element plus variables to be accesible on all places
        // Note that all abstracts will have i namespace
        additionalData: `
          @use '${pathSrc}/assets/abstracts/index' as i;
        `,
        charset: false,
      },
    },
  },
});
