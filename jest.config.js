module.exports = {
    testEnvironment: 'jsdom', // Simulates a browser environment
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Custom setup file
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS imports
    },
  };