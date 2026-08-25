import type { StorybookConfig } from "@storybook/react-native-web-vite";

const main: StorybookConfig = {
  stories: [
    "../../src/**/*.stories.mdx",
    "../../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: ["@storybook/addon-docs", "@chromatic-com/storybook"],

  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },

  // Stories live in the sibling `@nemo/react-native` package (symlinked via
  // `file:..`), not inside this app — known limitation: `build-storybook`
  // (the web/Vite preview) still fails to resolve "react-native-web" for
  // files outside this app's real path, even with `preserveSymlinks`. The
  // primary target — on-device `@storybook/react-native` via Metro
  // (`npm run storybook`) — bundles these same stories fine (verified via
  // `expo export -p web`, which also goes through Metro, not Vite).
  viteFinal: async (config) => {
    config.resolve = { ...config.resolve, preserveSymlinks: true };
    return config;
  },
};

export default main;
