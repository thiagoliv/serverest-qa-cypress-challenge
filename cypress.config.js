const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      config.env.apiUrl = config.env.apiUrl || 'https://serverest.dev';
      return config;
    }
  },
  viewportWidth: 1440,
  viewportHeight: 900,
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: true,
  requestTimeout: 15000,
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 1,
    openMode: 0
  }
});
