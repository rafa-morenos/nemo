[◀ Voltar ao índice](./README.md)

# 5. Estados do componente

Estados mínimos a considerar ao desenhar qualquer componente interativo, com o nome padronizado a usar:

| Estado | Observação |
|---|---|
| `normal` | Estado padrão (evitar nome `default`) |
| `hover` | — |
| `active` | — |
| `focus` | Ver nota sobre foco abaixo |
| `disabled` | — |
| `loading` | Ver nota sobre loading abaixo |
| `positive` | Validação/feedback positivo |
| `negative` | Validação/feedback negativo |
| `skeleton` | — |
| `readOnly` | Quando aplicável (inputs) |

Regras específicas validadas em produção:

- **Loading assume o estilo visual de disabled** (não mantém as cores da variant original) — evita que o componente pareça "quebrado" com cores de variant + spinner ao mesmo tempo. Texto exibido durante loading fica a critério de quem consome o componente (não force um texto fixo).
- **Foco e active não coexistem visualmente**: o estilo de `:focus` só deve ser aplicado se o elemento não estiver `:active` ao mesmo tempo, evitando conflito visual na Web.
- **Indicador de foco implementado como sombra dupla** (`box-shadow` duplo), não como borda ou elemento de layout adicional — evita "pulos" de espaçamento entre estados focado/não focado. Atenção: se o indicador de foco for implementado como elemento fixo de layout (em vez de sombra) em alguma plataforma, isso pode gerar espaçamento sutilmente diferente do Figma — trate como problema cosmético conhecido, não bloqueante.
- **Hover em variantes com fundo colorido deve usar sobreposição de opacidade**, não simplesmente clarear/escurecer a cor base — clarear/escurecer nem sempre funciona visualmente (ex. incompatível com variantes críticas). Em dark mode, essa lógica se inverte.
- **Overflow de texto**: para textos maiores que o esperado, prefira **quebra de linha** a reticências (ellipsis) — no mobile a pessoa usuária não tem como "ler" o texto cortado (não há tooltip). Considere acessibilidade: aumento de fonte do sistema pelo usuário pode causar overflow mesmo em textos originalmente curtos. Não bloqueie o texto grande — alerte via warning em ambiente de desenvolvimento.
- **Evite inflar o contrato do componente com casos de uso muito específicos** (ex.: uma "bolinha de notificação" no canto de um botão deve reaproveitar o slot de ícone já existente, em vez de virar uma nova prop dedicada).

[◀ Voltar ao índice](./README.md)
