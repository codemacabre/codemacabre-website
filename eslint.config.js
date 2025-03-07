import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,astro}']
  },
  {
    ignores: [
      '**/env.d.ts',
      '**/.astro/',
      'dist/**/*',
      'node_modules/**/*'
    ]
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic
    }
  },
  {
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      'astro/semi': ['error', 'always'],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error'
    }
  }
];
