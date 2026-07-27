# Checklist das 564 funções — OTTHI World Edu V644

Cada item confirma presença na fonte modular. `endBoundaryLine` termina na próxima declaração de função de topo; não é uma afirmação de parsing semântico do corpo JavaScript.


## `00-runtime-foundation.js`

- [x] `roomWorldInfo()` — linhas 3–4 — return=1 — chama: nenhuma função nomeada detectada
- [x] `roomHouseMarkers()` — linhas 5–6 — return=2 — chama: nenhuma função nomeada detectada
- [x] `mapHouseLocations()` — linhas 7–8 — return=1 — chama: roomHouseMarkers
- [x] `mapRegionsMarkup()` — linhas 9–10 — return=2 — chama: escapeHtml
- [x] `clearRemoteRoomEntities()` — linhas 11–18 — for=1 — chama: applyCloudWorldObjects, closeChallengePrompt, reconcileCloudHouses, refreshOpenSocialHub, updateMultiplayerBadge
- [x] `resetMobilityForRoomChange()` — linhas 19–28 — if=11, return=1 — chama: cancelFishingSession, clearMovementInputs, endBuildMode, exitBoat, exitHouse, exitVehicle

## `01-build-persistence.js`

- [x] `canChangeRoom()` — linhas 29–30 — return=1 — chama: nenhuma função nomeada detectada
- [x] `focusCurrentRoom()` — linhas 31–32 — if=1, catch=1, return=2 — chama: buildRoutePoints, roomWorldInfo, toast, updateNavigation
- [x] `applyRoomWorld()` — linhas 33–52 — if=7, catch=4, return=11 — chama: clearRemoteRoomEntities, refreshOpenMapAfterResize, rememberSafePlayerPosition, resetMobilityForRoomChange, roomWorldInfo, safePointNear, saveState, toast, updateContext, updateHUD, updateNavigation
- [x] `stableBuildId()` — linhas 53–58 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeBuildRecord()` — linhas 59–65 — if=2, return=3 — chama: stableBuildId
- [x] `normalizeBuildList()` — linhas 66–74 — if=2, return=2 — chama: normalizeBuildRecord
- [x] `normalizeBuildTombstones()` — linhas 75–83 — if=3, return=3 — chama: nenhuma função nomeada detectada
- [x] `mergeBuildTombstones()` — linhas 84–84 — return=1 — chama: normalizeBuildTombstones
- [x] `applyBuildTombstones()` — linhas 85–88 — return=1 — chama: normalizeBuildList, normalizeBuildTombstones
- [x] `mergeBuildCollections()` — linhas 89–91 — return=1 — chama: applyBuildTombstones, normalizeBuildList
- [x] `mergeEntityCollections()` — linhas 92–168 — if=2, return=2 — chama: nenhuma função nomeada detectada

## `02-state-save-cloud-account.js`

- [x] `normalizeState()` — linhas 169–222 — if=2, return=1 — chama: applyBuildTombstones, normalizeBuildTombstones
- [x] `loadState()` — linhas 223–271 — if=10, else=2, for=1, catch=4, return=5 — chama: ensureDailyChallenges, normalizeState, updateDailyBadge, updateHUD, updateLobbyStats
- [x] `commitState()` — linhas 272–288 — catch=2, return=2 — chama: applyBuildTombstones, ensureDailyChallenges, normalizeBuildTombstones, syncCloudProgress, syncGameAccount, updateDailyBadge, updateLobbyStats
- [x] `saveState()` — linhas 289–296 — if=1, return=2 — chama: commitState
- [x] `cloudProgressPayload()` — linhas 297–305 — return=1 — chama: nenhuma função nomeada detectada
- [x] `syncCloudProgress()` — linhas 306–309 — if=1, return=2 — chama: cloudProgressPayload, hasValidPlayerName
- [x] `mergeCloudProgress()` — linhas 310–330 — if=3, catch=1, return=3 — chama: mergeBuildCollections, mergeBuildTombstones, mergeEntityCollections, normalizeState, reconcileWorldBuilds, syncCloudProgress, toast, updateHUD, updateLobbyStats, updatePlayerNameUI
- [x] `accountLinked()` — linhas 331–331 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountPromptWasHandled()` — linhas 332–332 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountStatusText()` — linhas 333–349 — if=4, return=7 — chama: accountLinked
- [x] `syncGameAccount()` — linhas 350–403 — if=16, catch=2, return=10, throw=10 — chama: accountLinked, applyPlayerName, commitState, normalizeState, sanitizePlayerName, saveState, updateHUD, updateLobbyStats, updatePlayerNameUI

## `03-ui-modal-install-pwa.js`

- [x] `openAccountForm()` — linhas 404–412 — if=4, else=2, catch=1, return=1 — chama: closeModal, escapeHtml, openAccountCenter, openModal, toast
- [x] `openAccountCenter()` — linhas 413–422 — if=2 — chama: accountLinked, closeModal, confirmModal, escapeHtml, openAccountForm, openModal, openPlayerNameModal, saveState, syncGameAccount, toast
- [x] `addXP()` — linhas 423–433 — if=1 — chama: awardMedal, saveState, toast, updateHUD
- [x] `addCoins()` — linhas 434–437 — sem fluxo contado — chama: saveState, updateHUD
- [x] `addReputation()` — linhas 438–441 — sem fluxo contado — chama: saveState, updateHUD
- [x] `awardMedal()` — linhas 442–447 — if=1, return=1 — chama: saveState, toast
- [x] `setFlag()` — linhas 448–454 — if=1, return=1 — chama: evaluateMissions, saveState
- [x] `showScreen()` — linhas 455–459 — sem fluxo contado — chama: updateInstallUI
- [x] `toast()` — linhas 460–465 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `vibrate()` — linhas 466–468 — if=1 — chama: nenhuma função nomeada detectada
- [x] `beep()` — linhas 469–483 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openModal()` — linhas 484–498 — if=3 — chama: scheduleStableResize
- [x] `closeModal()` — linhas 499–516 — if=4, else=1 — chama: cancelFishingSession, clearExtensionPreview, startEngineSound, stopFishingVisual
- [x] `confirmModal()` — linhas 517–530 — if=1, return=1 — chama: closeModal, openModal
- [x] `updateInstallUI()` — linhas 531–577 — if=5, return=2 — chama: openModal, toast
- [x] `isOfficialOtthiGameAddress()` — linhas 578–684 — if=13, catch=7, return=11, throw=1 — chama: saveState, updateInstallUI

## `04-education-daily-quiz.js`

- [x] `localDateKey()` — linhas 685–685 — return=1 — chama: nenhuma função nomeada detectada
- [x] `daysBetween()` — linhas 686–686 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `ensureDailyChallenges()` — linhas 687–687 — if=1, while=1, return=1 — chama: daysBetween, localDateKey, saveState
- [x] `dailyDefinition()` — linhas 688–688 — return=1 — chama: nenhuma função nomeada detectada
- [x] `trackDaily()` — linhas 689–694 — if=5, for=1, return=1 — chama: ensureDailyChallenges, saveState, updateDailyBadge
- [x] `updateDailyBadge()` — linhas 695–695 — if=2, return=1 — chama: ensureDailyChallenges
- [x] `claimDailyQuest()` — linhas 696–709 — if=1, return=1 — chama: addCoins, addReputation, addXP, beep, dailyDefinition, openDailyChallenges, saveState, toast, vibrate
- [x] `seeded()` — linhas 710–710 — return=1 — chama: nenhuma função nomeada detectada
- [x] `shuffled()` — linhas 711–711 — return=1 — chama: nenhuma função nomeada detectada
- [x] `choiceSet()` — linhas 712–712 — return=1 — chama: shuffled
- [x] `mathRound()` — linhas 713–721 — if=5, return=6 — chama: choiceSet
- [x] `portugueseRound()` — linhas 722–730 — if=5, return=6 — chama: choiceSet, shuffled
- [x] `englishRound()` — linhas 731–739 — if=5, return=6 — chama: choiceSet
- [x] `generateEducationRounds()` — linhas 740–740 — return=1 — chama: seeded
- [x] `subjectLevelRecord()` — linhas 741–741 — return=1 — chama: nenhuma função nomeada detectada
- [x] `subjectUnlocked()` — linhas 742–742 — return=1 — chama: subjectLevelRecord
- [x] `educationSummary()` — linhas 743–743 — if=1, for=2, return=1 — chama: subjectLevelRecord
- [x] `speakKidWord()` — linhas 744–744 — catch=1 — chama: nenhuma função nomeada detectada
- [x] `dailyChallengesHtml()` — linhas 745–745 — return=2 — chama: dailyDefinition, ensureDailyChallenges
- [x] `educationSubjectHtml()` — linhas 746–746 — return=2 — chama: subjectLevelRecord, subjectUnlocked
- [x] `openEducationHub()` — linhas 747–756 — if=5, return=4 — chama: claimDailyQuest, dailyChallengesHtml, educationSubjectHtml, educationSummary, ensureDailyChallenges, openModal, openSocialHub, playerDisplayName, startSoloEducationGame
- [x] `openChallengeHub()` — linhas 757–757 — sem fluxo contado — chama: openEducationHub
- [x] `openDailyChallenges()` — linhas 758–758 — sem fluxo contado — chama: openEducationHub
- [x] `runEducationGame()` — linhas 759–772 — if=6, else=1, return=4 — chama: addXP, beep, escapeHtml, finishSoloEducationGame, generateEducationRounds, openModal, speakKidWord
- [x] `startSoloEducationGame()` — linhas 773–773 — catch=1 — chama: closeChallengePrompt, runEducationGame, toast
- [x] `finishSoloEducationGame()` — linhas 774–776 — if=2, else=1 — chama: addCoins, addXP, awardMedal, openEducationHub, openModal, saveState, startSoloEducationGame, subjectLevelRecord
- [x] `startCinematicEmote()` — linhas 777–779 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `triggerEmote()` — linhas 780–790 — if=4 — chama: addXP, beep, startCinematicEmote, toast, vibrate

## `05-avatar-life-customization.js`

