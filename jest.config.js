module.exports = {
  testMatch: ['**/test/step_definitions/**/*.steps.js'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/setup/testSetup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@cucumber)'
  ],
};