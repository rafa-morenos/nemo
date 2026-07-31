import * as React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { useNemoTheme } from "./theme";

/**
 * Nemo Separator — RN port of the web Separator (`@radix-ui/react-separator`).
 * Same `orientation`/`decorative` props; `decorative` (default `true`, same
 * as web) hides the divider from the accessibility tree via
 * `importantForAccessibility`, mirroring Radix's `aria-hidden` when
 * `decorative`.
 */
export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  style?: ViewStyle;
}

export function Separator({ orientation = "horizontal", decorative = true, style }: SeparatorProps) {
  const t = useNemoTheme();
  return (
    <View
      accessibilityElementsHidden={decorative}
      importantForAccessibility={decorative ? "no-hide-descendants" : "auto"}
      style={[
        { backgroundColor: t.color.border.neutral.main },
        orientation === "horizontal" ? styles.horizontal : styles.vertical,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: { height: StyleSheet.hairlineWidth, width: "100%" },
  vertical: { height: "100%", width: StyleSheet.hairlineWidth },
});
