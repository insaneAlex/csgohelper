import {defineConfig} from 'cypress';

export default defineConfig({
  projectId: 'nk6kgn',

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  },

  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    }
  }
});
