module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict'
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-tsdoc'
    ],
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
    "tsdoc/syntax": "warn"
    },
    root: true,
  };