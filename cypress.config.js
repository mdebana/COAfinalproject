const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // require("cypress-mochawesome-reporter")(on);
    },
    supportFile: "cypress/support/e2e.js",
    defaultCommandTimeout: 30000, // dalam milisecond (30 detik)
    env: {
      AGODA_URL: "https://www.agoda.com/",
      AMAZON_URL: "https://www.amazon.com/",
      YOUTUBE_URL: "https://www.youtube.com/",
      firstName: "Mochamad",
			lastName: "Deban",
			email: "m.debanazaria@gmail.com",
			phone: "89671539813",
      passport: "12345678",
      departure: "Jakarta",
      arrival: "Singapore",
      amazonSearch: "chair"
    },
    video: true,
  }
});