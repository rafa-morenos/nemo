/**
 * Nemo AI kit — makes the design system usable from a chat (Claude, ChatGPT,
 * Cursor…) to generate screens, prototypes and docs, not only from the repo.
 *
 * Everything here is DERIVED from the real sources, never hand-written, so it
 * can't drift from production code:
 *   - tokens      ← build/web/nemo.css + nemo.dark.css (Style Dictionary output)
 *   - role map    ← packages/web/tailwind.preset.js
 *   - components  ← packages/web/src/components/**.tsx (+ .stories.tsx), parsed with the TS AST
 *   - icons       ← packages/web/src/icons/*.tsx, rendered to static SVG
 * The only hand-written part is src/guidelines.md (the rules on top of the catalog).
 *
 * Outputs (packages/ai-kit/dist/):
 *   nemo.llm.md      — single-file context for an LLM (guidelines + tokens + components + icons)
 *   nemo.js          — drop-in runtime for chat-generated HTML: injects tokens (light/dark),
 *                      Inter, and configures the Tailwind Play CDN with the Nemo preset
 *   nemo-icons.js    — <i data-nemo-icon="name"> → official Daki SVG
 *   nemo.css         — same tokens as a plain stylesheet (no Tailwind)
 *   tailwind.preset.js — the preset itself, for any Tailwind v3 setup
 *   skill/nemo-design/ + nemo-design-skill.zip — Claude Skill (upload the zip to claude.ai)
 *
 *   npm run build:tokens && npm run build:ai-kit
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from "node:fs";
import { resolve, dirname, basename, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const WEB = resolve(ROOT, "packages/web");
const DIST = resolve(__dirname, "dist");
const read = (p) => readFileSync(resolve(ROOT, p), "utf8");
const requireWeb = createRequire(resolve(WEB, "package.json"));
const ts = requireWeb("typescript");

// Public URLs the guide tells the LLM to load. Override when the kit is hosted
// somewhere else (e.g. NEMO_AI_KIT_BASE=https://cdn.jsdelivr.net/npm/@daki/nemo-ai-kit@0/dist).
const BASE = process.env.NEMO_AI_KIT_BASE ?? "https://cdn.jsdelivr.net/gh/rafa-morenos/nemo@main/packages/ai-kit/dist";

if (!existsSync(resolve(ROOT, "build/web/nemo.css"))) {
  console.error("build/web/nemo.css not found — run `npm run build:tokens` first.");
  process.exit(1);
}
rmSync(DIST, { recursive: true, force: true }); // no stale outputs from renamed/removed files
mkdirSync(DIST, { recursive: true });

// ───────────────────────────── tokens ─────────────────────────────
function parseVars(css) {
  const out = {};
  for (const m of css.matchAll(/(--nemo-[\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}
const lightCss = read("build/web/nemo.css");
const darkCss = read("build/web/nemo.dark.css");
const lightVars = parseVars(lightCss);
const darkVars = { ...lightVars, ...parseVars(darkCss) };

function resolveVar(vars, value, depth = 0) {
  if (depth > 10) return value;
  return value.replace(/var\((--nemo-[\w-]+)\)/g, (_, n) => (vars[n] ? resolveVar(vars, vars[n], depth + 1) : n));
}
const light = (name) => resolveVar(lightVars, lightVars[name] ?? "");
const dark = (name) => resolveVar(darkVars, darkVars[name] ?? "");

const ALIAS_GROUPS = ["surface", "text", "border", "icon", "interactive", "background"];
const aliasNames = Object.keys(lightVars).filter((n) =>
  ALIAS_GROUPS.some((g) => n.startsWith(`--nemo-color-${g}-`))
);

// Token CSS bundle shared by nemo.css / nemo.js. Owners is proprietary and not
// shipped publicly, so outside Daki's apps it falls back to Inter (Google Fonts).
const lightBlock = lightCss.replace(/\/\*[\s\S]*?\*\//g, "").trim();
const darkInner = darkCss.slice(darkCss.indexOf("{") + 1, darkCss.lastIndexOf("}")).trim();
const tokensCss = [
  lightBlock,
  `:root {\n  --nemo-font-family-owners-text: 'Owners Text', Inter, system-ui, sans-serif;\n  --nemo-font-family-owners-narrow: 'Owners Narrow', Inter, system-ui, sans-serif;\n}`,
  `.dark, :root[data-theme="dark"] {\n${darkInner}\n}`,
  `@media (prefers-color-scheme: dark) {\n:root:not([data-theme="light"]) {\n${darkInner}\n}\n}`,
  `body {\n  background: var(--nemo-color-surface-neutral-primary);\n  color: var(--nemo-color-text-neutral-primary);\n  font-family: var(--nemo-font-family-inter);\n}`,
].join("\n\n");
const INTER_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";

// ───────────────────────────── preset ─────────────────────────────
const preset = (await import(pathToFileURL(resolve(WEB, "tailwind.preset.js")).href)).default;
// Colors are functions ({ opacityValue }) => … so `bg-x/50` works; JSON would
// drop them silently. Serialize to JS source instead: each color function is
// sampled (no opacity → its plain var()) and re-emitted as A("var(--…)"), with
// A() redefined in the runtime to rebuild the same color-mix() behavior.
const colorVar = (val) => (typeof val === "function" ? val({}) : val);
function toJs(value) {
  if (typeof value === "function") return `A(${JSON.stringify(colorVar(value))})`;
  if (Array.isArray(value)) return `[${value.map(toJs).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.entries(value).map(([k, v]) => `${JSON.stringify(k)}:${toJs(v)}`).join(",")}}`;
  return JSON.stringify(value);
}
const tailwindConfigJs = toJs({ darkMode: preset.darkMode, corePlugins: preset.corePlugins, theme: preset.theme });

const roleRows = [];
(function walk(obj, path) {
  for (let [k, v] of Object.entries(obj)) {
    const p = k === "DEFAULT" ? path : [...path, k];
    if (typeof v === "string" || typeof v === "function") {
      v = colorVar(v);
      const varName = v.match(/var\((--nemo-[\w-]+)\)/)?.[1];
      roleRows.push({ role: p.join("-"), token: varName, light: varName ? light(varName) : v, dark: varName ? dark(varName) : v });
    } else walk(v, p);
  }
})(preset.theme.extend.colors, []);

// ─────────────────────────── components ───────────────────────────
const COMP_DIR = resolve(WEB, "src/components");
const SKIP = /\.(stories|figma)\.tsx$/;

function sourceFile(path) {
  return ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}
function jsDocOf(node, sf) {
  const ranges = ts.getLeadingCommentRanges(sf.text, node.getFullStart()) ?? [];
  const docs = ranges.map((r) => sf.text.slice(r.pos, r.end)).filter((t) => t.startsWith("/**"));
  if (!docs.length) return "";
  return docs
    .at(-1)
    .replace(/^\/\*\*|\*\/$/g, "")
    .split("\n")
    .map((l) => l.replace(/^\s*\* ?/, ""))
    .join("\n")
    .trim();
}
const firstParagraph = (s, max = 500) => {
  const p = (s.split(/\n\s*\n/)[0] ?? "").replace(/\s+/g, " ").trim();
  if (p.length <= max) return p;
  const cut = p.slice(0, max);
  const dot = cut.lastIndexOf(". ");
  return (dot > max * 0.5 ? cut.slice(0, dot + 1) : cut + "…").trim();
};
const strValue = (n) => (n && (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) ? n.text : null);
const propName = (n) => (ts.isIdentifier(n) || ts.isStringLiteral(n) ? n.text : n.getText());

function objToPlain(node) {
  if (!node) return null;
  if (ts.isObjectLiteralExpression(node)) {
    const o = {};
    for (const p of node.properties) if (ts.isPropertyAssignment(p)) o[propName(p.name)] = objToPlain(p.initializer);
    return o;
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(objToPlain);
  const s = strValue(node);
  if (s != null) return s;
  return node.getText();
}

/** One cn() argument: literal, `cond && "x"` → [cond: x], `c ? "a" : "b"` → [c ? a : b], nested call → {fn}. */
function clsArg(a) {
  if (ts.isParenthesizedExpression(a)) a = a.expression;
  const s = strValue(a);
  if (s != null) return s;
  if (ts.isCallExpression(a)) return a.expression.getText() === "cn" ? classesOf(a) : `{${a.expression.getText()}}`;
  if (ts.isBinaryExpression(a) && a.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
    const r = clsArg(a.right);
    return r ? `[${a.left.getText()}: ${r}]` : null;
  }
  if (ts.isConditionalExpression(a)) {
    const t = clsArg(a.whenTrue) ?? "∅", f = clsArg(a.whenFalse) ?? "∅";
    return `[${a.condition.getText()} ? ${t} : ${f}]`;
  }
  return null;
}