- [x] `openQuiz()` — linhas 791–793 — sem fluxo contado — chama: openEducationHub
- [x] `openCollection()` — linhas 794–812 — sem fluxo contado — chama: openModal
- [x] `effectiveAvatarUniform()` — linhas 813–820 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `avatarChoiceGroup()` — linhas 821–825 — return=1 — chama: effectiveAvatarUniform
- [x] `openAvatarStudio()` — linhas 826–835 — sem fluxo contado — chama: applyAvatarCustomization, avatarChoiceGroup, closeModal, openModal, playerDisplayName, saveState, setFlag, toast
- [x] `openLifePanel()` — linhas 836–851 — if=2, for=1 — chama: closeModal, openModal, toast
- [x] `openMolds()` — linhas 852–854 — sem fluxo contado — chama: openModal, playerDisplayName
- [x] `openHow()` — linhas 855–953 — sem fluxo contado — chama: openModal

## `06-missions-profile-hud-inventory-tools.js`

- [x] `deriveMissionFlags()` — linhas 954–965 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `evaluateMissions()` — linhas 966–983 — if=2, for=1 — chama: addCoins, awardMedal, deriveMissionFlags, toast, updateMissionHUD
- [x] `updateMissionHUD()` — linhas 984–1002 — if=2, return=2 — chama: activeJobProgress, playerText
- [x] `objectiveStatusLabel()` — linhas 1003–1003 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillMasterySummary()` — linhas 1004–1004 — return=1 — chama: nenhuma função nomeada detectada
- [x] `pinChapter()` — linhas 1005–1005 — sem fluxo contado — chama: evaluateMissions, saveState, toast, updateMissionHUD
- [x] `openObjectivesPanel()` — linhas 1006–1013 — return=1 — chama: activeJobProgress, deriveMissionFlags, openModal, pinChapter, playerText, skillMasterySummary
- [x] `sanitizePlayerName()` — linhas 1014–1014 — return=1 — chama: nenhuma função nomeada detectada
- [x] `hasValidPlayerName()` — linhas 1015–1015 — return=1 — chama: sanitizePlayerName
- [x] `playerDisplayName()` — linhas 1016–1016 — return=1 — chama: hasValidPlayerName, sanitizePlayerName
- [x] `playerText()` — linhas 1017–1017 — return=1 — chama: playerDisplayName
- [x] `updatePlayerNameUI()` — linhas 1018–1018 — if=7 — chama: accountStatusText, hasValidPlayerName, playerDisplayName
- [x] `applyPlayerName()` — linhas 1019–1019 — if=2, return=2 — chama: sanitizePlayerName, saveState, toast, updatePlayerNameUI
- [x] `openPlayerNameModal()` — linhas 1020–1024 — if=3, return=1 — chama: applyPlayerName, closeModal, hasValidPlayerName, openModal, toast
- [x] `updateLobbyStats()` — linhas 1025–1031 — sem fluxo contado — chama: updatePlayerNameUI
- [x] `updateHUD()` — linhas 1032–1046 — if=1 — chama: updateMissionHUD, updatePlayerNameUI
- [x] `openInventory()` — linhas 1047–1059 — if=1, return=1 — chama: openModal, saveState, toast, updateHUD
- [x] `equippedTool()` — linhas 1060–1060 — return=1 — chama: nenhuma função nomeada detectada
- [x] `equipTool()` — linhas 1061–1063 — if=2, return=2 — chama: refreshEquippedToolVisual, saveState, toast

## `07-navigation-traffic-routes.js`

- [x] `openToolbelt()` — linhas 1064–1066 — sem fluxo contado — chama: closeModal, equipTool, openModal
- [x] `refreshEquippedToolVisual()` — linhas 1067–1080 — if=4, else=2, return=1 — chama: box, renderMat
- [x] `playToolAnimation()` — linhas 1081–1089 — sem fluxo contado — chama: beep, vibrate
- [x] `routeLength()` — linhas 1090–1090 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `compactRoute()` — linhas 1091–1091 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToSegment()` — linhas 1092–1092 — return=1 — chama: nenhuma função nomeada detectada
- [x] `navBlocked()` — linhas 1093–1093 — if=3, for=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `segmentClear()` — linhas 1094–1094 — if=1, for=1, return=2 — chama: navBlocked
- [x] `nearestRoadProjection()` — linhas 1095–1095 — if=1, for=1, return=1 — chama: projectPointToSegment, segmentClear
- [x] `pointOnRoad()` — linhas 1096–1096 — return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToPolyline()` — linhas 1097–1101 — if=3, for=1, return=2 — chama: projectPointToSegment
- [x] `snapTrafficToRoad()` — linhas 1102–1107 — if=3, return=3 — chama: nearestRoadProjection, pointOnRoad, projectPointToPolyline
- [x] `trafficActorList()` — linhas 1108–1119 — if=6, for=5, return=2 — chama: nenhuma função nomeada detectada
- [x] `trafficPriority()` — linhas 1120–1120 — if=4, else=2, return=2 — chama: nenhuma função nomeada detectada
- [x] `trafficSpeedFactor()` — linhas 1121–1130 — if=6, for=1, return=3 — chama: trafficActorList, trafficPriority
- [x] `captureTrafficPositions()` — linhas 1131–1131 — for=1, return=1 — chama: trafficActorList
- [x] `resolveTrafficOverlaps()` — linhas 1132–1144 — if=8, else=2, for=3 — chama: pointOnRoad, snapTrafficToRoad, trafficActorList
- [x] `graphAdd()` — linhas 1145–1145 — if=2 — chama: nenhuma função nomeada detectada
- [x] `graphShortest()` — linhas 1146–1146 — if=6, for=2, while=2, return=2 — chama: nenhuma função nomeada detectada
- [x] `buildRoutePoints()` — linhas 1147–1158 — if=4, for=2, return=3 — chama: compactRoute, graphAdd, graphShortest, nearestRoadProjection
- [x] `routeProgressInfo()` — linhas 1159–1159 — if=2, for=1, return=2 — chama: projectPointToSegment, routeLength
- [x] `remainingRoute()` — linhas 1160–1160 — return=1 — chama: compactRoute, routeProgressInfo
- [x] `sampleRoute()` — linhas 1161–1161 — for=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createRouteGuide()` — linhas 1162–1162 — if=1, for=1, return=1 — chama: mat
- [x] `updateRouteGuide()` — linhas 1163–1163 — if=3, return=2 — chama: buildRoutePoints, createRouteGuide, groundHeightAt, remainingRoute, routeProgressInfo, sampleRoute
- [x] `miniPoint()` — linhas 1164–1164 — return=1 — chama: nenhuma função nomeada detectada
- [x] `miniMapLogicalSize()` — linhas 1165–1165 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `miniMapScale()` — linhas 1166–1166 — return=1 — chama: nenhuma função nomeada detectada
- [x] `drawMiniMap()` — linhas 1167–1175 — if=6, for=2, return=1 — chama: miniMapLogicalSize, miniMapScale, miniPoint, remainingRoute
- [x] `updateNavigation()` — linhas 1176–1176 — if=4, else=1, return=2 — chama: beep, drawMiniMap, routeProgressInfo, saveState, toast, updateRouteGuide
- [x] `routeSvgMarkup()` — linhas 1177–1227 — return=1 — chama: playerDisplayName, worldToMap

## `08-map-parent-settings.js`

