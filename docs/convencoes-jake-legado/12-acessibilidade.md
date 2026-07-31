[◀ Voltar ao índice](./README.md)

# 12. Acessibilidade

- Trate acessibilidade como parte do processo de design e desenvolvimento desde o início, não como etapa avulsa — o Jake tratou isso de forma pontual/reativa (ex. só entrou em pauta ao discutir overflow de texto), o que é uma lacuna a não repetir no novo DS.
- Metas mínimas de contraste a validar em todo componente novo: WCAG 2.1 1.4.11 (≥3:1 para informação visual de componentes/estados) e WCAG 2.0 1.4.3 (≥4.5:1 texto pequeno, ≥3:1 texto grande); cor nunca deve ser o único canal de informação (WCAG 2.0 1.4.1).
- Considere o efeito de aumento de fonte do sistema pelo usuário no layout de todo componente com texto (pode causar overflow mesmo em textos originalmente curtos).
- Documente explicitamente comportamento de navegação por teclado e suporte a ferramentas assistivas por componente, não apenas por contraste de cor.

[◀ Voltar ao índice](./README.md)
