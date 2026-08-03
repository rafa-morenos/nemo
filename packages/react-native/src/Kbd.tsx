import * as React from "react";
import { View, Text, StyleSheet, type ViewStyle } from "react-native";
import { useNemoTheme } from "./theme";

/**
 * Nemo Kbd / KbdGroup — RN port of the web Kbd
 * (`packages/web/src/components/kbd.tsx`). `Kbd` renders a keyboard-key
 * badge; `KbdGroup` is an inline row wrapper for chaining several
 * (e.g. "Ctrl" + "K").
 */
export interface KbdProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function Kbd({ children, style }: KbdProps) {
  const t = useNemoTheme();
  const content =
    typeof children === "string" || typeof children === "number" ? (
      <Text style={{ color: t.color.text.neutral.tertiary, fontSize: t.font.size["2"], fontWeight: "500" }}>
        {children}
      </Text>
    ) : (
      children
    );
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: t.color.surface.neutral.secondary,
          borderRadius: t.radius.sm,
          paddingHorizontal: t.space["25"],
          minWidth: t.space["125"],
          height: t.space["125"],
        },
        style,
      ]}
    >
      {content}
    </View>
  );
}

export function KbdGroup({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) {
  const t = useNemoTheme();
  return <View style={[styles.group, { gap: t.space["25"] }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: { flexDirection: "row", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" },
  group: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start" },
});
