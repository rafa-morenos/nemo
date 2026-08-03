import * as React from "react";
import { View, Text, Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNemoTheme, type NemoTheme } from "./theme";
import { nemoFontFamily } from "./fonts";

/**
 * Attachment — RN port of the web `Attachment`. Interpretation, not a
 * canonical shadcn component: a token-driven chip representing a file
 * attachment (file icon, name, optional size, optional remove button).
 *
 * `File`/`X` (lucide-react icons on web) have no RN equivalent in this repo's
 * icon set (the shared `icons.tsx` only has the Kanban/ProductCard/Tabbar
 * sets), so they're defined locally here — same precedent as
 * `add-to-cart.tsx`'s local trash icon, since these are generic glyphs, not
 * Daki-specific assets from Figma.
 */
type IconProps = { size?: number; color: string };

function FileIcon({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M14 2v6h6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function XIcon({ size = 16, color }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6 6 18M6 6l12 12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export interface AttachmentProps {
  name: string;
  size?: string;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Attachment({ name, size, onRemove, style }: AttachmentProps) {
  const t = useNemoTheme();
  const s = makeStyles(t);
  return (
    <View style={[s.container, style]}>
      <FileIcon size={16} color={t.color.text.neutral.tertiary} />
      <View style={s.nameRow}>
        <Text style={s.name} numberOfLines={1}>
          {name}
        </Text>
        {size ? <Text style={s.size}>{size}</Text> : null}
      </View>
      {onRemove ? (
        <Pressable
          onPress={onRemove}
          accessibilityRole="button"
          accessibilityLabel="Remove attachment"
          style={s.removeButton}
        >
          <XIcon size={16} color={t.color.text.neutral.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

function makeStyles(t: NemoTheme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: t.space["50"],
      borderRadius: t.radius.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: t.color.border.neutral.main,
      backgroundColor: t.color.surface.semantic.info,
      paddingHorizontal: t.space["75"],
      paddingVertical: t.space["50"],
    },
    nameRow: { flex: 1, minWidth: 0, flexDirection: "row", alignItems: "center", gap: t.space["50"] },
    name: {
      flexShrink: 1,
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      color: t.color.text.neutral.primary,
    },
    size: {
      flexShrink: 0,
      fontFamily: nemoFontFamily.sans,
      fontSize: t.font.size["3"],
      color: t.color.text.neutral.tertiary,
    },
    // h-6 w-6 (24px = space150).
    removeButton: {
      flexShrink: 0,
      width: t.space["150"],
      height: t.space["150"],
      alignItems: "center",
      justifyContent: "center",
      borderRadius: t.radius.md,
    },
  });
}
