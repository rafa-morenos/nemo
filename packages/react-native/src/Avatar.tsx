import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  type ImageSourcePropType,
  type ImageStyle,
  type ViewStyle,
  type TextStyle,
} from "react-native";
import { useNemoTheme } from "./theme";

/**
 * Nemo Avatar — RN port of the web Avatar (`@radix-ui/react-avatar`).
 * Mirrors the compound shape (`Avatar` / `AvatarImage` / `AvatarFallback`)
 * rather than collapsing it into one widget, so callers keep the same
 * composition they'd use on web. A small context replaces Radix's internal
 * image-loading state machine: `AvatarImage` reports load/error into it,
 * `AvatarFallback` reads it to decide whether to render (same "fallback only
 * shows when the image hasn't loaded" behavior as Radix, simplified — no
 * unmount-detection edge cases).
 */
type ImageStatus = "idle" | "loaded" | "error";

const AvatarStatusContext = React.createContext<{
  status: ImageStatus;
  setStatus: (s: ImageStatus) => void;
}>({ status: "idle", setStatus: () => {} });

export interface AvatarProps {
  /** Diameter in px. Web defaults to `h-10 w-10` (40px via the Nemo spacing scale). */
  size?: number;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function Avatar({ size = 40, children, style }: AvatarProps) {
  const t = useNemoTheme();
  const [status, setStatus] = React.useState<ImageStatus>("idle");
  return (
    <AvatarStatusContext.Provider value={{ status, setStatus }}>
      <View
        style={[
          styles.base,
          { width: size, height: size, borderRadius: t.radius.pill },
          style,
        ]}
      >
        {children}
      </View>
    </AvatarStatusContext.Provider>
  );
}

export interface AvatarImageProps {
  source: ImageSourcePropType;
  style?: ImageStyle;
}

export function AvatarImage({ source, style }: AvatarImageProps) {
  const { status, setStatus } = React.useContext(AvatarStatusContext);
  if (status === "error") return null;
  return (
    <Image
      source={source}
      style={[StyleSheet.absoluteFillObject, style]}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("error")}
    />
  );
}

export interface AvatarFallbackProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function AvatarFallback({ children, style, textStyle }: AvatarFallbackProps) {
  const t = useNemoTheme();
  const { status } = React.useContext(AvatarStatusContext);
  if (status === "loaded") return null;
  return (
    <View style={[styles.fallback, { backgroundColor: t.color.surface.neutral.secondary }, style]}>
      {typeof children === "string" ? (
        <Text style={[{ color: t.color.text.neutral.primary, fontSize: t.font.size["3"] }, textStyle]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { overflow: "hidden", flexShrink: 0 },
  fallback: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center" },
});
