module.exports = {
  extends: [
    "next",
    "prettier",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["simple-import-sort", "prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": ["error"],
    "prefer-const": "error",
    "no-irregular-whitespace": "error",
    "no-trailing-spaces": "error",
    semi: "error",
    "no-empty-function": "error",
    "no-duplicate-imports": "error",
    "newline-after-var": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
    "@typescript-eslint/ban-ts-comment": "off",
  },
};
