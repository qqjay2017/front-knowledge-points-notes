module.exports = {
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\jsx?$": "babel-jest",
    "^.+\\tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/src/components$1",
  },
  testMatch: ["**/tests/unit/**/*.[jt]s?(x)"],
};
