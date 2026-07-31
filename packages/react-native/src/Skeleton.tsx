import * as React from "react";
import { Animated, type ViewStyle } from "react-native";
import { useNemoTheme } from "./theme";

/**
 * Nemo Skeleton — RN port of the web Skeleton (`animate-pulse rounded-md
 * bg-muted`). Web's `animate-pulse` is a Tailwind keyframe (opacity 1 → .5 →
 * 1 over 2s ease-in-out); this reproduces it with `Animated` since RN has no
 * CSS keyframes.
 */
export interface SkeletonProps {
  style?: ViewStyle;
}

export function Skeleton({ style }: SkeletonProps) {
  const t = useNemoTheme();
  const opacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.5, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { backgroundColor: t.color.surface.neutral.secondary, borderRadius: t.radius.md, opacity },
        style,
      ]}
    />
  );
}
