import * as React from "react";
import { Pressable, Text, View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";

/**
 * Nemo Toggle / ToggleGroup — RN port of the web `toggle.tsx` +
 * `toggle-group.tsx` (Radix `TogglePrimitive`/`ToggleGroupPrimitive` + shadcn
 * `cva` variants). 100% controlled — `pressed`/`onPressedChange` for
 * `Toggle`, `value`/`onValueChange` for `ToggleGroup`, no internal state.
 *
 * No name collision in RN (nominal imports, no shared namespace like
 * Flutter's `package:flutter/material.dart`), so these keep the web's exact
 * names — `Toggle`, `ToggleGroup`, `ToggleGroupItem`.
 *
 * `children` accepts a plain string (wrapped in a themed `Text`), a
 * render-prop `(color: string) => ReactNode` for icons that need to track
 * the pressed/unpressed foreground color (same convention
 * `NavigationBarItem`'s `icon` prop already uses in this package), or a bare
 * element rendered as-is when the caller wants to own coloring entirely.
 */
export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg";
export type ToggleContent = React.ReactNode | ((color: string) => React.ReactNode);

export interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  variant?: ToggleVariant;
  size?: ToggleSize;
  children?: ToggleContent;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * Sizes mirror the web `cva` (`h-10 px-3 min-w-10` / `h-9 px-2.5 min-w-9` /
 * `h-11 px-5 min-w-11`). Horizontal padding matches `t.space.*` where the
 * scale lines up (`default`→`t.space["75"]`, `lg`→`t.space["125"]`); height,
 * min-width and `sm`'s padding don't have a matching step and stay literals
 * — same documented tradeoff as `Badge`'s non-token sizes.
 */
function sizesFor(t: NemoTheme, size: ToggleSize) {
  switch (size) {
    case "sm":
      return { height: 36, minWidth: 36, paddingHorizontal: 10 };
    case "lg":
      return { height: 44, minWidth: 44, paddingHorizontal: t.space["125"] };
    default:
      return { height: 40, minWidth: 40, paddingHorizontal: t.space["75"] };
  }
}

function renderContent(children: ToggleContent | undefined, color: string) {
  if (typeof children === "function") return children(color);
  if (typeof children === "string") return <Text style={{ color, fontSize: 14, fontWeight: "500" }}>{children}</Text>;
  return children;
}

export function Toggle({
  pressed = false,
  onPressedChange,
  disabled,
  variant = "default",
  size = "default",
  children,
  style,
  accessibilityLabel,
}: ToggleProps) {
  const t = useNemoTheme();
  const sizing = sizesFor(t, size);
  const outline = variant === "outline";

  const bg = pressed ? t.color.surface.accent.primary : "transparent";
  const fg = pressed ? t.color.text.accent.primary : t.color.text.neutral.primary;
  const borderColor = outline && !pressed ? t.color.border.neutral.hover : "transparent";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: pressed, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onPressedChange?.(!pressed)}
      style={[
        styles.base,
        {
          height: sizing.height,
          minWidth: sizing.minWidth,
          paddingHorizontal: sizing.paddingHorizontal,
          borderRadius: t.radius.md,
          backgroundColor: bg,
          borderWidth: outline ? t.borderWidth.sm : 0,
          borderColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {renderContent(children, fg)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
});

/* ------------------------------------------------------------------------ */
/* ToggleGroup / ToggleGroupItem                                            */
/* ------------------------------------------------------------------------ */

export type ToggleGroupType = "single" | "multiple";

interface ToggleGroupContextValue {
  type: ToggleGroupType;
  value: string | string[] | undefined;
  onValueChange?: (value: string | string[]) => void;
  variant: ToggleVariant;
  size: ToggleSize;
  disabled?: boolean;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  type: "single",
  value: undefined,
  variant: "default",
  size: "default",
});

export interface ToggleGroupProps {
  type: ToggleGroupType;
  /** `string` for `type="single"`, `string[]` for `type="multiple"`. */
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * `variant`/`size` set here always win over an item's own props — same
 * precedence the web context has (`context.variant || variant`), since the
 * context is always defined (default `{variant:"default", size:"default"}`)
 * even without an explicit `ToggleGroup` value.
 */
export function ToggleGroup({
  type,
  value,
  onValueChange,
  variant = "default",
  size = "default",
  disabled,
  children,
  style,
}: ToggleGroupProps) {
  const t = useNemoTheme();
  return (
    <ToggleGroupContext.Provider value={{ type, value, onValueChange, variant, size, disabled }}>
      <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: t.space["25"] }, style]}>
        {children}
      </View>
    </ToggleGroupContext.Provider>
  );
}

export interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  variant?: ToggleVariant;
  size?: ToggleSize;
  children?: ToggleContent;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export function ToggleGroupItem({
  value,
  disabled,
  variant,
  size,
  children,
  style,
  accessibilityLabel,
}: ToggleGroupItemProps) {
  const ctx = React.useContext(ToggleGroupContext);
  const pressed =
    ctx.type === "multiple" ? Array.isArray(ctx.value) && ctx.value.includes(value) : ctx.value === value;

  const handlePress = () => {
    if (ctx.type === "multiple") {
      const current = Array.isArray(ctx.value) ? ctx.value : [];
      const next = pressed ? current.filter((v) => v !== value) : [...current, value];
      ctx.onValueChange?.(next);
    } else {
      // Radix's single-mode `ToggleGroup` allows deselecting the active item.
      ctx.onValueChange?.(pressed ? "" : value);
    }
  };

  return (
    <Toggle
      pressed={pressed}
      onPressedChange={handlePress}
      disabled={ctx.disabled || disabled}
      variant={ctx.variant || variant || "default"}
      size={ctx.size || size || "default"}
      style={style}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Toggle>
  );
}
