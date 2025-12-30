import storybook from "eslint-plugin-storybook"
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import pluginImport from 'eslint-plugin-import'
import pluginA11y from 'eslint-plugin-jsx-a11y'
import unusedImports from 'eslint-plugin-unused-imports'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{ts,tsx,js,jsx}'],

        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
            globals: globals.browser,
        },

        plugins: {
            react: pluginReact,
            import: pluginImport,
            'jsx-a11y': pluginA11y,
            'unused-imports': unusedImports,
            prettier: prettierPlugin,
            'react-hooks': reactHooks,
            storybook: storybook
        },

        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            pluginReact.configs.flat.recommended,
        ],

        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true, // также ищет типы
                    project: './tsconfig.json',
                },
            },
        },

        rules: {
            ...pluginImport.flatConfigs.recommended.rules,
            ...pluginA11y.configs.strict.rules,
            // ...pluginReactHooks.configs.recommended.rules,
            /* --- TS --- */
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/explicit-function-return-type': 'warn',

            /* --- React --- */
            'react/prop-types': 'off', // TS вместо этого
            'react/self-closing-comp': 'error',
            'react/jsx-boolean-value': ['error', 'never'],
            'react/jsx-curly-brace-presence': [
                'error',
                { props: 'never', children: 'never' },
            ],

            /* --- React Hooks --- */
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',

            /* --- Imports --- */
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    pathGroups: [
                        {
                            pattern: 'app/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'pages/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'widgets/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'features/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'entities/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: 'shared/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin', 'external'],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    'newlines-between': 'always',
                },
            ],
            'import/no-default-export': 'off',

            /* --- Unused Imports --- */
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': 'off',

            /* --- Code Style --- */
            'prefer-const': 'error',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'object-shorthand': 'error',
            'arrow-body-style': ['error', 'as-needed'],

            /* --- A11y --- */
            'jsx-a11y/alt-text': 'error',
            'jsx-a11y/no-autofocus': 'error',

            /* --- Prettier --- */
            'prettier/prettier': [
                'error',
                {
                    semi: false,
                    tabWidth: 4
                },
            ],

            /* --- --- */
            semi: ['error', 'never'],
            'react/react-in-jsx-scope': 'off',
            'no-mixed-spaces-and-tabs': 'off',
            'react/display-name': 'off',
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/click-events-have-key-events': 'off'
        },
    },
    prettierConfig,
])