/** Classes passed to className=: literal, cn("a", cond && "b") → base literals only, or a cva call. */
function classesOf(expr) {
  if (!expr) return null;
  if (ts.isJsxExpression(expr)) expr = expr.expression;
  const s = strValue(expr);
  if (s != null) return s;
  if (expr && ts.isCallExpression(expr)) {
    const callee = expr.expression.getText();
    if (callee === "cn" || callee === "clsx") {
      const parts = expr.arguments.map(clsArg).filter(Boolean);
      return parts.length ? parts.join(" ") : null;
    }
    return `{${callee}}`;
  }
  return null;
}

function firstJsx(node) {
  let found = null;
  (function visit(n) {
    if (found) return;
    if (ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) {
      found = ts.isJsxElement(n) ? n.openingElement : n;
      return;
    }
    ts.forEachChild(n, visit);
  })(node);
  if (!found) return null;
  const outer = ts.isJsxOpeningElement(found) ? found.parent : found;
  const attrs = { source: dedent(outer.getText()) };
  for (const a of found.attributes.properties) {
    if (!ts.isJsxAttribute(a)) continue;
    const name = a.name.getText();
    if (name === "className") attrs.className = classesOf(a.initializer);
    else if (name === "data-slot" || name === "role") attrs[name] = strValue(a.initializer) ?? classesOf(a.initializer);
  }
  return { tag: found.tagName.getText(), ...attrs };
}

