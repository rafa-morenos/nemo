[◀ Voltar ao índice](./README.md)

# 10. Versionamento e publicação

- Adote **Semantic Versioning (SemVer)** integralmente: nova feature (novo valor de token, novo componente, novo comportamento) → incremento de **minor**; correção → incremento de **patch**; breaking change → incremento de **major**.
- Gere o changelog automaticamente a partir dos commits (Conventional Commits), mantendo `CHANGELOG.md` atualizado a cada publicação.
- Três estágios de release:
  - **Alpha** (`v1.1.0-alpha.1`): opcional, para grupo fechado de quem está desenvolvendo/corrigindo, instável, não deve ser usada por times externos ao DS.
  - **Beta** (`v1.1.0-beta.1`): **obrigatória**, para squads que se disponibilizem a testar, buscando feedback inicial antes da versão final; pode durar semanas/meses conforme complexidade; pode conter breaking changes.
  - **Latest/estável** (`v1.1.0`): versão final para uso geral pelas squads.
- Adote faseamento por versão do próprio componente (v1/v2/v3) para escopos grandes: declare explicitamente o que é obrigatório na v1 (anatomia mínima, variante/tamanho essenciais, estados essenciais) e o que fica para v2/v3 (anatomia estendida, novos tipos, novos comportamentos) — isso evita breaking changes por tentar entregar o componente "completo" de uma vez.
- Publicação é sempre **manual**, feita por alguém do time de design system, depois que o CI (build/lint/test) passar — nunca automática a partir do merge.

[◀ Voltar ao índice](./README.md)
