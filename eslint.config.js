import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import process from 'node:process';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn', // Warns about console.log
      'no-unused-vars': [
        process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        {
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^ignore',
        },
      ],
      'vue/multi-word-component-names': 'off',
    },
  },
];
