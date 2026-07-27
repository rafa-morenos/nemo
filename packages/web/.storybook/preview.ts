import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true }, // themes come from the .dark class, not bg addon
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Overview", "Colors", "Alias Colors", "Typography", "Radius & Spacing"],
          "Components",
        ],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
