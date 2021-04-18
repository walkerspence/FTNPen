module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:jest/recommended', 'plugin:prettier/recommended'],
  globals: {
    testHero: 'readonly',
    testPost: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-destructuring': ['error', { array: false, object: true }],
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/*.test.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'import/extensions': ['error', 'never'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        paths: ['./', 'components', 'types'],
      },
    },
  },
};