- [x] `mapLocationDetails()` — linhas 1228–1229 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldToMap()` — linhas 1230–1231 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentMapLocations()` — linhas 1232–1233 — return=1 — chama: nenhuma função nomeada detectada
- [x] `mapDistance()` — linhas 1234–1237 — return=1 — chama: nenhuma função nomeada detectada
- [x] `mapMarkerPlacements()` — linhas 1238–1280 — if=5, else=2, for=4, return=4 — chama: worldToMap
- [x] `applyMapMarkerPlacements()` — linhas 1281–1288 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `mapSelectionMarkup()` — linhas 1289–1292 — if=1, return=2 — chama: currentMapLocations, mapDistance, mapLocationDetails
- [x] `setWaypoint()` — linhas 1293–1297 — if=1, return=1 — chama: buildRoutePoints, closeModal, currentMapLocations, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `clearWaypoint()` — linhas 1298–1298 — sem fluxo contado — chama: closeModal, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `openMap()` — linhas 1299–1317 — if=2, return=3 — chama: applyMapMarkerPlacements, buildRoutePoints, currentMapLocations, mapDistance, mapMarkerPlacements, mapSelectionMarkup, openModal, routeProgressInfo, routeSvgMarkup, setWaypoint, worldToMap
- [x] `refreshOpenMapAfterResize()` — linhas 1318–1320 — if=2, return=1 — chama: openMap
- [x] `performLocalReset()` — linhas 1321–1323 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openFinalResetConfirmation()` — linhas 1324–1329 — if=3, return=2 — chama: commitState, confirmModal, openModal, openParentTools, performLocalReset
- [x] `openParentTools()` — linhas 1330–1337 — if=2, catch=1, return=2 — chama: confirmModal, normalizeState, openFinalResetConfirmation, openModal, openSettings, toast
- [x] `openParentGate()` — linhas 1338–1348 — if=5, return=3 — chama: accountLinked, openModal, openParentTools, openSettings
- [x] `openSettings()` — linhas 1349–1399 — if=11, else=6 — chama: accountStatusText, applyQuality, closeChallengePrompt, closeModal, commitState, hasValidPlayerName, multiplayerStatusText, openAccountCenter, openEducationHub, openModal, openParentGate, openPlayerNameModal (+8)

## `09-responsive-ar-quality-diagnostics.js`

- [x] `syncMobilePanels()` — linhas 1400–1448 — if=16, catch=1, return=1, throw=2 — chama: openObjectivesPanel, saveState
- [x] `otthiGameModelUrl()` — linhas 1449–1452 — return=1 — chama: nenhuma função nomeada detectada
- [x] `androidSceneViewerUrl()` — linhas 1453–1462 — return=1 — chama: otthiGameModelUrl
- [x] `isAndroidDevice()` — linhas 1463–1466 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openAndroidSceneViewer()` — linhas 1467–1508 — if=5, catch=2, return=4 — chama: androidSceneViewerUrl, isAndroidDevice, openModal, toast
- [x] `detectStableAutoTier()` — linhas 1509–1528 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `vehiclePlayerMode()` — linhas 1529–1535 — if=3, return=4 — chama: nenhuma função nomeada detectada
- [x] `derivePlayerMode()` — linhas 1536–1546 — if=8, return=9 — chama: vehiclePlayerMode
- [x] `auditPlayerMode()` — linhas 1547–1562 — if=7, return=1 — chama: derivePlayerMode
- [x] `isOnFootMode()` — linhas 1563–1563 — return=1 — chama: derivePlayerMode
- [x] `canEnterMobility()` — linhas 1564–1568 — if=1, return=2 — chama: auditPlayerMode, isOnFootMode
- [x] `cameraRelativeVector()` — linhas 1569–1573 — return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeControlIntent()` — linhas 1574–1581 — if=2, return=3 — chama: cameraRelativeVector, derivePlayerMode
- [x] `requestedQuality()` — linhas 1582–1582 — return=1 — chama: nenhuma função nomeada detectada
- [x] `qualityLabel()` — linhas 1583–1583 — return=1 — chama: qualityTier, requestedQuality
- [x] `qualityTier()` — linhas 1584–1584 — return=1 — chama: requestedQuality
- [x] `targetDpr()` — linhas 1585–1590 — if=2, return=3 — chama: qualityTier
- [x] `applyAdaptiveRenderSettings()` — linhas 1591–1599 — if=4, return=1 — chama: qualityTier, scheduleStableResize, targetDpr
- [x] `samplePerformance()` — linhas 1600–1619 — if=6, else=2, return=2 — chama: applyAdaptiveRenderSettings, lockStableSceneVisibility, requestedQuality, saveState, toast
- [x] `lockStableSceneVisibility()` — linhas 1620–1626 — if=4, for=3 — chama: qualityTier

## `10-player-skills.js`

- [x] `freezeWorldFrustumCulling()` — linhas 1627–1641 — if=4, else=1, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `updateVisualLOD()` — linhas 1642–1649 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `pwaInstalled()` — linhas 1650–1650 — return=1 — chama: nenhuma função nomeada detectada
- [x] `activeVehicleCount()` — linhas 1651–1651 — return=1 — chama: nenhuma função nomeada detectada
- [x] `runtimeDiagnostics()` — linhas 1652–1655 — return=1 — chama: activeVehicleCount, auditPlayerMode, pwaInstalled
- [x] `ensureTechnicalPanel()` — linhas 1656–1658 — if=1, return=2 — chama: toggleTechnicalPanel
- [x] `refreshTechnicalPanel()` — linhas 1659–1659 — if=1, return=1 — chama: ensureTechnicalPanel, qualityTier, runtimeDiagnostics
- [x] `toggleTechnicalPanel()` — linhas 1660–1660 — if=1 — chama: ensureTechnicalPanel, refreshTechnicalPanel
- [x] `initTechnicalPanel()` — linhas 1661–1665 — if=2 — chama: toggleTechnicalPanel
- [x] `playerScaleValue()` — linhas 1666–1668 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillReady()` — linhas 1669–1669 — if=1, return=2 — chama: toast
- [x] `recordAdvancedSkill()` — linhas 1670–1675 — for=1 — chama: advanceAdventure, saveState, trackDaily, updateAbilityUI
- [x] `collectCrystal()` — linhas 1676–1678 — if=1, return=2 — chama: addCoins, addXP, beep, checkActiveJob, evaluateMissions, saveState, toast, trackDaily, vibrate
- [x] `syncPlayerRootScale()` — linhas 1679–1688 — if=2, return=2 — chama: playerScaleValue
- [x] `setScaleMode()` — linhas 1689–1708 — if=10, else=2, for=2, return=7 — chama: beep, damageEnemy, recordAdvancedSkill, saveState, skillReady, spawnDust, toast, trackDaily, updateAbilityUI, vibrate

## `11-render-materials-player-model.js`

- [x] `toggleCrouch()` — linhas 1709–1718 — if=3, return=3 — chama: beep, playerDisplayName, recordAdvancedSkill, saveState, skillReady, toast, updateAbilityUI
- [x] `spinPlayer()` — linhas 1719–1725 — if=3, for=2, return=1 — chama: addXP, beep, collectCrystal, damageEnemy, recordAdvancedSkill, skillReady, toast
- [x] `updateAbilityUI()` — linhas 1726–1732 — if=2, for=2 — chama: nenhuma função nomeada detectada
- [x] `canvasTexture()` — linhas 1733–1769 — if=11, else=9, for=24, return=2 — chama: nenhuma função nomeada detectada
- [x] `professionalTexture()` — linhas 1770–1775 — if=1, else=1, return=1 — chama: canvasTexture
- [x] `initMaterials()` — linhas 1776–1821 — sem fluxo contado — chama: canvasTexture, professionalTexture
- [x] `mat()` — linhas 1822–1827 — return=1 — chama: nenhuma função nomeada detectada
- [x] `geometryKey()` — linhas 1828–1828 — return=1 — chama: nenhuma função nomeada detectada
- [x] `sharedBoxGeometry()` — linhas 1829–1833 — if=1, return=1 — chama: geometryKey
- [x] `sharedCylinderGeometry()` — linhas 1834–1838 — if=1, return=1 — chama: geometryKey
- [x] `renderMat()` — linhas 1839–1844 — if=1, return=1 — chama: mat
- [x] `tintedBrickMaterial()` — linhas 1845–1847 — return=1 — chama: nenhuma função nomeada detectada
- [x] `texturedRoofMaterial()` — linhas 1848–1850 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `addSoftHighlight()` — linhas 1851–1855 — return=1 — chama: sharedBoxGeometry
- [x] `box()` — linhas 1856–1860 — return=1 — chama: mat, sharedBoxGeometry
- [x] `stabilizeSurface()` — linhas 1861–1861 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stableBox()` — linhas 1862–1862 — return=1 — chama: box, stabilizeSurface
- [x] `cylinder()` — linhas 1863–1867 — return=1 — chama: mat, sharedCylinderGeometry
- [x] `addGlow()` — linhas 1868–1871 — return=1 — chama: nenhuma função nomeada detectada
- [x] `addVoxelOutline()` — linhas 1872–1876 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `premiumBox()` — linhas 1877–1879 — return=1 — chama: addVoxelOutline, box
- [x] `premiumCylinder()` — linhas 1880–1882 — return=1 — chama: addVoxelOutline, cylinder
- [x] `makeWindow()` — linhas 1883–1886 — return=1 — chama: mat, premiumBox
- [x] `makePlanter()` — linhas 1887–1890 — for=1, return=1 — chama: premiumBox
- [x] `createPlayerModel()` — linhas 1891–1952 — if=3, for=2 — chama: addSoftHighlight, addVoxelOutline, box, mat, multiplayerNameTexture, playerDisplayName, refreshEquippedToolVisual, renderMat, sharedCylinderGeometry
- [x] `loadFaithfulAthosModel()` — linhas 1953–1958 — return=1 — chama: nenhuma função nomeada detectada
- [x] `clearAvatarLayer()` — linhas 1959–1964 — if=1 — chama: nenhuma função nomeada detectada

## `12-world-resources-nature.js`

- [x] `applyAvatarCustomization()` — linhas 1965–1996 — if=18, else=11, return=1 — chama: box, clearAvatarLayer, effectiveAvatarUniform, mat
- [x] `registerCollider()` — linhas 1997–1997 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `registerPlatform()` — linhas 1998–1998 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `registerInteractable()` — linhas 1999–1999 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldPos()` — linhas 2000–2003 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `isInteractionAvailable()` — linhas 2004–2010 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `ensureFlowerBatch()` — linhas 2011–2024 — if=2, return=1 — chama: renderMat, sharedBoxGeometry
- [x] `createTree()` — linhas 2025–2043 — if=2, return=1 — chama: box, collectResource, registerInteractable, renderMat
- [x] `createRock()` — linhas 2044–2047 — if=1, return=1 — chama: collectResource, registerInteractable
- [x] `createGoldFoundry()` — linhas 2048–2055 — return=1 — chama: premiumBox, registerCollider, registerInteractable, renderMat, signTexture, texturedRoofMaterial
- [x] `createGoldMine()` — linhas 2056–2069 — for=2, return=1 — chama: collectResource, createLamp, createSignpost, premiumBox, registerInteractable, renderMat
- [x] `createVillageWell()` — linhas 2070–2078 — for=1, return=1 — chama: createSignpost, premiumBox, premiumCylinder, registerInteractable
- [x] `drawWaterFromWell()` — linhas 2079–2083 — if=3, return=2 — chama: addXP, advanceAdventure, playToolAnimation, saveState, toast, updateHUD
- [x] `createFlower()` — linhas 2084–2093 — if=2 — chama: ensureFlowerBatch
- [x] `createLamp()` — linhas 2094–2101 — return=1 — chama: addGlow, box, renderMat
- [x] `createSignpost()` — linhas 2102–2107 — return=1 — chama: box, signTexture
- [x] `createFenceLine()` — linhas 2108–2111 — for=1 — chama: box
- [x] `createRoad()` — linhas 2112–2129 — if=1, else=1, for=2 — chama: renderMat, stableBox
- [x] `createWater()` — linhas 2130–2130 — for=1 — chama: stableBox
- [x] `createLava()` — linhas 2131–2132 — return=1 — chama: mat, stableBox
- [x] `createFurniture()` — linhas 2133–2194 — if=16, for=15, return=1 — chama: box, cylinder, premiumBox, premiumCylinder, renderMat, shadeColor

## `13-houses-npcs-vehicles-base.js`

