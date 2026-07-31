import * as React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { useNemoTheme } from "./theme";

/**
 * Nemo Progress — RN port of the web Progress (`@radix-ui/react-progress`).
 * `value` is 0–100, same as the web prop (Radix defaults an undefined value
 * to 0). No indeterminate state — same as the web component (Radix Progress
 * always needs an explicit `value`).
 */
export interface ProgressProps {
  value?: number;
  style?: ViewStyle;
}

export function Progress({ value = 0, style }: ProgressProps) {
  const t = useNemoTheme();
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
      style={[
        styles.track,
        {
          backgroundColor: t.color.surface.neutral.secondary,
          borderRadius: t.radius.pill,
          height: t.space["50"],
        },
        style,
      ]}
    >
      <View
        style={[
          styles.indicator,
          { width: `${clamped}%`, backgroundColor: t.color.interactive.accent.primary.main, borderRadius: t.radius.pill },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: "100%", overflow: "hidden" },
  indicator: { height: "100%" },
});
