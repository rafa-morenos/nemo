import nemoPreset from "./tailwind.preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [nemoPreset],
  content: ["./src/**/*.{ts,tsx,mdx}"],
};
