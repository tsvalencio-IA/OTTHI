# Arquitetura modular — OTTHI World Edu V642

## Regra central

O navegador carrega `app.js` e `style.css`, que são bundles gerados. A fonte editável fica em `src/modules/` e `src/styles/`.

Essa estratégia mantém o mesmo escopo fechado do motor legado e evita quebrar as 544 funções por mudança de escopo. Ao mesmo tempo, cada domínio fica em arquivo separado e rastreável.

## Como uma alteração vira runtime

1. Edite o módulo correto em `src/modules/` ou `src/styles/`.
2. Faça o commit pelo GitHub.
3. O workflow `Build modular OTTHI World Edu` executa `tools/build_project.py`.
4. O workflow gera e valida `app.js` e `style.css`.
5. Os bundles são commitados automaticamente.
6. O GitHub Pages publica a versão nova.

## Por que o bundle ainda existe

O motor original usa centenas de funções e variáveis em um único escopo lexical. Carregar os módulos como scripts independentes mudaria esse escopo e poderia criar falhas silenciosas. O build preserva a equivalência funcional e permite modularização segura.

## Arquivos de fonte

- `src/module-order.json`: ordem oficial e checksums.
- `src/modules/*.js`: 31 módulos JavaScript.
- `src/styles/*.css`: 11 módulos CSS.
- `tools/build_project.py`: compilação sem npm.
- `tools/audit_source.py`: inventários e checklist.

## Regra de correção futura

Nunca editar apenas `app.js` ou `style.css`, porque a próxima compilação substituirá a alteração. A correção deve ser feita no módulo-fonte correspondente.
