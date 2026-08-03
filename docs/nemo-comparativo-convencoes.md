# Comparativo — Convenções herdadas do Jake × estado atual do Nemo

> **Este documento é histórico/rationale.** As decisões e perguntas em aberto que ele levanta
> (seção 2, itens ⚠️, e o backlog no fim) foram todas fechadas em
> [`convencoes-e-boas-praticas.md`](./convencoes-e-boas-praticas.md) — esse é o guia de convenções definitivo a seguir.

> Cruza a doc de convenções e boas práticas extraídas do DS antigo (Jake), em
> [`docs/convencoes-jake-legado/`](./convencoes-jake-legado/README.md), com o
> estado real do Nemo (código em `packages/web|react-native|flutter`, tokens,
> `CLAUDE.md`, `package.json`, histórico git). O objetivo é separar o que
> **não faz sentido** replicar do que **faz sentido** e ainda **falta alterar**.

## Contexto: o que o Nemo já é (para calibrar o comparativo)

- **Tokens:** fonte única = export do Figma → Style Dictionary → 4 saídas
  (`build/{web,ts,rn,flutter}`). Modelo Material-3 (primitivos → palette →
  **alias** semântico). **Não** é o modelo Jake de "token base + token
  semântico por componente dentro da lib".
- **Web:** shadcn/ui (New-York) + preset Tailwind que tematiza os papéis do
  shadcn. Componentes são `.tsx` planos com `cva` + `VariantProps` inline;
  alguns em pasta (`kanban-card/`, `product-card/`, `product-tile/`). **Sem**
  `.types.ts`, `.variants.ts`, `.spec.tsx` ou `.md` por componente.
- **Naming:** web sem prefixo + `displayName` (`Button`, `Badge`); Flutter
  `Nemo*` (`NemoBadge`, `NemoTokens`).
- **Commits:** já usam Conventional Commits (`feat(navigation-bar):`, `fix(...)`,
  `docs:`), mas **sem** hook que valide.
- **Ausências confirmadas:** 0 testes nas 3 plataformas; nenhum `.md` por
  componente; sem husky/commitlint/prettier/eslint/editorconfig/CI/PR-template/
  CODEOWNERS/CHANGELOG; sem `apps/examples`.
- **À frente do Jake:** biblioteca de ícones curada (72 ícones `icons-DakiApp`,
  `currentColor`) e processo de acessibilidade real (cálculo WCAG, teste de foco
  por teclado, semântica aria) embutido no `CLAUDE.md`.

---

## 1. O que NÃO faz sentido para o Nemo (descartar ou adaptar)

| # | Convenção do Jake | Por que não cabe no Nemo |
|---|---|---|
| 1 | **Token de 2 camadas com "semântico de componente" dentro da lib** (§2.1, §6.1) | Nemo é 100% Figma-driven (primitivos→palette→alias) e **proíbe inventar token**. Não existe camada hand-authored por componente — e a própria doc marca isso como "pode não caber". Descartar. |
| 2 | **Monorepo elaborado** (`components/shared/{api,react-hooks}`, `components/properties/base`, `packages/{config,style-dictionary,tailwind-config,tsconfig}`, `apps/examples`) (§2.1) | Nemo é um snapshot deliberadamente mais enxuto (`tokens/`, `build/`, `packages/{web,rn,flutter}`). Quebrar Style Dictionary/tsconfig/tailwind em pacotes próprios é overkill agora. (`apps/examples` vale reconsiderar depois.) |
| 3 | **Split de arquivo `button.types.ts` + `button.variants.ts` + `hooks/view_model`** (§2.2) | Contradiz a convenção que o `CLAUDE.md` protege de propósito: manter o source shadcn canônico (cva inline + `VariantProps`, compound via `data-slot`). O que importa é a **cobertura** (tipos/story/doc/teste), não o split físico. |
| 4 | **Enum como objeto `UPPER_SNAKE_CASE as const` no React** (§3.3) | Nemo usa `cva` + união de string-literals + `VariantProps` — idiom shadcn. O `BUTTON_VARIANTS = {…} as const` briga com isso. Manter só no Flutter (que já usa enum Dart — correto). |
| 5 | **SemVer por pacote + estágios alpha/beta/latest + publish manual pelo time de DS** (§10) | Nemo é `private`, versão única `0.1.0`, não publica no npm, sem changeset. A esteira de release inteira é prematura — adiar até haver publicação real. |
| 6 | **Governança de PR: 2 aprovadores + fórum de DS + squad, CODEOWNERS, CI filtrado por Turborepo** (§11) | Pressupõe estrutura de fórum/org e base de consumidores que o Nemo ainda não tem. O ritual pesado não cabe; CI básico + commit convencional, sim (ver seção 2). |
| 7 | **Contrato específico do Button-Jake** (`longPress`, `onLongPressConfirmed/Cancelled`, 2s, spinner 1 volta/s, capitalização forçada da 1ª letra) (§13) | São decisões de produto do Button do Jake. O Button do Nemo é o shadcn puro. Não retrofitar esses comportamentos sem necessidade Daki real. |
| 8 | **Decisão em aberto "iconBuilder flexível vs. curado"** (§7, §14) | Já resolvida no Nemo: biblioteca **curada e fechada** (`icons-DakiApp`, `currentColor`). A pergunta é discutível só para web; para o Nemo basta **estender** a RN/Flutter. |

---

## 2. O que FAZ sentido — e o que falta para seguir o padrão

### ✅ Já alinhado (manter/formalizar)

