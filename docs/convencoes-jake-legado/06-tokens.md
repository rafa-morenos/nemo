[◀ Voltar ao índice](./README.md)

# 6. Tokens (cor, tipografia, espaçamento, borda)

> **Nota importante:** os tokens do Nemo podem ter sido redesenhados desde a criação deste documento. As convenções abaixo — especialmente a divisão em camadas (base vs. semântico de componente) e a estrutura de sub-categorias de nomenclatura — refletem como o Jake organizava tokens e **podem não caber diretamente na nova estrutura**. Trate esta seção como referência de raciocínio e de problemas já enfrentados, não como um modelo obrigatório a replicar.

## 6.1 Arquitetura de duas camadas

1. **Tokens de propriedade base** (fundação): cor, tipografia, espaçamento, borda, opacidade, z-index — fonte única de verdade em JSON, formato Style Dictionary, organizados por categoria.
2. **Tokens semânticos de componente**: camada acima dos tokens base, específica por componente, vivendo dentro da própria lib de componentes de cada plataforma — nunca duplicar valor, sempre referenciar o token base.

Todo componente deve consumir exclusivamente tokens semânticos (camada 2), nunca a paleta bruta ou tokens de fundação diretamente.

## 6.2 Cor

- Toda cor usada em produto deve ter alias semântico documentado — não usar direto da paleta bruta.
- Regra ainda sem consenso fechado no Jake: se tokens `interactive-*` deveriam ser usados só em backgrounds/bordas e nunca em texto. Trate texto interativo (ex.: label de um botão) como exceção pontual a avaliar caso a caso, não como regra geral — decida isso de forma explícita e documentada ao definir os tokens do novo DS, em vez de deixar em aberto como no Jake.
- Variações visuais de estado (ex.: tom mais escuro no estado `active`) devem ser produzidas por **opacidade sobreposta à cor base**, não por criação de um novo token de cor por estado — mantém a paleta enxuta.
- Sempre que uma borda existe conceitualmente (mesmo que visualmente imperceptível em uma variante específica), crie o token de borda dedicado mesmo assim — evita "pulos" de layout entre estados/variantes que teriam ou não borda visível.

## 6.3 Tipografia

- Separe conceitualmente **typography system** (tokens de baixo nível: font-size, weight, line-height) de **typography components** (composições usadas nos componentes, ex. `Hero`, `body-lg-regular`) — os components consomem o system por nome de token, não por valor fixo, permitindo variar o valor por marca sem quebrar a composição semântica.
- Diretriz de line-height por categoria (equilíbrio entre "respiro" de leitura e compacidade):
  - Títulos/Display: 1.5–1.7 (150–170%)
  - Corpo de texto/parágrafo: 1.2–1.3 (120–130%)
  - Labels (texto normalmente em uma linha): 1.0–1.2 (100–120%)
- **Atenção a um problema conhecido e não resolvido no Jake:** Flutter e React Native podem reagir de forma diferente a certos valores de line-height vindos do Figma, causando desalinhamento vertical (baseline) do texto entre plataformas. Ao validar um componente novo com texto, teste explicitamente o alinhamento vertical nas 3 plataformas antes de considerar o componente pronto.
- Tokens de tipografia tendem a ser **"design only"**: bibliotecas de UI de terceiros (ex. Chakra) frequentemente não aceitam o token composto como bloco único — pode ser necessário quebrar em sub-propriedades (`font-size`, `line-height`, `font-weight`, `letter-spacing`) na integração.

## 6.4 Espaçamento e unidades

- Tokens de espaçamento nomeados em **REM** na Web (CSS/SCSS/JS) — mas React Native não trabalha com unidades px/rem (usa cálculo baseado em densidade de pixels do dispositivo), então lá o valor final é number puro, sem sufixo de unidade. Para Flutter, gere um transform dedicado de rem para double.
- Onde uma unidade não tem suporte direto numa plataforma (ex.: `border-radius` em porcentual não é suportado no Flutter), use o valor numérico equivalente já usado por outro token (ex.: reaproveitar o valor de `pill`), mantendo o token semântico redundante mas explícito.

## 6.5 Geração multi-plataforma (Style Dictionary)

- Centralize os tokens base em JSON e gere saídas por plataforma via Style Dictionary com transforms/formats customizados por necessidade de cada plataforma (nomeação kebab/camel, conversão de unidade, geração de classe única no Flutter, etc.).
- Cada plataforma deve ter seu próprio pacote de saída de tokens, consumido pela lib de componentes daquela plataforma — a lib de componentes nunca deve depender diretamente do JSON bruto.

[◀ Voltar ao índice](./README.md)
