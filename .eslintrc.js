module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/extensions": ["error", "always"],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-param-reassign": ["error", { props: false }],
  },
};
