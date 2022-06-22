module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/essential", "@vue/prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },

  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "vue/no-multiple-template-root": 0,
  },
};
