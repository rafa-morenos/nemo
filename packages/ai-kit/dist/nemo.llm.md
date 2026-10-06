<!-- Gerado por packages/ai-kit/build.mjs em 2026-10-06. Não editar à mão. -->

# Nemo — Design System da Daki (guia para IA)

> Este arquivo é **gerado** (`npm run build:ai-kit`) a partir do código real do Nemo: tokens do Figma,
> preset Tailwind e fonte dos componentes web. Use-o como contexto para gerar **telas, protótipos,
> mockups e documentos** com a identidade da Daki. Não edite à mão — edite
> `packages/ai-kit/src/guidelines.md` ou o componente, e rode o build.

A Daki é um app de mercado com entrega rápida (pedidos, carrinho, entregas, rastreio). Marca azul —
brand `#0069ff`. Tom de voz em **pt-BR**, direto e próximo.

## Como carregar o Nemo numa página HTML

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- depois do Tailwind: injeta tokens (claro/escuro), fonte e configura o tema -->
  <script src="https://cdn.jsdelivr.net/gh/rafa-morenos/nemo@main/packages/ai-kit/dist/nemo.js"></script>
  <!-- opcional: ícones oficiais da Daki (<i data-nemo-icon="...">) -->
  <script src="https://cdn.jsdelivr.net/gh/rafa-morenos/nemo@main/packages/ai-kit/dist/nemo-icons.js"></script>
</head>
<body class="bg-background text-foreground font-sans">
  ...
</body>
</html>
```

- A ordem importa: **Tailwind CDN primeiro, `nemo.js` depois**.
- Sem Tailwind (ex.: CSS puro, doc, e-mail), use só as variáveis CSS (`var(--nemo-color-...)`) —
  `nemo.css` traz as mesmas variáveis como folha de estilo.
- Tema escuro: automático pelo sistema (`prefers-color-scheme`). Para forçar, use
  `<html data-theme="dark">` ou `<html data-theme="light">`. Os tokens trocam sozinhos — **não**
  escreva `dark:` com cores próprias.

## Regras de ouro

1. **Só cores de papel (role), nunca hex.** Use `bg-primary`, `text-muted-foreground`,
   `border-border`, `bg-success-soft text-success-soft-foreground` etc. (tabela abaixo). Nunca
   `bg-blue-500`, `#0069ff`, `text-gray-600` ou a paleta padrão do Tailwind — ela não é a da Daki.
2. **Nunca invente token.** Se um papel não existe, use o mais próximo da tabela e diga isso.
3. **Texto usa `text-*` / `*-foreground`**, nunca tokens `interactive-*` (esses são para fundo,
   borda e estado de interação).
4. **Pares fixos de contraste:** sempre combine o fundo com o seu `-foreground`
   (`bg-primary` + `text-primary-foreground`, `bg-destructive` + `text-destructive-foreground`,
   `bg-warning-soft` + `text-warning-soft-foreground`...). Esses pares já passam WCAG nos dois temas.
5. **Reaproveite as receitas dos componentes** (seção "Componentes") em vez de criar um visual
   novo: as classes listadas são exatamente as do código de produção.
6. **Espaçamento e raio da escala:** `p-1 … p-16` / `gap-*` mapeiam para os tokens de espaço,
   `rounded-sm|md|lg|xl|full` para os de raio. Evite valores arbitrários (`p-[13px]`).
7. **Tipografia:** `font-sans` (Inter) para UI e corpo; `font-heading` (Owners Text) para títulos;
   `font-display` (Owners Narrow, black) só para destaques grandes de marketing. Tamanhos:
   `text-2xs|xs|sm|md|lg|xl|2xl|3xl` (10/12/14/16/20/24/32/40px). Owners é fonte proprietária: fora
   dos apps da Daki ela cai para Inter — tudo bem.
