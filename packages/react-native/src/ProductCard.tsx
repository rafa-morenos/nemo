import * as React from "react";
import { View, Text, Pressable, StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import { useNemoTheme, nemoCardShadow, type NemoTheme } from "./theme";
import { MinusIcon, PackageIcon, PlusIcon } from "./icons";

/**
 * ProductCard — compound/slot-based product-card family, RN port of the web
 * `ProductCard` (same `Item`/`Field` compound idiom, not `KanbanCard`'s typed-props
 * technique — see `packages/web/src/components/product-card/product-card.tsx` for the
 * full rationale). The root only owns the outer rounded/shadow/overflow container; every
 * other piece (`ProductCardMedia`, `ProductCardTitle`, `ProductCardLocation`,
 * `ProductCardText`, `ProductCardTags`, `ProductCardFooter`, `ProductCardStepper`...) is
 * pure layout — none of them know about "order context" or "box info": callers compose
 * whatever content they need (a `Badge`, a `ProductCardPill`, plain text) inside each
 * slot. Derived from the HUBR "App • Product Card" Figma set (file
 * MqJ2Kp2MG4YOlLrwi1XJUx).
 *
 * Sizes/spacing/radii come from `t.space`/`t.radius`/`t.font` (see `theme.ts`), same
 * convention `KanbanCard`/`KanbanTaskCard` were just aligned to — no hand-typed numbers
 * except the 160×160 media box, which isn't on the token scale on web either
 * (`size-[160px]`, an arbitrary Tailwind value).
 *
 * As of Figma node 19188:22490, mirrors the same two changes the web port made:
 * `ProductCardCode` (hardcoded "Cód." prefix + value/highlight split) is replaced by
 * `ProductCardText` (`primary`/`secondary`, no baked-in formatting — a caller that still
 * needs the old look nests styled `Text` inside `primary`), and `ProductCardWithBadges`
 * is a thin convenience wrapper matching that node's own toggle shape. See the web file
 * for the full rationale — this file mirrors it 1:1.
 */

type ViewProps = { children?: React.ReactNode; style?: StyleProp<ViewStyle> };
type TextProps = { children?: React.ReactNode; style?: StyleProp<TextStyle> };

// RN's `fontWeight` style prop takes a string; `t.font.weight.*` is numeric
// (shared with web/Flutter), so cast at the point of use — same helper as KanbanCard.
const fw = (n: number) => String(n) as "400" | "500" | "600";

export function ProductCard({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.card, nemoCardShadow, style]}>{children}</View>;
}

/** Padded content region — used for the main body and, after a `ProductCardSeparator`, for secondary sections like a stepper. */
export function ProductCardBody({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.body, { backgroundColor: t.color.surface.neutral.primary }, style]}>{children}</View>
  );
}

/** Media slot (defaults to a 160×160 box). Falls back to a placeholder icon when empty. */
export function ProductCardMedia({ children, style }: ViewProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View
      style={[
        s.media,
        !children && { backgroundColor: t.color.surface.neutral.secondary },
        style,
      ]}
    >
      {children ?? <PackageIcon size={32} color={t.color.text.neutral.tertiary} />}
    </View>
  );
}

export function ProductCardTitle({ children, style }: TextProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <Text style={[s.title, { color: t.color.text.neutral.primary }, style]}>{children}</Text>;
}

export type ProductCardTagsProps = ViewProps & {
  /** Figma: variant "Badge horizontal" (`row`, wraps) vs "Badge vertical" (`column`, stacked). */
  layout?: "row" | "column";
};

/** Row (or column) of arbitrary pills/badges — reusable above or below the media. */
export function ProductCardTags({ children, style, layout = "row" }: ProductCardTagsProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.tagsRow, layout === "column" && s.tagsColumn, style]}>{children}</View>;
}

export type ProductCardPillProps = ViewProps & {
  /** Leading glyph, same slot convention as `Badge`'s `icon`. */
  icon?: React.ReactNode;
  /** Status dot before the label, same convention as `Badge`'s `dot`. */
  dot?: boolean;
};

/**
 * Neutral gray pill (`surface.neutral.secondary`/`text.neutral.primary`) — same look
 * `KanbanCard`'s local `Pill` uses. Kept scoped to the ProductCard family rather than
 * promoted to `Badge`, since `Badge` `color="default"` is intentionally the brand-strong
 * fill, not a neutral chip. `icon`/`dot` mirror `Badge`'s own props/rendering so a
 * neutral pill can still show the icon-dot-label anatomy Figma's tags use.
 */
