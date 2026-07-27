# Checklist das 552 funções — OTTHI World Edu V643

Cada item confirma presença na fonte modular. `endBoundaryLine` termina na próxima declaração de função de topo; não é uma afirmação de parsing semântico do corpo JavaScript.


## `01-build-persistence.js`

- [x] `stableBuildId()` — linhas 28–33 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeBuildRecord()` — linhas 34–40 — if=2, return=3 — chama: stableBuildId
- [x] `normalizeBuildList()` — linhas 41–49 — if=2, return=2 — chama: normalizeBuildRecord
- [x] `normalizeBuildTombstones()` — linhas 50–58 — if=3, return=3 — chama: nenhuma função nomeada detectada
- [x] `mergeBuildTombstones()` — linhas 59–59 — return=1 — chama: normalizeBuildTombstones
- [x] `applyBuildTombstones()` — linhas 60–63 — return=1 — chama: normalizeBuildList, normalizeBuildTombstones
- [x] `mergeBuildCollections()` — linhas 64–66 — return=1 — chama: applyBuildTombstones, normalizeBuildList
- [x] `mergeEntityCollections()` — linhas 67–143 — if=2, return=2 — chama: nenhuma função nomeada detectada

## `02-state-save-cloud-account.js`

- [x] `normalizeState()` — linhas 144–197 — if=2, return=1 — chama: applyBuildTombstones, normalizeBuildTombstones
- [x] `loadState()` — linhas 198–246 — if=10, else=2, for=1, catch=4, return=5 — chama: ensureDailyChallenges, normalizeState, updateDailyBadge, updateHUD, updateLobbyStats
- [x] `commitState()` — linhas 247–263 — catch=2, return=2 — chama: applyBuildTombstones, ensureDailyChallenges, normalizeBuildTombstones, syncCloudProgress, syncGameAccount, updateDailyBadge, updateLobbyStats
- [x] `saveState()` — linhas 264–271 — if=1, return=2 — chama: commitState
- [x] `cloudProgressPayload()` — linhas 272–280 — return=1 — chama: nenhuma função nomeada detectada
- [x] `syncCloudProgress()` — linhas 281–284 — if=1, return=2 — chama: cloudProgressPayload, hasValidPlayerName
- [x] `mergeCloudProgress()` — linhas 285–305 — if=3, catch=1, return=3 — chama: mergeBuildCollections, mergeBuildTombstones, mergeEntityCollections, normalizeState, reconcileWorldBuilds, syncCloudProgress, toast, updateHUD, updateLobbyStats, updatePlayerNameUI
- [x] `accountLinked()` — linhas 306–306 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountPromptWasHandled()` — linhas 307–307 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountStatusText()` — linhas 308–324 — if=4, return=7 — chama: accountLinked
- [x] `syncGameAccount()` — linhas 325–378 — if=16, catch=2, return=10, throw=10 — chama: accountLinked, applyPlayerName, commitState, normalizeState, sanitizePlayerName, saveState, updateHUD, updateLobbyStats, updatePlayerNameUI
- [x] `openAccountForm()` — linhas 379–387 — if=4, else=2, catch=1, return=1 — chama: closeModal, escapeHtml, openAccountCenter, openModal, toast
- [x] `openAccountCenter()` — linhas 388–397 — if=2 — chama: accountLinked, closeModal, confirmModal, escapeHtml, openAccountForm, openModal, openPlayerNameModal, saveState, syncGameAccount, toast

## `03-ui-modal-install-pwa.js`

- [x] `addXP()` — linhas 398–408 — if=1 — chama: awardMedal, saveState, toast, updateHUD
- [x] `addCoins()` — linhas 409–412 — sem fluxo contado — chama: saveState, updateHUD
- [x] `addReputation()` — linhas 413–416 — sem fluxo contado — chama: saveState, updateHUD
- [x] `awardMedal()` — linhas 417–422 — if=1, return=1 — chama: saveState, toast
- [x] `setFlag()` — linhas 423–429 — if=1, return=1 — chama: evaluateMissions, saveState
- [x] `showScreen()` — linhas 430–434 — sem fluxo contado — chama: updateInstallUI
- [x] `toast()` — linhas 435–440 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `vibrate()` — linhas 441–443 — if=1 — chama: nenhuma função nomeada detectada
- [x] `beep()` — linhas 444–458 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openModal()` — linhas 459–473 — if=3 — chama: scheduleStableResize
- [x] `closeModal()` — linhas 474–491 — if=4, else=1 — chama: cancelFishingSession, clearExtensionPreview, startEngineSound, stopFishingVisual
- [x] `confirmModal()` — linhas 492–505 — if=1, return=1 — chama: closeModal, openModal
- [x] `updateInstallUI()` — linhas 506–552 — if=5, return=2 — chama: openModal, toast
- [x] `isOfficialOtthiGameAddress()` — linhas 553–659 — if=13, catch=7, return=11, throw=1 — chama: saveState, updateInstallUI

## `04-education-daily-quiz.js`

- [x] `localDateKey()` — linhas 660–660 — return=1 — chama: nenhuma função nomeada detectada
- [x] `daysBetween()` — linhas 661–661 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `ensureDailyChallenges()` — linhas 662–662 — if=1, while=1, return=1 — chama: daysBetween, localDateKey, saveState
- [x] `dailyDefinition()` — linhas 663–663 — return=1 — chama: nenhuma função nomeada detectada
- [x] `trackDaily()` — linhas 664–669 — if=5, for=1, return=1 — chama: ensureDailyChallenges, saveState, updateDailyBadge
- [x] `updateDailyBadge()` — linhas 670–670 — if=2, return=1 — chama: ensureDailyChallenges
- [x] `claimDailyQuest()` — linhas 671–684 — if=1, return=1 — chama: addCoins, addReputation, addXP, beep, dailyDefinition, openDailyChallenges, saveState, toast, vibrate
- [x] `seeded()` — linhas 685–685 — return=1 — chama: nenhuma função nomeada detectada
- [x] `shuffled()` — linhas 686–686 — return=1 — chama: nenhuma função nomeada detectada
- [x] `choiceSet()` — linhas 687–687 — return=1 — chama: shuffled
- [x] `mathRound()` — linhas 688–696 — if=5, return=6 — chama: choiceSet
- [x] `portugueseRound()` — linhas 697–705 — if=5, return=6 — chama: choiceSet, shuffled
- [x] `englishRound()` — linhas 706–714 — if=5, return=6 — chama: choiceSet
- [x] `generateEducationRounds()` — linhas 715–715 — return=1 — chama: seeded
- [x] `subjectLevelRecord()` — linhas 716–716 — return=1 — chama: nenhuma função nomeada detectada
- [x] `subjectUnlocked()` — linhas 717–717 — return=1 — chama: subjectLevelRecord
- [x] `educationSummary()` — linhas 718–718 — if=1, for=2, return=1 — chama: subjectLevelRecord
- [x] `speakKidWord()` — linhas 719–719 — catch=1 — chama: nenhuma função nomeada detectada
- [x] `dailyChallengesHtml()` — linhas 720–720 — return=2 — chama: dailyDefinition, ensureDailyChallenges
- [x] `educationSubjectHtml()` — linhas 721–721 — return=2 — chama: subjectLevelRecord, subjectUnlocked
- [x] `openEducationHub()` — linhas 722–731 — if=5, return=4 — chama: claimDailyQuest, dailyChallengesHtml, educationSubjectHtml, educationSummary, ensureDailyChallenges, openModal, openSocialHub, playerDisplayName, startSoloEducationGame
- [x] `openChallengeHub()` — linhas 732–732 — sem fluxo contado — chama: openEducationHub
- [x] `openDailyChallenges()` — linhas 733–733 — sem fluxo contado — chama: openEducationHub
- [x] `runEducationGame()` — linhas 734–747 — if=6, else=1, return=4 — chama: addXP, beep, escapeHtml, finishSoloEducationGame, generateEducationRounds, openModal, speakKidWord
- [x] `startSoloEducationGame()` — linhas 748–748 — catch=1 — chama: closeChallengePrompt, runEducationGame, toast
- [x] `finishSoloEducationGame()` — linhas 749–751 — if=2, else=1 — chama: addCoins, addXP, awardMedal, openEducationHub, openModal, saveState, startSoloEducationGame, subjectLevelRecord
- [x] `startCinematicEmote()` — linhas 752–754 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `triggerEmote()` — linhas 755–765 — if=4 — chama: addXP, beep, startCinematicEmote, toast, vibrate
- [x] `openQuiz()` — linhas 766–768 — sem fluxo contado — chama: openEducationHub
- [x] `openCollection()` — linhas 769–787 — sem fluxo contado — chama: openModal

## `05-avatar-life-customization.js`

- [x] `effectiveAvatarUniform()` — linhas 788–795 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `avatarChoiceGroup()` — linhas 796–800 — return=1 — chama: effectiveAvatarUniform
- [x] `openAvatarStudio()` — linhas 801–810 — sem fluxo contado — chama: applyAvatarCustomization, avatarChoiceGroup, closeModal, openModal, playerDisplayName, saveState, setFlag, toast
- [x] `openLifePanel()` — linhas 811–826 — if=2, for=1 — chama: closeModal, openModal, toast
- [x] `openMolds()` — linhas 827–829 — sem fluxo contado — chama: openModal, playerDisplayName
- [x] `openHow()` — linhas 830–928 — sem fluxo contado — chama: openModal

## `06-missions-profile-hud-inventory-tools.js`

