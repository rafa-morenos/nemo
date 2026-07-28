# Nemo — Design System da Daki

Design system multiplataforma. **Uma fonte de tokens (Figma) → web (shadcn/ui + Tailwind), React Native e Flutter.** Marca azul ("mar azulão"), brand = `#0069ff`.

## Onde as coisas estão
- **Raiz:** `/Users/daki/Desktop/nemo` (clone deste repo no GitHub — `rafa-morenos/nemo`). Nota: este clone é um snapshot mais cru que versões anteriores do projeto: não tem `.husky`/`commitlint`/`.changeset`/CI, e `node_modules`/`build/*` (gitignored) precisam ser gerados localmente (`npm install` + `npm run build:tokens`).
- `tokens/` — fonte DTCG: `core.json` (primitivos + layout + tipografia), `semantic.light.json` / `semantic.dark.json` (árvore de alias). `figma-export.tokens.json` = export bruto do Tokens Studio. `fixed.json` = **não vem do Figma** — pins hand-authored (`primary-fixed`/`destructive-fixed`/`success-fixed`/`warning-fixed`) pra cores que precisam ficar iguais nos dois temas; ver "Como os tokens funcionam".
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
- `semantic.light.json`/`semantic.dark.json` são **saída gerada**, não fonte — `import-figma-tokens.mjs` reconstrói os dois inteiros a partir do set `Alias colors /Value` do Figma a cada run. Editá-los na mão não sobrevive ao próximo import.
- Cada cor semântica (Critical/Success/Warning/Info) tem 8 roles na Color Palette do Figma, mas **só 4 chegam no Alias** (os únicos que `Alias colors /Value` referencia): `<Hue>` e `On <Hue> Container` → nossos `icon/border.semantic.*` (tom forte, junto com `Container`) e `text.semantic.*` (par "soft", o que o `filled` usa). O role `On <Hue>` — o texto branco correto pra usar quando `<Hue>` é o *fundo* (não ícone/borda) — nunca foi promovido pro Alias, só existe dentro da Color Palette. Sem ele, **não tem token pra um "solid" de verdade** (fundo forte + texto legível nos dois temas) pra success/warning/critical/info — só pra `default`/`inverted`, que usam `Interactive/Accent/Primary` (esse sim tem o par completo Primary/On Primary aliased). Ver `packages/web/src/components/badge.tsx` pro caso concreto. Os tokens `*-fixed` (`primary-fixed`/`destructive-fixed`/`success-fixed`/`warning-fixed`) **não** são o role real "Fixed" do Figma (que usa tons 90/80/10/30, sempre iguais nos dois temas) — são um pin ad-hoc pro tom 40/100 do light mode, deliberadamente **não vindo do Figma**. Viviam só como nome dentro de `tailwind.preset.js` (o site *parecia* usar um token com nome, mas por baixo apontava direto pro primitivo — RN/Flutter pegavam o primitivo sem nome nenhum); agora são gerados de verdade em `tokens/fixed.json` (fonte extra, hand-authored, incluída no `build.mjs` junto com `core.json`/`semantic.*.json`) — assim `--nemo-color-fixed-success` (web), `NemoTokens.colorFixedSuccess` (Flutter) e `t.color.fixed.success` (RN) apontam pro mesmo token gerado, não cada um pro primitivo cru por conta própria. A solução "de verdade" continua sendo promover o role `On <Hue>` no Alias do Figma (item 6 do backlog); quando isso existir, só troca a referência dentro de `tokens/fixed.json` (ou remove ele) — não precisa tocar em `badge.tsx`/`button.tsx`/RN/Flutter de novo.
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
- ✅ `Badge` (o Tag/Chip unificado) estendido com `size` (sm/md), `shape` (pill/square), `type="solid"` e `count` — fecha a spec proposta em `componentes-comuns-daki-ds.html` pra substituir os ~15 tags nativos dos produtos. Segundo componente (depois do Kanban) a chegar nas 3 plataformas: espelhado em RN (`Badge.tsx`) e Flutter (`NemoBadge` em `nemo_badge.dart`). Ressalva: `type="solid"` só é visualmente distinto do `filled` pra `default`/`inverted`/`disabled` (via `Interactive/Accent/Primary`, aliased de verdade) e `success`/`warning`/`critical` (via o pin `-fixed`, mesmo padrão que `button.tsx` já usa pra `default`/`destructive`) — pra `info` renderiza igual ao `filled` de propósito, porque não tem um tom forte dedicado (nem `button.tsx` tem esse caso) e falta o token real (ver backlog item 6).

