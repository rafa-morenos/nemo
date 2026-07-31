import * as React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewProps,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { ChevronRightIcon } from "./icons";

/**
 * MenuItem / MenuSection / MenuList — RN port of
 * `packages/web/src/components/menu-item.tsx` (settings/menu list rows:
 * leading icon chip, label, optional badge + unread dot, trailing chevron,
 * grouped under section headings). Same token choices as the web version —
 * see that file's header for the full rationale; kept in sync here rather
 * than repeated in full.
 *
 * `asChild` is not ported — it's a Radix `Slot`-only concept with no RN
 * equivalent. `MenuItem` is always a `Pressable` here (RN's "always
 * clickable" row), same reasoning `NavigationBarItem` already follows.
 *
 * Token mapping (confirmed against `tailwind.preset.js` → `build/rn/theme.*`,
 * not guessed):
 * - icon chip bg (web `bg-accent`) → `color-surface-accent-primary` → `t.color.surface.accent.primary`
 * - icon chip icon color (web `text-accent-foreground`) → `color-text-accent-primary` → `t.color.text.accent.primary`
 * - section label (web `text-primary`) → `color-interactive-accent-primary-main` → `t.color.interactive.accent.primary.main`
 * - unread dot (web `bg-primary`) → same `t.color.interactive.accent.primary.main`
 * - trailing chevron (web `text-muted-foreground`) → `color-text-neutral-tertiary` → `t.color.text.neutral.tertiary`
 * - label text (web `text-foreground`) → `color-text-neutral-primary` → `t.color.text.neutral.primary`
 */

export function MenuList({ children, style, ...props }: ViewProps) {
  return (
    <View style={[styles.list, style]} {...props}>
      {children}
    </View>
  );
}

export interface MenuSectionProps extends ViewProps {
  /** Section heading, e.g. "Pagamentos". Omit for an unlabeled group. */
  label?: React.ReactNode;
  children?: React.ReactNode;
}

export function MenuSection({ label, children, style, ...props }: MenuSectionProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.section, style]} {...props}>
      {label != null &&
        (typeof label === "string" ? (
          <Text accessibilityRole="header" style={s.sectionLabel}>
            {label}
          </Text>
        ) : (
          <View accessibilityRole="header">{label}</View>
        ))}
      <View style={s.sectionGroup}>{children}</View>
    </View>
  );
}

export interface MenuItemProps extends Omit<PressableProps, "children" | "style"> {
  /** Leading glyph, rendered inside the circular chip. */
  icon?: React.ReactNode;
  label: React.ReactNode;
  /** Inline badge after the label (e.g. a `<Badge>`). */
  badge?: React.ReactNode;
  /** Unread dot after the label. */
  dot?: boolean;
  /** Trailing content; defaults to a chevron. Pass `null`/`false` to hide it. */
  trailing?: React.ReactNode;
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
}

/** Mirrors `NavigationBarItem`'s best-effort accessibilityLabel composition — only when `label`/`badge` are plain strings and the caller didn't already pass one. */
function composeAccessibilityLabel(label: React.ReactNode, badge: React.ReactNode, dot?: boolean) {
  if (typeof label !== "string") return undefined;
  let out = label;
  if (typeof badge === "string") out += `, ${badge}`;
  if (dot) out += " — novo";
  return out;
}

export function MenuItem({
  icon,
  label,
  badge,
  dot,
  trailing,
  disabled,
  accessibilityLabel,
  style,
  ...props
}: MenuItemProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  const showChevron = trailing === undefined;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? composeAccessibilityLabel(label, badge, dot)}
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
      {icon != null && <View style={s.iconChip}>{icon}</View>}
      <View style={s.middle}>
        <Text style={s.label} numberOfLines={1}>
          {label}
        </Text>
        {badge}
        {dot ? <View style={s.dot} /> : null}
      </View>
      {showChevron ? (
        <ChevronRightIcon size={20} color={t.color.text.neutral.tertiary} />
      ) : trailing ? (
        <View style={s.trailing}>{trailing}</View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: { width: "100%", flexDirection: "column" },
});

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    section: { paddingVertical: t.space["50"] },
    sectionLabel: {
      paddingHorizontal: t.space["50"],
      paddingBottom: t.space["25"],
      fontSize: t.font.size["6"],
      fontWeight: "700",
      color: t.color.interactive.accent.primary.main,
    },
    sectionGroup: { flexDirection: "column" },
    item: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      gap: t.space["100"],
      borderRadius: t.radius.lg,
      paddingHorizontal: t.space["50"],
      // Web's `py-2.5` (10px) isn't on the overridden Tailwind spacing scale
      // (only 0/1/2/3/4/5/6/8/10/12/16 map to real tokens) — same
      // "arbitrary value, not a token" treatment as ProductCard's 160px media box.
      paddingVertical: 10,
    },
    itemPressed: { backgroundColor: t.color.surface.accent.primary },
    itemDisabled: { opacity: 0.5 },
    iconChip: {
      width: 44,
      height: 44,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.circle,
      backgroundColor: t.color.surface.accent.primary,
    },
    middle: {
      flex: 1,
      minWidth: 0,
      flexDirection: "row",
      alignItems: "center",
      gap: t.space["50"],
    },
    label: {
      flexShrink: 1,
      fontSize: t.font.size["4"],
      fontWeight: "500",
      color: t.color.text.neutral.primary,
    },
    dot: {
      width: 8,
      height: 8,
      flexShrink: 0,
      borderRadius: t.radius.circle,
      backgroundColor: t.color.interactive.accent.primary.main,
    },
    trailing: { marginLeft: "auto", flexShrink: 0 },
  });
}