- [x] `deriveMissionFlags()` — linhas 929–940 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `evaluateMissions()` — linhas 941–958 — if=2, for=1 — chama: addCoins, awardMedal, deriveMissionFlags, toast, updateMissionHUD
- [x] `updateMissionHUD()` — linhas 959–977 — if=2, return=2 — chama: activeJobProgress, playerText
- [x] `objectiveStatusLabel()` — linhas 978–978 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillMasterySummary()` — linhas 979–979 — return=1 — chama: nenhuma função nomeada detectada
- [x] `pinChapter()` — linhas 980–980 — sem fluxo contado — chama: evaluateMissions, saveState, toast, updateMissionHUD
- [x] `openObjectivesPanel()` — linhas 981–988 — return=1 — chama: activeJobProgress, deriveMissionFlags, openModal, pinChapter, playerText, skillMasterySummary
- [x] `sanitizePlayerName()` — linhas 989–989 — return=1 — chama: nenhuma função nomeada detectada
- [x] `hasValidPlayerName()` — linhas 990–990 — return=1 — chama: sanitizePlayerName
- [x] `playerDisplayName()` — linhas 991–991 — return=1 — chama: hasValidPlayerName, sanitizePlayerName
- [x] `playerText()` — linhas 992–992 — return=1 — chama: playerDisplayName
- [x] `updatePlayerNameUI()` — linhas 993–993 — if=7 — chama: accountStatusText, hasValidPlayerName, playerDisplayName
- [x] `applyPlayerName()` — linhas 994–994 — if=2, return=2 — chama: sanitizePlayerName, saveState, toast, updatePlayerNameUI
- [x] `openPlayerNameModal()` — linhas 995–999 — if=3, return=1 — chama: applyPlayerName, closeModal, hasValidPlayerName, openModal, toast
- [x] `updateLobbyStats()` — linhas 1000–1006 — sem fluxo contado — chama: updatePlayerNameUI
- [x] `updateHUD()` — linhas 1007–1021 — if=1 — chama: updateMissionHUD, updatePlayerNameUI
- [x] `openInventory()` — linhas 1022–1034 — if=1, return=1 — chama: openModal, saveState, toast, updateHUD
- [x] `equippedTool()` — linhas 1035–1035 — return=1 — chama: nenhuma função nomeada detectada
- [x] `equipTool()` — linhas 1036–1038 — if=2, return=2 — chama: refreshEquippedToolVisual, saveState, toast
- [x] `openToolbelt()` — linhas 1039–1041 — sem fluxo contado — chama: closeModal, equipTool, openModal
- [x] `refreshEquippedToolVisual()` — linhas 1042–1055 — if=4, else=2, return=1 — chama: box, renderMat
- [x] `playToolAnimation()` — linhas 1056–1064 — sem fluxo contado — chama: beep, vibrate

## `07-navigation-traffic-routes.js`

- [x] `routeLength()` — linhas 1065–1065 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `compactRoute()` — linhas 1066–1066 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToSegment()` — linhas 1067–1067 — return=1 — chama: nenhuma função nomeada detectada
- [x] `navBlocked()` — linhas 1068–1068 — if=3, for=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `segmentClear()` — linhas 1069–1069 — if=1, for=1, return=2 — chama: navBlocked
- [x] `nearestRoadProjection()` — linhas 1070–1070 — if=1, for=1, return=1 — chama: projectPointToSegment, segmentClear
- [x] `pointOnRoad()` — linhas 1071–1071 — return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToPolyline()` — linhas 1072–1076 — if=3, for=1, return=2 — chama: projectPointToSegment
- [x] `snapTrafficToRoad()` — linhas 1077–1082 — if=3, return=3 — chama: nearestRoadProjection, pointOnRoad, projectPointToPolyline
- [x] `trafficActorList()` — linhas 1083–1094 — if=6, for=5, return=2 — chama: nenhuma função nomeada detectada
- [x] `trafficPriority()` — linhas 1095–1095 — if=4, else=2, return=2 — chama: nenhuma função nomeada detectada
- [x] `trafficSpeedFactor()` — linhas 1096–1105 — if=6, for=1, return=3 — chama: trafficActorList, trafficPriority
- [x] `captureTrafficPositions()` — linhas 1106–1106 — for=1, return=1 — chama: trafficActorList
- [x] `resolveTrafficOverlaps()` — linhas 1107–1119 — if=8, else=2, for=3 — chama: pointOnRoad, snapTrafficToRoad, trafficActorList
- [x] `graphAdd()` — linhas 1120–1120 — if=2 — chama: nenhuma função nomeada detectada
- [x] `graphShortest()` — linhas 1121–1121 — if=6, for=2, while=2, return=2 — chama: nenhuma função nomeada detectada
- [x] `buildRoutePoints()` — linhas 1122–1133 — if=4, for=2, return=3 — chama: compactRoute, graphAdd, graphShortest, nearestRoadProjection
- [x] `routeProgressInfo()` — linhas 1134–1134 — if=2, for=1, return=2 — chama: projectPointToSegment, routeLength
- [x] `remainingRoute()` — linhas 1135–1135 — return=1 — chama: compactRoute, routeProgressInfo
- [x] `sampleRoute()` — linhas 1136–1136 — for=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createRouteGuide()` — linhas 1137–1137 — if=1, for=1, return=1 — chama: mat
- [x] `updateRouteGuide()` — linhas 1138–1138 — if=3, return=2 — chama: buildRoutePoints, createRouteGuide, groundHeightAt, remainingRoute, routeProgressInfo, sampleRoute
- [x] `miniPoint()` — linhas 1139–1139 — return=1 — chama: nenhuma função nomeada detectada
- [x] `drawMiniMap()` — linhas 1140–1140 — if=3, for=1, return=1 — chama: miniPoint, remainingRoute
- [x] `updateNavigation()` — linhas 1141–1141 — if=4, else=1, return=2 — chama: beep, drawMiniMap, routeProgressInfo, saveState, toast, updateRouteGuide
- [x] `routeSvgMarkup()` — linhas 1142–1202 — return=1 — chama: playerDisplayName, worldToMap

## `08-map-parent-settings.js`

- [x] `mapLocationDetails()` — linhas 1203–1204 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldToMap()` — linhas 1205–1206 — return=1 — chama: nenhuma função nomeada detectada
- [x] `mapDistance()` — linhas 1207–1208 — return=1 — chama: nenhuma função nomeada detectada
- [x] `mapMarkerPlacements()` — linhas 1209–1244 — if=5, else=2, for=4, return=4 — chama: worldToMap
- [x] `applyMapMarkerPlacements()` — linhas 1245–1252 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `mapSelectionMarkup()` — linhas 1253–1256 — if=1, return=2 — chama: mapDistance, mapLocationDetails
- [x] `setWaypoint()` — linhas 1257–1261 — if=1, return=1 — chama: buildRoutePoints, closeModal, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `clearWaypoint()` — linhas 1262–1262 — sem fluxo contado — chama: closeModal, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `openMap()` — linhas 1263–1281 — if=2, return=3 — chama: applyMapMarkerPlacements, buildRoutePoints, mapDistance, mapMarkerPlacements, mapSelectionMarkup, openModal, routeProgressInfo, routeSvgMarkup, setWaypoint, worldToMap
- [x] `refreshOpenMapAfterResize()` — linhas 1282–1284 — if=2, return=1 — chama: openMap
- [x] `performLocalReset()` — linhas 1285–1287 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openFinalResetConfirmation()` — linhas 1288–1293 — if=3, return=2 — chama: commitState, confirmModal, openModal, openParentTools, performLocalReset
- [x] `openParentTools()` — linhas 1294–1301 — if=2, catch=1, return=2 — chama: confirmModal, normalizeState, openFinalResetConfirmation, openModal, openSettings, toast
- [x] `openParentGate()` — linhas 1302–1312 — if=5, return=3 — chama: accountLinked, openModal, openParentTools, openSettings
- [x] `openSettings()` — linhas 1313–1363 — if=11, else=6 — chama: accountStatusText, applyQuality, closeChallengePrompt, closeModal, commitState, hasValidPlayerName, multiplayerStatusText, openAccountCenter, openEducationHub, openModal, openParentGate, openPlayerNameModal (+8)

## `09-responsive-ar-quality-diagnostics.js`

- [x] `syncMobilePanels()` — linhas 1364–1412 — if=16, catch=1, return=1, throw=2 — chama: openObjectivesPanel, saveState
- [x] `otthiGameModelUrl()` — linhas 1413–1416 — return=1 — chama: nenhuma função nomeada detectada
- [x] `androidSceneViewerUrl()` — linhas 1417–1426 — return=1 — chama: otthiGameModelUrl
- [x] `isAndroidDevice()` — linhas 1427–1430 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openAndroidSceneViewer()` — linhas 1431–1472 — if=5, catch=2, return=4 — chama: androidSceneViewerUrl, isAndroidDevice, openModal, toast
- [x] `detectStableAutoTier()` — linhas 1473–1492 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `vehiclePlayerMode()` — linhas 1493–1499 — if=3, return=4 — chama: nenhuma função nomeada detectada
- [x] `derivePlayerMode()` — linhas 1500–1510 — if=8, return=9 — chama: vehiclePlayerMode
- [x] `auditPlayerMode()` — linhas 1511–1526 — if=7, return=1 — chama: derivePlayerMode
- [x] `isOnFootMode()` — linhas 1527–1527 — return=1 — chama: derivePlayerMode
- [x] `canEnterMobility()` — linhas 1528–1532 — if=1, return=2 — chama: auditPlayerMode, isOnFootMode
- [x] `cameraRelativeVector()` — linhas 1533–1537 — return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeControlIntent()` — linhas 1538–1545 — if=2, return=3 — chama: cameraRelativeVector, derivePlayerMode
- [x] `requestedQuality()` — linhas 1546–1546 — return=1 — chama: nenhuma função nomeada detectada
- [x] `qualityLabel()` — linhas 1547–1547 — return=1 — chama: qualityTier, requestedQuality
- [x] `qualityTier()` — linhas 1548–1548 — return=1 — chama: requestedQuality
- [x] `targetDpr()` — linhas 1549–1554 — if=2, return=3 — chama: qualityTier
- [x] `applyAdaptiveRenderSettings()` — linhas 1555–1563 — if=4, return=1 — chama: qualityTier, scheduleStableResize, targetDpr
- [x] `samplePerformance()` — linhas 1564–1583 — if=6, else=2, return=2 — chama: applyAdaptiveRenderSettings, lockStableSceneVisibility, requestedQuality, saveState, toast
- [x] `lockStableSceneVisibility()` — linhas 1584–1590 — if=4, for=3 — chama: qualityTier
- [x] `freezeWorldFrustumCulling()` — linhas 1591–1605 — if=4, else=1, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `updateVisualLOD()` — linhas 1606–1613 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `pwaInstalled()` — linhas 1614–1614 — return=1 — chama: nenhuma função nomeada detectada
- [x] `activeVehicleCount()` — linhas 1615–1615 — return=1 — chama: nenhuma função nomeada detectada
- [x] `runtimeDiagnostics()` — linhas 1616–1619 — return=1 — chama: activeVehicleCount, auditPlayerMode, pwaInstalled
- [x] `ensureTechnicalPanel()` — linhas 1620–1622 — if=1, return=2 — chama: toggleTechnicalPanel
- [x] `refreshTechnicalPanel()` — linhas 1623–1623 — if=1, return=1 — chama: ensureTechnicalPanel, qualityTier, runtimeDiagnostics
- [x] `toggleTechnicalPanel()` — linhas 1624–1624 — if=1 — chama: ensureTechnicalPanel, refreshTechnicalPanel

