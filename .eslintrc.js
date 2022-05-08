module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: [2, 'never'],
    'linebreak-style': 0,
    'import/extensions': ['error', 'always', { ignorePackages: true }],
  },
}
