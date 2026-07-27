# Índice técnico — OTTHI World Edu V642

## Fonte editável

- `src/modules/` — 31 módulos JavaScript.
- `src/styles/` — 11 módulos CSS.
- `src/module-order.json` — ordem de montagem e hashes.

## Build e validação

- `tools/build_project.py` — gera `app.js` e `style.css`.
- `tools/audit_source.py` — inventário estático.
- `tools/deep_inventory.py` — inventário profundo e checklists literais.
- `tools/verify_equivalence.py` — compara V642 com o baseline V641.
- `tools/validate_project.py` — valida arquivos, sintaxe, HTML, CSS, Service Worker e equivalência.

## Arquitetura e módulos

- `ARQUITETURA-MODULAR-V642.md`
- `MAPA-DE-MODULOS.md`
- `RELATORIO-EQUIVALENCIA-V641-V642.md`
- `VALIDACAO-ESTRUTURAL-V642.md`
- `RELATORIO-TESTE-NAVEGADOR-V642.md`

## Checklists completos

- `CHECKLIST-COMPLETO-FUNCOES-JOGABILIDADES.md`
- `CHECKLIST-544-FUNCOES.md`
- `CHECKLIST-FLUXO-IF-ELSE-SWITCH-LOOPS.md`
- `CHECKLIST-236-EVENTOS.md`
- `CHECKLIST-262-NOS-HTML.md`
- `MATRIZ-COMPLETA-JOGABILIDADES-E-TESTES.md`

## Dados para análise por planilha ou script

- `INVENTARIO-FUNCOES.csv/json`
- `INVENTARIO-FUNCOES-DETALHADO.csv/json`
- `INVENTARIO-CONDICOES.csv`
- `INVENTARIO-CONDICOES-DETALHADO.csv`
- `INVENTARIO-ARROW-CALLBACKS.csv`
- `INVENTARIO-EVENTOS.csv`
- `INVENTARIO-EVENTOS-DETALHADO.csv`
- `INVENTARIO-VARIAVEIS-TOPO.csv`
- `INVENTARIO-NOS-HTML.csv`
- `INVENTARIO-CALLABLES.csv`
- `DEPENDENCIAS-MODULOS.csv`

## Runtime

O navegador continua carregando `app.js` e `style.css`. Eles são gerados e não são a fonte principal. Isso preserva o único escopo lexical usado pelo motor legado, evitando perda silenciosa de dependências entre as 544 funções.
