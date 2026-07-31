[◀ Voltar ao índice](./README.md)

# 11. Lint, Format, Commits e CI

- **Conventional Commits obrigatório**, validado via hook de commit-msg (ex. commitlint com `@commitlint/config-conventional`). Tipos padrão: `feat`, `fix`, `build`, `ci`, `docs`, `perf`, `refactor`, `style`, `test`, `chore`.
- **Prettier** com configuração fixa entre projetos (ex.: `printWidth: 80`, `semi: true`, `singleQuote: true`, `tabWidth: 2`, `trailingComma: "all"`) e **EditorConfig** garantindo LF + UTF-8 + indentação de 2 espaços entre editores.
- **ESLint** com base compartilhada por tipo de projeto (ex. `eslint-react.js`, `eslint-react-native.js`, `eslint-next.js`), estendendo um preset consolidado (ex. Airbnb + import/order automático via `simple-import-sort`), com overrides específicos para arquivos de teste (ex. habilitando regras de `testing-library`/`jest` só em `*.spec.*`).
- **Hook de pre-commit** rodando lint-staged (prettier --write + eslint --fix apenas nos arquivos staged) — nunca formatar/lintar o repo inteiro a cada commit.
- **CI obrigatório em todo PR**: build → lint → test, escopado apenas aos pacotes afetados pela mudança (ex. via Turborepo com filtro baseado no branch base), não o monorepo inteiro — importante para manter o CI rápido conforme o número de componentes cresce.
- **Template de PR** deve exigir explicitamente: tipo de mudança (espelhando os tipos de Conventional Commits), código formatado, testes passando, documentação atualizada, versão do pacote atualizada seguindo SemVer, e **aprovação de pelo menos duas pessoas**: alguém do fórum/time de design system + alguém da squad autora do PR.
- **CODEOWNERS** pode ser genérico no nível do repositório (ex. time de engenharia responsável pelo monorepo como um todo), sem necessidade de dono por componente/pasta individual, a menos que o time cresça muito.

[◀ Voltar ao índice](./README.md)
