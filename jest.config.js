module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      '^@models/(.*)$': '<rootDir>/src/models/$1',
    },
    testMatch: [
      '<rootDir>/tests/**/*.test.ts',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/app.ts',
      '!<rootDir>/src/routes.ts',
      '!<rootDir>/src/server.ts',
      '!<rootDir>/src/models/**/*.ts',
      '!<rootDir>/src/controllers/**/*.ts',
      '!<rootDir>/src/services/**/*.ts',
    ],
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['lcov', 'text', 'html'],
  };
  