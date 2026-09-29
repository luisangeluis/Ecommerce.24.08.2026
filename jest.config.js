module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["@swc/jest"],
    },

    testMatch: [
        "**/*.test.ts",
        "**/*.spec.ts",
    ],
};