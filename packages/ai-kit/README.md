# Nemo AI kit

Leva o Nemo para quem gera telas, protótipos e docs **por chat** (Claude, ChatGPT, Cursor…), sem acesso ao repo.

Tudo em `dist/` é **gerado** por `build.mjs` a partir do código real (tokens do Figma, `tailwind.preset.js`, componentes web + stories, ícones `icons-DakiApp`). Não edite `dist/` à mão. A única parte escrita à mão é `src/guidelines.md` (as regras que abrem o `nemo.llm.md`).

```bash
npm run build          # tokens + ai-kit
npm run build:ai-kit   # só o kit (exige build/web/ gerado)
```

| Arquivo | Pra quê |
|---|---|
| `nemo.llm.md` | Contexto único pra IA: regras, papéis de cor (claro/escuro), escalas, tokens, catálogo de componentes com as classes reais, ícones. Anexe no chat, no conhecimento de um Project/GPT ou numa Skill. |
| `nemo.js` | Runtime pra HTML gerado em chat: injeta os tokens (claro/escuro automático), a fonte Inter e configura o Tailwind CDN com o preset do Nemo. Carregar **depois** de `cdn.tailwindcss.com`. |
| `nemo-icons.js` | `<i data-nemo-icon="tabbar-home" class="size-6"></i>` → SVG oficial. |
| `nemo.css` | Os mesmos tokens como folha de estilo, pra contextos sem Tailwind. |
| `tailwind.preset.js` | O preset original (cópia), pra qualquer setup Tailwind v3. |

`examples/acompanhar-pedido.html` é uma tela montada só com o kit. Pra abrir: `preview_start({ name: "ai-kit" })` → `/examples/acompanhar-pedido.html`.

## URL pública

Artifacts do Claude só carregam scripts de jsDelivr/unpkg/cdnjs. O guia aponta para
`https://cdn.jsdelivr.net/gh/rafa-morenos/nemo@main/packages/ai-kit/dist/`, e isso **só funciona com o repo público** (ou publicando o kit no npm). Para usar outra origem, defina `NEMO_AI_KIT_BASE=<url>` antes do build.

A fonte Owners é proprietária e **não** vai no kit. Fora dos apps da Daki, títulos caem para Inter.
