# 🐟 Nemo — Design System da Daki

Nemo é o design system multiplataforma da Daki. Uma **única fonte de verdade** de tokens (no
Figma) alimenta **web (shadcn/ui + Tailwind), React Native e Flutter** — sem cor hardcoded,
sem tema divergindo entre plataformas.

Inspirado no case do [Lemon Pie](https://www.linkedin.com/pulse/lemon-pie-como-constru%C3%ADmos-um-design-system-feito-para-karol-benatti-jtagf):
um DS nasce dos **tokens**, não dos componentes.

---

## Arquitetura

```
Figma (Design Tokens V3)
        │  export de variáveis → JSON (DTCG)
        ▼
tokens/*.json          ← fonte única de verdade
        │  Style Dictionary (build/build.mjs)
        ▼
┌───────────────┬──────────────┬───────────────┬────────────────────┐
│ web/nemo.css  │ ts/tokens.ts │ rn/theme.*.ts │ flutter/…dart      │
│ + dark.css    │              │ (light+dark)  │ (NemoTokens)       │
└───────┬───────┴──────────────┴───────────────┴────────────────────┘
        │
   Tailwind preset (packages/web) → shadcn/ui já tematizado
```

**Camadas de token:**
- `tokens/core.json` — primitivos crus: escala `blue`/`neutral`, `space`, `radius` (xs→full,
  `md = 8px`), `borderWidth`, `shadow` (composite DTCG sm/md/lg) e tipografia. O azul é o "mar
  azulão"; a âncora é `blue.700 = #001e6b` (vinda do Figma V3).
- `tokens/semantic.light.json` / `semantic.dark.json` — significado (surface, text, brand,
  border, feedback, **elevation**, **border.width**). **É essa camada que o código consome**,
  nunca os primitivos direto.

> Cor, radius, **border-width e shadow são todos tokens** — nada de valor solto nos componentes.
> Ex.: `box-shadow: var(--nemo-elevation-raised)`, `border: var(--nemo-border-width-default) …`.
> Shadows viram `box-shadow` shorthand na web, objeto no RN e `List<BoxShadow>` no Flutter.

**Componentes web (`packages/web/src/components`):** padrão shadcn/ui, todos tematizados pelos
tokens Nemo via o preset. Base: `Button`, `Card`, `Input`, `Switch`, `Text`,
`KanbanCard`/`KanbanTaskCard`. Set shadcn: `Accordion`, `Alert`, `AlertDialog`, `AspectRatio`,
`Avatar`, `Badge`, `Breadcrumb`, `ButtonGroup`, `Calendar`, `Carousel`, `Chart` (recharts),
`Checkbox`, `Collapsible`, `Combobox`, `Command` (cmdk), `ContextMenu`, `Dialog`, `Popover`,
`Table`, `DataTable` (@tanstack/react-table), `DatePicker`, `DropdownMenu`, `HoverCard`, `Label`,
`Drawer` (vaul), `DirectionProvider`, `Empty`, `Field`, `InputGroup`, `InputOTP` (input-otp),
`Item`, `Kbd`, `NavigationMenu`, `Pagination`, `Progress`, `RadioGroup`, `Resizable`,
`Select`, `Separator`, `Skeleton`, `Slider`, `Tabs`, `Textarea`, `Toggle`, `Tooltip`,
`ScrollArea`, `Sheet`, `Sidebar`, `Sonner`/`toast`, `Spinner`, `ToggleGroup`.
Mais componentes interpretados (não canônicos do shadcn): `Attachment`, `Bubble` e
`MenuItem`/`MenuSection`/`MenuList` (linhas de menu do app, sobre o padrão `Item`).
Cada um tem story no Storybook; o `shadcn` CLI também gera componentes novos já tematizados.

---

## Como rodar

```bash
npm install
npm run build:tokens
```

Gera tudo em `build/`. Preview rápido (HTML estático, sem build):

```bash
open preview/index.html
```

### Storybook — documentação viva

A doc navegável do DS (Foundations + Components, com toggle light/dark) vive em `packages/web`:

```bash
cd packages/web
npm install
npm run storybook        # http://localhost:6007
npm run build-storybook  # build estático em storybook-static/
```

- **Foundations** — Overview, Colors (primitivos + semânticos), Typography, Elevation, Radius & Spacing — tudo renderizado a partir dos tokens.
- **Components** — Button, Card, Input, Switch, Text, com `autodocs` e controles.
- Ícone de tema (🌗) na toolbar alterna light ↔ deep-sea (dark) aplicando a classe `.dark`.

---

## Consumindo em cada plataforma

### Web (shadcn/ui + Tailwind)

```js
// tailwind.config.js
import nemoPreset from "./packages/web/tailwind.preset.js";
export default { presets: [nemoPreset], content: ["./src/**/*.{ts,tsx}"] };
```

```ts
// no entry-point da app
import "nemo/build/web/nemo.css";
import "nemo/build/web/nemo.dark.css"; // dark mode via classe .dark no <html>
```

Os nomes de papel do shadcn (`bg-primary`, `text-foreground`, `border-border`, `ring-ring`…)
já apontam para as variáveis Nemo. Rode `npx shadcn add button card …` e os componentes
**nascem tematizados** — sem editar cor. Exemplos prontos em `packages/web/src/components`.

### React Native

```ts
import { light } from "nemo/build/rn/theme.light";
import { dark } from "nemo/build/rn/theme.dark";

const theme = colorScheme === "dark" ? dark : light;
<View style={{ backgroundColor: theme.color.surface.primary }}>
  <Text style={{ color: theme.color.text.primary }}>Olá</Text>
</View>
```

### Flutter

```dart
import 'nemo_tokens.dart';

Container(
  color: NemoTokens.colorSurfacePrimary,
  padding: EdgeInsets.all(NemoTokens.space4),
  child: Text('Olá', style: TextStyle(color: NemoTokens.colorTextPrimary)),
);
```

---

## 🔄 Trocar a semente pelos tokens reais do Figma

Os tokens em `tokens/` hoje são uma **semente** derivada da convenção de nomes e das cores-âncora
do arquivo V3 (`blue.700 #001e6b`, `neutral.50 #f7f8fb`). O MCP do Figma só lê variáveis *usadas
por um nó selecionado*, então não dá pra enumerar a coleção inteira por ali. Para tornar os tokens
100% fiéis:

1. No Figma, abra **Design Tokens V3** → painel de **Variables**.
2. Exporte as coleções para JSON no formato **DTCG/W3C** (`$value`/`$type`). Opções:
   - Nativo: **Export variables** (planos com essa feature), ou
   - Plugin **Tokens Studio** (*Export → W3C DTCG*), ou **variables2json**.
3. Substitua/mescle os arquivos em `tokens/` mantendo os nomes de grupo (`color`, `space`,
   `radius`, `font`) e a divisão light/dark.
4. `npm run build:tokens` — **todas** as plataformas regeneram automaticamente. Nenhum componente
   muda.

> Dica: mantenha `core` (primitivos) e `semantic` (aliases) separados no export. Se o Figma exportar
> tudo junto, o build ainda funciona; só garanta que os aliases usem referências `{color.blue.700}`.

---

## Estrutura

```
nemo/
├─ tokens/                    fonte única (DTCG)
│  ├─ core.json               primitivos
│  ├─ semantic.light.json     aliases (light)
│  └─ semantic.dark.json      aliases (dark)
├─ build/
│  ├─ build.mjs               Style Dictionary (custom Dart + RN formats)
│  ├─ web/  ts/  rn/  flutter/   ← gerados (git-ignored)
├─ packages/
│  ├─ web/
│  │  ├─ tailwind.preset.js   shadcn roles → Nemo vars
│  │  ├─ figma.config.json    Code Connect (figma:connect / figma:check)
│  │  ├─ .storybook/          config (React+Vite, tema light/dark)
│  │  └─ src/
│  │     ├─ components/       Button, Card, Input, Switch, Text, kanban-card/ (+ *.stories.tsx, *.figma.tsx)
│  │     ├─ foundations/      Overview.mdx, Colors, Elevation, Radius & Spacing
│  │     └─ lib/              cn()
│  ├─ react-native/           NemoThemeProvider + KanbanCard/KanbanTaskCard (RN, tokens gerados)
│  └─ flutter/                lib/ NemoTokens + kanban_card.dart + kanban_task_card.dart
└─ preview/index.html         playground estático light/dark
```

## Próximos passos sugeridos

- Trocar a semente pelo export real do Figma (acima).
- Publicar `build/` como pacote (`@daki/nemo-tokens`) versionado por semver.
- Automatizar: GitHub Action que roda `build:tokens` quando `tokens/` muda.
- Expandir componentes (Select, Toast, BottomSheet, Badge) — web via shadcn, RN e Flutter espelhando os mesmos tokens (Button/Card/Input/Switch/Text já prontos).
- Code Connect no Figma pra ligar componentes ↔ código.
