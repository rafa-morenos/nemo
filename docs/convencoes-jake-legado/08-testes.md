[◀ Voltar ao índice](./README.md)

# 8. Testes

- **React (Web e Native):** Jest + Testing Library, arquivo `*.spec.tsx` ao lado do componente. Estrutura: `describe('<Componente />')` → `describe('when <condição>')` → `it('should <efeito esperado>')`. Priorize testes comportamentais via papel/acessibilidade (`getByRole`, `toBeDisabled()`) a snapshot testing.
- **Flutter:** `flutter_test` + mock library (ex. `mocktail`), arquivos `_test.dart` em árvore espelhada dentro de `test/` (fora de `lib/`). Use uma função helper de setup (ex. `pumpButton(...)`) que monta o widget com defaults sobrescrevíveis, agrupando os casos com `group("NomeComponente /", () {...})`.
- Nenhuma plataforma deve depender só de teste manual/visual — todo componente com estados/variantes precisa de cobertura automatizada mínima antes de ser considerado pronto.

[◀ Voltar ao índice](./README.md)
