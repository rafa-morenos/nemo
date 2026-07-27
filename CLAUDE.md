# Nemo — Design System da Daki

Design system multiplataforma. **Uma fonte de tokens (Figma) → web (shadcn/ui + Tailwind), React Native e Flutter.** Marca azul ("mar azulão"), brand = `#0069ff`.

## Onde as coisas estão
- **Raiz:** `/Users/daki/Claude/Nemo-project` (⚠️ não mover pra `~/Documents`/Desktop/Downloads — macOS bloqueia o acesso por privacidade/TCC).
- `tokens/` — fonte DTCG: `core.json` (primitivos + layout + tipografia), `semantic.light.json` / `semantic.dark.json` (árvore de alias). `figma-export.tokens.json` = export bruto do Tokens Studio.
- `build/` — `build.mjs` (Style Dictionary), `import-figma-tokens.mjs` (Tokens Studio → tokens/), saídas em `build/{web,ts,rn,flutter}` + `build/manifest.json`.
- `packages/web` — Storybook + componentes React (shadcn) + `tailwind.preset.js`.
- `packages/react-native`, `packages/flutter` — espelhos (mesmos tokens gerados).
- `preview/nemo-artifact.html` + `build-artifact.mjs` — showcase estático (Artifact).

## Comandos
```bash
# rodar Storybook (porta 6007) — use a task do launch.json:
#   preview_start({ name: "storybook" })   ← preferir isto
cd /Users/daki/Claude/Nemo-project && npm run build:tokens          # regenera tokens → 4 plataformas
node build/import-figma-tokens.mjs                                  # reimporta o export do Figma
cd packages/web && npm run build-storybook                          # storybook-static/
node preview/build-artifact.mjs                                     # regenera o artifact
```
Storybook: **sempre** via `preview_start({name:"storybook"})` (nunca `npm` direto pra server). Ao adicionar deps novas, **reinicie** o server (preview_stop + preview_start) pra reotimizar.

## Como os tokens funcionam (importante)
- Sistema Material-3 em camadas: **Primitivos** (rampas tonais 0–100) → **Color Palette Light/Dark** → **Alias** (produto: `surface/text/border/icon/interactive/background`, cada um com `neutral/accent/semantic/medal`).
- A fonte de tokens é **100% o export do Figma** — não inventar tokens. Pra atualizar: exporta do Tokens Studio → substitui `tokens/figma-export.tokens.json` → `node build/import-figma-tokens.mjs && npm run build:tokens`.
- CSS vars: `--nemo-color-<grupo>-<...>`, `--nemo-space-*`, `--nemo-radius-*`, `--nemo-font-family-{inter,owners-text,owners-narrow}`, `--nemo-font-size-0..10`.
- **Preset Tailwind** (`packages/web/tailwind.preset.js`) mapeia os papéis do shadcn → tokens reais: `bg-primary`→`interactive-accent-primary-main`, `bg-background`→`surface-neutral-primary`, `text-foreground`→`text-neutral-primary`, `border-border`→`border-neutral-main`, `bg-card`→`surface-neutral-tertiary`, feedback `destructive/success/warning`→`icon-semantic-*`, e `sidebar-*`. Dark via classe `.dark`.

## Convenção pra adicionar um componente (shadcn-style)
1. `packages/web/src/components/<nome>.tsx` — source canônico do shadcn (New-York). Únicas mudanças: `import { cn } from "../lib/utils"` (relativo), ícones de `lucide-react`, cross-imports relativos (`"./button"`). Manter as classes de papel do shadcn (o preset tematiza). **Sem** `"use client"`.
2. `<nome>.stories.tsx` — story com `tags: ["autodocs"]`, exemplos em pt-BR com contexto Daki (pedidos/entrega).
3. Exportar em `packages/web/src/index.ts` (`export * from "./components/<nome>"`).
4. Se a lib for nova, adicionar em `packages/web/package.json` + `npm install` + reiniciar o Storybook.
5. Verificar no Storybook (screenshot) em light **e** dark.

Fontes de marca (Owners + Inter) já em `packages/web/src/fonts/` + `@font-face` em `src/styles.css`; RN em `assets/fonts/` (`react-native.config.js`/expo), Flutter em `pubspec.yaml`.

## Status
- ✅ Pipeline de tokens (Figma-only) → web/RN/Flutter; Storybook com Foundations (Colors, Alias Colors, Typography, Radius & Spacing) + ~49 componentes shadcn tematizados (inclui Menubar, Form/react-hook-form).
- ✅ `KanbanCard`/`KanbanTaskCard` (Order/Stacking/Task, urgência) espelhado em web/RN/Flutter + Code Connect. `MenuItem`/`MenuSection`/`MenuList` (menu do app).
- ✅ Artifact publicado (showcase estático).
- ✅ Graphify instalado e grafo gerado (`graphify-out/`: `graph.html`, `GRAPH_REPORT.md`, `graph.json`). Rodar `graphify query "<pergunta>"` pra navegar o repo sem reconstruir; `graphify-out/.graphify_python` guarda o interpreter certo. Reindexar depois de mudanças grandes: `/graphify . --update`.

## Próximos passos (backlog)
1. **Revisão de tokens por componente** — aproximar do produto Daki real: revisar tons de cinza (algum pode estar errado), ajustar *qual* token cada componente usa (não os valores). É ajuste isolado por componente.
2. **Componentes nativos/específicos da Daki** que não existem no shadcn — lista a preencher:
   - _(adicionar aqui os componentes conforme o time listar)_

> Trabalhar em **sessões curtas por bloco** (contexto enxuto): cada componente/ajuste é independente e verificável no Storybook.
