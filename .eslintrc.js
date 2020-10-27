module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/no-use-before-define": ["error", "nofunc"],
    "@typescript-eslint/member-delimiter-style": ["error", { multiline: { delimiter: "none" } }],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/ban-ts-comment": ["off"],
  },
}
