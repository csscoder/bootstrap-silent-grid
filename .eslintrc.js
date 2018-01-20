module.exports = {
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
  },
  'globals': {
    Vue: 1,
    window: 1,
    document: 1,
  },
  'extends': ['eslint:recommended'],
  'rules': {
    'indent': ["error", 2],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'no-cond-assign': ['error', 'always'],
    'no-constant-condition': ['error', { 'checkLoops': false }],
    'no-console': 'off'
  }
};
