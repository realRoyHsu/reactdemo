export default {
  parser: "@typescript-eslint/parser",
  extends: [
    "react-app",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/babel",
    "prettier/react",
    "prettier/standard",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "babel", "react", "standard", "react-hooks"],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/interface-name-prefix": [
      "off",
      {
        prefixWithI: "awalys",
        allowUnderscorePrefix: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": [
      "off",
      {
        ignoreRestArgs: false,
      },
    ],
    "react/display-name": [
      "off",
      {
        ignoreTranspilerName: false,
      },
    ],
    "@typescript-eslint/no-empty-interface": [
      "off",
      {
        allowSingleExtends: false,
      },
    ],
  },
};
