---
name: nemo-design
description: Gera telas, protótipos, mockups, componentes e documentos com a identidade visual da Daki usando o Nemo (design system da Daki — marca azul, tokens do Figma, componentes reais). Use sempre que pedirem algo visual "da Daki", "no padrão Daki", "com o Nemo", "do app Daki", "do HUBR", uma tela/fluxo do app de mercado (pedido, carrinho, sacola, entrega, rastreio, produto, checkout), um artifact/HTML com a marca da Daki, ou um doc/deck/relatório que precise das cores e componentes oficiais.
---

# Nemo — design system da Daki

O Nemo é a fonte única de tokens (Figma) e componentes da Daki (web, React Native, Flutter). Esta skill
deixa você produzir **visual fiel à produção** em chat: sem inventar cor, componente ou ícone.

## Arquivos desta skill

- `reference/nemo.llm.md` — **leia antes de gerar**. Regras, papéis de cor (claro/escuro), escalas,
  todos os componentes com as classes reais de produção, props, exemplos e a lista de ícones. É grande
  (~130 KB): leia as seções "Regras de ouro", "Cores de papel" e "Escalas" inteiras, e de "Componentes"
  só os que a tarefa usa (busque por `### <Nome>`).
- `assets/nemo.js` — runtime: tokens claro/escuro + fonte Inter + tema do Tailwind CDN.
- `assets/nemo-icons.js` — ícones oficiais (`<i data-nemo-icon="nome">`).
- `assets/nemo.css` — os mesmos tokens como CSS puro.

## Fluxo

1. **Entenda o pedido** — tela de app (mobile), página web, documento ou deck? Quais componentes
   do Nemo cobrem isso (NavigationBar, ProductTile, AddToCartButton, Badge, Card, Button, Toast…)?
2. **Leia o necessário** em `reference/nemo.llm.md`.
3. **Gere** seguindo o modo certo (abaixo). Reaproveite a marcação/classes dos componentes, não
   redesenhe. Conteúdo realista em pt-BR do contexto Daki.
4. **Confira antes de entregar**:
   - nenhuma cor hex/paleta padrão do Tailwind no lugar de papel do Nemo;
   - todo fundo com o seu `-foreground` correspondente;
   - funciona no tema escuro (os tokens trocam sozinhos; não escreva `dark:` com cores próprias);
   - foco visível, `aria-label` em botão só-ícone, `aria-current` no item ativo, `aria-hidden` em
     ícone decorativo;
   - se precisou de algo que o Nemo não tem, diga isso explicitamente em vez de inventar um token.

## Modos de saída

**A. HTML/artifact (padrão).** No `<head>`, nesta ordem:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/gh/rafa-morenos/nemo@main/packages/ai-kit/dist/nemo.js"></script>
<script src="https://cdn.jsdelivr.net/gh/rafa-morenos/nemo@main/packages/ai-kit/dist/nemo-icons.js"></script>
```

Use as classes de papel (`bg-primary`, `text-muted-foreground`, `bg-success-soft` …) e as receitas dos
componentes.

**B. Ambiente que bloqueia scripts externos.** Se o destino não aceita esses domínios, faça um
arquivo autocontido: cole o conteúdo de `assets/nemo.css` num `<style>` e estilize com
`var(--nemo-color-…)` / `var(--nemo-space-…)` / `var(--nemo-radius-…)`; ícones: copie o SVG de
`assets/nemo-icons.js` (objeto `ICONS`, chave = nome do ícone).

**C. Documentos, planilhas, slides, imagens (docx/pptx/xlsx/PDF/gráficos).** Use os valores hex das
tabelas "Cores de papel" / "Tokens de alias" (coluna Claro, salvo pedido de tema escuro):
`primary` para destaque e série principal, `foreground` para texto, `muted-foreground` para apoio,
`border` para linhas, os tons `success`/`warning`/`destructive`/`info` para status. Títulos em Owners
Text se disponível, senão Inter.

**D. Código para os repositórios da Daki.** Não escreva HTML: importe de `@nemo/web` (React),
`packages/react-native` ou `nemo_flutter`, com as props listadas no catálogo.