## `10-player-skills.js`

- [x] `initTechnicalPanel()` — linhas 1625–1629 — if=2 — chama: toggleTechnicalPanel
- [x] `playerScaleValue()` — linhas 1630–1632 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillReady()` — linhas 1633–1633 — if=1, return=2 — chama: toast
- [x] `recordAdvancedSkill()` — linhas 1634–1639 — for=1 — chama: advanceAdventure, saveState, trackDaily, updateAbilityUI
- [x] `collectCrystal()` — linhas 1640–1642 — if=1, return=2 — chama: addCoins, addXP, beep, checkActiveJob, evaluateMissions, saveState, toast, trackDaily, vibrate
- [x] `syncPlayerRootScale()` — linhas 1643–1652 — if=2, return=2 — chama: playerScaleValue
- [x] `setScaleMode()` — linhas 1653–1672 — if=10, else=2, for=2, return=7 — chama: beep, damageEnemy, recordAdvancedSkill, saveState, skillReady, spawnDust, toast, trackDaily, updateAbilityUI, vibrate
- [x] `toggleCrouch()` — linhas 1673–1682 — if=3, return=3 — chama: beep, playerDisplayName, recordAdvancedSkill, saveState, skillReady, toast, updateAbilityUI
- [x] `spinPlayer()` — linhas 1683–1689 — if=3, for=2, return=1 — chama: addXP, beep, collectCrystal, damageEnemy, recordAdvancedSkill, skillReady, toast
- [x] `updateAbilityUI()` — linhas 1690–1696 — if=2, for=2 — chama: nenhuma função nomeada detectada

## `11-render-materials-player-model.js`

- [x] `canvasTexture()` — linhas 1697–1733 — if=11, else=9, for=24, return=2 — chama: nenhuma função nomeada detectada
- [x] `professionalTexture()` — linhas 1734–1739 — if=1, else=1, return=1 — chama: canvasTexture
- [x] `initMaterials()` — linhas 1740–1785 — sem fluxo contado — chama: canvasTexture, professionalTexture
- [x] `mat()` — linhas 1786–1791 — return=1 — chama: nenhuma função nomeada detectada
- [x] `geometryKey()` — linhas 1792–1792 — return=1 — chama: nenhuma função nomeada detectada
- [x] `sharedBoxGeometry()` — linhas 1793–1797 — if=1, return=1 — chama: geometryKey
- [x] `sharedCylinderGeometry()` — linhas 1798–1802 — if=1, return=1 — chama: geometryKey
- [x] `renderMat()` — linhas 1803–1808 — if=1, return=1 — chama: mat
- [x] `tintedBrickMaterial()` — linhas 1809–1811 — return=1 — chama: nenhuma função nomeada detectada
- [x] `texturedRoofMaterial()` — linhas 1812–1814 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `addSoftHighlight()` — linhas 1815–1819 — return=1 — chama: sharedBoxGeometry
- [x] `box()` — linhas 1820–1824 — return=1 — chama: mat, sharedBoxGeometry
- [x] `stabilizeSurface()` — linhas 1825–1825 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stableBox()` — linhas 1826–1826 — return=1 — chama: box, stabilizeSurface
- [x] `cylinder()` — linhas 1827–1831 — return=1 — chama: mat, sharedCylinderGeometry
- [x] `addGlow()` — linhas 1832–1835 — return=1 — chama: nenhuma função nomeada detectada
- [x] `addVoxelOutline()` — linhas 1836–1840 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `premiumBox()` — linhas 1841–1843 — return=1 — chama: addVoxelOutline, box
- [x] `premiumCylinder()` — linhas 1844–1846 — return=1 — chama: addVoxelOutline, cylinder
- [x] `makeWindow()` — linhas 1847–1850 — return=1 — chama: mat, premiumBox
- [x] `makePlanter()` — linhas 1851–1854 — for=1, return=1 — chama: premiumBox
- [x] `createPlayerModel()` — linhas 1855–1916 — if=3, for=2 — chama: addSoftHighlight, addVoxelOutline, box, mat, multiplayerNameTexture, playerDisplayName, refreshEquippedToolVisual, renderMat, sharedCylinderGeometry
- [x] `loadFaithfulAthosModel()` — linhas 1917–1922 — return=1 — chama: nenhuma função nomeada detectada
- [x] `clearAvatarLayer()` — linhas 1923–1928 — if=1 — chama: nenhuma função nomeada detectada
- [x] `applyAvatarCustomization()` — linhas 1929–1960 — if=18, else=11, return=1 — chama: box, clearAvatarLayer, effectiveAvatarUniform, mat
- [x] `registerCollider()` — linhas 1961–1961 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `registerPlatform()` — linhas 1962–1962 — sem fluxo contado — chama: nenhuma função nomeada detectada

## `12-world-resources-nature.js`

- [x] `registerInteractable()` — linhas 1963–1963 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldPos()` — linhas 1964–1967 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `isInteractionAvailable()` — linhas 1968–1974 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `ensureFlowerBatch()` — linhas 1975–1988 — if=2, return=1 — chama: renderMat, sharedBoxGeometry
- [x] `createTree()` — linhas 1989–2007 — if=2, return=1 — chama: box, collectResource, registerInteractable, renderMat
- [x] `createRock()` — linhas 2008–2011 — if=1, return=1 — chama: collectResource, registerInteractable
- [x] `createGoldFoundry()` — linhas 2012–2019 — return=1 — chama: premiumBox, registerCollider, registerInteractable, renderMat, signTexture, texturedRoofMaterial
- [x] `createGoldMine()` — linhas 2020–2033 — for=2, return=1 — chama: collectResource, createLamp, createSignpost, premiumBox, registerInteractable, renderMat
- [x] `createVillageWell()` — linhas 2034–2042 — for=1, return=1 — chama: createSignpost, premiumBox, premiumCylinder, registerInteractable
- [x] `drawWaterFromWell()` — linhas 2043–2047 — if=3, return=2 — chama: addXP, advanceAdventure, playToolAnimation, saveState, toast, updateHUD
- [x] `createFlower()` — linhas 2048–2057 — if=2 — chama: ensureFlowerBatch
- [x] `createLamp()` — linhas 2058–2065 — return=1 — chama: addGlow, box, renderMat
- [x] `createSignpost()` — linhas 2066–2071 — return=1 — chama: box, signTexture
- [x] `createFenceLine()` — linhas 2072–2075 — for=1 — chama: box
- [x] `createRoad()` — linhas 2076–2093 — if=1, else=1, for=2 — chama: renderMat, stableBox
- [x] `createWater()` — linhas 2094–2094 — for=1 — chama: stableBox
- [x] `createLava()` — linhas 2095–2096 — return=1 — chama: mat, stableBox
- [x] `createFurniture()` — linhas 2097–2158 — if=16, for=15, return=1 — chama: box, cylinder, premiumBox, premiumCylinder, renderMat, shadeColor
- [x] `signTexture()` — linhas 2159–2189 — if=3, else=2, for=1, while=1, return=1 — chama: nenhuma função nomeada detectada

## `13-houses-npcs-vehicles-base.js`

- [x] `shadeColor()` — linhas 2190–2195 — return=1 — chama: nenhuma função nomeada detectada
- [x] `decorateHouseCommercial()` — linhas 2196–2212 — if=3, else=1, for=1 — chama: addVoxelOutline, box, makePlanter, premiumBox, shadeColor
- [x] `createHouse()` — linhas 2213–2239 — if=1, for=1, return=1 — chama: box, createFlower, createLamp, decorateHouseCommercial, makeWindow, registerCollider, registerInteractable, renderMat, shadeColor, signTexture, texturedRoofMaterial, tintedBrickMaterial
- [x] `addHouseInterior()` — linhas 2240–2287 — if=7, else=6, for=11 — chama: addGlow, createFurniture, exitHouse, premiumBox, premiumCylinder, registerActivity, registerInteractable
- [x] `registerActivity()` — linhas 2288–2291 — sem fluxo contado — chama: activityIcon, registerInteractable, useActivity
- [x] `activityIcon()` — linhas 2292–2293 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createNPC()` — linhas 2294–2312 — if=4, else=1, for=2, return=1 — chama: addVoxelOutline, box, iconTexture, registerInteractable, renderMat, shadeColor, talkToNPC
- [x] `createNpcMobility()` — linhas 2313–2326 — if=5, else=3, for=4, return=3 — chama: addVoxelOutline, nearestRoadProjection, premiumBox, premiumCylinder
- [x] `createEnemy()` — linhas 2327–2333 — if=2, else=2, return=1 — chama: box
- [x] `createCrystal()` — linhas 2334–2337 — sem fluxo contado — chama: addGlow, mat
- [x] `createChest()` — linhas 2338–2340 — if=1, return=1 — chama: box, openChest, registerInteractable
- [x] `createPlatform()` — linhas 2341–2341 — sem fluxo contado — chama: box, registerPlatform
- [x] `vehicleById()` — linhas 2342–2342 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentVehicleRef()` — linhas 2343–2343 — if=3, return=4 — chama: vehicleById
- [x] `applyVehicleAppearance()` — linhas 2344–2347 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `persistParkedVehicle()` — linhas 2348–2350 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `createToyCar()` — linhas 2351–2363 — if=2, for=1, return=1 — chama: addVoxelOutline, box, cylinder, enterVehicle, registerInteractable, renderMat
- [x] `createWaypointMarker()` — linhas 2364–2369 — sem fluxo contado — chama: box, mat, updateWaypointMarker
- [x] `updateWaypointMarker()` — linhas 2370–2374 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createAthleticsGym()` — linhas 2375–2382 — for=1 — chama: box, createLamp, openRaceCenter, registerInteractable
- [x] `createSizeChallenges()` — linhas 2383–2400 — if=3, return=3 — chama: addXP, box, registerInteractable, setFlag, toast
- [x] `createSkyDome()` — linhas 2401–2416 — for=1 — chama: renderMat, sharedBoxGeometry
- [x] `updateClouds()` — linhas 2417–2422 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada

