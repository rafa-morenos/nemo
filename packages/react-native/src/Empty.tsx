import * as React from "react";
import { View, Text, StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { nemoFontFamily } from "./fonts";

/**
 * Empty — RN port of the shadcn/ui Empty API (`Empty`, `EmptyHeader`,
 * `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`). Same
 * compound pattern as `ProductCard.tsx`.
 *
 * `EmptyTitle`/`EmptyDescription` are plain styled `Text` (not the shared
 * `Typography` component) — the web versions are inline Tailwind classes
 * with no `font-heading` class, so they inherit the base sans stack (Inter),
 * not Owners Text; using `Typography`'s `h3` variant here would wrongly pull
 * in the heading font.
 */
type ViewProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle> };
type TextProps = { children?: React.ReactNode; style?: StyleProp<TextStyle> };

export function Empty({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.empty, style]}>{children}</View>;
}

export function EmptyHeader({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.header, style]}>{children}</View>;
}

export type EmptyMediaVariant = "default" | "icon";

export interface EmptyMediaProps extends ViewProps {
  variant?: EmptyMediaVariant;
}

/**
 * `variant="icon"` gives the media slot a filled square backdrop; the icon
 * itself is passed as `children` and must set its own color (RN has no
 * `currentColor` cascade — web's `text-foreground` on the wrapper only
 * worked because SVG icons inherit `currentColor`).
 */
export function EmptyMedia({ children, style, variant = "default" }: EmptyMediaProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.media, variant === "icon" && s.mediaIcon, style]}>{children}</View>;
}

export function EmptyTitle({ children, style }: TextProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <Text style={[s.title, style]}>{children}</Text>;
}

export function EmptyDescription({ children, style }: TextProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <Text style={[s.description, style]}>{children}</Text>;
}

export function EmptyContent({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.content, style]}>{children}</View>;
}

// RN's `fontWeight` style prop takes a string; `t.font.weight.*` is numeric.
const fw = (n: number) => String(n) as TextStyle["fontWeight"];

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    // Web's `border-dashed` never actually renders (Tailwind's preflight
    // zeroes border-width, and Empty never adds an explicit `border` width
    // class) — so no border here either, same effective look.
    empty: {
      minWidth: 0,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: t.space["150"],
      borderRadius: t.radius.lg,
      padding: t.space["150"],
    },
    // max-w-sm (384px) isn't on the space scale — arbitrary Tailwind value on web too.
    header: { maxWidth: 384, flexDirection: "column", alignItems: "center", gap: t.space["50"] },
    media: { alignItems: "center", justifyContent: "center", marginBottom: t.space["50"] },
    mediaIcon: {
      width: t.space["250"],
      height: t.space["250"],
      borderRadius: t.radius.lg,
      backgroundColor: t.color.surface.neutral.secondary,
    },
    // text-lg font-medium tracking-tight — no font-heading class, base sans stack.
    title: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["6"],
      fontWeight: fw(t.font.weight.medium),
      letterSpacing: -t.font.size["6"] * 0.02,
      color: t.color.text.neutral.primary,
      textAlign: "center",
    },
    description: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.regular),
      color: t.color.text.neutral.tertiary,
      textAlign: "center",
    },
    content: {
      width: "100%",
      maxWidth: 384,
      minWidth: 0,
      flexDirection: "column",
      alignItems: "center",
      gap: t.space["50"],
    },
  });
}
