module.exports = {
  globals: {
    __FEATURE_APP_NAME__: true,
    __FEATURE_APP_VERSION__: true,
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/test-setup.tsx'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(js|ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testRegex: '\\.(test)\\.(ts|tsx|js)?$',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@volkswagen-onehub/)'],
};
