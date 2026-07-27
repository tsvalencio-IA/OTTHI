# Validação estrutural automática — V644

- Resultado: **APROVADO**
- Verificações: **87 aprovadas / 0 falhas**

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
- [x] Arquivo obrigatório tools/test_v644_neighborhoods.py
- [x] Arquivo obrigatório .github/workflows/build-modular-app.yml
- [x] Arquivo obrigatório .github/workflows/gerar-apk.yml
- [x] Arquivo obrigatório android-app/app/build.gradle
- [x] Arquivo obrigatório assets/textures/water-ripples-v643.png
- [x] Arquivo obrigatório docs/CHECKLIST-ATUALIZACAO-V643.md
- [x] Arquivo obrigatório docs/RELATORIO-TESTE-BAIRROS-V644.md
- [x] Arquivo obrigatório docs/RELATORIO-TESTE-BAIRROS-V644.json
- [x] Arquivo obrigatório src/modules/31-neighborhood-world-controller.js
- [x] Arquivo obrigatório src/styles/13-neighborhood-world-map-v644.css
- [x] 32 módulos JavaScript — 32
- [x] 14 módulos CSS — 14
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
- [x] 34 testes de mundo V643 — {
  "version": 643,
  "passed": true,
  "counts": {
    "passed": 34,
    "failed": 0,
    "total": 34
  },
  "checks": [
    {
      "name": "Cinco pescadores de margem",
      "passed": true,
      "detail": "5"
    },
    {
      "name": "Pesca viva: createShoreFisher",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Pesca viva: createShoreFishingLife",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Pesca viva: updateShoreFishers",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Pesca viva: fishingActivity",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Pesca viva: bobber",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Pesca viva: line.geometry.attributes.position.needsUpdate",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Pesca viva criada na expansão do lago",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Textura de água PNG válida",
      "passed": true,
      "detail": "(512, 512)"
    },
    {
      "name": "Textura de água usada no material",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Frota inicial limitada",
      "passed": true,
      "detail": "{'solar': 2, 'verde': 2, 'escolar': 1, 'circular': 1, 'turismo': 1}"
    },
    {
      "name": "Circular da Cidade com uma unidade",
      "passed": true,
      "detail": "1"
    },
    {
      "name": "Trânsito: trafficPriority",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Trânsito: trafficSpeedFactor",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Trânsito: captureTrafficPositions",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Trânsito: resolveTrafficOverlaps",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Trânsito: trafficHoldUntil",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: busSpawnIndex",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: buildBusRoadPath",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: recoverBusRoute",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: validateBusCoverage",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Ônibus: laneOffset",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Serviços de emergência respeitam retenção",
      "passed": true,
      "detail": "3"
    },
    {
      "name": "NPCs/veículos respeitam retenção",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS mobilidade: mode-mobility-driver #runBtn",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS mobilidade: mode-mobility-driver #jumpBtn",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS mobilidade: orientation:portrait",
      "passed": true,
      "detail": ""
    },
    {
      "name": "CSS m
- [x] Testes de bairros/mapa V644 — {
  "version": 644,
  "passed": true,
  "counts": {
    "passed": 68,
    "failed": 0,
    "total": 68
  },
  "checks": [
    {
      "name": "Bairro configurado bairro-central",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Bairro configurado bairro-floresta",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Bairro configurado bairro-lago",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Bairro configurado bairro-montanha",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Bairro configurado bairro-escola",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Cinco bairros únicos",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Capacidade 10 em todos",
      "passed": true,
      "detail": "5"
    },
    {
      "name": "Limite multiplayer 10",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Entradas físicas dos bairros",
      "passed": true,
      "detail": "5"
    },
    {
      "name": "Limites cartográficos dos bairros",
      "passed": true,
      "detail": "5"
    },
    {
      "name": "Cinco geometrias de bairro interpretadas",
      "passed": true,
      "detail": "5"
    },
    {
      "name": "Entrada dentro dos limites bairro-central",
      "passed": true,
      "detail": "{'id': 'bairro-central', 'name': 'Bairro Central', 'capacity': 10, 'entryX': 0.0, 'entryZ': 8.0, 'xMin': -48.0, 'xMax': 48.0, 'zMin': -22.0, 'zMax': 38.0}"
    },
    {
      "name": "Limites dentro do mundo bairro-central",
      "passed": true,
      "detail": "{'id': 'bairro-central', 'name': 'Bairro Central', 'capacity': 10, 'entryX': 0.0, 'entryZ': 8.0, 'xMin': -48.0, 'xMax': 48.0, 'zMin': -22.0, 'zMax': 38.0}"
    },
    {
      "name": "Entrada dentro dos limites bairro-floresta",
      "passed": true,
      "detail": "{'id': 'bairro-floresta', 'name': 'Bairro da Floresta', 'capacity': 10, 'entryX': -82.0, 'entryZ': -35.0, 'xMin': -116.0, 'xMax': -48.0, 'zMin': -108.0, 'zMax': 24.0}"
    },
    {
      "name": "Limites dentro do mundo bairro-floresta",
      "passed": true,
      "detail": "{'id': 'bairro-floresta', 'name': 'Bairro da Floresta', 'capacity': 10, 'entryX': -82.0, 'entryZ': -35.0, 'xMin': -116.0, 'xMax': -48.0, 'zMin': -108.0, 'zMax': 24.0}"
    },
    {
      "name": "Entrada dentro dos limites bairro-lago",
      "passed": true,
      "detail": "{'id': 'bairro-lago', 'name': 'Bairro do Lago', 'capacity': 10, 'entryX': -25.0, 'entryZ': 45.0, 'xMin': -62.0, 'xMax': -8.0, 'zMin': 28.0, 'zMax': 82.0}"
    },
    {
      "name": "Limites dentro do mundo bairro-lago",
      "passed": true,
      "detail": "{'id': 'bairro-lago', 'name': 'Bairro do Lago', 'capacity': 10, 'entryX': -25.0, 'entryZ': 45.0, 'xMin': -62.0, 'xMax': -8.0, 'zMin': 28.0, 'zMax': 82.0}"
    },
    {
      "name": "Entrada dentro dos limites bairro-montanha",
      "passed": true,
      "detail": "{'id': 'bairro-montanha', 'name': 'Bair
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
- [x] Versão 644 no index — 15
- [x] GitHub Pages OTTHI
- [x] Chaves CSS balanceadas — 1864/1864
- [x] 564 funções nomeadas — 564
- [x] Runtime V644
- [x] Save V644 e migração V643
- [x] Token preservado mobilityThrottleIntent
- [x] Token preservado const steer=Math.abs(ix)<.06?0:-ix
- [x] Token preservado const steer=Math.abs(ix)<.07?0:-ix
- [x] Token preservado Acelerar
- [x] Token preservado Freio
- [x] Token preservado createShoreFishingLife
- [x] Token preservado trafficPriority
- [x] Token preservado busSpawnIndex
- [x] Token preservado water-ripples-v643.png
- [x] Token V644 miniMapLogicalSize
- [x] Token V644 miniMapScale
- [x] Token V644 currentMapLocations
- [x] Token V644 clearRemoteRoomEntities
- [x] Token V644 applyRoomWorld
- [x] Token V644 mapRegionsMarkup
- [x] Token V644 focusCurrentRoom
- [x] Viewport usa palco real
- [x] Viewport lógico sem DPR duplicado
- [x] Canvas ocupa 100%
- [x] Zonas de paisagem separadas
- [x] Mapa principal escala 1:1
- [x] Responsividade automática do mapa
- [x] Cinco bairros com 10 vagas — 5
- [x] Regra Firebase limita 10 usuários — !newData.exists() || newData.numChildren() <= 10
- [x] Service Worker V644
- [x] Android V643 preservado
- [x] Preservação V642/V644 aprovada
- [x] Bairros/mapa V644 aprovados

## Limites

- Não substitui teste físico de orientação instalada, multiplayer entre dois aparelhos, Firebase remoto, AR e APK.
- Os testes V644 validam reserva de vaga, limpeza de bairro, transporte, mapa sem distorção e regras estruturais.
