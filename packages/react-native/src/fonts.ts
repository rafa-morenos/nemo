/**
 * Nemo brand fonts for React Native — Owners (display/headings) + Inter (body/UI).
 *
 * Expo: call useNemoFonts() at the app root (uses expo-font).
 * Bare RN: `react-native.config.js` links ./assets/fonts; run `npx react-native-asset`.
 *
 * Reference families via `nemoFontFamily` so names stay consistent with iOS/Android
 * registration (RN matches by explicit family name, not family+weight).
 */
export const nemoFontFamily = {
  display: "OwnersNarrow-Black", // big statements
  heading: "OwnersText-Medium", // h1–h3
  headingRegular: "OwnersText-Regular",
  sans: "Inter", // body / UI
} as const;

// Asset map for expo-font's useFonts / Font.loadAsync.
export const nemoFontAssets = {
  "OwnersNarrow-Black": require("../assets/fonts/OwnersNarrow-Black.ttf"),
  "OwnersText-Medium": require("../assets/fonts/OwnersText-Medium.ttf"),
  "OwnersText-Regular": require("../assets/fonts/OwnersText-Regular.ttf"),
  Inter: require("../assets/fonts/Inter-Variable.ttf"),
};

/**
 * Expo hook — returns true once fonts are ready.
 *   const ready = useNemoFonts();
 *   if (!ready) return null;
 * Requires `expo-font` in the host app.
 */
export function useNemoFonts(): boolean {
  // Lazy require so non-Expo apps don't need the dep.
  const { useFonts } = require("expo-font");
  const [loaded] = useFonts(nemoFontAssets);
  return loaded;
}
