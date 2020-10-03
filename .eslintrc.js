module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react-hooks", "@emotion"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    "@emotion/pkg-renaming": 2,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
      },
    ],
    // Errors
    "@emotion/no-vanilla": 2,
    "@emotion/import-from-emotion": 2,
    "@emotion/styled-import": 2,
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/no-var-requires": 2,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 2,
    // Allowed
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "react/prop-types": 0,
    "react/no-unescaped-entities": 0,
    "react/display-name": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
