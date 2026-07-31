# Convenções e Boas Práticas de Componentes — Jake → Nemo

> Este conjunto de documentos reúne as convenções e boas práticas de criação de componentes identificadas no design system anterior da Daki, o **Jake**. Ele serve como **base de partida** para a criação do guia definitivo de convenções do novo design system, o **Nemo** — não como um contrato final. Ao construir o guia do Nemo, adapte, substitua ou descarte o que fizer sentido conforme os novos tokens e componentes forem definidos; várias convenções aqui (especialmente as de tokens) foram pensadas para uma arquitetura que pode não se repetir no Nemo.

## Fontes consultadas

1. Histórico completo do canal privado do Slack `#design-system` (2021–2025), onde o fórum de DS discutia e decidia contratos de componente, nomenclatura e arquitetura do Jake.
2. Guia de Contribuição do Jake, exportado do Notion (Definition of Ready, Definition of Done, Code Review, Versionamento, Canais de Comunicação, Refinamento com fórum de DS).
3. Código-fonte real do monorepo `jake`: estrutura de pastas, tipagem de props, testes, Storybook, geração de tokens (Style Dictionary), lint/format/commit, CI e templates de PR.

## Como usar isto com Claude Code

Cada documento descreve uma convenção como uma regra acionável. Quando uma convenção do Slack (decisão) diverge do que estava de fato implementado no código antigo, isso está marcado explicitamente como "**decisão vs. legado**" — ao usar isso como referência para o Nemo, dê preferência à decisão (mais deliberada), não ao código legado. Pontos que nunca chegaram a uma decisão fechada estão no documento de Decisões em Aberto e devem ser resolvidos explicitamente para o Nemo — não devem ser assumidos por inferência.

## Índice

1. [Princípios norteadores](./01-principios-norteadores.md)
2. [Arquitetura e estrutura do projeto](./02-arquitetura-estrutura.md)
3. [Nomenclatura](./03-nomenclatura.md)
4. [Contrato de Props / API de Componentes](./04-contrato-props-api.md)
5. [Estados do componente](./05-estados-componente.md)
6. [Tokens (cor, tipografia, espaçamento, borda)](./06-tokens.md)
7. [Ícones](./07-icones.md)
8. [Testes](./08-testes.md)
9. [Storybook / Documentação viva de componente](./09-storybook-documentacao.md)
10. [Versionamento e publicação](./10-versionamento-publicacao.md)
11. [Lint, Format, Commits e CI](./11-lint-commits-ci.md)
12. [Acessibilidade](./12-acessibilidade.md)
13. [Componente de referência: Botão](./13-componente-referencia-botao.md)
14. [Decisões em aberto herdadas do Jake](./14-decisoes-em-aberto.md)
15. [Débitos técnicos do Jake a não repetir](./15-debitos-tecnicos.md)
