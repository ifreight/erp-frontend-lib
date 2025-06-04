import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import { dirname, resolve } from 'path';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssCustomProperties from 'postcss-custom-properties';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathSrc = resolve(__dirname, './src');

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss({
      // Add explicit configuration if needed
      configPath: './tailwind.config.js',
    }),
  ],
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
        additionalData: `@use '${pathSrc}/assets/abstracts/index.css';`,
        charset: false,
      },
    },
    postcss: {
      plugins: [
        // The postcssGlobalData plugin works on processed CSS
        // So we need to preprocess the SCSS file
        postcssGlobalData({
          files: [
            // Path to your CSS variables SCSS file
            // Make sure this path is processed by SCSS first
            './src/assets/abstracts/index.css',
          ],
        }),
        postcssCustomProperties({
          preserve: false, // Set to false to replace variables with their values
        }),
        {
          postcssPlugin: 'fix-tailwind-color-mix',
          Declaration(decl) {
            if (decl.value.includes('color-mix') && /#[0-9a-fA-F]{6}\d+%/.test(decl.value)) {
              decl.value = decl.value.replace(/(#[0-9a-fA-F]{6})(\d+%)/g, '$1 $2');
            }
          }
        }
      ],
    },
  },
});
