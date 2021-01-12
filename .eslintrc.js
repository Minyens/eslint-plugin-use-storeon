module.exports = {
  env: {
    es6: true
  },
  extends: [
    'standard'
  ],
  globals: {
    describe: 'readonly',
    it: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    allowTemplateLiterals: true
  }
}
