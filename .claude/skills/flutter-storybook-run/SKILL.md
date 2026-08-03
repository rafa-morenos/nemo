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

**Pra aplicar uma mudança de código:** `flutter run` não aceita hot reload via stdin nesta ferramenta (sem jeito de mandar teclas pro processo já rodando) — mate a task (`TaskStop`) e rode `flutter run` de novo. Isso reconstrói do zero e reseta qualquer estado em memória (útil, por exemplo, se algum `ChangeNotifier` do `storybook_flutter` ficou em estado inconsistente).

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

## Step 5 — Simular toque (só Android via `adb`)

Não adivinhe coordenada a partir do screenshot redimensionado — pegue os bounds reais via `uiautomator`:

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

## Contexto / armadilhas já resolvidas (não precisa reaplicar, só pra entender o histórico)

- **`storybook_flutter` é vendorizado** em `vendor/storybook_flutter/` (não é a versão do pub.dev) — o `pubspec.yaml` aponta `path: vendor/storybook_flutter`. O patch local esconde o ícone de "Layout" (`vendor/storybook_flutter/lib/src/plugins/layout.dart`): o modo "expanded" original do pacote trava a navegação em qualquer tela de celular (duas sidebars fixas de 250dp somam mais que a largura da tela, e some até a barra de ícones que resolveria isso — sem saída, só hot-restart). Como não tem mais o ícone, não tem como cair nessa armadilha de novo.
- **`main.dart` embrulha o `Storybook` inteiro num `Directionality(textDirection: TextDirection.ltr)`** — sem isso, o painel do plugin de Logging (ícone `"`) quebra com "No Directionality widget found" (o `MaterialApp` do `nemoWrapperBuilder` só cobre o conteúdo de cada story, não a moldura do Storybook ao redor).
- **Fontes (`fonts/*.ttf`) são uma cópia local**, não uma referência a `packages/nemo_flutter/...` — motivo registrado em `docs/debitos-tecnicos.md` (fontes do `nemo_flutter` vivem fora de `lib/`, então esse prefixo não resolve).