- [x] `signTexture()` — linhas 2195–2225 — if=3, else=2, for=1, while=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `shadeColor()` — linhas 2226–2231 — return=1 — chama: nenhuma função nomeada detectada
- [x] `decorateHouseCommercial()` — linhas 2232–2248 — if=3, else=1, for=1 — chama: addVoxelOutline, box, makePlanter, premiumBox, shadeColor
- [x] `createHouse()` — linhas 2249–2275 — if=1, for=1, return=1 — chama: box, createFlower, createLamp, decorateHouseCommercial, makeWindow, registerCollider, registerInteractable, renderMat, shadeColor, signTexture, texturedRoofMaterial, tintedBrickMaterial
- [x] `addHouseInterior()` — linhas 2276–2323 — if=7, else=6, for=11 — chama: addGlow, createFurniture, exitHouse, premiumBox, premiumCylinder, registerActivity, registerInteractable
- [x] `registerActivity()` — linhas 2324–2327 — sem fluxo contado — chama: activityIcon, registerInteractable, useActivity
- [x] `activityIcon()` — linhas 2328–2329 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createNPC()` — linhas 2330–2348 — if=4, else=1, for=2, return=1 — chama: addVoxelOutline, box, iconTexture, registerInteractable, renderMat, shadeColor, talkToNPC
- [x] `createNpcMobility()` — linhas 2349–2362 — if=5, else=3, for=4, return=3 — chama: addVoxelOutline, nearestRoadProjection, premiumBox, premiumCylinder
- [x] `createEnemy()` — linhas 2363–2369 — if=2, else=2, return=1 — chama: box
- [x] `createCrystal()` — linhas 2370–2373 — sem fluxo contado — chama: addGlow, mat
- [x] `createChest()` — linhas 2374–2376 — if=1, return=1 — chama: box, openChest, registerInteractable
- [x] `createPlatform()` — linhas 2377–2377 — sem fluxo contado — chama: box, registerPlatform
- [x] `vehicleById()` — linhas 2378–2378 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentVehicleRef()` — linhas 2379–2379 — if=3, return=4 — chama: vehicleById
- [x] `applyVehicleAppearance()` — linhas 2380–2383 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `persistParkedVehicle()` — linhas 2384–2386 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `createToyCar()` — linhas 2387–2399 — if=2, for=1, return=1 — chama: addVoxelOutline, box, cylinder, enterVehicle, registerInteractable, renderMat
- [x] `createWaypointMarker()` — linhas 2400–2405 — sem fluxo contado — chama: box, mat, updateWaypointMarker
- [x] `updateWaypointMarker()` — linhas 2406–2410 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createAthleticsGym()` — linhas 2411–2418 — for=1 — chama: box, createLamp, openRaceCenter, registerInteractable

## `14-world-district-decoration.js`

- [x] `createSizeChallenges()` — linhas 2419–2436 — if=3, return=3 — chama: addXP, box, registerInteractable, setFlag, toast
- [x] `createSkyDome()` — linhas 2437–2452 — for=1 — chama: renderMat, sharedBoxGeometry
- [x] `updateClouds()` — linhas 2453–2458 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `createVoxelMushroom()` — linhas 2459–2467 — if=1, return=1 — chama: addVoxelOutline, box, renderMat, shadeColor
- [x] `iconTexture()` — linhas 2468–2470 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createChallengeCube()` — linhas 2471–2471 — return=1 — chama: box, iconTexture
- [x] `createPortalArch()` — linhas 2472–2477 — for=1, return=1 — chama: addGlow, box, mat
- [x] `createPlayground()` — linhas 2478–2481 — for=1, return=1 — chama: box
- [x] `createFountain()` — linhas 2482–2482 — return=1 — chama: addGlow, cylinder, mat
- [x] `createAwning()` — linhas 2483–2483 — for=1, return=1 — chama: box
- [x] `createStreetTree()` — linhas 2484–2489 — return=1 — chama: makePlanter, premiumBox
- [x] `createBackdropBuilding()` — linhas 2490–2498 — for=2, return=1 — chama: addVoxelOutline, box, renderMat, shadeColor
- [x] `createFloatingIsland()` — linhas 2499–2502 — for=1, return=1 — chama: addVoxelOutline, mat, premiumBox
- [x] `createCoinTrail()` — linhas 2503–2505 — sem fluxo contado — chama: mat

## `15-transit-bus-metro.js`

