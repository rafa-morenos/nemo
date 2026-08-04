# Gaps entre código e Figma (Daki DS • 2026)

Registro central de achados de código feitos durante o trabalho de levar os
componentes de `packages/web/src/components/` pro Figma (skill
`nemo-figma-component`). Cada entrada é um desvio real entre o que o código
faz e o que "deveria" existir num design system maduro — não é uma lista de
tarefas do Figma, é uma lista de débitos/observações de código encontrados
no processo de desenhar fielmente.

> **Nota (2026-08-04):** este arquivo deveria existir desde o componente
> Accordion (a skill e a memória de progresso já citam "Accordion e
> AddToCartButton" como exemplos aqui), mas nunca tinha sido criado de fato —
> não há rastro dele no histórico do git nem em nenhum stash. As entradas de
> Accordion até Badge abaixo foram reconstruídas a partir dos achados já
> descritos em detalhe na memória `nemo-figma-push-progress` (que continha o
> conteúdo real, só não este arquivo central). Sinalizado pra usuária.

## Accordion
- CSS morta: nenhum tratamento visual de `focus` (usa o outline padrão do
  navegador) nem de `disabled` — o código só estiliza `normal`/`hover`/`open`.
  Decisão correta foi desenhar só os 3 estados reais, não inventar os outros
  dois pra "completar a tabela".
- Hover é só `hover:underline` no trigger — sem overlay de opacidade em fundo
  colorido, ao contrário do padrão geral documentado no `CLAUDE.md` pros
  outros componentes do Nemo.

## Add to Cart (AddToCartButton / CartCountBadge / FavoriteButton)
- Padding do stepper (`px`/`py` do contador) cai em valores fracionários do
  Tailwind que o preset Nemo não redefine — usa pixel cru em vez de token de
  espaçamento.

## Alert
- CSS morta nunca dispara nos stories reais: `[&>svg+div]:translate-y-[-3px]`
  e `[&_p]:leading-relaxed`.
- Biblioteca de texto do Figma só tem Bold/Regular em `Global/Body/*` — sem
  peso "Medium" pro `font-medium` do título do Alert.
- Fundo transparente do `variant="destructive"` é intencional (não é bug).
- Assimetria de opacidade de borda entre claro (50%) e escuro (100%) —
  resolvida com override de opacidade por instância, mesma variável de cor.

## Alert Dialog
- Overlay `bg-black/80` sem token — não existe primitivo preto/gray-0
  exposto como variável no Figma (confirmado por busca). Usado hex fixo.
- `shadow-lg` sem token Nemo (não existe escala de sombra em `core.json`),
  mas o Figma **já tem** Effect Styles prontos (`Elevation/Top/1`,
  `Elevation/Bottom/1`) nunca importados pro pipeline de tokens de código —
  task rastreável aberta (`task_ba1a2cc3`) pra promover isso a token real.
- `AlertDialogAction`/`Cancel` reusam `buttonVariants()` de `button.tsx`
  (ainda não portado pro Figma nessa fila) — construídos como placeholders
  simplificados.

## Aspect Ratio
- Sem gap de código real — componente é 100% wrapper do Radix, zero
  estilo próprio.

## Attachment
- `bg-info` usado permanentemente pra todo anexo (não é estado de erro/aviso,
  é a cor de base do chip) — registrado como pergunta de design pro time,
  não bug.
- Botão remover reusa `Button ghost/icon` (ainda não portado) — placeholder
  simplificado.
- Ponto positivo (não é gap): botão remover já tem `sr-only` ("Remove
  attachment") mesmo sendo icon-only — a11y correta já no código.

## Avatar
- Sem gap de código real — só uma limitação de tooling: `createImageAsync`
  não é suportado no sandbox do plugin, então o estado "Image" é
  representado por um placeholder de cor sólida, não a foto de verdade.

## Badge
- `color="disabled"` falha 4.5:1 em quase toda combinação (3.47–4.27:1
  claro, 4.07–7.45:1 escuro).
- `color="success" variant="solid"` só no modo claro fica abaixo de 4.5:1
  (4.37:1); o par equivalente no escuro passa com folga (13.3:1).
- `focus:ring-2` no `cva` base nunca dispara — `Badge` renderiza um `<div>`
  sem `tabIndex`/`role`, não é focável por padrão.
- Padding de `size` (`px-2.5`/`py-0.5` md, `gap-0.5`/`py-0.5` sm) cai em
  chaves fracionárias do Tailwind sem token Nemo equivalente — mesmo padrão
  do Add to Cart.

## Breadcrumb (2026-08-04)
- **Contraste de texto sistêmico (2ª ocorrência do mesmo par de token):**
  `text-muted-foreground` (`Text/Neutral/Tertiary`) sobre
  `Surface/Neutral/Primary` no modo claro mede **4.27:1** — abaixo do
  mínimo 4.5:1 pra texto normal (WCAG 2.0 1.4.3), o mesmo valor exato já
  encontrado no `outline`/`ghost` do Badge. Afeta `BreadcrumbLink` (estado
  normal, não-hover) e a cor herdada de `BreadcrumbSeparator`/
  `BreadcrumbEllipsis`. Ainda passa o mínimo de 3:1 pra elementos gráficos
  de UI. Como já é a 2ª vez que o mesmo par de token falha o mesmo teste em
  componentes diferentes, isso parece ser um problema do **valor do token**
  (`Text/Neutral/Tertiary` no modo claro), não um acidente pontual por
  componente — vale revisar o tom de cinza na origem em vez de corrigir
  caso a caso.
- Espaçamento fora da escala Nemo: `gap-1.5` (6px, base) e `sm:gap-2.5`
  (10px, breakpoint responsivo) do `BreadcrumbList`/`BreadcrumbItem`, e a
  caixa fixa de 36×36px (`h-9 w-9`) do `BreadcrumbEllipsis` — nenhum desses
  valores cai na escala `spacing-*` do Nemo (0/2/4/8/12/16/20/24/32/40...).
  Mesmo padrão de "valor fracionário do Tailwind sem token" já visto no
  Add to Cart e no Badge.
- `BreadcrumbEllipsis` é só a peça visual — o código não tem nenhuma lógica
  de colapso automático de itens (decidir quando mostrar "..." é
  responsabilidade de quem consome o componente, não do componente em si).
  Não é um bug, mas vale deixar explícito pra quem for usar.
- Ponto positivo (não é gap): `BreadcrumbEllipsis` já tem `sr-only` ("More")
  mesmo sendo só um ícone decorativo — a11y correta já no código, mesmo
  padrão do Attachment.

## Bubble (2026-08-04)
- `rounded-2xl` **não está de fato vinculado a nenhum token** —
  `tailwind.preset.js` só redefine `borderRadius` pra `sm`/`md`/`lg`/`xl`/
  `full`; `2xl` não está na lista, então cai no valor padrão do próprio
  Tailwind (1rem/16px) em vez de ler `radius-lg` do Nemo. Hoje os dois
  valores coincidem (16px), mas o código não está de fato lendo o token —
  se `radius-lg` mudar de valor no futuro, o Bubble não acompanha.
- **Gap de acessibilidade real:** não existe nenhum `aria-live`/
  `role="log"` na conversa — leitor de tela não é avisado quando uma nova
  mensagem chega. O componente também não expõe `role`/rótulo indicando
  quem enviou cada mensagem além da posição visual (esquerda/direita) e da
  cor.
- Não é um componente shadcn canônico (comentário no próprio código:
  "Interpretation — not a canonical shadcn component") — interpretação
  própria do Nemo pra UI de chat.
- Ponto positivo (não é gap): as combinações de cor texto/fundo (usuário e
  assistente, claro e escuro) passam confortavelmente os mínimos de
  contraste WCAG — o pior caso (branco sobre `interactive-accent-primary-
  main` no claro) ainda mede 4.7:1, acima do mínimo de 4.5:1.

## Button (2026-08-04)
- **Alturas `sm`/`lg` fora da escala de espaçamento do Nemo:** `h-9` (36px)
  e `h-11` (44px) não são redefinidos pelo preset Tailwind (`spacing` só
  cobre as chaves 0,1,2,3,4,5,6,8,10,12,16) — caem no valor padrão bruto do
  próprio Tailwind, sem vínculo com nenhum token Nemo. Só `md`/`icon`
  (`h-10`, 40px) coincidem por acaso com `spacing-250` (mesmo padrão já visto
  no Avatar).
- **Contraste de UI real, achado interessante:** a borda do `variant=
  "outline"` (`border-neutral-main` sobre o fundo da página) mede só
  **1.23:1 no claro / 2.66:1 no escuro** — bem abaixo do mínimo de 3:1 pra
  elementos gráficos de UI (WCAG 2.1 1.4.11). O botão continua legível
  (o texto interno passa contraste normalmente), mas o contorno em si é
  quase imperceptível pra quem tem baixa visão ou está escaneando a página
  procurando elementos clicáveis antes de ler o texto.
- **Contraste de texto, achado bem apertado:** a cor de texto do
  `variant="link"` (reaproveita `interactive-accent-primary-main`, o mesmo
  azul do fundo do `default`) sobre o fundo da página mede **4.47:1** no
  claro — fica por muito pouco (0.03) abaixo do mínimo 4.5:1 pra texto
  normal. No escuro passa com folga (10.07:1).
- `font-medium` (peso 500) não existe como estilo de texto formal na
  biblioteca do Figma (só Bold/Regular em `Global/Body/*`, mesmo achado já
  registrado no Alert) — usado Inter Medium direto (sem vínculo de estilo
  nomeado) em vez de inventar um token.
- `text-primary` do `variant="link"` reaproveita a MESMA variável de cor
  usada como fundo do `variant="default"` (`Interactive/Accent/Primary/
  Main`) — o escopo dessa variável no Figma é `FRAME_FILL`/`SHAPE_FILL`/
  `STROKE`, sem `TEXT_FILL` — bind funcionou via API mesmo assim, mas o
  Figma não ofereceria essa variável no seletor de cor de texto pela UI.
  Pequena inconsistência de escopo, não um bug funcional.
- Ponto positivo (não é gap): `asChild` (Slot do Radix) permite trocar o
  `<button>` nativo por qualquer elemento (ex. um link `<a>`) mantendo o
  mesmo visual; `disabled` é o atributo HTML real (não só estilo visual);
  o anel de foco (`ring-2 ring-ring ring-offset-2`) só aparece navegando
  por teclado (`:focus-visible`), não ao clicar com o mouse — comportamento
  correto de acessibilidade, não um gap.