export function ProductCardPill({ children, style, icon, dot }: ProductCardPillProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.pill, { backgroundColor: t.color.surface.neutral.secondary }, style]}>
      {icon ? <View style={s.pillIcon}>{icon}</View> : null}
      {dot ? <View style={[s.pillDot, { backgroundColor: t.color.text.neutral.primary }]} /> : null}
      {children}
    </View>
  );
}

/** Divider-flanked pill — e.g. a location/slot badge. Content is whatever the caller passes as children. */
export function ProductCardLocation({ children }: { children?: React.ReactNode }) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={s.locationRow}>
      <View style={[s.divider, { backgroundColor: t.color.border.neutral.main }]} />
      <ProductCardPill>
        <Text style={[s.pillText, { color: t.color.text.neutral.primary }]}>{children}</Text>
      </ProductCardPill>
      <View style={[s.divider, { backgroundColor: t.color.border.neutral.main }]} />
    </View>
  );
}

export interface ProductCardTextProps {
  primary: React.ReactNode;
  secondary?: React.ReactNode;
}

/**
 * Generic two-line, centered, muted text block ("Content"/"text-secondary" in Figma) —
 * no business meaning baked in. Replaces the old `ProductCardCode` (which hardcoded a
 * "Cód. `<value><highlight>`" format specific to HUBR's scanning flow): callers that still
 * need that exact look nest styled `Text` inside `primary`, e.g.
 * `primary={<><Text>Cód. </Text><Text style={{fontWeight: "600"}}>404040404040</Text></>}`.
 */
export function ProductCardText({ primary, secondary }: ProductCardTextProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={s.codeBlock}>
      <Text style={[s.codeLine, { color: t.color.text.neutral.tertiary }]}>{primary}</Text>
      {secondary ? <Text style={[s.caption, { color: t.color.text.neutral.tertiary }]}>{secondary}</Text> : null}
    </View>
  );
}

export function ProductCardSeparator() {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return <View style={[s.divider, { flex: undefined, width: "100%", backgroundColor: t.color.border.neutral.main }]} />;
}

/** Colored-band footer (`surface.neutral.secondary`) with a pill wrapping whatever content is passed. */
export function ProductCardFooter({ children }: { children?: React.ReactNode }) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.footer, { backgroundColor: t.color.surface.neutral.secondary }]}>
      <View style={[s.footerPill, { backgroundColor: t.color.surface.neutral.primary }]}>
        <Text style={[s.footerPillText, { color: t.color.text.neutral.primary }]}>{children}</Text>
      </View>
    </View>
  );
}

export interface ProductCardStepperProps {
  value: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
  label?: string;
}

/** Generic labeled +/- stepper — no assumption about what's being counted. */
export function ProductCardStepper({ value, onDecrease, onIncrease, label }: ProductCardStepperProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={s.stepperBlock}>
      {label ? <Text style={[s.stepperLabel, { color: t.color.text.neutral.primary }]}>{label}</Text> : null}
      <View style={s.stepperRow}>
        <Pressable
          style={s.stepperButton}
          onPress={onDecrease}
          accessibilityRole="button"
          accessibilityLabel="Diminuir quantidade"
        >
          <MinusIcon size={24} color={t.color.text.neutral.primary} />
        </Pressable>
        <View
          style={[
            s.stepperValue,
            { borderColor: t.color.border.neutral.main, backgroundColor: t.color.surface.neutral.primary },
          ]}
        >
          <Text style={[s.stepperValueText, { color: t.color.text.neutral.primary }]}>{value}</Text>
        </View>
        <Pressable
          style={s.stepperButton}
          onPress={onIncrease}
          accessibilityRole="button"
          accessibilityLabel="Aumentar quantidade"
        >
          <PlusIcon size={24} color={t.color.text.neutral.primary} />
        </Pressable>
      </View>
    </View>
  );
}

