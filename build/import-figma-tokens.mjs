/**
 * Import Daki's Figma tokens (Tokens Studio / W3C DTCG export) → Nemo source.
 *
 *   node build/import-figma-tokens.mjs [path-to-export.json]
 *
 * The token source is 100% what the Figma file contains — no invented tokens:
 *   core:     primitive ramps + Layout (space/radius/borderWidth) + Typography
 *             (families, sizes, weights).
 *   semantic: the alias tree (Surface/Text/Border/Icon/Interactive/Background),
 *             resolved per light/dark mode to primitive references.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = process.argv[2] || resolve(ROOT, "tokens/figma-export.tokens.json");
const raw = JSON.parse(readFileSync(SRC, "utf8"));

const SET = {
  prim: "Primitives /Value",
  light: "Color Palette /Light",
  dark: "Color Palette /Dark",
  alias: "Alias colors /Value",
  layout: "Layout/Value",
};

const val = (n) => n?.$value ?? n?.value;
const isTokenNode = (n) => n && typeof n === "object" && ("$value" in n || "value" in n);
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const refName = (s) => s.trim().replace(/^\{/, "").replace(/\}$/, "");

function traverse(setObj, segs) {
  let node = setObj;
  for (const s of segs) {
    if (!node || typeof node !== "object") return null;
    node = node[s];
  }
  return node ?? null;
}

// Resolve a dotted ref across sets, honoring the active mode's palette.
function lookup(name, mode) {
  const segs = name.split(".");
  const order = [mode === "dark" ? SET.dark : SET.light, SET.alias, SET.prim, SET.layout];
  for (const setName of order) {
    const found = traverse(raw[setName], segs);
    if (isTokenNode(found)) return { node: found, set: setName, segs };
  }
  return null;
}

// Resolve a value (ref or literal) to a core reference `{color.ramp.step}` or a raw literal.
function resolveToCore(rawVal, mode, guard = 0) {
  if (guard > 12) return String(rawVal);
  if (typeof rawVal !== "string" || !/^\{.*\}$/.test(rawVal.trim())) return String(rawVal);
  const hit = lookup(refName(rawVal), mode);
  if (!hit) return String(rawVal);
  if (hit.set === SET.prim) return `{color.${slug(hit.segs[0])}.${hit.segs[1]}}`;
  return resolveToCore(val(hit.node), mode, guard + 1);
}

/* ---------------- core.json (primitives + layout + typography) ---------------- */

const core = {
  $description: "Nemo — Core. 100% from the Daki Figma export: primitive ramps + Layout + Typography.",
  color: { $type: "color" },
};

// Primitive ramps
for (const ramp of Object.keys(raw[SET.prim])) {
  if (ramp.startsWith("$")) continue;
  const group = raw[SET.prim][ramp];
  const out = {};
  for (const step of Object.keys(group)) {
    if (step.startsWith("$") || !isTokenNode(group[step])) continue;
    out[step] = { $value: val(group[step]) };
  }
  if (Object.keys(out).length) core.color[slug(ramp)] = out;
}

// Layout → space / radius / borderWidth (numbers → px), keys stripped of the Figma prefix.
const LAYOUT = [
  ["Spacing", "space", "spacing-"],
  ["Border Radius", "radius", "border-radius-"],
  ["Border Width", "borderWidth", "border-width-"],
];
for (const [figGroup, key, prefix] of LAYOUT) {
  const group = raw[SET.layout]?.[figGroup];
  if (!group) continue;
  const out = { $type: "dimension" };
  for (const k of Object.keys(group)) {
    if (k.startsWith("$") || !isTokenNode(group[k])) continue;
    out[slug(k).replace(slug(prefix) + "-", "")] = { $value: `${val(group[k])}px` };
  }
  core[key] = out;
}

// Typography (from Color Palette typographic primitives)
const cp = raw[SET.light];
core.font = { family: { $type: "fontFamily" }, size: { $type: "dimension" }, weight: { $type: "fontWeight" } };
for (const k of Object.keys(cp.fontFamilies ?? {})) {
  if (k.startsWith("$") || !isTokenNode(cp.fontFamilies[k])) continue;
  core.font.family[slug(k)] = { $value: [val(cp.fontFamilies[k]), "system-ui", "sans-serif"] };
}
for (const k of Object.keys(cp.fontSize ?? {})) {
  if (k.startsWith("$") || !isTokenNode(cp.fontSize[k])) continue;
  core.font.size[k] = { $value: `${val(cp.fontSize[k])}px` };
}
const WMAP = { Regular: 400, Medium: 500, "Semi Bold": 600, SemiBold: 600, Bold: 700, Black: 900 };
const seenW = {};
for (const k of Object.keys(cp.fontWeights ?? {})) {
  if (k.startsWith("$") || !isTokenNode(cp.fontWeights[k])) continue;
  const num = WMAP[val(cp.fontWeights[k])];
  if (num && !seenW[num]) {
    seenW[num] = 1;
    core.font.weight[slug(val(cp.fontWeights[k]))] = { $value: num };
  }
}

/* ---------------- semantic (alias tree only) ---------------- */

function buildSemantic(mode) {
  const aliasSet = raw[SET.alias];
  const color = { $type: "color" };
  const walk = (node, target) => {
    for (const k of Object.keys(node)) {
      if (k.startsWith("$")) continue;
      const child = node[k];
      if (isTokenNode(child)) target[slug(k)] = { $value: resolveToCore(val(child), mode) };
      else if (child && typeof child === "object") {
        target[slug(k)] = {};
        walk(child, target[slug(k)]);
      }
    }
  };
  for (const group of Object.keys(aliasSet)) {
    if (group.startsWith("$")) continue;
    color[slug(group)] = {};
    walk(aliasSet[group], color[slug(group)]);
  }
  return { $description: `Nemo — Semantic (${mode}). Daki alias tree resolved for ${mode}.`, color };
}

/* ---------------- write ---------------- */

const write = (file, obj) => {
  writeFileSync(resolve(ROOT, "tokens", file), JSON.stringify(obj, null, 2) + "\n");
  console.log("✔︎ tokens/" + file);
};
write("core.json", core);
write("semantic.light.json", buildSemantic("light"));
write("semantic.dark.json", buildSemantic("dark"));

console.log(
  `\n🐟  Imported ${Object.keys(core.color).length} ramps, ` +
    `${Object.keys(core.space ?? {}).length - 1} space, ` +
    `${Object.keys(core.font.size).length} sizes, full alias tree — Figma-only.`
);
