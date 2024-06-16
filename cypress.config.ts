import registerCodeCoverageTasks from "@cypress/code-coverage/task";
import { injectQuasarDevServerConfig } from "@quasar/quasar-app-extension-testing-e2e-cypress/cct-dev-server";
import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "test/cypress/fixtures",
  screenshotsFolder: "test/cypress/screenshots",
  videosFolder: "test/cypress/videos",
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);
      return config;
    },
    baseUrl: "http://localhost:8080/",
    supportFile: "test/cypress/support/e2e.ts",
    specPattern: "test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
  component: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);
      return config;
    },
    supportFile: "test/cypress/support/component.ts",
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    indexHtmlFile: "test/cypress/support/component-index.html",
    devServer: injectQuasarDevServerConfig(),
  },
  env: {
    API: "https://cdn.contentful.com/spaces/toyrnoec9oq8/environments/master/entries*",
  },
});
