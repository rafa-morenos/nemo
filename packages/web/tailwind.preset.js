/**
 * Nemo × shadcn/ui — Tailwind preset.
 *
 * Maps shadcn's semantic role names onto the REAL Daki alias tokens (generated
 * from the Figma export). Import nemo.css + nemo.dark.css once, add this preset,
 * and shadcn components are themed by Nemo — light/dark via the `.dark` class.
 */
const v = (name) => `var(--nemo-${name})`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: v("color-surface-neutral-primary"),
        foreground: v("color-text-neutral-primary"),
        border: v("color-border-neutral-main"),
        input: v("color-border-neutral-main"),
        ring: v("color-border-accent-primary"),
        primary: {
          DEFAULT: v("color-interactive-accent-primary-main"),
          hover: v("color-interactive-accent-primary-hover"),
          strong: v("color-text-accent-primary"),
          subtle: v("color-surface-accent-primary"),
          foreground: v("color-interactive-accent-primary-inverted"),
        },
        // Brand blue pinned to its light-mode primitives — doesn't tonal-flip
        // in dark mode like `primary` does. Used where the brand color itself
        // (not a surface) needs to stay recognizable across themes. Backed by
        // tokens/fixed.json (generated), not a raw primitive reference —
        // RN/Flutter point at the same generated -fixed tokens.
        "primary-fixed": {
          DEFAULT: v("color-fixed-primary"),
          hover: v("color-fixed-primary-hover"),
          foreground: v("color-fixed-primary-foreground"),
        },
        secondary: {
          DEFAULT: v("color-surface-neutral-secondary"),
          foreground: v("color-text-neutral-primary"),
        },
        muted: {
          DEFAULT: v("color-surface-neutral-secondary"),
          foreground: v("color-text-neutral-tertiary"),
        },
        accent: {
          DEFAULT: v("color-surface-accent-primary"),
          foreground: v("color-text-accent-primary"),
          border: v("color-border-accent-primary"),
        },
        destructive: {
          DEFAULT: v("color-icon-semantic-critical"),
          // No aliased "On Critical" role exists in Figma (only the
          // "Container" pair below), so this borrows the neutral inverted
          // text alias instead of a static white — it flips light/dark the
          // same direction icon-semantic-critical's own tonal-flip does
          // (dark-on-light bg in light mode, light-on-dark bg in dark mode),
          // so contrast holds in both themes without a primitive.
          foreground: v("color-text-neutral-inverted"),
          soft: v("color-surface-semantic-critical"),
          "soft-foreground": v("color-text-semantic-critical"),
          border: v("color-border-semantic-critical"),
        },
        success: {
          DEFAULT: v("color-icon-semantic-success"),
          foreground: v("color-text-neutral-inverted"),
          soft: v("color-surface-semantic-success"),
          "soft-foreground": v("color-text-semantic-success"),
          border: v("color-border-semantic-success"),
        },
        // Same "-fixed" treatment as destructive-fixed above — success's icon
        // tone tonal-flips to a pale green in dark mode, too pale for white text.
        "success-fixed": {
          DEFAULT: v("color-fixed-success"),
          foreground: v("color-fixed-success-foreground"),
        },
        warning: {
          DEFAULT: v("color-icon-semantic-warning"),
          foreground: v("color-text-neutral-inverted"),
          soft: v("color-surface-semantic-warning"),
          "soft-foreground": v("color-text-semantic-warning"),
          border: v("color-border-semantic-warning"),
        },
        // Same story for warning — pale gold in dark mode otherwise.
        "warning-fixed": {
          DEFAULT: v("color-fixed-warning"),
          foreground: v("color-fixed-warning-foreground"),
        },
        info: {
          // DEFAULT/foreground already pair surface-semantic-info ↔ text-semantic-info
          // (verified non-colliding in both themes) — reused directly by Badge's "soft" look.
          DEFAULT: v("color-surface-semantic-info"),
          foreground: v("color-text-semantic-info"),
          border: v("color-border-semantic-info"),
        },
        disabled: {
          DEFAULT: v("color-surface-neutral-disabled"),
          foreground: v("color-text-neutral-tertiary"),
          border: v("color-border-neutral-disabled"),
        },
        inverted: {
          DEFAULT: v("color-surface-neutral-inverted"),
          foreground: v("color-text-neutral-inverted"),
        },
        card: {
          DEFAULT: v("color-surface-neutral-tertiary"),
          foreground: v("color-text-neutral-primary"),
        },
        popover: {
          DEFAULT: v("color-surface-neutral-primary"),
          foreground: v("color-text-neutral-primary"),
        },
        // Sidebar surface (shadcn Sidebar roles → Nemo tokens)
        sidebar: {
          DEFAULT: v("color-surface-neutral-secondary"),
          foreground: v("color-text-neutral-primary"),
          primary: v("color-interactive-accent-primary-main"),
          "primary-foreground": v("color-interactive-accent-primary-inverted"),
          accent: v("color-surface-accent-primary"),
          "accent-foreground": v("color-text-accent-primary"),
          border: v("color-border-neutral-main"),
          ring: v("color-border-accent-primary"),
        },
      },
      borderRadius: {
        sm: v("radius-sm"),
        md: v("radius-md"),
        lg: v("radius-lg"),
        xl: v("radius-xl"),
        full: v("radius-pill"),
      },
      spacing: {
        0: v("space-0"), 1: v("space-25"), 2: v("space-50"), 3: v("space-75"),
        4: v("space-100"), 5: v("space-125"), 6: v("space-150"), 8: v("space-200"),
        10: v("space-250"), 12: v("space-300"), 16: v("space-400"),
      },
      fontFamily: {
        sans: "var(--nemo-font-family-inter)",
        heading: "var(--nemo-font-family-owners-text)",
        display: "var(--nemo-font-family-owners-narrow)",
      },
      fontSize: {
        "2xs": v("font-size-1"), // 10
        xs: v("font-size-2"), // 12
        sm: v("font-size-3"), // 14
        md: v("font-size-4"), // 16
        lg: v("font-size-6"), // 20
        xl: v("font-size-7"), // 24
        "2xl": v("font-size-9"), // 32
        "3xl": v("font-size-10"), // 40
      },
    },
  },
};
