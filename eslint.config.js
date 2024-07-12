import globals from "globals";
import reactCompilerPlugin from "eslint-plugin-react-compiler";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import hooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import js from "@eslint/js";

export default [
  {
    ignores: ["eslint.config.cjs", "dist"],
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-compiler": reactCompilerPlugin,
      "react-hooks": hooksPlugin,
      "@typescript-eslint": tseslint,
      prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      // parserOptions: {
      //   ecmaFeatures: {
      //     jsx: true,
      //   },
      // },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": ["error"],
      "react-compiler/react-compiler": ["error"],
    },
  },
];
