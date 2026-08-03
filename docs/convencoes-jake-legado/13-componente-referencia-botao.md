[◀ Voltar ao índice](./README.md)

# 13. Componente de referência: Botão (estudo de caso completo)

Use este contrato consolidado como exemplo concreto de aplicação das convenções deste guia — foi o componente que atingiu maior maturidade e consistência entre plataformas no Jake:

```
Propriedades:
- shape: enum → pill, rounded
- size: enum → small, medium, large
- variant: enum → primary/fill, secondary/outline, tertiary/text, critical
- isDisabled: boolean
- isLoading: boolean
- label (ou children, decidir por componente — ver seção de Contrato de Props)
- icon (left/right — modelo estrutural a decidir uma vez, ver seção de Contrato de Props)
- longPress: boolean
- onLongPressConfirmed / onLongPressCancelled: callback (quando longPress habilitado)
- onClick / onPress / onTap: callback nativo por plataforma
```

Decisões específicas incorporadas neste contrato: capitalização da primeira letra do texto é forçada por código (não depende de quem consome digitar corretamente); warning em ambiente de desenvolvimento quando o texto/label vier vazio; loading assume estilo de disabled; long press reseta visualmente ao concluir a ação (não permanece 100% preenchido); duração padrão de long press de 2 segundos com curva de animação `easeOut`; spinner de loading gira em 1 volta completa por segundo.

[◀ Voltar ao índice](./README.md)
