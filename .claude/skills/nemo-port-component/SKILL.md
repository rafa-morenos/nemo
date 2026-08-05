---
name: nemo-port-component
description: Orchestrates creating/porting one Nemo design-system component across web, React Native, and Flutter — applying the project's locked conventions (docs/convencoes-e-boas-praticas.md) via specialized subagents, then verifying and documenting the result. Use for "porta o <componente> pra RN/Flutter", "cria o <componente> nas 3 plataformas", or any Bucket A/B item from the backlog in CLAUDE.md.
---

# Nemo — portar/criar componente nas 3 plataformas

Orquestra a criação/porte de **um** componente do design system Nemo (web + React Native + Flutter), delegando cada plataforma pra um subagente especializado (`nemo-web-porter`, `nemo-rn-porter`, `nemo-flutter-porter`) que já carrega as convenções do projeto — em vez de reconstruir esse conhecimento inline a cada sessão.

Argumento esperado: nome do componente (kebab-case, ex. `input-otp`, `dialog`, `slider`). Opcionalmente, um link/node do Figma quando o componente ainda não existe em nenhuma plataforma.

## Passo 0 — classificar antes de portar

Componentes do shadcn já foram triados em 3 buckets (ver `CLAUDE.md` → tabela de Paridade + backlog item 10):

- **Bucket A** (layout/estilo puro) e **Bucket B** (comportamento real sem overlay/gesto complexo) → portáveis diretamente, siga o fluxo normal abaixo.
- **Bucket B — overlay/gesto complexo** (`dialog`, `drawer`, `sheet`, `dropdown-menu`, `popover`, `select`, `slider`, `input-otp`, `pagination`, `table`, `alert-dialog`, `breadcrumb`, `button`, `input`, `textarea`) → portável, mas confirme a decisão de dependência já tomada no backlog item 10 antes de começar (`@react-native-community/slider` pro Slider, `@react-native-picker/picker` pro Select; overlays via `Modal` nativo do RN, sem lib de portal nova) — se a decisão mudou ou não existe ainda pro componente pedido, pare e pergunte ao usuário antes de escolher uma dependência nova.
- **Bucket C** (`calendar`, `carousel`, `chart`, `combobox`, `command`, `context-menu`, `data-table`, `date-picker`, `direction`, `form`, `hover-card`, `menubar`, `navigation-menu`, `resizable`, `scroll-area`, `sidebar`, `tooltip`) → **não porte código às cegas**. É decisão de produto (qual é o padrão mobile equivalente?), não uma tarefa de porte. Se o usuário pedir um desses, pare e ou (a) escreva a nota de design componente-a-componente esperada no backlog item 10, ou (b) pergunte qual é o padrão mobile que o time já decidiu, antes de gerar qualquer arquivo.

Se o componente não está em nenhuma das listas acima (é um componente bespoke novo, não-shadcn), trate como Bucket A/B normal.

## Passo 1 — resolver o estado atual

```bash
ls packages/web/src/components/ | grep -i "<nome>"
ls packages/react-native/src/ | grep -i "<Nome>"
ls packages/flutter/lib/ | grep -i "<nome>"
```

- **Web já existe, RN/Flutter faltando** (caso mais comum — ver tabela de Paridade) → pule direto pro Passo 3.
- **Nada existe ainda** → precisa de Figma (link/node) ou de uma descrição precisa de anatomia/estados do usuário antes de continuar. Sem uma das duas, **não invente visual** — pergunte.
- **Já existe nas 3** → não há trabalho de porte; confirme com o usuário se é atualização/refactor (fora do escopo desta skill) em vez de porte novo.

## Passo 2 — web (só se faltando)

Rode `nemo-web-porter` (síncrono — RN/Flutter dependem do resultado dele):

```
Agent({
  subagent_type: "nemo-web-porter",
  description: "Criar componente <nome> no web",
  run_in_background: false,
  prompt: "Crie o componente <nome> em packages/web/src/components/, a partir de <link do Figma OU descrição fornecida pelo usuário>. Siga docs/convencoes-e-boas-praticas.md e o padrão dos componentes shadcn já vendored no repo."
})
```