- [x] `createCommercialDistrict()` — linhas 2506–2514 — sem fluxo contado — chama: createBackdropBuilding, createCoinTrail, createFloatingIsland, createStreetTree
- [x] `createDistrictVisuals()` — linhas 2515–2546 — sem fluxo contado — chama: createAwning, createChallengeCube, createCommercialDistrict, createFountain, createPlayground, createPortalArch, createVoxelMushroom
- [x] `compactBusPath()` — linhas 2547–2549 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectedBusPoint()` — linhas 2550–2550 — return=1 — chama: nearestRoadProjection
- [x] `offsetBusPath()` — linhas 2551–2558 — if=2, for=1, return=4 — chama: compactBusPath, pointOnRoad
- [x] `buildBusRoadPath()` — linhas 2559–2572 — if=4, for=2, return=3 — chama: buildRoutePoints, compactBusPath, nearestRoadProjection, offsetBusPath, projectedBusPoint
- [x] `busRoutePoints()` — linhas 2573–2573 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busNextStop()` — linhas 2574–2574 — if=1, for=1, return=2 — chama: busRoutePoints
- [x] `nearestForwardBusSegment()` — linhas 2575–2579 — if=2, for=1, return=2 — chama: projectPointToSegment
- [x] `recoverBusRoute()` — linhas 2580–2583 — if=2, return=2 — chama: busRoutePoints, nearestForwardBusSegment, projectPointToPolyline, setBusState
- [x] `setBusState()` — linhas 2584–2586 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `setBusWaiting()` — linhas 2587–2589 — return=1 — chama: saveState
- [x] `clearBusWaiting()` — linhas 2590–2590 — if=1 — chama: saveState
- [x] `restoreBusWaiting()` — linhas 2591–2591 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `busStopRecord()` — linhas 2592–2592 — return=1 — chama: nenhuma função nomeada detectada
- [x] `safeBusExitPoint()` — linhas 2593–2598 — if=1, return=2 — chama: busStopRecord, groundHeightAt, positionBlockedForPlayer, safePointNear
- [x] `createMetroEntrance()` — linhas 2599–2607 — for=2, return=1 — chama: iconTexture, openMetroStation, premiumBox, registerInteractable
- [x] `ensureMetroOverlay()` — linhas 2608–2610 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openMetroStation()` — linhas 2611–2615 — if=2, return=1 — chama: openModal, rideMetroTo, toast
- [x] `rideMetroTo()` — linhas 2616–2629 — if=9, return=3 — chama: advanceAdventure, auditPlayerMode, canEnterMobility, clearMovementInputs, closeModal, ensureMetroOverlay, rememberSafePlayerPosition, safePointNear, saveState, setFlag, toast, trackDaily (+2)
- [x] `ensureBusStop()` — linhas 2630–2633 — if=2, return=2 — chama: iconTexture, openBusStop, premiumBox, registerInteractable
- [x] `busSpawnIndex()` — linhas 2634–2636 — if=2, for=1, return=2 — chama: pointOnRoad, trafficActorList
- [x] `createBusModel()` — linhas 2637–2659 — if=2, for=9, return=1 — chama: buildBusRoadPath, busSpawnIndex, ensureBusStop, enterBus, premiumBox, premiumCylinder, registerInteractable, renderMat, signTexture
- [x] `createTransitWorld()` — linhas 2660–2660 — for=1 — chama: createBusModel, restoreBusWaiting, validateBusCoverage
- [x] `busAtStop()` — linhas 2661–2661 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busEtaSeconds()` — linhas 2662–2662 — if=3, for=1, return=4 — chama: busAtStop, busRoutePoints
- [x] `validateBusCoverage()` — linhas 2663–2663 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `busDestinationsAfter()` — linhas 2664–2666 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openBusArrivalOffer()` — linhas 2667–2676 — if=2, return=3 — chama: busAtStop, busDestinationsAfter, clearBusWaiting, closeModal, enterBus, openModal, setBusState, setBusWaiting, toast
- [x] `offerBusAtStop()` — linhas 2677–2683 — if=6, else=1, return=4 — chama: busAtStop, openBusArrivalOffer
- [x] `openBusStop()` — linhas 2684–2695 — return=1 — chama: busAtStop, busEtaSeconds, clearBusWaiting, closeModal, openBusArrivalOffer, openModal, setBusWaiting, toast
- [x] `ensureTransitPanel()` — linhas 2696–2698 — if=2, return=3 — chama: toast, updateTransitPanel
- [x] `updateTransitPanel()` — linhas 2699–2701 — if=1, return=1 — chama: busNextStop, ensureTransitPanel
- [x] `enterBus()` — linhas 2702–2712 — if=8, return=4 — chama: auditPlayerMode, busAtStop, canEnterMobility, clearBusWaiting, clearMovementInputs, closeModal, saveState, setBusState, toast, updateTransitPanel
- [x] `exitBusAtStop()` — linhas 2713–2721 — if=7, return=2 — chama: advanceAdventure, auditPlayerMode, busAtStop, busStopRecord, rememberSafePlayerPosition, safeBusExitPoint, saveState, setBusState, setFlag, toast, trackDaily, updateContext (+1)
- [x] `updateTransitWorld()` — linhas 2722–2764 — if=30, else=10, for=2 — chama: busRoutePoints, exitBusAtStop, offerBusAtStop, pointOnRoad, recoverBusRoute, setBusState, trafficSpeedFactor

## `16-emergency-services.js`

- [x] `decorateCityServices()` — linhas 2765–2781 — if=1, for=5 — chama: iconTexture, premiumBox, premiumCylinder, updateTransitPanel
- [x] `createFireIncidentSite()` — linhas 2782–2785 — for=2, return=1 — chama: helpExtinguishFire, registerInteractable, renderMat
- [x] `createFireTruck()` — linhas 2786–2791 — for=3, return=1 — chama: premiumBox, premiumCylinder, renderMat
- [x] `createFireServiceWorld()` — linhas 2792–2792 — sem fluxo contado — chama: createFireTruck
- [x] `activateFireIncident()` — linhas 2793–2793 — if=2, return=3 — chama: saveState, toast
- [x] `ensureActiveFire()` — linhas 2794–2794 — return=1 — chama: activateFireIncident
- [x] `helpExtinguishFire()` — linhas 2795–2795 — if=3, for=1, return=2 — chama: extinguishFireIncident, spawnDust, toast
- [x] `extinguishFireIncident()` — linhas 2796–2796 — if=5, for=1, return=1 — chama: addXP, completeActiveJob, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `serviceVehicleRoute()` — linhas 2797–2797 — if=1, return=1 — chama: buildRoutePoints
- [x] `moveServiceVehicle()` — linhas 2798–2798 — if=5, for=1, return=5 — chama: serviceVehicleRoute, snapTrafficToRoad, trafficSpeedFactor
- [x] `updateFireService()` — linhas 2799–2804 — if=12, else=1, for=2, return=1 — chama: activateFireIncident, extinguishFireIncident, moveServiceVehicle, spawnDust
- [x] `createPoliceCar()` — linhas 2805–2813 — if=1, for=1, return=1 — chama: addVoxelOutline, iconTexture, premiumBox, premiumCylinder, renderMat
- [x] `createAmbulance()` — linhas 2814–2820 — for=1, return=1 — chama: premiumBox, premiumCylinder, renderMat
- [x] `createPoliceSystem()` — linhas 2821–2825 — sem fluxo contado — chama: createAmbulance, createPoliceCar
- [x] `movePoliceToward()` — linhas 2826–2829 — if=3, for=1, return=3 — chama: snapTrafficToRoad, trafficSpeedFactor
- [x] `updatePolicePatrol()` — linhas 2830–2832 — if=1 — chama: movePoliceToward
- [x] `updateSafetyPanel()` — linhas 2833–2835 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `startPoliceAlert()` — linhas 2836–2840 — if=2, return=3 — chama: saveState, toast, updateSafetyPanel
- [x] `finishSafetyStop()` — linhas 2841–2844 — if=2, return=1 — chama: clearMovementInputs, exitVehicle, groundHeightAt, openSafetyLesson, saveState, updateSafetyPanel
- [x] `openSafetyLesson()` — linhas 2845–2854 — if=1 — chama: addReputation, addXP, awardMedal, closeModal, openModal, saveState, toast
- [x] `updatePoliceSystem()` — linhas 2855–2876 — if=12, else=3, for=2 — chama: finishSafetyStop, movePoliceToward, npcSpeech, startPoliceAlert, updatePolicePatrol, updateSafetyPanel

## `17-adventures-learning-world.js`

- [x] `moveIncidentResponder()` — linhas 2877–2882 — if=6, for=1, return=5 — chama: buildRoutePoints, snapTrafficToRoad, trafficSpeedFactor
- [x] `createTrafficIncident()` — linhas 2883–2890 — if=7, for=3, return=2 — chama: nearestRoadProjection, premiumBox, premiumCylinder, renderMat, saveState, toast
- [x] `resolveTrafficIncident()` — linhas 2891–2893 — if=5, for=4, return=1 — chama: saveState, toast
- [x] `updateTrafficIncidents()` — linhas 2894–2906 — if=8, for=6, return=3 — chama: createTrafficIncident, moveIncidentResponder, resolveTrafficIncident, trafficActorList
- [x] `openTransitGuide()` — linhas 2907–2910 — sem fluxo contado — chama: openModal, setWaypoint
- [x] `createRoyalCastle()` — linhas 2911–2936 — for=10, return=1 — chama: addGlow, createCastleChallengeTokens, createSignpost, exitHouse, mat, premiumBox, premiumCylinder, registerInteractable, renderMat, toast

## `18-water-fishing-boats.js`

- [x] `createCastleChallengeTokens()` — linhas 2937–2939 — return=1 — chama: mat
- [x] `openAdventureHub()` — linhas 2940–2942 — sem fluxo contado — chama: openModal, startAdventure
- [x] `startAdventure()` — linhas 2943–2945 — if=3, for=1, return=3 — chama: closeModal, saveState, setWaypoint, toast
- [x] `restoreActiveAdventure()` — linhas 2946–2951 — if=2, for=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `advanceAdventure()` — linhas 2952–2954 — if=3, else=1, return=2 — chama: beep, finishAdventure, saveState
- [x] `finishAdventure()` — linhas 2955–2957 — if=4, else=1, for=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, saveState, setFlag, toast
- [x] `updateAdventure()` — linhas 2958–2960 — if=6, for=1, return=2 — chama: advanceAdventure, finishAdventure
- [x] `createLearningStation()` — linhas 2961–2963 — return=1 — chama: iconTexture, mat, openEducationHub, premiumBox, registerInteractable
- [x] `createLearningPlaza()` — linhas 2964–2970 — sem fluxo contado — chama: createLearningStation, createSignpost
- [x] `rectOverlap()` — linhas 2971–2971 — return=1 — chama: nenhuma função nomeada detectada
- [x] `insideWater()` — linhas 2972–2972 — return=1 — chama: nenhuma função nomeada detectada
- [x] `waterAt()` — linhas 2973–2973 — return=1 — chama: insideWater
- [x] `isInsideLakeNavigable()` — linhas 2974–2974 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isNearFishingArea()` — linhas 2975–2975 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resolveWaterWalking()` — linhas 2976–2978 — if=3, return=2 — chama: groundHeightAt, toast, waterAt
- [x] `distanceToBoatDock()` — linhas 2979–2979 — return=1 — chama: nenhuma função nomeada detectada
- [x] `validBoatExit()` — linhas 2980–2980 — return=1 — chama: distanceToBoatDock
- [x] `safeBoatExitPoint()` — linhas 2981–2982 — return=1 — chama: nenhuma função nomeada detectada
- [x] `ensureFishingVisual()` — linhas 2983–2996 — if=1, return=2 — chama: renderMat
- [x] `setFishingLine()` — linhas 2997–2997 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `fishingCastTarget()` — linhas 2998–3004 — if=2, else=1, return=1 — chama: isInsideLakeNavigable
- [x] `beginFishingVisual()` — linhas 3005–3018 — if=2, return=1 — chama: ensureFishingVisual, fishingCastTarget, setFishingLine
- [x] `castFishingVisual()` — linhas 3019–3019 — if=1, return=1 — chama: beep, ensureFishingVisual, fishingCastTarget
- [x] `hookFishingVisual()` — linhas 3020–3020 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `pullFishingVisual()` — linhas 3021–3021 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `restoreFishingCamera()` — linhas 3022–3025 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `stopFishingVisual()` — linhas 3026–3032 — if=4, else=1, return=2 — chama: restoreFishingCamera, setFishingUiActive
- [x] `clearFishingTimers()` — linhas 3033–3033 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `setFishingUiActive()` — linhas 3034–3038 — if=1 — chama: scheduleStableResize, syncMobilePanels
- [x] `cancelFishingSession()` — linhas 3039–3039 — sem fluxo contado — chama: clearFishingTimers, stopFishingVisual
- [x] `ensureFishingModalStyle()` — linhas 3040–3050 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `updateFishingVisual()` — linhas 3051–3061 — if=11, else=6, return=1 — chama: setFishingLine, stopFishingVisual
- [x] `createShoreFisher()` — linhas 3062–3067 — return=1 — chama: createNPC, premiumCylinder, renderMat

## `19-campfire-hunting-house-extensions.js`

- [x] `createShoreFishingLife()` — linhas 3068–3072 — if=1, return=1 — chama: createShoreFisher
- [x] `updateShoreFishers()` — linhas 3073–3076 — if=3, for=1 — chama: nenhuma função nomeada detectada
- [x] `createBoatModel()` — linhas 3077–3081 — sem fluxo contado — chama: premiumBox, registerInteractable, renderMat
- [x] `ensureBoatPanel()` — linhas 3082–3084 — if=1, return=2 — chama: exitBoat, startFishing
- [x] `updateBoatPanel()` — linhas 3085–3094 — if=8, return=6 — chama: auditPlayerMode, boardNpcPassenger, canEnterMobility, ensureBoatPanel, exitVehicle, nearestRideCompanion, saveState, toast, updateVehicleControlsUI
- [x] `enterBoatAsPassenger()` — linhas 3095–3102 — if=4, return=4 — chama: auditPlayerMode, canEnterMobility, exitVehicle, saveState, toast, updateBoatPanel, updateVehicleControlsUI

## `20-world-build-cloud-houses.js`

- [x] `exitBoat()` — linhas 3103–3110 — if=7, else=1, return=3 — chama: auditPlayerMode, groundHeightAt, releaseNpcPassenger, rememberSafePlayerPosition, safeBoatExitPoint, saveState, toast, updateBoatPanel, updateVehicleControlsUI, validBoatExit
- [x] `updateBoatPhysics()` — linhas 3111–3111 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `campfireAllowed()` — linhas 3112–3113 — if=7, return=7 — chama: exitBoat, rectOverlap, toast, waterAt
- [x] `spawnCampfire()` — linhas 3114–3119 — if=2, else=1, for=1, return=1 — chama: mat, mobilityThrottleIntent, openCampfire, premiumCylinder, registerInteractable
- [x] `nearestActiveCampfire()` — linhas 3120–3123 — if=5, return=4 — chama: campfireAllowed, confirmModal, saveState, spawnCampfire, toast, updateMobilityControlLabels
- [x] `finishCampfireCooking()` — linhas 3124–3124 — if=1, return=1 — chama: beep, saveState, toast
- [x] `constrainBoat()` — linhas 3125–3125 — if=3, return=1 — chama: isInsideLakeNavigable
- [x] `openCampfire()` — linhas 3126–3126 — if=1, return=1 — chama: openModal, toast
- [x] `weightedFish()` — linhas 3127–3128 — if=4, for=1, return=5 — chama: closeModal, confirmModal, finishCampfireCooking, openCampfire, saveState, toast, updateHUD
- [x] `startFishing()` — linhas 3129–3131 — if=6, return=6 — chama: isNearFishingArea, toast
- [x] `openNearestCampfire()` — linhas 3132–3133 — if=1, else=1 — chama: beginFishingVisual, ensureFishingModalStyle, nearestActiveCampfire, openCampfire, openModal, setFishingUiActive, toast
- [x] `openCampfireZone()` — linhas 3134–3135 — if=1, else=1 — chama: closeModal, nearestActiveCampfire, openCampfire, openModal
- [x] `createCampfireZone()` — linhas 3136–3137 — for=1 — chama: createSignpost, premiumBox, registerInteractable
- [x] `createForestAnimal()` — linhas 3138–3139 — if=5, for=2, return=4 — chama: beep, cancelFishingSession, castFishingVisual, hookFishingVisual, premiumBox, pullFishingVisual, saveState, stopFishingVisual, vibrate
- [x] `startHunting()` — linhas 3140–3141 — if=9, else=1, return=4 — chama: addCoins, addXP, beep, clearFishingTimers, closeModal, openModal, pullFishingVisual, saveState, stopFishingVisual, toast, vibrate, weightedFish
- [x] `createHuntingArea()` — linhas 3142–3143 — for=1 — chama: createForestAnimal, createSignpost, premiumBox, registerInteractable, startHunting
- [x] `nearestOwnedHouseForExtension()` — linhas 3144–3145 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionPlacement()` — linhas 3146–3146 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionValid()` — linhas 3147–3147 — if=6, for=1, return=6 — chama: rectOverlap
- [x] `clearExtensionPreview()` — linhas 3148–3148 — if=2 — chama: nenhuma função nomeada detectada
- [x] `renderExtensionPreview()` — linhas 3149–3149 — if=3, for=1, return=1 — chama: extensionValid
- [x] `spawnHouseExtension()` — linhas 3150–3150 — if=1, return=1 — chama: playerDisplayName, premiumBox, registerInteractable, registerPlatform, shadeColor, toast
- [x] `resourcesEnough()` — linhas 3151–3151 — return=1 — chama: nenhuma função nomeada detectada
- [x] `costText()` — linhas 3152–3152 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openHouseExtensionPlanner()` — linhas 3153–3153 — if=3, for=1, return=3 — chama: clearExtensionPreview, closeModal, costText, extensionPlacement, extensionValid, nearestOwnedHouseForExtension, openModal, playerDisplayName, renderExtensionPreview, resourcesEnough, saveState, spawnHouseExtension (+1)
- [x] `openHouseExtensionMenu()` — linhas 3154–3154 — sem fluxo contado — chama: closeModal, costText, openHouseExtensionPlanner, openModal
- [x] `createLakeExpansion()` — linhas 3155–3159 — for=3 — chama: createBoatModel, createShoreFishingLife, createSignpost, premiumBox, premiumCylinder, registerInteractable, registerPlatform, startFishing
- [x] `restoreLifeExpansion()` — linhas 3160–3160 — if=2, for=2 — chama: finishCampfireCooking, spawnCampfire, spawnHouseExtension
- [x] `updateLifeActivities()` — linhas 3161–3161 — if=5, for=1, return=1 — chama: finishCampfireCooking, updateShoreFishers
- [x] `createLifeExpansionWorld()` — linhas 3162–3163 — if=2, for=1 — chama: applyCloudWorldObjects, createCampfireZone, createHuntingArea, createLakeExpansion, restoreLifeExpansion
- [x] `buildWorld()` — linhas 3164–3226 — if=4, for=9 — chama: addHouseInterior, box, createAthleticsGym, createChest, createCrystal, createDistrictVisuals, createEnemy, createFenceLine, createFireServiceWorld, createFlower, createGoldFoundry, createGoldMine (+30)
- [x] `collectResource()` — linhas 3227–3236 — if=3, return=3 — chama: addXP, advanceAdventure, beep, checkActiveJob, evaluateMissions, playToolAnimation, saveState, toast, trackDaily, vibrate
- [x] `openChest()` — linhas 3237–3243 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, setFlag, toast

