import * as React from "react";
import { View, Text, StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { nemoFontFamily } from "./fonts";

/**
 * Field — RN port of the shadcn/ui Field API (`Field`, `FieldLabel`,
 * `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend`,
 * `FieldSeparator`, `FieldContent`, `FieldTitle`). Form-field layout
 * primitives, same compound pattern as `ProductCard.tsx`.
 */
type ViewProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle> };
type TextProps = { children?: React.ReactNode; style?: StyleProp<TextStyle> };

const fw = (n: number) => String(n) as TextStyle["fontWeight"];

export type FieldOrientation = "vertical" | "horizontal" | "responsive";

export interface FieldProps extends ViewProps {
  orientation?: FieldOrientation;
}

/**
 * `"responsive"` (container-query flex-row above `@md`) has no RN equivalent
 * — falls back to vertical. Web's `data-[invalid=true]:text-destructive` (an
 * attribute selector cascading red text to every descendant) has no RN
 * equivalent either — there's no prop for it here; a caller building an
 * invalid field should pass `tone`/`color` overrides to `FieldLabel`/
 * `FieldDescription`/`FieldError` directly instead of relying on a cascade.
 */
export function Field({ children, style, orientation = "vertical" }: FieldProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  const isHorizontal = orientation === "horizontal";
  return (
    <View accessibilityRole="none" style={[s.field, isHorizontal ? s.fieldRow : s.fieldColumn, style]}>
      {children}
    </View>
  );
}

export function FieldGroup({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.fieldGroup, style]}>{children}</View>;
}

export function FieldSet({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.fieldSet, style]}>{children}</View>;
}

export function FieldLegend({ children, style }: TextProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <Text style={[s.fieldLegend, style]}>{children}</Text>;
}

export function FieldContent({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.fieldContent, style]}>{children}</View>;
}

export interface FieldLabelProps extends ViewProps {
  disabled?: boolean;
}

/**
 * Web's `label` element with `htmlFor` has no RN equivalent — pairing with the
 * control is purely visual (stack it next to/above the input yourself). Web's
 * `flex items-center gap-2` lets a label hold an icon + text; RN `<Text>`
 * can't lay out a `View`-based icon in a flex row, so this renders a `View`
 * row and only auto-wraps plain string children in `Text` — pass pre-composed
 * `<Text>`/icon elements directly for the icon+label case.
 */
export function FieldLabel({ children, style, disabled }: FieldLabelProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.fieldLabelRow, disabled && s.disabledOpacity, style]}>
      {typeof children === "string" ? <Text style={s.fieldLabelText}>{children}</Text> : children}
    </View>
  );
}

/** Same string-vs-node handling as `FieldLabel` — see its doc comment. */
export function FieldTitle({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.fieldTitleRow, style]}>
      {typeof children === "string" ? <Text style={s.fieldTitleText}>{children}</Text> : children}
    </View>
  );
}

export function FieldDescription({ children, style }: TextProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <Text style={[s.fieldDescription, style]}>{children}</Text>;
}

export interface FieldErrorProps extends TextProps {
  errors?: Array<{ message?: string } | undefined>;
}

export function FieldError({ children, style, errors }: FieldErrorProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  const messages = errors?.filter((e): e is { message: string } => !!e?.message) ?? [];

  const content =
    children ??
    (messages.length > 0
      ? messages.length === 1
        ? messages[0].message
        : messages.map((e, i) => (
            <Text key={i} style={s.fieldError}>
              {"• "}
              {e.message}
            </Text>
          ))
      : null);

  if (!content) return null;

  return (
    <View accessibilityRole="alert">
      {typeof content === "string" ? <Text style={[s.fieldError, style]}>{content}</Text> : content}
    </View>
  );
}

export interface FieldSeparatorProps extends ViewProps {}

/** Divider with an optional centered label — same divider-flanked-pill
 * layout `ProductCardLocation` already uses in `ProductCard.tsx`. */
export function FieldSeparator({ children, style }: FieldSeparatorProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.separatorRow, style]}>
      <View style={s.separatorLine} />
      {children ? <Text style={s.separatorLabel}>{children}</Text> : null}
      {children ? <View style={s.separatorLine} /> : null}
    </View>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    field: { width: "100%", flexWrap: "wrap", gap: t.space["50"] },
    fieldRow: { flexDirection: "row", alignItems: "center" },
    fieldColumn: { flexDirection: "column" },
    fieldGroup: { width: "100%", flexDirection: "column", gap: t.space["150"] },
    fieldSet: { flexDirection: "column", gap: t.space["75"] },
    fieldLegend: {
      fontFamily: nemoFontFamily.sans,
      marginBottom: t.space["75"],
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.medium),
      color: t.color.text.neutral.primary,
    },
    // gap-1.5 (6px) isn't on the space scale — arbitrary Tailwind value on web too.
    fieldContent: { flex: 1, flexDirection: "column", gap: 6 },
    fieldLabelRow: { flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    fieldLabelText: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.medium),
      color: t.color.text.neutral.primary,
    },
    disabledOpacity: { opacity: 0.5 },
    fieldTitleRow: { flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    fieldTitleText: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.medium),
      color: t.color.text.neutral.primary,
    },
    fieldDescription: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.regular),
      color: t.color.text.neutral.tertiary,
    },
    fieldError: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.regular),
      color: t.color.icon.semantic.critical,
    },
    separatorRow: { flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    separatorLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: t.color.border.neutral.main },
    separatorLabel: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      color: t.color.text.neutral.tertiary,
    },
  });
}
