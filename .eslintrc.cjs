module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: [
    'node_modules/**',
    'dist/**',
    '**/*.spec.ts',
    '**/*.test.ts',
    '**/*.d.ts',
    '**/*.js',
    '**/*.mjs',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'unused-imports'],
  overrides: [
    {
      files: ['src/**/*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
    },
  ],
  rules: {
    // Basic rules for all files
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // Code Quality
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-throw-literal': 'error',
    'require-await': 'error',

    '@typescript-eslint/no-empty-object-type': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
      rules: {
        // TypeScript - Strenge Typisierung (only for src files)
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
          },
        ],
        '@typescript-eslint/strict-boolean-expressions': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
      },
    },
  ],
};