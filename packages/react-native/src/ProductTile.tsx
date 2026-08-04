import * as React from "react";
import { View, Text, Image, Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNemoTheme, type NemoTheme } from "./theme";
import { AddToCartButton } from "./AddToCart";

/**
 * ProductTile — RN port of the web `ProductTile` (Figma "Product Tile" set,
 * node 38835:30351): a shelf/grid card (`layout="vertical"`) and a list row
 * (`layout="horizontal"`), each with an `unavailable` state, plus a
 * read-only `type="orderDetail"` row for order-history/refund screens.
 * Reuses `AddToCartButton` (`./AddToCart.tsx`) for the cart stepper — same
 * component, same behavior as web, not a re-implementation.
 *
 * Internal pieces (`FavoriteChip`, `RemoveButton`, `BackSoonTag`,
 * `RefundBadge`, `Price`) mirror the web file's private local functions —
 * not exported, same as there.
 */

/** Local heart glyph — same lucide `Heart` path (v0.454.0) the web file imports independently in this component too (web doesn't share one heart wrapper between add-to-cart.tsx/product-tile.tsx either). */
function HeartIcon({ size = 14, color, filled }: { size?: number; color: string; filled: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : "none"}
      />
    </Svg>
  );
}

/** Local "x" glyph — lucide `X` path (v0.454.0), same version pinned on web. */
function XIcon({ size = 14, color }: { size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6 6 18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m6 6 12 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function FavoriteChip({ active, onToggle, t, s }: { active?: boolean; onToggle?: () => void; t: NemoTheme; s: ReturnType<typeof makeStyles> }) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityLabel={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      accessibilityState={{ selected: !!active }}
      style={[s.favoriteChip, { backgroundColor: t.color.surface.neutral.tertiary }]}
    >
      <HeartIcon size={14} color={t.color.text.neutral.primary} filled={!!active} />
    </Pressable>
  );
}

function RemoveButton({ onPress, t, s }: { onPress?: () => void; t: NemoTheme; s: ReturnType<typeof makeStyles> }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Remover da lista"
      style={s.removeButton}
    >
      <XIcon size={14} color={t.color.text.neutral.tertiary} />
    </Pressable>
  );
}

/** The "Volto logo" (back soon) tag pinned over an unavailable product's image. */
function BackSoonTag({ t, s }: { t: NemoTheme; s: ReturnType<typeof makeStyles> }) {
  return (
    <View style={[s.backSoonTag, { backgroundColor: t.color.surface.neutral.primary }]}>
      <Text style={[s.backSoonTagText, { color: t.color.text.semantic.critical }]}>Volto logo</Text>
    </View>
  );
}

function RefundBadge({ count, unit = "un.", t, s }: { count: number; unit?: string; t: NemoTheme; s: ReturnType<typeof makeStyles> }) {
  return (
    <View style={[s.refundBadge, { backgroundColor: t.color.surface.neutral.tertiary }]}>
      <Text style={[s.refundBadgeText, { color: t.color.text.neutral.tertiary }]}>
        Reembolso • {count} {unit}
      </Text>
    </View>
  );
}

function ProductImage({
  image,
  imageAlt,
  unavailable,
  style,
  children,
  t,
  s,
}: {
  image: string;
  imageAlt?: string;
  unavailable?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  t: NemoTheme;
  s: ReturnType<typeof makeStyles>;
}) {
  return (
    <View style={[s.imageWrap, { backgroundColor: t.color.surface.neutral.secondary }, style]}>
      <Image
        source={{ uri: image }}
        accessible
        accessibilityLabel={imageAlt ?? ""}
        resizeMode={unavailable ? "cover" : "contain"}
        style={[StyleSheet.absoluteFillObject, unavailable && { opacity: 0.5 }]}
      />
      {unavailable && <BackSoonTag t={t} s={s} />}
      {children}
    </View>
  );
}

