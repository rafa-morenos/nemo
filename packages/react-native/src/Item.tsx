import * as React from "react";
import { View, Text, StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { nemoFontFamily } from "./fonts";

/**
 * Item — RN port of the shadcn/ui Item API (`Item`, `ItemGroup`, `ItemMedia`,
 * `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`,
 * `ItemFooter`, `ItemSeparator`). A list-row primitive, same compound pattern
 * as `ProductCard.tsx`. Web's `focus-visible:ring-2` (keyboard focus ring) has
 * no RN equivalent for a plain (non-Pressable) `Item` root — this is layout
 * only, not an interactive control.
 */
type ViewProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle> };
type TextProps = { children?: React.ReactNode; style?: StyleProp<TextStyle> };

const fw = (n: number) => String(n) as TextStyle["fontWeight"];

export type ItemVariant = "default" | "outline" | "muted";
export type ItemSize = "default" | "sm";

export interface ItemProps extends ViewProps {
  variant?: ItemVariant;
  size?: ItemSize;
}

export function Item({ children, style, variant = "default", size = "default" }: ItemProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View
      style={[
        s.item,
        size === "sm" ? s.itemSm : s.itemDefault,
        variant === "outline" && s.itemOutline,
        variant === "muted" && s.itemMuted,
        variant === "default" && s.itemDefaultBg,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function ItemGroup({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View accessibilityRole="list" style={[s.itemGroup, style]}>
      {children}
    </View>
  );
}

export function ItemMedia({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.itemMedia, style]}>{children}</View>;
}

export function ItemContent({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.itemContent, style]}>{children}</View>;
}

/** Web's `flex items-center gap-2` lets a title hold an icon + text; only
 * plain string children are auto-wrapped in `Text` (see `FieldLabel`'s
 * doc comment in `Field.tsx` for the same RN Text-nesting constraint). */
export function ItemTitle({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.itemTitleRow, style]}>
      {typeof children === "string" ? <Text style={s.itemTitleText}>{children}</Text> : children}
    </View>
  );
}

export interface ItemDescriptionProps extends TextProps {
  numberOfLines?: number;
}

export function ItemDescription({ children, style, numberOfLines = 2 }: ItemDescriptionProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <Text style={[s.itemDescription, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export function ItemActions({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.itemActions, style]}>{children}</View>;
}

export function ItemHeader({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.itemHeaderFooter, style]}>{children}</View>;
}

export function ItemFooter({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.itemHeaderFooter, style]}>{children}</View>;
}

export function ItemSeparator({ style }: { style?: StyleProp<ViewStyle> }) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View accessibilityRole="none" style={[s.itemSeparator, style]} />;
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    item: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: t.space["75"],
      borderRadius: t.radius.md,
      borderWidth: StyleSheet.hairlineWidth,
    },
    itemDefault: { padding: t.space["75"] },
    // gap-2.5/p-2.5 (10px) aren't on the space scale — arbitrary Tailwind values on web too.
    itemSm: { gap: 10, padding: 10 },
    itemDefaultBg: { borderColor: "transparent", backgroundColor: t.color.surface.neutral.tertiary },
    itemOutline: { borderColor: t.color.border.neutral.main },
    itemMuted: { borderColor: "transparent", backgroundColor: t.color.surface.neutral.secondary },
    itemGroup: { flexDirection: "column" },
    itemMedia: { alignItems: "center", justifyContent: "center" },
    // gap-0.5 (2px) isn't on the space scale — arbitrary Tailwind value on web too.
    itemContent: { flex: 1, flexDirection: "column", gap: 2 },
    itemTitleRow: { flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    itemTitleText: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.medium),
      color: t.color.text.neutral.primary,
    },
    itemDescription: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.regular),
      color: t.color.text.neutral.tertiary,
    },
    itemActions: { marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    itemHeaderFooter: { width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: t.space["50"] },
    itemSeparator: { width: "100%", height: StyleSheet.hairlineWidth, backgroundColor: t.color.border.neutral.main },
  });
}
