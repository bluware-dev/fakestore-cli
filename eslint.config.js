import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
	{
		files: ['**/*.js', '**/*.mjs'],

		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				console: 'readonly',
				fetch: 'readonly',
				process: 'readonly',
				__dirname: 'readonly',
				require: 'readonly',
			},
		},

		plugins: {
			import: importPlugin,
		},

		rules: {
			'import/order': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						['internal'],
						['parent', 'sibling', 'index'],
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
		},
	},
]);