## `21-interactions-shop-social-races.js`

- [x] `cloudHouseRecord()` — linhas 3244–3244 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isMyCloudHouse()` — linhas 3245–3245 — return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileCloudHouses()` — linhas 3246–3275 — if=15, else=1, for=1, return=11 — chama: addCoins, awardMedal, closeModal, cloudHouseRecord, confirmModal, enterHouse, isMyCloudHouse, openModal, saveState, setFlag, startRace, toast
- [x] `enterHouse()` — linhas 3276–3287 — if=5, else=1, for=6, return=2 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, setFlag, toast, updateCamera, updateContext
- [x] `exitHouse()` — linhas 3288–3299 — if=4, else=1, for=6, return=2 — chama: auditPlayerMode, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `openHomeChest()` — linhas 3300–3308 — if=2, return=2 — chama: openModal, playerDisplayName, saveState, toast
- [x] `useActivity()` — linhas 3309–3336 — if=19, else=15, return=2 — chama: addXP, closeModal, openAvatarStudio, openEducationHub, openFireStationDesk, openHomeChest, openModal, openSafetyLesson, openShop, openTeacherJobLesson, openWorkshop, playerDisplayName (+5)
- [x] `openShop()` — linhas 3337–3342 — if=1, return=1 — chama: addCoins, addXP, closeModal, openModal, saveState, toast
- [x] `openWorkshop()` — linhas 3343–3351 — if=3, return=3 — chama: addCoins, addXP, closeModal, openModal, saveState, toast
- [x] `friendshipTier()` — linhas 3352–3352 — return=1 — chama: nenhuma função nomeada detectada
- [x] `changeFriendship()` — linhas 3353–3357 — if=2 — chama: addReputation, addXP, evaluateMissions, saveState, setFlag, toast
- [x] `talkToNPC()` — linhas 3358–3405 — if=25, else=18, return=1 — chama: addCoins, addReputation, changeFriendship, closeModal, completeActiveJob, friendshipTier, openHouseChallenge, openJobCenter, openModal, saveState, setFlag, startRace (+4)
- [x] `openHouseChallenge()` — linhas 3406–3412 — if=1, return=1 — chama: closeModal, openModal, startRace, toast
- [x] `openRaceCenter()` — linhas 3413–3418 — sem fluxo contado — chama: closeModal, openModal, startRace

## `22-careers-jobs-uniforms.js`

- [x] `createRaceOpponent()` — linhas 3419–3421 — return=1 — chama: box
- [x] `clearRaceObjects()` — linhas 3422–3426 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `spawnRaceCoins()` — linhas 3427–3432 — for=1 — chama: cylinder
- [x] `startRace()` — linhas 3433–3443 — if=4, return=2 — chama: createRaceOpponent, exitHouse, saveState, spawnRaceCoins, toast, updateWaypointMarker
- [x] `finishRace()` — linhas 3444–3453 — if=4, else=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, clearRaceObjects, evaluateMissions, saveState, setFlag, toast, trackDaily, updateWaypointMarker
- [x] `updateRace()` — linhas 3454–3483 — if=12, else=4, for=1, return=2 — chama: beep, finishRace
- [x] `setMissionState()` — linhas 3484–3484 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `equipJobUniform()` — linhas 3485–3489 — if=1, return=1 — chama: applyAvatarCustomization, saveState
- [x] `focusActiveJob()` — linhas 3490–3509 — if=13, else=6, return=5 — chama: applyAvatarCustomization, buildRoutePoints, closeModal, confirmModal, ensureActiveFire, exitHouse, saveState, setMissionState, setWaypoint, toast, updateMissionHUD, updateNavigation (+1)
- [x] `activeJobProgress()` — linhas 3510–3521 — if=8, return=9 — chama: nenhuma função nomeada detectada
- [x] `openJobCenter()` — linhas 3522–3530 — sem fluxo contado — chama: activeJobProgress, equipJobUniform, openModal, startJob, toast

## `23-vehicle-effects-driving.js`

- [x] `startJob()` — linhas 3531–3541 — if=6, else=2, return=2 — chama: ensureActiveFire, equipJobUniform, exitHouse, focusActiveJob, saveState, setMissionState, toast, updateMissionHUD
- [x] `completeActiveJob()` — linhas 3542–3555 — if=8, return=3 — chama: applyAvatarCustomization, evaluateMissions, saveState, setFlag, setMissionState, toast, updateHUD, updateMissionHUD, updateWaypointMarker
- [x] `checkActiveJob()` — linhas 3556–3563 — if=4, else=2, return=1 — chama: completeActiveJob
- [x] `restoreActiveJobRuntime()` — linhas 3564–3566 — if=3, return=1 — chama: applyAvatarCustomization, ensureActiveFire, updateMissionHUD
- [x] `updateCareerMissions()` — linhas 3567–3577 — if=11, else=5, return=2 — chama: activeJobProgress, beep, checkActiveJob, completeActiveJob, saveState, setMissionState, setWaypoint, toast, updateMissionHUD, updateWaypointMarker
- [x] `openTeacherJobLesson()` — linhas 3578–3581 — if=1, return=1 — chama: addXP, closeModal, completeActiveJob, openModal, toast
- [x] `openFireStationDesk()` — linhas 3582–3593 — if=6, return=2 — chama: buildRoutePoints, closeModal, ensureActiveFire, equipJobUniform, exitHouse, focusActiveJob, openModal, startJob, toast, updateWaypointMarker
- [x] `startDeliveryJob()` — linhas 3594–3598 — if=1, return=1 — chama: saveState, toast
- [x] `spawnDust()` — linhas 3599–3604 — if=1 — chama: nenhuma função nomeada detectada
- [x] `updateFX()` — linhas 3605–3614 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `startEngineSound()` — linhas 3615–3625 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stopEngineSound()` — linhas 3626–3630 — if=1, catch=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `updateVehicleFX()` — linhas 3631–3655 — if=12, else=2, catch=1, return=2 — chama: beep, spawnDust, sprintRequested, startEngineSound, stopEngineSound

## `24-construction-system.js`

- [x] `mobilityDriverActive()` — linhas 3656–3656 — return=1 — chama: nenhuma função nomeada detectada
- [x] `updateMobilityControlLabels()` — linhas 3657–3664 — if=13, else=1 — chama: mobilityDriverActive, sprintRequested
- [x] `updateVehicleControlsUI()` — linhas 3665–3672 — if=3 — chama: mobilityDriverActive, playerDisplayName, updateMobilityControlLabels
- [x] `vehicleHorn()` — linhas 3673–3675 — if=4, return=2 — chama: beep, mobilityDriverActive, vibrate
- [x] `enterVehicle()` — linhas 3676–3683 — if=5, return=2 — chama: applyVehicleAppearance, boardNpcPassenger, buildRoutePoints, canEnterMobility, clearMovementInputs, groundHeightAt, nearestRideCompanion, saveState, setFlag, setMissionState, startEngineSound, syncPlayerRootScale (+5)
- [x] `enterVehicleAsPassenger()` — linhas 3684–3692 — if=6, return=4 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, exitBoat, saveState, toast, updateAbilityUI, updateRunUI, updateVehicleControlsUI
- [x] `exitVehicle()` — linhas 3693–3701 — if=7, else=1, return=2 — chama: auditPlayerMode, clearMovementInputs, currentVehicleRef, groundHeightAt, persistParkedVehicle, releaseNpcPassenger, rememberSafePlayerPosition, safeVehicleExitPoint, saveState, stopEngineSound, syncPlayerRootScale, toast (+3)
- [x] `repairBridge()` — linhas 3702–3713 — if=2, return=2 — chama: addReputation, addXP, saveState, setFlag, toast
- [x] `buildCostText()` — linhas 3714–3715 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentBuildOwnerIds()` — linhas 3716–3717 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildOwnedByPlayer()` — linhas 3718–3719 — return=1 — chama: currentBuildOwnerIds
- [x] `buildFootprint()` — linhas 3720–3723 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildPlacementCandidate()` — linhas 3724–3729 — if=1, return=2 — chama: canBuildAt, groundHeightAt
- [x] `canBuildAt()` — linhas 3730–3740 — if=7, return=9 — chama: buildFootprint, groundHeightAt, rectOverlap, waterAt
- [x] `createBuildPreviewMesh()` — linhas 3741–3752 — if=7, else=6, for=3, return=3 — chama: sharedBoxGeometry
- [x] `disposeBuildPreview()` — linhas 3753–3755 — if=1, return=1 — chama: nenhuma função nomeada detectada