8. **Ícones:** prefira os ícones oficiais (`<i data-nemo-icon="nome" class="size-6"></i>`, lista
   abaixo). Eles herdam a cor do texto (`currentColor`). Para ícones que não existem no acervo da
   Daki, use [lucide](https://lucide.dev) (mesmo estilo que os componentes usam).
9. **Acessibilidade faz parte do pronto:** foco visível (`focus-visible:ring-2 focus-visible:ring-ring`),
   `aria-label` em botão só-ícone, `aria-current="page"` em aba/item ativo, `aria-hidden="true"` em
   ícone decorativo, `sr-only` para informação que só existe como cor ou bolinha.
10. **Conteúdo realista da Daki em pt-BR:** pedidos (#48213), produtos de mercado ("Banana prata
    1kg", "Leite integral 1L"), preços em `R$ 12,90`, prazos ("Chega em 15 min"), status de
    entrega ("Saiu para entrega", "Entregue", "Atrasado").

## Telas de app (mobile)

- Largura de referência 375–430px; centralize num contêiner `max-w-[430px] mx-auto` quando gerar
  num navegador desktop.
- Fundo da tela `bg-background`; cartões `bg-card` com `rounded-lg`; separadores `border-border`.
- Barra de navegação inferior = componente **NavigationBar** (pílula azul `bg-primary`, itens
  `text-primary-foreground`; a aba ativa troca ícone e rótulo para `text-primary-active` + um traço
  `bg-primary-active` embaixo — **não** recebe fundo próprio). O fundo escuro `bg-primary-active`
  é exclusivo do item Sacola quando tem itens. Copie a marcação de produção da seção do componente.
  Posicione com `fixed inset-x-2 bottom-4`.
- Área de toque mínima de 44×44px.

## Documentos e visões (docs, relatórios, decks)

- Mesmas cores de papel: títulos `font-heading text-foreground`, texto corrido
  `text-muted-foreground` só para apoio, destaques em `text-primary-strong`.
- Status sempre como **Badge** (`success`/`warning`/`critical`/`info`) — nunca só cor de texto.
- Gráficos: série principal `primary`; demais séries nos tons semânticos e neutros. Não use a
  paleta padrão de bibliotecas de gráfico.

## Cores de papel (classes Tailwind)

Use como `bg-<papel>`, `text-<papel>`, `border-<papel>`, `ring-<papel>`. Valores resolvidos claro / escuro.

| Papel | Token | Claro | Escuro |
|---|---|---|---|
| `background` | `--nemo-color-surface-neutral-primary` | #faf8ff | #1a1b22 |
| `foreground` | `--nemo-color-text-neutral-primary` | #1a1b22 | #faf8ff |
| `border` | `--nemo-color-border-neutral-main` | #e2e1ec | #5d5e66 |
| `input` | `--nemo-color-border-neutral-main` | #e2e1ec | #5d5e66 |
| `ring` | `--nemo-color-border-accent-primary` | #0069ff | #b2c5ff |
| `primary` | `--nemo-color-interactive-accent-primary-main` | #0069ff | #b2c5ff |
| `primary-hover` | `--nemo-color-interactive-accent-primary-hover` | #0040a1 | #dae2ff |
| `primary-active` | `--nemo-color-interactive-accent-primary-active` | #001848 | #001848 |
| `primary-strong` | `--nemo-color-text-accent-primary` | #0040a1 | #dae2ff |
| `primary-subtle` | `--nemo-color-surface-accent-primary` | #eef0ff | #0040a1 |
| `primary-foreground` | `--nemo-color-interactive-accent-primary-inverted` | #ffffff | #002b73 |
| `secondary` | `--nemo-color-surface-neutral-secondary` | #d9d9e3 | #0f1118 |
| `secondary-foreground` | `--nemo-color-text-neutral-primary` | #1a1b22 | #faf8ff |
| `muted` | `--nemo-color-surface-neutral-secondary` | #d9d9e3 | #0f1118 |
| `muted-foreground` | `--nemo-color-text-neutral-tertiary` | #5d5e66 | #aaaab4 |
| `accent` | `--nemo-color-surface-accent-primary` | #eef0ff | #0040a1 |
| `accent-foreground` | `--nemo-color-text-accent-primary` | #0040a1 | #dae2ff |
| `accent-border` | `--nemo-color-border-accent-primary` | #0069ff | #b2c5ff |
| `destructive` | `--nemo-color-icon-semantic-critical` | #b3282c | #ffb3ae |
| `destructive-foreground` | `--nemo-color-text-neutral-inverted` | #faf8ff | #1a1b22 |
| `destructive-soft` | `--nemo-color-surface-semantic-critical` | #ffedeb | #910917 |
| `destructive-soft-foreground` | `--nemo-color-text-semantic-critical` | #910917 | #ffdad7 |
| `destructive-border` | `--nemo-color-border-semantic-critical` | #b3282c | #ffb3ae |
| `success` | `--nemo-color-icon-semantic-success` | #38852e | #b3f3a5 |
| `success-foreground` | `--nemo-color-text-neutral-inverted` | #faf8ff | #1a1b22 |
| `success-soft` | `--nemo-color-surface-semantic-success` | #ecfce8 | #1f5919 |
| `success-soft-foreground` | `--nemo-color-text-semantic-success` | #1f5919 | #d9f9d2 |
| `success-border` | `--nemo-color-border-semantic-success` | #38852e | #b3f3a5 |
| `warning` | `--nemo-color-icon-semantic-warning` | #765a00 | #edc150 |
| `warning-foreground` | `--nemo-color-text-neutral-inverted` | #faf8ff | #1a1b22 |
| `warning-soft` | `--nemo-color-surface-semantic-warning` | #ffefd1 | #594400 |
| `warning-soft-foreground` | `--nemo-color-text-semantic-warning` | #594400 | #ffdf96 |
| `warning-border` | `--nemo-color-border-semantic-warning` | #765a00 | #edc150 |
| `info` | `--nemo-color-surface-semantic-info` | #e1eaff | #111c59 |
| `info-foreground` | `--nemo-color-text-semantic-info` | #111c59 | #c4d4ff |
| `info-border` | `--nemo-color-border-semantic-info` | #1f3385 | #89a9ff |
| `disabled` | `--nemo-color-surface-neutral-disabled` | #e2e1ec | #45464f |
| `disabled-foreground` | `--nemo-color-text-neutral-tertiary` | #5d5e66 | #aaaab4 |
| `disabled-border` | `--nemo-color-border-neutral-disabled` | #e2e1ec | #45464f |
| `inverted` | `--nemo-color-surface-neutral-inverted` | #2e3038 | #faf8ff |
| `inverted-foreground` | `--nemo-color-text-neutral-inverted` | #faf8ff | #1a1b22 |
| `card` | `--nemo-color-surface-neutral-tertiary` | #ededf7 | #2e3038 |
| `card-foreground` | `--nemo-color-text-neutral-primary` | #1a1b22 | #faf8ff |
| `popover` | `--nemo-color-surface-neutral-primary` | #faf8ff | #1a1b22 |
| `popover-foreground` | `--nemo-color-text-neutral-primary` | #1a1b22 | #faf8ff |
| `sidebar` | `--nemo-color-surface-neutral-secondary` | #d9d9e3 | #0f1118 |
| `sidebar-foreground` | `--nemo-color-text-neutral-primary` | #1a1b22 | #faf8ff |
| `sidebar-primary` | `--nemo-color-interactive-accent-primary-main` | #0069ff | #b2c5ff |
| `sidebar-primary-foreground` | `--nemo-color-interactive-accent-primary-inverted` | #ffffff | #002b73 |
| `sidebar-accent` | `--nemo-color-surface-accent-primary` | #eef0ff | #0040a1 |
| `sidebar-accent-foreground` | `--nemo-color-text-accent-primary` | #0040a1 | #dae2ff |
| `sidebar-border` | `--nemo-color-border-neutral-main` | #e2e1ec | #5d5e66 |
| `sidebar-ring` | `--nemo-color-border-accent-primary` | #0069ff | #b2c5ff |

## Escalas

**Espaço** (`p-*`, `m-*`, `gap-*`, `w-*`…): `0`=0px, `1`=4px, `2`=8px, `3`=12px, `4`=16px, `5`=20px, `6`=24px, `8`=32px, `10`=40px, `12`=48px, `16`=64px. Outros passos (`0.5`, `1.5`, `2.5`…) seguem o padrão do Tailwind.

**Raio** (`rounded-*`): `sm`=4px, `md`=8px, `lg`=16px, `xl`=24px, `full`=500px.

**Texto** (`text-*`): `2xs`=10px, `xs`=12px, `sm`=14px, `md`=16px, `lg`=20px, `xl`=24px, `2xl`=32px, `3xl`=40px.

**Família**: `font-sans` = Inter (UI/corpo) · `font-heading` = Owners Text (títulos) · `font-display` = Owners Narrow black (destaque).

## Tokens de alias (CSS puro)

Para contextos sem Tailwind use `var(<token>)`. Prefira os papéis acima; esta lista é a fonte completa.

| Token | Claro | Escuro |
|---|---|---|
| `--nemo-color-interactive-accent-primary-active-on-surface` | rgba(0, 24, 72, 0.3) | rgba(0, 24, 72, 0.3) |
| `--nemo-color-interactive-accent-primary-hover-on-surface` | rgba(0, 64, 161, 0.1) | rgba(0, 64, 161, 0.1) |
| `--nemo-color-interactive-accent-benefit-hover-on-surface` | rgba(0, 84, 62, 0.1) | rgba(0, 84, 62, 0.1) |
| `--nemo-color-interactive-accent-benefit-active-on-surface` | rgba(0, 28, 20, 0.3) | rgba(0, 28, 20, 0.3) |
| `--nemo-color-interactive-accent-incentive-hover-on-surface` | rgba(63, 51, 194, 0.1) | rgba(63, 51, 194, 0.1) |
| `--nemo-color-interactive-accent-incentive-active-on-surface` | rgba(20, 16, 84, 0.3) | rgba(20, 16, 84, 0.3) |
| `--nemo-color-interactive-neutral-hover-on-surface-2` | rgba(69, 70, 79, 0.1) | rgba(69, 70, 79, 0.1) |
| `--nemo-color-interactive-neutral-active-on-surface-2` | rgba(26, 27, 34, 0.3) | rgba(26, 27, 34, 0.3) |
| `--nemo-color-surface-neutral-primary` | #faf8ff | #1a1b22 |
| `--nemo-color-surface-neutral-secondary` | #d9d9e3 | #0f1118 |
| `--nemo-color-surface-neutral-tertiary` | #ededf7 | #2e3038 |
| `--nemo-color-surface-neutral-inverted` | #2e3038 | #faf8ff |
| `--nemo-color-surface-neutral-disabled` | #e2e1ec | #45464f |
| `--nemo-color-surface-accent-benefit` | #e0faf1 | #00543e |
| `--nemo-color-surface-accent-incentive` | #c7c5fb | #3f33c2 |
| `--nemo-color-surface-accent-benefit-low` | #c9f5e6 | #c9f5e6 |
| `--nemo-color-surface-accent-benefit-lowest` | #9ee8c7 | #9ee8c7 |
| `--nemo-color-surface-accent-incentive-low` | #c7c5fb | #c7c5fb |
| `--nemo-color-surface-accent-incentive-lowest` | #3f33c2 | #c7c5fb |
| `--nemo-color-surface-accent-primary` | #eef0ff | #0040a1 |
| `--nemo-color-surface-accent-primary-low` | #b2c5ff | #b2c5ff |
| `--nemo-color-surface-accent-primary-lowest` | #0040a1 | #dae2ff |
| `--nemo-color-surface-medal-gold` | #fff4e6 | #895500 |
| `--nemo-color-surface-medal-gold-low` | #ffeacc | #ffeacc |
| `--nemo-color-surface-medal-gold-lowest` | #ffd599 | #ffd599 |
| `--nemo-color-surface-medal-silver` | #f0effb | #454652 |
| `--nemo-color-surface-medal-silver-low` | #e2e1f2 | #e2e1f2 |
| `--nemo-color-surface-medal-silver-lowest` | #c6c5d6 | #c6c5d6 |
| `--nemo-color-surface-medal-bronze` | #ffe9e3 | #604e46 |
| `--nemo-color-surface-medal-bronze-low` | #ffe1d9 | #ffe1d9 |
| `--nemo-color-surface-medal-bronze-lowest` | #edccc3 | #edccc3 |
| `--nemo-color-surface-semantic-warning` | #ffefd1 | #594400 |
| `--nemo-color-surface-semantic-critical` | #ffedeb | #910917 |
| `--nemo-color-surface-semantic-success` | #ecfce8 | #1f5919 |
| `--nemo-color-surface-semantic-info` | #e1eaff | #111c59 |
| `--nemo-color-surface-semantic-warning-low` | #ffdf96 | #ffdf96 |
| `--nemo-color-surface-semantic-critical-low` | #ffdad7 | #ffdad7 |
| `--nemo-color-surface-semantic-success-low` | #d9f9d2 | #d9f9d2 |
| `--nemo-color-surface-semantic-info-low` | #c4d4ff | #c4d4ff |
| `--nemo-color-text-neutral-primary` | #1a1b22 | #faf8ff |
| `--nemo-color-text-neutral-secondary` | #45464f | #e2e1ec |
| `--nemo-color-text-neutral-tertiary` | #5d5e66 | #aaaab4 |
| `--nemo-color-text-neutral-disabled` | #e2e1ec | #5d5e66 |
| `--nemo-color-text-neutral-inverted` | #faf8ff | #1a1b22 |
| `--nemo-color-text-semantic-warning` | #594400 | #ffdf96 |
| `--nemo-color-text-semantic-critical` | #910917 | #ffdad7 |
| `--nemo-color-text-semantic-success` | #1f5919 | #d9f9d2 |
| `--nemo-color-text-semantic-info` | #111c59 | #c4d4ff |
| `--nemo-color-text-accent-benefit` | #00543e | #c9f5e6 |
| `--nemo-color-text-accent-incentive` | #3f33c2 | #c7c5fb |
| `--nemo-color-text-accent-primary` | #0040a1 | #dae2ff |
| `--nemo-color-text-accent-inverted-incentive` | #ffffff | #261e8d |
| `--nemo-color-text-medal-gold` | #895500 | #ffeacc |
| `--nemo-color-text-medal-silver` | #454652 | #e2e1f2 |
| `--nemo-color-text-medal-bronze` | #604e46 | #ffe1d9 |
| `--nemo-color-text-medal-inverted-bronze` | #ffffff | #3b302b |
| `--nemo-color-text-medal-inverted-gold` | #ffffff | #663a00 |
| `--nemo-color-text-medal-inverted-silver` | #ffffff | #2f303b |
| `--nemo-color-text-medal-inverted-bronze-2` | #ffffff | #3b302b |
| `--nemo-color-border-semantic-warning` | #765a00 | #edc150 |
| `--nemo-color-border-semantic-critical` | #b3282c | #ffb3ae |
| `--nemo-color-border-semantic-success` | #38852e | #b3f3a5 |
| `--nemo-color-border-semantic-info` | #1f3385 | #89a9ff |
| `--nemo-color-border-neutral-main` | #e2e1ec | #5d5e66 |
| `--nemo-color-border-neutral-hover` | #76767f | #aaaab4 |
| `--nemo-color-border-neutral-active` | #45464f | #e2e1ec |
| `--nemo-color-border-neutral-disabled` | #e2e1ec | #45464f |
| `--nemo-color-border-accent-secondary` | #006c50 | #9ee8c7 |
| `--nemo-color-border-accent-incentive` | #4f46e5 | #a9a5f7 |
| `--nemo-color-border-accent-primary` | #0069ff | #b2c5ff |
| `--nemo-color-border-medal-gold` | #a16300 | #ffd599 |
| `--nemo-color-border-medal-silver` | #5d5e6a | #c6c5d6 |
| `--nemo-color-border-medal-bronze` | #806a61 | #edccc3 |
| `--nemo-color-icon-neutral-primary` | #1a1b22 | #faf8ff |
| `--nemo-color-icon-neutral-secondary` | #45464f | #e2e1ec |
| `--nemo-color-icon-neutral-tertiary` | #76767f | #aaaab4 |
| `--nemo-color-icon-neutral-inverted` | #faf8ff | #1a1b22 |
| `--nemo-color-icon-neutral-disabled` | #e2e1ec | #5d5e66 |
| `--nemo-color-icon-accent-primary` | #0069ff | #b2c5ff |
| `--nemo-color-icon-accent-benefit` | #006c50 | #9ee8c7 |
| `--nemo-color-icon-accent-incentive` | #4f46e5 | #a9a5f7 |
| `--nemo-color-icon-semantic-warning` | #765a00 | #edc150 |
| `--nemo-color-icon-semantic-critical` | #b3282c | #ffb3ae |
| `--nemo-color-icon-semantic-success` | #38852e | #b3f3a5 |
| `--nemo-color-icon-semantic-info` | #1f3385 | #89a9ff |
| `--nemo-color-icon-medal-gold` | #a16300 | #ffd599 |
| `--nemo-color-icon-medal-silver` | #5d5e6a | #c6c5d6 |
| `--nemo-color-icon-medal-bronze` | #806a61 | #edccc3 |
| `--nemo-color-background-bg` | #faf8ff | #1a1b22 |
| `--nemo-color-interactive-accent-primary-inverted` | #ffffff | #002b73 |
| `--nemo-color-interactive-accent-primary-main` | #0069ff | #b2c5ff |
| `--nemo-color-interactive-accent-primary-hover` | #0040a1 | #dae2ff |
| `--nemo-color-interactive-accent-primary-active` | #001848 | #001848 |
| `--nemo-color-interactive-accent-benefit-inverted` | #ffffff | #003829 |
| `--nemo-color-interactive-accent-benefit-active` | #001c14 | #001c14 |
| `--nemo-color-interactive-accent-benefit-hover` | #00543e | #c9f5e6 |
| `--nemo-color-interactive-accent-benefit-main` | #006c50 | #9ee8c7 |
| `--nemo-color-interactive-accent-incentive-main` | #4f46e5 | #a9a5f7 |
| `--nemo-color-interactive-accent-incentive-hover` | #3f33c2 | #c7c5fb |
| `--nemo-color-interactive-accent-incentive-active` | #141054 | #141054 |
| `--nemo-color-interactive-accent-incentive-inverted` | #ffffff | #261e8d |
| `--nemo-color-interactive-neutral-primary` | #76767f | #aaaab4 |
| `--nemo-color-interactive-neutral-active-2` | #1a1b22 | #faf8ff |
| `--nemo-color-interactive-neutral-inverted-2` | #faf8ff | #1a1b22 |
| `--nemo-color-interactive-neutral-hover-2` | #45464f | #e2e1ec |

## Componentes

Cada componente lista as **classes reais** do código de produção (`packages/web/src/components`). Em HTML, reproduza a mesma estrutura e classes; em React, importe de `@nemo/web`. `{fooVariants}` = classes da variante escolhida, listadas logo acima.

### Índice

- **Específicos da Daki:** Add To Cart, Attachment, Bubble, Collection Banner, KanbanCard, Menu Item, Menu Shortcut, Navigation Bar, ProductCard, Product Tile
- **Base (shadcn/ui tematizado):** Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, Context Menu, Data Table, Date Picker, Dialog, Drawer, Dropdown Menu, Empty, Field, Form, Hover Card, Input, Input Group, Input OTP, Item, Kbd, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner (Toast), Spinner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip, Text

### Add To Cart

`add-to-cart` · exporta `AddToCartButton`, `CartCountBadge`, `FavoriteButton`

Icons scoped to this component only (not part of the shared `icons-DakiApp` catalog): real assets from the Figma "AddTo" component (node 3872:52310 in "Daki App • Components — Design in Progress"). Plus/minus reuse the shared `DakiPlusIcon`/`DakiMinusIcon` instead — same underlying Figma vector.

**Anatomia (elemento raiz → classes):**

- `AddToCartButton` → `<button>` `flex h-[34px] w-[127px] items-center justify-center rounded-md bg-card`
- `CartCountBadge` → `<span>` `inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2.5 text-sm font-bold text-primary`
- `FavoriteButton` → `<button>` `flex h-[34px] w-[127px] items-center justify-center rounded-md transition-opacity [active ? bg-primary text-primary-foreground : bg-card text-foreground] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`

**Marcação de produção (JSX):**

`AddToCartButton`:

```tsx
<button
  type="button"
  disabled
  aria-label="Adicionando ao carrinho"
  className={cn("flex h-[34px] w-[127px] items-center justify-center rounded-md bg-card", className)}
>
  <LoadingSpinnerIcon className="size-4 animate-spin" />
</button>
```

`CartCountBadge`:

```tsx
<span
  className={cn(
    "inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2.5 text-sm font-bold text-primary",
    className
  )}
  {...props}
>
  X {count}
</span>
```

`FavoriteButton`:

```tsx
<button
  type="button"
  onClick={onToggle}
  disabled={disabled}
  aria-pressed={active}
  aria-label={active ? "Remover dos favoritos" : "Adicionar aos favoritos"}
  className={cn(
    "flex h-[34px] w-[127px] items-center justify-center rounded-md transition-opacity",
    active ? "bg-primary text-primary-foreground" : "bg-card text-foreground",
    "hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    className
  )}
>
  <Heart className="size-5" fill={active ? "currentColor" : "none"} />
</button>
```

**Props:**

- `AddToCartButtonProps`
  - `quantity: number` — 0 = not in the cart yet.
  - `loading?: boolean` — Shows the spinner in place of the "+" pill; no interaction.
  - `disabled?: boolean`
  - `onAdd?: () => void` — Tapped when quantity is 0.
  - `onIncrement?: () => void` — Tapped "+" in the stepper.
  - `onDecrement?: () => void` — Tapped "−" (or the trash icon at quantity 1) in the stepper.
  - `className?: string`
- `CartCountBadgeProps` (estende `React.HTMLAttributes<HTMLSpanElement>`)
  - `count: number`
- `FavoriteButtonProps`
  - `active: boolean`
  - `onToggle?: () => void`
  - `disabled?: boolean`
  - `className?: string`

**Stories:** AllStates (Todos os estados lado a lado (Default, Loading, quantidade 1 com lixeira, quantidade 2, disabled).) · Interactive (Fluxo real: tocar "+" mostra o spinner por um instante antes de virar o stepper.) · Count · Favorite

**Exemplo (React, story `AllStates`):**

```tsx
<div className="flex flex-wrap items-center gap-4">
  <AddToCartButton quantity={0} />
  <AddToCartButton quantity={0} loading />
  <AddToCartButton quantity={1} />
  <AddToCartButton quantity={2} />
  <AddToCartButton quantity={0} disabled />
</div>
```

### Attachment

`attachment` · exporta `Attachment`

Interpretation — not a canonical shadcn component.

**Anatomia (elemento raiz → classes):**

- `Attachment` → `<div>` `flex items-center gap-2 rounded-md border border-border bg-info px-3 py-2 text-sm text-foreground`

**Marcação de produção (JSX):**

`Attachment`:

```tsx
<div
  ref={ref}
  className={cn(
    "flex items-center gap-2 rounded-md border border-border bg-info px-3 py-2 text-sm text-foreground",
    className
  )}
  {...props}
>
  <File className="h-4 w-4 shrink-0 text-muted-foreground" />
  <div className="flex min-w-0 flex-1 items-center gap-2">
    <span className="truncate">{name}</span>
    {size ? (
      <span className="shrink-0 text-muted-foreground">{size}</span>
    ) : null}
  </div>
  {onRemove ? (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-6 w-6 shrink-0 rounded-md"
      onClick={onRemove}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Remove attachment</span>
    </Button>
  ) : null}
</div>
```

**Props:**

- `AttachmentProps` (estende `React.HTMLAttributes<HTMLDivElement>`)
  - `name: string`
  - `size?: string`
  - `onRemove?: () => void`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<div className="flex max-w-sm flex-col gap-2">
  <Attachment name="comprovante-entrega.pdf" size="248 KB" onRemove={() => {}} />
  <Attachment name="nota-fiscal.xml" size="12 KB" onRemove={() => {}} />
</div>
```

### Bubble

`bubble` · exporta `Bubble`

Interpretation — not a canonical shadcn component.

**Anatomia (elemento raiz → classes):**

- `Bubble` → `<div>` `flex w-full [isUser ? justify-end : justify-start]`

**Marcação de produção (JSX):**

`Bubble`:

```tsx
<div
  ref={ref}
  className={cn(
    "flex w-full",
    isUser ? "justify-end" : "justify-start",
    className
  )}
  {...props}
>
  <div
    className={cn(
      "max-w-[80%] px-4 py-2 text-sm",
      isUser
        ? "rounded-2xl bg-primary text-primary-foreground"
        : "rounded-2xl bg-muted text-foreground"
    )}
  >
    {children}
  </div>
</div>
```

**Props:**

- `BubbleProps` (estende `React.HTMLAttributes<HTMLDivElement>`)
  - `role?: "user" | "assistant"`

**Stories:** Conversation

**Exemplo (React, story `Conversation`):**

```tsx
<div className="flex max-w-md flex-col gap-2">
  <Bubble role="assistant">Oi! Seu pedido saiu do dark store 🚴</Bubble>
  <Bubble role="user">Consigo mudar o endereço?</Bubble>
  <Bubble role="assistant">Claro — toque em “Editar endereço” no pedido.</Bubble>
</div>
```

### Collection Banner

`collection-banner` · exporta `CollectionBanner`

Interpretation — not a canonical shadcn component.

**Anatomia (elemento raiz → classes):**

- `CollectionBanner` → `<div>` `flex w-[164px] shrink-0 flex-col gap-2 rounded-2xl border border-border bg-background p-2`

**Marcação de produção (JSX):**

`CollectionBanner`:

```tsx
<div
  ref={ref}
  className={cn(
    "flex w-[164px] shrink-0 flex-col gap-2 rounded-2xl border border-border bg-background p-2",
    className
  )}
  {...props}
>
  <div className="flex items-center gap-1">
    {brandLogo != null && (
      <span className="size-6 shrink-0 overflow-hidden rounded-full border border-border">
        <img src={brandLogo} alt="" className="size-full object-cover" />
      </span>
    )}
    <span className="min-w-0 flex-1 truncate text-xs font-bold text-foreground">
      {brandName}
    </span>
  </div>
  <div className="grid grid-cols-2 gap-2">
    {products.slice(0, 4).map((product, i) => (
      <div
        key={i}
        // bg-card (alias surface/neutral/tertiary): darkens in dark
        // mode like the rest of the UI. Product photography uses
        // mix-blend-darken to sit cleanly on the tile, which reads
        // darker/lower-contrast here in dark mode as a tradeoff for
        // staying on real alias tokens (no fixed/primitive backdrop).
        className="flex size-16 items-center justify-center rounded-lg bg-card p-1"
      >
        <img
          src={product.image}
          alt={product.alt ?? ""}
          className={cn(
            "size-full mix-blend-darken",
            product.fit === "contain" ? "object-contain" : "object-cover"
          )}
        />
      </div>
    ))}
  </div>
</div>
```

**Props:**

- `CollectionBannerProps` (estende `React.HTMLAttributes<HTMLDivElement>`)
  - `brandName: string`
  - `brandLogo?: string` — Circular brand logo shown next to the name. Omit for a text-only header.
  - `products: CollectionProduct[]` — Up to 4 product thumbnails, shown in a 2×2 grid.

**Stories:** Default · Variants (Matches the Figma reference row: three brands + the empty-state placeholder.) · Row (Real usage: a horizontally-scrollable "shop by brand" row.)

**Exemplo (React, story `Row`):**

```tsx
<div className="flex gap-3 overflow-x-auto pb-2">
  <CollectionBanner {...bauducco} />
  <CollectionBanner {...redBull} />
  <CollectionBanner {...veja} />
</div>
```

### KanbanCard

`kanban-card` · exporta `KanbanCard`, `KanbanTaskCard`

KanbanCard — Order & Stacking cards from the HUBR "Orders Card" set. Order and Stacking share the same anatomy; Stacking adds the grouped-delivery footer. Urgency (default/waning/critical) and mode (core/agendado/superdaki) drive the accent color + tint, all mapped to Nemo tokens.

**Anatomia (elemento raiz → classes):**

- `KanbanCard` → `<div>` `relative z-[2] flex w-full flex-col gap-2 overflow-clip rounded-lg border-l-4 py-2 pl-4 pr-2 shadow-sm`
- `KanbanTaskCard` → `<div>` `flex w-full flex-col gap-2 overflow-clip rounded-lg border-l-4 bg-card py-2 pl-4 pr-2 shadow-sm`

**Marcação de produção (JSX):**

`KanbanCard`:

```tsx
<div
  ref={ref}
  style={{ borderLeftColor: accent, background: bg }}
  className={cn(
    "relative z-[2] flex w-full flex-col gap-2 overflow-clip rounded-lg border-l-4 py-2 pl-4 pr-2 shadow-sm",
    className
  )}
  {...props}
>
  {/* Scheduled top badge (agendado mode) */}
  {scheduled && (
    <Pill className="w-full">
      <ClockIcon className="size-4 shrink-0" />
      {scheduled}
    </Pill>
  )}

  {/* Header: order id + timers */}
  <div className="flex w-full flex-wrap items-center justify-between gap-y-1">
    <p className="text-md font-semibold leading-6 text-foreground">{orderId}</p>
    {timers.length > 0 && (
      <div className="flex shrink-0 items-center gap-1">
        {timers.map((t, i) => (
          <Pill key={i} dot={t.dot}>
            {t.label}
          </Pill>
        ))}
      </div>
    )}
  </div>

  {/* Client */}
  <div className="flex w-full flex-col gap-2">
    <div className="flex w-full items-center gap-2">
      <p className="min-w-0 flex-1 truncate text-md font-semibold leading-6 text-foreground">
        {clientName}
      </p>
      {clientBadge && <Pill>{clientBadge}</Pill>}
    </div>
    <div className="flex w-full flex-col gap-1">
      <p className="truncate text-md font-medium leading-6 text-foreground">{address}</p>
      <p className="truncate text-md font-medium leading-6 text-muted-foreground">
        {neighborhood}
      </p>
    </div>
  </div>

  <Divider />

  {/* Assign area */}
  <div className="flex w-full items-center gap-4">
    <Assignment {...shopper} />
    <Assignment {...rider} />
  </div>

  {/* Grouped-delivery footer (stacking) */}
  {isStacking && (
    <>
      <Divider />
      <button
        type="button"
        onClick={onGroupedClick}
        style={{ background: accent }}
        className="flex w-full items-center justify-center gap-2 rounded-full p-1 text-md font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <PinIcon className="size-6 shrink-0" />
        {groupedLabel}
      </button>
    </>
  )}
</div>
```

`KanbanTaskCard`:

```tsx
<div
  ref={ref}
  style={{ borderLeftColor: "var(--nemo-color-brand-default)" }}
  className={cn(
    "flex w-full flex-col gap-2 overflow-clip rounded-lg border-l-4 bg-card py-2 pl-4 pr-2 shadow-sm",
    className
  )}
  {...props}
>
  {/* Title area */}
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-4">
      <p className="min-w-0 flex-1 text-sm leading-5 text-foreground">{createdLabel}</p>
      <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
        <DotsIcon className="size-4" />
        <EyeIcon className="size-4" />
        <PlusIcon className="size-4" />
        <PersonIcon className="size-4" />
        <BellIcon className="size-4" />
        {collapsed ? <ChevronDownIcon className="size-4" /> : <ChevronUpIcon className="size-4" />}
      </div>
    </div>
    <div className="flex flex-col gap-2">
      {/* Owners Text (Nemo heading family) */}
      <p className="font-heading text-lg font-medium leading-tight text-foreground">{title}</p>
      {description && (
        <p className="text-sm font-semibold leading-5 text-foreground">{description}</p>
      )}
    </div>
  </div>

  {!collapsed && (
    <>
      <div className="h-px w-full bg-border" />

      {/* Tasks + progress */}
      {(tasksLabel || progress) && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <p className="min-w-0 flex-1 text-sm font-semibold leading-5 text-foreground">
              {tasksLabel}
            </p>
            {timeLeft && (
              <p className="shrink-0 text-right text-sm leading-5 text-foreground">{timeLeft}</p>
            )}
            <ActionIcons />
          </div>
          {progress && <ProgressStepper {...progress} />}
        </div>
      )}

      {/* Checklist */}
      {tasks.length > 0 && (
        <div className="flex flex-col">
          {tasks.map((t, i) => (
            <ChecklistRow key={i} item={t} />
          ))}
        </div>
      )}

      {/* Assignees */}
      {assignees.length > 0 && (
        <>
          <div className="h-px w-full bg-border" />
          <div className="flex flex-col gap-2">
            {assignees.map((name, i) => (
              <div key={i} className="flex items-center gap-1">
                <PersonIcon className="size-4 text-foreground" />
                <span className="text-sm font-semibold leading-5 text-foreground">{name}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bottom */}
      {updatedLabel && (
        <p className="w-full text-right text-xs leading-4 text-foreground">{updatedLabel}</p>
      )}
    </>
  )}
</div>
```

**Props:**

- `KanbanCardProps` (estende `React.HTMLAttributes<HTMLDivElement>`)
  - `variant?: "order" | "stacking"` — "order" (no footer) or "stacking" (grouped-delivery footer).
  - `urgency?: KanbanUrgency`
  - `mode?: KanbanMode`
  - `orderId: string`
  - `timers?: KanbanTimer[]`
  - `scheduled?: string` — Top scheduled badge text, e.g. "Agendado • 15:00 a 15:30".
  - `clientName: string`
  - `clientBadge?: string`
  - `address: string`
  - `neighborhood: string`
  - `shopper: KanbanAssignment`
  - `rider: KanbanAssignment`
  - `groupedLabel?: string` — Grouped-delivery footer (stacking).
  - `onGroupedClick?: () => void`
  - `stacked?: boolean` — Stacking=On — render peeking sheets behind the card (grouped orders).
- `KanbanTaskCardProps` (estende `React.HTMLAttributes<HTMLDivElement>`)
  - `createdLabel?: string`
  - `title: string`
  - `description?: string`
  - `collapsed?: boolean`
  - `tasksLabel?: string`
  - `timeLeft?: string`
  - `progress?: { done: number; total: number }`
  - `tasks?: TaskItem[]`
  - `assignees?: string[]`
  - `updatedLabel?: string`

**Stories:** Order · OrderNoCountdown · OrderScheduled · StackingCore · StackingWaning · StackingCritical · StackingAgendado · StackingSuperDaki · StackingStacked · Task · TaskCollapsed · Board

**Exemplo (React, story `Task`):**

```tsx
<div style={{ maxWidth: 420 }}>
  <KanbanTaskCard
    title="Fazer inventário da loja"
    description="Todos os meses nós precisamos organizar e entender quais mercadorias ainda temos."
    tasksLabel="3 Tarefas"
    timeLeft="3 horas restantes"
    progress={{ done: 0, total: 3 }}
    tasks={[
      { title: "Contar bebidas", description: "Corredor 3", status: "done", checked: true },
      { title: "Conferir hortifruti", description: "Câmara fria", status: "todo" },
      { title: "Repor limpeza", description: "Estoque", status: "canceled", disabled: true },
    ]}
    assignees={["Ulisses Camilo", "Gabriel Fuentes"]}
    updatedLabel="Atualizado há um dia"
  />
</div>
```

### Menu Item

`menu-item` · exporta `MenuList`, `MenuSection`, `MenuItem`

MenuItem / MenuSection / MenuList — settings/menu list rows, built on the shadcn `Item` row pattern and tailored for app menu screens (leading icon chip, label, optional badge + unread dot, trailing chevron), grouped under section headings. All colors come from Nemo tokens.

**Anatomia (elemento raiz → classes):**

- `MenuList` → `<nav>` `flex w-full flex-col`
- `MenuSection` → `<div>` `py-2`
- `MenuItem` → `<span>` `flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground [&_svg]:size-5 [&_svg]:shrink-0`

**Marcação de produção (JSX):**

`MenuList`:

```tsx
<nav ref={ref} className={cn("flex w-full flex-col", className)} {...props} />
```

`MenuSection`:

```tsx
<div ref={ref} className={cn("py-2", className)} {...props}>
  {label != null && (
    <h3 className="px-2 pb-1 text-lg font-bold text-primary">{label}</h3>
  )}
  <div role="group" className="flex flex-col">
    {children}
  </div>
</div>
```

`MenuItem`:

```tsx
<span
  aria-hidden
  className={cn(
    "flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground",
    "[&_svg]:size-5 [&_svg]:shrink-0"
  )}
>
  {icon}
</span>
```

**Props:**

- `MenuSectionProps` (estende `React.HTMLAttributes<HTMLDivElement>`)
  - `label?: React.ReactNode` — Section heading, e.g. "Pagamentos". Omit for an unlabeled group.
- `MenuItemProps` (estende `React.HTMLAttributes<HTMLElement>`)
  - `icon?: React.ReactNode` — Leading glyph, rendered inside the circular chip (e.g. a lucide icon).
  - `label: React.ReactNode`
  - `badge?: React.ReactNode` — Inline badge after the label (e.g. <Badge>Novo</Badge>).
  - `dot?: boolean` — Unread dot after the label.
  - `trailing?: React.ReactNode` — Trailing content; defaults to a chevron. Pass null to hide.
  - `asChild?: boolean` — Render as a child element (e.g. an <a> or router Link).

**Stories:** Single · WithBadgeAndDot · MenuSections (Recreates the Daki app menu — sections + rows.) · AsLink

**Exemplo (React, story `Single`):**

```tsx
<div className="max-w-md">
  <MenuItem icon={<CreditCard />} label="Gerenciar formas de pagamento" />
</div>
```

### Menu Shortcut

`menu-shortcut` · exporta `MenuShortcutList`, `MenuShortcutItem`

MenuShortcutItem / MenuShortcutList — home-screen quick actions ("Pedir novamente", "Favoritos"): a circular icon chip with a 2-line label below, several side by side in a horizontal scroller. Same leading-icon-chip convention as `MenuItem` (surface-accent-primary bg + text-accent-primary icon), vertical layout instead of a full-width row.

**Anatomia (elemento raiz → classes):**

- `MenuShortcutList` → `<div>` `flex w-full gap-4 overflow-x-auto pb-1`
- `MenuShortcutItem` → `<span>` `flex size-16 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground [&_svg]:size-6 [&_svg]:shrink-0`

**Marcação de produção (JSX):**

`MenuShortcutList`:

```tsx
<div
  ref={ref}
  role="group"
  className={cn("flex w-full gap-4 overflow-x-auto pb-1", className)}
  {...props}
/>
```

`MenuShortcutItem`:

```tsx
<span
  aria-hidden
  className="flex size-16 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground [&_svg]:size-6 [&_svg]:shrink-0"
>
  {icon}
</span>
```

**Props:**

- `MenuShortcutItemProps` (estende `React.HTMLAttributes<HTMLElement>`)
  - `icon: React.ReactNode` — Glyph rendered inside the circular chip (e.g. a lucide icon).
  - `label: React.ReactNode`
  - `asChild?: boolean` — Render as a child element (e.g. an <a> or router Link).

**Stories:** Single · List (Vários atalhos lado a lado (tela inicial do app).) · AsLink

**Exemplo (React, story `Single`):**

```tsx
<MenuShortcutItem icon={<ShoppingBag />} label="Pedir novamente" />
```

### Navigation Bar

`navigation-bar` · exporta `NavigationBar`, `NavigationBarItem`, `NavigationBarBagItem`

NavigationBar — the Daki App's bottom tab bar ("Navigation bar", Figma file "Daki App • Components — Design in Progress", node 40366:141533). A rounded pill of `NavigationBarItem` tabs plus a `NavigationBarBagItem` CTA slot that keeps its own dark background regardless of any tab's `active` state. Controlled like the rest of Nemo (`active`/`onSelect` per item) — no internal selection state.

**Anatomia (elemento raiz → classes):**

- `NavigationBar` → `<nav data-slot="navigation-bar">` `flex w-full items-stretch overflow-hidden rounded-2xl bg-primary drop-shadow-[4px_4px_7.5px_rgba(24,39,75,0.15),-2px_-2px_7.5px_rgba(24,39,75,0.15)]`
- `NavigationBarItem` → `<button data-slot="navigation-bar-item">` `flex flex-1 flex-col items-center justify-center gap-1 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverted-foreground focus-visible:ring-offset-2`
- `NavigationBarBagItem` → `<button data-slot="navigation-bar-bag-item">` `flex flex-1 flex-col items-center justify-center gap-1 py-2 [isEmpty ? bg-primary : bg-primary-active [active: brightness-90]] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 [isEmpty ? focus-visible:ring-inverted-foreground : focus-visible:ring-white]` — Empty (no `count`) drops the fixed dark CTA background entirely and looks like a plain `NavigationBarItem` instead — the dark slot is meant to draw the eye *because there's somethi…

**Marcação de produção (JSX):**

`NavigationBar`:

```tsx
<nav
  ref={ref}
  data-slot="navigation-bar"
  aria-label={ariaLabel}
  className={cn(
    // bg-primary (interactive/accent/primary/main, #0069ff) — the Figma
    // node's own variable annotation says surface/accent/primary, but
    // that role is a pale tint in our Alias (blue-95); the rendered
    // fill matches the brand blue, same bg-primary pairing Badge's
    // `color="default" variant="filled"` already uses for this exact look.
    "flex w-full items-stretch overflow-hidden rounded-2xl bg-primary drop-shadow-[4px_4px_7.5px_rgba(24,39,75,0.15),-2px_-2px_7.5px_rgba(24,39,75,0.15)]",
    className
  )}
  {...props}
>
  {children}
</nav>
```

`NavigationBarItem`:

```tsx
<button
  ref={ref}
  type="button"
  data-slot="navigation-bar-item"
  aria-current={active ? "page" : undefined}
  className={cn(
    "flex flex-1 flex-col items-center justify-center gap-1 py-2",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverted-foreground focus-visible:ring-offset-2",
    className
  )}
  {...props}
>
  <span
    aria-hidden
    className={cn(
      "relative flex size-6 items-center justify-center [&_svg]:size-6",
      active ? "text-primary-active" : "text-primary-foreground"
    )}
  >
    {dot && (
      <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-background" />
    )}
    {icon}
  </span>
  <span className="flex flex-col items-center gap-0.5">
    <span
      className={cn(
        "text-2xs leading-none",
        active ? "font-semibold text-primary-active" : "font-medium text-primary-foreground"
      )}
    >
      {label}
      {dot && <span className="sr-only"> — novidade</span>}
    </span>
    {active && <span className="h-px w-2 rounded-full bg-primary-active" aria-hidden />}
  </span>
</button>
```

`NavigationBarBagItem`:

```tsx
<button
  ref={ref}
  type="button"
  data-slot="navigation-bar-bag-item"
  aria-current={active ? "page" : undefined}
  className={cn(
    "flex flex-1 flex-col items-center justify-center gap-1 py-2",
    isEmpty ? "bg-primary" : cn("bg-primary-active", active && "brightness-90"),
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    isEmpty ? "focus-visible:ring-inverted-foreground" : "focus-visible:ring-white",
    className
  )}
  {...props}
>
  <span
    aria-hidden
    className={cn(
      "relative flex size-6 items-center justify-center [&_svg]:size-6",
      isEmpty ? (active ? "text-primary-active" : "text-primary-foreground") : "text-primary"
    )}
  >
    {icon ?? <DakiTabbarBagIcon />}
    {count != null && (
      <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-sm border border-primary-active bg-background px-1 text-[10px] font-medium leading-none text-foreground">
        {formatCount(count)}
      </span>
    )}
  </span>
  <span className="flex flex-col items-center gap-0.5">
    <span
      className={cn(
        "text-2xs leading-none",
        isEmpty && active
          ? "font-semibold text-primary-active"
          : "font-medium text-primary-foreground"
      )}
    >
      {label}
      {count != null && <span className="sr-only"> — {formatCount(count)} itens</span>}
    </span>
    {active && (
      <span
        className={cn("h-px w-2 rounded-full", isEmpty ? "bg-primary-active" : "bg-white")}
        aria-hidden
      />
    )}
  </span>
</button>
```

**Props:**

- `NavigationBarItemProps` (estende `React.ButtonHTMLAttributes<HTMLButtonElement>`)
  - `icon: React.ReactNode`
  - `label: string`
  - `active?: boolean`
  - `dot?: boolean` — Small unread dot above the icon (e.g. "Pedidos" has new status updates).
- `NavigationBarBagItemProps` (estende `React.ButtonHTMLAttributes<HTMLButtonElement>`)
  - `icon?: React.ReactNode`
  - `label: string`
  - `count?: number`
  - `active?: boolean` — Whether the cart screen is the current one. Figma's sample frame never showed this slot as "active" (it only ever showed the fixed dark bg with items in it), so…

**Stories:** Default (Réplica exata do frame do Figma: "Pedidos" ativo (com o dot de novidade) e "Sacola" com 98 itens. O 5º item ("Início") está assim no Figma mesmo — o ícone é o de perfil (`Tabbar / User`), mas o texto …) · EmptyBag (Sacola vazia: sem `count`, não é só o badge que some — o item inteiro perde o fundo escuro fixo e passa a se comportar como um `NavigationBarItem` comum (mesmo `bg-primary`, ícone/label brancos).) · BagActive (A sacola também pode ser a tela atual — sem token/frame do Figma confirmando esse estado ainda, mas sem ele o usuário nunca sabe se "está" na sacola ou só está vendo o slot de CTA sempre-escuro.) · LoggedOut (Não logado: o item "Pedidos" não aparece (não tem pedido pra mostrar sem login). `NavigationBar` não sabe nada sobre sessão/login — é a tela que decide quais `NavigationBarItem`s passar como children;…) · Interactive (Troca de aba real, sacola incluída — cada item é controlado (active/onSelect), sem estado próprio.)

**Exemplo (React, story `Default`):**

```tsx
<div className="max-w-md p-4">
  <NavigationBar>
    <NavigationBarItem icon={<DakiTabbarHomeIcon />} label="Início" />
    <NavigationBarItem icon={<DakiTabbarCategoriesIcon />} label="Categorias" />
    <NavigationBarItem icon={<DakiTabbarSearchIcon />} label="Busca" />
    <NavigationBarItem icon={<DakiTabbarOrdersIcon />} label="Pedidos" active dot />
    <NavigationBarItem icon={<DakiTabbarMenuIcon />} label="Início" />
    <NavigationBarBagItem label="Sacola" count={98} />
  </NavigationBar>
</div>
```

### ProductCard

`product-card` · exporta `ProductCard`, `ProductCardBody`, `ProductCardMedia`, `ProductCardTitle`, `ProductCardTags`, `ProductCardPill`, `ProductCardLocation`, `ProductCardText`, `ProductCardSeparator`, `ProductCardFooter`, `ProductCardStepper`, `ProductCardWithBadges`

ProductCard — compound, slot-based product card family. Every piece is pure layout with no business meaning; compose whatever content you need inside each slot. `ProductCardWithBadges` is a convenience wrapper for the common case — see its own doc comment below.

**Anatomia (elemento raiz → classes):**

- `ProductCard` → `<div data-slot="product-card">` `flex w-full flex-col overflow-clip rounded-lg shadow-sm`
- `ProductCardBody` → `<div data-slot="product-card-body">` `flex w-full flex-col items-center gap-4 bg-background p-2` — Padded content region — used for the main body and, after a `ProductCardSeparator`, for secondary sections like a stepper.
- `ProductCardMedia` → `<div data-slot="product-card-media">` `flex size-[160px] shrink-0 items-center justify-center overflow-clip rounded-md [!children: bg-secondary text-muted-foreground]` — Media slot (defaults to a 160×160 box). Falls back to a placeholder icon when empty.
- `ProductCardTitle` → `<p data-slot="product-card-title">` `w-full text-center text-lg font-semibold leading-7 text-foreground`
- `ProductCardTags` → `<div data-slot="product-card-tags">` `flex w-full items-center justify-center gap-2 [layout === "row" ? flex-wrap : flex-col]` — Row (or column) of arbitrary pills/badges — reusable above or below the media.
- `ProductCardPill` → `<span data-slot="product-card-pill">` `inline-flex items-center justify-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-sm font-semibold text-foreground` — Neutral gray pill (`bg-secondary`/`text-foreground`) — same look `KanbanCard`'s local `Pill` uses.
- `ProductCardLocation` → `<div data-slot="product-card-location">` `flex w-full items-center justify-center gap-2` — Divider-flanked pill — e.g. a location/slot badge. Content is whatever the caller passes as children.
- `ProductCardText` → `<div data-slot="product-card-text">` `flex w-full flex-col items-center gap-1 text-muted-foreground` — Generic two-line, centered, muted text block ("Content"/"text-secondary" in Figma) — no business meaning baked in. Replaces the old `ProductCardCode` (which hardcoded a "Cód.
- `ProductCardSeparator` → `<div data-slot="product-card-separator">` `h-px w-full shrink-0 rounded bg-border`
- `ProductCardFooter` → `<div data-slot="product-card-footer">` `flex w-full items-center justify-center bg-secondary p-2` — Colored-band footer (`bg-secondary`) with a white pill wrapping whatever content is passed.
- `ProductCardStepper` → `<div data-slot="product-card-stepper">` `flex w-full flex-col items-center gap-2` — Generic labeled +/- stepper — no assumption about what's being counted.

**Marcação de produção (JSX):**

`ProductCard`:

```tsx
<div
  ref={ref}
  data-slot="product-card"
  className={cn("flex w-full flex-col overflow-clip rounded-lg shadow-sm", className)}
  {...props}
/>
```

`ProductCardBody`:

```tsx
<div
  ref={ref}
  data-slot="product-card-body"
  className={cn("flex w-full flex-col items-center gap-4 bg-background p-2", className)}
  {...props}
/>
```

`ProductCardMedia`:

```tsx
<div
  ref={ref}
  data-slot="product-card-media"
  className={cn(
    "flex size-[160px] shrink-0 items-center justify-center overflow-clip rounded-md",
    !children && "bg-secondary text-muted-foreground",
    className
  )}
  {...props}
>
  {children ?? <Package className="size-8" />}
</div>
```

`ProductCardTitle`:

```tsx
<p
  ref={ref}
  data-slot="product-card-title"
  className={cn("w-full text-center text-lg font-semibold leading-7 text-foreground", className)}
  {...props}
/>
```

`ProductCardTags`:

```tsx
<div
  ref={ref}
  data-slot="product-card-tags"
  className={cn(
    "flex w-full items-center justify-center gap-2",
    layout === "row" ? "flex-wrap" : "flex-col",
    className
  )}
  {...props}
/>
```

`ProductCardPill`:

```tsx
<span
  ref={ref}
  data-slot="product-card-pill"
  className={cn(
    "inline-flex items-center justify-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-sm font-semibold text-foreground",
    className
  )}
  {...props}
>
  {icon != null && (
    <span className="shrink-0 [&_svg]:size-3" aria-hidden>
      {icon}
    </span>
  )}
  {dot && <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden />}
  {children}
</span>
```

`ProductCardLocation`:

```tsx
<div
  ref={ref}
  data-slot="product-card-location"
  className={cn("flex w-full items-center justify-center gap-2", className)}
  {...props}
>
  <div className="h-px flex-1 rounded bg-border" />
  <ProductCardPill>{children}</ProductCardPill>
  <div className="h-px flex-1 rounded bg-border" />
</div>
```

`ProductCardText`:

```tsx
<div
  ref={ref}
  data-slot="product-card-text"
  className={cn("flex w-full flex-col items-center gap-1 text-muted-foreground", className)}
  {...props}
>
  <p className="w-full text-center text-md leading-6">{primary}</p>
  {secondary && <p className="w-full text-center text-xs leading-4">{secondary}</p>}
</div>
```

`ProductCardSeparator`:

```tsx
<div
  ref={ref}
  data-slot="product-card-separator"
  className={cn("h-px w-full shrink-0 rounded bg-border", className)}
  {...props}
/>
```

`ProductCardFooter`:

```tsx
<div
  ref={ref}
  data-slot="product-card-footer"
  className={cn("flex w-full items-center justify-center bg-secondary p-2", className)}
  {...props}
>
  <span className="inline-flex items-center justify-center rounded-full bg-background px-2 py-1 text-md font-semibold text-foreground">
    {children}
  </span>
</div>
```

`ProductCardStepper`:

```tsx
<div
  ref={ref}
  data-slot="product-card-stepper"
  className={cn("flex w-full flex-col items-center gap-2", className)}
  {...props}
>
  {label && <p className="w-full text-center text-lg font-semibold leading-7 text-foreground">{label}</p>}
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={onDecrease}
      aria-label="Diminuir quantidade"
      className="flex size-12 shrink-0 items-center justify-center rounded-md text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Minus className="size-6" />
    </button>
    <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-background px-4">
      <p className="text-center text-lg text-foreground">{value}</p>
    </div>
    <button
      type="button"
      onClick={onIncrease}
      aria-label="Aumentar quantidade"
      className="flex size-12 shrink-0 items-center justify-center rounded-md text-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Plus className="size-6" />
    </button>
  </div>
</div>
```

`ProductCardWithBadges`:

```tsx
<ProductCard ref={ref} className={className}>
  <ProductCardBody>
    {topBadges && <ProductCardTags layout={variant === "horizontal" ? "row" : "column"}>{topBadges}</ProductCardTags>}
    {imageBadge}
    <ProductCardMedia>{media}</ProductCardMedia>
    <ProductCardTitle>{title}</ProductCardTitle>
    {location && <ProductCardLocation>{location}</ProductCardLocation>}
    {content}
    {bottomBadges && <ProductCardTags className="flex-nowrap gap-1">{bottomBadges}</ProductCardTags>}
  </ProductCardBody>
  {footer && <ProductCardFooter>{footer}</ProductCardFooter>}
</ProductCard>
```

**Props:**

- `ProductCardTagsProps` (estende `React.HTMLAttributes<HTMLDivElement>`)
  - `layout?: "row" | "column"` — Figma: variant "Badge horizontal" (`row`, wraps) vs "Badge vertical" (`column`, stacked) — purely a layout choice, same tags either way.
- `ProductCardPillProps` (estende `React.HTMLAttributes<HTMLSpanElement>`)
  - `icon?: React.ReactNode` — Leading glyph, same slot convention as `Badge`'s `icon`.
  - `dot?: boolean` — Status dot before the label, same convention as `Badge`'s `dot`.
- `ProductCardTextProps` (estende `React.HTMLAttributes<HTMLDivElement>`)
  - `primary: React.ReactNode`
  - `secondary?: React.ReactNode`
- `ProductCardStepperProps` (estende `Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">`)
  - `value: number`
  - `onDecrease?: () => void`
  - `onIncrease?: () => void`
  - `label?: React.ReactNode`
- `ProductCardWithBadgesProps`
  - `variant?: "horizontal" | "vertical"` — Figma: variant "Badge horizontal" | "Badge vertical" — layout of `topBadges` only.
  - `topBadges?: React.ReactNode` — Figma: `bagdeSuperior` — tags above the media. Omit to hide.
  - `imageBadge?: React.ReactNode` — Figma: `ProductPicture`'s `imageBadge` — small pill above the media. Omit to hide.
  - `media?: React.ReactNode` — Passed straight to `ProductCardMedia`; omit for the default placeholder icon.
  - `title: React.ReactNode`
  - `location?: React.ReactNode` — Figma: "location" divider-pill row. Omit to hide.
  - `content?: React.ReactNode` — Figma: "scan"/`content` text block — typically a `ProductCardText`. Omit to hide.
  - `bottomBadges?: React.ReactNode` — Figma: `badgeInferior` — tags below the content, non-wrapping. Omit to hide.
  - `footer?: React.ReactNode` — Figma: `status` — footer band. Omit to hide.
  - `className?: string`

**Stories:** Horizontal · Vertical

**Exemplo (React, story `Horizontal`):**

```tsx
<ProductCardWithBadges
  variant="horizontal"
  topBadges={genericTags}
  imageBadge={genericImageBadge}
  title="Title"
  location="Badge label"
  content={<ProductCardText primary="Content" secondary="text-secondary" />}
  bottomBadges={genericTags}
  footer="Badge label"
/>
```

### Product Tile

`product-tile` · exporta `ProductTile`

ProductTile — the Figma "Product Tile" component set (node 38835:30351): a shelf/grid card (`layout="vertical"`) and a list row (`layout="horizontal"`), each with an `unavailable` (out-of-stock) state, plus a read-only `type="orderDetail"` row used in order history/refund screens. Reuses `AddToCartButton` for the cart stepper — same component, same behavior.

**Anatomia (elemento raiz → classes):**

- `ProductTile` → `<div>` `flex w-full items-center gap-2 overflow-hidden rounded-md border border-border pr-2 [isOrderDetail: relative z-[1]]`

**Marcação de produção (JSX):**

`ProductTile`:

```tsx
<div
  ref={isOrderDetail ? undefined : ref}
  className={cn(
    "flex w-full items-center gap-2 overflow-hidden rounded-md border border-border pr-2",
    isOrderDetail && "relative z-[1]",
    !isOrderDetail && className
  )}
>
  <ProductImage
    image={image}
    imageAlt={imageAlt}
    unavailable={unavailable}
    className="size-[105px]"
  >
    {!isOrderDetail && !unavailable && favorite !== undefined && (
      <FavoriteChip active={favorite} onToggle={onToggleFavorite} />
    )}
  </ProductImage>
  <div className={cn("flex min-w-0 flex-1 flex-col gap-2", unavailable && "opacity-50")}>
    <div className="flex items-start gap-2">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-accent-foreground">{name}</p>
        <p className="truncate text-sm text-muted-foreground">{size}</p>
      </div>
      {!isOrderDetail && onRemove && <RemoveButton onClick={onRemove} />}
    </div>
    <div className="flex items-center justify-between gap-2">
      <Price originalPrice={originalPrice} price={price} priceMultiplier={priceMultiplier} />
      <AddToCartButton
        quantity={isOrderDetail ? 0 : quantity}
        disabled={unavailable || isOrderDetail}
        onAdd={onAdd}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  </div>
</div>
```

**Props:**

- `ProductTileProps`
  - `layout?: "vertical" | "horizontal"`
  - `type?: "default" | "orderDetail"` — "orderDetail" is a read-only row used in order history/refund screens (horizontal only).
  - `unavailable?: boolean` — Out of stock — fades the image/description and disables the cart button.
  - `image: string`
  - `imageAlt?: string`
  - `name: string`
  - `size: string` — Weight/size line, e.g. "115g".
  - `originalPrice?: string` — Struck-through price shown when the item is discounted.
  - `price: string`
  - `priceMultiplier?: string` — Bold prefix before the price, e.g. "2x" (orderDetail quantity billed).
  - `quantity?: number` — AddToCartButton wiring — see add-to-cart.tsx.
  - `onAdd?: () => void`
  - `onIncrement?: () => void`
  - `onDecrement?: () => void`
  - `favorite?: boolean` — Vertical layout and horizontal "default": favorite heart toggle.
  - `onToggleFavorite?: () => void`
  - `onRemove?: () => void` — Horizontal "default" only: the "x" remove-from-list button.
  - `refund?: { count: number; unit?: string }` — Horizontal "orderDetail" only: the floating refund badge.
  - `className?: string`

**Stories:** Vertical (Card de vitrine (`layout="vertical"`), lado a lado: disponível e indisponível.) · Horizontal (Linha de lista (`layout="horizontal"`) — disponível (com stepper) e indisponível.) · OrderDetail (Linha somente-leitura usada em detalhe de pedido/reembolso.)

**Exemplo (React, story `OrderDetail`):**

```tsx
<div className="max-w-md">
  <ProductTile
    layout="horizontal"
    type="orderDetail"
    image={iogurte}
    name="Iogurte Pense Zero Morango"
    size="115g"
    originalPrice="3x R$17,09"
    price="R$ 17,09"
    priceMultiplier="2x"
    refund={{ count: 1, unit: "un." }}
  />
</div>
```

### Accordion

`accordion` · exporta `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

**Anatomia (elemento raiz → classes):**

- `AccordionItem` → `<AccordionPrimitive.Item>` `border-b`
- `AccordionTrigger` → `<AccordionPrimitive.Header>` `flex`
- `AccordionContent` → `<AccordionPrimitive.Content>` `overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Accordion type="single" collapsible className="w-full max-w-md">
  <AccordionItem value="a">
    <AccordionTrigger>Como funciona a entrega?</AccordionTrigger>
    <AccordionContent>Do dark store mais perto de você, em minutos.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Qual a taxa de entrega?</AccordionTrigger>
    <AccordionContent>Calculada no checkout conforme a distância.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="c">
    <AccordionTrigger>Posso agendar?</AccordionTrigger>
    <AccordionContent>Sim, escolha a janela de horário no carrinho.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Alert

`alert` · exporta `Alert`, `AlertTitle`, `AlertDescription`

**Variantes (classes reais):**

- `alertVariants` base: `relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7`
  - `variant` (padrão `default`):
    - `default`: `bg-background text-foreground`
    - `destructive`: `border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive`

**Anatomia (elemento raiz → classes):**

- `Alert` → `<div>` `{alertVariants}`
- `AlertTitle` → `<h5>` `mb-1 font-medium leading-none tracking-tight`
- `AlertDescription` → `<div>` `text-sm [&_p]:leading-relaxed`

**Stories:** Default · Destructive

**Exemplo (React, story `Default`):**

```tsx
<Alert className="max-w-md">
  <Rocket className="h-4 w-4" />
  <AlertTitle>Pedido a caminho</AlertTitle>
  <AlertDescription>Seu entregador saiu do dark store. Chega em ~15 min.</AlertDescription>
</Alert>
```

### Alert Dialog

`alert-dialog` · exporta `AlertDialog`, `AlertDialogTrigger`, `AlertDialogPortal`, `AlertDialogOverlay`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`

**Anatomia (elemento raiz → classes):**

- `AlertDialogOverlay` → `<AlertDialogPrimitive.Overlay>` `fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`
- `AlertDialogHeader` → `<div>` `flex flex-col space-y-2 text-center sm:text-left`
- `AlertDialogFooter` → `<div>` `flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2`
- `AlertDialogTitle` → `<AlertDialogPrimitive.Title>` `text-lg font-semibold`
- `AlertDialogDescription` → `<AlertDialogPrimitive.Description>` `text-sm text-muted-foreground`
- `AlertDialogAction` → `<AlertDialogPrimitive.Action>` `{buttonVariants}`
- `AlertDialogCancel` → `<AlertDialogPrimitive.Cancel>` `{buttonVariants} mt-2 sm:mt-0`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Cancelar pedido</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Cancelar este pedido?</AlertDialogTitle>
      <AlertDialogDescription>
        Essa ação não pode ser desfeita. O pedido sairá da fila de entrega.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Voltar</AlertDialogCancel>
      <AlertDialogAction>Cancelar pedido</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Aspect Ratio

`aspect-ratio` · exporta `AspectRatio`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<div className="w-[360px]">
  <AspectRatio ratio={16 / 9} className="rounded-lg bg-primary/10">
    <div className="flex h-full items-center justify-center text-sm text-primary">16 / 9</div>
  </AspectRatio>
</div>
```

### Avatar

`avatar` · exporta `Avatar`, `AvatarImage`, `AvatarFallback`

**Anatomia (elemento raiz → classes):**

- `Avatar` → `<AvatarPrimitive.Root>` `relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full`
- `AvatarImage` → `<AvatarPrimitive.Image>` `aspect-square h-full w-full`
- `AvatarFallback` → `<AvatarPrimitive.Fallback>` `flex h-full w-full items-center justify-center rounded-full bg-muted`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<div className="flex items-center gap-3">
  <Avatar>
    <AvatarImage src="https://i.pravatar.cc/64?img=13" alt="Ulisses" />
    <AvatarFallback>UC</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback>GP</AvatarFallback>
  </Avatar>
</div>
```

### Badge

`badge` · exporta `Badge`

Nemo Badge — the unified Tag/Chip. `color` × `variant` cover the full Figma matrix (HUBR Components, node 727:28091): default/success/warning/critical/ info/disabled/inverted × filled/outline/ghost/solid. This is the single agnostic Tag proposed to replace the ~15 per-product tag components (SuperDakiTag, StatusTag, DiscountTag, ModalityTag, CounterTag...) — `variant="filled"` is the semantic-color "soft" look (tonal bg).

**Variantes (classes reais):**

- `badgeVariants` base: `inline-flex items-center whitespace-nowrap border border-transparent font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`
  - `color` (padrão `default`):
    - `default`
    - `success`
    - `warning`
    - `critical`
    - `info`
    - `disabled`
    - `inverted`
  - `variant` (padrão `filled`):
    - `filled`
    - `outline`
    - `ghost`
    - `solid`
  - `size` (padrão `md`):
    - `md`: `gap-1 px-2.5 py-0.5 text-xs`
    - `sm`: `gap-0.5 px-2 py-0.5 text-2xs`
  - `shape` (padrão `pill`):
    - `pill`: `rounded-full`
    - `square`: `rounded-md`
  - combinações:
    - color=default + variant=filled: `bg-primary text-primary-foreground`
    - color=default + variant=outline: `border-accent-border bg-transparent text-accent-foreground`
    - color=default + variant=ghost: `bg-transparent text-accent-foreground`
    - color=default + variant=solid: `bg-primary text-primary-foreground`
    - color=success + variant=filled: `bg-success-soft text-success-soft-foreground`
    - color=success + variant=outline: `border-success-border bg-transparent text-success-soft-foreground`
    - color=success + variant=ghost: `bg-transparent text-success-soft-foreground`
    - color=success + variant=solid: `bg-success text-success-foreground`
    - color=warning + variant=filled: `bg-warning-soft text-warning-soft-foreground`
    - color=warning + variant=outline: `border-warning-border bg-transparent text-warning-soft-foreground`
    - color=warning + variant=ghost: `bg-transparent text-warning-soft-foreground`
    - color=warning + variant=solid: `bg-warning text-warning-foreground`
    - color=critical + variant=filled: `bg-destructive-soft text-destructive-soft-foreground`
    - color=critical + variant=outline: `border-destructive-border bg-transparent text-destructive-soft-foreground`
    - color=critical + variant=ghost: `bg-transparent text-destructive-soft-foreground`
    - color=critical + variant=solid: `bg-destructive text-destructive-foreground`
    - color=info + variant=filled: `bg-info text-info-foreground`
    - color=info + variant=outline: `border-info-border bg-transparent text-info-foreground`
    - color=info + variant=ghost: `bg-transparent text-info-foreground`
    - color=info + variant=solid: `bg-info text-info-foreground`
    - color=disabled + variant=filled: `bg-disabled text-disabled-foreground`
    - color=disabled + variant=outline: `border-disabled-border bg-transparent text-disabled-foreground`
    - color=disabled + variant=ghost: `bg-transparent text-disabled-foreground`
    - color=disabled + variant=solid: `bg-disabled text-disabled-foreground`
    - color=inverted + variant=filled: `bg-inverted text-inverted-foreground`
    - color=inverted + variant=outline: `border-inverted bg-transparent text-inverted`
    - color=inverted + variant=ghost: `bg-transparent text-inverted`
    - color=inverted + variant=solid: `bg-inverted text-inverted-foreground`

**Anatomia (elemento raiz → classes):**

- `Badge` → `<div>` `{badgeVariants} [counterOnly: min-w-[1.25rem] justify-center px-1]`

**Props:**

- `BadgeProps` (estende `Omit<React.HTMLAttributes<HTMLDivElement>, "color">`, `VariantProps<typeof badgeVariants>`)
  - `icon?: React.ReactNode` — Leading glyph (e.g. a lucide icon). Sized to fit the badge and colored via currentColor.
  - `dot?: boolean` — Status dot before the label, colored via currentColor.
  - `count?: number` — Numeric counter (counter-tag / picking-amount). Without `children`, the badge renders as a standalone counter (defaults to `size="sm"`).

**Stories:** Default · Matrix · WithoutIcon · DiscountTag (Migra `DiscountTag` (Daki Web/App) → `color="critical" variant="solid"`.) · Counter (Migra `counter-tag`/`PickingAmountTags` (HUBR) → `count` sem `children`.) · FilterChip (Chip de filtro compacto — `size="sm"` + `shape="square"`.)

**Exemplo (React, story `WithoutIcon`):**

```tsx
<div className="flex flex-wrap gap-2">
  <Badge color="success">Entregue</Badge>
  <Badge color="warning">Atenção</Badge>
  <Badge color="critical">Atrasado</Badge>
  <Badge color="info">Novidade</Badge>
  <Badge color="disabled">Rascunho</Badge>
</div>
```

### Breadcrumb

`breadcrumb` · exporta `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`

**Anatomia (elemento raiz → classes):**

- `BreadcrumbList` → `<ol>` `flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5`
- `BreadcrumbItem` → `<li>` `inline-flex items-center gap-1.5`
- `BreadcrumbLink` → `<Comp>` `transition-colors hover:text-foreground`
- `BreadcrumbPage` → `<span>` `font-normal text-foreground`
- `BreadcrumbSeparator` → `<li>` `[&>svg]:size-3.5`
- `BreadcrumbEllipsis` → `<span>` `flex h-9 w-9 items-center justify-center`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="#">Início</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="#">Mercado</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Hortifruti</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Button

`button` · exporta `Button`

Nemo Button — shadcn/ui structure, Nemo tokens. Colors/radii/spacing come from the Tailwind preset (→ Nemo CSS vars), so this component is identical to what `npx shadcn add button` produces and needs no per-brand edits.

**Variantes (classes reais):**

- `buttonVariants` base: `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`
  - `variant` (padrão `default`):
    - `default`: `bg-primary text-primary-foreground hover:bg-primary-hover`
    - `secondary`: `bg-card text-info-foreground hover:bg-secondary`
    - `outline`: `border border-border bg-background hover:bg-secondary hover:text-foreground`
    - `ghost`: `hover:bg-secondary hover:text-foreground`
    - `destructive`: `bg-destructive text-destructive-foreground hover:opacity-90`
    - `link`: `text-primary underline-offset-4 hover:underline`
  - `size` (padrão `md`):
    - `sm`: `h-9 px-3`
    - `md`: `h-10 px-4 py-2`
    - `lg`: `h-11 px-6 text-md`
    - `icon`: `h-10 w-10`
  - `pill` (padrão `false`):
    - `true`: `rounded-full`

**Anatomia (elemento raiz → classes):**

- `Button` → `<Comp>` `{buttonVariants}`

**Props:**

- `ButtonProps` (estende `React.ButtonHTMLAttributes<HTMLButtonElement>`, `VariantProps<typeof buttonVariants>`)
  - `asChild?: boolean`

**Stories:** Default · Secondary · Outline · Ghost · Destructive · Link · AllVariants · Sizes

**Exemplo (React, story `AllVariants`):**

```tsx
<div className="flex flex-wrap gap-3">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="link">Link</Button>
</div>
```

### Button Group

`button-group` · exporta `ButtonGroup`

**Anatomia (elemento raiz → classes):**

- `ButtonGroup` → `<div>` `inline-flex gap-1 [orientation === "vertical" ? flex-col : flex-row] [orientation === "horizontal" ? [&>*]:rounded-none [&>*]:first:rounded-l-md [&>*]:last:rounded-r-md : [&>*]:rounded-none [&>*]:first:rounded-t-md [&>*]:last:rounded-b-md]`

**Props:**

- `ButtonGroupProps` (estende `React.HTMLAttributes<HTMLDivElement>`)
  - `orientation?: "horizontal" | "vertical"`

**Stories:** Horizontal · Vertical

**Exemplo (React, story `Horizontal`):**

```tsx
<ButtonGroup>
  <Button variant="outline">Dia</Button>
  <Button variant="outline">Semana</Button>
  <Button variant="outline">Mês</Button>
</ButtonGroup>
```

### Calendar

`calendar` · exporta `Calendar`

**Anatomia (elemento raiz → classes):**

- `Calendar` → `<DayPicker>` `p-3`

**Stories:** Default

### Card

`card` · exporta `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

Nemo Card — shadcn/ui structure, Nemo tokens.

**Anatomia (elemento raiz → classes):**

- `Card` → `<div>` `rounded-lg border border-border bg-card text-card-foreground shadow-sm`
- `CardHeader` → `<div>` `flex flex-col gap-1 p-6`
- `CardTitle` → `<div>` `text-lg font-semibold leading-tight`
- `CardDescription` → `<div>` `text-sm text-muted-foreground`
- `CardContent` → `<div>` `p-6 pt-0`
- `CardFooter` → `<div>` `flex items-center p-6 pt-0`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Card className="max-w-sm">
  <CardHeader>
    <CardTitle>Entrega em 15 min</CardTitle>
    <CardDescription>Seu pedido saiu do dark store mais perto de você.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">
      Acompanhe o entregador em tempo real e receba atualizações a cada etapa.
    </p>
  </CardContent>
  <CardFooter className="gap-3">
    <Button>Acompanhar</Button>
    <Button variant="outline">Ajuda</Button>
  </CardFooter>
</Card>
```

### Carousel

`carousel` · exporta `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `CarouselDots`

Dot pagination — one dot per slide, active dot pill-shaped. Hidden for single-slide carousels.

**Anatomia (elemento raiz → classes):**

- `CarouselContent` → `<div>` `overflow-hidden`
- `CarouselItem` → `<div>` `min-w-0 shrink-0 grow-0 basis-full [orientation === "horizontal" ? pl-4 : pt-4]`
- `CarouselPrevious` → `<Button>` `absolute h-8 w-8 rounded-full [orientation === "horizontal" ? -left-12 top-1/2 -translate-y-1/2 : -top-12 left-1/2 -translate-x-1/2 rotate-90]`
- `CarouselNext` → `<Button>` `absolute h-8 w-8 rounded-full [orientation === "horizontal" ? -right-12 top-1/2 -translate-y-1/2 : -bottom-12 left-1/2 -translate-x-1/2 rotate-90]`
- `CarouselDots` → `<div>` `flex items-center justify-center gap-1.5`

**Props:**

- `CarouselProps`
  - `opts?: CarouselOptions`
  - `plugins?: CarouselPlugin`
  - `orientation?: "horizontal" | "vertical"`
  - `setApi?: (api: CarouselApi) => void`
- `CarouselContextProps`
  - `carouselRef: ReturnType<typeof useEmblaCarousel>[0]`
  - `api: ReturnType<typeof useEmblaCarousel>[1]`
  - `scrollPrev: () => void`
  - `scrollNext: () => void`
  - `canScrollPrev: boolean`
  - `canScrollNext: boolean`

**Stories:** Default · PromoBanner

**Exemplo (React, story `Default`):**

```tsx
<div className="mx-auto w-full max-w-xs">
  <Carousel>
    <CarouselContent>
      {["Hortifruti", "Bebidas", "Limpeza", "Padaria", "Frios"].map((c) => (
        <CarouselItem key={c}>
          <div className="flex h-40 items-center justify-center rounded-lg border border-border bg-card text-lg font-semibold text-card-foreground">
            {c}
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>
```

### Chart

`chart` · exporta `ChartContainer`, `ChartStyle`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`

**Anatomia (elemento raiz → classes):**

- `ChartTooltipContent` → `<div>` `font-medium`
- `ChartLegendContent` → `<div>` `flex items-center justify-center gap-4 [verticalAlign === "top" ? pb-3 : pt-3]`

**Props:**

- `ChartContextProps`
  - `config: ChartConfig`

**Stories:** Bars

**Exemplo (React, story `Bars`):**

```tsx
<ChartContainer config={config} className="h-[260px] w-full max-w-xl">
  <BarChart data={data} accessibilityLayer>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="dia" tickLine={false} axisLine={false} tickMargin={8} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="pedidos" fill="var(--color-pedidos)" radius={6} />
  </BarChart>
</ChartContainer>
```

### Checkbox

`checkbox` · exporta `Checkbox`

**Anatomia (elemento raiz → classes):**

- `Checkbox` → `<CheckboxPrimitive.Root>` `peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground`

**Stories:** Default · WithLabel · Disabled

**Exemplo (React, story `WithLabel`):**

```tsx
<label className="flex items-center gap-2 text-sm text-foreground">
  <Checkbox defaultChecked /> Aceito os termos de entrega
</label>
```

### Collapsible

`collapsible` · exporta `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Collapsible className="w-full max-w-sm space-y-2">
  <div className="flex items-center justify-between gap-4 rounded-md border border-border px-4 py-2">
    <span className="text-sm font-semibold text-foreground">Itens do pedido</span>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="icon"><ChevronsUpDown className="h-4 w-4" /></Button>
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent className="space-y-2">
    <div className="rounded-md border border-border px-4 py-2 text-sm">Leite integral · 1L</div>
    <div className="rounded-md border border-border px-4 py-2 text-sm">Pão de forma</div>
  </CollapsibleContent>
</Collapsible>
```

### Combobox

`combobox` · exporta `Combobox`

**Props:**

- `ComboboxProps`
  - `options: ComboboxOption[]`
  - `value?: string`
  - `onChange?: (value: string) => void`
  - `placeholder?: string`
  - `emptyText?: string`

**Stories:** Default

### Command

`command` · exporta `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandSeparator`, `CommandItem`, `CommandShortcut`

**Anatomia (elemento raiz → classes):**

- `Command` → `<CommandPrimitive>` `flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground`
- `CommandInput` → `<div>` `flex items-center border-b px-3`
- `CommandList` → `<CommandPrimitive.List>` `max-h-[300px] overflow-y-auto overflow-x-hidden`
- `CommandEmpty` → `<CommandPrimitive.Empty>` `py-6 text-center text-sm`
- `CommandGroup` → `<CommandPrimitive.Group>` `overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground`
- `CommandSeparator` → `<CommandPrimitive.Separator>` `-mx-1 h-px bg-border`
- `CommandItem` → `<CommandPrimitive.Item>` `relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`
- `CommandShortcut` → `<span>` `ml-auto text-xs tracking-widest text-muted-foreground`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Command className="max-w-md rounded-lg border border-border shadow-sm">
  <CommandInput placeholder="Buscar ação ou produto…" />
  <CommandList>
    <CommandEmpty>Nada encontrado.</CommandEmpty>
    <CommandGroup heading="Ações">
      <CommandItem>Novo pedido <CommandShortcut>⌘N</CommandShortcut></CommandItem>
      <CommandItem>Atribuir rider</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Produtos">
      <CommandItem>Leite integral</CommandItem>
      <CommandItem>Pão de forma</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Context Menu

`context-menu` · exporta `ContextMenu`, `ContextMenuTrigger`, `ContextMenuGroup`, `ContextMenuPortal`, `ContextMenuSub`, `ContextMenuRadioGroup`, `ContextMenuSubTrigger`, `ContextMenuSubContent`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`

**Anatomia (elemento raiz → classes):**

- `ContextMenuSubTrigger` → `<ContextMenuPrimitive.SubTrigger>` `flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [inset: pl-8]`
- `ContextMenuSubContent` → `<ContextMenuPrimitive.SubContent>` `z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
- `ContextMenuItem` → `<ContextMenuPrimitive.Item>` `relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [inset: pl-8]`
- `ContextMenuCheckboxItem` → `<ContextMenuPrimitive.CheckboxItem>` `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
- `ContextMenuRadioItem` → `<ContextMenuPrimitive.RadioItem>` `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
- `ContextMenuLabel` → `<ContextMenuPrimitive.Label>` `px-2 py-1.5 text-sm font-semibold text-foreground [inset: pl-8]`
- `ContextMenuSeparator` → `<ContextMenuPrimitive.Separator>` `-mx-1 my-1 h-px bg-border`
- `ContextMenuShortcut` → `<span>` `ml-auto text-xs tracking-widest text-muted-foreground`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
    Clique com o botão direito
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Ver pedido <ContextMenuShortcut>⌘O</ContextMenuShortcut></ContextMenuItem>
    <ContextMenuItem>Reatribuir rider</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem className="text-destructive">Cancelar</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### Data Table

`data-table` · exporta `DataTable`

**Anatomia (elemento raiz → classes):**

- `DataTable` → `<div>` `rounded-md border`

**Props:**

- `DataTableProps`
  - `columns: ColumnDef<TData, TValue>[]`
  - `data: TData[]`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<div className="max-w-2xl">
  <DataTable columns={columns} data={data} />
</div>
```

### Date Picker

`date-picker` · exporta `DatePicker`

**Props:**

- `DatePickerProps`
  - `value?: Date`
  - `onChange?: (date?: Date) => void`
  - `placeholder?: string`

**Stories:** Default

### Dialog

`dialog` · exporta `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogClose`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`

**Anatomia (elemento raiz → classes):**

- `DialogOverlay` → `<DialogPrimitive.Overlay>` `fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`
- `DialogHeader` → `<div>` `flex flex-col space-y-1.5 text-center sm:text-left`
- `DialogFooter` → `<div>` `flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2`
- `DialogTitle` → `<DialogPrimitive.Title>` `text-lg font-semibold leading-none tracking-tight`
- `DialogDescription` → `<DialogPrimitive.Description>` `text-sm text-muted-foreground`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Dialog>
  <DialogTrigger asChild><Button>Editar endereço</Button></DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Endereço de entrega</DialogTitle>
      <DialogDescription>Atualize onde seu pedido deve chegar.</DialogDescription>
    </DialogHeader>
    <Input placeholder="Rua, número, complemento" />
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
      <Button>Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Drawer

`drawer` · exporta `Drawer`, `DrawerTrigger`, `DrawerPortal`, `DrawerClose`, `DrawerOverlay`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`

**Anatomia (elemento raiz → classes):**

- `DrawerOverlay` → `<DrawerPrimitive.Overlay>` `fixed inset-0 z-50 bg-black/80`
- `DrawerHeader` → `<div>` `grid gap-1.5 p-4 text-center sm:text-left`
- `DrawerFooter` → `<div>` `mt-auto flex flex-col gap-2 p-4`
- `DrawerTitle` → `<DrawerPrimitive.Title>` `text-lg font-semibold leading-none tracking-tight`
- `DrawerDescription` → `<DrawerPrimitive.Description>` `text-sm text-muted-foreground`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Drawer>
  <DrawerTrigger asChild><Button>Ver carrinho</Button></DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-md">
      <DrawerHeader>
        <DrawerTitle>Seu carrinho</DrawerTitle>
        <DrawerDescription>3 itens · entrega em ~15 min</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Finalizar pedido</Button>
        <DrawerClose asChild><Button variant="outline">Continuar comprando</Button></DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>
```

### Dropdown Menu

`dropdown-menu` · exporta `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuRadioGroup`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`

**Anatomia (elemento raiz → classes):**

- `DropdownMenuSubTrigger` → `<DropdownMenuPrimitive.SubTrigger>` `flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [inset: pl-8]`
- `DropdownMenuSubContent` → `<DropdownMenuPrimitive.SubContent>` `z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`
- `DropdownMenuItem` → `<DropdownMenuPrimitive.Item>` `relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [inset: pl-8]`
- `DropdownMenuCheckboxItem` → `<DropdownMenuPrimitive.CheckboxItem>` `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
- `DropdownMenuRadioItem` → `<DropdownMenuPrimitive.RadioItem>` `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
- `DropdownMenuLabel` → `<DropdownMenuPrimitive.Label>` `px-2 py-1.5 text-sm font-semibold [inset: pl-8]`
- `DropdownMenuSeparator` → `<DropdownMenuPrimitive.Separator>` `-mx-1 my-1 h-px bg-muted`
- `DropdownMenuShortcut` → `<span>` `ml-auto text-xs tracking-widest opacity-60`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Ações</Button></DropdownMenuTrigger>
  <DropdownMenuContent className="w-48">
    <DropdownMenuLabel>Pedido</DropdownMenuLabel>
    <DropdownMenuItem>Ver detalhes <DropdownMenuShortcut>⌘O</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuItem>Reatribuir rider</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Empty

`empty` · exporta `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`

Nemo Empty — follows the shadcn/ui Empty API (Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent). Token-driven, Nemo variables.

**Variantes (classes reais):**

- `emptyMediaVariants` base: `flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0`
  - `variant` (padrão `default`):
    - `default`: `bg-transparent`
    - `icon`: `size-10 rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6`

**Anatomia (elemento raiz → classes):**

- `Empty` → `<div data-slot="empty">` `flex min-w-0 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center md:p-12`
- `EmptyHeader` → `<div data-slot="empty-header">` `flex max-w-sm flex-col items-center gap-2 text-center`
- `EmptyMedia` → `<div data-slot="empty-media">` `{emptyMediaVariants}`
- `EmptyTitle` → `<div data-slot="empty-title">` `text-lg font-medium tracking-tight`
- `EmptyDescription` → `<p data-slot="empty-description">` `text-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4`
- `EmptyContent` → `<div data-slot="empty-content">` `flex w-full max-w-sm min-w-0 flex-col items-center gap-2 text-sm text-balance`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Empty className="max-w-md">
  <EmptyHeader>
    <EmptyMedia variant="icon"><PackageOpen /></EmptyMedia>
    <EmptyTitle>Nenhum pedido em rota</EmptyTitle>
    <EmptyDescription>Quando um pedido sair do dark store, ele aparece aqui.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Criar pedido</Button>
  </EmptyContent>
</Empty>
```

### Field

`field` · exporta `Field`, `FieldGroup`, `FieldSet`, `FieldLegend`, `FieldContent`, `FieldLabel`, `FieldTitle`, `FieldDescription`, `FieldError`, `FieldSeparator`

Nemo Field — follows the shadcn/ui Field API (Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldSet, FieldLegend, FieldSeparator, FieldContent, FieldTitle). Form-field layout primitives, token-driven with Nemo variables.

**Variantes (classes reais):**

- `fieldVariants` base: `group/field flex w-full gap-2 data-[invalid=true]:text-destructive`
  - `orientation` (padrão `vertical`):
    - `vertical`: `flex-col [&>*]:w-full`
    - `horizontal`: `flex-row items-center [&>[data-slot=field-label]]:flex-auto`
    - `responsive`: `flex-col [&>*]:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>[data-slot=field-label]]:flex-auto`

**Anatomia (elemento raiz → classes):**

- `Field` → `<div data-slot="field">` `{fieldVariants}`
- `FieldGroup` → `<div data-slot="field-group">` `group/field-group @container/field-group flex w-full flex-col gap-6`
- `FieldSet` → `<fieldset data-slot="field-set">` `flex flex-col gap-3`
- `FieldLegend` → `<legend data-slot="field-legend">` `mb-3 text-sm font-medium`
- `FieldContent` → `<div data-slot="field-content">` `flex flex-1 flex-col gap-1.5 leading-snug`
- `FieldLabel` → `<label data-slot="field-label">` `flex w-fit items-center gap-2 text-sm font-medium leading-snug text-foreground has-[[disabled]]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50`
- `FieldTitle` → `<div data-slot="field-title">` `flex w-fit items-center gap-2 text-sm font-medium leading-snug`
- `FieldDescription` → `<p data-slot="field-description">` `text-sm font-normal leading-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4`
- `FieldError` → `<ul>` `ml-4 flex list-disc flex-col gap-1`
- `FieldSeparator` → `<div data-slot="field-separator">` `relative -my-2 h-5 text-sm text-muted-foreground`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<FieldGroup className="max-w-sm">
  <Field>
    <FieldLabel htmlFor="email">E-mail</FieldLabel>
    <Input id="email" type="email" placeholder="voce@exemplo.com" />
    <FieldDescription>Enviaremos a confirmação do pedido aqui.</FieldDescription>
  </Field>
  <Field>
    <FieldLabel htmlFor="cep">CEP</FieldLabel>
    <Input id="cep" placeholder="00000-000" aria-invalid />
    <FieldError>CEP fora da área de entrega.</FieldError>
  </Field>
</FieldGroup>
```

### Form

`form` · exporta `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`

**Anatomia (elemento raiz → classes):**

- `FormLabel` → `<Label>` `[error: text-destructive]`
- `FormDescription` → `<p>` `text-sm text-muted-foreground`
- `FormMessage` → `<p>` `text-sm font-medium text-destructive`

**Stories:** Default (Form built on react-hook-form — label/control/description/message wired for a11y.)

### Hover Card

`hover-card` · exporta `HoverCard`, `HoverCardTrigger`, `HoverCardContent`

**Anatomia (elemento raiz → classes):**

- `HoverCardContent` → `<HoverCardPrimitive.Content>` `z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<HoverCard>
  <HoverCardTrigger asChild><Button variant="link">@ulisses</Button></HoverCardTrigger>
  <HoverCardContent className="w-64">
    <p className="text-sm font-semibold text-foreground">Ulisses Camilo</p>
    <p className="text-sm text-muted-foreground">Shopper · 4.9 ★ · 1.2k pedidos</p>
  </HoverCardContent>
</HoverCard>
```

### Input

`input` · exporta `Input`

Nemo Input — shadcn/ui structure, Nemo tokens. border-input, bg-background, ring-ring, radius-md all resolve to Nemo vars.

**Anatomia (elemento raiz → classes):**

- `Input` → `<input>` `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`

**Stories:** Default · WithLabel · Disabled

**Exemplo (React, story `Default`):**

```tsx
<Input {...args} className="max-w-xs" />
```

### Input Group

`input-group` · exporta `InputGroup`, `InputGroupInput`, `InputGroupAddon`, `InputGroupButton`, `InputGroupText`

Nemo InputGroup — follows the shadcn/ui Input Group API (InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton, InputGroupText). Wraps an input with leading/trailing addons. Token-driven, Nemo variables.

**Variantes (classes reais):**

- `inputGroupAddonVariants` base: `flex items-center justify-center gap-2 text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`
  - `align` (padrão `inline-start`):
    - `inline-start`: `pl-3`
    - `inline-end`: `pr-3`

**Anatomia (elemento raiz → classes):**

- `InputGroup` → `<div data-slot="input-group">` `relative flex w-full items-center rounded-md border border-input bg-background transition-[color,box-shadow] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background has-[[data-slot=input-group-input]:disabled]:opacity-50`
- `InputGroupInput` → `<input data-slot="input-group-input">` `flex h-10 w-full min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed`
- `InputGroupAddon` → `<div data-slot="input-group-addon">` `{inputGroupAddonVariants}`
- `InputGroupButton` → `<button data-slot="input-group-button">` `inline-flex h-7 items-center justify-center gap-1.5 rounded-sm px-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`
- `InputGroupText` → `<span data-slot="input-group-text">` `flex items-center gap-2 text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<div className="flex max-w-sm flex-col gap-3">
  <InputGroup>
    <InputGroupAddon align="inline-start"><Search className="h-4 w-4" /></InputGroupAddon>
    <InputGroupInput placeholder="Buscar produto…" />
  </InputGroup>
  <InputGroup>
    <InputGroupInput placeholder="Cupom" />
    <InputGroupAddon align="inline-end"><InputGroupText>%</InputGroupText><Percent className="h-4 w-4" /></InputGroupAddon>
  </InputGroup>
</div>
```

### Input OTP

`input-otp` · exporta `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`

Nemo Input OTP — canonical shadcn/ui Input OTP built on the `input-otp` package (InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator). Token-driven with Nemo variables.

**Anatomia (elemento raiz → classes):**

- `InputOTP` → `<OTPInput data-slot="input-otp">` `disabled:cursor-not-allowed`
- `InputOTPGroup` → `<div data-slot="input-otp-group">` `flex items-center`
- `InputOTPSlot` → `<div data-slot="input-otp-slot">` `relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm text-foreground transition-all first:rounded-l-md first:border-l last:rounded-r-md [isActive: z-10 ring-2 ring-ring ring-offset-background]`
- `InputOTPSeparator` → `<div data-slot="input-otp-separator">`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

### Item

`item` · exporta `Item`, `ItemGroup`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`, `ItemFooter`, `ItemSeparator`

Nemo Item — follows the shadcn/ui Item API (Item, ItemGroup, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemHeader, ItemFooter, ItemSeparator). A list-row primitive, token-driven with Nemo variables.

**Variantes (classes reais):**

- `itemVariants` base: `group/item flex flex-wrap items-center gap-3 rounded-md border p-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring`
  - `variant` (padrão `default`):
    - `default`: `border-transparent bg-card`
    - `outline`: `border-border`
    - `muted`: `border-transparent bg-muted`
  - `size` (padrão `default`):
    - `default`: `p-3`
    - `sm`: `gap-2.5 p-2.5`

**Anatomia (elemento raiz → classes):**

- `Item` → `<div data-slot="item">` `{itemVariants}`
- `ItemGroup` → `<div data-slot="item-group">` `flex flex-col`
- `ItemMedia` → `<div data-slot="item-media">` `flex shrink-0 items-center justify-center text-muted-foreground [&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none`
- `ItemContent` → `<div data-slot="item-content">` `flex flex-1 flex-col gap-0.5 [&+[data-slot=item-content]]:flex-none`
- `ItemTitle` → `<div data-slot="item-title">` `flex w-fit items-center gap-2 text-sm font-medium leading-snug`
- `ItemDescription` → `<p data-slot="item-description">` `line-clamp-2 text-sm font-normal leading-normal text-muted-foreground text-balance [&>a]:underline [&>a]:underline-offset-4`
- `ItemActions` → `<div data-slot="item-actions">` `ml-auto flex items-center gap-2`
- `ItemHeader` → `<div data-slot="item-header">` `flex basis-full items-center justify-between gap-2`
- `ItemFooter` → `<div data-slot="item-footer">` `flex basis-full items-center justify-between gap-2`
- `ItemSeparator` → `<div data-slot="item-separator">` `my-0 border-t`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<ItemGroup className="max-w-md">
  {["Ulisses Camilo", "Bruno Santos", "Ana Ribeiro"].map((name) => (
    <Item key={name} variant="outline">
      <ItemMedia><Bike className="h-4 w-4" /></ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>Rider · disponível</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
      </ItemActions>
    </Item>
  ))}
</ItemGroup>
```

### Kbd

`kbd` · exporta `Kbd`, `KbdGroup`

Nemo Kbd — follows the shadcn/ui Kbd API (Kbd, KbdGroup). Renders a <kbd> keyboard-key badge and an inline group wrapper. Token-driven, Nemo variables.

**Anatomia (elemento raiz → classes):**

- `Kbd` → `<kbd data-slot="kbd">` `inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 text-xs font-medium text-muted-foreground [&_svg:not([class*='size-'])]:size-3`
- `KbdGroup` → `<div data-slot="kbd-group">` `inline-flex items-center gap-1`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<div className="flex flex-col gap-3 text-sm text-muted-foreground">
  <div>Buscar: <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup></div>
  <div>Novo pedido: <KbdGroup><Kbd>⌘</Kbd><Kbd>N</Kbd></KbdGroup></div>
  <div>Enviar: <Kbd>Enter</Kbd></div>
</div>
```

### Label

`label` · exporta `Label`

**Variantes (classes reais):**

- `labelVariants` base: `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`

**Anatomia (elemento raiz → classes):**

- `Label` → `<LabelPrimitive.Root>` `{labelVariants}`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<div className="flex max-w-xs flex-col gap-2">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" type="email" placeholder="voce@exemplo.com" />
</div>
```

### Menubar

`menubar` · exporta `MenubarMenu`, `MenubarGroup`, `MenubarPortal`, `MenubarSub`, `MenubarRadioGroup`, `Menubar`, `MenubarTrigger`, `MenubarSubTrigger`, `MenubarSubContent`, `MenubarContent`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioItem`, `MenubarLabel`, `MenubarSeparator`, `MenubarShortcut`

**Anatomia (elemento raiz → classes):**

- `Menubar` → `<MenubarPrimitive.Root>` `flex h-10 items-center gap-1 rounded-md border border-border bg-background p-1 shadow-sm`
- `MenubarTrigger` → `<MenubarPrimitive.Trigger>` `flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground`
- `MenubarSubTrigger` → `<MenubarPrimitive.SubTrigger>` `flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [inset: pl-8]`
- `MenubarSubContent` → `<MenubarPrimitive.SubContent>` `z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95`
- `MenubarItem` → `<MenubarPrimitive.Item>` `relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [inset: pl-8]`
- `MenubarCheckboxItem` → `<MenubarPrimitive.CheckboxItem>` `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
- `MenubarRadioItem` → `<MenubarPrimitive.RadioItem>` `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
- `MenubarLabel` → `<MenubarPrimitive.Label>` `px-2 py-1.5 text-sm font-semibold [inset: pl-8]`
- `MenubarSeparator` → `<MenubarPrimitive.Separator>` `-mx-1 my-1 h-px bg-muted`
- `MenubarShortcut` → `<span>` `ml-auto text-xs tracking-widest text-muted-foreground`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Pedido</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Novo <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
      <MenubarItem>Duplicar</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Imprimir <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Exibir</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem checked>Mostrar entregues</MenubarCheckboxItem>
      <MenubarCheckboxItem>Modo compacto</MenubarCheckboxItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Ajuda</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Suporte</MenubarItem>
      <MenubarItem>Atalhos</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

### Navigation Menu

`navigation-menu` · exporta `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuViewport`, `NavigationMenuIndicator`

**Variantes (classes reais):**

- `navigationMenuTriggerStyle` base: `group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`

**Anatomia (elemento raiz → classes):**

- `NavigationMenu` → `<NavigationMenuPrimitive.Root>` `relative z-10 flex max-w-max flex-1 items-center justify-center`
- `NavigationMenuList` → `<NavigationMenuPrimitive.List>` `group flex flex-1 list-none items-center justify-center gap-1`
- `NavigationMenuTrigger` → `<NavigationMenuPrimitive.Trigger>` `{navigationMenuTriggerStyle} group`
- `NavigationMenuContent` → `<NavigationMenuPrimitive.Content>` `left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto`
- `NavigationMenuViewport` → `<div>` `absolute left-0 top-full flex justify-center`
- `NavigationMenuIndicator` → `<NavigationMenuPrimitive.Indicator>` `top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-64 gap-1 p-2">
          {["Hortifruti", "Bebidas", "Limpeza", "Padaria"].map((c) => (
            <li key={c}>
              <NavigationMenuLink className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground" href="#">
                {c}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">Promoções</NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">Pedidos</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Pagination

`pagination` · exporta `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`

**Anatomia (elemento raiz → classes):**

- `Pagination` → `<nav>` `mx-auto flex w-full justify-center`
- `PaginationContent` → `<ul>` `flex flex-row items-center gap-1`
- `PaginationLink` → `<a>` `{buttonVariants} cursor-pointer`
- `PaginationPrevious` → `<PaginationLink>` `gap-1 pl-2.5`
- `PaginationNext` → `<PaginationLink>` `gap-1 pr-2.5`
- `PaginationEllipsis` → `<span>` `flex h-9 w-9 items-center justify-center`

**Props:**

- `PaginationLinkProps`
  - `isActive?: boolean`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>
```

### Popover

`popover` · exporta `Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverContent`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Popover>
  <PopoverTrigger asChild><Button variant="outline">Filtros</Button></PopoverTrigger>
  <PopoverContent className="w-72">
    <div className="space-y-1">
      <p className="text-sm font-semibold text-foreground">Filtrar pedidos</p>
      <p className="text-sm text-muted-foreground">Por urgência, rider e janela de entrega.</p>
    </div>
  </PopoverContent>
</Popover>
```

### Progress

`progress` · exporta `Progress`

**Anatomia (elemento raiz → classes):**

- `Progress` → `<ProgressPrimitive.Root>` `relative h-2 w-full overflow-hidden rounded-full bg-secondary`

**Stories:** Default · Animated

**Exemplo (React, story `Default`):**

```tsx
<Progress {...args} className="w-80" />
```

### Radio Group

`radio-group` · exporta `RadioGroup`, `RadioGroupItem`

**Anatomia (elemento raiz → classes):**

- `RadioGroup` → `<RadioGroupPrimitive.Root>` `grid gap-2`
- `RadioGroupItem` → `<RadioGroupPrimitive.Item>` `aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<RadioGroup defaultValue="padrao">
  {[
    { v: "padrao", l: "Entrega padrão · grátis" },
    { v: "expressa", l: "Entrega expressa · R$ 4,99" },
    { v: "agendada", l: "Agendada" },
  ].map(({ v, l }) => (
    <div key={v} className="flex items-center gap-2">
      <RadioGroupItem value={v} id={v} />
      <Label htmlFor={v}>{l}</Label>
    </div>
  ))}
</RadioGroup>
```

### Resizable

`resizable` · exporta `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`

**Anatomia (elemento raiz → classes):**

- `ResizablePanelGroup` → `<ResizablePrimitive.PanelGroup>` `flex h-full w-full data-[panel-group-direction=vertical]:flex-col`
- `ResizableHandle` → `<ResizablePrimitive.PanelResizeHandle>` `relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90`

**Stories:** Horizontal · Vertical

**Exemplo (React, story `Horizontal`):**

```tsx
<ResizablePanelGroup direction="horizontal" className="h-52 max-w-xl rounded-lg border border-border">
  <ResizablePanel defaultSize={35}><Cell>Filtros</Cell></ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={65}><Cell>Lista de pedidos</Cell></ResizablePanel>
</ResizablePanelGroup>
```

### Scroll Area

`scroll-area` · exporta `ScrollArea`, `ScrollBar`

**Anatomia (elemento raiz → classes):**

- `ScrollArea` → `<ScrollAreaPrimitive.Root>` `relative overflow-hidden`
- `ScrollBar` → `<ScrollAreaPrimitive.ScrollAreaScrollbar>` `flex touch-none select-none transition-colors [orientation === "vertical": h-full w-2.5 border-l border-l-transparent p-[1px]] [orientation === "horizontal": h-2.5 flex-col border-t border-t-transparent p-[1px]]`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<ScrollArea className="h-56 w-64 rounded-md border border-border p-4">
  <h4 className="mb-3 text-sm font-semibold text-foreground">Categorias</h4>
  {Array.from({ length: 30 }, (_, i) => (
    <div key={i} className="border-b border-border py-2 text-sm text-foreground">Categoria {i + 1}</div>
  ))}
</ScrollArea>
```

### Select

`select` · exporta `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectScrollUpButton`, `SelectScrollDownButton`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`

**Anatomia (elemento raiz → classes):**

- `SelectTrigger` → `<SelectPrimitive.Trigger>` `flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`
- `SelectScrollUpButton` → `<SelectPrimitive.ScrollUpButton>` `flex cursor-default items-center justify-center py-1`
- `SelectScrollDownButton` → `<SelectPrimitive.ScrollDownButton>` `flex cursor-default items-center justify-center py-1`
- `SelectLabel` → `<SelectPrimitive.Label>` `py-1.5 pl-8 pr-2 text-sm font-semibold`
- `SelectItem` → `<SelectPrimitive.Item>` `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`
- `SelectSeparator` → `<SelectPrimitive.Separator>` `-mx-1 my-1 h-px bg-muted`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Select>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="Escolha a janela de entrega" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Hoje</SelectLabel>
      <SelectItem value="agora">Agora · ~15 min</SelectItem>
      <SelectItem value="15-16">15:00 – 16:00</SelectItem>
      <SelectItem value="16-17">16:00 – 17:00</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Amanhã</SelectLabel>
      <SelectItem value="08-09">08:00 – 09:00</SelectItem>
      <SelectItem value="09-10">09:00 – 10:00</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Separator

`separator` · exporta `Separator`

**Anatomia (elemento raiz → classes):**

- `Separator` → `<SeparatorPrimitive.Root>` `shrink-0 bg-border [orientation === "horizontal" ? h-px w-full : h-full w-px]`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<div className="max-w-sm">
  <div className="space-y-1">
    <h4 className="text-sm font-semibold text-foreground">Nemo Design System</h4>
    <p className="text-sm text-muted-foreground">Tokens da Daki, multiplataforma.</p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center gap-4 text-sm text-foreground">
    <span>Web</span>
    <Separator orientation="vertical" />
    <span>React Native</span>
    <Separator orientation="vertical" />
    <span>Flutter</span>
  </div>
</div>
```

### Sheet

`sheet` · exporta `Sheet`, `SheetTrigger`, `SheetClose`, `SheetPortal`, `SheetOverlay`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`

**Variantes (classes reais):**

- `sheetVariants` base: `fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500`
  - `side` (padrão `right`):
    - `top`: `inset-x-0 top-0 border-b border-border data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top`
    - `bottom`: `inset-x-0 bottom-0 border-t border-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom`
    - `left`: `inset-y-0 left-0 h-full w-3/4 border-r border-border data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm`
    - `right`: `inset-y-0 right-0 h-full w-3/4 border-l border-border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm`

**Anatomia (elemento raiz → classes):**

- `SheetOverlay` → `<SheetPrimitive.Overlay>` `fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`
- `SheetHeader` → `<div>` `flex flex-col space-y-2 text-center sm:text-left`
- `SheetFooter` → `<div>` `flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2`
- `SheetTitle` → `<SheetPrimitive.Title>` `text-lg font-semibold text-foreground`
- `SheetDescription` → `<SheetPrimitive.Description>` `text-sm text-muted-foreground`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Sheet>
  <SheetTrigger asChild><Button variant="outline">Abrir carrinho</Button></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Seu carrinho</SheetTitle>
      <SheetDescription>3 itens · entrega em ~15 min</SheetDescription>
    </SheetHeader>
    <div className="py-4 text-sm text-muted-foreground">Leite, pão de forma, café…</div>
    <SheetFooter>
      <Button>Finalizar pedido</Button>
      <SheetClose asChild><Button variant="outline">Continuar comprando</Button></SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Sidebar

`sidebar` · exporta `SidebarProvider`, `Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarInput`, `SidebarHeader`, `SidebarFooter`, `SidebarSeparator`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuBadge`, `SidebarMenuSkeleton`

**Variantes (classes reais):**

- `sidebarMenuButtonVariants` base: `peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0`
  - `variant` (padrão `default`):
    - `default`: `hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`
    - `outline`: `bg-background shadow-[0_0_0_1px_var(--nemo-color-border-neutral-main)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`
  - `size` (padrão `default`):
    - `default`: `h-8 text-sm`
    - `sm`: `h-7 text-xs`
    - `lg`: `h-12 text-sm group-data-[collapsible=icon]:!p-0`

**Anatomia (elemento raiz → classes):**

- `Sidebar` → `<div>` `flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground`
- `SidebarTrigger` → `<Button>` `h-7 w-7`
- `SidebarRail` → `<button>` `absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex`
- `SidebarInset` → `<main>` `relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow`
- `SidebarInput` → `<Input>` `h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring`
- `SidebarHeader` → `<div>` `flex flex-col gap-2 p-2`
- `SidebarFooter` → `<div>` `flex flex-col gap-2 p-2`
- `SidebarSeparator` → `<Separator>` `mx-2 w-auto bg-sidebar-border`
- `SidebarContent` → `<div>` `flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden`
- `SidebarGroup` → `<div>` `relative flex w-full min-w-0 flex-col p-2`
- `SidebarGroupLabel` → `<Comp>` `flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0`
- `SidebarGroupContent` → `<div>` `w-full text-sm`
- `SidebarMenu` → `<ul>` `flex w-full min-w-0 flex-col gap-1`
- `SidebarMenuItem` → `<li>` `group/menu-item relative`
- `SidebarMenuButton` → `<Comp>` `{sidebarMenuButtonVariants}`
- `SidebarMenuBadge` → `<div>` `pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 group-data-[collapsible=icon]:hidden`
- `SidebarMenuSkeleton` → `<div>` `flex h-8 items-center gap-2 rounded-md px-2`

**Props:**

- `SidebarContextProps`
  - `state: "expanded" | "collapsed"`
  - `open: boolean`
  - `setOpen: (open: boolean) => void`
  - `openMobile: boolean`
  - `setOpenMobile: (open: boolean) => void`
  - `isMobile: boolean`
  - `toggleSidebar: () => void`

**Stories:** AppShell

### Skeleton

`skeleton` · exporta `Skeleton`

**Anatomia (elemento raiz → classes):**

- `Skeleton` → `<div>` `animate-pulse rounded-md bg-muted`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<div className="flex items-center gap-4">
  <Skeleton className="h-11 w-11 rounded-full" />
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-4 w-32" />
  </div>
</div>
```

### Slider

`slider` · exporta `Slider`

**Anatomia (elemento raiz → classes):**

- `Slider` → `<SliderPrimitive.Root>` `relative flex w-full touch-none select-none items-center`

**Stories:** Default · Range

**Exemplo (React, story `Default`):**

```tsx
<Slider defaultValue={[40]} max={100} step={1} className="w-80" />
```

### Sonner (Toast)

`sonner` · exporta `TOAST_DURATION`, `Toaster`

Named duration levels — same vocabulary the Jake (Raio App/Flutter) toast already uses (short/medium/long/persistent), adopted as the Nemo-wide standard instead of loose ms values per call-site: one place to retune a level later, and the call-site reads as intent ("this is important, stays longer") instead of a magic number. `persistent` maps to sonner's own `Infinity` duration (never auto-dismisses).

**Anatomia (elemento raiz → classes):**

- `Toaster` → `<Sonner>` `toaster group` — Toaster — wraps `sonner`, themed with Nemo tokens. Reads light/dark from the `.dark` class on <html> (no next-themes dependency).

**Stories:** Default · Variants (Os 5 variants semânticos que o sonner suporta nativamente.) · WithAction (CTA embutido no toast (ex.: "Ver", "Desfazer").) · Dedupe (Clicar várias vezes atualiza o mesmo toast em vez de empilhar duplicado.)

**Exemplo (React, story `Default`):**

```tsx
<div>
  <Button onClick={() => toast("Pedido confirmado", { description: "Chega em ~15 min." })}>
    Notificar
  </Button>
  <Toaster />
</div>
```

### Spinner

`spinner` · exporta `Spinner`

Spinner — loading indicator (shadcn newer API), a spinning Loader icon.

**Anatomia (elemento raiz → classes):**

- `Spinner` → `<Loader2>` `size-4 animate-spin text-muted-foreground`

**Stories:** Sizes · InButton

**Exemplo (React, story `InButton`):**

```tsx
<Button disabled>
  <Spinner className="size-4 text-primary-foreground" />
  Processando…
</Button>
```

### Switch

`switch` · exporta `Switch`

Nemo Switch (Toggle) — shadcn/ui structure over Radix, Nemo tokens. On = bg-primary (mar azulão), off = bg-muted; thumb uses shadow-sm.

**Anatomia (elemento raiz → classes):**

- `Switch` → `<SwitchPrimitives.Root>` `peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted`

**Stories:** Default · Off · WithLabels

**Exemplo (React, story `WithLabels`):**

```tsx
<div className="flex flex-col gap-4">
  <label className="flex items-center gap-3">
    <Switch defaultChecked />
    <Text variant="bodySm">Notificações push</Text>
  </label>
  <label className="flex items-center gap-3">
    <Switch />
    <Text variant="bodySm">Modo econômico</Text>
  </label>
</div>
```

### Table

`table` · exporta `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

**Anatomia (elemento raiz → classes):**

- `Table` → `<div>` `relative w-full overflow-auto`
- `TableHeader` → `<thead>` `[&_tr]:border-b`
- `TableBody` → `<tbody>` `[&_tr:last-child]:border-0`
- `TableFooter` → `<tfoot>` `border-t bg-muted/50 font-medium [&>tr]:last:border-b-0`
- `TableRow` → `<tr>` `border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted`
- `TableHead` → `<th>` `h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0`
- `TableCell` → `<td>` `p-4 align-middle [&:has([role=checkbox])]:pr-0`
- `TableCaption` → `<caption>` `mt-4 text-sm text-muted-foreground`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Table>
  <TableCaption>Pedidos em rota</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Pedido</TableHead>
      <TableHead>Cliente</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">ETA</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((r) => (
      <TableRow key={r.id}>
        <TableCell className="font-medium">{r.id}</TableCell>
        <TableCell>{r.cliente}</TableCell>
        <TableCell>{r.status}</TableCell>
        <TableCell className="text-right">{r.eta}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Tabs

`tabs` · exporta `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

**Anatomia (elemento raiz → classes):**

- `TabsList` → `<TabsPrimitive.List>` `inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground`
- `TabsTrigger` → `<TabsPrimitive.Trigger>` `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm`
- `TabsContent` → `<TabsPrimitive.Content>` `mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<Tabs defaultValue="rota" className="w-96">
  <TabsList>
    <TabsTrigger value="rota">Em rota</TabsTrigger>
    <TabsTrigger value="preparo">Em preparo</TabsTrigger>
    <TabsTrigger value="entregues">Entregues</TabsTrigger>
  </TabsList>
  <TabsContent value="rota" className="text-sm text-muted-foreground">3 pedidos a caminho.</TabsContent>
  <TabsContent value="preparo" className="text-sm text-muted-foreground">5 pedidos sendo separados.</TabsContent>
  <TabsContent value="entregues" className="text-sm text-muted-foreground">128 entregues hoje.</TabsContent>
</Tabs>
```

### Textarea

`textarea` · exporta `Textarea`

**Anatomia (elemento raiz → classes):**

- `Textarea` → `<textarea>` `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`

**Stories:** Default · Disabled

**Exemplo (React, story `Default`):**

```tsx
<Textarea {...args} className="max-w-sm" />
```

### Toggle

`toggle` · exporta `Toggle`

**Variantes (classes reais):**

- `toggleVariants` base: `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`
  - `variant` (padrão `default`):
    - `default`: `bg-transparent`
    - `outline`: `border border-input bg-transparent hover:bg-accent hover:text-accent-foreground`
  - `size` (padrão `default`):
    - `default`: `h-10 px-3 min-w-10`
    - `sm`: `h-9 px-2.5 min-w-9`
    - `lg`: `h-11 px-5 min-w-11`

**Anatomia (elemento raiz → classes):**

- `Toggle` → `<TogglePrimitive.Root>` `{toggleVariants}`

**Stories:** Default · WithIcon

**Exemplo (React, story `WithIcon`):**

```tsx
<div className="flex gap-2">
  <Toggle aria-label="Negrito"><Bold /></Toggle>
  <Toggle aria-label="Itálico" variant="outline"><Italic /></Toggle>
</div>
```

### Toggle Group

`toggle-group` · exporta `ToggleGroup`, `ToggleGroupItem`

**Anatomia (elemento raiz → classes):**

- `ToggleGroup` → `<ToggleGroupPrimitive.Root>` `flex items-center justify-center gap-1`
- `ToggleGroupItem` → `<ToggleGroupPrimitive.Item>` `{toggleVariants}`

**Stories:** Single · Multiple

**Exemplo (React, story `Single`):**

```tsx
<ToggleGroup type="single" defaultValue="center" variant="outline">
  <ToggleGroupItem value="left" aria-label="Esquerda"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Centro"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Direita"><AlignRight /></ToggleGroupItem>
</ToggleGroup>
```

### Tooltip

`tooltip` · exporta `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`

**Stories:** Default

**Exemplo (React, story `Default`):**

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="outline">Passe o mouse</Button></TooltipTrigger>
    <TooltipContent>Entrega em ~15 min</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Text

`typography` · exporta `Text`

Nemo Text — the single text primitive. Every size/weight/tone is a token, so type stays consistent across the product (and mirrors RN/Flutter).

**Variantes (classes reais):**

- `textVariants` base: ``
  - `variant` (padrão `body`):
    - `display`: `font-display text-3xl font-bold leading-tight tracking-tight`
    - `h1`: `font-heading text-2xl font-medium leading-tight tracking-tight`
    - `h2`: `font-heading text-xl font-medium leading-tight`
    - `h3`: `font-heading text-lg font-medium leading-normal`
    - `body`: `text-md font-regular leading-normal`
    - `bodySm`: `text-sm font-regular leading-normal`
    - `label`: `text-sm font-medium leading-normal`
    - `caption`: `text-xs font-regular leading-normal`
  - `tone` (padrão `default`):
    - `default`: `text-foreground`
    - `secondary`: `text-muted-foreground`
    - `muted`: `text-muted-foreground`
    - `brand`: `text-primary`
    - `decorative`: `text-[color:var(--nemo-color-text-accent-primary)]`
    - `danger`: `text-destructive`
    - `success`: `text-success`
    - `onBrand`: `text-primary-foreground`

**Anatomia (elemento raiz → classes):**

- `Text` → `<Comp>` `{textVariants}`

**Props:**

- `TextProps` (estende `React.HTMLAttributes<HTMLElement>`, `VariantProps<typeof textVariants>`)
  - `as?: React.ElementType`
  - `asChild?: boolean`

**Stories:** Playground · Scale · Tones

**Exemplo (React, story `Scale`):**

```tsx
<div className="flex flex-col gap-3">
  {variants.map((v) => (
    <div key={v} className="flex items-baseline gap-4">
      <Text variant="caption" tone="muted" className="w-20 shrink-0">{v}</Text>
      <Text variant={v}>Entrega em minutos</Text>
    </div>
  ))}
</div>
```

## Ícones oficiais (icons-DakiApp)

Uso em HTML (com `nemo-icons.js`): `<i data-nemo-icon="<nome>" class="size-6"></i>`. Monocromáticos herdam `currentColor`; `delivery-statuses` e `payments` têm cor própria (a cor é o significado / é a marca).

- **address:** `address-home`, `address-office`, `address-other`
- **coupon-wallet:** `coupon`
- **delivery-statuses:** `delivery-status-claim-sent`, `delivery-status-paid-fail`, `delivery-status-paid-pending`, `delivery-status-paid-success`, `delivery-status-paid-warning`, `delivery-status-placed-fail`, `delivery-status-placed-pending`, `delivery-status-placed-success`, `delivery-status-placed-warning`
- **delivery:** `delivery-clock`, `delivery-rider`
- **general:** `3-dots`, `chevron-down`, `chevron-left`, `chevron-right`, `chevron-up`, `arrow-down`, `arrow-left`, `arrow-right`, `arrow-up`, `checkmark`, `close`, `info`, `location`, `minus`, `plus`, `refresh`, `share`
- **order:** `order-chat`
- **payments:** `payment-alelo`, `payment-amex`, `payment-apple-pay`, `payment-click-to-pay`, `payment-diners`, `payment-elo`, `payment-google-pay`, `payment-hipercard`, `payment-jcb`, `payment-maestro`, `payment-mastercard`, `payment-nupay`, `payment-pix`, `payment-pluxee`, `payment-sodexo`, `payment-ticket`, `payment-vr`, `payment-visa`, `payment-generic-card`
- **points:** `points1`, `points2`, `points3`
- **profile:** `profile-add-list`, `profile-settings`
- **tabbar:** `tabbar-search`, `tabbar-categories`, `tabbar-home`, `tabbar-menu`, `tabbar-orders`, `tabbar-plus`, `tabbar-bag`
- **toast-message:** `toast-attention`, `toast-error`, `toast-heavy-traffic`, `toast-high-demand`, `toast-no-internet`, `toast-severe-weather`, `toast-store-closed`, `toast-successful`
