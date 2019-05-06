module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'no-empty': ['error', {
      'allowEmptyCatch': true,
    }],
    'no-return-await': 2,
    'no-throw-literal': 'error',
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: false
    }],
    semi: [2, 'always'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'always'
    }]
  }
};