## `25-render-init-resize-position-collision.js`

- [x] `ensureBuildPanel()` — linhas 3756–3760 — if=1, return=2 — chama: endBuildMode
- [x] `updateBuildPanel()` — linhas 3761–3765 — if=1, return=1 — chama: buildCostText, ensureBuildPanel, resourcesEnough
- [x] `updateBuildPreview()` — linhas 3766–3771 — if=5, return=2 — chama: buildPlacementCandidate, createBuildPreviewMesh, disposeBuildPreview, updateBuildPanel
- [x] `beginBuildMode()` — linhas 3772–3775 — if=2, return=3 — chama: disposeBuildPreview, ensureBuildPanel, toast, updateBuildPreview, updateContext, updateVehicleControlsUI
- [x] `endBuildMode()` — linhas 3776–3778 — if=3, return=2 — chama: disposeBuildPreview, toast, updateContext, updateVehicleControlsUI
- [x] `rotateBuildPreview()` — linhas 3779–3779 — if=1, return=2 — chama: updateBuildPreview, vibrate
- [x] `openBuildMenu()` — linhas 3780–3786 — if=3, return=3 — chama: beginBuildMode, buildCostText, closeModal, openHouseExtensionMenu, openModal, toast
- [x] `placeBuild()` — linhas 3787–3797 — if=5, for=2, catch=1, return=6, throw=1 — chama: addXP, buildCostText, checkActiveJob, evaluateMissions, mergeBuildCollections, normalizeBuildRecord, normalizeBuildTombstones, resourcesEnough, saveState, spawnBuild, syncCloudProgress, toast (+2)
- [x] `spawnBuild()` — linhas 3798–3810 — if=9, else=7, for=2, return=4 — chama: addGlow, box, buildRecordSignature, groundHeightAt, normalizeBuildRecord, premiumBox, registerCollider, registerPlatform
- [x] `buildRecordSignature()` — linhas 3811–3811 — return=1 — chama: nenhuma função nomeada detectada
- [x] `removeWorldBuildRecord()` — linhas 3812–3814 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileWorldBuilds()` — linhas 3815–3826 — if=5, for=2, return=5 — chama: applyBuildTombstones, buildOwnedByPlayer, buildRecordSignature, confirmModal, mergeBuildTombstones, normalizeBuildTombstones, removeWorldBuildRecord, saveState, spawnBuild, syncCloudProgress, toast
- [x] `initThree()` — linhas 3827–3835 — if=1, for=1, return=2 — chama: applyAdaptiveRenderSettings, applyAvatarCustomization, applyQuality, buildWorld, createPlayerModel, freezeWorldFrustumCulling, initLocalMultiplayer, initMaterials, lockStableSceneVisibility, openModal, qualityTier, reconcileCloudHouses (+7)
- [x] `applyQuality()` — linhas 3836–3836 — if=1, return=1 — chama: applyAdaptiveRenderSettings
- [x] `viewportMetrics()` — linhas 3837–3849 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resize()` — linhas 3850–3863 — if=2 — chama: clearMovementInputs, syncMobilePanels, targetDpr, viewportMetrics
- [x] `scheduleStableResize()` — linhas 3864–3864 — sem fluxo contado — chama: resize
- [x] `refreshOrientationLayout()` — linhas 3865–3869 — if=3 — chama: resize, scheduleStableResize
- [x] `restorePosition()` — linhas 3870–3875 — if=1 — chama: isInsideLakeNavigable, rememberSafePlayerPosition, safePointNear
- [x] `returnHome()` — linhas 3876–3882 — if=10, else=1, return=1 — chama: auditPlayerMode, busAtStop, exitBoat, exitBusAtStop, exitHouse, exitVehicle, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `savePlayerPosition()` — linhas 3883–3894 — if=7, else=3 — chama: commitState, isInsideLakeNavigable, saveState

## `26-input-player-physics.js`

- [x] `groundHeightAt()` — linhas 3895–3897 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `positionBlockedForPlayer()` — linhas 3898–3914 — if=11, for=3, return=6 — chama: groundHeightAt, trafficActorList, waterAt
- [x] `safePointNear()` — linhas 3915–3919 — if=1, for=2, return=2 — chama: groundHeightAt, positionBlockedForPlayer
- [x] `rememberSafePlayerPosition()` — linhas 3920–3924 — if=2, return=3 — chama: positionBlockedForPlayer
- [x] `recoverPlayerIfInvalid()` — linhas 3925–3931 — if=2, return=3 — chama: positionBlockedForPlayer, rememberSafePlayerPosition, safePointNear
- [x] `safeVehicleExitPoint()` — linhas 3932–3935 — return=1 — chama: safePointNear
- [x] `vehicleHitsCollider()` — linhas 3936–3944 — if=5, for=2, return=4 — chama: currentVehicleRef, trafficActorList
- [x] `registerVehicleImpact()` — linhas 3945–3948 — if=1 — chama: beep, toast, vibrate
- [x] `resolveCollisions()` — linhas 3949–3958 — if=4, for=1, return=1 — chama: playerScaleValue, registerVehicleImpact, vehicleHitsCollider
- [x] `resolveMovementInput()` — linhas 3959–3979 — if=9, else=7, return=1 — chama: derivePlayerMode, normalizeControlIntent
- [x] `sprintRequested()` — linhas 3980–3980 — return=1 — chama: nenhuma função nomeada detectada
- [x] `updateRunUI()` — linhas 3981–3983 — if=4, return=2 — chama: mobilityDriverActive, sprintRequested, updateMobilityControlLabels
- [x] `clearMovementInputs()` — linhas 3984–3991 — if=1 — chama: updateRunUI
- [x] `canJump()` — linhas 3992–3992 — return=1 — chama: nenhuma função nomeada detectada
- [x] `requestJump()` — linhas 3993–3993 — if=2, return=1 — chama: canJump, doJump
- [x] `doJump()` — linhas 3994–3994 — if=1, return=1 — chama: beep, canJump, trackDaily, vibrate
- [x] `updatePlayer()` — linhas 3995–4029 — if=20, else=6, return=1 — chama: animatePlayer, beep, cameraRelativeVector, canJump, checkHazards, collectNearbyCrystals, constrainBoat, doJump, groundHeightAt, recoverPlayerIfInvalid, rememberSafePlayerPosition, resolveCollisions (+10)

## `27-npc-enemies-combat-camera-action.js`

- [x] `mobilityThrottleIntent()` — linhas 4030–4042 — if=7, return=7 — chama: nenhuma função nomeada detectada
- [x] `updateVehiclePhysics()` — linhas 4043–4057 — if=7, else=1, return=3 — chama: exitVehicle, mobilityThrottleIntent, sprintRequested, toast, updateMobilityControlLabels
- [x] `animatePlayer()` — linhas 4058–4078 — if=12, else=8, return=1 — chama: nenhuma função nomeada detectada
- [x] `nearestRideCompanion()` — linhas 4079–4084 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `nearestBoardableNpc()` — linhas 4085–4087 — return=1 — chama: nenhuma função nomeada detectada
- [x] `checkHazards()` — linhas 4088–4090 — if=4, else=1, for=1 — chama: returnHome, toast
- [x] `boardNpcPassenger()` — linhas 4091–4093 — if=3, return=3 — chama: saveState, toast
- [x] `collectNearbyCrystals()` — linhas 4094–4096 — if=2, for=1 — chama: collectCrystal
- [x] `releaseNpcPassenger()` — linhas 4097–4101 — if=3, return=1 — chama: groundHeightAt
- [x] `npcSpeech()` — linhas 4102–4102 — if=1 — chama: toast
- [x] `updateNpcSociety()` — linhas 4103–4112 — if=9, else=5, return=2 — chama: cloudHouseRecord, npcSpeech, saveState, updateHUD
- [x] `updateNPCs()` — linhas 4113–4147 — if=10, else=7, for=2 — chama: snapTrafficToRoad, trafficSpeedFactor
- [x] `updateEnemies()` — linhas 4148–4156 — if=5, for=1 — chama: beep, saveState, toast, vibrate
- [x] `meleeAttack()` — linhas 4157–4161 — if=1, return=1 — chama: beep, damageEnemy, toast