function analyze(file) {
  const sf = sourceFile(file);
  const cvas = [];
  const comps = new Map();
  const props = [];
  const exported = new Set();
  let moduleDoc = "";

  for (const st of sf.statements) {
    if (ts.isImportDeclaration(st)) continue;
    if (!moduleDoc) moduleDoc = jsDocOf(st, sf);

    if (ts.isExportDeclaration(st) && st.exportClause && ts.isNamedExports(st.exportClause)) {
      for (const e of st.exportClause.elements) if (!e.isTypeOnly) exported.add(e.name.text);
    }
    const isExported = st.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);

    if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        const name = d.name.getText();
        if (isExported) exported.add(name);
        const init = d.initializer;
        if (init && ts.isCallExpression(init) && init.expression.getText() === "cva") {
          const cfg = objToPlain(init.arguments[1]) ?? {};
          cvas.push({ name, base: strValue(init.arguments[0]) ?? "", ...cfg });
        } else if (/^[A-Z]/.test(name) && init) {
          comps.set(name, { name, doc: jsDocOf(st, sf), root: firstJsx(init) });
        }
      }
    } else if (ts.isFunctionDeclaration(st) && st.name) {
      const name = st.name.text;
      if (isExported) exported.add(name);
      if (/^[A-Z]/.test(name)) comps.set(name, { name, doc: jsDocOf(st, sf), root: firstJsx(st) });
    } else if ((ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st)) && /Props$/.test(st.name.text)) {
      const members = ts.isInterfaceDeclaration(st)
        ? st.members
        : ts.isTypeLiteralNode(st.type)
          ? st.type.members
          : ts.isIntersectionTypeNode(st.type)
            ? st.type.types.filter(ts.isTypeLiteralNode).flatMap((t) => [...t.members])
            : [];
      const list = members.filter(ts.isPropertySignature).map((m) => ({
        name: propName(m.name),
        optional: !!m.questionToken,
        type: (m.type?.getText() ?? "unknown").replace(/\s+/g, " "),
        doc: firstParagraph(jsDocOf(m, sf), 160),
      }));
      const ext = ts.isInterfaceDeclaration(st)
        ? (st.heritageClauses ?? []).flatMap((h) => h.types.map((t) => t.getText().replace(/\s+/g, " ")))
        : [];
      props.push({ name: st.name.text, extends: ext, members: list });
    }
  }
  return {
    moduleDoc,
    cvas,
    comps: [...comps.values()].filter((c) => exported.has(c.name)),
    props,
  };
}

