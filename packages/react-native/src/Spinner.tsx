import * as React from "react";
import { Animated, Easing, type ViewStyle } from "react-native";
import { useNemoTheme } from "./theme";

/**
 * Nemo Spinner — RN port of the web Spinner (a spinning `Loader2` from
 * `lucide-react`). RN core has no equivalent glyph and this bucket may not
 * add new dependencies (no `react-native-svg` icon), so this is a hand-rolled
 * rotating ring (`Animated` + a circular border with one tinted edge) instead
 * of the Loader2 icon — same "rotating indicator" visual language, fully
 * token-driven color, zero new dependency.
 */
export interface SpinnerProps {
  /** Diameter in px. Web defaults to `size-4` (16px). */
  size?: number;
  /** Defaults to `text-muted-foreground` (`text.neutral.tertiary`). */
  color?: string;
  style?: ViewStyle;
}

/** Dims the ring's "trail" — RN has no Tailwind alpha-suffix syntax. */
function withAlpha(hex: string, alpha: number) {
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0");
  return `${hex}${a}`;
}

export function Spinner({ size = 16, color, style }: SpinnerProps) {
  const t = useNemoTheme();
  const rotation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(rotation, { toValue: 1, duration: 800, easing: Easing.linear, useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [rotation]);

  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const tint = color ?? t.color.text.neutral.tertiary;
  const borderWidth = Math.max(2, Math.round(size / 8));

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel="Carregando"
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth,
          borderColor: withAlpha(tint, 0.25),
          borderTopColor: tint,
          transform: [{ rotate: spin }],
        },
        style,
      ]}
    />
  );
}
