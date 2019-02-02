module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
    'no-throw-literal': 'error',
    'no-return-await': 2,
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'always',
      },
    ],
    semi: [
      2,
      'always',
    ],
  },
};