## `14-world-district-decoration.js`

- [x] `createVoxelMushroom()` — linhas 2423–2431 — if=1, return=1 — chama: addVoxelOutline, box, renderMat, shadeColor
- [x] `iconTexture()` — linhas 2432–2434 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createChallengeCube()` — linhas 2435–2435 — return=1 — chama: box, iconTexture
- [x] `createPortalArch()` — linhas 2436–2441 — for=1, return=1 — chama: addGlow, box, mat
- [x] `createPlayground()` — linhas 2442–2445 — for=1, return=1 — chama: box
- [x] `createFountain()` — linhas 2446–2446 — return=1 — chama: addGlow, cylinder, mat
- [x] `createAwning()` — linhas 2447–2447 — for=1, return=1 — chama: box
- [x] `createStreetTree()` — linhas 2448–2453 — return=1 — chama: makePlanter, premiumBox
- [x] `createBackdropBuilding()` — linhas 2454–2462 — for=2, return=1 — chama: addVoxelOutline, box, renderMat, shadeColor
- [x] `createFloatingIsland()` — linhas 2463–2466 — for=1, return=1 — chama: addVoxelOutline, mat, premiumBox
- [x] `createCoinTrail()` — linhas 2467–2469 — sem fluxo contado — chama: mat
- [x] `createCommercialDistrict()` — linhas 2470–2478 — sem fluxo contado — chama: createBackdropBuilding, createCoinTrail, createFloatingIsland, createStreetTree
- [x] `createDistrictVisuals()` — linhas 2479–2510 — sem fluxo contado — chama: createAwning, createChallengeCube, createCommercialDistrict, createFountain, createPlayground, createPortalArch, createVoxelMushroom

## `15-transit-bus-metro.js`

- [x] `compactBusPath()` — linhas 2511–2513 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectedBusPoint()` — linhas 2514–2514 — return=1 — chama: nearestRoadProjection
- [x] `offsetBusPath()` — linhas 2515–2522 — if=2, for=1, return=4 — chama: compactBusPath, pointOnRoad
- [x] `buildBusRoadPath()` — linhas 2523–2536 — if=4, for=2, return=3 — chama: buildRoutePoints, compactBusPath, nearestRoadProjection, offsetBusPath, projectedBusPoint
- [x] `busRoutePoints()` — linhas 2537–2537 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busNextStop()` — linhas 2538–2538 — if=1, for=1, return=2 — chama: busRoutePoints
- [x] `nearestForwardBusSegment()` — linhas 2539–2543 — if=2, for=1, return=2 — chama: projectPointToSegment
- [x] `recoverBusRoute()` — linhas 2544–2547 — if=2, return=2 — chama: busRoutePoints, nearestForwardBusSegment, projectPointToPolyline, setBusState
- [x] `setBusState()` — linhas 2548–2550 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `setBusWaiting()` — linhas 2551–2553 — return=1 — chama: saveState
- [x] `clearBusWaiting()` — linhas 2554–2554 — if=1 — chama: saveState
- [x] `restoreBusWaiting()` — linhas 2555–2555 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `busStopRecord()` — linhas 2556–2556 — return=1 — chama: nenhuma função nomeada detectada
- [x] `safeBusExitPoint()` — linhas 2557–2562 — if=1, return=2 — chama: busStopRecord, groundHeightAt, positionBlockedForPlayer, safePointNear
- [x] `createMetroEntrance()` — linhas 2563–2571 — for=2, return=1 — chama: iconTexture, openMetroStation, premiumBox, registerInteractable
- [x] `ensureMetroOverlay()` — linhas 2572–2574 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openMetroStation()` — linhas 2575–2579 — if=2, return=1 — chama: openModal, rideMetroTo, toast
- [x] `rideMetroTo()` — linhas 2580–2593 — if=9, return=3 — chama: advanceAdventure, auditPlayerMode, canEnterMobility, clearMovementInputs, closeModal, ensureMetroOverlay, rememberSafePlayerPosition, safePointNear, saveState, setFlag, toast, trackDaily (+2)
- [x] `ensureBusStop()` — linhas 2594–2597 — if=2, return=2 — chama: iconTexture, openBusStop, premiumBox, registerInteractable
- [x] `busSpawnIndex()` — linhas 2598–2600 — if=2, for=1, return=2 — chama: pointOnRoad, trafficActorList
- [x] `createBusModel()` — linhas 2601–2623 — if=2, for=9, return=1 — chama: buildBusRoadPath, busSpawnIndex, ensureBusStop, enterBus, premiumBox, premiumCylinder, registerInteractable, renderMat, signTexture
- [x] `createTransitWorld()` — linhas 2624–2624 — for=1 — chama: createBusModel, restoreBusWaiting, validateBusCoverage
- [x] `busAtStop()` — linhas 2625–2625 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busEtaSeconds()` — linhas 2626–2626 — if=3, for=1, return=4 — chama: busAtStop, busRoutePoints
- [x] `validateBusCoverage()` — linhas 2627–2627 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `busDestinationsAfter()` — linhas 2628–2630 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openBusArrivalOffer()` — linhas 2631–2640 — if=2, return=3 — chama: busAtStop, busDestinationsAfter, clearBusWaiting, closeModal, enterBus, openModal, setBusState, setBusWaiting, toast
- [x] `offerBusAtStop()` — linhas 2641–2647 — if=6, else=1, return=4 — chama: busAtStop, openBusArrivalOffer
- [x] `openBusStop()` — linhas 2648–2659 — return=1 — chama: busAtStop, busEtaSeconds, clearBusWaiting, closeModal, openBusArrivalOffer, openModal, setBusWaiting, toast
- [x] `ensureTransitPanel()` — linhas 2660–2662 — if=2, return=3 — chama: toast, updateTransitPanel
- [x] `updateTransitPanel()` — linhas 2663–2665 — if=1, return=1 — chama: busNextStop, ensureTransitPanel
- [x] `enterBus()` — linhas 2666–2676 — if=8, return=4 — chama: auditPlayerMode, busAtStop, canEnterMobility, clearBusWaiting, clearMovementInputs, closeModal, saveState, setBusState, toast, updateTransitPanel
- [x] `exitBusAtStop()` — linhas 2677–2685 — if=7, return=2 — chama: advanceAdventure, auditPlayerMode, busAtStop, busStopRecord, rememberSafePlayerPosition, safeBusExitPoint, saveState, setBusState, setFlag, toast, trackDaily, updateContext (+1)
- [x] `updateTransitWorld()` — linhas 2686–2728 — if=30, else=10, for=2 — chama: busRoutePoints, exitBusAtStop, offerBusAtStop, pointOnRoad, recoverBusRoute, setBusState, trafficSpeedFactor

## `16-emergency-services.js`