function dedent(text) {
  const lines = text.split("\n");
  const indent = Math.min(...lines.slice(1).filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length), Infinity);
  return [lines[0], ...lines.slice(1).map((l) => l.slice(Number.isFinite(indent) ? indent : 0))].join("\n");
}

function analyzeStories(file) {
  if (!existsSync(file)) return null;
  const sf = sourceFile(file);
  let title = null;
  const stories = [];
  const NOISE = /^(Matrix|Playground|All|AllVariants|Variants|Sizes)$/;
  for (const st of sf.statements) {
    if (!ts.isVariableStatement(st)) continue;
    const exp = st.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    for (const d of st.declarationList.declarations) {
      let init = d.initializer;
      while (init && (ts.isSatisfiesExpression?.(init) || ts.isAsExpression(init))) init = init.expression;
      if (!init || !ts.isObjectLiteralExpression(init)) continue;
      if (d.name.getText() === "meta") {
        const t = init.properties.find((p) => ts.isPropertyAssignment(p) && propName(p.name) === "title");
        title = t ? strValue(t.initializer) : null;
        continue;
      }
      if (!exp) continue;
      const render = init.properties.find((p) => ts.isPropertyAssignment(p) && propName(p.name) === "render");
      let jsx = null;
      if (render && ts.isArrowFunction(render.initializer)) {
        let body = render.initializer.body;
        if (ts.isParenthesizedExpression(body)) body = body.expression;
        if (ts.isJsxElement(body) || ts.isJsxFragment(body) || ts.isJsxSelfClosingElement(body)) jsx = dedent(body.getText());
      }
      stories.push({ name: d.name.getText(), doc: firstParagraph(jsDocOf(st, sf), 200), jsx, noisy: NOISE.test(d.name.getText()) });
    }
  }
  const example = stories.find((s) => s.jsx && !s.noisy && s.jsx.split("\n").length <= 40) ?? stories.find((s) => s.jsx && s.jsx.split("\n").length <= 40);
  return { title, stories, example };
}

const modules = [];
for (const entry of readdirSync(COMP_DIR, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    const dir = join(COMP_DIR, entry.name);
    const files = readdirSync(dir).filter((f) => f.endsWith(".tsx") && !SKIP.test(f) && f !== "icons.tsx");
    const stories = readdirSync(dir).find((f) => f.endsWith(".stories.tsx"));
    modules.push({ id: entry.name, files: files.map((f) => join(dir, f)), stories: stories ? join(dir, stories) : null });
  } else if (entry.name.endsWith(".tsx") && !SKIP.test(entry.name)) {
    const id = entry.name.replace(/\.tsx$/, "");
    modules.push({ id, files: [join(COMP_DIR, entry.name)], stories: join(COMP_DIR, `${id}.stories.tsx`) });
  }
}
modules.sort((a, b) => a.id.localeCompare(b.id));

