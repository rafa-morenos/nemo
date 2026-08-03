import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type TextInputProps,
} from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { nemoFontFamily } from "./fonts";

/**
 * InputGroup — RN port of the shadcn/ui Input Group API (`InputGroup`,
 * `InputGroupInput`, `InputGroupAddon`, `InputGroupButton`, `InputGroupText`).
 * Wraps a `TextInput` with leading/trailing addons. Same compound pattern as
 * `ProductCard.tsx`.
 *
 * Web's `focus-within:ring-2` (the group highlights when its inner input is
 * focused) has no RN equivalent without lifting focus state into a shared
 * context — out of scope for this layout-only port (no real Radix-style
 * behavior in this bucket). `InputGroupInput` still forwards `onFocus`/
 * `onBlur` normally; wire up a ring yourself if you need one.
 */
type ViewProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle> };

export function InputGroup({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.group, style]}>{children}</View>;
}

export interface InputGroupInputProps extends Omit<TextInputProps, "style"> {
  style?: StyleProp<TextStyle>;
}

export function InputGroupInput({ style, ...props }: InputGroupInputProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <TextInput
      style={[s.input, style]}
      placeholderTextColor={t.color.text.neutral.tertiary}
      {...props}
    />
  );
}

export type InputGroupAddonAlign = "inline-start" | "inline-end";

export interface InputGroupAddonProps extends ViewProps {
  align?: InputGroupAddonAlign;
}

export function InputGroupAddon({ children, style, align = "inline-start" }: InputGroupAddonProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View
      style={[s.addon, align === "inline-start" ? s.addonStart : s.addonEnd, style]}
    >
      {children}
    </View>
  );
}

export interface InputGroupButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function InputGroupButton({ children, onPress, disabled, style }: InputGroupButtonProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={[s.button, disabled && s.disabledOpacity, style]}
    >
      {typeof children === "string" ? <Text style={s.buttonText}>{children}</Text> : children}
    </Pressable>
  );
}

export function InputGroupText({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.textRow, style]}>
      {typeof children === "string" ? <Text style={s.textRowText}>{children}</Text> : children}
    </View>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    group: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: t.radius.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: t.color.border.neutral.hover,
      backgroundColor: t.color.surface.neutral.primary,
    },
    // h-10 (40px = space250), px-3 (space75), py-2 (space50).
    input: {
      flex: 1,
      minWidth: 0,
      height: t.space["250"],
      paddingHorizontal: t.space["75"],
      paddingVertical: t.space["50"],
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      color: t.color.text.neutral.primary,
    },
    addon: { flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    addonStart: { paddingLeft: t.space["75"] },
    addonEnd: { paddingRight: t.space["75"] },
    // h-7 (28) and gap-1.5 (6) aren't on the space scale — arbitrary Tailwind values on web too.
    button: {
      height: 28,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingHorizontal: t.space["50"],
      borderRadius: t.radius.sm,
    },
    buttonText: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: "500",
      color: t.color.text.neutral.primary,
    },
    disabledOpacity: { opacity: 0.5 },
    textRow: { flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    textRowText: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      color: t.color.text.neutral.tertiary,
    },
  });
}