- [x] `decorateCityServices()` — linhas 2729–2745 — if=1, for=5 — chama: iconTexture, premiumBox, premiumCylinder, updateTransitPanel
- [x] `createFireIncidentSite()` — linhas 2746–2749 — for=2, return=1 — chama: helpExtinguishFire, registerInteractable, renderMat
- [x] `createFireTruck()` — linhas 2750–2755 — for=3, return=1 — chama: premiumBox, premiumCylinder, renderMat
- [x] `createFireServiceWorld()` — linhas 2756–2756 — sem fluxo contado — chama: createFireTruck
- [x] `activateFireIncident()` — linhas 2757–2757 — if=2, return=3 — chama: saveState, toast
- [x] `ensureActiveFire()` — linhas 2758–2758 — return=1 — chama: activateFireIncident
- [x] `helpExtinguishFire()` — linhas 2759–2759 — if=3, for=1, return=2 — chama: extinguishFireIncident, spawnDust, toast
- [x] `extinguishFireIncident()` — linhas 2760–2760 — if=5, for=1, return=1 — chama: addXP, completeActiveJob, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `serviceVehicleRoute()` — linhas 2761–2761 — if=1, return=1 — chama: buildRoutePoints
- [x] `moveServiceVehicle()` — linhas 2762–2762 — if=5, for=1, return=5 — chama: serviceVehicleRoute, snapTrafficToRoad, trafficSpeedFactor
- [x] `updateFireService()` — linhas 2763–2768 — if=12, else=1, for=2, return=1 — chama: activateFireIncident, extinguishFireIncident, moveServiceVehicle, spawnDust
- [x] `createPoliceCar()` — linhas 2769–2777 — if=1, for=1, return=1 — chama: addVoxelOutline, iconTexture, premiumBox, premiumCylinder, renderMat
- [x] `createAmbulance()` — linhas 2778–2784 — for=1, return=1 — chama: premiumBox, premiumCylinder, renderMat
- [x] `createPoliceSystem()` — linhas 2785–2789 — sem fluxo contado — chama: createAmbulance, createPoliceCar
- [x] `movePoliceToward()` — linhas 2790–2793 — if=3, for=1, return=3 — chama: snapTrafficToRoad, trafficSpeedFactor
- [x] `updatePolicePatrol()` — linhas 2794–2796 — if=1 — chama: movePoliceToward
- [x] `updateSafetyPanel()` — linhas 2797–2799 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `startPoliceAlert()` — linhas 2800–2804 — if=2, return=3 — chama: saveState, toast, updateSafetyPanel
- [x] `finishSafetyStop()` — linhas 2805–2808 — if=2, return=1 — chama: clearMovementInputs, exitVehicle, groundHeightAt, openSafetyLesson, saveState, updateSafetyPanel
- [x] `openSafetyLesson()` — linhas 2809–2818 — if=1 — chama: addReputation, addXP, awardMedal, closeModal, openModal, saveState, toast
- [x] `updatePoliceSystem()` — linhas 2819–2840 — if=12, else=3, for=2 — chama: finishSafetyStop, movePoliceToward, npcSpeech, startPoliceAlert, updatePolicePatrol, updateSafetyPanel
- [x] `moveIncidentResponder()` — linhas 2841–2846 — if=6, for=1, return=5 — chama: buildRoutePoints, snapTrafficToRoad, trafficSpeedFactor
- [x] `createTrafficIncident()` — linhas 2847–2854 — if=7, for=3, return=2 — chama: nearestRoadProjection, premiumBox, premiumCylinder, renderMat, saveState, toast
- [x] `resolveTrafficIncident()` — linhas 2855–2857 — if=5, for=4, return=1 — chama: saveState, toast
- [x] `updateTrafficIncidents()` — linhas 2858–2870 — if=8, for=6, return=3 — chama: createTrafficIncident, moveIncidentResponder, resolveTrafficIncident, trafficActorList

## `17-adventures-learning-world.js`

- [x] `openTransitGuide()` — linhas 2871–2874 — sem fluxo contado — chama: openModal, setWaypoint
- [x] `createRoyalCastle()` — linhas 2875–2900 — for=10, return=1 — chama: addGlow, createCastleChallengeTokens, createSignpost, exitHouse, mat, premiumBox, premiumCylinder, registerInteractable, renderMat, toast
- [x] `createCastleChallengeTokens()` — linhas 2901–2903 — return=1 — chama: mat
- [x] `openAdventureHub()` — linhas 2904–2906 — sem fluxo contado — chama: openModal, startAdventure
- [x] `startAdventure()` — linhas 2907–2909 — if=3, for=1, return=3 — chama: closeModal, saveState, setWaypoint, toast
- [x] `restoreActiveAdventure()` — linhas 2910–2915 — if=2, for=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `advanceAdventure()` — linhas 2916–2918 — if=3, else=1, return=2 — chama: beep, finishAdventure, saveState
- [x] `finishAdventure()` — linhas 2919–2921 — if=4, else=1, for=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, saveState, setFlag, toast
- [x] `updateAdventure()` — linhas 2922–2924 — if=6, for=1, return=2 — chama: advanceAdventure, finishAdventure

## `18-water-fishing-boats.js`

- [x] `createLearningStation()` — linhas 2925–2927 — return=1 — chama: iconTexture, mat, openEducationHub, premiumBox, registerInteractable
- [x] `createLearningPlaza()` — linhas 2928–2934 — sem fluxo contado — chama: createLearningStation, createSignpost
- [x] `rectOverlap()` — linhas 2935–2935 — return=1 — chama: nenhuma função nomeada detectada
- [x] `insideWater()` — linhas 2936–2936 — return=1 — chama: nenhuma função nomeada detectada
- [x] `waterAt()` — linhas 2937–2937 — return=1 — chama: insideWater
- [x] `isInsideLakeNavigable()` — linhas 2938–2938 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isNearFishingArea()` — linhas 2939–2939 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resolveWaterWalking()` — linhas 2940–2942 — if=3, return=2 — chama: groundHeightAt, toast, waterAt
- [x] `distanceToBoatDock()` — linhas 2943–2943 — return=1 — chama: nenhuma função nomeada detectada
- [x] `validBoatExit()` — linhas 2944–2944 — return=1 — chama: distanceToBoatDock
- [x] `safeBoatExitPoint()` — linhas 2945–2946 — return=1 — chama: nenhuma função nomeada detectada
- [x] `ensureFishingVisual()` — linhas 2947–2960 — if=1, return=2 — chama: renderMat
- [x] `setFishingLine()` — linhas 2961–2961 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `fishingCastTarget()` — linhas 2962–2968 — if=2, else=1, return=1 — chama: isInsideLakeNavigable
- [x] `beginFishingVisual()` — linhas 2969–2982 — if=2, return=1 — chama: ensureFishingVisual, fishingCastTarget, setFishingLine
- [x] `castFishingVisual()` — linhas 2983–2983 — if=1, return=1 — chama: beep, ensureFishingVisual, fishingCastTarget
- [x] `hookFishingVisual()` — linhas 2984–2984 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `pullFishingVisual()` — linhas 2985–2985 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `restoreFishingCamera()` — linhas 2986–2989 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `stopFishingVisual()` — linhas 2990–2996 — if=4, else=1, return=2 — chama: restoreFishingCamera, setFishingUiActive
- [x] `clearFishingTimers()` — linhas 2997–2997 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `setFishingUiActive()` — linhas 2998–3002 — if=1 — chama: scheduleStableResize, syncMobilePanels
- [x] `cancelFishingSession()` — linhas 3003–3003 — sem fluxo contado — chama: clearFishingTimers, stopFishingVisual
- [x] `ensureFishingModalStyle()` — linhas 3004–3014 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `updateFishingVisual()` — linhas 3015–3025 — if=11, else=6, return=1 — chama: setFishingLine, stopFishingVisual
- [x] `createShoreFisher()` — linhas 3026–3031 — return=1 — chama: createNPC, premiumCylinder, renderMat
- [x] `createShoreFishingLife()` — linhas 3032–3036 — if=1, return=1 — chama: createShoreFisher
- [x] `updateShoreFishers()` — linhas 3037–3040 — if=3, for=1 — chama: nenhuma função nomeada detectada
- [x] `createBoatModel()` — linhas 3041–3045 — sem fluxo contado — chama: premiumBox, registerInteractable, renderMat
- [x] `ensureBoatPanel()` — linhas 3046–3048 — if=1, return=2 — chama: exitBoat, startFishing
- [x] `updateBoatPanel()` — linhas 3049–3058 — if=8, return=6 — chama: auditPlayerMode, boardNpcPassenger, canEnterMobility, ensureBoatPanel, exitVehicle, nearestRideCompanion, saveState, toast, updateVehicleControlsUI
- [x] `enterBoatAsPassenger()` — linhas 3059–3066 — if=4, return=4 — chama: auditPlayerMode, canEnterMobility, exitVehicle, saveState, toast, updateBoatPanel, updateVehicleControlsUI

## `19-campfire-hunting-house-extensions.js`

- [x] `exitBoat()` — linhas 3067–3074 — if=7, else=1, return=3 — chama: auditPlayerMode, groundHeightAt, releaseNpcPassenger, rememberSafePlayerPosition, safeBoatExitPoint, saveState, toast, updateBoatPanel, updateVehicleControlsUI, validBoatExit
- [x] `updateBoatPhysics()` — linhas 3075–3075 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `campfireAllowed()` — linhas 3076–3077 — if=7, return=7 — chama: exitBoat, rectOverlap, toast, waterAt
- [x] `spawnCampfire()` — linhas 3078–3083 — if=2, else=1, for=1, return=1 — chama: mat, mobilityThrottleIntent, openCampfire, premiumCylinder, registerInteractable
- [x] `nearestActiveCampfire()` — linhas 3084–3087 — if=5, return=4 — chama: campfireAllowed, confirmModal, saveState, spawnCampfire, toast, updateMobilityControlLabels
- [x] `finishCampfireCooking()` — linhas 3088–3088 — if=1, return=1 — chama: beep, saveState, toast
- [x] `constrainBoat()` — linhas 3089–3089 — if=3, return=1 — chama: isInsideLakeNavigable
- [x] `openCampfire()` — linhas 3090–3090 — if=1, return=1 — chama: openModal, toast
- [x] `weightedFish()` — linhas 3091–3092 — if=4, for=1, return=5 — chama: closeModal, confirmModal, finishCampfireCooking, openCampfire, saveState, toast, updateHUD
- [x] `startFishing()` — linhas 3093–3095 — if=6, return=6 — chama: isNearFishingArea, toast
- [x] `openNearestCampfire()` — linhas 3096–3097 — if=1, else=1 — chama: beginFishingVisual, ensureFishingModalStyle, nearestActiveCampfire, openCampfire, openModal, setFishingUiActive, toast

## `20-world-build-cloud-houses.js`

