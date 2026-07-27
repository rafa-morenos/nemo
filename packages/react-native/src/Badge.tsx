import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";

/**
 * Nemo Badge — RN port of the web Badge (the unified Tag/Chip). Same prop
 * surface as `packages/web/src/components/badge.tsx`: `color` × `type` cover
 * the Figma matrix (default/success/warning/critical/info/disabled/inverted ×
 * filled/outline/ghost/solid), plus `size` (sm/md), `shape` (pill/square) and
 * `count` (numeric counter — counter-tag/picking-amount).
 */
export type BadgeColor = "default" | "success" | "warning" | "critical" | "info" | "disabled" | "inverted";
export type BadgeType = "filled" | "outline" | "ghost" | "solid";
export type BadgeSize = "sm" | "md";
export type BadgeShape = "pill" | "square";

export interface BadgeProps {
  color?: BadgeColor;
  type?: BadgeType;
  size?: BadgeSize;
  shape?: BadgeShape;
  /** Leading glyph, e.g. a react-native-svg icon from `./icons`. Caller controls its color. */
  icon?: React.ReactNode;
  /** Status dot before the label. */
  dot?: boolean;
  /**
   * Numeric counter (counter-tag / picking-amount). Without `children`, the
   * badge renders as a standalone counter (defaults to `size="sm"`). With
   * `children`, the count appears as a trailing value. Caps at "99+".
   */
  count?: number;
  children?: React.ReactNode;
}

function formatCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

function bgFor(t: NemoTheme, color: BadgeColor, type: BadgeType) {
  if (type === "outline" || type === "ghost") return "transparent";
  switch (color) {
    case "default":
      return t.color.interactive.accent.primary.main;
    case "success":
      // "solid" == filled here on purpose: Figma's alias set never promoted
      // an "On Success" role (the white-on-strong-green foreground) — it
      // only exists in the raw Color Palette. Without it there's no token
      // for a strong-green solid look that stays legible in both themes.
      // Same story for warning/critical below. Revisit once Figma adds it.
      return t.color.surface.semantic.success;
    case "warning":
      return t.color.surface.semantic.warning;
    case "critical":
      return t.color.surface.semantic.critical;
    case "info":
      // No dedicated strong info tone (mirrors web: solid intentionally == filled).
      return t.color.surface.semantic.info;
    case "disabled":
      return t.color.surface.neutral.disabled;
    case "inverted":
      return t.color.surface.neutral.inverted;
  }
}

function fgFor(t: NemoTheme, color: BadgeColor, type: BadgeType) {
  switch (color) {
    case "default":
      return type === "outline" || type === "ghost" ? t.color.text.accent.primary : t.color.interactive.accent.primary.inverted;
    case "success":
      return t.color.text.semantic.success;
    case "warning":
      return t.color.text.semantic.warning;
    case "critical":
      return t.color.text.semantic.critical;
    case "info":
      return t.color.text.semantic.info;
    case "disabled":
      return t.color.text.neutral.tertiary;
    case "inverted":
      return t.color.text.neutral.inverted;
  }
}

function borderFor(t: NemoTheme, color: BadgeColor, type: BadgeType) {
  if (type !== "outline") return "transparent";
  switch (color) {
    case "default":
      return t.color.border.accent.primary;
    case "success":
      return t.color.border.semantic.success;
    case "warning":
      return t.color.border.semantic.warning;
    case "critical":
      return t.color.border.semantic.critical;
    case "info":
      return t.color.border.semantic.info;
    case "disabled":
      return t.color.border.neutral.disabled;
    case "inverted":
      return t.color.surface.neutral.inverted;
  }
}

export function Badge({
  color = "default",
  type = "filled",
  size,
  shape = "pill",
  icon,
  dot,
  count,
  children,
}: BadgeProps) {
  const t = useNemoTheme();
  const counterOnly = count != null && children == null;
  const effSize: BadgeSize = size ?? (counterOnly ? "sm" : "md");
  const bg = bgFor(t, color, type);
  const fg = fgFor(t, color, type);
  const border = borderFor(t, color, type);
  const sizing = effSize === "sm" ? sizes.sm : sizes.md;

  return (
    <View
      style={[
        styles.base,
        sizing.container,
        {
          backgroundColor: bg,
          borderColor: border,
          borderWidth: type === "outline" ? 1 : 0,
          borderRadius: shape === "pill" ? 500 : 8,
        },
        counterOnly && styles.counterOnly,
      ]}
    >
      {icon != null && !counterOnly && <View style={sizing.icon}>{icon}</View>}
      {dot && !counterOnly && <View style={[sizing.dot, { backgroundColor: fg, borderRadius: sizing.dot.width / 2 }]} />}
      <Text style={[sizing.text, { color: fg }]} numberOfLines={1}>
        {counterOnly ? formatCount(count!) : children}
      </Text>
      {count != null && children != null && (
        <Text style={[sizing.text, styles.countSuffix, { color: fg }]}>{formatCount(count)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start" },
  counterOnly: { minWidth: 20, justifyContent: "center" },
  countSuffix: { fontWeight: "700" },
});

// Font sizes mirror the `font-size-2` (12) / `font-size-1` (10) tokens by
// value — the generated RN theme only exports the color tree, not the font
// scale, so there's no `t.font.*` path to reference here directly.
const sizes = {
  md: StyleSheet.create({
    container: { paddingHorizontal: 10, paddingVertical: 2, gap: 4 },
    text: { fontSize: 12, fontWeight: "600" },
    icon: { width: 12, height: 12 },
    dot: { width: 6, height: 6 },
  }),
  sm: StyleSheet.create({
    container: { paddingHorizontal: 8, paddingVertical: 2, gap: 2 },
    text: { fontSize: 10, fontWeight: "600" },
    icon: { width: 10, height: 10 },
    dot: { width: 4, height: 4 },
  }),
};
