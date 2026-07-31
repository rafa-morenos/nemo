[◀ Voltar ao índice](./README.md)

# 14. Decisões em aberto herdadas do Jake — resolver explicitamente no novo DS

Estes pontos nunca chegaram a uma decisão fechada no design system anterior. Não assuma um padrão por inferência — decida e documente cada um deliberadamente ao iniciar o novo DS:

- Se `label`/`children` do Button (e componentes similares) deve ser texto estrito ou conteúdo livre — tensão entre flexibilidade e consistência de contrato.
- Modelo estrutural definitivo da prop de ícone (objeto estruturado vs. `ReactNode`/`Widget` livre), e se todas as plataformas terão um componente `Icon` próprio desde o início (o Jake nunca teve isso no Web).
- Estratégia de suporte a ícones em componentes interativos (biblioteca fechada e curada vs. builder flexível).
- Se/quando trazer um novo conjunto de ícones de um rebranding para o DS.
- Padrão de ícone vs. texto para mostrar/ocultar senha em campos de input.
- Uso de tokens `interactive-*` em texto (regra geral vs. exceção caso a caso).
- Nome definitivo para o estado "padrão" de um componente e garantia de uso consistente desse nome em todo o código (não só na documentação).
- Se dependências de build de terceiros usadas internamente numa lib (ex. um framework de utilitário CSS) devem ser expostas como `peerDependency` ou embutidas no bundle.

[◀ Voltar ao índice](./README.md)
