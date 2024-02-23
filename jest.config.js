module.exports = {
    moduleNameMapper: {
        '^@/util/clients/subGoalsClient': '<rootDir>/util/clients/subGoalsClient',
        '^@/util/clients/mainGoalsClient': '<rootDir>/util/clients/mainGoalsClient',
        '^@emoji-mart/react': '<rootDir>/node_modules/@emoji-mart/react',
    },
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
      },
    
}