import * as React from "react";
import type { Preview } from "@storybook/react-native";
import { NemoThemeProvider, useNemoTheme } from "@nemo/react-native";
import { View } from "react-native";

function ThemedFrame({ children }: { children: React.ReactNode }) {
  const t = useNemoTheme();
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: t.color.surface.neutral.primary }}>
      {children}
    </View>
  );
}

const withNemoTheme = (Story: React.ComponentType) => (
  <NemoThemeProvider scheme="light">
    <ThemedFrame>
      <Story />
    </ThemedFrame>
  </NemoThemeProvider>
);

const preview: Preview = {
  decorators: [withNemoTheme],

  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    // No `matchers.color`: Nemo's `color` props are semantic string enums, not
    // literal color values — see `.rnstorybook/preview.tsx` for the same fix.
    controls: {
      matchers: {
        date: /Date$/,
      },
    },
  },

  tags: ["autodocs"],
};

export default preview;