## Próximos passos (backlog)
1. **Revisão de tokens por componente** — aproximar do produto Daki real: revisar tons de cinza (algum pode estar errado), ajustar *qual* token cada componente usa (não os valores). É ajuste isolado por componente.
2. **Componentes nativos/específicos da Daki** que não existem no shadcn — lista a preencher:
   - _(adicionar aqui os componentes conforme o time listar)_
3. **Migração dos ~15 tags legados dos produtos pro `Badge` unificado** (trabalho nos repos de cada produto, não no Nemo) — mapeamento já proposto em
   `Produtos daki • Projetos front/componentes-comuns-daki-ds.html`:
   - `super-daki-tag` (HUBR) → `color="default" type="solid"`
   - `status-tag` (daki-zeus, ×4 versões módulo) → `color="success|warning|critical"`
   - `DiscountTag` (Daki App/Web) → `color="critical" type="solid"`
   - `counter-tag`/`PickingAmountTags` (HUBR) → `count` sem `children`
   - `delivery_status_tag` → `color="success|warning"`
   - `medal_tag` → `color="default"`
   - `ModalityTag`, `TripCompensationTags` e demais variantes: mapear caso a caso ao migrar cada produto.
4. **Toast semântico** (`sonner.tsx`) — tematizar os variants success/error/warning/info/loading com os tokens Daki; análise já pronta em `Produtos daki • Projetos front/toast-dev-spec-migracao.html` e `racional-analise-toast.md`.
5. **Consistência de Modal/BottomSheet/Drawer** (stacking, swipe-to-dismiss, safe-area) — mapeado em `Produtos daki • Projetos front/eval-viewer-component-flow-mapping.html`; mais acoplado a navegação, custo maior de unificação.
6. **Falta o role "On Critical/On Success/On Warning/On Info" no Alias do Figma** — confirmado direto no arquivo [Design Tokens V3](https://www.figma.com/design/EoOw5gJH3q6IsCI9W1mtHd/%F0%9F%8E%A8-Design-Tokens-V3), página "1. Semantic groups" (node `4239:12502`, frame "Error Success Warning Info"): o role **existe e tem o valor certo já documentado** — `On Critical`=C-100/branco sobre C-40, `On Success`=SC-100/branco sobre SC-40, `On Warning`=W-100/branco sobre W-40, `On Info`=I-100/branco sobre I-40 (mesmos valores que já tinha achado no `Color Palette` bruto do `figma-export.tokens.json`). Só que essa página usa cor fixa nos swatches (confirmado via `get_variable_defs` — não tem variável vinculada), é documentação visual, não a fonte real. No set `Alias colors /Value` (o que `import-figma-tokens.mjs` de fato lê) esse role nunca foi promovido — só `On <Hue> Container` está lá. Sem ele, `Badge`'s `type="solid"` usa o pin `-fixed` (`success-fixed`/`warning-fixed`/`destructive-fixed`) como solução provisória pra success/warning/critical — `info` continua igual ao `filled`, sem pin, por não ter precedente nem em `button.tsx`. É tarefa pequena pra quem tem acesso ao Tokens Studio: adicionar ~4 aliases (ex. `Text/Semantic/Critical Strong → {Critical.On Critical}` e equivalentes) e reexportar; depois trocar os `-fixed` por eles em `badge.tsx`/`button.tsx`/RN/Flutter, sem inventar valor no código.

> Trabalhar em **sessões curtas por bloco** (contexto enxuto): cada componente/ajuste é independente e verificável no Storybook.
