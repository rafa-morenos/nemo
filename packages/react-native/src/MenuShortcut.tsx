import * as React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  type ViewProps,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";

/**
 * MenuShortcutItem / MenuShortcutList — RN port of
 * `packages/web/src/components/menu-shortcut.tsx`: home-screen quick actions
 * ("Pedir novamente", "Favoritos") — a circular icon chip (bigger than
 * `MenuItem`'s, `size-16`/64px vs `size-11`/44px) with a 2-line label below,
 * several side by side in a horizontal scroller. Same leading-icon-chip
 * token convention as `MenuItem` (`t.color.surface.accent.primary` bg,
 * `t.color.text.accent.primary` icon color — consumer-supplied, RN has no
 * `currentColor`), vertical layout instead of a full-width row.
 *
 * `asChild` is not ported (Radix `Slot`-only concept) — always a `Pressable`.
 */

export function MenuShortcutList({ children, style, ...props }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[s.list, style]}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

export interface MenuShortcutItemProps extends Omit<PressableProps, "children" | "style"> {
  /** Glyph rendered inside the circular chip. */
  icon: React.ReactNode;
  label: React.ReactNode;
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
}

export function MenuShortcutItem({
  icon,
  label,
  disabled,
  accessibilityLabel,
  style,
  ...props
}: MenuShortcutItemProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? (typeof label === "string" ? label : undefined)}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      style={(state) => [
        s.item,
        state.pressed && !disabled && s.itemPressed,
        disabled && s.itemDisabled,
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      <View style={s.iconChip}>{icon}</View>
      <Text style={s.label} numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    list: { flexDirection: "row", gap: t.space["100"], paddingBottom: t.space["25"] },
    item: {
      width: 80,
      flexShrink: 0,
      flexDirection: "column",
      alignItems: "center",
      gap: t.space["50"],
      borderRadius: t.radius.lg,
    },
    itemPressed: { opacity: 0.8 },
    itemDisabled: { opacity: 0.5 },
    iconChip: {
      width: 64,
      height: 64,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.circle,
      backgroundColor: t.color.surface.accent.primary,
    },
    label: {
      textAlign: "center",
      fontSize: t.font.size["3"],
      fontWeight: "500",
      lineHeight: 18,
      color: t.color.text.neutral.primary,
    },
  });
}