export interface ProductCardWithBadgesProps {
  /** Figma: variant "Badge horizontal" | "Badge vertical" — layout of `topBadges` only. */
  variant?: "horizontal" | "vertical";
  /** Figma: `bagdeSuperior` — tags above the media. Omit to hide. */
  topBadges?: React.ReactNode;
  /** Figma: `ProductPicture`'s `imageBadge` — small pill above the media. Omit to hide. */
  imageBadge?: React.ReactNode;
  /** Passed straight to `ProductCardMedia`; omit for the default placeholder icon. */
  media?: React.ReactNode;
  title: React.ReactNode;
  /** Figma: "location" divider-pill row. Omit to hide. */
  location?: React.ReactNode;
  /** Figma: "scan"/`content` text block — typically a `ProductCardText`. Omit to hide. */
  content?: React.ReactNode;
  /** Figma: `badgeInferior` — tags below the content, non-wrapping. Omit to hide. */
  bottomBadges?: React.ReactNode;
  /** Figma: `status` — footer band. Omit to hide. */
  footer?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Thin convenience layer over the compound family, mirroring the toggle shape Figma
 * node 19188:22490 exposes (each prop present/omitted = section shown/hidden, `variant`
 * = tags-row layout). Doesn't replace the primitives — it composes them — so flows this
 * shape can't express (e.g. the stepper-based "bipagem de conferência" recipe, which
 * isn't part of this Figma node) still build directly from `ProductCard`/`ProductCardBody`/etc.
 */
export function ProductCardWithBadges({
  variant = "horizontal",
  topBadges,
  imageBadge,
  media,
  title,
  location,
  content,
  bottomBadges,
  footer,
  style,
}: ProductCardWithBadgesProps) {
  return (
    <ProductCard style={style}>
      <ProductCardBody>
        {topBadges ? <ProductCardTags layout={variant === "horizontal" ? "row" : "column"}>{topBadges}</ProductCardTags> : null}
        {imageBadge}
        <ProductCardMedia>{media}</ProductCardMedia>
        <ProductCardTitle>{title}</ProductCardTitle>
        {location ? <ProductCardLocation>{location}</ProductCardLocation> : null}
        {content}
        {bottomBadges ? <ProductCardTags layout="row">{bottomBadges}</ProductCardTags> : null}
      </ProductCardBody>
      {footer ? <ProductCardFooter>{footer}</ProductCardFooter> : null}
    </ProductCard>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    card: { width: "100%", borderRadius: t.radius.lg, overflow: "hidden" },
    body: { width: "100%", gap: t.space["100"], padding: t.space["50"], alignItems: "center" },
    media: {
      width: 160,
      height: 160,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.md,
      overflow: "hidden",
    },
    title: { width: "100%", textAlign: "center", fontSize: t.font.size["6"], fontWeight: fw(t.font.weight["semi-bold"]), lineHeight: 28 },
    tagsRow: { width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: t.space["50"] },
    tagsColumn: { flexDirection: "column", flexWrap: "nowrap", alignItems: "center" },
    pill: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: t.space["25"],
      borderRadius: t.radius.pill,
      paddingHorizontal: t.space["50"],
      paddingVertical: t.space["12"],
    },
    pillIcon: { width: 12, height: 12 },
    pillDot: { width: 6, height: 6, borderRadius: 3 },
    locationRow: { width: "100%", flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    divider: { flex: 1, height: StyleSheet.hairlineWidth },
    pillText: { fontSize: t.font.size["3"], fontWeight: fw(t.font.weight["semi-bold"]) },
    codeBlock: { width: "100%", alignItems: "center", gap: t.space["25"] },
    codeLine: { width: "100%", textAlign: "center", fontSize: t.font.size["4"], lineHeight: 24 },
    caption: { width: "100%", textAlign: "center", fontSize: t.font.size["2"], lineHeight: 16 },
    footer: { width: "100%", alignItems: "center", justifyContent: "center", padding: t.space["50"] },
    footerPill: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.pill,
      paddingHorizontal: t.space["50"],
      paddingVertical: t.space["25"],
    },
    footerPillText: { fontSize: t.font.size["4"], fontWeight: fw(t.font.weight["semi-bold"]) },
    stepperBlock: { width: "100%", alignItems: "center", gap: t.space["50"] },
    stepperLabel: { width: "100%", textAlign: "center", fontSize: t.font.size["6"], fontWeight: fw(t.font.weight["semi-bold"]), lineHeight: 28 },
    stepperRow: { flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    stepperButton: {
      width: t.space["300"],
      height: t.space["300"],
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.md,
    },
    stepperValue: {
      width: t.space["300"],
      height: t.space["300"],
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.md,
      borderWidth: StyleSheet.hairlineWidth,
    },
    stepperValueText: { fontSize: t.font.size["6"] },
  });
}
