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
  <script src="{{NEMO_JS_URL}}"></script>
  <!-- opcional: ícones oficiais da Daki (<i data-nemo-icon="...">) -->
  <script src="{{NEMO_ICONS_URL}}"></script>
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