const DAKI_SPECIFIC = new Set(["add-to-cart", "attachment", "bubble", "collection-banner", "kanban-card", "menu-item", "menu-shortcut", "navigation-bar", "product-card", "product-tile"]);

function renderCva(c) {
  const out = [`- \`${c.name}\` base: \`${c.base}\``];
  for (const [key, opts] of Object.entries(c.variants ?? {})) {
    out.push(`  - \`${key}\`${c.defaultVariants?.[key] != null ? ` (padrão \`${c.defaultVariants[key]}\`)` : ""}:`);
    for (const [opt, cls] of Object.entries(opts)) out.push(`    - \`${opt}\`${cls ? `: \`${cls}\`` : ""}`);
  }
  if (Array.isArray(c.compoundVariants) && c.compoundVariants.length) {
    out.push(`  - combinações:`);
    for (const cv of c.compoundVariants) {
      const { className, class: klass, ...when } = cv;
      out.push(`    - ${Object.entries(when).map(([k, v]) => `${k}=${v}`).join(" + ")}: \`${className ?? klass}\``);
    }
  }
  return out.join("\n");
}

function renderModule(m) {
  const parts = m.files.map(analyze);
  const story = m.stories ? analyzeStories(m.stories) : null;
  const comps = parts.flatMap((p) => p.comps);
  if (!comps.length) return null;
  const title = story?.title?.split("/").at(-1) ?? comps[0].name;
  const doc = parts.map((p) => p.moduleDoc).find(Boolean) ?? "";
  const lines = [`### ${title}`, ""];
  lines.push(`\`${m.id}\` · exporta ${comps.map((c) => `\`${c.name}\``).join(", ")}`, "");
  if (doc) lines.push(firstParagraph(doc), "");

  const cvas = parts.flatMap((p) => p.cvas);
  if (cvas.length) lines.push("**Variantes (classes reais):**", "", ...cvas.map(renderCva), "");

  const anatomy = comps.filter((c) => c.root && (c.root.className || c.root["data-slot"]));
  if (anatomy.length) {
    lines.push("**Anatomia (elemento raiz → classes):**", "");
    for (const c of anatomy) {
      const slot = c.root["data-slot"] ? ` data-slot="${c.root["data-slot"]}"` : "";
      const own = c.doc && c.doc !== doc ? ` — ${firstParagraph(c.doc, 180)}` : "";
      lines.push(`- \`${c.name}\` → \`<${c.root.tag}${slot}>\`${c.root.className ? ` \`${c.root.className}\`` : ""}${own}`);
    }
    lines.push("");
  }

  // Daki-specific components: the real production markup is the most faithful
  // recipe (inner icon/label classes, conditional states), so ship it verbatim.
  if (DAKI_SPECIFIC.has(m.id)) {
    const withSrc = comps.filter((c) => c.root?.source && c.root.source.split("\n").length <= 90);
    if (withSrc.length) {
      lines.push("**Marcação de produção (JSX):**", "");
      for (const c of withSrc) lines.push(`\`${c.name}\`:`, "", "```tsx", c.root.source, "```", "");
    }
  }

  const propsList = parts.flatMap((p) => p.props).filter((p) => p.members.length);
  if (propsList.length) {
    lines.push("**Props:**", "");
    for (const p of propsList) {
      lines.push(`- \`${p.name}\`${p.extends.length ? ` (estende ${p.extends.map((e) => `\`${e}\``).join(", ")})` : ""}`);
      for (const mm of p.members) lines.push(`  - \`${mm.name}${mm.optional ? "?" : ""}: ${mm.type}\`${mm.doc ? ` — ${mm.doc}` : ""}`);
    }
    lines.push("");
  }

  if (story?.stories.length) {
    lines.push(`**Stories:** ${story.stories.map((s) => (s.doc ? `${s.name} (${s.doc})` : s.name)).join(" · ")}`, "");
  }
  if (story?.example) {
    lines.push(`**Exemplo (React, story \`${story.example.name}\`):**`, "", "```tsx", story.example.jsx, "```", "");
  }
  return { id: m.id, title, daki: DAKI_SPECIFIC.has(m.id), md: lines.join("\n") };
}

