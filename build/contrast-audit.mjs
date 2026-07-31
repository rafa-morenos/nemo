/**
 * Retroactive WCAG contrast audit for the shadcn role palette (Nemo × Daki
 * design system). Resolves every `tailwind.preset.js` color role to its real
 * hex value in light and dark (recursing through `var()` refs down to the
 * primitives in build/web/nemo*.css) and computes actual contrast ratios —
 * no eyeballing. Covers all shadcn components in one pass, since none of
 * them use ad-hoc color (they only compose these roles).
 *
 * Usage: node build/contrast-audit.mjs  (run after `npm run build:tokens`)
 *
 * When a role list here drifts from tailwind.preset.js, update ROLES below.
 */
import { readFileSync } from "node:fs";

function parseVars(css) {
  const map = {};
  const re = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
  let m;
  while ((m = re.exec(css))) {
    map[m[1].replace(/^nemo-/, "")] = m[2].trim();
  }
  return map;
}

const lightCss = readFileSync(new URL("./web/nemo.css", import.meta.url), "utf8");
const darkCss = readFileSync(new URL("./web/nemo.dark.css", import.meta.url), "utf8");

const lightVars = parseVars(lightCss);
const darkVars = parseVars(darkCss);

// dark inherits any var not overridden (primitives are theme-independent)
function resolve(name, vars, fallbackVars, depth = 0) {
  if (depth > 10) throw new Error("cycle resolving " + name);
  let val = vars[name] ?? fallbackVars[name];
  if (val === undefined) return null;
  const varMatch = val.match(/^var\(--([a-zA-Z0-9-]+)\)$/);
  if (varMatch) {
    return resolve(varMatch[1].replace(/^nemo-/, ""), vars, fallbackVars, depth + 1);
  }
  return val; // hex or rgba(...)
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function parseColor(val) {
  if (val.startsWith("#")) return { ...hexToRgb(val), a: 1 };
  const m = val.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
    return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
  }
  throw new Error("cannot parse color: " + val);
}

// flatten a possibly-transparent color onto an opaque background
function flatten(fg, bg) {
  if (fg.a === 1) return fg;
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1,
  };
}