Depois: `preview_start({name: "storybook"})`, navegue até a story nova, tire screenshot em light **e** dark antes de prosseguir. Se algo estiver quebrado, corrija (você ou um novo turno do mesmo agente) antes de portar pras outras plataformas — o web é a fonte da verdade que elas vão copiar.

## Passo 3 — RN + Flutter em paralelo

Sempre nas duas de uma vez, no mesmo bloco de mensagem (elas escrevem em arquivos diferentes, não há conflito):

```
Agent({ subagent_type: "nemo-rn-porter", description: "Portar <nome> pra RN",
  prompt: "Porte packages/web/src/components/<nome>.tsx para packages/react-native/src/<Nome>.tsx, seguindo docs/convencoes-e-boas-praticas.md." })

Agent({ subagent_type: "nemo-flutter-porter", description: "Portar <nome> pra Flutter",
  prompt: "Porte packages/web/src/components/<nome>.tsx para packages/flutter/lib/<nome>.dart, seguindo docs/convencoes-e-boas-praticas.md." })
```

Leia o retorno dos dois antes de seguir — cada um relata decisões de tradução, gaps documentados, e (o Flutter) confirma que não houve verificação visual.

## Passo 4 — verificação

- **RN**: se `nemo-preview/` (o projeto Expo throwaway descrito na memória `feedback_rn_visual_verification`) já existir/estiver configurado nesta máquina, sincronize o(s) arquivo(s) novo(s) + `build/rn/*.ts` pra dentro dele, rode `expo start --web` via `preview_start`, abra no Browser pane, interaja de verdade (clique/toque nos estados controlados) e tire screenshot antes/depois. Se `nemo-preview/` não existir nesta sessão, avise o usuário que a verificação visual de RN não rodou (não pule silenciosamente).
- **Flutter**: sem toolchain neste ambiente — a verificação é a revisão de código que o próprio `nemo-flutter-porter` já fez linha a linha contra `nemo_tokens.dart`. Não finja uma verificação visual que não aconteceu.
- **Web**: já verificado no Passo 2, se esse passo rodou.

## Passo 5 — documentar

Sempre atualize, no mesmo PR/turno (é parte do "pronto", não um passo opcional):

1. **`CLAUDE.md`** — nova entrada no "Status" (mesmo estilo denso já usado: o que foi feito, decisões reais tomadas, gaps documentados com número/motivo real — não boilerplate) + atualizar a linha do componente na tabela **Paridade de plataforma**.
2. **`docs/debitos-tecnicos.md`** — se qualquer subagente introduziu um desvio conhecido do contrato (ex.: Flutter sem prefixo por seguir um vizinho antigo, gap de contraste replicado, animação/gesto fora de escopo), adicione uma linha nova em vez de deixar só documentado inline no código.
3. Se o componente fechar um item do backlog do `CLAUDE.md` (seção "Próximos passos"), marque/atualize esse item.

## Passo 6 — resumo final pro usuário

Reporte, em texto direto (sem inflar): o que foi criado em cada plataforma, o que foi verificado de fato (screenshot real vs. só revisão de código — seja explícito sobre a diferença), decisões de tradução não-óbvias tomadas pelos subagentes, e qualquer coisa que ficou fora de escopo de propósito.

## Não fazer

- Não gere as 3 plataformas em paralelo quando o web ainda não existe — RN/Flutter dependem do web como fonte da verdade, rodar em paralelo nesse caso produz 3 designs divergentes.
- Não invente token/hex/dependência nova sem documentar o gap (mesmo padrão já estabelecido em `badge.tsx`/`button.tsx`/`navigation-bar.tsx` pro Figma, e no backlog item 10 pras libs de RN).
- Não marque um componente do Bucket C como "portado" — vira nota de design, não código.
- Não pule o Passo 5 — um port sem entrada no `CLAUDE.md`/tabela de Paridade é invisível pra próxima sessão (o próprio arquivo é o que orienta sessões futuras).