const rendered = modules.map(renderModule).filter(Boolean);

// ───────────────────────────── icons ─────────────────────────────
// Transpile the icon modules next to packages/web's node_modules (so `react`
// resolves) and render each to static SVG markup.
const ICON_DIR = resolve(WEB, "src/icons");
const TMP = resolve(WEB, "node_modules/.cache/nemo-ai-kit");
rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });
const React = requireWeb("react");
const { renderToStaticMarkup } = requireWeb("react-dom/server");
const iconFiles = readdirSync(ICON_DIR).filter((f) => f.endsWith(".tsx"));
const icons = {}; // kebab name → { svg, category, exportName }
const toKebab = (s) => s.replace(/^Daki/, "").replace(/Icon$/, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
for (const f of iconFiles) {
  const src = readFileSync(join(ICON_DIR, f), "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const out = join(TMP, f.replace(/\.tsx$/, ".cjs"));
  writeFileSync(out, js);
  const mod = createRequire(out)(out);
  for (const [exportName, Comp] of Object.entries(mod)) {
    if (typeof Comp !== "function") continue;
    icons[toKebab(exportName)] = { exportName, category: f.replace(/\.tsx$/, ""), svg: renderToStaticMarkup(React.createElement(Comp, { "aria-hidden": "true" })) };
  }
}
rmSync(TMP, { recursive: true, force: true });

// ─────────────────────────── nemo.llm.md ───────────────────────────
const guidelines = readFileSync(resolve(__dirname, "src/guidelines.md"), "utf8")
  .replaceAll("{{NEMO_JS_URL}}", `${BASE}/nemo.js`)
  .replaceAll("{{NEMO_ICONS_URL}}", `${BASE}/nemo-icons.js`);

const md = [];
md.push(guidelines.trim(), "");
md.push("## Cores de papel (classes Tailwind)", "");
md.push("Use como `bg-<papel>`, `text-<papel>`, `border-<papel>`, `ring-<papel>`. Valores resolvidos claro / escuro.", "");
md.push("| Papel | Token | Claro | Escuro |", "|---|---|---|---|");
for (const r of roleRows) md.push(`| \`${r.role}\` | \`${r.token ?? "—"}\` | ${r.light} | ${r.dark} |`);
md.push("");

md.push("## Escalas", "");
const spacing = preset.theme.extend.spacing;
md.push(`**Espaço** (\`p-*\`, \`m-*\`, \`gap-*\`, \`w-*\`…): ${Object.entries(spacing).map(([k, v]) => `\`${k}\`=${light(v.match(/--nemo-[\w-]+/)[0])}`).join(", ")}. Outros passos (\`0.5\`, \`1.5\`, \`2.5\`…) seguem o padrão do Tailwind.`, "");
md.push(`**Raio** (\`rounded-*\`): ${Object.entries(preset.theme.extend.borderRadius).map(([k, v]) => `\`${k}\`=${light(v.match(/--nemo-[\w-]+/)[0])}`).join(", ")}.`, "");
md.push(`**Texto** (\`text-*\`): ${Object.entries(preset.theme.extend.fontSize).map(([k, v]) => `\`${k}\`=${light(v.match(/--nemo-[\w-]+/)[0])}`).join(", ")}.`, "");
md.push(`**Família**: \`font-sans\` = Inter (UI/corpo) · \`font-heading\` = Owners Text (títulos) · \`font-display\` = Owners Narrow black (destaque).`, "");

md.push("## Tokens de alias (CSS puro)", "");
md.push("Para contextos sem Tailwind use `var(<token>)`. Prefira os papéis acima; esta lista é a fonte completa.", "");
md.push("| Token | Claro | Escuro |", "|---|---|---|");
for (const n of aliasNames) md.push(`| \`${n}\` | ${light(n)} | ${dark(n)} |`);
md.push("");

