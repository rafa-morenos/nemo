---
name: react-native-storybook-run
description: Roda e testa o storybook React Native do Nemo (packages/react-native/storybook) em emulador Android ou simulador iOS — lista dispositivos, builda/sobe o app com @storybook/react-native, tira screenshot e simula toques pra conferir stories.
---

# Storybook React Native — rodar e testar localmente

Use esta skill quando o mantenedor pedir pra rodar, abrir ou testar o storybook React Native (`packages/react-native/storybook/`) — o app Expo que mostra as stories dos componentes `@nemo/react-native` (`Badge`, `KanbanCard`, `KanbanTaskCard`, `ProductCard`).

Todos os caminhos abaixo são relativos à raiz do repositório. Todos os comandos `cd`/`npx`/`npm` assumem que você já está (ou entrou) em `packages/react-native/storybook`, exceto quando indicado o contrário.

---

## Step 0 — Node correto

O Expo CLI precisa de Node ≥20 (versões mais antigas dão `ReferenceError: File is not defined`). Confirme com `node -v`; se estiver abaixo de 20, troque via `nvm`:

```bash
nvm use 20   # ou qualquer versão ≥20 instalada (`nvm ls` pra ver as disponíveis)
```

Se `nvm use` falhar com um erro sobre `prefix`/`globalconfig` incompatível (comum quando `~/.npmrc` tem um `prefix` global configurado) — **não edite o `.npmrc`**. Em vez disso, sobrescreva `PATH`/`npm_config_prefix` manualmente pra apontar pro Node certo antes de rodar os comandos desta skill:

```bash
export PATH="$(nvm which 20 | xargs dirname):$PATH"
export npm_config_prefix="$(dirname "$(nvm which 20 | xargs dirname)")"
node -v   # confirme que mudou
```

---

## Step 1 — Dependências (só se mudou desde a última vez)

```bash
npm run build:tokens                      # na raiz do repo — gera build/rn/theme.{light,dark}.ts, que theme.tsx do @nemo/react-native importa
cd packages/react-native/storybook && npm install --legacy-peer-deps
```

`--legacy-peer-deps` é necessário: o template do `@storybook/react-native` pina uma faixa de `react-native-reanimated` que não resolve limpo via `npm install` puro. `@nemo/react-native` está linkado como `file:..` (fica um symlink em `node_modules/@nemo/react-native`) — se algo parecer quebrado, confirme com `ls -la node_modules/@nemo/react-native`.

---

## Step 2 — Ver dispositivos disponíveis

```bash
adb devices                                          # Android — precisa de pelo menos um "device"
xcrun simctl list devices available | grep Booted    # iOS — pega o UDID do simulador já aberto
```

Se não tiver nenhum rodando: `emulator -list-avds` + `emulator -avd <nome> &` (Android — `emulator` fica em `$ANDROID_HOME/emulator`), ou `open -a Simulator` (iOS, depois `xcrun simctl list devices` pra achar o UDID booted).

---

## Step 3 — Porta do Metro: não assuma 8081 livre

Se houver outro projeto React Native/Expo com Metro já rodando localmente (comum em máquinas com vários repos abertos), ele pode estar ocupando a 8081 — se o nosso app cair nele por engano, o dev client mostra uma tela vermelha citando um module path de outro repo (`.../ (algum outro projeto) /.`). Teste antes:

```bash
lsof -iTCP -sTCP:LISTEN -n -P | grep 808
```

Se a 8081 estiver ocupada, use outra porta em **todos** os comandos abaixo (ex. `8082` pra Android, `8083` pra iOS — os dois builds podem rodar em paralelo, cada um na sua porta).

---

## Step 4 — Rodar Android

**Primeira vez (ou depois de mudar código nativo/dependência nova):**

```bash
EXPO_PUBLIC_STORYBOOK_ENABLED=true npx expo run:android --port 8082
```

Builda o APK debug via Gradle e instala — a porta passada aqui fica de fato embutida no app. É um processo longo (primeira vez ~3-5min; com cache do Gradle, ~15s): rode em background e acompanhe o log até `BUILD SUCCESSFUL` + `Opening storybook://expo-development-client/?url=...`.

**Depois (só JS mudou, app nativo já instalado):**

```bash
EXPO_PUBLIC_STORYBOOK_ENABLED=true npx expo start --android --dev-client --port 8082
```

⚠️ **Sempre inclua `--dev-client`** — sem essa flag, `expo start --android` abre no **Expo Go** (e tenta instalar do Play Store) em vez do dev client custom que tem os módulos nativos (`reanimated`/`worklets`/etc). `expo-dev-client` não é dependência explícita do `package.json`, então o CLI não detecta automaticamente que deveria usá-lo — os scripts `storybook:android`/`storybook:ios` do `package.json` **não** têm essa flag, não confie neles sozinhos pra esse cenário.

**Se a tela ficar em branco/travada no splash, ou aparecer 404 citando outro projeto:** o app guardou a URL de um dev server antigo (ex. de um teste anterior numa porta diferente). Limpa e reabre (troque a porta no `-d` pela que você está usando):

```bash
adb shell pm clear com.anonymous.storybook
adb shell am force-stop com.anonymous.storybook
adb shell am start -W -a android.intent.action.VIEW -d "storybook://expo-development-client/?url=http%3A%2F%2F127.0.0.1%3A8082" com.anonymous.storybook
```

