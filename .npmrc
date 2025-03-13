import { defineConfig } from 'cypress';

export default defineConfig({
  downloadsFolder: 'tests/cypress/downloads',
  fixturesFolder: 'tests/cypress/fixtures',
  reporter: 'mochawesome',
  reporterOptions: {
    overwrite: true,
    html: true,
    json: true,
    reportDir: 'tests/cypress/reports/json',
  },
  screenshotsFolder: 'tests/cypress/screenshots',
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  video: true,
  videosFolder: 'tests/cypress/videos',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/cypress/plugins')(on, config);
    },
    //baseUrl: 'http://localhost:3000',
    specPattern: 'tests/cypress/specs/*.js',
    supportFile: 'tests/cypress/support/index.ts',
  },
  component: {
    setupNodeEvents(on, config) {},
    specPattern: 'tests/cypress/component/*.spec.ts',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
  env: {
    'live-ca': 'https://www.audi.ca/ca/web/en',
    'live-us': 'https://www.audiusa.com/us/web/en',
    'all-offers-live-en': 'https://www.audi.ca/ca/web/en/promotions.html',
    'all-offers-live-fr': 'https://www.audi.ca/ca/web/fr/promotions.html',
    'all-offers-live-cn': 'https://www.audi.ca/ca/web/en/promotions-cn.html',
    'all-offers-staging-en': 'https://www.audi.ca/en/promotions/?environment=development',
    'all-offers-staging-fr': 'https://www.audi.ca/fr/promotions/?environment=development',
    'all-offers-staging-cn':
      'https://www.audi.ca/ca/web/en/test_pages/promotions-cn-staging.html?environment=development',
  },
});
