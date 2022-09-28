const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'c4js1r',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl": "https://pushing-front.vercel.app/"
  },
});