md.push("## Componentes", "");
md.push(
  "Cada componente lista as **classes reais** do código de produção (`packages/web/src/components`). Em HTML, reproduza a mesma estrutura e classes; em React, importe de `@nemo/web`. `{fooVariants}` = classes da variante escolhida, listadas logo acima.",
  ""
);
md.push("### Índice", "");
md.push(`- **Específicos da Daki:** ${rendered.filter((r) => r.daki).map((r) => r.title).join(", ")}`);
md.push(`- **Base (shadcn/ui tematizado):** ${rendered.filter((r) => !r.daki).map((r) => r.title).join(", ")}`, "");
for (const r of [...rendered.filter((r) => r.daki), ...rendered.filter((r) => !r.daki)]) md.push(r.md);

md.push("## Ícones oficiais (icons-DakiApp)", "");
md.push("Uso em HTML (com `nemo-icons.js`): `<i data-nemo-icon=\"<nome>\" class=\"size-6\"></i>`. Monocromáticos herdam `currentColor`; `delivery-statuses` e `payments` têm cor própria (a cor é o significado / é a marca).", "");
const byCat = {};
for (const [k, v] of Object.entries(icons)) (byCat[v.category] ??= []).push(k);
for (const [cat, names] of Object.entries(byCat)) md.push(`- **${cat}:** ${names.map((n) => `\`${n}\``).join(", ")}`);
md.push("");

const header = `<!-- Gerado por packages/ai-kit/build.mjs em ${new Date().toISOString().slice(0, 10)}. Não editar à mão. -->\n\n`;
writeFileSync(resolve(DIST, "nemo.llm.md"), header + md.join("\n"));

// ─────────────────────────── runtime files ───────────────────────────
writeFileSync(resolve(DIST, "nemo.css"), `/* Nemo — tokens (gerado, não editar) */\n@import url("${INTER_URL}");\n\n${tokensCss}\n`);
// The preset is dependency-free ESM — ship it verbatim (functions included).
writeFileSync(resolve(DIST, "tailwind.preset.js"), readFileSync(resolve(WEB, "tailwind.preset.js"), "utf8"));

const nemoJs = `/*! Nemo AI kit — tokens + tema Tailwind da Daki (gerado por packages/ai-kit/build.mjs, não editar).
 * Carregue DEPOIS de https://cdn.tailwindcss.com. */
(function () {
  var d = document, w = window;
  var CSS = ${JSON.stringify(tokensCss)};
  function A(c) {
    return function (o) {
      return o.opacityValue === undefined ? c : "color-mix(in srgb, " + c + " " + Number(o.opacityValue) * 100 + "%, transparent)";
    };
  }
  var CONFIG = ${tailwindConfigJs};
  if (!d.getElementById("nemo-tokens")) {
    var s = d.createElement("style"); s.id = "nemo-tokens"; s.textContent = CSS; d.head.appendChild(s);
    var l = d.createElement("link"); l.rel = "stylesheet"; l.href = ${JSON.stringify(INTER_URL)}; d.head.appendChild(l);
  }
  if (w.tailwind) w.tailwind.config = CONFIG;
  // Mirror the effective theme on <html class="dark"> so Tailwind's class-based
  // dark: variants agree with the token flip (system preference unless data-theme is set).
  var root = d.documentElement, mq = w.matchMedia && w.matchMedia("(prefers-color-scheme: dark)");
  function sync() {
    var t = root.getAttribute("data-theme");
    root.classList.toggle("dark", t ? t === "dark" : !!(mq && mq.matches));
  }
  sync();
  if (mq && mq.addEventListener) mq.addEventListener("change", sync);
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  w.Nemo = Object.assign(w.Nemo || {}, { tailwindConfig: CONFIG, css: CSS });
})();
`;
writeFileSync(resolve(DIST, "nemo.js"), nemoJs);

const iconMap = Object.fromEntries(Object.entries(icons).map(([k, v]) => [k, v.svg]));
const iconsJs = `/*! Nemo AI kit — ícones oficiais icons-DakiApp (gerado, não editar).
 * <i data-nemo-icon="tabbar-home" class="size-6"></i> → SVG oficial. */