---

## Step 5 — Rodar iOS

```bash
EXPO_PUBLIC_STORYBOOK_ENABLED=true npx expo run:ios --port 8083 --device "<UDID-do-simulador>"
```

⚠️ **Diferente do Android, a porta passada aqui não é garantia.** Na prática, o app pode continuar batendo em `127.0.0.1:8081` mesmo assim (o dev client parece ignorar a query `?url=` da deep link nessa combinação de versões). Se a tela vermelha de erro mencionar outro projeto, force a porta certa direto na preferência que o React Native lê em runtime — isso resolveu de forma confiável:

```bash
xcrun simctl spawn <UDID> defaults write com.anonymous.storybook RCT_jsLocation "127.0.0.1:8083"
xcrun simctl terminate <UDID> com.anonymous.storybook
xcrun simctl launch <UDID> com.anonymous.storybook
```

Confirme com screenshot (Step 6) depois de qualquer uma dessas tentativas.

---

## Step 6 — Screenshot

```bash
adb -s <device-id> exec-out screencap -p > /caminho/screenshot.png       # Android
xcrun simctl io <UDID> screenshot /caminho/screenshot.png                # iOS
```

Depois `Read` o arquivo pra ver o resultado.

---

## Step 7 — Navegar/simular toque (só Android)

A UI do `@storybook/react-native` tem uma barra no rodapé: texto "Components/…/…" (nome da story atual) + um botão que abre a árvore de stories e um botão **"Open addons panel"** (`resource-id="mobile-addons-button"`, abre o painel Notes/Controls/Backgrounds/Actions — abre com "Notes" selecionado por padrão, precisa tocar em "Controls" separadamente).

Pegue os bounds reais via `uiautomator` em vez de adivinhar coordenada a partir do screenshot redimensionado — **lembre de multiplicar pelo fator de escala** informado na tag da imagem (ex. "displayed at 900x2000, multiply by 1.2" → coordenada real = coordenada-na-imagem × 1.2):

```bash
adb -s <device-id> shell uiautomator dump /sdcard/window_dump.xml
adb -s <device-id> pull /sdcard/window_dump.xml /tmp/dump.xml
grep -o 'resource-id="mobile-addons-button"[^>]*bounds="[^"]*"' /tmp/dump.xml
grep -o 'text="[^"]*"[^>]*bounds="[^"]*"' /tmp/dump.xml | grep -v 'text=""'   # tabs (Notes/Controls/Backgrounds/Actions), nomes de story no menu
```

`bounds="[x1,y1][x2,y2]"` — toque no centro:

```bash
adb -s <device-id> shell input tap $(( (x1+x2)/2 )) $(( (y1+y2)/2 ))
```

No iOS simulator não tem um equivalente direto de `adb shell input tap` via linha de comando (a menos que `idb`/`idb_companion` esteja instalado) — pra testar interação, valide a lógica no Android (a UI é 100% JS/React, não muda por plataforma) e só confirme visualmente no iOS com screenshot.

---

## Contexto / decisões já tomadas (não precisa reaplicar, só pra entender o histórico)

- **`@storybook/react-native` (on-device via Metro)** é o alvo real, não a variante web/Vite (`@storybook/react-native-web-vite`, também scaffolded em `.storybook/` pelo template, roda via `npm run build-storybook`/`storybook:web`) — essa segunda tem um bug conhecido de resolução de `react-native-web` pra arquivos fora da árvore do app (nossas stories vivem em `packages/react-native/src/`, linkado via symlink); documentado como comentário em `.storybook/main.ts`, não vale tentar resolver de novo.
- **Stories vivem em `packages/react-native/src/*.stories.tsx`**, ao lado de cada componente (mesma convenção do `packages/web`) — não dentro de `packages/react-native/storybook/`. `.rnstorybook/main.ts` (on-device) e `.storybook/main.ts` (web) apontam o glob pra lá (`../../src/**/*.stories.tsx`).
- **`metro.config.js`** tem `resolver.unstable_enableSymlinks = true` + `watchFolders`/`nodeModulesPaths` estendidos até a raiz do monorepo — sem isso o Metro não segue o symlink de `@nemo/react-native`, não acha `build/rn/theme.*` (fica fora de qualquer `node_modules`) nem `react`/`react-native` (instalados só em `storybook/node_modules`, não em `packages/react-native/`, que é onde os arquivos `.stories.tsx` fisicamente residem).
- **`argTypes.matchers.color` foi removido** do `preview.tsx` (on-device e web) — o default do template dá controle de "color picker" pra qualquer prop terminada em `color`/`background`, mas os `color` do Nemo são enums semânticos (`"default"|"success"|...`), não valores de cor literal. Cada story declara `argTypes.<prop> = {control:"select", options:[...]}` explicitamente pras props enum, e `meta.args` com os defaults reais do componente (sem isso o painel Controls mostra a caixa vazia até o primeiro toque manual, mesmo a prévia já renderizando com o default certo).
- **Bundle/package id `com.anonymous.storybook`** — default do Expo quando não há id customizado no `app.json`. Se aparecer comportamento "fantasma" (URL de dev server errada já na primeira instalação, sem explicação), pode ser outro app antigo com o mesmo id nesse dispositivo — `pm clear`/`simctl uninstall` antes de rebuildar costuma resolver.
