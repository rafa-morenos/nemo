import * as React from "react";
import { View, Text, StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import { useNemoTheme, nemoCardShadow, type NemoTheme } from "./theme";
import { nemoFontFamily } from "./fonts";

/**
 * Card — RN port of the web `Card`/`CardHeader`/`CardTitle`/`CardDescription`/
 * `CardContent`/`CardFooter` (shadcn structure, Nemo tokens). Same compound
 * pattern as `ProductCard.tsx`: one export per slot, no context/registration.
 *
 * `CardTitle`/`CardDescription` are plain styled `Text` (not the shared
 * `Typography` component) because the web versions don't route through the
 * `Text`/`textVariants` primitive either — they're inline Tailwind classes
 * with their own size/weight, so this mirrors that directly instead of
 * approximating via a `Typography` variant with a different weight/family.
 */
type ViewProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle> };
type TextProps = { children?: React.ReactNode; style?: StyleProp<TextStyle> };

export function Card({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.card, nemoCardShadow, style]}>{children}</View>;
}

export function CardHeader({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.header, style]}>{children}</View>;
}

export function CardTitle({ children, style }: TextProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <Text style={[s.title, style]}>{children}</Text>;
}

export function CardDescription({ children, style }: TextProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <Text style={[s.description, style]}>{children}</Text>;
}

export function CardContent({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.content, style]}>{children}</View>;
}

export function CardFooter({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.footer, style]}>{children}</View>;
}

// RN's `fontWeight` style prop takes a string; `t.font.weight.*` is numeric.
const fw = (n: number) => String(n) as TextStyle["fontWeight"];

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    card: {
      borderRadius: t.radius.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: t.color.border.neutral.main,
      backgroundColor: t.color.surface.neutral.tertiary,
    },
    header: { flexDirection: "column", gap: t.space["25"], padding: t.space["150"] },
    // text-lg font-semibold leading-tight — no font-heading class on web, so
    // this inherits the base sans stack (Inter), not the Owners Text heading font.
    title: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["6"],
      fontWeight: fw(t.font.weight["semi-bold"]),
      lineHeight: t.font.size["6"] * 1.25,
      color: t.color.text.neutral.primary,
    },
    description: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.regular),
      color: t.color.text.neutral.tertiary,
    },
    content: { padding: t.space["150"], paddingTop: 0 },
    footer: { flexDirection: "row", alignItems: "center", padding: t.space["150"], paddingTop: 0 },
  });
}