(function () {
  var ICONS = ${JSON.stringify(iconMap)};
  function render(el) {
    var svg = ICONS[el.getAttribute("data-nemo-icon")];
    if (!svg) { console.warn("[nemo] ícone desconhecido:", el.getAttribute("data-nemo-icon")); return; }
    var tpl = document.createElement("template"); tpl.innerHTML = svg;
    var node = tpl.content.firstChild;
    var cls = el.getAttribute("class"); if (cls) node.setAttribute("class", cls);
    var label = el.getAttribute("aria-label");
    if (label) { node.removeAttribute("aria-hidden"); node.setAttribute("role", "img"); node.setAttribute("aria-label", label); }
    el.replaceWith(node);
  }
  function scan(root) { (root.querySelectorAll ? root : document).querySelectorAll("[data-nemo-icon]").forEach(render); }
  function start() {
    scan(document);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) { m.addedNodes.forEach(function (n) {
        if (n.nodeType !== 1) return;
        if (n.hasAttribute("data-nemo-icon")) render(n); else scan(n);
      }); });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  window.Nemo = Object.assign(window.Nemo || {}, { icons: ICONS });
})();
`;
writeFileSync(resolve(DIST, "nemo-icons.js"), iconsJs);

// ───────────────────────────── skill ─────────────────────────────
// Claude Skill (claude.ai org skill / Claude Code): SKILL.md + bundled copies of
// the catalog and runtime, so it works offline too. Zipped for upload.
const SKILL = resolve(DIST, "skill/nemo-design");
rmSync(resolve(DIST, "skill"), { recursive: true, force: true });
mkdirSync(resolve(SKILL, "reference"), { recursive: true });
mkdirSync(resolve(SKILL, "assets"), { recursive: true });
writeFileSync(resolve(SKILL, "SKILL.md"), readFileSync(resolve(__dirname, "skill/SKILL.md"), "utf8").replaceAll("https://cdn.jsdelivr.net/gh/rafa-morenos/nemo@main/packages/ai-kit/dist", BASE));
writeFileSync(resolve(SKILL, "reference/nemo.llm.md"), readFileSync(resolve(DIST, "nemo.llm.md")));
for (const f of ["nemo.js", "nemo-icons.js", "nemo.css"]) writeFileSync(resolve(SKILL, "assets", f), readFileSync(resolve(DIST, f)));
const zipPath = resolve(DIST, "nemo-design-skill.zip");
rmSync(zipPath, { force: true });
try {
  execFileSync("zip", ["-qrX", zipPath, "nemo-design"], { cwd: resolve(DIST, "skill") });
} catch {
  console.warn("! `zip` indisponível — compacte dist/skill/nemo-design manualmente para subir no claude.ai.");
}

const kb = (f) => (readFileSync(resolve(DIST, f)).length / 1024).toFixed(1) + " KB";
console.log(`✓ ai-kit → packages/ai-kit/dist
  nemo.llm.md          ${kb("nemo.llm.md")}  (${rendered.length} componentes, ${roleRows.length} papéis, ${aliasNames.length} tokens, ${Object.keys(icons).length} ícones)
  nemo.js              ${kb("nemo.js")}
  nemo-icons.js        ${kb("nemo-icons.js")}
  nemo.css             ${kb("nemo.css")}
  tailwind.preset.js   ${kb("tailwind.preset.js")}
  skill/nemo-design/   (+ nemo-design-skill.zip ${existsSync(zipPath) ? kb("nemo-design-skill.zip") : "—"})`);