- **Tokens semânticos, nunca paleta bruta** (§1, §6.2) — enforced no `CLAUDE.md`.
- **Geração multi-plataforma via Style Dictionary com transforms custom** (§6.5)
  — `nemo/rn-theme` (nest px→number), `dartName()` camelCase. Cada plataforma
  consome sua saída, não o JSON cru.
- **Paridade semântica, sintaxe nativa** (§1, §3.4) — `onClick`/`onPress`/`onTap`
  respeitados.
- **Não acoplar a lib de produto** (§1) — componentes controlados por
  props/callbacks, sem form-lib importada.
- **Web compõe tipos nativos + `VariantProps`** (§4.2) —
  `Button extends ButtonHTMLAttributes & VariantProps`.
- **Prefixo assimétrico** (§3.1) — web sem prefixo + `displayName`, Flutter
  `Nemo*` (parcial — ver gap abaixo).
- **Storybook `Components/<Nome>` + `tags:['autodocs']` + idioma pt-BR
  consistente** (§9, §15).
- **Ícones: estratégia formalizada, subconjunto curado do que é usado,
  `currentColor` tema-ável** (§7) — Nemo está **à frente** do débito §15.
- **Acessibilidade como parte do processo** (§12) — Nemo **excede** a doc
  (contraste WCAG calculado, foco por teclado, aria, desvios documentados com a
  razão real).

### ⚠️ Faz sentido, mas falta alterar (gaps priorizados)

**Alto impacto**

1. **Testes automatizados — hoje é ZERO nas 3 plataformas** (§8, §2.3, §15). É
   exatamente o débito que a doc manda não repetir (o TextField do Jake subiu sem
   teste). Falta: Jest + Testing Library `*.spec.tsx` (web/RN) e `flutter_test`
   em árvore `test/` espelhada. Definir isso como parte de "pronto".
2. **Prop `type` do Badge** (`filled/outline/ghost/solid`) — é **exatamente** a
   colisão que §3.3/§4.4 mandam evitar (`type` é palavra reservada/atributo
   nativo). Renomear para `variant`/`appearance`/`style` nas 3 plataformas
   (`BadgeType`, `NemoBadgeType`).
3. **Valor `default` vs. `normal`** (§3.3, §5) — a doc elegeu `normal`. Nemo
   mistura: `KanbanUrgency.normal`/`AssignTone.normal` (ok) mas
   `Badge color="default"` / `NemoBadgeColor.defaultColor`. shadcn empurra
   `default` — é uma **tensão real a decidir explicitamente e aplicar
   consistente**, não deixar derivar.
4. **`danger` vs. `critical`** (§3.3, §15) — Badge usa `critical`, mas Flutter
   `AssignTone.danger`. A doc padronizou `critical` (alinhado ao token). Alinhar
   o eixo entre componentes/plataformas.

**Médio impacto**

5. **Prefixo `Nemo` incompleto no Flutter** (§3.1) — só `NemoBadge`/`NemoTokens`
   têm; `KanbanCard`, `KanbanTaskCard`, `ProductCard*`, `TaskItem` **não**.
   Decidir a regra e aplicar.
6. ~~**Booleanos sem prefixo `is`**~~ — **Resolvido em `convencoes-e-boas-praticas.md` §3.2**: decisão final foi
   **não** adotar `is` como prefixo obrigatório (reverte a leitura deste comparativo e a decisão original
   do fórum de DS do Jake registrada em `convencoes-jake-legado/03-nomenclatura.md` §3.2) — seguir o idioma
   nativo da plataforma/prop (`dot`, `loading`, `disabled`, `asChild` continuam sem prefixo).
7. **`.md` por componente + índice central** (§9) — não existe nenhum
   (`Visão Geral → Uso → Props → Exemplos → Best Practices → Relacionados`, +
   `components/README.md` com tabela Componente × Plataforma). A prosa do
   `CLAUDE.md` não substitui. _Nota: a tabela de Paridade do `CLAUDE.md` já é um
   bom embrião do índice._
8. **Story `Playground`** (todos os controles ligados, sandbox) (§9) —
   praticamente inexistente (1 ocorrência). Adotar como padrão.
9. **Ícones só no web** (§7, §15) — RN tem 7 ad-hoc, Flutter nenhum. Portar o
   acervo curado para RN/Flutter (e reexportar o Discover como vetor).
10. **Baseline/line-height entre plataformas** (§6.3, §15) — débito não resolvido
    do Jake e **risco vivo** no Nemo (o drift 18px vs 20px já apareceu). Testar
    alinhamento vertical de texto nas 3 plataformas antes de dar componente como
    pronto.

**Ferramental / processo**

11. **Lint/format/commit/CI** (§11) — falta prettier, eslint, editorconfig, hook
    commitlint, CI mínima (build:tokens + typecheck + build-storybook), PR
    template. A parte pesada (2 aprovadores/fórum) fica na seção 1; o básico faz
    sentido.
12. ~~**Decisões em aberto §14 a fechar explicitamente para o Nemo**~~ — **Todas resolvidas em
    `convencoes-e-boas-praticas.md`**: `children` vs `label` depende do tipo de componente, contrato
    restrito em atômico vs. livre em composto (§4.3); modelo da prop de ícone é `ReactNode`/`Widget` livre
    (§4.4); `interactive-*` em texto é **nunca** — reservado a superfície/borda/interação (§6);
    `peerDependency` vs bundled já documentado (react/react-dom peer, utilitários de build bundled, §4.5).

---

## Resumo acionável (backlog derivado)

> Este backlog foi substituído por [`debitos-tecnicos.md`](./debitos-tecnicos.md), já reordenado
> conforme as decisões fechadas em [`convencoes-e-boas-praticas.md`](./convencoes-e-boas-praticas.md)
> — mantido aqui só como registro do estado no momento deste comparativo.