function Price({
  originalPrice,
  price,
  priceMultiplier,
  t,
  s,
}: {
  originalPrice?: string;
  price: string;
  priceMultiplier?: string;
  t: NemoTheme;
  s: ReturnType<typeof makeStyles>;
}) {
  return (
    <View style={s.priceBlock}>
      {originalPrice ? (
        <Text style={[s.originalPrice, { color: t.color.text.neutral.tertiary }]}>{originalPrice}</Text>
      ) : null}
      <Text style={[s.price, { color: t.color.text.accent.primary }]}>
        {priceMultiplier ? <Text style={s.priceMultiplier}>{priceMultiplier} </Text> : null}
        {price}
      </Text>
    </View>
  );
}

export interface ProductTileProps {
  layout?: "vertical" | "horizontal";
  /** "orderDetail" is a read-only row used in order history/refund screens (horizontal only). */
  type?: "default" | "orderDetail";
  /** Out of stock — fades the image/description and disables the cart button. */
  unavailable?: boolean;
  image: string;
  imageAlt?: string;
  name: string;
  /** Weight/size line, e.g. "115g". */
  size: string;
  /** Struck-through price shown when the item is discounted. */
  originalPrice?: string;
  price: string;
  /** Bold prefix before the price, e.g. "2x" (orderDetail quantity billed). */
  priceMultiplier?: string;
  /** AddToCartButton wiring — see AddToCart.tsx. */
  quantity?: number;
  onAdd?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  /** Vertical layout and horizontal "default": favorite heart toggle. */
  favorite?: boolean;
  onToggleFavorite?: () => void;
  /** Horizontal "default" only: the "x" remove-from-list button. */
  onRemove?: () => void;
  /** Horizontal "orderDetail" only: the floating refund badge. */
  refund?: { count: number; unit?: string };
  style?: StyleProp<ViewStyle>;
}

