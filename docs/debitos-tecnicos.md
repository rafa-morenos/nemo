# Débitos Técnicos — Nemo

> Backlog acionável de código que hoje diverge das decisões registradas em [`convencoes-e-boas-praticas.md`](./convencoes-e-boas-praticas.md). Nenhum item aqui é uma pergunta em aberto — o contrato já está decidido; falta só aplicar ao código existente. Ordenado por prioridade.

| Prioridade | Item | Escopo | Decisão que aplica |
|---|---|---|---|
| 🔴 Alta | Cobertura de testes (hoje zero nas 3 plataformas) | Novo ferramental + specs por componente novo em diante | [§8](./convencoes-e-boas-praticas.md#8-testes) |
| 🟡 Média | Falta app de exemplo pra RN (`example/`/sandbox) e Flutter (`example/`) — hoje não existe nenhum jeito de rodar/visualizar componentes dessas 2 plataformas isoladamente antes de dar como prontos; verificação visual (passo 5 da convenção em `CLAUDE.md`) só é possível em web via Storybook | RN, Flutter | [§8](./convencoes-e-boas-praticas.md#8-testes) |
| 🟡 Média | Prefixo `Nemo` em todas as classes públicas Flutter (`KanbanCard`, `KanbanTaskCard`, `ProductCard*`, `TaskItem`) | Flutter | [§3.1](./convencoes-e-boas-praticas.md#31-nome-do-componente-e-prefixo) |
| 🟡 Média | `.md` por componente + `components/README.md` índice | Documentação | [§9](./convencoes-e-boas-praticas.md#9-storybook--documentação) |
| 🟡 Média | Padronizar story `Playground` em todos os componentes | Storybook | [§9](./convencoes-e-boas-praticas.md#9-storybook--documentação) |
| 🟡 Média | Portar acervo de ícones `icons-DakiApp` para RN/Flutter | RN, Flutter | [§7](./convencoes-e-boas-praticas.md#7-ícones) |
| 🟡 Média | Validar baseline/line-height nas 3 plataformas (risco vivo) | QA de tipografia | [§6](./convencoes-e-boas-praticas.md#6-tokens) |
| 🟡 Média | `Toggle` tem o mesmo formato do `Button` (children livre via `TogglePrimitive.Root`, sem slot de ícone) — mesmo ajuste, prioridade menor por ser primitivo shadcn genérico (não bespoke), a confirmar com o time antes de aplicar | Web | [§4.3](./convencoes-e-boas-praticas.md#43-children-vs-label) |
| 🟢 Baixa | Ferramental mínimo (prettier/eslint/editorconfig/commitlint/CI/PR template) | Repo | [§11](./convencoes-e-boas-praticas.md#11-lint-commits-e-ci) |

> Este documento é o backlog vivo — atualize a lista (removendo linhas resolvidas, adicionando novas conforme surgirem) conforme o trabalho de implementação avança. Ele substitui o backlog equivalente que existia em [`nemo-comparativo-convencoes.md`](./nemo-comparativo-convencoes.md).

> **Nota de processo:** graças ao wrapper de contrato (§2.1), o item de expor `normal` nos primitivos shadcn **não** cria uma divergência permanente do upstream — o arquivo vendored nunca é editado, só a camada fina de tradução. Resincronizar um desses componentes via `npx shadcn add <componente>` no futuro não deveria exigir nenhuma reconciliação manual, a menos que o próprio shadcn renomeie sua convenção interna de variante (evento raro e estrutural, não rotineiro).