- [x] `openCampfireZone()` — linhas 3098–3099 — if=1, else=1 — chama: closeModal, nearestActiveCampfire, openCampfire, openModal
- [x] `createCampfireZone()` — linhas 3100–3101 — for=1 — chama: createSignpost, premiumBox, registerInteractable
- [x] `createForestAnimal()` — linhas 3102–3103 — if=5, for=2, return=4 — chama: beep, cancelFishingSession, castFishingVisual, hookFishingVisual, premiumBox, pullFishingVisual, saveState, stopFishingVisual, vibrate
- [x] `startHunting()` — linhas 3104–3105 — if=9, else=1, return=4 — chama: addCoins, addXP, beep, clearFishingTimers, closeModal, openModal, pullFishingVisual, saveState, stopFishingVisual, toast, vibrate, weightedFish
- [x] `createHuntingArea()` — linhas 3106–3107 — for=1 — chama: createForestAnimal, createSignpost, premiumBox, registerInteractable, startHunting
- [x] `nearestOwnedHouseForExtension()` — linhas 3108–3109 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionPlacement()` — linhas 3110–3110 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionValid()` — linhas 3111–3111 — if=6, for=1, return=6 — chama: rectOverlap
- [x] `clearExtensionPreview()` — linhas 3112–3112 — if=2 — chama: nenhuma função nomeada detectada
- [x] `renderExtensionPreview()` — linhas 3113–3113 — if=3, for=1, return=1 — chama: extensionValid
- [x] `spawnHouseExtension()` — linhas 3114–3114 — if=1, return=1 — chama: playerDisplayName, premiumBox, registerInteractable, registerPlatform, shadeColor, toast
- [x] `resourcesEnough()` — linhas 3115–3115 — return=1 — chama: nenhuma função nomeada detectada
- [x] `costText()` — linhas 3116–3116 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openHouseExtensionPlanner()` — linhas 3117–3117 — if=3, for=1, return=3 — chama: clearExtensionPreview, closeModal, costText, extensionPlacement, extensionValid, nearestOwnedHouseForExtension, openModal, playerDisplayName, renderExtensionPreview, resourcesEnough, saveState, spawnHouseExtension (+1)
- [x] `openHouseExtensionMenu()` — linhas 3118–3118 — sem fluxo contado — chama: closeModal, costText, openHouseExtensionPlanner, openModal
- [x] `createLakeExpansion()` — linhas 3119–3123 — for=3 — chama: createBoatModel, createShoreFishingLife, createSignpost, premiumBox, premiumCylinder, registerInteractable, registerPlatform, startFishing
- [x] `restoreLifeExpansion()` — linhas 3124–3124 — if=2, for=2 — chama: finishCampfireCooking, spawnCampfire, spawnHouseExtension
- [x] `updateLifeActivities()` — linhas 3125–3125 — if=5, for=1, return=1 — chama: finishCampfireCooking, updateShoreFishers
- [x] `createLifeExpansionWorld()` — linhas 3126–3127 — if=2, for=1 — chama: applyCloudWorldObjects, createCampfireZone, createHuntingArea, createLakeExpansion, restoreLifeExpansion
- [x] `buildWorld()` — linhas 3128–3190 — if=4, for=9 — chama: addHouseInterior, box, createAthleticsGym, createChest, createCrystal, createDistrictVisuals, createEnemy, createFenceLine, createFireServiceWorld, createFlower, createGoldFoundry, createGoldMine (+30)
- [x] `collectResource()` — linhas 3191–3200 — if=3, return=3 — chama: addXP, advanceAdventure, beep, checkActiveJob, evaluateMissions, playToolAnimation, saveState, toast, trackDaily, vibrate
- [x] `openChest()` — linhas 3201–3207 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, setFlag, toast
- [x] `cloudHouseRecord()` — linhas 3208–3208 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isMyCloudHouse()` — linhas 3209–3209 — return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileCloudHouses()` — linhas 3210–3239 — if=15, else=1, for=1, return=11 — chama: addCoins, awardMedal, closeModal, cloudHouseRecord, confirmModal, enterHouse, isMyCloudHouse, openModal, saveState, setFlag, startRace, toast
- [x] `enterHouse()` — linhas 3240–3251 — if=5, else=1, for=6, return=2 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, setFlag, toast, updateCamera, updateContext

## `21-interactions-shop-social-races.js`

- [x] `exitHouse()` — linhas 3252–3263 — if=4, else=1, for=6, return=2 — chama: auditPlayerMode, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `openHomeChest()` — linhas 3264–3272 — if=2, return=2 — chama: openModal, playerDisplayName, saveState, toast
- [x] `useActivity()` — linhas 3273–3300 — if=19, else=15, return=2 — chama: addXP, closeModal, openAvatarStudio, openEducationHub, openFireStationDesk, openHomeChest, openModal, openSafetyLesson, openShop, openTeacherJobLesson, openWorkshop, playerDisplayName (+5)
- [x] `openShop()` — linhas 3301–3306 — if=1, return=1 — chama: addCoins, addXP, closeModal, openModal, saveState, toast
- [x] `openWorkshop()` — linhas 3307–3315 — if=3, return=3 — chama: addCoins, addXP, closeModal, openModal, saveState, toast
- [x] `friendshipTier()` — linhas 3316–3316 — return=1 — chama: nenhuma função nomeada detectada
- [x] `changeFriendship()` — linhas 3317–3321 — if=2 — chama: addReputation, addXP, evaluateMissions, saveState, setFlag, toast
- [x] `talkToNPC()` — linhas 3322–3369 — if=25, else=18, return=1 — chama: addCoins, addReputation, changeFriendship, closeModal, completeActiveJob, friendshipTier, openHouseChallenge, openJobCenter, openModal, saveState, setFlag, startRace (+4)
- [x] `openHouseChallenge()` — linhas 3370–3376 — if=1, return=1 — chama: closeModal, openModal, startRace, toast
- [x] `openRaceCenter()` — linhas 3377–3382 — sem fluxo contado — chama: closeModal, openModal, startRace
- [x] `createRaceOpponent()` — linhas 3383–3385 — return=1 — chama: box
- [x] `clearRaceObjects()` — linhas 3386–3390 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `spawnRaceCoins()` — linhas 3391–3396 — for=1 — chama: cylinder
- [x] `startRace()` — linhas 3397–3407 — if=4, return=2 — chama: createRaceOpponent, exitHouse, saveState, spawnRaceCoins, toast, updateWaypointMarker
- [x] `finishRace()` — linhas 3408–3417 — if=4, else=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, clearRaceObjects, evaluateMissions, saveState, setFlag, toast, trackDaily, updateWaypointMarker

## `22-careers-jobs-uniforms.js`

- [x] `updateRace()` — linhas 3418–3447 — if=12, else=4, for=1, return=2 — chama: beep, finishRace
- [x] `setMissionState()` — linhas 3448–3448 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `equipJobUniform()` — linhas 3449–3453 — if=1, return=1 — chama: applyAvatarCustomization, saveState
- [x] `focusActiveJob()` — linhas 3454–3473 — if=13, else=6, return=5 — chama: applyAvatarCustomization, buildRoutePoints, closeModal, confirmModal, ensureActiveFire, exitHouse, saveState, setMissionState, setWaypoint, toast, updateMissionHUD, updateNavigation (+1)
- [x] `activeJobProgress()` — linhas 3474–3485 — if=8, return=9 — chama: nenhuma função nomeada detectada
- [x] `openJobCenter()` — linhas 3486–3494 — sem fluxo contado — chama: activeJobProgress, equipJobUniform, openModal, startJob, toast
- [x] `startJob()` — linhas 3495–3505 — if=6, else=2, return=2 — chama: ensureActiveFire, equipJobUniform, exitHouse, focusActiveJob, saveState, setMissionState, toast, updateMissionHUD
- [x] `completeActiveJob()` — linhas 3506–3519 — if=8, return=3 — chama: applyAvatarCustomization, evaluateMissions, saveState, setFlag, setMissionState, toast, updateHUD, updateMissionHUD, updateWaypointMarker
- [x] `checkActiveJob()` — linhas 3520–3527 — if=4, else=2, return=1 — chama: completeActiveJob
- [x] `restoreActiveJobRuntime()` — linhas 3528–3530 — if=3, return=1 — chama: applyAvatarCustomization, ensureActiveFire, updateMissionHUD

## `23-vehicle-effects-driving.js`

- [x] `updateCareerMissions()` — linhas 3531–3541 — if=11, else=5, return=2 — chama: activeJobProgress, beep, checkActiveJob, completeActiveJob, saveState, setMissionState, setWaypoint, toast, updateMissionHUD, updateWaypointMarker
- [x] `openTeacherJobLesson()` — linhas 3542–3545 — if=1, return=1 — chama: addXP, closeModal, completeActiveJob, openModal, toast
- [x] `openFireStationDesk()` — linhas 3546–3557 — if=6, return=2 — chama: buildRoutePoints, closeModal, ensureActiveFire, equipJobUniform, exitHouse, focusActiveJob, openModal, startJob, toast, updateWaypointMarker
- [x] `startDeliveryJob()` — linhas 3558–3562 — if=1, return=1 — chama: saveState, toast
- [x] `spawnDust()` — linhas 3563–3568 — if=1 — chama: nenhuma função nomeada detectada
- [x] `updateFX()` — linhas 3569–3578 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `startEngineSound()` — linhas 3579–3589 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stopEngineSound()` — linhas 3590–3594 — if=1, catch=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `updateVehicleFX()` — linhas 3595–3619 — if=12, else=2, catch=1, return=2 — chama: beep, spawnDust, sprintRequested, startEngineSound, stopEngineSound
- [x] `mobilityDriverActive()` — linhas 3620–3620 — return=1 — chama: nenhuma função nomeada detectada
- [x] `updateMobilityControlLabels()` — linhas 3621–3628 — if=13, else=1 — chama: mobilityDriverActive, sprintRequested
- [x] `updateVehicleControlsUI()` — linhas 3629–3636 — if=3 — chama: mobilityDriverActive, playerDisplayName, updateMobilityControlLabels
- [x] `vehicleHorn()` — linhas 3637–3639 — if=4, return=2 — chama: beep, mobilityDriverActive, vibrate
- [x] `enterVehicle()` — linhas 3640–3647 — if=5, return=2 — chama: applyVehicleAppearance, boardNpcPassenger, buildRoutePoints, canEnterMobility, clearMovementInputs, groundHeightAt, nearestRideCompanion, saveState, setFlag, setMissionState, startEngineSound, syncPlayerRootScale (+5)

