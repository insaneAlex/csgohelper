const nextJest = require('next/jest');
const createJestConfig = nextJest({dir: './'});

const customJestConfig = {
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
    '!**/index.ts',
    '!**/types.ts',
    '!**/constants.ts',
    '!<rootDir>/src/**/index.tsx',
    '!<rootDir>/pages/_*.tsx',
    '!<rootDir>/src/services/environment.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/src/redux/features': '<rootDir>/src/redux/features',
    '^@/src/services': '<rootDir>/src/services',
    '^@/core': '<rootDir>/core',
  },

  testEnvironment: 'jest-environment-jsdom'
};

module.exports = createJestConfig(customJestConfig);
