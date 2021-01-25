module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest:true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-use-before-define": [2, {"functions": false, "classes": true}],
    "indent": ["error", 4],
    "max-len": ["error", { "code": 120, "ignoreComments": true }],
  },
};
