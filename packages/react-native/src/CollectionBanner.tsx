import * as React from "react";
import { View, Image, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useNemoTheme, type NemoTheme } from "./theme";
import { Typography } from "./Typography";

/**
 * CollectionBanner — RN port of the web `CollectionBanner`. Interpretation,
 * not a canonical shadcn component (matches Figma "CollectionBanner", node
 * 41674:10448): a brand tile (circular logo + name) plus up to 4 product
 * thumbnails in a 2×2 grid, for horizontal "shop by brand" rows.
 */
export interface CollectionProduct {
  image: string;
  alt?: string;
  /** Some product renders (cans/bottles) read better with "contain" than the default "cover". */
  fit?: "cover" | "contain";
}

export interface CollectionBannerProps {
  brandName: string;
  /** Circular brand logo shown next to the name. Omit for a text-only header. */
  brandLogo?: string;
  /** Up to 4 product thumbnails, shown in a 2×2 grid. */
  products: CollectionProduct[];
  style?: StyleProp<ViewStyle>;
}

export function CollectionBanner({ brandName, brandLogo, products, style }: CollectionBannerProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);

  return (
    <View style={[s.container, style]}>
      <View style={s.headerRow}>
        {brandLogo != null ? (
          <View style={s.logoWrap}>
            <Image source={{ uri: brandLogo }} style={s.logoImage} />
          </View>
        ) : null}
        <Typography variant="caption" style={s.brandName} numberOfLines={1}>
          {brandName}
        </Typography>
      </View>
      <View style={s.grid}>
        {products.slice(0, 4).map((product, i) => (
          <View key={i} style={s.cell}>
            <Image
              source={{ uri: product.image }}
              style={s.cellImage}
              resizeMode={product.fit === "contain" ? "contain" : "cover"}
              accessibilityLabel={product.alt}
              // Web additionally applies `mix-blend-darken` so product photography
              // sits cleanly on the tile — RN's <Image> has no blend-mode
              // equivalent, so thumbnails render flat here (visual-only gap).
            />
          </View>
        ))}
      </View>
    </View>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    // w-[164px] and rounded-2xl are both arbitrary/un-overridden Tailwind
    // values on web too; rounded-2xl (1rem/16px default) happens to equal
    // t.radius.lg, so that part does map to a real token.
    container: {
      width: 164,
      flexDirection: "column",
      gap: t.space["50"],
      borderRadius: t.radius.lg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: t.color.border.neutral.main,
      backgroundColor: t.color.surface.neutral.primary,
      padding: t.space["50"],
    },
    headerRow: { flexDirection: "row", alignItems: "center", gap: t.space["25"] },
    logoWrap: {
      width: t.space["150"],
      height: t.space["150"],
      borderRadius: t.radius.circle,
      overflow: "hidden",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: t.color.border.neutral.main,
    },
    logoImage: { width: "100%", height: "100%" },
    brandName: { flex: 1, fontWeight: "700", color: t.color.text.neutral.primary },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: t.space["50"] },
    cell: {
      width: t.space["400"],
      height: t.space["400"],
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.lg,
      backgroundColor: t.color.surface.neutral.tertiary,
      padding: t.space["25"],
    },
    cellImage: { width: "100%", height: "100%" },
  });
}
