import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
    stylistic: {
      indent: 2,
      semi: false,
      quotes: 'single',
      jsx: true,
    },
    ignores: ['src/openapi/**', '**/*.md'],
  },
  {
    files: ['src/**/*{ts,tsx,js,jsx}'],
    rules: {
      'no-console': ['warn'],
      'node/prefer-global/process': ['off'],
      'react-hooks-extra/no-direct-set-state-in-use-effect': ['off'],
      'react/no-unstable-default-props': ['off'],
      'ts/consistent-type-definitions': ['error', 'type'],
      // 'antfu/no-top-level-await': ['off'],
      // 'node/prefer-global/process': ['off'],
      // 'unicorn/filename-case': 'off',
      // 'eslint-comments/no-unlimited-disable': 'off',
      // 'node/no-process-env': ['warn'],
      // 'no-unused-vars': ['warn'],
      // 'unused-imports/no-unused-vars': ['warn'],
      // 'perfectionist/sort-imports': ['warn'],
    },
  },
)
