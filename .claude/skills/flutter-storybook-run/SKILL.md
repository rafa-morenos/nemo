---
name: flutter-storybook-run
description: Roda e testa o storybook Flutter do Nemo (packages/flutter/storybook) em emulador Android, simulador iOS ou macOS — lista dispositivos, sobe o app, tira screenshot e simula toques pra conferir stories. Específico do projeto Nemo em /Users/luisfelipeas5/Projects/nemo.
---

# Storybook Flutter — rodar e testar localmente

Use esta skill quando o mantenedor pedir pra rodar, abrir ou testar o storybook Flutter (`packages/flutter/storybook/`) — o app que mostra as stories dos widgets `nemo_flutter` (`NemoBadge`, `KanbanCard`, `KanbanTaskCard`, `ProductCard`).

**Projeto:** `/Users/luisfelipeas5/Projects/nemo/packages/flutter/storybook`

---

## Step 1 — Ver dispositivos disponíveis

```bash
flutter devices
```

Se não aparecer nenhum emulador/simulador rodando, liste e suba um:

```bash
flutter emulators
flutter emulators --launch <emulator-id>   # Android
open -a Simulator                          # iOS — depois `xcrun simctl list devices` pra achar o UDID booted
```

---

## Step 2 — Garantir dependências resolvidas

Só precisa rodar de novo se o `pubspec.yaml`/`pubspec.lock` mudou desde a última vez:

```bash
cd /Users/luisfelipeas5/Projects/nemo/packages/flutter/storybook && flutter pub get
```

---

## Step 3 — Rodar

`flutter run` é um processo longo e interativo (fica esperando `r`/`R`/`q` no stdin) — sempre rode em background. Um por dispositivo (não passar múltiplos `-d`, só o último é respeitado de forma inconsistente):

```bash
cd /Users/luisfelipeas5/Projects/nemo/packages/flutter/storybook
flutter run -d <device-id>       # ex.: emulator-5554 (Android), o UDID do simulador (iOS), ou "macos"/"chrome"
```

O comando estoura o timeout de 120s da ferramenta e migra pra background sozinho — isso é esperado, não é erro. Acompanhe com `TaskOutput` (block: true, timeout maior) até aparecer:

```
Flutter run key commands.
...
A Dart VM Service on <device> is available at: http://127.0.0.1:PORT/...
```

Isso confirma que subiu. Pra rodar em dois dispositivos ao mesmo tempo (ex. Android + iOS), dispare os dois comandos `flutter run` num único turno (chamadas paralelas), cada um vira uma task em background separada.

**Pra aplicar uma mudança de código:** `flutter run` não aceita hot reload via stdin nesta ferramenta (sem jeito de mandar teclas pro processo já rodando) — mate a task (`TaskStop`) e rode `flutter run` de novo. Isso reconstrói do zero e reseta qualquer estado em memória.

---

## Step 4 — Screenshot

**Android:**
```bash
adb -s <device-id> exec-out screencap -p > /caminho/screenshot.png
```

**iOS:**
```bash
xcrun simctl io <udid> screenshot /caminho/screenshot.png
```

Depois `Read` o arquivo pra ver o resultado.

---

## Step 5 — Navegar/simular toque (só Android via `adb`)

A UI do Widgetbook é uma barra de 3 abas no rodapé — **Navigation** (abre um bottom sheet com busca + árvore de `WidgetbookComponent`/`WidgetbookUseCase`), **Addons** e **Knobs** (painel dos controles do use case selecionado). Ao abrir o app, a tela inicial é a "Welcome to Widgetbook" (nenhum use case selecionado ainda) — toque em "Navigation" e depois no nome do use case desejado na árvore.

Pegue os bounds reais via `uiautomator` em vez de adivinhar coordenada a partir do screenshot redimensionado — **e lembre de multiplicar pelo fator de escala** (o screenshot que você vê já vem reduzido; a tag da imagem informa esse fator, ex. "displayed at 900x2000, multiply by 1.2"). Confirmado na prática: as abas do rodapé (Navigation/Addons/Knobs) expõem `content-desc`, mas os itens da árvore de componentes/use-cases **não** — não adianta filtrar por texto, pegue todo `clickable="true"` e localize pela posição relativa ao que apareceu no screenshot:

```bash
adb -s <device-id> shell uiautomator dump /sdcard/window_dump.xml
adb -s <device-id> shell cat /sdcard/window_dump.xml > /tmp/dump.xml
grep -o 'content-desc="[^"]*"[^>]*bounds="\[[0-9,]*\]\[[0-9,]*\]"' /tmp/dump.xml
```

`bounds="[x1,y1][x2,y2]"` — toque no centro:

```bash
adb -s <device-id> shell input tap $(( (x1+x2)/2 )) $(( (y1+y2)/2 ))
```

Pra fechar o teclado/IME que às vezes aparece grudado num campo de busca com foco:

```bash
adb -s <device-id> shell input keyevent KEYCODE_BACK
```

No iOS simulator não tem um equivalente direto de `adb shell input tap` via linha de comando — pra testar interação lá, valide a lógica no Android (o comportamento é 100% Dart/Flutter, não muda por plataforma) e só confirme visualmente no iOS com screenshot.

---

## Step 6 — Rodar os testes automatizados (sem precisar de emulador)

```bash
cd /Users/luisfelipeas5/Projects/nemo/packages/flutter/storybook && flutter test
```

Isso abre cada story (`test/stories_smoke_test.dart`) e falha em qualquer exception/overflow. Já carrega as fontes reais via `test/flutter_test_config.dart` — sem isso, o `flutter test` usa a fonte de placeholder "Ahem" (glifos artificialmente largos) e acusa overflow falso que não acontece no app de verdade.

---

## Contexto / decisões já tomadas (não precisa reaplicar, só pra entender o histórico)

- **É Widgetbook, não `storybook_flutter`** — a primeira versão deste storybook usava `storybook_flutter` (mesmo padrão que a Jake usa), migrada pro Widgetbook porque `storybook_flutter` está sem release há 2 anos (e tinha 2 bugs reais do próprio pacote: um ícone de "Layout" que travava a navegação sem saída em qualquer tela de celular, e um painel de plugin que quebrava com "No Directionality widget found" — nenhum dos dois existe no Widgetbook). Abordagem **manual** (`WidgetbookComponent`/`WidgetbookUseCase` direto em `main.dart`/`lib/stories/`), não a abordagem geradora (`@widgetbook.UseCase` + `build_runner`) — evita depender de codegen pra algo deste tamanho.
- **Sempre especifique o type argument em `context.knobs.object.dropdown<T>(...)`** (ex. `.dropdown<NemoBadgeSize>(...)`) — sem isso, a inferência de tipo do Dart pode inferir `T` errado (nullable) quando o parâmetro de destino (`NemoBadge.size`, por exemplo) é opcional, e isso já quebrou o `flutter analyze` uma vez (`unchecked_use_of_nullable_value`).
- **Fontes (`fonts/*.ttf`) são uma cópia local**, não uma referência a `packages/nemo_flutter/...` — motivo registrado em `docs/debitos-tecnicos.md` (fontes do `nemo_flutter` vivem fora de `lib/`, então esse prefixo não resolve).