## `28-multiplayer-social-online.js`

- [x] `damageEnemy()` — linhas 4162–4165 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, toast
- [x] `firePower()` — linhas 4166–4171 — if=3, return=3 — chama: beep, mat, toast, vehicleHorn, vibrate
- [x] `updateFireballs()` — linhas 4172–4175 — if=2, for=2 — chama: damageEnemy
- [x] `updateCamera()` — linhas 4176–4207 — if=6, else=1 — chama: playerScaleValue
- [x] `nearestInteractable()` — linhas 4208–4225 — if=14, for=1, return=12 — chama: boardNpcPassenger, isInteractionAvailable, nearestBoardableNpc, nearestRemotePlayer, openRemotePlayerActions, toast, updateTransitPanel, worldPos
- [x] `updateContext()` — linhas 4226–4229 — if=4, return=2 — chama: nearestInteractable
- [x] `doAction()` — linhas 4230–4241 — if=6, return=2 — chama: isInteractionAvailable, meleeAttack, nearestInteractable, syncMobilePanels, updateContext, worldPos
- [x] `updateNeeds()` — linhas 4242–4248 — if=3, return=1 — chama: playerDisplayName, saveState, sprintRequested, toast, updateHUD
- [x] `multiplayerGameLabel()` — linhas 4249–4250 — return=1 — chama: nenhuma função nomeada detectada
- [x] `pendingChallenges()` — linhas 4251–4251 — return=1 — chama: nenhuma função nomeada detectada
- [x] `readyGameSessions()` — linhas 4252–4252 — return=1 — chama: nenhuma função nomeada detectada
- [x] `closeChallengePrompt()` — linhas 4253–4253 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingChallengePrompt()` — linhas 4254–4254 — if=1, return=1 — chama: multiplayerGameLabel
- [x] `showReadySessionPrompt()` — linhas 4255–4256 — if=2, return=2 — chama: multiplayerGameLabel, sessionOpponentName
- [x] `socialActionLabel()` — linhas 4257–4257 — return=1 — chama: nenhuma função nomeada detectada
- [x] `socialRequestPending()` — linhas 4258–4258 — return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingSocialRequest()` — linhas 4259–4269 — if=6, return=7 — chama: saveState, socialActionLabel, toast
- [x] `applyAcceptedSocialAction()` — linhas 4270–4287 — if=15, else=9, return=3 — chama: closeChallengePrompt, closeModal, enterBoatAsPassenger, enterVehicleAsPassenger, escapeHtml, multiplayerGameLabel, openModal, openNearestCampfire, saveState, sessionOpponentName, startFishing, startHunting (+3)
- [x] `updateOnlineAttention()` — linhas 4288–4288 — if=2 — chama: pendingChallenges, readyGameSessions, socialRequestPending
- [x] `challengeInboxHtml()` — linhas 4289–4289 — return=1 — chama: escapeHtml, multiplayerGameLabel, pendingChallenges
- [x] `socialRequestInboxHtml()` — linhas 4290–4290 — return=1 — chama: escapeHtml, socialActionLabel, socialRequestPending
- [x] `completedGameSessions()` — linhas 4291–4291 — return=1 — chama: nenhuma função nomeada detectada
- [x] `rememberMatchResult()` — linhas 4292–4292 — if=2, return=3 — chama: sessionOpponentName
- [x] `duelHistoryHtml()` — linhas 4293–4293 — return=2 — chama: completedGameSessions, escapeHtml, multiplayerGameLabel, sessionOpponentName
- [x] `activeSessionsHtml()` — linhas 4294–4294 — return=2 — chama: escapeHtml, multiplayerGameLabel, readyGameSessions
- [x] `bindChallengeCards()` — linhas 4295–4297 — if=5, else=1, return=3 — chama: closeChallengePrompt, multiplayerGameLabel, refreshOpenSocialHub, toast, updateOnlineAttention
- [x] `highestUnlockedLevel()` — linhas 4298–4298 — if=1, for=1, return=1 — chama: subjectUnlocked
- [x] `openChallengePicker()` — linhas 4299–4299 — if=1, else=1 — chama: closeModal, highestUnlockedLevel, openModal, toast
- [x] `sessionOpponentName()` — linhas 4300–4300 — return=1 — chama: nenhuma função nomeada detectada
- [x] `startMultiplayerEducationGame()` — linhas 4301–4301 — if=2, return=2 — chama: closeChallengePrompt, escapeHtml, openModal, runEducationGame, saveState, sessionOpponentName, toast
- [x] `maybeShowMultiplayerResult()` — linhas 4302–4302 — if=4, return=3 — chama: addCoins, addXP, escapeHtml, openModal, rememberMatchResult, saveState
- [x] `multiplayerStatusText()` — linhas 4303–4303 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `updateMultiplayerBadge()` — linhas 4304–4304 — if=2, return=1 — chama: nenhuma função nomeada detectada

## `29-game-loop-controls-gamepad.js`

- [x] `onlinePlayers()` — linhas 4305–4305 — return=2 — chama: nenhuma função nomeada detectada
- [x] `onlinePlayerListHtml()` — linhas 4306–4306 — return=1 — chama: escapeHtml, onlinePlayers
- [x] `bindOnlinePlayerCards()` — linhas 4307–4307 — if=1 — chama: openRemotePlayerActions
- [x] `refreshOpenSocialHub()` — linhas 4308–4308 — if=9, return=1 — chama: activeSessionsHtml, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, multiplayerStatusText, onlinePlayerListHtml, onlinePlayers, socialRequestInboxHtml, updateOnlineAttention
- [x] `openSocialHub()` — linhas 4309–4316 — if=2, return=1 — chama: activeSessionsHtml, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, multiplayerStatusText, onlinePlayerListHtml, onlinePlayers, openModal, pendingChallenges, refreshOpenSocialHub (+4)
- [x] `escapeHtml()` — linhas 4317–4317 — return=1 — chama: nenhuma função nomeada detectada
- [x] `chatMessageHtml()` — linhas 4318–4318 — return=1 — chama: escapeHtml
- [x] `openRemotePlayerActions()` — linhas 4319–4331 — if=11, else=4, return=4 — chama: addCoins, closeModal, isNearFishingArea, nearestActiveCampfire, openChallengePicker, openModal, openSocialHub, saveState, toast, triggerEmote
- [x] `nearestRemotePlayer()` — linhas 4332–4332 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openMultiplayerConfig()` — linhas 4333–4333 — sem fluxo contado — chama: openSocialHub
- [x] `applyCloudWorldObjects()` — linhas 4334–4340 — if=8, for=6, return=1 — chama: spawnCampfire, spawnHouseExtension
- [x] `remotePlayerEvent()` — linhas 4341–4371 — if=41, else=12, for=1, while=1, return=7 — chama: applyAcceptedSocialAction, applyCloudWorldObjects, closeChallengePrompt, createGhost, exitBoat, exitVehicle, hasValidPlayerName, maybeShowMultiplayerResult, mergeCloudProgress, multiplayerGameLabel, reconcileCloudHouses, refreshOpenSocialHub (+10)
- [x] `initLocalMultiplayer()` — linhas 4372–4375 — if=5, return=2 — chama: hasValidPlayerName, remotePlayerEvent, updateMultiplayerBadge
- [x] `multiplayerNameTexture()` — linhas 4376–4376 — if=1, else=1, return=1 — chama: sanitizePlayerName
- [x] `updateLocalPlayerNameLabel()` — linhas 4377–4377 — if=2, return=2 — chama: multiplayerNameTexture, playerDisplayName

## `30-pause-tests-public-api-bootstrap.js`

- [x] `updateGhostName()` — linhas 4378–4378 — if=2, return=1 — chama: multiplayerNameTexture, sanitizePlayerName
- [x] `createGhost()` — linhas 4379–4384 — for=1, return=1 — chama: box, cylinder, multiplayerNameTexture, sanitizePlayerName
- [x] `updateMultiplayer()` — linhas 4385–4396 — if=4, for=1 — chama: nenhuma função nomeada detectada
- [x] `gameLoop()` — linhas 4397–4427 — if=15, return=1 — chama: auditPlayerMode, captureTrafficPositions, pollGamepad, qualityTier, refreshTechnicalPanel, resolveTrafficOverlaps, samplePerformance, updateAdventure, updateBuildPreview, updateCamera, updateCareerMissions, updateClouds (+18)
- [x] `setupControls()` — linhas 4428–4453 — if=30, else=4, return=5 — chama: closeModal, doAction, endBuildMode, firePower, mobilityDriverActive, openPauseMenu, requestJump, rotateBuildPreview, saveState, setScaleMode, spinPlayer, toast (+3)
- [x] `pollGamepad()` — linhas 4454–4470 — if=13, else=1, return=4 — chama: accountLinked, accountPromptWasHandled, applyAvatarCustomization, closeModal, doAction, firePower, hasValidPlayerName, initThree, mobilityDriverActive, openAccountCenter, openPlayerNameModal, requestJump (+8)
- [x] `stopGame()` — linhas 4471–4479 — if=12, else=1 — chama: endBuildMode, equippedTool, evaluateMissions, exitBoat, exitBusAtStop, exitVehicle, gameLoop, resize, restorePosition, savePlayerPosition, showScreen, stopEngineSound (+7)
- [x] `openPauseMenu()` — linhas 4480–4491 — if=4, return=1 — chama: closeModal, endBuildMode, openLifePanel, openModal, returnHome, startEngineSound, stopEngineSound, stopGame
- [x] `updateBridgeVisual()` — linhas 4492–4494 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `prepareVehicleTestArea()` — linhas 4495–4507 — if=2, return=1 — chama: clearMovementInputs, enterVehicle, exitVehicle, groundHeightAt
- [x] `stepVehicleSimulation()` — linhas 4508–4655 — if=11, for=5, return=36 — chama: activateFireIncident, applyAdaptiveRenderSettings, auditPlayerMode, beginBuildMode, buildRoutePoints, busAtStop, cameraRelativeVector, closeModal, completeActiveJob, constrainBoat, currentVehicleRef, detectStableAutoTier (+61)
