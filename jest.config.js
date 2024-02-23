const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  //moduleFileExtensions: ["js", "jsx"],
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

module.exports = {
  moduleNameMapper: {
    "^@/util/clients/subGoalsClient": "<rootDir>/util/clients/subGoalsClient",
    "^@/util/clients/mainGoalsClient": "<rootDir>/util/clients/mainGoalsClient",
    "^@/ionic/react": "<rootDir>/ionic/react",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
