# Perguntas em Aberto — Nemo

> Diferente de [`debitos-tecnicos.md`](./debitos-tecnicos.md) (código a atualizar para um contrato **já decidido**), este documento reúne perguntas levantadas durante a escrita de [`convencoes-e-boas-praticas.md`](./convencoes-e-boas-praticas.md) que **ainda não têm decisão** — geralmente porque envolvem trade-off de investimento/processo que afeta todos os produtos consumidores do Nemo, não só uma escolha técnica derivável do código existente. Precisam de alinhamento com o time (design + engenharia dos produtos) antes de virar contrato.

## 1. Enforcement de ícones fora da curadoria

**Contexto:** a prop `icon` (`Badge`, `MenuItem`, `MenuShortcutItem`, `NavigationBarItem` — ver [`convencoes-e-boas-praticas.md` §4.4](./convencoes-e-boas-praticas.md#44-prop-de-ícone)) é tipada como `icon?: React.ReactNode`. Isso decide a **forma** da prop (conteúdo livre, não um objeto estruturado) — mas não é o mesmo que garantir **de onde** o conteúdo vem. Hoje não existe nenhuma trava de código (tipo, lint, validação em runtime) que impeça alguém de passar qualquer coisa nessa prop — uma `<img>` solta, um ícone de outra lib, uma `<div>` — mesmo o acervo `icons-DakiApp` (§7) sendo, por convenção, o único conjunto de ícones que deveria circular ali. A curadoria é uma prática de onde os ícones do Nemo vêm, não uma restrição sobre o que os produtos podem passar pra essas props.

**Pergunta:** vale investir em algum enforcement de código (ex.: regra de ESLint restringindo de onde a prop `icon` pode receber valor, ou algum tipo mais restrito) pra impedir ícones fora da curadoria nos componentes que expõem essa prop, ou isso fica só como convenção (revisão de PR, documentação), sem ferramenta?

**Trade-offs conhecidos:**
- **Enforcement via lint/tipo:** garante consistência de fato, mas é investimento de ferramental real num repo que hoje tem zero lint (ver §11) — e pode travar velocidade de quem quer testar um ícone novo antes dele entrar no acervo curado.
- **Só convenção:** mais barato agora, mas depende de disciplina de code review — o mesmo tipo de garantia frágil que já gerou o débito do `Button`/`Toggle` (`children` livre sem trava nenhuma, ver `debitos-tecnicos.md`).

**Por que não decidir sozinho:** afeta o fluxo de todos os produtos que consomem o Nemo (quão fácil é experimentar um ícone novo vs. quão garantida é a consistência visual entre produtos) — não é uma escolha que se resolve só olhando o código existente, como as decisões técnicas em `convencoes-e-boas-praticas.md`.
