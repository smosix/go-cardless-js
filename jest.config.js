// jest.config.js
const { defaults } = require("jest-config")
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  testRegex: ".*\\.test\\.tsx?$",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false, //DOES NOT TEST FOR TS ERRORS
    },
  },
}
