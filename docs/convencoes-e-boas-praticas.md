# Convenções e Boas Práticas — Nemo

> Este é o guia de convenções **definitivo** do Nemo — o contrato a seguir ao criar ou revisar qualquer componente. Ele fecha a maior parte das tensões e perguntas que ficaram em aberto durante o levantamento de convenções do design system, documentado em [`nemo-comparativo-convencoes.md`](./nemo-comparativo-convencoes.md) (histórico/rationale, não precisa ser lido para aplicar este guia).
>
> Cada decisão abaixo cita a evidência que a sustenta — código já existente no repo ou princípio já protegido pelo `CLAUDE.md` — não são escolhas arbitrárias. Onde o código atual diverge da decisão, isso está registrado em [`debitos-tecnicos.md`](./debitos-tecnicos.md), não escondido. Perguntas que exigem alinhamento com o time antes de virarem contrato (não decidíveis só a partir do código) ficam em [`perguntas-em-aberto.md`](./perguntas-em-aberto.md).

## Índice

1. [Princípios norteadores](#1-princípios-norteadores)
2. [Arquitetura e estrutura](#2-arquitetura-e-estrutura)
3. [Nomenclatura](#3-nomenclatura)
4. [Contrato de Props / API](#4-contrato-de-props--api)
5. [Estados do componente](#5-estados-do-componente)
6. [Tokens](#6-tokens)
7. [Ícones](#7-ícones)
8. [Testes](#8-testes)
9. [Storybook / Documentação](#9-storybook--documentação)
10. [Versionamento e publicação](#10-versionamento-e-publicação)
11. [Lint, Commits e CI](#11-lint-commits-e-ci)
12. [Acessibilidade](#12-acessibilidade)
13. [Componente de referência](#13-componente-de-referência)
14. [Registro de decisões](#14-registro-de-decisões)

---

## 1. Princípios norteadores

Princípios que orientam qualquer decisão de API não coberta explicitamente nos demais itens deste guia:

- **Paridade semântica entre plataformas, não paridade sintática.** Cada plataforma segue sua convenção nativa de callback (`onClick`/`onPress`/`onTap`), mas os **conceitos e valores possíveis** (variant, size, estado) são idênticos entre plataformas.
- **Tokens sempre semânticos, nunca a paleta bruta.** Componentes consomem `bg-primary`, `text-destructive-soft-foreground` etc. — nunca `blue-95`/`red-500` direto.
- **Não se acoplar a decisões de produto.** O componente expõe dados crus e callbacks, nunca importa lib de terceiros escolhida por um time de produto (ex.: lib de formulário).
- **Evitar nomes de palavra reservada/atributo nativo** em props e valores de enum entre TypeScript/Dart (`type`, `style`, `state`) — ver decisão da prop `type` do Badge em §3.3/§14. Esse princípio **prevalece sobre manter o shadcn canônico** quando os dois colidem: o vocabulário de estado/variante precisa ser o mesmo nas 3 plataformas e válido em todas ao mesmo tempo, mesmo que isso signifique divergir da convenção que o shadcn usa internamente (ver §3.3a).
- **Contrato rígido em componente atômico, composição livre só em componente composto.** O Nemo é um DS fechado que os produtos da Daki consomem direto — não uma base tipo Material/Chakra/Radix para outros times construírem seu próprio DS por cima. Por isso a flexibilidade de `children` não é tratada como regra única: depende do tipo de componente (ver §4.3).
- **Fonte de tokens é 100% o export do Figma — nunca inventar token.** Onde falta um role no Alias (ex.: "On Critical", "Surface-decorative-600"), documentar o gap e usar o alias real mais próximo, nunca um hex hardcoded (ver `CLAUDE.md`, itens 6/7 do backlog, e precedentes em `badge.tsx`/`button.tsx`/`navigation-bar.tsx`).
- **Acessibilidade é parte do "pronto", não uma revisão avulsa.** Contraste WCAG calculado (não estimado), foco visível testado via Tab real, semântica aria/sr-only — ver §12.

## 2. Arquitetura e estrutura

Estrutura real e válida do repo:

```
tokens/            # fonte DTCG (core + semantic.light/dark) — só o Figma escreve aqui
build/             # Style Dictionary → build/{web,ts,rn,flutter}
packages/web           # Storybook + shadcn/ui + tailwind preset
packages/react-native   # espelho RN
packages/flutter        # espelho Flutter
preview/            # Artifact estático
```

Um monorepo mais elaborado (pacotes próprios de config/lint/tsconfig/tailwind-config, apps de exemplo separados) e uma arquitetura de tokens em duas camadas (fundação + semântico-por-componente dentro da própria lib) não fazem sentido no estágio atual do Nemo — o pipeline Figma → Style Dictionary → Alias já cobre isso de forma mais enxuta (ver §6).

Dentro de cada componente, a regra é: **não force a mesma estrutura de arquivo entre plataformas, force a mesma cobertura** (tipos, teste, story, doc). Hoje isso é:

- **Web:** `.tsx` plano com `cva` + `VariantProps` inline (`button.tsx`, `badge.tsx`), ou pasta quando há subcomponentes (`kanban-card/`, `product-card/`). Sem arquivos `.types.ts`/`.variants.ts` separados — tipos e variantes vivem no próprio arquivo do componente (ver §14).
- **React Native:** espelha a mesma superfície de props do web, um arquivo por componente (`Badge.tsx`, `KanbanCard.tsx`), consumindo `build/rn/theme.{light,dark}.ts`.
- **Flutter:** um arquivo por componente em `lib/`, consumindo `NemoTokens`/`NemoTheme` gerados. Testes do Flutter ficam fora de `lib/`, em `test/` espelhado — convenção nativa do ecossistema Dart.

### 2.1 Wrapper de contrato para componentes shadcn com vocabulário divergente

**Decisão:** quando um componente vendored do shadcn (copiado via `npx shadcn add <componente>`) usa um nome que colide com uma decisão de nomenclatura do Nemo (ex.: `variant: "default"` vs. `normal`, decidido em §3.3a), o arquivo vendored permanece **exatamente como o CLI gera** — sem editar o valor internamente — e uma camada fina de contrato (o próprio componente exportado, na fronteira pública) traduz o nome do Nemo para o nome que o shadcn espera antes de repassar pro primitivo (`<Button variant="normal">` → internamente vira `variant="default"` pro `buttonVariants`).

Isso resolve dois problemas ao mesmo tempo: (1) a API pública que os produtos da Daki consomem nunca expõe `"default"`, não importa o que o shadcn faça internamente; (2) o arquivo vendored nunca precisa de reconciliação manual se alguém rodar o CLI de novo — o mapeamento `normal ↔ default` só quebraria se o próprio shadcn renomeasse sua convenção interna de variante, o que seria uma mudança rara e estrutural do próprio shadcn, não um evento rotineiro.

Esse mesmo mecanismo é onde uma customização de contrato (como a restrição de `children`/prop `icon` do `Button`, ver §4.3) deve viver — a fronteira pública, não o arquivo vendored puro — pelo mesmo motivo: manter o arquivo copiado do CLI o mais próximo possível do que `npx shadcn add` geraria "puro", isolando toda decisão específica do Nemo numa camada que o CLI nunca sobrescreve. **Ação:** aplicar esse padrão ao migrar os componentes shadcn afetados pela decisão §3.3a (ver `debitos-tecnicos.md`), e adotá-lo como passo padrão sempre que um componente shadcn novo for adicionado com um eixo que colida com uma decisão já fechada deste guia.

## 3. Nomenclatura

### 3.1 Nome do componente e prefixo

**Decisão:** prefixo obrigatório **só no Flutter**. Web e React Native seguem sem prefixo.

- **Web/RN:** nome público sem prefixo (`Button`, `Badge`, `KanbanCard`), com `displayName` prefixado (`Nemo.Button` ou equivalente) para depuração via DevTools quando aplicável.
- **Flutter:** prefixo `Nemo` embutido no nome de **toda** classe pública, sem exceção (`NemoButton`, `NemoBadge`, `NemoKanbanCard`, `NemoProductCard`, `NemoTaskItem`).

Por quê essa assimetria (e por que ela não é arbitrária): `package:flutter/material.dart` já exporta widgets chamados `Card` e `Badge`. Um `KanbanCard`/`ProductCard`/`TaskItem` sem prefixo não colide hoje, mas a regra precisa ser previsível — "prefixo em alguns widgets, não em outros" é exatamente o problema que o próprio Nemo já tem (`NemoBadge`/`NemoTokens` prefixados, `KanbanCard`/`ProductCard*`/`TaskItem` não, ver `CLAUDE.md` → Paridade de plataforma). React e React Native não têm esse risco de colisão (namespace de import/pacote já resolve isso), então lá o padrão shadcn (sem prefixo + `displayName`) se mantém. Aplicar essa regra retroativamente é trabalho pendente — ver §14.

### 3.2 Props booleanas

**Decisão: não adotar um prefixo `is` obrigatório.** Nomeie o booleano com a convenção nativa da plataforma/framework.

O próprio código shadcn upstream que o Nemo mantém canônico (`CLAUDE.md`: "manter o source shadcn canônico") já é inconsistente nesse ponto — `disabled`, `loading`, `dot`, `active`, `checked`, `open`, `unavailable`, `asChild` (sem prefixo) convivem com `isActive`/`isMobile` (com prefixo, herdados de componentes shadcn como sidebar/pagination). Impor `is` obrigatório significaria reescrever primitivos shadcn que o `CLAUDE.md` explicitamente protege de alteração. Regra prática:

- Atributo nativo da plataforma já define o nome (`disabled` no HTML) → use o nome nativo.
- Prop nova, sem análogo nativo → escolha o nome que ler melhor em português/inglês técnico (`loading`, `dot`, `unavailable` já seguem isso); `is`-prefix é aceitável quando o componente específico já nasceu assim (`isActive`), mas não é obrigatório.

### 3.3 Enums / valores fechados

Três decisões fecham a maior tensão real de nomenclatura no repo hoje:

**a) Nome do estado "padrão": `normal`, em todo componente e em todas as plataformas — inclusive sobrescrevendo o que vem do shadcn.**

`default` não é utilizável como identificador em Dart — é palavra reservada da linguagem (usada em `switch`/`case`), então `enum KanbanUrgency { default, waning, critical }` nem compila (confirmado rodando `dart analyze`: `'default' can't be used as an identifier because it's a keyword`). Isso por si só já eliminaria `default` como candidato a vocabulário único entre plataformas — mas o motivo de decidir um nome único (em vez de deixar cada plataforma resolver o problema à sua maneira) é a evidência de que "cada uma resolve do seu jeito" já aconteceu e já gerou inconsistência real: hoje o próprio Flutter tem **duas grafias diferentes** para o mesmo conceito — `KanbanUrgency.normal`/`AssignTone.normal` (`kanban_card.dart`) e `NemoBadgeColor.defaultColor` (`nemo_badge.dart`, um sufixo `Color` inventado só pra escapar da palavra reservada). Isso é exatamente o tipo de "contrato decidido caso a caso, nunca unificado" que este guia existe para evitar (§1). `normal` venceu sobre outras alternativas por já ser, na prática, o valor com menor custo de migração — é exatamente o que `KanbanUrgency`/`AssignTone` já usam no Flutter hoje, então essa parte não muda nada.

Alinhar o **contrato** — o nome do estado deve ser um só, válido em toda plataforma ao mesmo tempo — significa sobrescrever a convenção que o shadcn usa internamente (`variant: "default"`, `size: "default"`) nos primitivos que o Nemo copiou do CLI. Isso é uma exceção deliberada ao princípio de "manter o shadcn canônico" (§2/§3.2), não um descaso com ele: a forma de aplicar essa exceção sem pagar custo de manutenção contínua é o **wrapper de contrato** (§2.1) — o arquivo vendored nunca é editado, uma camada fina traduz `normal` (público) ↔ `default` (interno do shadcn), e resincronizar via `npx shadcn add` no futuro não exige reconciliação nenhuma.

**Ação (ver `debitos-tecnicos.md` para a lista completa de arquivos):**
- **Web** — expor `normal` como valor público de `variant`/`size`/`color`/`tone` via wrapper de contrato (§2.1) nos primitivos shadcn (`button.tsx`, `alert.tsx`, `toggle.tsx`, `toggle-group.tsx`, `sidebar.tsx`, `item.tsx`, `empty.tsx`) e trocar `"default"` diretamente nos componentes bespoke, que não têm arquivo vendored pra proteger (`badge.tsx`'s `color`, `kanban-card.tsx`'s `Tone`/`KanbanUrgency`, `typography.tsx`'s `tone`).
- **RN** — mesma troca direta nos tipos espelhados (`Badge.tsx`'s `BadgeColor`, `KanbanCard.tsx`'s `KanbanUrgency`/`Tone`) — RN não usa o CLI do shadcn, então não tem arquivo vendored a proteger.
- **Flutter** — `KanbanUrgency.normal`/`AssignTone.normal` já estão corretos, nenhuma mudança necessária; só `NemoBadgeColor.defaultColor` → `.normal`.

**b) `critical`, não `danger`/`negative`.** `Badge`'s `color="critical"` já segue o nome real do token (`icon-semantic-critical`, Figma "Critical"), mas `KanbanCard`'s `Tone` (web e RN) usa `"danger"`, e o Flutter `AssignTone` também usa `.danger`. **Ação:** padronizar em `critical` nos três lugares (ver §14) — alinhado ao nome real do token, não uma preferência nova.

**c) Prop `type` do Badge → `variant`.** `type` do Badge (`filled`/`outline`/`ghost`/`solid`) colide com o atributo HTML `type` (usado em `<button>`, `<input>`) — o tipo de colisão de nome nativo que este guia pede para evitar (§1/§3.3). O nome de destino é `variant` — não `style` (colide com o atributo `style` do React/DOM, um risco pior que o que estamos corrigindo) nem `appearance` (sem precedente no Nemo). `variant` já é o nome usado pelo `Button` para o eixo equivalente (`buttonVariants.variants.variant` = `normal`/`secondary`/`outline`/`ghost`/`destructive`/`link` na API pública, após o wrapper de contrato da decisão (a) acima) — reaproveitar o mesmo nome para o eixo de tratamento visual do `Badge` mantém o vocabulário consistente entre os dois componentes mais próximos. **Ação:** renomear `BadgeProps.type`/`BadgeType` (web/RN) e o equivalente Flutter para `variant`/`BadgeVariant` (ver §14) — breaking change de API, escopo próprio.

Convenção de declaração de enum:

- **React (Web/RN):** união de string-literals + `cva`/`VariantProps` — é o idiom já em uso em todo componente real do repo.
- **Flutter:** `enum` nomeado do Dart, dentro do próprio arquivo do widget (arquivo único por componente, ver §2).

Os eixos de variação (quais existem e com quais valores) devem ser definidos **uma vez** antes de implementar em mais de uma plataforma, e mantidos idênticos entre elas — hoje isso já está OK (`KanbanCard`'s `Tone` tem 5 valores em web/RN e `AssignTone` do Flutter tem os mesmos 5), mas é disciplina a manter em todo componente futuro.

### 3.4 Callbacks e eventos

`onClick` (Web), `onPress` (RN), `onTap` (Flutter) — nomes nativos por plataforma, conceito idêntico. Nenhum componente Nemo hoje precisa de múltiplos callbacks para um único gesto (ex.: um long-press com callback de confirmação e de cancelamento) — se isso surgir, prefira um callback por estado a um único callback com parâmetro de status.

### 3.5 Tokens

Ver §6 para a arquitetura de tokens do Nemo. Regra de nomenclatura: nome do token alinhado ao papel/produto, não ao nome de marketing da marca (o próprio Alias já segue isso: `surface/accent/primary`, não "Daki Blue").

## 4. Contrato de Props / API

### 4.1 Processo de definição do contrato

Antes de implementar, esboce (mesmo que informal, num PR draft ou na conversa) nome, anatomia, props com tipo/enum/default, estados suportados e comportamentos especiais. O processo real do Nemo já faz isso implicitamente ao mapear o node do Figma antes de portar (ver `ProductCard`, `NavigationBar` no `CLAUDE.md`).

### 4.2 Tipagem por plataforma

Já é a prática real:

- **Web:** intersection com atributos HTML nativos + `VariantProps` (`ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>`).
- **React Native:** reaproveita tipos nativos do RN (`PressableProps` etc.), documentando diferença de plataforma inline quando necessário.
- **Flutter:** classe imutável, construtor `const`, campos `final` com default no construtor.

### 4.3 `children` vs. `label`

**Decisão: depende do tipo de componente — não é uma regra única para todo o Nemo.**

- **Componente atômico com envelope visual fixo** (`Button`, `Badge`, e qualquer componente equivalente futuro): **contrato restrito**. `children` deve aceitar só texto (ou um tipo que não permita árvore de elementos arbitrária), e qualquer conteúdo extra (ícone, contador) vai numa prop própria — como o `Badge` já faz com `icon?: React.ReactNode` separado do `children` de texto. Esses componentes têm um envelope visual (padding, altura, cor, hover) que o Nemo precisa garantir intacto em qualquer instância nos 5 produtos da Daki — permitir `children: ReactNode` livre aqui (como o `Button` faz hoje, sem nenhum slot de ícone dedicado) deixa a consistência visual depender de disciplina de code review, não do próprio componente. Diferente de bases como Material/Chakra/Radix — feitas para servirem de fundação a quem vai construir seu próprio DS por cima — o Nemo é o DS final que os produtos consomem direto, então essa flexibilidade não tem a mesma justificativa aqui.
- **Componente composto/de layout** (família `ProductCard*`, e futuros equivalentes como uma família `Kanban*`): `children` continua sendo o mecanismo certo, mas por um motivo diferente — o que passa por `children` é composição de **outros componentes do próprio Nemo** (`ProductCardTitle`, `ProductCardMedia` etc. via `data-slot`), não markup arbitrário externo. O vocabulário já é fechado, então o risco de quebra visual é muito menor do que num componente atômico.

Isso reverte parte da leitura anterior desta decisão, que tratava "children livre" como padrão único só porque é o que `Button`/`Badge` já fazem hoje — evidência **descritiva** (o que o código faz), não **normativa** (o que serve o propósito de um DS fechado). Checando componente a componente, `Button` é hoje o caso concreto que não segue a regra correta: aceita `children: ReactNode` sem nenhuma restrição via `...props` do `ButtonHTMLAttributes`, e ainda expõe `asChild` (Radix `Slot`), que troca o elemento renderizado por inteiro — o verdadeiro maior escape hatch, maior que o próprio `children`. `Toggle` tem exatamente o mesmo formato (`TogglePrimitive.Root` + `children` livre, sem slot de ícone), embora seja um primitivo shadcn genérico, não um componente bespoke como o `Button` — prioridade menor, a confirmar com o time. Os demais componentes bespoke já seguem a regra corretamente (`MenuItem`/`MenuShortcutItem`/`NavigationBarItem` usam `icon`/`label` como props dedicadas; `AddToCartButton`/`FavoriteButton`/`ProductTile` nem expõem `children`). Ajustar `Button`/`Toggle` é trabalho de código, não deste documento — ver débitos em `debitos-tecnicos.md`.

### 4.4 Prop de ícone

**Decisão: `icon?: ReactNode` (Web/RN) / `Widget?` (Flutter) — conteúdo livre, não um objeto estruturado (`{ data: IconData, colorFill?: boolean }`).**

Já é o padrão real e consistente nas três plataformas onde ícone existe (`badge.tsx`: `icon?: React.ReactNode`; RN `Badge.tsx`: idêntico). O modelo estruturado nunca foi necessário porque o Nemo já resolve cor via `currentColor` (ver §7) — não há necessidade de um objeto com modificador de cor separado.

Essa decisão é só sobre a **forma** da prop (conteúdo livre vs. objeto estruturado) — não é o mesmo que garantir de onde o conteúdo vem. Hoje não existe nenhuma trava de código que restrinja `icon` ao acervo curado (`icons-DakiApp`, §7): o tipo é `ReactNode` puro, então nada impede passar um ícone fora da curadoria. Se vale a pena investir em algum enforcement pra isso é uma pergunta em aberto, registrada em [`perguntas-em-aberto.md`](./perguntas-em-aberto.md#1-enforcement-de-ícones-fora-da-curadoria) — não uma decisão deste documento.

### 4.5 Dependências de build (peer vs. bundled)

**Decisão, já refletida no `package.json` do `packages/web`:** frameworks de runtime que o consumidor já traz (`react`, `react-dom`) são `peerDependencies`; utilitários de build usados internamente pelo componente (`class-variance-authority`, `tailwind-merge`, Radix primitives) são `dependencies` normais (bundled). O critério é "o consumidor precisa controlar a versão disso?" — já aplicado. Não se aplica a Flutter (o ecossistema `pub` não tem o conceito de peer dependency da forma que npm tem).

### 4.6 Máscara/validação de input

Não aplicável hoje — o Nemo ainda não tem um componente de input/máscara implementado. Quando existir: `mask`/`valid` como função/callback (não enum fechado), expondo dado cru e dado mascarado, `maxLength` (não `maxChars`).

## 5. Estados do componente

| Estado | Observação |
|---|---|
| `normal` | Estado padrão em todas as plataformas (nome decidido em §3.3a — sobrescreve inclusive a convenção `default` do shadcn, via wrapper de contrato §2.1) |
| `hover` | — |
| `active` | — |
| `focus` | Foco visível testado com Tab real, não clique (ver §12) |
| `disabled` | — |
| `loading` | Assume estilo visual de `disabled`, não mantém cor da variant |
| `success`/`warning`/`critical` | Feedback semântico — nomes alinhados ao token (§3.3b) |
| `unavailable` | Já em uso real (`ProductTile`) — imagem com opacidade + tag + ação desabilitada |

Regras práticas sem contra-evidência no Nemo hoje: hover em fundo colorido via sobreposição de opacidade (não clarear/escurecer a cor); overflow de texto prefere quebra de linha a reticências no mobile; não inflar o contrato com casos hiperespecíficos (reaproveitar slot de ícone/badge existente em vez de criar prop dedicada).

## 6. Tokens

A arquitetura de tokens do Nemo é Material-3 em camadas (primitivos → Color Palette → Alias), 100% gerada do Figma via Style Dictionary (ver `CLAUDE.md` → "Como os tokens funcionam") — sem uma camada de "semântico de componente" hand-authored dentro da lib. O que faltava fechar:

**Decisão: tokens `interactive-*` são reservados para superfície/borda/estado de interação (background, borda, ring) — nunca para cor de texto.** Cor de texto usa sempre a família `text-*` (`text-accent-foreground`, `text-neutral-primary` etc.), mesmo dentro de um componente interativo como botão/link. A própria estrutura do Alias já separa os grupos por papel (`surface/text/border/icon/interactive/background`, ver `CLAUDE.md`) — usar `interactive-*` para texto quebraria essa separação estrutural, não é só estilo. Nenhum componente Nemo hoje usa `interactive-*` em texto (confirmado: `button.tsx`'s variant `link` usa `text-primary`, não um token `interactive-*`).

Risco real e vivo no Nemo (não decisão, débito a monitorar):

- **Baseline/line-height entre plataformas** — o drift de 18px vs. 20px (título/stepper do `ProductCard` em RN/Flutter vs. `text-lg` no web) já aconteceu uma vez e foi corrigido subindo RN/Flutter, não descendo o web (web é fonte da verdade). Testar alinhamento vertical de texto nas 3 plataformas antes de dar componente novo como pronto continua obrigatório.

## 7. Ícones

**Decisão: biblioteca curada e fechada (`icons-DakiApp`), não um `iconBuilder` flexível.** Já resolvida e implementada (72 ícones no web, `currentColor` tema-ável). O que faltava decidir:

- **Rebranding futuro:** reexportar do Figma seguindo o mesmo processo já validado (curar o subconjunto realmente usado, 24px, `currentColor` onde monocromático) — repetir o pipeline de importação que já existe. Ícones de marca (bandeiras de pagamento) seguem a cor real do Figma, nunca `currentColor` (já documentado em `payments.tsx`).
- **Ícone de mostrar/ocultar senha:** adiado — o Nemo ainda não tem um componente de input de senha. Quando existir, considerar primeiro texto ("mostrar"/"ocultar") em vez de ícone de olho (que tende a gerar ambiguidade visual), avaliado contra o espaço disponível no layout real do input.

Débito real (não decisão): RN tem só 7 ícones ad-hoc (`icons.tsx`), Flutter nenhum — portar o acervo curado é trabalho pendente (§14).

## 8. Testes

**Decisão: adotar cobertura automatizada como critério de "pronto" a partir de agora**, revertendo o estado atual (zero testes nas 3 plataformas).

- **Web/RN:** Jest + Testing Library, `*.spec.tsx` ao lado do componente. Priorizar testes via papel/acessibilidade (`getByRole`, `toBeDisabled()`) a snapshot testing.
- **Flutter:** `flutter_test`, árvore espelhada em `test/` (fora de `lib/`).
- Aplicar retroativamente aos componentes já existentes é trabalho de backlog (§14), não bloqueia esta decisão de política — mas todo componente **novo** a partir de agora precisa de teste antes de ser considerado pronto.

## 9. Storybook / Documentação

- Mantido: `Components/<Nome>` + `tags: ['autodocs']` + descrições em pt-BR.
- **Decisão: toda lib de componente deve ter uma story `Playground`** com todos os controles habilitados — hoje existe em só 1 componente; adotar como padrão daqui pra frente e retrofitar os demais (§14).
- **Decisão: `.md` por componente + índice central.** Estrutura: Visão Geral → Como Usar → Props → Exemplos → Boas Práticas → Componentes Relacionados, mais um `components/README.md` com tabela Componente × Plataforma. A tabela de Paridade do `CLAUDE.md` já é o embrião desse índice — vira a base do `components/README.md` quando for criado, não um documento do zero.

## 10. Versionamento e publicação

O Nemo é `private`, versão única `0.1.0`, sem publicação real ainda — uma esteira de release elaborada (SemVer rígido por pacote + estágios alpha/beta/latest + publish manual por um time dedicado) é prematura enquanto isso não muda. Quando publicação real começar a ser necessária, adotar SemVer básico (minor = feature/token novo, patch = fix, major = breaking change) com changelog gerado de Conventional Commits — sem estágios de release nem ritual de múltiplos aprovadores, que seguem prematuros até haver múltiplos consumidores externos ao próprio monorepo.

## 11. Lint, Commits e CI

Ferramental hoje: **zero** (sem husky/commitlint/prettier/eslint/editorconfig/CI/PR-template). Commits já seguem Conventional Commits na prática, sem hook que valide.

**Decisão: adotar o ferramental básico, não uma governança pesada** (múltiplos aprovadores obrigatórios, CODEOWNERS, CI filtrado por Turborepo — prematuro no estágio atual). O básico abaixo faz sentido e é baixo custo:

- Prettier + EditorConfig (LF, UTF-8, indentação consistente).
- ESLint básico por plataforma (sem preset elaborado — começar mínimo).
- Hook de commit-msg validando Conventional Commits (commitlint).
- CI mínima: `build:tokens` + typecheck + `build-storybook` em todo PR.
- Template de PR pedindo o que já é prática real hoje (ver `conv-create-pr`): descrição em pt-BR, testes (quando existirem, ver §8), Storybook verificado light/dark.

## 12. Acessibilidade

Acessibilidade é parte do processo, não uma revisão avulsa (ver `CLAUDE.md`, item 6 da convenção de componente novo): contraste WCAG calculado de verdade (não estimado), foco visível testado com Tab real (não clique), semântica aria/`sr-only`, e qualquer desvio de cor/valor do Figma por acessibilidade documentado no topo do arquivo do componente com a razão de contraste real.

## 13. Componente de referência

O **Button** é a régua de cobertura completa no Nemo — variantes + tipos + testes + stories nas 3 plataformas é o nível de maturidade que qualquer componente novo deve buscar antes de ser considerado "pronto".

## 14. Registro de decisões

| # | Pergunta que estava em aberto | Decisão | Onde |
|---|---|---|---|
| 1 | `children` livre vs. `label` estrito | Depende do tipo de componente: contrato restrito em atômico (`Button`/`Badge`), `children`/slot livre em composto (`ProductCard*`) | §4.3 |
| 2 | Modelo da prop de ícone | `ReactNode`/`Widget` livre, sem objeto estruturado | §4.4 |
| 3 | Ícones: curado vs. `iconBuilder` flexível | Curado e fechado (já implementado) | §7 |
| 4 | Ícones de rebranding futuro | Repetir o pipeline de importação já validado | §7 |
| 5 | Ícone vs. texto para mostrar/ocultar senha | Adiado — sem componente de input ainda; default recomendado é texto | §7 |
| 6 | Tokens `interactive-*` em texto | Nunca — reservado a superfície/borda/interação | §6 |
| 7 | Nome do estado "padrão" | `normal` em todas as plataformas — sobrescreve `default` do shadcn (via wrapper de contrato) e unifica as grafias divergentes do Flutter (`normal`/`defaultColor`) | §3.3a |
| 8 | `peerDependency` vs. bundled | react/react-dom peer; utilitários de build bundled | §4.5 |
| 9 | `danger` vs. `critical` | `critical` em todo lugar | §3.3b |
| 10 | Prop `type` do Badge (colisão de nome nativo) | Renomear para `variant` | §3.3c |
| 11 | Prefixo `Nemo` no Flutter | Obrigatório em toda classe pública, sem exceção | §3.1 |
| 12 | Prefixo `is` em booleanos | Não adotar como regra geral — seguir idioma nativo | §3.2 |
| 13 | Como aplicar renomes/customizações num componente shadcn sem perder resincronização fácil com o CLI | Wrapper de contrato — arquivo vendored intacto, camada fina traduz o nome público do Nemo pro nome interno do shadcn | §2.1 |

O rationale completo de cada uma dessas perguntas (de onde veio, o que já foi tentado antes) está em [`nemo-comparativo-convencoes.md`](./nemo-comparativo-convencoes.md); este documento registra apenas a decisão final e a evidência de código que a sustenta. Aplicar cada decisão ao código que hoje diverge é trabalho de implementação — acompanhado em [`debitos-tecnicos.md`](./debitos-tecnicos.md).
