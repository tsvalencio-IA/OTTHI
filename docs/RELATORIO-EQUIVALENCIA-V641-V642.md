# Relatório de equivalência — V641 → V642 modular

- Resultado: **APROVADO**
- Funções esperadas/atuais: **544 / 544**
- Mesma ordem de funções: **sim**
- SHA normalizado do JavaScript equivalente: **sim**
- SHA normalizado do CSS equivalente: **sim**
- Assets preservados sem alteração: **83 / 83**

A normalização ignora somente comentários de separação de módulos, número/build da versão, chave nova de save, lista de migração e rótulo da API de testes. Não ignora funções, condições ou lógica executável.

## Sistemas obrigatórios

- [x] `roupas_e_avatar` — applyAvatarCustomization, openAvatarStudio, uniform
- [x] `skills` — setScaleMode, toggleCrouch, spinPlayer
- [x] `bombeiros` — createFireTruck, openFireStationDesk, activateFireIncident
- [x] `policia` — createPoliceCar, startPoliceAlert, updatePoliceSystem
- [x] `ambulancias` — createAmbulance, createTrafficIncident, resolveTrafficIncident
- [x] `construcao` — beginBuildMode, placeBuild, reconcileWorldBuilds
- [x] `pescaria` — startFishing, updateFishingVisual, restoreFishingCamera
- [x] `transporte` — createBusModel, enterBus, openMetroStation
- [x] `multiplayer` — remotePlayerEvent, openSocialHub, updateMultiplayer
- [x] `educacao` — openEducationHub, runEducationGame, OTTHI_LEARNING
