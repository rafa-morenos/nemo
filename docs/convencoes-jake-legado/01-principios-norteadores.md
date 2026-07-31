[◀ Voltar ao índice](./README.md)

# 1. Princípios norteadores

Estes princípios apareceram repetidamente, de formas diferentes, nas três fontes, e devem guiar qualquer decisão de design de API não coberta explicitamente nos demais documentos:

- **Consistência de contrato acima de flexibilidade.** "Quanto menos margem para erro tivermos para a pessoa usuária final do DS, melhor" — prefira um contrato mais rígido (enums fechados, props tipadas) a uma API aberta demais (ex.: `children: ReactNode` livre) que permita quebrar o design.
- **Não se acoplar a decisões do produto.** O DS não deve depender de bibliotecas de escolha do time de produto (ex.: bibliotecas de gerenciamento de formulário). O componente expõe dados crus e validação via callback/prop, nunca importa a lib de terceiros.
- **Evitar nomes de palavra reservada** em props, tokens e estados, entre as linguagens/plataformas suportadas (TypeScript, Dart, etc.) — ex.: `state`, `type`, `DEFAULT` já causaram retrabalho no Jake.
- **Buscar paridade semântica entre plataformas, não paridade sintática.** Cada plataforma segue sua própria convenção de nome quando isso é esperado pelo ecossistema (ex.: `onClick` na Web, `onPress` no React Native, `onTap` no Flutter) — não force um nome idêntico onde a convenção nativa diverge. Já os **conceitos e valores possíveis** (variant, size, estados) devem ser idênticos entre plataformas.
- **Tokens sempre semânticos, nunca de fundação direto no componente.** Componentes consomem tokens semânticos (`surface-accent-critical`), nunca a paleta bruta (`red-500`).
- **Faseamento explícito por versão (v1/v2/v3).** Todo componente novo ou com escopo grande deve declarar o que é obrigatório na primeira versão vs. o que fica para depois, evitando breaking changes por tentar entregar tudo de uma vez.

[◀ Voltar ao índice](./README.md)
