/**
 * Nemo × shadcn/ui — Tailwind preset.
 *
 * Maps shadcn's semantic role names onto the REAL Daki alias tokens (generated
 * from the Figma export). Import nemo.css + nemo.dark.css once, add this preset,
 * and shadcn components are themed by Nemo — light/dark via the `.dark` class.
 */
const v = (name) => `var(--nemo-${name})`;

// Colors need to support Tailwind's opacity modifier (`bg-x/50`) — a plain
// `var(--nemo-x)` string can't take an alpha channel, so Tailwind silently
// drops the whole utility (confirmed live: `hover:bg-muted/50` on Table rows,
// `data-[active]:bg-accent/50` on Navigation Menu, `bg-primary/10` on Aspect
// Ratio — none of them ever generated a CSS rule). `color-mix()` lets us keep
// the token as an opaque CSS var (no pipeline change) while still answering
// modified classes; the corePlugins below turn off Tailwind's legacy
// `--tw-bg-opacity` wiring, which otherwise leaks into the unmodified case.
const vAlpha = (name) => ({ opacityValue }) =>
  opacityValue === undefined
    ? v(name)
    : `color-mix(in srgb, ${v(name)} ${Number(opacityValue) * 100}%, transparent)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  corePlugins: {
    backgroundOpacity: false,
    textOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    placeholderOpacity: false,
  },
  theme: {
    extend: {
      colors: {
        background: vAlpha("color-surface-neutral-primary"),
        foreground: vAlpha("color-text-neutral-primary"),
        border: vAlpha("color-border-neutral-main"),
        input: vAlpha("color-border-neutral-main"),
        ring: vAlpha("color-border-accent-primary"),
        primary: {
          DEFAULT: vAlpha("color-interactive-accent-primary-main"),
          hover: vAlpha("color-interactive-accent-primary-hover"),
          // Pressed/active shade of the brand blue (blue-10, same value in
          // both themes) — was missing from the preset even though the
          // alias itself already existed; added for NavigationBar's active
          // state instead of hardcoding a literal hex.
          active: vAlpha("color-interactive-accent-primary-active"),
          strong: vAlpha("color-text-accent-primary"),
          subtle: vAlpha("color-surface-accent-primary"),
          foreground: vAlpha("color-interactive-accent-primary-inverted"),
        },
        secondary: {
          DEFAULT: vAlpha("color-surface-neutral-secondary"),
          foreground: vAlpha("color-text-neutral-primary"),
        },
        muted: {
          DEFAULT: vAlpha("color-surface-neutral-secondary"),
          foreground: vAlpha("color-text-neutral-tertiary"),
        },
        accent: {
          DEFAULT: vAlpha("color-surface-accent-primary"),
          foreground: vAlpha("color-text-accent-primary"),
          border: vAlpha("color-border-accent-primary"),
        },
        destructive: {
          DEFAULT: vAlpha("color-icon-semantic-critical"),
          // No aliased "On Critical" role exists in Figma (only the
          // "Container" pair below), so this borrows the neutral inverted
          // text alias instead of a static white — it flips light/dark the
          // same direction icon-semantic-critical's own tonal-flip does
          // (dark-on-light bg in light mode, light-on-dark bg in dark mode),
          // so contrast holds in both themes without a primitive.
          foreground: vAlpha("color-text-neutral-inverted"),
          soft: vAlpha("color-surface-semantic-critical"),
          "soft-foreground": vAlpha("color-text-semantic-critical"),
          border: vAlpha("color-border-semantic-critical"),
        },
        success: {
          DEFAULT: vAlpha("color-icon-semantic-success"),
          foreground: vAlpha("color-text-neutral-inverted"),
          soft: vAlpha("color-surface-semantic-success"),
          "soft-foreground": vAlpha("color-text-semantic-success"),
          border: vAlpha("color-border-semantic-success"),
        },
        warning: {
          DEFAULT: vAlpha("color-icon-semantic-warning"),
          foreground: vAlpha("color-text-neutral-inverted"),
          soft: vAlpha("color-surface-semantic-warning"),
          "soft-foreground": vAlpha("color-text-semantic-warning"),
          border: vAlpha("color-border-semantic-warning"),
        },
        info: {
          // DEFAULT/foreground already pair surface-semantic-info ↔ text-semantic-info
          // (verified non-colliding in both themes) — reused directly by Badge's "soft" look.
          DEFAULT: vAlpha("color-surface-semantic-info"),
          foreground: vAlpha("color-text-semantic-info"),
          border: vAlpha("color-border-semantic-info"),
        },
        disabled: {
          DEFAULT: vAlpha("color-surface-neutral-disabled"),
          foreground: vAlpha("color-text-neutral-tertiary"),
          border: vAlpha("color-border-neutral-disabled"),
        },
        inverted: {
          DEFAULT: vAlpha("color-surface-neutral-inverted"),
          foreground: vAlpha("color-text-neutral-inverted"),
        },
        card: {
          DEFAULT: vAlpha("color-surface-neutral-tertiary"),
          foreground: vAlpha("color-text-neutral-primary"),
        },
        popover: {
          DEFAULT: vAlpha("color-surface-neutral-primary"),
          foreground: vAlpha("color-text-neutral-primary"),
        },
        // Sidebar surface (shadcn Sidebar roles → Nemo tokens)
        sidebar: {
          DEFAULT: vAlpha("color-surface-neutral-secondary"),
          foreground: vAlpha("color-text-neutral-primary"),
          primary: vAlpha("color-interactive-accent-primary-main"),
          "primary-foreground": vAlpha("color-interactive-accent-primary-inverted"),
          accent: vAlpha("color-surface-accent-primary"),
          "accent-foreground": vAlpha("color-text-accent-primary"),
          border: vAlpha("color-border-neutral-main"),
          ring: vAlpha("color-border-accent-primary"),
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
