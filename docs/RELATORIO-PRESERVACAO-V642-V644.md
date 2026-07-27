# Relatório de preservação — V642 → V644

- Resultado: **APROVADO**
- Funções-base preservadas: **544 / 544**
- Funções atuais: **564**
- Ordem das funções-base preservada: **sim**
- Funções V643/V644 esperadas: **20 / 20**
- Assets imutáveis preservados sem alteração: **80 / 83**
- Alterações aprovadas de integração: **3**

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
- [x] `multiplayer` — remotePlayerEvent, openSocialHub, updateMultiplayer, applyRoomWorld, clearRemoteRoomEntities
- [x] `bairros_v644` — miniMapScale, currentMapLocations, mapRegionsMarkup, roomHouseMarkers, focusCurrentRoom
- [x] `educacao` — openEducationHub, runEducationGame, OTTHI_LEARNING

## Alterações de assets aprovadas

- `assets/js/multiplayer-rtdb.js`
- `assets/js/multiplayer/room-manager.js`
- `firebase-database.rules.json`

## Funções adicionadas depois da base

- `trafficPriority()`
- `miniMapLogicalSize()`
- `miniMapScale()`
- `currentMapLocations()`
- `busSpawnIndex()`
- `createShoreFisher()`
- `createShoreFishingLife()`
- `updateShoreFishers()`
- `mobilityDriverActive()`
- `updateMobilityControlLabels()`
- `mobilityThrottleIntent()`
- `roomWorldInfo()`
- `roomHouseMarkers()`
- `mapHouseLocations()`
- `mapRegionsMarkup()`
- `clearRemoteRoomEntities()`
- `resetMobilityForRoomChange()`
- `canChangeRoom()`
- `focusCurrentRoom()`
- `applyRoomWorld()`
