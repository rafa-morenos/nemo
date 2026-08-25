import * as React from "react";
import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import type { Preview } from "@storybook/react-native";
import { NemoThemeProvider, useNemoTheme } from "@nemo/react-native";
import { Platform, View } from "react-native";

// fix for actions on web
if (Platform.OS === "web") {
  // @ts-ignore
  global.ProgressTransitionRegister = {};
  // @ts-ignore
  global.UpdatePropsManager = {};
}

function ThemedFrame({ children }: { children: React.ReactNode }) {
  const t = useNemoTheme();
  return (
    <View style={{ flex: 1, backgroundColor: t.color.surface.neutral.primary }}>{children}</View>
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
  decorators: [withNemoTheme, withBackgrounds],

  parameters: {
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "white" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    // No `matchers.color` here on purpose: Nemo's `color` props (Badge, etc.) are
    // semantic string enums, not literal color values — the template's default
    // "any prop named color/background" matcher was forcing a color-picker
    // control onto them instead of the `select` control set via `argTypes`.
    controls: {
      matchers: {
        date: /Date$/,
      },
    },
  },
};

export default preview;
