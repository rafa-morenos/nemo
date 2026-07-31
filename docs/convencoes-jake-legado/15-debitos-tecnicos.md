[◀ Voltar ao índice](./README.md)

# 15. Débitos técnicos do Jake a não repetir

- Falta de biblioteca de ícones unificada entre plataformas/produtos, gerando retrabalho recorrente.
- Desalinhamento de baseline/line-height de texto entre Figma, Flutter e React Native para determinados tokens de tipografia.
- Inconsistência de idioma na documentação/Storybook entre plataformas (parte em português, parte em inglês).
- Modelagem divergente dos mesmos eixos de variação entre plataformas (ex. variant/intent do Button unificados em um único enum no Flutter, mas ortogonais no React).
- Componentes com contrato de props decidido mas nunca aplicado retroativamente ao código (ex. convenção `is` em booleanos).
- Componentes "subindo" para o DS compartilhado sem que o mapeamento completo de cenários cross-produto tenha sido feito, gerando lacunas de paridade entre plataformas (ex. TextField sem testes/stories em nenhuma plataforma).

[◀ Voltar ao índice](./README.md)
