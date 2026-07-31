import * as React from "react";
import { View, Text, Pressable, StyleSheet, type ViewProps, type PressableProps } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { TabbarBagIcon } from "./icons";

/**
 * NavigationBar — RN port of `packages/web/src/components/navigation-bar.tsx`
 * (Figma node 40366:141533, "Daki App • Components — Design in Progress").
 * Same three-part shape: `NavigationBar` (the pill), `NavigationBarItem`
 * (a controlled tab), `NavigationBarBagItem` (the cart CTA slot). See the
 * web component for the full reasoning on token choices — kept in sync here
 * rather than repeated in full.
 *
 * `t.color.interactive.accent.primary.active` (blue-10, `#001848`) stands in
 * for Figma's unconfirmed `surface/decorative/surface-decorative-600` — same
 * choice the web version makes, same value in both themes.
 *
 * RN has no CSS `filter`, so `active` on `NavigationBarBagItem` darkens via
 * `darken()` below (plain channel multiply) instead of `brightness-90`  —
 * same visual result, no new dependency.
 *
 * No focus-ring concern here (RN has no `:focus-visible` on touch); instead
 * uses `accessibilityRole="button"` + `accessibilityState={{ selected }}` +
 * a full `accessibilityLabel` (label + dot/count) — the RN equivalents of
 * the web version's `aria-current` + `aria-hidden`/`sr-only` pairing.
 */

function darken(hex: string, factor: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * factor);
  const g = Math.round(((n >> 8) & 255) * factor);
  const b = Math.round((n & 255) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

/** Caps the same way `Badge`/`CartCountBadge`'s `count` prop does. */
function formatCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

export interface NavigationBarProps extends ViewProps {
  children: React.ReactNode;
}

export function NavigationBar({ style, children, ...props }: NavigationBarProps) {
  const t = useNemoTheme();
  return (
    <View style={[styles(t).bar, style]} {...props}>
      {children}
    </View>
  );
}

export interface NavigationBarItemProps extends Omit<PressableProps, "children"> {
  /**
   * RN has no `currentColor` — the icon's color depends on `active`, which
   * only this component knows, so `icon` is a render prop rather than a
   * plain element: `icon={(color) => <TabbarHomeIcon color={color} />}`.
   */
  icon: (color: string) => React.ReactNode;
  label: string;
  active?: boolean;
  /** Small unread dot above the icon (e.g. "Pedidos" has new status updates). */
  dot?: boolean;
}

export function NavigationBarItem({ icon, label, active, dot, style, ...props }: NavigationBarItemProps) {
  const t = useNemoTheme();
  const s = styles(t);
  const iconColor = active ? t.color.interactive.accent.primary.active : t.color.interactive.accent.primary.inverted;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      accessibilityLabel={label + (dot ? " — novidade" : "")}
      style={(state) => [s.item, typeof style === "function" ? style(state) : style]}
      {...props}
    >
      <View style={s.iconWrap}>
        {dot && <View style={[s.dot, { backgroundColor: t.color.surface.neutral.primary }]} />}
        {icon(iconColor)}
      </View>
      <View style={s.labelWrap}>
        <Text
          style={[s.label, { color: iconColor, fontWeight: active ? "600" : "500" }]}
          numberOfLines={1}
        >
          {label}
        </Text>
        {active && <View style={[s.underline, { backgroundColor: t.color.interactive.accent.primary.active }]} />}
      </View>
    </Pressable>
  );
}

export interface NavigationBarBagItemProps extends Omit<PressableProps, "children"> {
  /** Defaults to the real `TabbarBagIcon`. Same render-prop reasoning as `NavigationBarItem`. */
  icon?: (color: string) => React.ReactNode;
  label: string;
  count?: number;
  /**
   * Whether the cart screen is the current one. Figma's sample frame never
   * showed this slot as "active" — see the web component's doc comment for
   * why this darkens rather than guesses a new color.
   */
  active?: boolean;
}

/**
 * Empty (no `count`) drops the fixed dark CTA background and looks like a
 * plain `NavigationBarItem` instead — see the web component for why.
 */
export function NavigationBarBagItem({
  icon,
  label,
  count,
  active,
  style,
  ...props
}: NavigationBarBagItemProps) {
  const t = useNemoTheme();
  const s = styles(t);
  const isEmpty = count == null;

  const bg = isEmpty
    ? t.color.interactive.accent.primary.main
    : active
      ? darken(t.color.interactive.accent.primary.active, 0.9)
      : t.color.interactive.accent.primary.active;
  const iconColor = isEmpty
    ? active
      ? t.color.interactive.accent.primary.active
      : t.color.interactive.accent.primary.inverted
    : t.color.interactive.accent.primary.main;
  const labelColor =
    isEmpty && active ? t.color.interactive.accent.primary.active : t.color.interactive.accent.primary.inverted;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      accessibilityLabel={label + (count != null ? ` — ${formatCount(count)} itens` : "")}
      style={(state) => [s.item, { backgroundColor: bg }, typeof style === "function" ? style(state) : style]}
      {...props}
    >
      <View style={s.iconWrap}>
        {icon ? icon(iconColor) : <TabbarBagIcon color={iconColor} />}
        {count != null && (
          <View
            style={[
              s.countBadge,
              { backgroundColor: t.color.surface.neutral.primary, borderColor: t.color.interactive.accent.primary.active },
            ]}
          >
            <Text style={[s.countText, { color: t.color.text.neutral.primary }]}>{formatCount(count)}</Text>
          </View>
        )}
      </View>
      <View style={s.labelWrap}>
        <Text style={[s.label, { color: labelColor, fontWeight: isEmpty && active ? "600" : "500" }]} numberOfLines={1}>
          {label}
        </Text>
        {active && (
          <View
            style={[
              s.underline,
              { backgroundColor: isEmpty ? t.color.interactive.accent.primary.active : "#ffffff" },
            ]}
          />
        )}
      </View>
    </Pressable>
  );
}

function styles(t: NemoTheme) {
  return StyleSheet.create({
    bar: {
      flexDirection: "row",
      alignItems: "stretch",
      width: "100%",
      overflow: "hidden",
      borderRadius: t.radius.lg,
      backgroundColor: t.color.interactive.accent.primary.main,
      // RN has no multi-layer drop-shadow like the web version's two-tone
      // soft shadow (Figma's "Navbar" effect) — single-shadow approximation,
      // same "framework default, not a token" treatment as nemoCardShadow.
      shadowColor: "#18274b",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    item: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: t.space["25"],
      paddingVertical: t.space["50"],
    },
    iconWrap: {
      position: "relative",
      width: t.space["100"],
      height: t.space["100"],
      alignItems: "center",
      justifyContent: "center",
    },
    dot: {
      position: "absolute",
      top: -2,
      right: -2,
      width: t.space["12"] * 3,
      height: t.space["12"] * 3,
      borderRadius: t.space["12"] * 1.5,
      zIndex: 1,
    },
    labelWrap: {
      alignItems: "center",
      gap: 2,
    },
    label: {
      fontSize: t.font.size["1"],
      lineHeight: t.font.size["1"],
    },
    underline: {
      height: 1,
      width: t.space["25"],
      borderRadius: t.radius.pill,
    },
    countBadge: {
      position: "absolute",
      top: -6,
      right: -10,
      minWidth: t.space["100"],
      height: t.space["100"],
      borderWidth: t.borderWidth.sm,
      borderRadius: t.radius.sm,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: t.space["25"],
    },
    countText: {
      fontSize: 10,
      fontWeight: "500",
      lineHeight: 12,
    },
  });
}
