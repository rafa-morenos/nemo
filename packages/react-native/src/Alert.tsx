import * as React from "react";
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";

/**
 * Nemo Alert — RN port of the web Alert (`packages/web/src/components/alert.tsx`).
 * Web positions the leading icon via CSS sibling selectors
 * (`[&>svg]:absolute`, `[&>svg~*]:pl-7`, `[&>svg+div]:translate-y-[-3px]`); RN
 * has no sibling selectors, so `icon` is an explicit prop and layout is a
 * plain row (icon + content column) instead of absolute positioning — same
 * visual result, simpler implementation. `AlertTitle`/`AlertDescription`
 * inherit their color from the variant via context, mirroring how the web
 * version inherits `text-foreground`/`text-destructive` from the parent via
 * CSS cascade (RN `Text` doesn't cascade color from a parent `View`).
 */
export type AlertVariant = "default" | "destructive";

export interface AlertProps {
  variant?: AlertVariant;
  /** Leading glyph, e.g. a react-native-svg icon. Caller controls its size. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const AlertVariantContext = React.createContext<AlertVariant>("default");

/** Web's `border-destructive/50` (Tailwind alpha modifier) — RN has no alpha-suffix syntax, so this appends an 8-digit hex alpha by hand. */
function withAlpha(hex: string, alpha: number) {
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0");
  return `${hex}${a}`;
}

function colorsFor(t: NemoTheme, variant: AlertVariant) {
  return variant === "destructive"
    ? { border: withAlpha(t.color.icon.semantic.critical, 0.5), text: t.color.icon.semantic.critical }
    : { border: t.color.border.neutral.main, text: t.color.text.neutral.primary };
}

export function Alert({ variant = "default", icon, children, style }: AlertProps) {
  const t = useNemoTheme();
  const c = colorsFor(t, variant);
  return (
    <AlertVariantContext.Provider value={variant}>
      <View
        accessibilityRole="alert"
        style={[
          styles.base,
          {
            backgroundColor: t.color.surface.neutral.primary,
            borderColor: c.border,
            borderWidth: t.borderWidth.sm,
            borderRadius: t.radius.lg,
            padding: t.space["100"],
          },
          style,
        ]}
      >
        {icon != null && <View style={{ marginRight: t.space["75"] }}>{icon}</View>}
        <View style={styles.content}>{children}</View>
      </View>
    </AlertVariantContext.Provider>
  );
}

export function AlertTitle({ children, style }: { children?: React.ReactNode; style?: TextStyle }) {
  const t = useNemoTheme();
  const variant = React.useContext(AlertVariantContext);
  const c = colorsFor(t, variant);
  return (
    <Text style={[styles.title, { color: c.text, marginBottom: t.space["12"] }, style]}>{children}</Text>
  );
}

export function AlertDescription({ children, style }: { children?: React.ReactNode; style?: TextStyle }) {
  const t = useNemoTheme();
  const variant = React.useContext(AlertVariantContext);
  const c = colorsFor(t, variant);
  return (
    <Text style={[{ color: c.text, fontSize: t.font.size["3"], lineHeight: t.font.size["3"] * 1.4 }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: "row" },
  content: { flex: 1 },
  title: { fontWeight: "500" },
});
