module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "env": {
    "browser": true
  },
  "settings": {
    "webpack": {
      "config": "webpack.config.ts"
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "rules": {
    "import/extensions": [2, "never", {"web.js": "never", "json": "never"}],
    "import/no-unresolved": [2, {"ignore": ["antd-mobile"]}],
    "max-len": [0, 80, 4],//字符串最大长度
    "no-console": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-var-requires": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  }
};
