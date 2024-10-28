module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testMatch: [
        '**/../global.e2e-spec.ts',
        '**/users/tests/*.e2e-spec.ts',
    ],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['*/.(t|j)s'],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
};
//# sourceMappingURL=jest.config.js.map