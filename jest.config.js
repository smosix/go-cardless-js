module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    enableTsDiagnostics: true,
  },
  testRegex: "__tests__/.*\\.test\\.tsx?$",
  testURL: "http://localhost",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss)$":
      "identity-obj-proxy",
    "mobx-localstorage": "tests/mocks/mobx-localstorage.ts",
  },
  // collectCoverage: true,
  // coverageReporters: ["json", "html"],
  collectCoverageFrom: ["!src/**/*.d.ts", "src/**/*.{js,jsx,ts,tsx}"],
  setupFiles: ["./src/tests/setup.ts"],
  // globalSetup: "./src/tests/gobalSetup.ts",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false, //DOES NOT TEST FOR TS ERRORS
    },
    // __TRANSFORM_HTML__: true,
  },

  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./src/tests/reports/test-report.html",
        includeFailureMsg: true,
      },
    ],
  ],
}
module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    enableTsDiagnostics: true,
  },
  testRegex: "__tests__/.*\\.test\\.tsx?$",
  testURL: "http://localhost",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss)$":
      "identity-obj-proxy",
  },
  // collectCoverage: true,
  // coverageReporters: ["json", "html"],
  collectCoverageFrom: ["!src/**/*.d.ts", "src/**/*.{js,jsx,ts,tsx}"],
  // globalSetup: "./src/tests/gobalSetup.ts",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false, //DOES NOT TEST FOR TS ERRORS
    },
    // __TRANSFORM_HTML__: true,
  },

  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./src/tests/reports/test-report.html",
        includeFailureMsg: true,
      },
    ],
  ],
}