## `24-construction-system.js`

- [x] `enterVehicleAsPassenger()` — linhas 3648–3656 — if=6, return=4 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, exitBoat, saveState, toast, updateAbilityUI, updateRunUI, updateVehicleControlsUI
- [x] `exitVehicle()` — linhas 3657–3665 — if=7, else=1, return=2 — chama: auditPlayerMode, clearMovementInputs, currentVehicleRef, groundHeightAt, persistParkedVehicle, releaseNpcPassenger, rememberSafePlayerPosition, safeVehicleExitPoint, saveState, stopEngineSound, syncPlayerRootScale, toast (+3)
- [x] `repairBridge()` — linhas 3666–3677 — if=2, return=2 — chama: addReputation, addXP, saveState, setFlag, toast
- [x] `buildCostText()` — linhas 3678–3679 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentBuildOwnerIds()` — linhas 3680–3681 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildOwnedByPlayer()` — linhas 3682–3683 — return=1 — chama: currentBuildOwnerIds
- [x] `buildFootprint()` — linhas 3684–3687 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildPlacementCandidate()` — linhas 3688–3693 — if=1, return=2 — chama: canBuildAt, groundHeightAt
- [x] `canBuildAt()` — linhas 3694–3704 — if=7, return=9 — chama: buildFootprint, groundHeightAt, rectOverlap, waterAt
- [x] `createBuildPreviewMesh()` — linhas 3705–3716 — if=7, else=6, for=3, return=3 — chama: sharedBoxGeometry
- [x] `disposeBuildPreview()` — linhas 3717–3719 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `ensureBuildPanel()` — linhas 3720–3724 — if=1, return=2 — chama: endBuildMode
- [x] `updateBuildPanel()` — linhas 3725–3729 — if=1, return=1 — chama: buildCostText, ensureBuildPanel, resourcesEnough
- [x] `updateBuildPreview()` — linhas 3730–3735 — if=5, return=2 — chama: buildPlacementCandidate, createBuildPreviewMesh, disposeBuildPreview, updateBuildPanel
- [x] `beginBuildMode()` — linhas 3736–3739 — if=2, return=3 — chama: disposeBuildPreview, ensureBuildPanel, toast, updateBuildPreview, updateContext, updateVehicleControlsUI
- [x] `endBuildMode()` — linhas 3740–3742 — if=3, return=2 — chama: disposeBuildPreview, toast, updateContext, updateVehicleControlsUI
- [x] `rotateBuildPreview()` — linhas 3743–3743 — if=1, return=2 — chama: updateBuildPreview, vibrate
- [x] `openBuildMenu()` — linhas 3744–3750 — if=3, return=3 — chama: beginBuildMode, buildCostText, closeModal, openHouseExtensionMenu, openModal, toast
- [x] `placeBuild()` — linhas 3751–3761 — if=5, for=2, catch=1, return=6, throw=1 — chama: addXP, buildCostText, checkActiveJob, evaluateMissions, mergeBuildCollections, normalizeBuildRecord, normalizeBuildTombstones, resourcesEnough, saveState, spawnBuild, syncCloudProgress, toast (+2)

## `25-render-init-resize-position-collision.js`

- [x] `spawnBuild()` — linhas 3762–3774 — if=9, else=7, for=2, return=4 — chama: addGlow, box, buildRecordSignature, groundHeightAt, normalizeBuildRecord, premiumBox, registerCollider, registerPlatform
- [x] `buildRecordSignature()` — linhas 3775–3775 — return=1 — chama: nenhuma função nomeada detectada
- [x] `removeWorldBuildRecord()` — linhas 3776–3778 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileWorldBuilds()` — linhas 3779–3790 — if=5, for=2, return=5 — chama: applyBuildTombstones, buildOwnedByPlayer, buildRecordSignature, confirmModal, mergeBuildTombstones, normalizeBuildTombstones, removeWorldBuildRecord, saveState, spawnBuild, syncCloudProgress, toast
- [x] `initThree()` — linhas 3791–3799 — if=1, for=1, return=2 — chama: applyAdaptiveRenderSettings, applyAvatarCustomization, applyQuality, buildWorld, createPlayerModel, freezeWorldFrustumCulling, initLocalMultiplayer, initMaterials, lockStableSceneVisibility, openModal, qualityTier, reconcileCloudHouses (+6)
- [x] `applyQuality()` — linhas 3800–3800 — if=1, return=1 — chama: applyAdaptiveRenderSettings
- [x] `viewportMetrics()` — linhas 3801–3808 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resize()` — linhas 3809–3822 — if=2 — chama: clearMovementInputs, syncMobilePanels, targetDpr, viewportMetrics
- [x] `scheduleStableResize()` — linhas 3823–3823 — sem fluxo contado — chama: resize
- [x] `refreshOrientationLayout()` — linhas 3824–3828 — if=3 — chama: resize, scheduleStableResize
- [x] `restorePosition()` — linhas 3829–3834 — if=1 — chama: isInsideLakeNavigable, rememberSafePlayerPosition, safePointNear
- [x] `returnHome()` — linhas 3835–3841 — if=10, else=1, return=1 — chama: auditPlayerMode, busAtStop, exitBoat, exitBusAtStop, exitHouse, exitVehicle, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `savePlayerPosition()` — linhas 3842–3853 — if=7, else=3 — chama: commitState, isInsideLakeNavigable, saveState
- [x] `groundHeightAt()` — linhas 3854–3856 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `positionBlockedForPlayer()` — linhas 3857–3873 — if=11, for=3, return=6 — chama: groundHeightAt, trafficActorList, waterAt
- [x] `safePointNear()` — linhas 3874–3878 — if=1, for=2, return=2 — chama: groundHeightAt, positionBlockedForPlayer
- [x] `rememberSafePlayerPosition()` — linhas 3879–3883 — if=2, return=3 — chama: positionBlockedForPlayer
- [x] `recoverPlayerIfInvalid()` — linhas 3884–3890 — if=2, return=3 — chama: positionBlockedForPlayer, rememberSafePlayerPosition, safePointNear

## `26-input-player-physics.js`

- [x] `safeVehicleExitPoint()` — linhas 3891–3894 — return=1 — chama: safePointNear
- [x] `vehicleHitsCollider()` — linhas 3895–3903 — if=5, for=2, return=4 — chama: currentVehicleRef, trafficActorList
- [x] `registerVehicleImpact()` — linhas 3904–3907 — if=1 — chama: beep, toast, vibrate
- [x] `resolveCollisions()` — linhas 3908–3921 — if=9, else=4, for=1, return=1 — chama: playerScaleValue, registerVehicleImpact, vehicleHitsCollider
- [x] `resolveMovementInput()` — linhas 3922–3938 — if=4, else=3, return=1 — chama: derivePlayerMode, normalizeControlIntent
- [x] `sprintRequested()` — linhas 3939–3939 — return=1 — chama: nenhuma função nomeada detectada
- [x] `updateRunUI()` — linhas 3940–3942 — if=4, return=2 — chama: mobilityDriverActive, sprintRequested, updateMobilityControlLabels
- [x] `clearMovementInputs()` — linhas 3943–3950 — if=1 — chama: updateRunUI
- [x] `canJump()` — linhas 3951–3951 — return=1 — chama: nenhuma função nomeada detectada
- [x] `requestJump()` — linhas 3952–3952 — if=2, return=1 — chama: canJump, doJump
- [x] `doJump()` — linhas 3953–3953 — if=1, return=1 — chama: beep, canJump, trackDaily, vibrate
- [x] `updatePlayer()` — linhas 3954–3988 — if=20, else=6, return=1 — chama: animatePlayer, beep, cameraRelativeVector, canJump, checkHazards, collectNearbyCrystals, constrainBoat, doJump, groundHeightAt, recoverPlayerIfInvalid, rememberSafePlayerPosition, resolveCollisions (+10)
- [x] `mobilityThrottleIntent()` — linhas 3989–4001 — if=7, return=7 — chama: nenhuma função nomeada detectada

## `27-npc-enemies-combat-camera-action.js`

- [x] `updateVehiclePhysics()` — linhas 4002–4016 — if=7, else=1, return=3 — chama: exitVehicle, mobilityThrottleIntent, sprintRequested, toast, updateMobilityControlLabels
- [x] `animatePlayer()` — linhas 4017–4037 — if=12, else=8, return=1 — chama: nenhuma função nomeada detectada
- [x] `nearestRideCompanion()` — linhas 4038–4043 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `nearestBoardableNpc()` — linhas 4044–4046 — return=1 — chama: nenhuma função nomeada detectada
- [x] `checkHazards()` — linhas 4047–4049 — if=4, else=1, for=1 — chama: returnHome, toast
- [x] `boardNpcPassenger()` — linhas 4050–4052 — if=3, return=3 — chama: saveState, toast
- [x] `collectNearbyCrystals()` — linhas 4053–4055 — if=2, for=1 — chama: collectCrystal
- [x] `releaseNpcPassenger()` — linhas 4056–4060 — if=3, return=1 — chama: groundHeightAt
- [x] `npcSpeech()` — linhas 4061–4061 — if=1 — chama: toast
- [x] `updateNpcSociety()` — linhas 4062–4071 — if=9, else=5, return=2 — chama: cloudHouseRecord, npcSpeech, saveState, updateHUD
- [x] `updateNPCs()` — linhas 4072–4106 — if=10, else=7, for=2 — chama: snapTrafficToRoad, trafficSpeedFactor
- [x] `updateEnemies()` — linhas 4107–4115 — if=5, for=1 — chama: beep, saveState, toast, vibrate
- [x] `meleeAttack()` — linhas 4116–4120 — if=1, return=1 — chama: beep, damageEnemy, toast
- [x] `damageEnemy()` — linhas 4121–4124 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, toast
- [x] `firePower()` — linhas 4125–4130 — if=3, return=3 — chama: beep, mat, toast, vehicleHorn, vibrate
- [x] `updateFireballs()` — linhas 4131–4134 — if=2, for=2 — chama: damageEnemy
- [x] `updateCamera()` — linhas 4135–4166 — if=6, else=1 — chama: playerScaleValue

## `28-multiplayer-social-online.js`

- [x] `nearestInteractable()` — linhas 4167–4184 — if=14, for=1, return=12 — chama: boardNpcPassenger, isInteractionAvailable, nearestBoardableNpc, nearestRemotePlayer, openRemotePlayerActions, toast, updateTransitPanel, worldPos
- [x] `updateContext()` — linhas 4185–4188 — if=4, return=2 — chama: nearestInteractable
- [x] `doAction()` — linhas 4189–4200 — if=6, return=2 — chama: isInteractionAvailable, meleeAttack, nearestInteractable, syncMobilePanels, updateContext, worldPos
- [x] `updateNeeds()` — linhas 4201–4207 — if=3, return=1 — chama: playerDisplayName, saveState, sprintRequested, toast, updateHUD
- [x] `multiplayerGameLabel()` — linhas 4208–4209 — return=1 — chama: nenhuma função nomeada detectada
- [x] `pendingChallenges()` — linhas 4210–4210 — return=1 — chama: nenhuma função nomeada detectada
- [x] `readyGameSessions()` — linhas 4211–4211 — return=1 — chama: nenhuma função nomeada detectada
- [x] `closeChallengePrompt()` — linhas 4212–4212 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingChallengePrompt()` — linhas 4213–4213 — if=1, return=1 — chama: multiplayerGameLabel
- [x] `showReadySessionPrompt()` — linhas 4214–4215 — if=2, return=2 — chama: multiplayerGameLabel, sessionOpponentName
- [x] `socialActionLabel()` — linhas 4216–4216 — return=1 — chama: nenhuma função nomeada detectada
- [x] `socialRequestPending()` — linhas 4217–4217 — return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingSocialRequest()` — linhas 4218–4228 — if=6, return=7 — chama: saveState, socialActionLabel, toast
- [x] `applyAcceptedSocialAction()` — linhas 4229–4246 — if=15, else=9, return=3 — chama: closeChallengePrompt, closeModal, enterBoatAsPassenger, enterVehicleAsPassenger, escapeHtml, multiplayerGameLabel, openModal, openNearestCampfire, saveState, sessionOpponentName, startFishing, startHunting (+3)
- [x] `updateOnlineAttention()` — linhas 4247–4247 — if=2 — chama: pendingChallenges, readyGameSessions, socialRequestPending
- [x] `challengeInboxHtml()` — linhas 4248–4248 — return=1 — chama: escapeHtml, multiplayerGameLabel, pendingChallenges
- [x] `socialRequestInboxHtml()` — linhas 4249–4249 — return=1 — chama: escapeHtml, socialActionLabel, socialRequestPending
- [x] `completedGameSessions()` — linhas 4250–4250 — return=1 — chama: nenhuma função nomeada detectada
- [x] `rememberMatchResult()` — linhas 4251–4251 — if=2, return=3 — chama: sessionOpponentName
- [x] `duelHistoryHtml()` — linhas 4252–4252 — return=2 — chama: completedGameSessions, escapeHtml, multiplayerGameLabel, sessionOpponentName
- [x] `activeSessionsHtml()` — linhas 4253–4253 — return=2 — chama: escapeHtml, multiplayerGameLabel, readyGameSessions
- [x] `bindChallengeCards()` — linhas 4254–4256 — if=5, else=1, return=3 — chama: closeChallengePrompt, multiplayerGameLabel, refreshOpenSocialHub, toast, updateOnlineAttention
- [x] `highestUnlockedLevel()` — linhas 4257–4257 — if=1, for=1, return=1 — chama: subjectUnlocked
- [x] `openChallengePicker()` — linhas 4258–4258 — if=1, else=1 — chama: closeModal, highestUnlockedLevel, openModal, toast
- [x] `sessionOpponentName()` — linhas 4259–4259 — return=1 — chama: nenhuma função nomeada detectada
- [x] `startMultiplayerEducationGame()` — linhas 4260–4260 — if=2, return=2 — chama: closeChallengePrompt, escapeHtml, openModal, runEducationGame, saveState, sessionOpponentName, toast
- [x] `maybeShowMultiplayerResult()` — linhas 4261–4261 — if=4, return=3 — chama: addCoins, addXP, escapeHtml, openModal, rememberMatchResult, saveState
- [x] `multiplayerStatusText()` — linhas 4262–4262 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `updateMultiplayerBadge()` — linhas 4263–4263 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `onlinePlayers()` — linhas 4264–4264 — return=2 — chama: nenhuma função nomeada detectada
- [x] `onlinePlayerListHtml()` — linhas 4265–4265 — return=1 — chama: escapeHtml, onlinePlayers
- [x] `bindOnlinePlayerCards()` — linhas 4266–4266 — if=1 — chama: openRemotePlayerActions
- [x] `refreshOpenSocialHub()` — linhas 4267–4267 — if=9, return=1 — chama: activeSessionsHtml, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, multiplayerStatusText, onlinePlayerListHtml, onlinePlayers, socialRequestInboxHtml, updateOnlineAttention
- [x] `openSocialHub()` — linhas 4268–4275 — if=2, return=1 — chama: activeSessionsHtml, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, multiplayerStatusText, onlinePlayerListHtml, onlinePlayers, openModal, pendingChallenges, refreshOpenSocialHub (+4)
- [x] `escapeHtml()` — linhas 4276–4276 — return=1 — chama: nenhuma função nomeada detectada
- [x] `chatMessageHtml()` — linhas 4277–4277 — return=1 — chama: escapeHtml
- [x] `openRemotePlayerActions()` — linhas 4278–4290 — if=11, else=4, return=4 — chama: addCoins, closeModal, isNearFishingArea, nearestActiveCampfire, openChallengePicker, openModal, openSocialHub, saveState, toast, triggerEmote
- [x] `nearestRemotePlayer()` — linhas 4291–4291 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openMultiplayerConfig()` — linhas 4292–4292 — sem fluxo contado — chama: openSocialHub
- [x] `applyCloudWorldObjects()` — linhas 4293–4299 — if=8, for=6, return=1 — chama: spawnCampfire, spawnHouseExtension
- [x] `remotePlayerEvent()` — linhas 4300–4330 — if=41, else=12, for=1, while=1, return=7 — chama: applyAcceptedSocialAction, applyCloudWorldObjects, closeChallengePrompt, createGhost, exitBoat, exitVehicle, hasValidPlayerName, maybeShowMultiplayerResult, mergeCloudProgress, multiplayerGameLabel, reconcileCloudHouses, refreshOpenSocialHub (+10)

