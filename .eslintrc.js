const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier', 'import', 'react-hooks'],
  parserOptions: {
    project: './tsconfig.json',
  },
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    jasmine: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: extensions,
      },
    },
  },
  globals: {
    __FEATURE_APP_NAME__: 'readonly',
    __FEATURE_APP_VERSION__: 'readonly',
    __DEBUG__: 'readonly',
  },
  rules: {
    'react/jsx-no-useless-fragment': 'off',
    'jsx-a11y/href-no-hash': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: extensions }],
    'max-len': [
      'warn',
      {
        code: 100,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-underscore-dangle': 0,
    'no-use-before-define': [0],
    'import/extensions': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/prop-types': 'warn',
    'import/prefer-default-export': 'off',
    'react/no-unstable-nested-components': 'off',
    '@typescript-eslint/no-unused-expressions': 'warn',
    'no-unused-expressions': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/no-unused-prop-types': ['warn'],
    '@typescript-eslint/no-explicit-any': ['warn'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@oneaudi/unified-web-common',
            importNames: ['GlobalStyles'],
            message:
              'Do not use <GlobalStyles> inside your feature app. It is provided by the platform and @oneaudi/static-demo-integrator@12.1.1 and above',
          },
        ],
      },
    ],
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: '@oneaudi/unified-ui-react',
            message:
              'Unified UI React is deprecated and replaced by @oneaudi/unified-web. The deprecation will be executed on 2025-01-01. See https://developer.one.audi/secure/Documentation/Deprecations/Active/Unified%20UI%20React%20v0.html',
          },
        ],
      },
    ],
  },
};
