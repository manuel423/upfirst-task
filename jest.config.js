module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/*.test.ts', '**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    coveragePathIgnorePatterns: ['/node_modules/'],
    testPathIgnorePatterns: ['/node_modules/'],
};