module.exports = {
	"extends": ["airbnb-base", "plugin:@typescript-eslint/recommended"],
	"parser": "@typescript-eslint/parser",
	"plugins": ["@typescript-eslint"],
	"rules": {
		"no-console": "off",
		"@typescript-eslint/indent": ["error", 2],
		"@typescript-eslint/no-var-requires": "off",
		"import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
	}
};
