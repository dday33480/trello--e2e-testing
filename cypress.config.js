const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalOriginDependencies: true,
    video: true,
    env: {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD
    }
  },
});
