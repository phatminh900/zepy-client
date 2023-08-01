module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react-refresh/only-export-components": "warn",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    // allow jsx syntax in js files (for next.js project)
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ], //should add ".ts" if typescript project
  },
};
