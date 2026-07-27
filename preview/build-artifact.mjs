/**
 * Regenerate preview/nemo-artifact.html from the REAL generated tokens +
 * embedded Owners brand fonts (data-URI, so it stays self-contained for the
 * Artifact CSP). Reuses the existing showcase markup/CSS; only swaps the token
 * block, injects @font-face, and points hero/headings at the brand faces.
 *
 *   node preview/build-artifact.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const read = (p) => readFileSync(resolve(ROOT, p), "utf8");

// --- real tokens ---
const lightCss = read("build/web/nemo.css").replace(/\/\*[\s\S]*?\*\//, "").trim(); // :root {...}
const darkRaw = read("build/web/nemo.dark.css");
const darkInner = darkRaw.slice(darkRaw.indexOf("{") + 1, darkRaw.lastIndexOf("}")).trim();
const tokensCss = [
  lightCss,
  `:root[data-theme="dark"], .dark {\n${darkInner}\n}`,
  `@media (prefers-color-scheme: dark) {\n:root:not([data-theme="light"]) {\n${darkInner}\n}\n}`,
].join("\n\n");

// --- embedded brand fonts (Owners) ---
const b64 = (p) => readFileSync(resolve(ROOT, p)).toString("base64");
const face = (family, file, weight) =>
  `@font-face{font-family:"${family}";src:url("data:font/ttf;base64,${b64(file)}") format("truetype");font-weight:${weight};font-style:normal;font-display:swap;}`;
const fontsCss = [
  face("Owners Narrow", "packages/web/src/fonts/OwnersNarrow-Black.ttf", 900),
  face("Owners Text", "packages/web/src/fonts/OwnersText-Regular.ttf", 400),
  face("Owners Text", "packages/web/src/fonts/OwnersText-Medium.ttf", 500),
].join("\n");


// --- reuse existing markup + component CSS ---
const html = read("preview/nemo-artifact.html");
const styleContent = html.split("<style>")[1].split("</style>")[0];
const RESET = "* { box-sizing: border-box; }";
const componentCss = RESET + styleContent.split(RESET)[1];

let body = html.split("</style>")[1];
// real tonal ramps in the color-scale builders
body = body
  .replace(/scale\('blueScale',\s*'blue',\s*\[[^\]]*\]\)/, "scale('blueScale','blue',[0,10,20,30,40,50,60,70,80,90,95,100])")
  .replace(/scale\('neutralScale',\s*'neutral',\s*\[[^\]]*\]\)/, "scale('neutralScale','gray',[0,10,20,30,40,50,60,70,80,90,95,100])");
// Escape non-ASCII (accents, emoji) to HTML entities so the page renders
// correctly regardless of the charset the host applies (the base64 font blob
// at the top otherwise trips charset sniffing → mojibake).
body = body.replace(/[^\x00-\x7F]/gu, (c) => "&#" + c.codePointAt(0) + ";");

const out = `<style>\n${fontsCss}\n\n${tokensCss}\n\n${componentCss}\n</style>\n${body}`;
writeFileSync(resolve(ROOT, "preview/nemo-artifact.html"), out);
console.log("🐟  nemo-artifact.html rebuilt with real tokens + embedded Owners fonts (", Math.round(out.length / 1024), "KB )");
