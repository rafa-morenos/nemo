[◀ Voltar ao índice](./README.md)

# 2. Arquitetura e estrutura do projeto

## 2.1 Estrutura de monorepo (referência validada em produção)

```
design-system/
  tokens/
    properties/base/         # fonte única de verdade dos tokens (JSON, formato Style Dictionary)
    libs/{flutter,react-native,web}/   # saída de tokens por plataforma
    fonts/
    utils/
  components/
    properties/base/         # tokens semânticos específicos de componente (camada acima dos tokens base)
    shared/{api,react-hooks}/
    libs/
      react-web/
      react-native/
      flutter/
  packages/
    config/                  # configs de lint compartilhadas
    style-dictionary/        # transforms/formats customizados do Style Dictionary
    tailwind-config/
    tsconfig/
  apps/
    examples/                # apps de exemplo mínimos por plataforma, usados para validar integração real
  docs/
```

Motivos por trás desta estrutura (documentados no Slack): manter espaço na raiz de `components` para itens que não pertencem a uma lib de plataforma específica; `jake-components` sempre depende de `jake-tokens` (nunca duplicar tokens dentro da lib de componentes); tokens têm **duas camadas** — tokens de propriedade base (cor/tipografia/espaçamento/borda/opacidade brutos) e tokens semânticos de componente por cima.

## 2.2 Estrutura de pastas por componente

Cada plataforma tem seu próprio idioma de organização interna — **não force a mesma estrutura de arquivo entre plataformas**, force a mesma cobertura (tipos, testes, story, doc):

**React (Web e Native) — `kebab-case`:**
```
button/
  button.tsx                 # implementação
  button.types.ts            # tipos e enums da API pública
  button.variants.ts         # lógica de variantes (class-variance-authority no Web)
  button.module.css          # estilos (Web)
  button.spec.tsx            # testes
  button.stories.tsx         # Storybook
  button.md                  # documentação de uso
  index.ts                   # export público
  components/                # subcomponentes internos (ex.: progress-activity)
  hooks/view_model/           # (React Native) lógica de cálculo de estilo por variante/estado
```

**Flutter — `snake_case`:**
```
button/
  button.dart
  button_theme_widget.dart       # tema/estilo por variante e estado
  button_snapshot_theme.dart
  button.md
  properties/                    # enums públicos (shape, size, variant) — equivalente ao .types.ts
    button_shape.dart
    button_size.dart
    button_variant.dart
  subcomponents/                 # equivalente à pasta components/ do React
    button_focus.dart
    button_label.dart
    ...
```
Testes do Flutter ficam **fora** da árvore de `lib/`, espelhando o caminho dentro de `test/src/components/...` — é o único caso em que teste não fica ao lado do componente, por ser a convenção nativa do ecossistema Dart/Flutter.

## 2.3 Componente de referência para cobertura completa

Ao decidir se um componente está "pronto", use como régua a cobertura que o **Button** atingiu no Jake (tipos + variantes + testes + stories + doc nas 3 plataformas) — foi o único componente do DS antigo que chegou a esse nível em todas as plataformas. Componentes que ficaram parcialmente implementados (ex.: TextField, sem testes/stories em nenhuma plataforma) não devem ser tomados como modelo de estrutura "final", só de contrato de props.

[◀ Voltar ao índice](./README.md)
