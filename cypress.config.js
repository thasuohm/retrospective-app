import {defineConfig} from 'cypress'

const baseUrl = 'http://localhost:3000'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl,
  },
})
