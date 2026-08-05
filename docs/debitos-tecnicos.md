# Débitos Técnicos — Nemo

> Backlog acionável de código que hoje diverge das decisões registradas em [`convencoes-e-boas-praticas.md`](./convencoes-e-boas-praticas.md). Nenhum item aqui é uma pergunta em aberto — o contrato já está decidido; falta só aplicar ao código existente. Ordenado por prioridade.

| Prioridade | Item | Escopo | Decisão que aplica |
|---|---|---|---|
| 🔴 Alta | Cobertura de testes (hoje zero nas 3 plataformas) | Novo ferramental + specs por componente novo em diante | [§8](./convencoes-e-boas-praticas.md#8-testes) |
| 🟡 Média | Falta app de exemplo pra RN (`example/`/sandbox) — hoje não existe nenhum jeito de rodar/visualizar componentes React Native isoladamente antes de dar como prontos; Flutter já resolvido via `packages/flutter/storybook/` (Widgetbook, ver `CLAUDE.md`); verificação visual (passo 5 da convenção) segue só web+Flutter, RN pendente | RN | [§8](./convencoes-e-boas-praticas.md#8-testes) |
| 🟡 Média | Fontes do `nemo_flutter` (`Owners Narrow`/`Owners Text`/`Inter`) vivem na raiz do pacote (`packages/flutter/fonts/`), não em `lib/fonts/` — o prefixo `packages/nemo_flutter/...` que qualquer app consumidor precisa usar pra referenciar essas fontes só resolve assets debaixo de `lib/` (`_resolvePackageAsset` do `flutter_tools`); referenciar do jeito padrão falha com "unable to locate asset entry". Descoberto ao montar `packages/flutter/storybook/` (consome `nemo_flutter` via `path: ../`, igual um app real faria), que precisou duplicar os `.ttf` localmente como contorno — o primeiro app mobile real que depender do `nemo_flutter` bate no mesmo problema. Fix: mover os 4 `.ttf` pra `lib/fonts/` e ajustar os paths em `packages/flutter/pubspec.yaml` (não mexe em `nemo_fonts.dart`) | Flutter | [§2](./convencoes-e-boas-praticas.md#2-arquitetura-e-estrutura) |
| 🟡 Média | Prefixo `Nemo` em todas as classes públicas Flutter (`KanbanCard`, `KanbanTaskCard`, `ProductCard*`, `TaskItem`) | Flutter | [§3.1](./convencoes-e-boas-praticas.md#31-nome-do-componente-e-prefixo) |
| 🟡 Média | `.md` por componente + `components/README.md` índice | Documentação | [§9](./convencoes-e-boas-praticas.md#9-storybook--documentação) |
| 🟡 Média | Padronizar story `Playground` em todos os componentes | Storybook | [§9](./convencoes-e-boas-praticas.md#9-storybook--documentação) |
| 🟡 Média | Portar acervo de ícones `icons-DakiApp` para RN/Flutter | RN, Flutter | [§7](./convencoes-e-boas-praticas.md#7-ícones) |
| 🟡 Média | Validar baseline/line-height nas 3 plataformas (risco vivo) | QA de tipografia | [§6](./convencoes-e-boas-praticas.md#6-tokens) |
| 🟡 Média | `Toggle` tem o mesmo formato do `Button` (children livre via `TogglePrimitive.Root`, sem slot de ícone) — mesmo ajuste, prioridade menor por ser primitivo shadcn genérico (não bespoke), a confirmar com o time antes de aplicar | Web | [§4.3](./convencoes-e-boas-praticas.md#43-children-vs-label) |
| 🟢 Baixa | Ferramental mínimo (prettier/eslint/editorconfig/commitlint/CI/PR template) | Repo | [§11](./convencoes-e-boas-praticas.md#11-lint-commits-e-ci) |

> Este documento é o backlog vivo — atualize a lista (removendo linhas resolvidas, adicionando novas conforme surgirem) conforme o trabalho de implementação avança. Ele substitui o backlog equivalente que existia em [`nemo-comparativo-convencoes.md`](./nemo-comparativo-convencoes.md).

> **Nota de processo:** graças ao wrapper de contrato (§2.1), o item de expor `normal` nos primitivos shadcn **não** cria uma divergência permanente do upstream — o arquivo vendored nunca é editado, só a camada fina de tradução. Resincronizar um desses componentes via `npx shadcn add <componente>` no futuro não deveria exigir nenhuma reconciliação manual, a menos que o próprio shadcn renomeie sua convenção interna de variante (evento raro e estrutural, não rotineiro).