## `29-game-loop-controls-gamepad.js`

- [x] `initLocalMultiplayer()` — linhas 4331–4334 — if=5, return=2 — chama: hasValidPlayerName, remotePlayerEvent, updateMultiplayerBadge
- [x] `multiplayerNameTexture()` — linhas 4335–4335 — if=1, else=1, return=1 — chama: sanitizePlayerName
- [x] `updateLocalPlayerNameLabel()` — linhas 4336–4336 — if=2, return=2 — chama: multiplayerNameTexture, playerDisplayName
- [x] `updateGhostName()` — linhas 4337–4337 — if=2, return=1 — chama: multiplayerNameTexture, sanitizePlayerName
- [x] `createGhost()` — linhas 4338–4343 — for=1, return=1 — chama: box, cylinder, multiplayerNameTexture, sanitizePlayerName
- [x] `updateMultiplayer()` — linhas 4344–4355 — if=4, for=1 — chama: nenhuma função nomeada detectada
- [x] `gameLoop()` — linhas 4356–4386 — if=15, return=1 — chama: auditPlayerMode, captureTrafficPositions, pollGamepad, qualityTier, refreshTechnicalPanel, resolveTrafficOverlaps, samplePerformance, updateAdventure, updateBuildPreview, updateCamera, updateCareerMissions, updateClouds (+18)

## `30-pause-tests-public-api-bootstrap.js`

- [x] `setupControls()` — linhas 4387–4412 — if=30, else=4, return=5 — chama: closeModal, doAction, endBuildMode, firePower, mobilityDriverActive, openPauseMenu, requestJump, rotateBuildPreview, saveState, setScaleMode, spinPlayer, toast (+3)
- [x] `pollGamepad()` — linhas 4413–4429 — if=13, else=1, return=4 — chama: accountLinked, accountPromptWasHandled, applyAvatarCustomization, closeModal, doAction, firePower, hasValidPlayerName, initThree, mobilityDriverActive, openAccountCenter, openPlayerNameModal, requestJump (+8)
- [x] `stopGame()` — linhas 4430–4438 — if=12, else=1 — chama: endBuildMode, equippedTool, evaluateMissions, exitBoat, exitBusAtStop, exitVehicle, gameLoop, resize, restorePosition, savePlayerPosition, showScreen, stopEngineSound (+7)
- [x] `openPauseMenu()` — linhas 4439–4450 — if=4, return=1 — chama: closeModal, endBuildMode, openLifePanel, openModal, returnHome, startEngineSound, stopEngineSound, stopGame
- [x] `updateBridgeVisual()` — linhas 4451–4453 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `prepareVehicleTestArea()` — linhas 4454–4466 — if=2, return=1 — chama: clearMovementInputs, enterVehicle, exitVehicle, groundHeightAt
- [x] `stepVehicleSimulation()` — linhas 4467–4614 — if=11, for=5, return=36 — chama: activateFireIncident, applyAdaptiveRenderSettings, auditPlayerMode, beginBuildMode, buildRoutePoints, busAtStop, cameraRelativeVector, closeModal, completeActiveJob, constrainBoat, currentVehicleRef, detectStableAutoTier (+61)
