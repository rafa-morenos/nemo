[◀ Voltar ao índice](./README.md)

# 9. Storybook / Documentação viva de componente

- Categorize toda story sob `Components/<Nome>` com `tags: ['autodocs']`.
- Toda lib de componentes deve ter uma story chamada **`Playground`**, com todos os controles habilitados (`controls: { disable: false }`) — é a story que serve de sandbox livre para quem consome o DS. Demais stories (ex.: variações específicas de shape/size/intent) podem manter os controles desabilitados, mostrando combinações fixas com propósito ilustrativo.
- Mantenha o **idioma consistente entre plataformas** nas descrições de `argTypes` — inconsistência (ex. uma plataforma em português, outra em inglês) já aconteceu no Jake e prejudica quem navega a documentação entre plataformas.
- No Flutter, é aceitável rodar o Storybook como app separado (não colocation de arquivo dentro do componente) — é a convenção nativa do ecossistema (`storybook_flutter`).
- **Todo componente deve ter um `.md` de uso** com a estrutura: Visão Geral → Como Utilizar (exemplos incrementais) → Props (com valores possíveis de cada enum) → Exemplos → Best Practices → Componentes Relacionados. Mantenha um índice central (`components/README.md`) com uma tabela Componente × Plataforma linkando para cada doc.
- Considere adotar um processo de **brief pré-implementação**: antes de escrever código, documente (mesmo que em arquivo temporário) o nome sugerido do componente, propósito, se é interativo, eixos de variação com valores/default, slots e link do design de referência — isso reduz retrabalho de contrato depois de já ter código escrito.

[◀ Voltar ao índice](./README.md)
