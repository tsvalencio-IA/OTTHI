# Relatório de preservação — V642 → V643

- Resultado: **APROVADO**
- Funções-base preservadas: **544 / 544**
- Funções atuais: **552**
- Ordem das funções-base preservada: **sim**
- Novas funções V643 esperadas: **8 / 8**
- Assets imutáveis preservados: **83 / 83**

## Sistemas obrigatórios

- [x] `roupas_e_avatar` — applyAvatarCustomization, openAvatarStudio, uniform
- [x] `skills` — setScaleMode, toggleCrouch, spinPlayer
- [x] `bombeiros` — createFireTruck, openFireStationDesk, activateFireIncident
- [x] `policia` — createPoliceCar, startPoliceAlert, updatePoliceSystem
- [x] `ambulancias` — createAmbulance, createTrafficIncident, resolveTrafficIncident
- [x] `construcao` — beginBuildMode, placeBuild, reconcileWorldBuilds
- [x] `pescaria` — startFishing, updateFishingVisual, restoreFishingCamera, createShoreFishingLife
- [x] `transporte` — createBusModel, enterBus, openMetroStation, trafficPriority, busSpawnIndex
- [x] `mobilidade_v643` — mobilityThrottleIntent, updateMobilityControlLabels, mobilityAccelerate, mobilityBrake
- [x] `multiplayer` — remotePlayerEvent, openSocialHub, updateMultiplayer
- [x] `educacao` — openEducationHub, runEducationGame, OTTHI_LEARNING

## Funções novas da V643

- `trafficPriority()`
- `busSpawnIndex()`
- `createShoreFisher()`
- `createShoreFishingLife()`
- `updateShoreFishers()`
- `mobilityDriverActive()`
- `updateMobilityControlLabels()`
- `mobilityThrottleIntent()`
