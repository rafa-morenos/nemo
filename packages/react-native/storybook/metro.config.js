const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// `@nemo/react-native` is a sibling package linked via `file:..` (symlinked
// into node_modules) — Metro needs this on to follow it and its own
// token import (`../../../build/rn/theme.*`, outside node_modules entirely).
const path = require("path");
defaultConfig.resolver.unstable_enableSymlinks = true;
defaultConfig.watchFolders = [
  ...(defaultConfig.watchFolders ?? []),
  path.resolve(__dirname, "../../.."),
];
// Resolving from `@nemo/react-native`'s real path (outside this app) walks up
// from `packages/react-native/src`, which never reaches this app's own
// node_modules (a sibling, not an ancestor) — add it explicitly.
defaultConfig.resolver.nodeModulesPaths = [
  ...(defaultConfig.resolver.nodeModulesPaths ?? []),
  path.resolve(__dirname, "node_modules"),
];

const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");

const config = withStorybook(defaultConfig, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
});

module.exports = config;
