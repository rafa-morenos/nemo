[◀ Voltar ao índice](./README.md)

# 4. Contrato de Props / API de Componentes

## 4.1 Processo de definição do contrato

Antes de implementar qualquer componente, produza (e documente, mesmo que informalmente) um "contrato" com:

- Nome do componente e anatomia (quais elementos visuais/slots ele tem).
- Lista de props com tipo, valores possíveis (se enum) e default.
- Lista de estados suportados.
- Comportamentos especiais (ex.: long press, overflow de texto, loading).

Esse processo foi o que efetivamente permitiu ao Jake amadurecer o Button através de múltiplas rodadas de discussão — vale reproduzir a prática mesmo sem o ritual de reunião semanal.

## 4.2 Tipagem por plataforma

- **React Web:** componha tipos via intersection com atributos HTML nativos (`ButtonHTMLAttributes`, `AnchorHTMLAttributes`) mais `VariantProps` da lib de variantes (ex.: `class-variance-authority`), em vez de redeclarar tudo do zero.
- **React Native:** reaproveite tipos nativos do RN (ex.: `Omit<PressableProps, 'onBlur' | 'onFocus'>`), sobrescrevendo apenas o que precisa de assinatura própria; documente diferenças específicas de plataforma inline via JSDoc (`@platform macos windows`).
- **Flutter:** classe imutável, construtor `const`, props como campos `final` com defaults no próprio construtor, e uso de `assert()` para validar invariantes em tempo de desenvolvimento (ex.: impedir `onTap` nulo quando `longPress` não está habilitado).

## 4.3 Props que não devem ser padronizadas entre plataformas

- Texto livre vs. `children` estruturado: há tensão real não resolvida no Jake entre usar `children: ReactNode` (mais flexível, mas abre brecha para o usuário quebrar o contrato inserindo múltiplos ícones/elementos) e `label: string` (mais rígido, mais seguro). Recomenda-se, para o novo DS, **decidir isso explicitamente por componente** e documentar a justificativa, em vez de aplicar uma regra genérica.
- Prop de ícone: `icon?: ReactNode` (mais genérico) vs. `icon?: { data: IconData; colorFill?: boolean }` (mais estruturado) vs. `icon?: Widget?`. Decida um modelo estrutural único (ex.: sempre objeto com `data` + modificadores) antes de implementar em mais de uma plataforma, para não repetir a divergência que o Jake teve aqui.

## 4.4 Máscaras e validação (inputs)

- Prefira **função/callback** (TypeScript) ou **classe** (Dart) a enum fechado para `mask` e `valid` — oferece mais flexibilidade sem quebrar o contrato quando surgirem novos formatos.
- `mask` deve expor tanto o **dado cru (não formatado)** quanto o **dado mascarado**, para facilitar integração com formulários e APIs.
- Tipo de teclado/caractere aceito deve ter nome convergente entre as plataformas mobile (`keyboardType` no Flutter e RN), podendo divergir levemente na Web.
- Nomeie limite de caracteres como `maxLength` (alinhado ao nome já nativo em Flutter/RN), não `maxChars`.
- Evite reaproveitar um nome de atributo nativo (`type`) com significado diferente do nativo — quando isso é inevitável (Figma usava `type` para outlined/filled, mas `type` no HTML já significa tipo de caractere), renomeie a prop do DS (ex.: `style`) para eliminar a colisão semântica.

[◀ Voltar ao índice](./README.md)
