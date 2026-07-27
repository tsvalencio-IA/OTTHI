# Validação estrutural automática — V643

- Resultado: **APROVADO**
- Verificações: **64 aprovadas / 0 falhas**

## Verificações

- [x] Arquivo obrigatório index.html
- [x] Arquivo obrigatório app.js
- [x] Arquivo obrigatório style.css
- [x] Arquivo obrigatório sw.js
- [x] Arquivo obrigatório manifest.webmanifest
- [x] Arquivo obrigatório firebase-config.js
- [x] Arquivo obrigatório firebase-database.rules.json
- [x] Arquivo obrigatório athos.glb
- [x] Arquivo obrigatório VERSION.json
- [x] Arquivo obrigatório src/module-order.json
- [x] Arquivo obrigatório tools/build_project.py
- [x] Arquivo obrigatório tools/verify_equivalence.py
- [x] Arquivo obrigatório tools/validate_project.py
- [x] Arquivo obrigatório tools/test_v643_mobility.js
- [x] Arquivo obrigatório tools/test_v643_world_systems.py
- [x] Arquivo obrigatório .github/workflows/build-modular-app.yml
- [x] Arquivo obrigatório .github/workflows/gerar-apk.yml
- [x] Arquivo obrigatório android-app/app/build.gradle
- [x] Arquivo obrigatório assets/textures/water-ripples-v643.png
- [x] Arquivo obrigatório docs/CHECKLIST-ATUALIZACAO-V643.md
- [x] 31 módulos JavaScript — 31
- [x] 12 módulos CSS — 12
- [x] Manifesto JS completo
- [x] Manifesto CSS completo
- [x] Ordem JS corresponde aos arquivos
- [x] Ordem CSS corresponde aos arquivos
- [x] Sintaxe app.js
- [x] Sintaxe sw.js
- [x] 12 testes determinísticos de mobilidade V643 — ┌─────────┬──────────────────────────────────────────────────────────┬────────────┐
│ (index) │ teste                                                    │ resultado  │
├─────────┼──────────────────────────────────────────────────────────┼────────────┤
│ 0       │ 'Carro acelera apenas pelo botão'                        │ 'APROVADO' │
│ 1       │ 'Carro: comando direita produz curva visual à direita'   │ 'APROVADO' │
│ 2       │ 'Carro: comando esquerda produz curva visual à esquerda' │ 'APROVADO' │
│ 3       │ 'Carro: curvas laterais são simétricas e opostas'        │ 'APROVADO' │
│ 4       │ 'Carro: Freio reduz a velocidade antes da ré'            │ 'APROVADO' │
│ 5       │ 'Carro: botão Freio/Ré engata ré depois de parar'        │ 'APROVADO' │
│ 6       │ 'Carro: Acelerar freia a ré e volta ao avanço'           │ 'APROVADO' │
│ 7       │ 'Barco acelera apenas pelo botão'                        │ 'APROVADO' │
│ 8       │ 'Barco: comando direita produz curva visual à direita'   │ 'APROVADO' │
│ 9       │ 'Barco: comando esquerda produz curva visual à esquerda' │ 'APROVADO' │
│ 10      │ 'Barco: Freio reduz antes da ré'                         │ 'APROVADO' │
│ 11      │ 'Barco: Freio/Ré engata ré após parar'                   │ 'APROVADO' │
└─────────┴──────────────────────────────────────────────────────────┴────────────┘
{"passed":12,"failed":0}
- [x] Sintaxe assets/js/core/performance-guardian.js
- [x] Sintaxe assets/js/core/runtime-config.js
- [x] Sintaxe assets/js/core/safe-pointer.js
- [x] Sintaxe assets/js/core/viewport-manager.js
- [x] Sintaxe assets/js/education/adaptive-learning.js
- [x] Sintaxe assets/js/game-account.js
- [x] Sintaxe assets/js/multiplayer/room-manager.js
- [x] Sintaxe assets/js/multiplayer-rtdb.js
- [x] Sintaxe assets/js/safety/child-safety.js
- [x] Sintaxe assets/js/save-db.js
- [x] Sintaxe assets/js/ui/shared-modal.js
- [x] JSON manifest.webmanifest
- [x] JSON firebase-database.rules.json
- [x] JSON VERSION.json
- [x] JSON src/module-order.json
- [x] IDs HTML únicos — []
- [x] Referências locais existem — []
- [x] Versão 643 no index — 15
- [x] GitHub Pages OTTHI
- [x] Chaves CSS balanceadas — 1786/1786
- [x] 552 funções nomeadas — 552
- [x] Runtime V643
- [x] Save V643 e migração V642
- [x] Token V643 mobilityThrottleIntent
- [x] Token V643 const steer=Math.abs(ix)<.06?0:-ix
- [x] Token V643 const steer=Math.abs(ix)<.07?0:-ix
- [x] Token V643 Acelerar
- [x] Token V643 Freio
- [x] Token V643 createShoreFishingLife
- [x] Token V643 trafficPriority
- [x] Token V643 busSpawnIndex
- [x] Token V643 water-ripples-v643.png
- [x] Service Worker V643
- [x] Android V643
- [x] Preservação V642/V643 aprovada

## Limites

- Não substitui teste físico de sensibilidade do joystick, orientação instalada, multiplayer em dois aparelhos, AR e APK.
- O teste determinístico usa diretamente as funções de física extraídas dos módulos V643.
