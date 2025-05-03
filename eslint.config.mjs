import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  {
    ignores: [".next/*", "node_modules/*", ".vscode/*", "internals/*"]
  },
  {
    files: ["**/*.ts", "**/*.tsx"]
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    env: {
      browser: true,
      es2021: true
    },
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module"
    },
    overrides: [
      {
        files: ["*.js", "*.jsx"],
        rules: {
          "no-undef": "error" // Apply this rule only to JS/JSX files
        }
      }
    ],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json"
        }
      }
    },
    rules: {
      "import/no-unresolved": "error",
      "no-duplicate-imports": "error",
      "import/order": [
        "error",
        {
          groups: ["type", "builtin", "external", "internal", "parent", "sibling", "index"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          },
          "newlines-between": "always"
        }
      ]
    }
  })
];

export default eslintConfig;
