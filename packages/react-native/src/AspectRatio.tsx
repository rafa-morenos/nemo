import * as React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";

/**
 * Nemo AspectRatio — RN port of the web AspectRatio, a thin passthrough over
 * `@radix-ui/react-aspect-ratio`'s `Root` (which itself just applies
 * `aspect-ratio` CSS + absolutely-positions its child to fill the box). RN's
 * `View` supports the `aspectRatio` style natively, so this mirrors Radix's
 * actual behavior: an outer box sized by `ratio`, with the child stretched to
 * fill it via absolute positioning (so the child doesn't need to know its own
 * size, same contract as the web version).
 */
export interface AspectRatioProps {
  /** width / height. Defaults to 1 (square), same as Radix. */
  ratio?: number;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function AspectRatio({ ratio = 1, children, style }: AspectRatioProps) {
  return (
    <View style={[styles.base, { aspectRatio: ratio }, style]}>
      <View style={StyleSheet.absoluteFillObject}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { position: "relative", width: "100%" },
});
