[◀ Voltar ao índice](./README.md)

# 7. Ícones

- Formalize a estratégia de ícones **antes** de precisar suportá-los em componentes interativos (Botão, etc.) — no Jake, a ausência de definição gerou débito técnico recorrente em múltiplos projetos.
- Ao decidir entre um modelo "flexível" (ex.: `iconBuilder` que recebe tamanho/cor e retorna o widget) e um modelo fechado (biblioteca de ícones própria, curada): considere que o modelo flexível evita retrabalho de implementação por projeto, mas sacrifica o controle de quais ícones podem ser usados — se optar por flexibilidade, documente explicitamente esse trade-off como decisão consciente, não como ausência de decisão.
- Ao trazer ícones de um rebranding, prefira migrar um **subconjunto curado dos ícones realmente usados**, não a biblioteca inteira de uma vez.
- Ícones de mostrar/ocultar senha: avalie usar texto ("mostrar"/"ocultar") em vez de iconografia, se o idioma permitir sem quebrar o layout — ícone de "olho" tende a gerar ambiguidade visual.

[◀ Voltar ao índice](./README.md)