function relLuminance({ r, g, b }) {
  const srgb = [r, g, b].map((c) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrast(hex1, hex2) {
  const l1 = relLuminance(hex1);
  const l2 = relLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function resolveToRgb(nemoVarName, vars, fallbackVars, onBg) {
  const raw = resolve(nemoVarName, vars, fallbackVars);
  if (raw === null) return null;
  const c = parseColor(raw);
  if (c.a < 1) {
    if (!onBg) throw new Error(`${nemoVarName} is translucent (${raw}) and needs an onBg to flatten against`);
    return flatten(c, onBg);
  }
  return c;
}

// --- Preset role -> nemo var name (from tailwind.preset.js) ---
const ROLES = {
  background: "color-surface-neutral-primary",
  foreground: "color-text-neutral-primary",
  border: "color-border-neutral-main",
  input: "color-border-neutral-hover",
  ring: "color-border-accent-primary",
  "primary.DEFAULT": "color-interactive-accent-primary-main",
  "primary.hover": "color-interactive-accent-primary-hover",
  "primary.active": "color-interactive-accent-primary-active",
  "primary.strong": "color-text-accent-primary",
  "primary.subtle": "color-surface-accent-primary",
  "primary.foreground": "color-interactive-accent-primary-inverted",
  "secondary.DEFAULT": "color-surface-neutral-secondary",
  "secondary.foreground": "color-text-neutral-primary",
  "muted.DEFAULT": "color-surface-neutral-secondary",
  "muted.foreground": "color-text-neutral-tertiary",
  "accent.DEFAULT": "color-surface-accent-primary",
  "accent.foreground": "color-text-accent-primary",
  "accent.border": "color-border-accent-primary",
  "destructive.DEFAULT": "color-icon-semantic-critical",
  "destructive.foreground": "color-text-neutral-inverted",
  "destructive.soft": "color-surface-semantic-critical",
  "destructive.soft-foreground": "color-text-semantic-critical",
  "destructive.border": "color-border-semantic-critical",
  "success.DEFAULT": "color-icon-semantic-success",
  "success.foreground": "color-text-neutral-inverted",
  "success.soft": "color-surface-semantic-success",
  "success.soft-foreground": "color-text-semantic-success",
  "success.border": "color-border-semantic-success",
  "warning.DEFAULT": "color-icon-semantic-warning",
  "warning.foreground": "color-text-neutral-inverted",
  "warning.soft": "color-surface-semantic-warning",
  "warning.soft-foreground": "color-text-semantic-warning",
  "warning.border": "color-border-semantic-warning",
  "info.DEFAULT": "color-surface-semantic-info",
  "info.foreground": "color-text-semantic-info",
  "info.border": "color-border-semantic-info",
  "disabled.DEFAULT": "color-surface-neutral-disabled",
  "disabled.foreground": "color-text-neutral-tertiary",
  "disabled.border": "color-border-neutral-disabled",
  "inverted.DEFAULT": "color-surface-neutral-inverted",
  "inverted.foreground": "color-text-neutral-inverted",
  "card.DEFAULT": "color-surface-neutral-tertiary",
  "card.foreground": "color-text-neutral-primary",
  "popover.DEFAULT": "color-surface-neutral-primary",
  "popover.foreground": "color-text-neutral-primary",
  "sidebar.DEFAULT": "color-surface-neutral-secondary",
  "sidebar.foreground": "color-text-neutral-primary",
  "sidebar.primary": "color-interactive-accent-primary-main",
  "sidebar.primary-foreground": "color-interactive-accent-primary-inverted",
  "sidebar.accent": "color-surface-accent-primary",
  "sidebar.accent-foreground": "color-text-accent-primary",
  "sidebar.border": "color-border-neutral-main",
  "sidebar.ring": "color-border-accent-primary",
};

function resolveAllRoles(vars, fallbackVars) {
  const out = {};
  for (const [role, nemoVar] of Object.entries(ROLES)) {
    const raw = resolve(nemoVar, vars, fallbackVars);
    out[role] = { raw, nemoVar };
  }
  return out;
}

const lightRoles = resolveAllRoles(lightVars, {});
const darkRoles = resolveAllRoles(darkVars, lightVars); // dark falls back to light for un-themed primitives

function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

// text pairs to check: [fgRole, bgRole, "text"|"ui", label]
const TEXT_PAIRS = [
  ["foreground", "background", "text", "Base text on page bg"],
  ["primary.foreground", "primary.DEFAULT", "text", "Button primary"],
  ["secondary.foreground", "secondary.DEFAULT", "text", "Button/Badge secondary"],
  ["muted.foreground", "muted.DEFAULT", "text", "Muted text on muted bg"],
  ["muted.foreground", "background", "text", "Muted text on page bg (common: placeholders, captions)"],
  ["accent.foreground", "accent.DEFAULT", "text", "Accent text on accent bg (hover states, badges)"],
  ["destructive.foreground", "destructive.DEFAULT", "text", "Destructive button/solid badge"],
  ["destructive.soft-foreground", "destructive.soft", "text", "Destructive soft badge/toast"],
  ["success.foreground", "success.DEFAULT", "text", "Success solid badge"],
  ["success.soft-foreground", "success.soft", "text", "Success soft badge/toast"],
  ["warning.foreground", "warning.DEFAULT", "text", "Warning solid badge"],
  ["warning.soft-foreground", "warning.soft", "text", "Warning soft badge/toast"],
  ["info.foreground", "info.DEFAULT", "text", "Info badge/toast"],
  ["card.foreground", "card.DEFAULT", "text", "Text on Card"],
  ["popover.foreground", "popover.DEFAULT", "text", "Text on Popover/Dropdown/Dialog/Tooltip content"],
  ["primary.strong", "background", "text", "Link/accent text on page bg"],
  ["primary.strong", "card.DEFAULT", "text", "Link/accent text on Card bg"],
  ["disabled.foreground", "disabled.DEFAULT", "text", "Disabled control text (informative only, no WCAG requirement but checking anyway)"],
  ["inverted.foreground", "inverted.DEFAULT", "text", "Inverted surface text (tooltips using bg-foreground pattern)"],
  ["sidebar.foreground", "sidebar.DEFAULT", "text", "Sidebar text"],
  ["sidebar.accent-foreground", "sidebar.accent", "text", "Sidebar active item text"],
  ["sidebar.primary-foreground", "sidebar.primary", "text", "Sidebar primary button text"],
];

const UI_PAIRS = [
  ["border", "background", "ui", "Decorative border vs page bg (Card/Sheet/Item/Separator — not the sole boundary cue, WCAG 1.4.11 doesn't require 3:1 here)"],
  ["input", "background", "ui", "Form control border vs page bg (Input/Textarea/SelectTrigger/InputOTP — the border IS the boundary cue, must pass 3:1)"],
  ["ring", "background", "ui", "Focus ring vs page bg"],
  ["accent.border", "background", "ui", "Accent border vs page bg"],
  ["destructive.border", "background", "ui", "Destructive border vs page bg"],
  ["success.border", "background", "ui", "Success border vs page bg"],
  ["warning.border", "background", "ui", "Warning border vs page bg"],
  ["info.border", "background", "ui", "Info border vs page bg"],
  ["primary.DEFAULT", "background", "ui", "Primary-filled icon/control vs page bg"],
];

function auditTheme(themeName, roles) {
  console.log(`\n=== ${themeName} ===`);
  const results = [];
  const rows = [...TEXT_PAIRS.map((p) => [...p, 4.5]), ...UI_PAIRS.map((p) => [...p, 3.0])];
  for (const [fgRole, bgRole, kind, label, threshold] of rows) {
    const bgRaw = roles[bgRole]?.raw;
    if (bgRaw == null) { console.log(`  ! missing role ${bgRole}`); continue; }
    const bg = parseColor(bgRaw);
    if (bg.a < 1) { console.log(`  ! bg role ${bgRole} is translucent, skipping`); continue; }
    let fgRaw = roles[fgRole]?.raw;
    if (fgRaw == null) { console.log(`  ! missing role ${fgRole}`); continue; }
    let fg = parseColor(fgRaw);
    if (fg.a < 1) fg = flatten(fg, bg);
    const ratio = contrast(fg, bg);
    const pass = ratio >= threshold;
    results.push({ fgRole, bgRole, kind, label, ratio, threshold, pass, fgHex: rgbToHex(fg), bgHex: rgbToHex(bg) });
  }
  results.sort((a, b) => a.ratio - b.ratio);
  for (const r of results) {
    const flag = r.pass ? "OK  " : "FAIL";
    console.log(
      `  [${flag}] ${r.ratio.toFixed(2)}:1 (need ${r.threshold}) — ${r.label} | ${r.fgRole} ${r.fgHex} on ${r.bgRole} ${r.bgHex}`
    );
  }
  return results;
}

const lightResults = auditTheme("LIGHT", lightRoles);
const darkResults = auditTheme("DARK", darkRoles);

const fails = [...lightResults.filter((r) => !r.pass).map((r) => ({ theme: "light", ...r })),
                ...darkResults.filter((r) => !r.pass).map((r) => ({ theme: "dark", ...r }))];

console.log(`\n=== SUMMARY: ${fails.length} failing pair(s) ===`);
for (const f of fails) {
  console.log(`  ${f.theme.toUpperCase()}: ${f.label} — ${f.ratio.toFixed(2)}:1 (need ${f.threshold}) — ${f.fgRole} on ${f.bgRole}`);
}