export function ProductTile({
  layout = "vertical",
  type = "default",
  unavailable = false,
  image,
  imageAlt,
  name,
  size,
  originalPrice,
  price,
  priceMultiplier,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement,
  favorite,
  onToggleFavorite,
  onRemove,
  refund,
  style,
}: ProductTileProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  const isOrderDetail = type === "orderDetail";

  if (layout === "horizontal") {
    const row = (
      <View style={[s.row, { borderColor: t.color.border.neutral.main }, !isOrderDetail && style]}>
        <ProductImage image={image} imageAlt={imageAlt} unavailable={unavailable} style={s.rowMedia} t={t} s={s}>
          {!isOrderDetail && !unavailable && favorite !== undefined && (
            <FavoriteChip active={favorite} onToggle={onToggleFavorite} t={t} s={s} />
          )}
        </ProductImage>
        <View style={[s.rowContent, unavailable && s.faded]}>
          <View style={s.rowHeader}>
            <View style={s.rowHeaderText}>
              <Text numberOfLines={1} style={[s.name, { color: t.color.text.accent.primary }]}>
                {name}
              </Text>
              <Text numberOfLines={1} style={[s.size, { color: t.color.text.neutral.tertiary }]}>
                {size}
              </Text>
            </View>
            {!isOrderDetail && onRemove && <RemoveButton onPress={onRemove} t={t} s={s} />}
          </View>
          <View style={s.rowFooter}>
            <Price originalPrice={originalPrice} price={price} priceMultiplier={priceMultiplier} t={t} s={s} />
            <AddToCartButton
              quantity={isOrderDetail ? 0 : quantity}
              disabled={unavailable || isOrderDetail}
              onAdd={onAdd}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          </View>
        </View>
      </View>
    );

    if (!isOrderDetail) return row;

    return (
      <View style={[s.orderDetailWrap, style]}>
        {refund && <RefundBadge count={refund.count} unit={refund.unit} t={t} s={s} />}
        {row}
      </View>
    );
  }

  return (
    <View
      style={[
        s.card,
        { borderColor: t.color.border.neutral.main, backgroundColor: t.color.surface.neutral.primary },
        style,
      ]}
    >
      <ProductImage image={image} imageAlt={imageAlt} unavailable={unavailable} style={s.cardMedia} t={t} s={s}>
        {favorite !== undefined && <FavoriteChip active={favorite} onToggle={onToggleFavorite} t={t} s={s} />}
      </ProductImage>
      <View style={[s.cardContent, unavailable && s.faded]}>
        <View>
          <Text numberOfLines={1} style={[s.name, { color: t.color.text.accent.primary }]}>
            {name}
          </Text>
          <Text numberOfLines={1} style={[s.size, { color: t.color.text.neutral.tertiary }]}>
            {size}
          </Text>
        </View>
        <Price originalPrice={originalPrice} price={price} priceMultiplier={priceMultiplier} t={t} s={s} />
        <AddToCartButton
          style={s.fullWidthButton}
          quantity={quantity}
          disabled={unavailable}
          onAdd={onAdd}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </View>
    </View>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    // Horizontal layout
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: t.space["50"],
      overflow: "hidden",
      borderRadius: t.radius.md,
      borderWidth: StyleSheet.hairlineWidth,
      paddingRight: t.space["50"],
    },
    rowMedia: { width: 105, height: 105 },
    rowContent: { flex: 1, minWidth: 0, flexDirection: "column", gap: t.space["50"] },
    rowHeader: { flexDirection: "row", alignItems: "flex-start", gap: t.space["50"] },
    rowHeaderText: { flex: 1, minWidth: 0 },
    rowFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: t.space["50"] },
    orderDetailWrap: { position: "relative" },
    // Vertical layout
    card: {
      flexDirection: "column",
      gap: t.space["50"],
      overflow: "hidden",
      borderRadius: t.radius.md,
      borderWidth: StyleSheet.hairlineWidth,
      paddingBottom: t.space["50"],
    },
    cardMedia: { width: "100%", height: 105 },
    cardContent: { flexDirection: "column", gap: t.space["50"], paddingHorizontal: t.space["50"] },
    fullWidthButton: { width: "100%" },
    faded: { opacity: 0.5 },
    // Shared bits
    imageWrap: { position: "relative", overflow: "hidden" },
    // 28px chip/button: web's `size-7` is unmapped default Tailwind spacing
    // (not overridden by the Nemo scale, see tailwind.preset.js), so this is
    // a literal too — same precedent as AddToCart's 34×127 pill.
    favoriteChip: {
      position: "absolute",
      right: t.space["25"], // web: `right-1` (4px)
      top: t.space["25"], // web: `top-1` (4px)
      width: 28,
      height: 28,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.md,
    },
    removeButton: {
      width: 28,
      height: 28,
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.md,
    },
    backSoonTag: {
      position: "absolute",
      bottom: t.space["25"], // web: `bottom-1` (4px)
      right: t.space["25"], // web: `right-1` (4px)
      borderRadius: t.radius.pill,
      paddingHorizontal: t.space["50"],
      paddingVertical: t.space["25"],
    },
    backSoonTagText: { fontSize: t.font.size["1"], fontWeight: String(t.font.weight["medium"]) as "500" },
    refundBadge: {
      position: "absolute",
      top: -t.space["50"], // web: `-top-2` (-8px)
      right: t.space["50"], // web: `right-2` (8px)
      zIndex: 1,
      borderRadius: t.radius.pill,
      paddingHorizontal: t.space["50"],
      paddingVertical: t.space["25"],
    },
    refundBadgeText: { fontSize: t.font.size["1"], fontWeight: String(t.font.weight["medium"]) as "500" },
    priceBlock: { width: "100%", flexDirection: "column" },
    originalPrice: { fontSize: t.font.size["3"], textDecorationLine: "line-through" },
    price: { fontSize: t.font.size["4"], fontWeight: String(t.font.weight["semi-bold"]) as "600" },
    priceMultiplier: { fontWeight: String(t.font.weight["semi-bold"]) as "600" },
    name: { fontSize: t.font.size["3"], fontWeight: String(t.font.weight["medium"]) as "500" },
    size: { fontSize: t.font.size["3"] },
  });
}
