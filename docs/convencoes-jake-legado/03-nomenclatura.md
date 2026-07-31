[◀ Voltar ao índice](./README.md)

# 3. Nomenclatura

## 3.1 Nome do componente

- **React (Web e Native):** nome público exportado **sem prefixo** (`Button`, `TextField`) — o mapeamento De→Para com a lib de destino (ex. Chakra) já deixa claro que é um componente do DS. Ainda assim, mantenha um `displayName` com prefixo (`Jake_Button`) para depuração via DevTools.
- **Flutter:** prefixo do design system **embutido no nome da classe pública** (`JakeButton`, `JakeTextField`) — ajuda no autocomplete da IDE e deixa explícito, no próprio código consumidor, quando não se está usando um componente do DS.
- Escolha o prefixo do novo DS com essa mesma lógica assimétrica: sem prefixo em React, com prefixo em Flutter/Dart.

## 3.2 Props booleanas

- **Convenção decidida para o novo DS:** prefixo `is` em props booleanas (`isDisabled`, `isLoading`), inspirado no padrão do Chakra UI.
- **Decisão vs. legado:** o código do Jake **não segue essa convenção** em nenhuma plataforma — as props booleanas reais são `disabled`, `loading`, `fullWidth`, `readOnly`, sem prefixo. Isso foi decidido no fórum de DS mas nunca aplicado retroativamente ao código existente. Para o novo DS, siga a decisão (`is`), não o código legado.
- Exceção aceita: onde a convenção nativa da plataforma já define o nome (ex.: `disabled` é atributo nativo do HTML), avalie manter o nome nativo se isso reduzir fricção de adoção — mas documente a escolha explicitamente por componente, não deixe implícito.
- Prefira nomear o booleano pelo lado positivo quando possível (`enabled` em vez de duplo negativo tipo `notDisabled`), mas isso pode ceder à convenção mais familiar da plataforma (ex.: HTML usa `disabled`).

## 3.3 Enums / valores fechados

- Evite `DEFAULT`, `state`, `type` como nome de valor ou de prop — são palavras reservadas em uma ou mais linguagens-alvo. Para o estado "padrão"/"não modificado" de um componente, use **`normal`** (foi o vencedor de enquete formal no fórum de DS, com "standard" em segundo lugar).
- Em React, declare enums como objeto `UPPER_SNAKE_CASE` com tipo derivado — é o padrão real usado em todo o código do Jake:
  ```ts
  export const BUTTON_VARIANTS = { fill: 'fill', outline: 'outline', text: 'text' } as const;
  export type ButtonVariant = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];
  ```
- Em Flutter, use enums Dart nomeados no arquivo próprio dentro de `properties/` (`JakeButtonVariant`, `JakeButtonSize`), não misture a definição do enum dentro do arquivo do componente.
- **Garanta que os eixos de variação sejam os mesmos entre plataformas.** O Jake tem uma inconsistência real aqui: no React o Button tem dois eixos ortogonais (`variant`: fill/outline/text + `intent`: accent/critical), enquanto no Flutter isso virou um único enum combinado (`primary/secondary/tertiary/critical`). Ao desenhar um componente novo, defina os eixos de variação **uma vez, na documentação/contrato**, antes de implementar em qualquer plataforma — não deixe cada plataforma modelar o enum à sua maneira.
- Nomes de variante devem ser abrangentes o suficiente para não precisarem ser renomeados quando o escopo crescer (ex.: `danger` foi renomeado para `critical` por ser mais abrangente e por já alinhar com o nome do token de cor).

## 3.4 Callbacks e eventos

- **Não force um nome único de callback entre plataformas** — respeite a convenção nativa: `onClick` (Web), `onPress` (React Native), `onTap` (Flutter).
- Para interações com múltiplos estados possíveis (ex.: long press), prefira **um callback por estado** (`onLongPressConfirmed`, `onLongPressCancelled`) a um único callback com parâmetro de status — nem toda pessoa usuária do DS precisa tratar todos os estados possíveis.

## 3.5 Tokens

> Nota: a hierarquia de nomenclatura abaixo reflete como o Jake organizava tokens. Como os tokens do Nemo podem ter sido redesenhados desde a criação deste documento, ver a observação sobre isso no documento [Tokens](./06-tokens.md) — essa estrutura de sub-divisão pode não se aplicar diretamente ao Nemo.

- Estrutura hierárquica: `<camada>-<categoria>-<papel>` (ex.: `surface-accent-critical`, `interactive-accent-main`, `border-surface-accent-critical`).
- Todo token de cor precisa de **alias semântico documentado** — nunca referencie a paleta bruta diretamente em um componente ou em qualquer lugar do produto.
- Ao nomear tokens ligados a uma marca/submarca, **alinhe o nome do token ao nome já usado no código**, mesmo que o nome de marketing da marca mude (ex.: token permaneceu `plus` mesmo quando a marca virou "Super" no dia a dia).
- Prefixo de tokens de interação no código deve ser o nome completo (`interactive-*`), não abreviado (`int-*`) — abreviações já geraram confusão e retrabalho de rename.
- Nomenclatura de status de token deve ser consistente entre plataformas: cuidado com pequenas variações como `default` vs. `standard` para o mesmo conceito (aconteceu entre React e Flutter no `status` do TextField).

## 3.6 Ícones

- Ícones direcionais: **consolide em um único estilo visual** (ex.: chevron) em vez de fragmentar entre arrow/chevron/triangle — decisão que evita inconsistência de linguagem visual.
- Um ícone de "limpar" (X) embutido num campo de texto é **comportamento do próprio componente** (prop tipo `clearable`), não uma instância de `IconButton` reaproveitada — mas o mesmo ícone "X" usado em Chip/Tag é uma variação do Chip. Trate reaproveitamento visual de ícone entre componentes com cuidado: **mesma forma visual pode ter comportamento e semântica diferentes** conforme o componente hospedeiro.

[◀ Voltar ao índice](./README.md)
