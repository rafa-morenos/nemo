import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";

/**
 * Nemo Badge — RN port of the web Badge (the unified Tag/Chip). Same prop
 * surface as `packages/web/src/components/badge.tsx`: `color` × `variant` cover
 * the Figma matrix (normal/success/warning/critical/info/disabled/inverted ×
 * filled/outline/ghost/solid), plus `size` (sm/md), `shape` (pill/square) and
 * `count` (numeric counter — counter-tag/picking-amount).
 */
export type BadgeColor = "normal" | "success" | "warning" | "critical" | "info" | "disabled" | "inverted";
export type BadgeVariant = "filled" | "outline" | "ghost" | "solid";
export type BadgeSize = "sm" | "md";
export type BadgeShape = "pill" | "square";

export interface BadgeProps {
  color?: BadgeColor;
  variant?: BadgeVariant;
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

/**
 * "solid" backgrounds for success/warning/critical pair the icon-tone bg
 * (`icon.semantic.*`, same tone `button.tsx`'s destructive variant uses) with
 * `text.neutral.inverted` as the foreground — mirrors web's `bg-success
 * text-success-foreground` (tailwind.preset.js). Figma never promoted an
 * "On <Hue>" role for these, but `text.neutral.inverted` tonal-flips in the
 * matching direction (near-white in light mode, near-black in dark mode) as
 * the icon tone does, so contrast holds in both themes with real aliases —
 * no pinned primitive needed.
 */
function bgFor(t: NemoTheme, color: BadgeColor, variant: BadgeVariant) {
  if (variant === "outline" || variant === "ghost") return "transparent";
  const solid = variant === "solid";
  switch (color) {
    case "normal":
      return t.color.interactive.accent.primary.main;
    case "success":
      return solid ? t.color.icon.semantic.success : t.color.surface.semantic.success;
    case "warning":
      return solid ? t.color.icon.semantic.warning : t.color.surface.semantic.warning;
    case "critical":
      return solid ? t.color.icon.semantic.critical : t.color.surface.semantic.critical;
    case "info":
      // No dedicated strong info tone (mirrors web: solid intentionally == filled).
      return t.color.surface.semantic.info;
    case "disabled":
      return t.color.surface.neutral.disabled;
    case "inverted":
      return t.color.surface.neutral.inverted;
  }
}

function fgFor(t: NemoTheme, color: BadgeColor, variant: BadgeVariant) {
  const solid = variant === "solid";
  switch (color) {
    case "normal":
      return variant === "outline" || variant === "ghost" ? t.color.text.accent.primary : t.color.interactive.accent.primary.inverted;
    case "success":
      return solid ? t.color.text.neutral.inverted : t.color.text.semantic.success;
    case "warning":
      return solid ? t.color.text.neutral.inverted : t.color.text.semantic.warning;
    case "critical":
      return solid ? t.color.text.neutral.inverted : t.color.text.semantic.critical;
    case "info":
      return t.color.text.semantic.info;
    case "disabled":
      return t.color.text.neutral.tertiary;
    case "inverted":
      return t.color.text.neutral.inverted;
  }
}

function borderFor(t: NemoTheme, color: BadgeColor, variant: BadgeVariant) {
  if (variant !== "outline") return "transparent";
  switch (color) {
    case "normal":
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
  color = "normal",
  variant = "filled",
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
  const bg = bgFor(t, color, variant);
  const fg = fgFor(t, color, variant);
  const border = borderFor(t, color, variant);
  const sizing = sizesFor(t, effSize);

  return (
    <View
      style={[
        styles.base,
        sizing.container,
        {
          backgroundColor: bg,
          borderColor: border,
          borderWidth: variant === "outline" ? t.borderWidth.sm : 0,
          borderRadius: shape === "pill" ? t.radius.pill : t.radius.md,
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

/**
 * `md`'s paddingHorizontal (10) and the dot sizes have no matching
 * `t.space.*` step — same as web, where `px-2.5` sits on Tailwind's
 * untouched default scale rather than a named Nemo token; kept as literals
 * here for the same reason, not a missed token.
 */
function sizesFor(t: NemoTheme, size: BadgeSize) {
  return size === "md"
    ? {
        container: { paddingHorizontal: 10, paddingVertical: t.space["12"], gap: t.space["25"] },
        text: { fontSize: t.font.size["2"], fontWeight: String(t.font.weight["semi-bold"]) as "600" },
        icon: { width: t.space["75"], height: t.space["75"] },
        dot: { width: 6, height: 6 },
      }
    : {
        container: { paddingHorizontal: 8, paddingVertical: t.space["12"], gap: t.space["12"] },
        text: { fontSize: t.font.size["1"], fontWeight: String(t.font.weight["semi-bold"]) as "600" },
        icon: { width: 10, height: 10 },
        dot: { width: 4, height: 4 },
      };
}
