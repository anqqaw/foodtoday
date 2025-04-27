module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  globalSetup: '<rootDir>/tests/globalSetup.ts',
  globalTeardown: '<rootDir>/tests/globalTeardown.ts',
  setupFiles: ['<rootDir>/tests/setup.ts'],
};
