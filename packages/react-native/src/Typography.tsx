import * as React from "react";
import { Text as RNText, type StyleProp, type TextStyle, type TextProps as RNTextProps } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { nemoFontFamily } from "./fonts";

/**
 * Typography — RN port of the web `Text` primitive (`components/typography.tsx`,
 * which despite the file name exports a single `Text`/`textVariants` component,
 * not h1–h4 tags). Named `Typography` here (not `Text`) so it doesn't shadow
 * RN's own `Text` import at call sites. `as`/`asChild` (Radix `Slot`, DOM tag
 * override) don't exist in RN — every variant renders as RN `Text`; pass a
 * custom `style` for one-off overrides instead.
 *
 *   <Typography variant="h1">Título</Typography>
 *   <Typography variant="body" tone="secondary">Descrição</Typography>
 */
export type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodySm"
  | "label"
  | "caption";

export type TypographyTone =
  | "default"
  | "secondary"
  | "muted"
  | "brand"
  | "decorative"
  | "danger"
  | "success"
  | "onBrand";

export interface TypographyProps extends Omit<RNTextProps, "style"> {
  variant?: TypographyVariant;
  tone?: TypographyTone;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function Typography({
  variant = "body",
  tone = "default",
  style,
  children,
  ...props
}: TypographyProps) {
  const t = useNemoTheme();
  const variantStyle = variantStyles(t)[variant];
  const color = toneColors(t)[tone];
  return (
    <RNText style={[variantStyle, { color }, style]} {...props}>
      {children}
    </RNText>
  );
}

// Mirrors `textVariants` (cva) in the web component 1:1 — same size/weight/
// leading pairing per variant, sourced from `t.font.*` instead of Tailwind
// classes. `fontFamily` uses `nemoFontFamily` (`./fonts.ts`), not the raw
// `t.font.family.*` token strings ("Owners Text", "Owners Narrow") — RN
// matches custom fonts by the exact PostScript name baked into the linked
// asset ("OwnersText-Medium", "OwnersNarrow-Black"), not the family label
// from Figma, same substitution `KanbanTaskCard.tsx` already makes. Owners
// Narrow only ships a Black (900) cut (see `fonts.ts`), so `display` renders
// at weight 900 instead of the web's `font-bold` (700) — documented gap, not
// a token mismatch. `tracking-tight` (display/h1/h2) has no token; RN's
// `letterSpacing` is approximated at -2% of the font size, roughly the same
// ratio as Tailwind's `tracking-tight` (-0.025em).
function variantStyles(t: NemoTheme): Record<TypographyVariant, TextStyle> {
  return {
    display: {
      fontFamily: nemoFontFamily.display,
      fontSize: t.font.size["10"],
      fontWeight: fw(t.font.weight.black),
      lineHeight: t.font.size["10"] * 1.25,
      letterSpacing: -t.font.size["10"] * 0.02,
    },
    h1: {
      fontFamily: nemoFontFamily.heading,
      fontSize: t.font.size["9"],
      fontWeight: fw(t.font.weight.medium),
      lineHeight: t.font.size["9"] * 1.25,
      letterSpacing: -t.font.size["9"] * 0.02,
    },
    h2: {
      fontFamily: nemoFontFamily.heading,
      fontSize: t.font.size["7"],
      fontWeight: fw(t.font.weight.medium),
      lineHeight: t.font.size["7"] * 1.25,
    },
    h3: {
      fontFamily: nemoFontFamily.heading,
      fontSize: t.font.size["6"],
      fontWeight: fw(t.font.weight.medium),
      lineHeight: t.font.size["6"] * 1.5,
    },
    body: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["4"],
      fontWeight: fw(t.font.weight.regular),
      lineHeight: t.font.size["4"] * 1.5,
    },
    bodySm: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.regular),
      lineHeight: t.font.size["3"] * 1.5,
    },
    label: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      fontWeight: fw(t.font.weight.medium),
      lineHeight: t.font.size["3"] * 1.5,
    },
    caption: {
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["2"],
      fontWeight: fw(t.font.weight.regular),
      lineHeight: t.font.size["2"] * 1.5,
    },
  };
}

function toneColors(t: NemoTheme): Record<TypographyTone, string> {
  return {
    default: t.color.text.neutral.primary,
    secondary: t.color.text.neutral.tertiary,
    muted: t.color.text.neutral.tertiary,
    brand: t.color.interactive.accent.primary.main,
    decorative: t.color.text.accent.primary,
    danger: t.color.icon.semantic.critical,
    success: t.color.icon.semantic.success,
    onBrand: t.color.interactive.accent.primary.inverted,
  };
}

// RN's `fontWeight` style prop takes a string; `t.font.weight.*` is numeric — same
// helper `ProductCard.tsx`/`KanbanCard.tsx` use.
const fw = (n: number) => String(n) as TextStyle["fontWeight"];
