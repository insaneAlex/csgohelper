import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'nk6kgn',
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
