# Checklist das 544 funções — OTTHI World Edu V642

Cada item confirma presença na fonte modular. `endBoundaryLine` termina na próxima declaração de função de topo; não é uma afirmação de parsing semântico do corpo JavaScript.


## `01-build-persistence.js`

- [x] `stableBuildId()` — linhas 27–32 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeBuildRecord()` — linhas 33–39 — if=2, return=3 — chama: stableBuildId
- [x] `normalizeBuildList()` — linhas 40–48 — if=2, return=2 — chama: normalizeBuildRecord
- [x] `normalizeBuildTombstones()` — linhas 49–57 — if=3, return=3 — chama: nenhuma função nomeada detectada
- [x] `mergeBuildTombstones()` — linhas 58–58 — return=1 — chama: normalizeBuildTombstones
- [x] `applyBuildTombstones()` — linhas 59–62 — return=1 — chama: normalizeBuildList, normalizeBuildTombstones
- [x] `mergeBuildCollections()` — linhas 63–65 — return=1 — chama: applyBuildTombstones, normalizeBuildList
- [x] `mergeEntityCollections()` — linhas 66–142 — if=2, return=2 — chama: nenhuma função nomeada detectada

## `02-state-save-cloud-account.js`

- [x] `normalizeState()` — linhas 143–196 — if=2, return=1 — chama: applyBuildTombstones, normalizeBuildTombstones
- [x] `loadState()` — linhas 197–245 — if=10, else=2, for=1, catch=4, return=5 — chama: ensureDailyChallenges, normalizeState, updateDailyBadge, updateHUD, updateLobbyStats
- [x] `commitState()` — linhas 246–262 — catch=2, return=2 — chama: applyBuildTombstones, ensureDailyChallenges, normalizeBuildTombstones, syncCloudProgress, syncGameAccount, updateDailyBadge, updateLobbyStats
- [x] `saveState()` — linhas 263–270 — if=1, return=2 — chama: commitState
- [x] `cloudProgressPayload()` — linhas 271–279 — return=1 — chama: nenhuma função nomeada detectada
- [x] `syncCloudProgress()` — linhas 280–283 — if=1, return=2 — chama: cloudProgressPayload, hasValidPlayerName
- [x] `mergeCloudProgress()` — linhas 284–304 — if=3, catch=1, return=3 — chama: mergeBuildCollections, mergeBuildTombstones, mergeEntityCollections, normalizeState, reconcileWorldBuilds, syncCloudProgress, toast, updateHUD, updateLobbyStats, updatePlayerNameUI
- [x] `accountLinked()` — linhas 305–305 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountPromptWasHandled()` — linhas 306–306 — return=1 — chama: nenhuma função nomeada detectada
- [x] `accountStatusText()` — linhas 307–323 — if=4, return=7 — chama: accountLinked
- [x] `syncGameAccount()` — linhas 324–377 — if=16, catch=2, return=10, throw=10 — chama: accountLinked, applyPlayerName, commitState, normalizeState, sanitizePlayerName, saveState, updateHUD, updateLobbyStats, updatePlayerNameUI
- [x] `openAccountForm()` — linhas 378–386 — if=4, else=2, catch=1, return=1 — chama: closeModal, escapeHtml, openAccountCenter, openModal, toast
- [x] `openAccountCenter()` — linhas 387–396 — if=2 — chama: accountLinked, closeModal, confirmModal, escapeHtml, openAccountForm, openModal, openPlayerNameModal, saveState, syncGameAccount, toast

## `03-ui-modal-install-pwa.js`

- [x] `addXP()` — linhas 397–407 — if=1 — chama: awardMedal, saveState, toast, updateHUD
- [x] `addCoins()` — linhas 408–411 — sem fluxo contado — chama: saveState, updateHUD
- [x] `addReputation()` — linhas 412–415 — sem fluxo contado — chama: saveState, updateHUD
- [x] `awardMedal()` — linhas 416–421 — if=1, return=1 — chama: saveState, toast
- [x] `setFlag()` — linhas 422–428 — if=1, return=1 — chama: evaluateMissions, saveState
- [x] `showScreen()` — linhas 429–433 — sem fluxo contado — chama: updateInstallUI
- [x] `toast()` — linhas 434–439 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `vibrate()` — linhas 440–442 — if=1 — chama: nenhuma função nomeada detectada
- [x] `beep()` — linhas 443–457 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openModal()` — linhas 458–472 — if=3 — chama: scheduleStableResize
- [x] `closeModal()` — linhas 473–490 — if=4, else=1 — chama: cancelFishingSession, clearExtensionPreview, startEngineSound, stopFishingVisual
- [x] `confirmModal()` — linhas 491–504 — if=1, return=1 — chama: closeModal, openModal
- [x] `updateInstallUI()` — linhas 505–551 — if=5, return=2 — chama: openModal, toast
- [x] `isOfficialOtthiGameAddress()` — linhas 552–658 — if=13, catch=7, return=11, throw=1 — chama: saveState, updateInstallUI

## `04-education-daily-quiz.js`

- [x] `localDateKey()` — linhas 659–659 — return=1 — chama: nenhuma função nomeada detectada
- [x] `daysBetween()` — linhas 660–660 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `ensureDailyChallenges()` — linhas 661–661 — if=1, while=1, return=1 — chama: daysBetween, localDateKey, saveState
- [x] `dailyDefinition()` — linhas 662–662 — return=1 — chama: nenhuma função nomeada detectada
- [x] `trackDaily()` — linhas 663–668 — if=5, for=1, return=1 — chama: ensureDailyChallenges, saveState, updateDailyBadge
- [x] `updateDailyBadge()` — linhas 669–669 — if=2, return=1 — chama: ensureDailyChallenges
- [x] `claimDailyQuest()` — linhas 670–683 — if=1, return=1 — chama: addCoins, addReputation, addXP, beep, dailyDefinition, openDailyChallenges, saveState, toast, vibrate
- [x] `seeded()` — linhas 684–684 — return=1 — chama: nenhuma função nomeada detectada
- [x] `shuffled()` — linhas 685–685 — return=1 — chama: nenhuma função nomeada detectada
- [x] `choiceSet()` — linhas 686–686 — return=1 — chama: shuffled
- [x] `mathRound()` — linhas 687–695 — if=5, return=6 — chama: choiceSet
- [x] `portugueseRound()` — linhas 696–704 — if=5, return=6 — chama: choiceSet, shuffled
- [x] `englishRound()` — linhas 705–713 — if=5, return=6 — chama: choiceSet
- [x] `generateEducationRounds()` — linhas 714–714 — return=1 — chama: seeded
- [x] `subjectLevelRecord()` — linhas 715–715 — return=1 — chama: nenhuma função nomeada detectada
- [x] `subjectUnlocked()` — linhas 716–716 — return=1 — chama: subjectLevelRecord
- [x] `educationSummary()` — linhas 717–717 — if=1, for=2, return=1 — chama: subjectLevelRecord
- [x] `speakKidWord()` — linhas 718–718 — catch=1 — chama: nenhuma função nomeada detectada
- [x] `dailyChallengesHtml()` — linhas 719–719 — return=2 — chama: dailyDefinition, ensureDailyChallenges
- [x] `educationSubjectHtml()` — linhas 720–720 — return=2 — chama: subjectLevelRecord, subjectUnlocked
- [x] `openEducationHub()` — linhas 721–730 — if=5, return=4 — chama: claimDailyQuest, dailyChallengesHtml, educationSubjectHtml, educationSummary, ensureDailyChallenges, openModal, openSocialHub, playerDisplayName, startSoloEducationGame
- [x] `openChallengeHub()` — linhas 731–731 — sem fluxo contado — chama: openEducationHub
- [x] `openDailyChallenges()` — linhas 732–732 — sem fluxo contado — chama: openEducationHub
- [x] `runEducationGame()` — linhas 733–746 — if=6, else=1, return=4 — chama: addXP, beep, escapeHtml, finishSoloEducationGame, generateEducationRounds, openModal, speakKidWord
- [x] `startSoloEducationGame()` — linhas 747–747 — catch=1 — chama: closeChallengePrompt, runEducationGame, toast
- [x] `finishSoloEducationGame()` — linhas 748–750 — if=2, else=1 — chama: addCoins, addXP, awardMedal, openEducationHub, openModal, saveState, startSoloEducationGame, subjectLevelRecord
- [x] `startCinematicEmote()` — linhas 751–753 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `triggerEmote()` — linhas 754–764 — if=4 — chama: addXP, beep, startCinematicEmote, toast, vibrate
- [x] `openQuiz()` — linhas 765–767 — sem fluxo contado — chama: openEducationHub
- [x] `openCollection()` — linhas 768–786 — sem fluxo contado — chama: openModal

## `05-avatar-life-customization.js`

- [x] `effectiveAvatarUniform()` — linhas 787–794 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `avatarChoiceGroup()` — linhas 795–799 — return=1 — chama: effectiveAvatarUniform
- [x] `openAvatarStudio()` — linhas 800–809 — sem fluxo contado — chama: applyAvatarCustomization, avatarChoiceGroup, closeModal, openModal, playerDisplayName, saveState, setFlag, toast
- [x] `openLifePanel()` — linhas 810–825 — if=2, for=1 — chama: closeModal, openModal, toast
- [x] `openMolds()` — linhas 826–828 — sem fluxo contado — chama: openModal, playerDisplayName
- [x] `openHow()` — linhas 829–927 — sem fluxo contado — chama: openModal

## `06-missions-profile-hud-inventory-tools.js`

- [x] `deriveMissionFlags()` — linhas 928–939 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `evaluateMissions()` — linhas 940–957 — if=2, for=1 — chama: addCoins, awardMedal, deriveMissionFlags, toast, updateMissionHUD
- [x] `updateMissionHUD()` — linhas 958–976 — if=2, return=2 — chama: activeJobProgress, playerText
- [x] `objectiveStatusLabel()` — linhas 977–977 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillMasterySummary()` — linhas 978–978 — return=1 — chama: nenhuma função nomeada detectada
- [x] `pinChapter()` — linhas 979–979 — sem fluxo contado — chama: evaluateMissions, saveState, toast, updateMissionHUD
- [x] `openObjectivesPanel()` — linhas 980–987 — return=1 — chama: activeJobProgress, deriveMissionFlags, openModal, pinChapter, playerText, skillMasterySummary
- [x] `sanitizePlayerName()` — linhas 988–988 — return=1 — chama: nenhuma função nomeada detectada
- [x] `hasValidPlayerName()` — linhas 989–989 — return=1 — chama: sanitizePlayerName
- [x] `playerDisplayName()` — linhas 990–990 — return=1 — chama: hasValidPlayerName, sanitizePlayerName
- [x] `playerText()` — linhas 991–991 — return=1 — chama: playerDisplayName
- [x] `updatePlayerNameUI()` — linhas 992–992 — if=7 — chama: accountStatusText, hasValidPlayerName, playerDisplayName
- [x] `applyPlayerName()` — linhas 993–993 — if=2, return=2 — chama: sanitizePlayerName, saveState, toast, updatePlayerNameUI
- [x] `openPlayerNameModal()` — linhas 994–998 — if=3, return=1 — chama: applyPlayerName, closeModal, hasValidPlayerName, openModal, toast
- [x] `updateLobbyStats()` — linhas 999–1005 — sem fluxo contado — chama: updatePlayerNameUI
- [x] `updateHUD()` — linhas 1006–1020 — if=1 — chama: updateMissionHUD, updatePlayerNameUI
- [x] `openInventory()` — linhas 1021–1033 — if=1, return=1 — chama: openModal, saveState, toast, updateHUD
- [x] `equippedTool()` — linhas 1034–1034 — return=1 — chama: nenhuma função nomeada detectada
- [x] `equipTool()` — linhas 1035–1037 — if=2, return=2 — chama: refreshEquippedToolVisual, saveState, toast
- [x] `openToolbelt()` — linhas 1038–1040 — sem fluxo contado — chama: closeModal, equipTool, openModal
- [x] `refreshEquippedToolVisual()` — linhas 1041–1054 — if=4, else=2, return=1 — chama: box, renderMat
- [x] `playToolAnimation()` — linhas 1055–1063 — sem fluxo contado — chama: beep, vibrate

## `07-navigation-traffic-routes.js`

- [x] `routeLength()` — linhas 1064–1064 — for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `compactRoute()` — linhas 1065–1065 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToSegment()` — linhas 1066–1066 — return=1 — chama: nenhuma função nomeada detectada
- [x] `navBlocked()` — linhas 1067–1067 — if=3, for=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `segmentClear()` — linhas 1068–1068 — if=1, for=1, return=2 — chama: navBlocked
- [x] `nearestRoadProjection()` — linhas 1069–1069 — if=1, for=1, return=1 — chama: projectPointToSegment, segmentClear
- [x] `pointOnRoad()` — linhas 1070–1070 — return=1 — chama: nenhuma função nomeada detectada
- [x] `projectPointToPolyline()` — linhas 1071–1075 — if=3, for=1, return=2 — chama: projectPointToSegment
- [x] `snapTrafficToRoad()` — linhas 1076–1081 — if=3, return=3 — chama: nearestRoadProjection, pointOnRoad, projectPointToPolyline
- [x] `trafficActorList()` — linhas 1082–1093 — if=6, for=5, return=2 — chama: nenhuma função nomeada detectada
- [x] `trafficSpeedFactor()` — linhas 1094–1101 — if=4, for=1, return=3 — chama: trafficActorList
- [x] `captureTrafficPositions()` — linhas 1102–1102 — for=1, return=1 — chama: trafficActorList
- [x] `resolveTrafficOverlaps()` — linhas 1103–1115 — if=8, else=2, for=3 — chama: pointOnRoad, snapTrafficToRoad, trafficActorList
- [x] `graphAdd()` — linhas 1116–1116 — if=2 — chama: nenhuma função nomeada detectada
- [x] `graphShortest()` — linhas 1117–1117 — if=6, for=2, while=2, return=2 — chama: nenhuma função nomeada detectada
- [x] `buildRoutePoints()` — linhas 1118–1129 — if=4, for=2, return=3 — chama: compactRoute, graphAdd, graphShortest, nearestRoadProjection
- [x] `routeProgressInfo()` — linhas 1130–1130 — if=2, for=1, return=2 — chama: projectPointToSegment, routeLength
- [x] `remainingRoute()` — linhas 1131–1131 — return=1 — chama: compactRoute, routeProgressInfo
- [x] `sampleRoute()` — linhas 1132–1132 — for=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createRouteGuide()` — linhas 1133–1133 — if=1, for=1, return=1 — chama: mat
- [x] `updateRouteGuide()` — linhas 1134–1134 — if=3, return=2 — chama: buildRoutePoints, createRouteGuide, groundHeightAt, remainingRoute, routeProgressInfo, sampleRoute
- [x] `miniPoint()` — linhas 1135–1135 — return=1 — chama: nenhuma função nomeada detectada
- [x] `drawMiniMap()` — linhas 1136–1136 — if=3, for=1, return=1 — chama: miniPoint, remainingRoute
- [x] `updateNavigation()` — linhas 1137–1137 — if=4, else=1, return=2 — chama: beep, drawMiniMap, routeProgressInfo, saveState, toast, updateRouteGuide
- [x] `routeSvgMarkup()` — linhas 1138–1200 — return=1 — chama: playerDisplayName, worldToMap

## `08-map-parent-settings.js`

- [x] `mapLocationDetails()` — linhas 1201–1201 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldToMap()` — linhas 1202–1202 — return=1 — chama: nenhuma função nomeada detectada
- [x] `mapDistance()` — linhas 1203–1204 — return=1 — chama: nenhuma função nomeada detectada
- [x] `mapMarkerPlacements()` — linhas 1205–1240 — if=5, else=2, for=4, return=4 — chama: worldToMap
- [x] `applyMapMarkerPlacements()` — linhas 1241–1248 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `mapSelectionMarkup()` — linhas 1249–1252 — if=1, return=2 — chama: mapDistance, mapLocationDetails
- [x] `setWaypoint()` — linhas 1253–1257 — if=1, return=1 — chama: buildRoutePoints, closeModal, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `clearWaypoint()` — linhas 1258–1258 — sem fluxo contado — chama: closeModal, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `openMap()` — linhas 1259–1277 — if=2, return=3 — chama: applyMapMarkerPlacements, buildRoutePoints, mapDistance, mapMarkerPlacements, mapSelectionMarkup, openModal, routeProgressInfo, routeSvgMarkup, setWaypoint, worldToMap
- [x] `refreshOpenMapAfterResize()` — linhas 1278–1280 — if=2, return=1 — chama: openMap
- [x] `performLocalReset()` — linhas 1281–1283 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openFinalResetConfirmation()` — linhas 1284–1289 — if=3, return=2 — chama: commitState, confirmModal, openModal, openParentTools, performLocalReset
- [x] `openParentTools()` — linhas 1290–1297 — if=2, catch=1, return=2 — chama: confirmModal, normalizeState, openFinalResetConfirmation, openModal, openSettings, toast
- [x] `openParentGate()` — linhas 1298–1308 — if=5, return=3 — chama: accountLinked, openModal, openParentTools, openSettings
- [x] `openSettings()` — linhas 1309–1359 — if=11, else=6 — chama: accountStatusText, applyQuality, closeChallengePrompt, closeModal, commitState, hasValidPlayerName, multiplayerStatusText, openAccountCenter, openEducationHub, openModal, openParentGate, openPlayerNameModal (+8)

## `09-responsive-ar-quality-diagnostics.js`

- [x] `syncMobilePanels()` — linhas 1360–1408 — if=16, catch=1, return=1, throw=2 — chama: openObjectivesPanel, saveState
- [x] `otthiGameModelUrl()` — linhas 1409–1412 — return=1 — chama: nenhuma função nomeada detectada
- [x] `androidSceneViewerUrl()` — linhas 1413–1422 — return=1 — chama: otthiGameModelUrl
- [x] `isAndroidDevice()` — linhas 1423–1426 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openAndroidSceneViewer()` — linhas 1427–1467 — if=5, catch=2, return=4 — chama: androidSceneViewerUrl, isAndroidDevice, openModal, toast
- [x] `detectStableAutoTier()` — linhas 1468–1487 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `vehiclePlayerMode()` — linhas 1488–1494 — if=3, return=4 — chama: nenhuma função nomeada detectada
- [x] `derivePlayerMode()` — linhas 1495–1505 — if=8, return=9 — chama: vehiclePlayerMode
- [x] `auditPlayerMode()` — linhas 1506–1521 — if=7, return=1 — chama: derivePlayerMode
- [x] `isOnFootMode()` — linhas 1522–1522 — return=1 — chama: derivePlayerMode
- [x] `canEnterMobility()` — linhas 1523–1527 — if=1, return=2 — chama: auditPlayerMode, isOnFootMode
- [x] `cameraRelativeVector()` — linhas 1528–1532 — return=1 — chama: nenhuma função nomeada detectada
- [x] `normalizeControlIntent()` — linhas 1533–1540 — if=2, return=3 — chama: cameraRelativeVector, derivePlayerMode
- [x] `requestedQuality()` — linhas 1541–1541 — return=1 — chama: nenhuma função nomeada detectada
- [x] `qualityLabel()` — linhas 1542–1542 — return=1 — chama: qualityTier, requestedQuality
- [x] `qualityTier()` — linhas 1543–1543 — return=1 — chama: requestedQuality
- [x] `targetDpr()` — linhas 1544–1549 — if=2, return=3 — chama: qualityTier
- [x] `applyAdaptiveRenderSettings()` — linhas 1550–1558 — if=4, return=1 — chama: qualityTier, scheduleStableResize, targetDpr
- [x] `samplePerformance()` — linhas 1559–1578 — if=6, else=2, return=2 — chama: applyAdaptiveRenderSettings, lockStableSceneVisibility, requestedQuality, saveState, toast
- [x] `lockStableSceneVisibility()` — linhas 1579–1585 — if=4, for=3 — chama: qualityTier
- [x] `freezeWorldFrustumCulling()` — linhas 1586–1600 — if=4, else=1, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `updateVisualLOD()` — linhas 1601–1608 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `pwaInstalled()` — linhas 1609–1609 — return=1 — chama: nenhuma função nomeada detectada
- [x] `activeVehicleCount()` — linhas 1610–1610 — return=1 — chama: nenhuma função nomeada detectada
- [x] `runtimeDiagnostics()` — linhas 1611–1614 — return=1 — chama: activeVehicleCount, auditPlayerMode, pwaInstalled
- [x] `ensureTechnicalPanel()` — linhas 1615–1617 — if=1, return=2 — chama: toggleTechnicalPanel
- [x] `refreshTechnicalPanel()` — linhas 1618–1618 — if=1, return=1 — chama: ensureTechnicalPanel, qualityTier, runtimeDiagnostics
- [x] `toggleTechnicalPanel()` — linhas 1619–1619 — if=1 — chama: ensureTechnicalPanel, refreshTechnicalPanel
- [x] `initTechnicalPanel()` — linhas 1620–1624 — if=2 — chama: toggleTechnicalPanel

## `10-player-skills.js`

- [x] `playerScaleValue()` — linhas 1625–1627 — return=1 — chama: nenhuma função nomeada detectada
- [x] `skillReady()` — linhas 1628–1628 — if=1, return=2 — chama: toast
- [x] `recordAdvancedSkill()` — linhas 1629–1634 — for=1 — chama: advanceAdventure, saveState, trackDaily, updateAbilityUI
- [x] `collectCrystal()` — linhas 1635–1637 — if=1, return=2 — chama: addCoins, addXP, beep, checkActiveJob, evaluateMissions, saveState, toast, trackDaily, vibrate
- [x] `syncPlayerRootScale()` — linhas 1638–1647 — if=2, return=2 — chama: playerScaleValue
- [x] `setScaleMode()` — linhas 1648–1667 — if=10, else=2, for=2, return=7 — chama: beep, damageEnemy, recordAdvancedSkill, saveState, skillReady, spawnDust, toast, trackDaily, updateAbilityUI, vibrate
- [x] `toggleCrouch()` — linhas 1668–1677 — if=3, return=3 — chama: beep, playerDisplayName, recordAdvancedSkill, saveState, skillReady, toast, updateAbilityUI
- [x] `spinPlayer()` — linhas 1678–1684 — if=3, for=2, return=1 — chama: addXP, beep, collectCrystal, damageEnemy, recordAdvancedSkill, skillReady, toast
- [x] `updateAbilityUI()` — linhas 1685–1691 — if=2, for=2 — chama: nenhuma função nomeada detectada

## `11-render-materials-player-model.js`

- [x] `canvasTexture()` — linhas 1692–1728 — if=11, else=9, for=24, return=2 — chama: nenhuma função nomeada detectada
- [x] `professionalTexture()` — linhas 1729–1734 — if=1, else=1, return=1 — chama: canvasTexture
- [x] `initMaterials()` — linhas 1735–1780 — sem fluxo contado — chama: canvasTexture, professionalTexture
- [x] `mat()` — linhas 1781–1786 — return=1 — chama: nenhuma função nomeada detectada
- [x] `geometryKey()` — linhas 1787–1787 — return=1 — chama: nenhuma função nomeada detectada
- [x] `sharedBoxGeometry()` — linhas 1788–1792 — if=1, return=1 — chama: geometryKey
- [x] `sharedCylinderGeometry()` — linhas 1793–1797 — if=1, return=1 — chama: geometryKey
- [x] `renderMat()` — linhas 1798–1803 — if=1, return=1 — chama: mat
- [x] `tintedBrickMaterial()` — linhas 1804–1806 — return=1 — chama: nenhuma função nomeada detectada
- [x] `texturedRoofMaterial()` — linhas 1807–1809 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `addSoftHighlight()` — linhas 1810–1814 — return=1 — chama: sharedBoxGeometry
- [x] `box()` — linhas 1815–1819 — return=1 — chama: mat, sharedBoxGeometry
- [x] `stabilizeSurface()` — linhas 1820–1820 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stableBox()` — linhas 1821–1821 — return=1 — chama: box, stabilizeSurface
- [x] `cylinder()` — linhas 1822–1826 — return=1 — chama: mat, sharedCylinderGeometry
- [x] `addGlow()` — linhas 1827–1830 — return=1 — chama: nenhuma função nomeada detectada
- [x] `addVoxelOutline()` — linhas 1831–1835 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `premiumBox()` — linhas 1836–1838 — return=1 — chama: addVoxelOutline, box
- [x] `premiumCylinder()` — linhas 1839–1841 — return=1 — chama: addVoxelOutline, cylinder
- [x] `makeWindow()` — linhas 1842–1845 — return=1 — chama: mat, premiumBox
- [x] `makePlanter()` — linhas 1846–1849 — for=1, return=1 — chama: premiumBox
- [x] `createPlayerModel()` — linhas 1850–1911 — if=3, for=2 — chama: addSoftHighlight, addVoxelOutline, box, mat, multiplayerNameTexture, playerDisplayName, refreshEquippedToolVisual, renderMat, sharedCylinderGeometry
- [x] `loadFaithfulAthosModel()` — linhas 1912–1917 — return=1 — chama: nenhuma função nomeada detectada
- [x] `clearAvatarLayer()` — linhas 1918–1923 — if=1 — chama: nenhuma função nomeada detectada
- [x] `applyAvatarCustomization()` — linhas 1924–1955 — if=18, else=11, return=1 — chama: box, clearAvatarLayer, effectiveAvatarUniform, mat
- [x] `registerCollider()` — linhas 1956–1956 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `registerPlatform()` — linhas 1957–1957 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `registerInteractable()` — linhas 1958–1958 — return=1 — chama: nenhuma função nomeada detectada
- [x] `worldPos()` — linhas 1959–1962 — if=1, return=2 — chama: nenhuma função nomeada detectada

## `12-world-resources-nature.js`

- [x] `isInteractionAvailable()` — linhas 1963–1969 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `ensureFlowerBatch()` — linhas 1970–1983 — if=2, return=1 — chama: renderMat, sharedBoxGeometry
- [x] `createTree()` — linhas 1984–2002 — if=2, return=1 — chama: box, collectResource, registerInteractable, renderMat
- [x] `createRock()` — linhas 2003–2006 — if=1, return=1 — chama: collectResource, registerInteractable
- [x] `createGoldFoundry()` — linhas 2007–2014 — return=1 — chama: premiumBox, registerCollider, registerInteractable, renderMat, signTexture, texturedRoofMaterial
- [x] `createGoldMine()` — linhas 2015–2028 — for=2, return=1 — chama: collectResource, createLamp, createSignpost, premiumBox, registerInteractable, renderMat
- [x] `createVillageWell()` — linhas 2029–2037 — for=1, return=1 — chama: createSignpost, premiumBox, premiumCylinder, registerInteractable
- [x] `drawWaterFromWell()` — linhas 2038–2042 — if=3, return=2 — chama: addXP, advanceAdventure, playToolAnimation, saveState, toast, updateHUD
- [x] `createFlower()` — linhas 2043–2052 — if=2 — chama: ensureFlowerBatch
- [x] `createLamp()` — linhas 2053–2060 — return=1 — chama: addGlow, box, renderMat
- [x] `createSignpost()` — linhas 2061–2066 — return=1 — chama: box, signTexture
- [x] `createFenceLine()` — linhas 2067–2070 — for=1 — chama: box
- [x] `createRoad()` — linhas 2071–2088 — if=1, else=1, for=2 — chama: renderMat, stableBox
- [x] `createWater()` — linhas 2089–2089 — for=1 — chama: stableBox
- [x] `createLava()` — linhas 2090–2091 — return=1 — chama: mat, stableBox
- [x] `createFurniture()` — linhas 2092–2153 — if=16, for=15, return=1 — chama: box, cylinder, premiumBox, premiumCylinder, renderMat, shadeColor
- [x] `signTexture()` — linhas 2154–2184 — if=3, else=2, for=1, while=1, return=1 — chama: nenhuma função nomeada detectada

## `13-houses-npcs-vehicles-base.js`

- [x] `shadeColor()` — linhas 2185–2190 — return=1 — chama: nenhuma função nomeada detectada
- [x] `decorateHouseCommercial()` — linhas 2191–2207 — if=3, else=1, for=1 — chama: addVoxelOutline, box, makePlanter, premiumBox, shadeColor
- [x] `createHouse()` — linhas 2208–2234 — if=1, for=1, return=1 — chama: box, createFlower, createLamp, decorateHouseCommercial, makeWindow, registerCollider, registerInteractable, renderMat, shadeColor, signTexture, texturedRoofMaterial, tintedBrickMaterial
- [x] `addHouseInterior()` — linhas 2235–2282 — if=7, else=6, for=11 — chama: addGlow, createFurniture, exitHouse, premiumBox, premiumCylinder, registerActivity, registerInteractable
- [x] `registerActivity()` — linhas 2283–2286 — sem fluxo contado — chama: activityIcon, registerInteractable, useActivity
- [x] `activityIcon()` — linhas 2287–2288 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createNPC()` — linhas 2289–2307 — if=4, else=1, for=2, return=1 — chama: addVoxelOutline, box, iconTexture, registerInteractable, renderMat, shadeColor, talkToNPC
- [x] `createNpcMobility()` — linhas 2308–2321 — if=5, else=3, for=4, return=3 — chama: addVoxelOutline, nearestRoadProjection, premiumBox, premiumCylinder
- [x] `createEnemy()` — linhas 2322–2328 — if=2, else=2, return=1 — chama: box
- [x] `createCrystal()` — linhas 2329–2332 — sem fluxo contado — chama: addGlow, mat
- [x] `createChest()` — linhas 2333–2335 — if=1, return=1 — chama: box, openChest, registerInteractable
- [x] `createPlatform()` — linhas 2336–2336 — sem fluxo contado — chama: box, registerPlatform
- [x] `vehicleById()` — linhas 2337–2337 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentVehicleRef()` — linhas 2338–2338 — if=3, return=4 — chama: vehicleById
- [x] `applyVehicleAppearance()` — linhas 2339–2342 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `persistParkedVehicle()` — linhas 2343–2345 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `createToyCar()` — linhas 2346–2358 — if=2, for=1, return=1 — chama: addVoxelOutline, box, cylinder, enterVehicle, registerInteractable, renderMat
- [x] `createWaypointMarker()` — linhas 2359–2364 — sem fluxo contado — chama: box, mat, updateWaypointMarker
- [x] `updateWaypointMarker()` — linhas 2365–2369 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `createAthleticsGym()` — linhas 2370–2377 — for=1 — chama: box, createLamp, openRaceCenter, registerInteractable
- [x] `createSizeChallenges()` — linhas 2378–2395 — if=3, return=3 — chama: addXP, box, registerInteractable, setFlag, toast
- [x] `createSkyDome()` — linhas 2396–2411 — for=1 — chama: renderMat, sharedBoxGeometry
- [x] `updateClouds()` — linhas 2412–2417 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada

## `14-world-district-decoration.js`

- [x] `createVoxelMushroom()` — linhas 2418–2426 — if=1, return=1 — chama: addVoxelOutline, box, renderMat, shadeColor
- [x] `iconTexture()` — linhas 2427–2429 — return=1 — chama: nenhuma função nomeada detectada
- [x] `createChallengeCube()` — linhas 2430–2430 — return=1 — chama: box, iconTexture
- [x] `createPortalArch()` — linhas 2431–2436 — for=1, return=1 — chama: addGlow, box, mat
- [x] `createPlayground()` — linhas 2437–2440 — for=1, return=1 — chama: box
- [x] `createFountain()` — linhas 2441–2441 — return=1 — chama: addGlow, cylinder, mat
- [x] `createAwning()` — linhas 2442–2442 — for=1, return=1 — chama: box
- [x] `createStreetTree()` — linhas 2443–2448 — return=1 — chama: makePlanter, premiumBox
- [x] `createBackdropBuilding()` — linhas 2449–2457 — for=2, return=1 — chama: addVoxelOutline, box, renderMat, shadeColor
- [x] `createFloatingIsland()` — linhas 2458–2461 — for=1, return=1 — chama: addVoxelOutline, mat, premiumBox
- [x] `createCoinTrail()` — linhas 2462–2464 — sem fluxo contado — chama: mat
- [x] `createCommercialDistrict()` — linhas 2465–2473 — sem fluxo contado — chama: createBackdropBuilding, createCoinTrail, createFloatingIsland, createStreetTree
- [x] `createDistrictVisuals()` — linhas 2474–2505 — sem fluxo contado — chama: createAwning, createChallengeCube, createCommercialDistrict, createFountain, createPlayground, createPortalArch, createVoxelMushroom

## `15-transit-bus-metro.js`

- [x] `compactBusPath()` — linhas 2506–2508 — if=3, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `projectedBusPoint()` — linhas 2509–2509 — return=1 — chama: nearestRoadProjection
- [x] `offsetBusPath()` — linhas 2510–2517 — if=2, for=1, return=4 — chama: compactBusPath, pointOnRoad
- [x] `buildBusRoadPath()` — linhas 2518–2531 — if=4, for=2, return=3 — chama: buildRoutePoints, compactBusPath, nearestRoadProjection, offsetBusPath, projectedBusPoint
- [x] `busRoutePoints()` — linhas 2532–2532 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busNextStop()` — linhas 2533–2533 — if=1, for=1, return=2 — chama: busRoutePoints
- [x] `nearestForwardBusSegment()` — linhas 2534–2538 — if=2, for=1, return=2 — chama: projectPointToSegment
- [x] `recoverBusRoute()` — linhas 2539–2542 — if=1, return=2 — chama: busRoutePoints, nearestForwardBusSegment, setBusState
- [x] `setBusState()` — linhas 2543–2545 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `setBusWaiting()` — linhas 2546–2548 — return=1 — chama: saveState
- [x] `clearBusWaiting()` — linhas 2549–2549 — if=1 — chama: saveState
- [x] `restoreBusWaiting()` — linhas 2550–2550 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `busStopRecord()` — linhas 2551–2551 — return=1 — chama: nenhuma função nomeada detectada
- [x] `safeBusExitPoint()` — linhas 2552–2557 — if=1, return=2 — chama: busStopRecord, groundHeightAt, positionBlockedForPlayer, safePointNear
- [x] `createMetroEntrance()` — linhas 2558–2566 — for=2, return=1 — chama: iconTexture, openMetroStation, premiumBox, registerInteractable
- [x] `ensureMetroOverlay()` — linhas 2567–2569 — if=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `openMetroStation()` — linhas 2570–2574 — if=2, return=1 — chama: openModal, rideMetroTo, toast
- [x] `rideMetroTo()` — linhas 2575–2588 — if=9, return=3 — chama: advanceAdventure, auditPlayerMode, canEnterMobility, clearMovementInputs, closeModal, ensureMetroOverlay, rememberSafePlayerPosition, safePointNear, saveState, setFlag, toast, trackDaily (+2)
- [x] `ensureBusStop()` — linhas 2589–2592 — if=2, return=2 — chama: iconTexture, openBusStop, premiumBox, registerInteractable
- [x] `createBusModel()` — linhas 2593–2615 — if=4, for=10, return=1 — chama: buildBusRoadPath, ensureBusStop, enterBus, premiumBox, premiumCylinder, registerInteractable, renderMat, signTexture
- [x] `createTransitWorld()` — linhas 2616–2616 — for=1 — chama: createBusModel, restoreBusWaiting, validateBusCoverage
- [x] `busAtStop()` — linhas 2617–2617 — return=1 — chama: nenhuma função nomeada detectada
- [x] `busEtaSeconds()` — linhas 2618–2618 — if=3, for=1, return=4 — chama: busAtStop, busRoutePoints
- [x] `validateBusCoverage()` — linhas 2619–2619 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `busDestinationsAfter()` — linhas 2620–2622 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openBusArrivalOffer()` — linhas 2623–2632 — if=2, return=3 — chama: busAtStop, busDestinationsAfter, clearBusWaiting, closeModal, enterBus, openModal, setBusState, setBusWaiting, toast
- [x] `offerBusAtStop()` — linhas 2633–2639 — if=6, else=1, return=4 — chama: busAtStop, openBusArrivalOffer
- [x] `openBusStop()` — linhas 2640–2651 — return=1 — chama: busAtStop, busEtaSeconds, clearBusWaiting, closeModal, openBusArrivalOffer, openModal, setBusWaiting, toast
- [x] `ensureTransitPanel()` — linhas 2652–2654 — if=2, return=3 — chama: toast, updateTransitPanel
- [x] `updateTransitPanel()` — linhas 2655–2657 — if=1, return=1 — chama: busNextStop, ensureTransitPanel
- [x] `enterBus()` — linhas 2658–2668 — if=8, return=4 — chama: auditPlayerMode, busAtStop, canEnterMobility, clearBusWaiting, clearMovementInputs, closeModal, saveState, setBusState, toast, updateTransitPanel
- [x] `exitBusAtStop()` — linhas 2669–2677 — if=7, return=2 — chama: advanceAdventure, auditPlayerMode, busAtStop, busStopRecord, rememberSafePlayerPosition, safeBusExitPoint, saveState, setBusState, setFlag, toast, trackDaily, updateContext (+1)
- [x] `updateTransitWorld()` — linhas 2678–2722 — if=29, else=10, for=2 — chama: busRoutePoints, exitBusAtStop, offerBusAtStop, pointOnRoad, recoverBusRoute, setBusState, trafficSpeedFactor, updateTransitPanel

## `16-emergency-services.js`

- [x] `decorateCityServices()` — linhas 2723–2736 — if=1, for=5 — chama: iconTexture, premiumBox, premiumCylinder
- [x] `createFireIncidentSite()` — linhas 2737–2740 — for=2, return=1 — chama: helpExtinguishFire, registerInteractable, renderMat
- [x] `createFireTruck()` — linhas 2741–2746 — for=3, return=1 — chama: premiumBox, premiumCylinder, renderMat
- [x] `createFireServiceWorld()` — linhas 2747–2747 — sem fluxo contado — chama: createFireTruck
- [x] `activateFireIncident()` — linhas 2748–2748 — if=2, return=3 — chama: saveState, toast
- [x] `ensureActiveFire()` — linhas 2749–2749 — return=1 — chama: activateFireIncident
- [x] `helpExtinguishFire()` — linhas 2750–2750 — if=3, for=1, return=2 — chama: extinguishFireIncident, spawnDust, toast
- [x] `extinguishFireIncident()` — linhas 2751–2751 — if=5, for=1, return=1 — chama: addXP, completeActiveJob, saveState, toast, updateNavigation, updateWaypointMarker
- [x] `serviceVehicleRoute()` — linhas 2752–2752 — if=1, return=1 — chama: buildRoutePoints
- [x] `moveServiceVehicle()` — linhas 2753–2753 — if=4, for=1, return=4 — chama: serviceVehicleRoute, snapTrafficToRoad, trafficSpeedFactor
- [x] `updateFireService()` — linhas 2754–2759 — if=12, else=1, for=2, return=1 — chama: activateFireIncident, extinguishFireIncident, moveServiceVehicle, spawnDust
- [x] `createPoliceCar()` — linhas 2760–2768 — if=1, for=1, return=1 — chama: addVoxelOutline, iconTexture, premiumBox, premiumCylinder, renderMat
- [x] `createAmbulance()` — linhas 2769–2775 — for=1, return=1 — chama: premiumBox, premiumCylinder, renderMat
- [x] `createPoliceSystem()` — linhas 2776–2780 — sem fluxo contado — chama: createAmbulance, createPoliceCar
- [x] `movePoliceToward()` — linhas 2781–2783 — if=2, for=1, return=2 — chama: snapTrafficToRoad, trafficSpeedFactor
- [x] `updatePolicePatrol()` — linhas 2784–2786 — if=1 — chama: movePoliceToward
- [x] `updateSafetyPanel()` — linhas 2787–2789 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `startPoliceAlert()` — linhas 2790–2794 — if=2, return=3 — chama: saveState, toast, updateSafetyPanel
- [x] `finishSafetyStop()` — linhas 2795–2798 — if=2, return=1 — chama: clearMovementInputs, exitVehicle, groundHeightAt, openSafetyLesson, saveState, updateSafetyPanel
- [x] `openSafetyLesson()` — linhas 2799–2808 — if=1 — chama: addReputation, addXP, awardMedal, closeModal, openModal, saveState, toast
- [x] `updatePoliceSystem()` — linhas 2809–2830 — if=12, else=3, for=2 — chama: finishSafetyStop, movePoliceToward, npcSpeech, startPoliceAlert, updatePolicePatrol, updateSafetyPanel
- [x] `moveIncidentResponder()` — linhas 2831–2836 — if=5, for=1, return=4 — chama: buildRoutePoints, snapTrafficToRoad, trafficSpeedFactor
- [x] `createTrafficIncident()` — linhas 2837–2844 — if=7, for=3, return=2 — chama: nearestRoadProjection, premiumBox, premiumCylinder, renderMat, saveState, toast
- [x] `resolveTrafficIncident()` — linhas 2845–2847 — if=5, for=4, return=1 — chama: saveState, toast
- [x] `updateTrafficIncidents()` — linhas 2848–2860 — if=8, for=6, return=3 — chama: createTrafficIncident, moveIncidentResponder, resolveTrafficIncident, trafficActorList
- [x] `openTransitGuide()` — linhas 2861–2864 — sem fluxo contado — chama: openModal, setWaypoint

## `17-adventures-learning-world.js`

- [x] `createRoyalCastle()` — linhas 2865–2890 — for=10, return=1 — chama: addGlow, createCastleChallengeTokens, createSignpost, exitHouse, mat, premiumBox, premiumCylinder, registerInteractable, renderMat, toast
- [x] `createCastleChallengeTokens()` — linhas 2891–2893 — return=1 — chama: mat
- [x] `openAdventureHub()` — linhas 2894–2896 — sem fluxo contado — chama: openModal, startAdventure
- [x] `startAdventure()` — linhas 2897–2899 — if=3, for=1, return=3 — chama: closeModal, saveState, setWaypoint, toast
- [x] `restoreActiveAdventure()` — linhas 2900–2905 — if=2, for=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `advanceAdventure()` — linhas 2906–2908 — if=3, else=1, return=2 — chama: beep, finishAdventure, saveState
- [x] `finishAdventure()` — linhas 2909–2911 — if=4, else=1, for=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, saveState, setFlag, toast
- [x] `updateAdventure()` — linhas 2912–2914 — if=6, for=1, return=2 — chama: advanceAdventure, finishAdventure
- [x] `createLearningStation()` — linhas 2915–2917 — return=1 — chama: iconTexture, mat, openEducationHub, premiumBox, registerInteractable
- [x] `createLearningPlaza()` — linhas 2918–2924 — sem fluxo contado — chama: createLearningStation, createSignpost

## `18-water-fishing-boats.js`

- [x] `rectOverlap()` — linhas 2925–2925 — return=1 — chama: nenhuma função nomeada detectada
- [x] `insideWater()` — linhas 2926–2926 — return=1 — chama: nenhuma função nomeada detectada
- [x] `waterAt()` — linhas 2927–2927 — return=1 — chama: insideWater
- [x] `isInsideLakeNavigable()` — linhas 2928–2928 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isNearFishingArea()` — linhas 2929–2929 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resolveWaterWalking()` — linhas 2930–2932 — if=3, return=2 — chama: groundHeightAt, toast, waterAt
- [x] `distanceToBoatDock()` — linhas 2933–2933 — return=1 — chama: nenhuma função nomeada detectada
- [x] `validBoatExit()` — linhas 2934–2934 — return=1 — chama: distanceToBoatDock
- [x] `safeBoatExitPoint()` — linhas 2935–2936 — return=1 — chama: nenhuma função nomeada detectada
- [x] `ensureFishingVisual()` — linhas 2937–2950 — if=1, return=2 — chama: renderMat
- [x] `setFishingLine()` — linhas 2951–2951 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `fishingCastTarget()` — linhas 2952–2958 — if=2, else=1, return=1 — chama: isInsideLakeNavigable
- [x] `beginFishingVisual()` — linhas 2959–2972 — if=2, return=1 — chama: ensureFishingVisual, fishingCastTarget, setFishingLine
- [x] `castFishingVisual()` — linhas 2973–2973 — if=1, return=1 — chama: beep, ensureFishingVisual, fishingCastTarget
- [x] `hookFishingVisual()` — linhas 2974–2974 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `pullFishingVisual()` — linhas 2975–2975 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `restoreFishingCamera()` — linhas 2976–2979 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `stopFishingVisual()` — linhas 2980–2986 — if=4, else=1, return=2 — chama: restoreFishingCamera, setFishingUiActive
- [x] `clearFishingTimers()` — linhas 2987–2987 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `setFishingUiActive()` — linhas 2988–2992 — if=1 — chama: scheduleStableResize, syncMobilePanels
- [x] `cancelFishingSession()` — linhas 2993–2993 — sem fluxo contado — chama: clearFishingTimers, stopFishingVisual
- [x] `ensureFishingModalStyle()` — linhas 2994–3004 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `updateFishingVisual()` — linhas 3005–3015 — if=11, else=6, return=1 — chama: setFishingLine, stopFishingVisual
- [x] `createBoatModel()` — linhas 3016–3020 — sem fluxo contado — chama: premiumBox, registerInteractable, renderMat
- [x] `ensureBoatPanel()` — linhas 3021–3023 — if=1, return=2 — chama: exitBoat, startFishing
- [x] `updateBoatPanel()` — linhas 3024–3033 — if=8, return=6 — chama: auditPlayerMode, boardNpcPassenger, canEnterMobility, ensureBoatPanel, exitVehicle, nearestRideCompanion, saveState, toast
- [x] `enterBoatAsPassenger()` — linhas 3034–3041 — if=4, return=4 — chama: auditPlayerMode, canEnterMobility, exitVehicle, saveState, toast, updateBoatPanel
- [x] `exitBoat()` — linhas 3042–3049 — if=7, else=1, return=3 — chama: auditPlayerMode, groundHeightAt, releaseNpcPassenger, rememberSafePlayerPosition, safeBoatExitPoint, saveState, toast, updateBoatPanel, validBoatExit
- [x] `updateBoatPhysics()` — linhas 3050–3053 — if=4, return=2 — chama: exitBoat, toast
- [x] `constrainBoat()` — linhas 3054–3054 — if=3, return=1 — chama: isInsideLakeNavigable
- [x] `weightedFish()` — linhas 3055–3055 — if=1, for=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `startFishing()` — linhas 3056–3064 — if=14, return=11 — chama: addCoins, addXP, beep, beginFishingVisual, cancelFishingSession, castFishingVisual, clearFishingTimers, ensureFishingModalStyle, hookFishingVisual, isNearFishingArea, openModal, pullFishingVisual (+6)

## `19-campfire-hunting-house-extensions.js`

- [x] `campfireAllowed()` — linhas 3065–3065 — if=4, return=5 — chama: rectOverlap, waterAt
- [x] `spawnCampfire()` — linhas 3066–3068 — if=1, for=1, return=1 — chama: mat, openCampfire, premiumCylinder, registerInteractable
- [x] `nearestActiveCampfire()` — linhas 3069–3070 — if=3, return=4 — chama: campfireAllowed, confirmModal, saveState, spawnCampfire, toast
- [x] `finishCampfireCooking()` — linhas 3071–3071 — if=1, return=1 — chama: beep, saveState, toast
- [x] `openCampfire()` — linhas 3072–3074 — if=4, return=4 — chama: closeModal, confirmModal, finishCampfireCooking, openModal, saveState, toast, updateHUD
- [x] `openNearestCampfire()` — linhas 3075–3075 — if=1, else=1 — chama: nearestActiveCampfire, openCampfire, toast
- [x] `openCampfireZone()` — linhas 3076–3076 — if=1, else=1 — chama: closeModal, nearestActiveCampfire, openCampfire, openModal
- [x] `createCampfireZone()` — linhas 3077–3077 — for=1 — chama: createSignpost, premiumBox, registerInteractable
- [x] `createForestAnimal()` — linhas 3078–3078 — if=1, for=2, return=1 — chama: premiumBox
- [x] `startHunting()` — linhas 3079–3079 — if=5, else=1, return=2 — chama: addXP, closeModal, openModal, saveState, toast
- [x] `createHuntingArea()` — linhas 3080–3080 — for=1 — chama: createForestAnimal, createSignpost, premiumBox, registerInteractable, startHunting
- [x] `nearestOwnedHouseForExtension()` — linhas 3081–3081 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionPlacement()` — linhas 3082–3082 — return=1 — chama: nenhuma função nomeada detectada
- [x] `extensionValid()` — linhas 3083–3083 — if=6, for=1, return=6 — chama: rectOverlap
- [x] `clearExtensionPreview()` — linhas 3084–3084 — if=2 — chama: nenhuma função nomeada detectada
- [x] `renderExtensionPreview()` — linhas 3085–3085 — if=3, for=1, return=1 — chama: extensionValid
- [x] `spawnHouseExtension()` — linhas 3086–3086 — if=1, return=1 — chama: playerDisplayName, premiumBox, registerInteractable, registerPlatform, shadeColor, toast
- [x] `resourcesEnough()` — linhas 3087–3087 — return=1 — chama: nenhuma função nomeada detectada
- [x] `costText()` — linhas 3088–3088 — return=1 — chama: nenhuma função nomeada detectada
- [x] `openHouseExtensionPlanner()` — linhas 3089–3089 — if=3, for=1, return=3 — chama: clearExtensionPreview, closeModal, costText, extensionPlacement, extensionValid, nearestOwnedHouseForExtension, openModal, playerDisplayName, renderExtensionPreview, resourcesEnough, saveState, spawnHouseExtension (+1)
- [x] `openHouseExtensionMenu()` — linhas 3090–3090 — sem fluxo contado — chama: closeModal, costText, openHouseExtensionPlanner, openModal
- [x] `createLakeExpansion()` — linhas 3091–3091 — for=1 — chama: createBoatModel, createSignpost, premiumBox, registerInteractable, registerPlatform, startFishing
- [x] `restoreLifeExpansion()` — linhas 3092–3092 — if=2, for=2 — chama: finishCampfireCooking, spawnCampfire, spawnHouseExtension
- [x] `updateLifeActivities()` — linhas 3093–3096 — if=8, for=2, return=1 — chama: finishCampfireCooking, saveState

## `20-world-build-cloud-houses.js`

- [x] `createLifeExpansionWorld()` — linhas 3097–3097 — sem fluxo contado — chama: applyCloudWorldObjects, createCampfireZone, createHuntingArea, createLakeExpansion, restoreLifeExpansion
- [x] `buildWorld()` — linhas 3098–3158 — if=3, for=9 — chama: addHouseInterior, box, createAthleticsGym, createChest, createCrystal, createDistrictVisuals, createEnemy, createFenceLine, createFireServiceWorld, createFlower, createGoldFoundry, createGoldMine (+29)
- [x] `collectResource()` — linhas 3159–3168 — if=3, return=3 — chama: addXP, advanceAdventure, beep, checkActiveJob, evaluateMissions, playToolAnimation, saveState, toast, trackDaily, vibrate
- [x] `openChest()` — linhas 3169–3175 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, setFlag, toast
- [x] `cloudHouseRecord()` — linhas 3176–3176 — return=1 — chama: nenhuma função nomeada detectada
- [x] `isMyCloudHouse()` — linhas 3177–3177 — return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileCloudHouses()` — linhas 3178–3207 — if=15, else=1, for=1, return=11 — chama: addCoins, awardMedal, closeModal, cloudHouseRecord, confirmModal, enterHouse, isMyCloudHouse, openModal, saveState, setFlag, startRace, toast
- [x] `enterHouse()` — linhas 3208–3219 — if=5, else=1, for=6, return=2 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, setFlag, toast, updateCamera, updateContext
- [x] `exitHouse()` — linhas 3220–3231 — if=4, else=1, for=6, return=2 — chama: auditPlayerMode, clearMovementInputs, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `openHomeChest()` — linhas 3232–3240 — if=2, return=2 — chama: openModal, playerDisplayName, saveState, toast

## `21-interactions-shop-social-races.js`

- [x] `useActivity()` — linhas 3241–3268 — if=19, else=15, return=2 — chama: addXP, closeModal, openAvatarStudio, openEducationHub, openFireStationDesk, openHomeChest, openModal, openSafetyLesson, openShop, openTeacherJobLesson, openWorkshop, playerDisplayName (+5)
- [x] `openShop()` — linhas 3269–3274 — if=1, return=1 — chama: addCoins, addXP, closeModal, openModal, saveState, toast
- [x] `openWorkshop()` — linhas 3275–3283 — if=3, return=3 — chama: addCoins, addXP, closeModal, openModal, saveState, toast
- [x] `friendshipTier()` — linhas 3284–3284 — return=1 — chama: nenhuma função nomeada detectada
- [x] `changeFriendship()` — linhas 3285–3289 — if=2 — chama: addReputation, addXP, evaluateMissions, saveState, setFlag, toast
- [x] `talkToNPC()` — linhas 3290–3337 — if=25, else=18, return=1 — chama: addCoins, addReputation, changeFriendship, closeModal, completeActiveJob, friendshipTier, openHouseChallenge, openJobCenter, openModal, saveState, setFlag, startRace (+4)
- [x] `openHouseChallenge()` — linhas 3338–3344 — if=1, return=1 — chama: closeModal, openModal, startRace, toast
- [x] `openRaceCenter()` — linhas 3345–3350 — sem fluxo contado — chama: closeModal, openModal, startRace
- [x] `createRaceOpponent()` — linhas 3351–3353 — return=1 — chama: box
- [x] `clearRaceObjects()` — linhas 3354–3358 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `spawnRaceCoins()` — linhas 3359–3364 — for=1 — chama: cylinder
- [x] `startRace()` — linhas 3365–3375 — if=4, return=2 — chama: createRaceOpponent, exitHouse, saveState, spawnRaceCoins, toast, updateWaypointMarker
- [x] `finishRace()` — linhas 3376–3385 — if=4, else=1, return=1 — chama: addCoins, addReputation, addXP, awardMedal, clearRaceObjects, evaluateMissions, saveState, setFlag, toast, trackDaily, updateWaypointMarker
- [x] `updateRace()` — linhas 3386–3415 — if=12, else=4, for=1, return=2 — chama: beep, finishRace

## `22-careers-jobs-uniforms.js`

- [x] `setMissionState()` — linhas 3416–3416 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `equipJobUniform()` — linhas 3417–3421 — if=1, return=1 — chama: applyAvatarCustomization, saveState
- [x] `focusActiveJob()` — linhas 3422–3441 — if=13, else=6, return=5 — chama: applyAvatarCustomization, buildRoutePoints, closeModal, confirmModal, ensureActiveFire, exitHouse, saveState, setMissionState, setWaypoint, toast, updateMissionHUD, updateNavigation (+1)
- [x] `activeJobProgress()` — linhas 3442–3453 — if=8, return=9 — chama: nenhuma função nomeada detectada
- [x] `openJobCenter()` — linhas 3454–3462 — sem fluxo contado — chama: activeJobProgress, equipJobUniform, openModal, startJob, toast
- [x] `startJob()` — linhas 3463–3473 — if=6, else=2, return=2 — chama: ensureActiveFire, equipJobUniform, exitHouse, focusActiveJob, saveState, setMissionState, toast, updateMissionHUD
- [x] `completeActiveJob()` — linhas 3474–3487 — if=8, return=3 — chama: applyAvatarCustomization, evaluateMissions, saveState, setFlag, setMissionState, toast, updateHUD, updateMissionHUD, updateWaypointMarker
- [x] `checkActiveJob()` — linhas 3488–3495 — if=4, else=2, return=1 — chama: completeActiveJob
- [x] `restoreActiveJobRuntime()` — linhas 3496–3498 — if=3, return=1 — chama: applyAvatarCustomization, ensureActiveFire, updateMissionHUD
- [x] `updateCareerMissions()` — linhas 3499–3509 — if=11, else=5, return=2 — chama: activeJobProgress, beep, checkActiveJob, completeActiveJob, saveState, setMissionState, setWaypoint, toast, updateMissionHUD, updateWaypointMarker
- [x] `openTeacherJobLesson()` — linhas 3510–3513 — if=1, return=1 — chama: addXP, closeModal, completeActiveJob, openModal, toast
- [x] `openFireStationDesk()` — linhas 3514–3525 — if=6, return=2 — chama: buildRoutePoints, closeModal, ensureActiveFire, equipJobUniform, exitHouse, focusActiveJob, openModal, startJob, toast, updateWaypointMarker
- [x] `startDeliveryJob()` — linhas 3526–3530 — if=1, return=1 — chama: saveState, toast

## `23-vehicle-effects-driving.js`

- [x] `spawnDust()` — linhas 3531–3536 — if=1 — chama: nenhuma função nomeada detectada
- [x] `updateFX()` — linhas 3537–3546 — if=1, for=1 — chama: nenhuma função nomeada detectada
- [x] `startEngineSound()` — linhas 3547–3557 — if=2, catch=1, return=2 — chama: nenhuma função nomeada detectada
- [x] `stopEngineSound()` — linhas 3558–3562 — if=1, catch=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `updateVehicleFX()` — linhas 3563–3587 — if=12, else=2, catch=1, return=2 — chama: beep, spawnDust, sprintRequested, startEngineSound, stopEngineSound
- [x] `updateVehicleControlsUI()` — linhas 3588–3597 — if=3 — chama: playerDisplayName
- [x] `vehicleHorn()` — linhas 3598–3603 — if=3, return=2 — chama: beep, vibrate
- [x] `enterVehicle()` — linhas 3604–3611 — if=5, return=2 — chama: applyVehicleAppearance, boardNpcPassenger, buildRoutePoints, canEnterMobility, clearMovementInputs, groundHeightAt, nearestRideCompanion, saveState, setFlag, setMissionState, startEngineSound, syncPlayerRootScale (+5)
- [x] `enterVehicleAsPassenger()` — linhas 3612–3620 — if=6, return=4 — chama: auditPlayerMode, canEnterMobility, clearMovementInputs, exitBoat, saveState, toast, updateAbilityUI, updateRunUI, updateVehicleControlsUI
- [x] `exitVehicle()` — linhas 3621–3629 — if=7, else=1, return=2 — chama: auditPlayerMode, clearMovementInputs, currentVehicleRef, groundHeightAt, persistParkedVehicle, releaseNpcPassenger, rememberSafePlayerPosition, safeVehicleExitPoint, saveState, stopEngineSound, syncPlayerRootScale, toast (+3)
- [x] `repairBridge()` — linhas 3630–3644 — if=2, return=2 — chama: addReputation, addXP, saveState, setFlag, toast

## `24-construction-system.js`

- [x] `buildCostText()` — linhas 3645–3645 — return=1 — chama: nenhuma função nomeada detectada
- [x] `currentBuildOwnerIds()` — linhas 3646–3646 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildOwnedByPlayer()` — linhas 3647–3647 — return=1 — chama: currentBuildOwnerIds
- [x] `buildFootprint()` — linhas 3648–3651 — return=1 — chama: nenhuma função nomeada detectada
- [x] `buildPlacementCandidate()` — linhas 3652–3657 — if=1, return=2 — chama: canBuildAt, groundHeightAt
- [x] `canBuildAt()` — linhas 3658–3668 — if=7, return=9 — chama: buildFootprint, groundHeightAt, rectOverlap, waterAt
- [x] `createBuildPreviewMesh()` — linhas 3669–3680 — if=7, else=6, for=3, return=3 — chama: sharedBoxGeometry
- [x] `disposeBuildPreview()` — linhas 3681–3683 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `ensureBuildPanel()` — linhas 3684–3688 — if=1, return=2 — chama: endBuildMode
- [x] `updateBuildPanel()` — linhas 3689–3693 — if=1, return=1 — chama: buildCostText, ensureBuildPanel, resourcesEnough
- [x] `updateBuildPreview()` — linhas 3694–3699 — if=5, return=2 — chama: buildPlacementCandidate, createBuildPreviewMesh, disposeBuildPreview, updateBuildPanel
- [x] `beginBuildMode()` — linhas 3700–3703 — if=2, return=3 — chama: disposeBuildPreview, ensureBuildPanel, toast, updateBuildPreview, updateContext, updateVehicleControlsUI
- [x] `endBuildMode()` — linhas 3704–3706 — if=3, return=2 — chama: disposeBuildPreview, toast, updateContext, updateVehicleControlsUI
- [x] `rotateBuildPreview()` — linhas 3707–3707 — if=1, return=2 — chama: updateBuildPreview, vibrate
- [x] `openBuildMenu()` — linhas 3708–3714 — if=3, return=3 — chama: beginBuildMode, buildCostText, closeModal, openHouseExtensionMenu, openModal, toast
- [x] `placeBuild()` — linhas 3715–3725 — if=5, for=2, catch=1, return=6, throw=1 — chama: addXP, buildCostText, checkActiveJob, evaluateMissions, mergeBuildCollections, normalizeBuildRecord, normalizeBuildTombstones, resourcesEnough, saveState, spawnBuild, syncCloudProgress, toast (+2)
- [x] `spawnBuild()` — linhas 3726–3738 — if=9, else=7, for=2, return=4 — chama: addGlow, box, buildRecordSignature, groundHeightAt, normalizeBuildRecord, premiumBox, registerCollider, registerPlatform
- [x] `buildRecordSignature()` — linhas 3739–3739 — return=1 — chama: nenhuma função nomeada detectada
- [x] `removeWorldBuildRecord()` — linhas 3740–3742 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `reconcileWorldBuilds()` — linhas 3743–3754 — if=5, for=2, return=5 — chama: applyBuildTombstones, buildOwnedByPlayer, buildRecordSignature, confirmModal, mergeBuildTombstones, normalizeBuildTombstones, removeWorldBuildRecord, saveState, spawnBuild, syncCloudProgress, toast

## `25-render-init-resize-position-collision.js`

- [x] `initThree()` — linhas 3755–3763 — if=1, for=1, return=2 — chama: applyAdaptiveRenderSettings, applyAvatarCustomization, applyQuality, buildWorld, createPlayerModel, freezeWorldFrustumCulling, initLocalMultiplayer, initMaterials, lockStableSceneVisibility, openModal, qualityTier, reconcileCloudHouses (+6)
- [x] `applyQuality()` — linhas 3764–3764 — if=1, return=1 — chama: applyAdaptiveRenderSettings
- [x] `viewportMetrics()` — linhas 3765–3772 — return=1 — chama: nenhuma função nomeada detectada
- [x] `resize()` — linhas 3773–3786 — if=2 — chama: clearMovementInputs, syncMobilePanels, targetDpr, viewportMetrics
- [x] `scheduleStableResize()` — linhas 3787–3787 — sem fluxo contado — chama: resize
- [x] `refreshOrientationLayout()` — linhas 3788–3792 — if=3 — chama: resize, scheduleStableResize
- [x] `restorePosition()` — linhas 3793–3798 — if=1 — chama: isInsideLakeNavigable, rememberSafePlayerPosition, safePointNear
- [x] `returnHome()` — linhas 3799–3805 — if=10, else=1, return=1 — chama: auditPlayerMode, busAtStop, exitBoat, exitBusAtStop, exitHouse, exitVehicle, rememberSafePlayerPosition, safePointNear, savePlayerPosition, toast
- [x] `savePlayerPosition()` — linhas 3806–3817 — if=7, else=3 — chama: commitState, isInsideLakeNavigable, saveState
- [x] `groundHeightAt()` — linhas 3818–3820 — if=2, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `positionBlockedForPlayer()` — linhas 3821–3837 — if=11, for=3, return=6 — chama: groundHeightAt, trafficActorList, waterAt
- [x] `safePointNear()` — linhas 3838–3842 — if=1, for=2, return=2 — chama: groundHeightAt, positionBlockedForPlayer
- [x] `rememberSafePlayerPosition()` — linhas 3843–3847 — if=2, return=3 — chama: positionBlockedForPlayer
- [x] `recoverPlayerIfInvalid()` — linhas 3848–3854 — if=2, return=3 — chama: positionBlockedForPlayer, rememberSafePlayerPosition, safePointNear
- [x] `safeVehicleExitPoint()` — linhas 3855–3858 — return=1 — chama: safePointNear
- [x] `vehicleHitsCollider()` — linhas 3859–3867 — if=5, for=2, return=4 — chama: currentVehicleRef, trafficActorList
- [x] `registerVehicleImpact()` — linhas 3868–3871 — if=1 — chama: beep, toast, vibrate
- [x] `resolveCollisions()` — linhas 3872–3885 — if=9, else=4, for=1, return=1 — chama: playerScaleValue, registerVehicleImpact, vehicleHitsCollider

## `26-input-player-physics.js`

- [x] `resolveMovementInput()` — linhas 3886–3902 — if=4, else=3, return=1 — chama: derivePlayerMode, normalizeControlIntent
- [x] `sprintRequested()` — linhas 3903–3903 — return=1 — chama: nenhuma função nomeada detectada
- [x] `updateRunUI()` — linhas 3904–3907 — if=3, return=1 — chama: sprintRequested
- [x] `clearMovementInputs()` — linhas 3908–3915 — if=1 — chama: updateRunUI
- [x] `canJump()` — linhas 3916–3916 — return=1 — chama: nenhuma função nomeada detectada
- [x] `requestJump()` — linhas 3917–3917 — if=2, return=1 — chama: canJump, doJump
- [x] `doJump()` — linhas 3918–3918 — if=1, return=1 — chama: beep, canJump, trackDaily, vibrate
- [x] `updatePlayer()` — linhas 3919–3953 — if=20, else=6, return=1 — chama: animatePlayer, beep, cameraRelativeVector, canJump, checkHazards, collectNearbyCrystals, constrainBoat, doJump, groundHeightAt, recoverPlayerIfInvalid, rememberSafePlayerPosition, resolveCollisions (+10)
- [x] `updateVehiclePhysics()` — linhas 3954–3967 — if=5, return=3 — chama: exitVehicle, sprintRequested, toast
- [x] `animatePlayer()` — linhas 3968–3992 — if=13, else=8, return=1 — chama: nenhuma função nomeada detectada
- [x] `checkHazards()` — linhas 3993–3995 — if=4, else=1, for=1 — chama: returnHome, toast
- [x] `collectNearbyCrystals()` — linhas 3996–3999 — if=2, for=1 — chama: collectCrystal
- [x] `npcSpeech()` — linhas 4000–4000 — if=1 — chama: toast

## `27-npc-enemies-combat-camera-action.js`

- [x] `nearestRideCompanion()` — linhas 4001–4003 — return=1 — chama: nenhuma função nomeada detectada
- [x] `nearestBoardableNpc()` — linhas 4004–4006 — return=1 — chama: nenhuma função nomeada detectada
- [x] `boardNpcPassenger()` — linhas 4007–4009 — if=3, return=3 — chama: saveState, toast
- [x] `releaseNpcPassenger()` — linhas 4010–4012 — if=3, return=1 — chama: groundHeightAt
- [x] `updateNpcSociety()` — linhas 4013–4022 — if=9, else=5, return=2 — chama: cloudHouseRecord, npcSpeech, saveState, updateHUD
- [x] `updateNPCs()` — linhas 4023–4055 — if=8, else=5, for=2 — chama: snapTrafficToRoad, trafficSpeedFactor
- [x] `updateEnemies()` — linhas 4056–4064 — if=5, for=1 — chama: beep, saveState, toast, vibrate
- [x] `meleeAttack()` — linhas 4065–4069 — if=1, return=1 — chama: beep, damageEnemy, toast
- [x] `damageEnemy()` — linhas 4070–4073 — if=2, return=1 — chama: addCoins, addXP, evaluateMissions, saveState, toast
- [x] `firePower()` — linhas 4074–4079 — if=3, return=3 — chama: beep, mat, toast, vehicleHorn, vibrate
- [x] `updateFireballs()` — linhas 4080–4083 — if=2, for=2 — chama: damageEnemy
- [x] `updateCamera()` — linhas 4084–4115 — if=6, else=1 — chama: playerScaleValue
- [x] `nearestInteractable()` — linhas 4116–4133 — if=14, for=1, return=12 — chama: boardNpcPassenger, isInteractionAvailable, nearestBoardableNpc, nearestRemotePlayer, openRemotePlayerActions, toast, updateTransitPanel, worldPos
- [x] `updateContext()` — linhas 4134–4137 — if=4, return=2 — chama: nearestInteractable
- [x] `doAction()` — linhas 4138–4149 — if=6, return=2 — chama: isInteractionAvailable, meleeAttack, nearestInteractable, syncMobilePanels, updateContext, worldPos
- [x] `updateNeeds()` — linhas 4150–4157 — if=3, return=1 — chama: playerDisplayName, saveState, sprintRequested, toast, updateHUD

## `28-multiplayer-social-online.js`

- [x] `multiplayerGameLabel()` — linhas 4158–4158 — return=1 — chama: nenhuma função nomeada detectada
- [x] `pendingChallenges()` — linhas 4159–4159 — return=1 — chama: nenhuma função nomeada detectada
- [x] `readyGameSessions()` — linhas 4160–4160 — return=1 — chama: nenhuma função nomeada detectada
- [x] `closeChallengePrompt()` — linhas 4161–4161 — if=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingChallengePrompt()` — linhas 4162–4162 — if=1, return=1 — chama: multiplayerGameLabel
- [x] `showReadySessionPrompt()` — linhas 4163–4164 — if=2, return=2 — chama: multiplayerGameLabel, sessionOpponentName
- [x] `socialActionLabel()` — linhas 4165–4165 — return=1 — chama: nenhuma função nomeada detectada
- [x] `socialRequestPending()` — linhas 4166–4166 — return=1 — chama: nenhuma função nomeada detectada
- [x] `showIncomingSocialRequest()` — linhas 4167–4177 — if=6, return=7 — chama: saveState, socialActionLabel, toast
- [x] `applyAcceptedSocialAction()` — linhas 4178–4195 — if=15, else=9, return=3 — chama: closeChallengePrompt, closeModal, enterBoatAsPassenger, enterVehicleAsPassenger, escapeHtml, multiplayerGameLabel, openModal, openNearestCampfire, saveState, sessionOpponentName, startFishing, startHunting (+3)
- [x] `updateOnlineAttention()` — linhas 4196–4196 — if=2 — chama: pendingChallenges, readyGameSessions, socialRequestPending
- [x] `challengeInboxHtml()` — linhas 4197–4197 — return=1 — chama: escapeHtml, multiplayerGameLabel, pendingChallenges
- [x] `socialRequestInboxHtml()` — linhas 4198–4198 — return=1 — chama: escapeHtml, socialActionLabel, socialRequestPending
- [x] `completedGameSessions()` — linhas 4199–4199 — return=1 — chama: nenhuma função nomeada detectada
- [x] `rememberMatchResult()` — linhas 4200–4200 — if=2, return=3 — chama: sessionOpponentName
- [x] `duelHistoryHtml()` — linhas 4201–4201 — return=2 — chama: completedGameSessions, escapeHtml, multiplayerGameLabel, sessionOpponentName
- [x] `activeSessionsHtml()` — linhas 4202–4202 — return=2 — chama: escapeHtml, multiplayerGameLabel, readyGameSessions
- [x] `bindChallengeCards()` — linhas 4203–4205 — if=5, else=1, return=3 — chama: closeChallengePrompt, multiplayerGameLabel, refreshOpenSocialHub, toast, updateOnlineAttention
- [x] `highestUnlockedLevel()` — linhas 4206–4206 — if=1, for=1, return=1 — chama: subjectUnlocked
- [x] `openChallengePicker()` — linhas 4207–4207 — if=1, else=1 — chama: closeModal, highestUnlockedLevel, openModal, toast
- [x] `sessionOpponentName()` — linhas 4208–4208 — return=1 — chama: nenhuma função nomeada detectada
- [x] `startMultiplayerEducationGame()` — linhas 4209–4209 — if=2, return=2 — chama: closeChallengePrompt, escapeHtml, openModal, runEducationGame, saveState, sessionOpponentName, toast
- [x] `maybeShowMultiplayerResult()` — linhas 4210–4210 — if=4, return=3 — chama: addCoins, addXP, escapeHtml, openModal, rememberMatchResult, saveState
- [x] `multiplayerStatusText()` — linhas 4211–4211 — if=2, return=3 — chama: nenhuma função nomeada detectada
- [x] `updateMultiplayerBadge()` — linhas 4212–4212 — if=2, return=1 — chama: nenhuma função nomeada detectada
- [x] `onlinePlayers()` — linhas 4213–4213 — return=2 — chama: nenhuma função nomeada detectada
- [x] `onlinePlayerListHtml()` — linhas 4214–4214 — return=1 — chama: escapeHtml, onlinePlayers
- [x] `bindOnlinePlayerCards()` — linhas 4215–4215 — if=1 — chama: openRemotePlayerActions
- [x] `refreshOpenSocialHub()` — linhas 4216–4216 — if=9, return=1 — chama: activeSessionsHtml, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, multiplayerStatusText, onlinePlayerListHtml, onlinePlayers, socialRequestInboxHtml, updateOnlineAttention
- [x] `openSocialHub()` — linhas 4217–4224 — if=2, return=1 — chama: activeSessionsHtml, bindChallengeCards, bindOnlinePlayerCards, challengeInboxHtml, chatMessageHtml, duelHistoryHtml, multiplayerStatusText, onlinePlayerListHtml, onlinePlayers, openModal, pendingChallenges, refreshOpenSocialHub (+4)
- [x] `escapeHtml()` — linhas 4225–4225 — return=1 — chama: nenhuma função nomeada detectada
- [x] `chatMessageHtml()` — linhas 4226–4226 — return=1 — chama: escapeHtml
- [x] `openRemotePlayerActions()` — linhas 4227–4239 — if=11, else=4, return=4 — chama: addCoins, closeModal, isNearFishingArea, nearestActiveCampfire, openChallengePicker, openModal, openSocialHub, saveState, toast, triggerEmote
- [x] `nearestRemotePlayer()` — linhas 4240–4240 — if=1, for=1, return=1 — chama: nenhuma função nomeada detectada
- [x] `openMultiplayerConfig()` — linhas 4241–4241 — sem fluxo contado — chama: openSocialHub
- [x] `applyCloudWorldObjects()` — linhas 4242–4248 — if=8, for=6, return=1 — chama: spawnCampfire, spawnHouseExtension
- [x] `remotePlayerEvent()` — linhas 4249–4279 — if=41, else=12, for=1, while=1, return=7 — chama: applyAcceptedSocialAction, applyCloudWorldObjects, closeChallengePrompt, createGhost, exitBoat, exitVehicle, hasValidPlayerName, maybeShowMultiplayerResult, mergeCloudProgress, multiplayerGameLabel, reconcileCloudHouses, refreshOpenSocialHub (+10)
- [x] `initLocalMultiplayer()` — linhas 4280–4283 — if=5, return=2 — chama: hasValidPlayerName, remotePlayerEvent, updateMultiplayerBadge
- [x] `multiplayerNameTexture()` — linhas 4284–4284 — if=1, else=1, return=1 — chama: sanitizePlayerName
- [x] `updateLocalPlayerNameLabel()` — linhas 4285–4285 — if=2, return=2 — chama: multiplayerNameTexture, playerDisplayName
- [x] `updateGhostName()` — linhas 4286–4286 — if=2, return=1 — chama: multiplayerNameTexture, sanitizePlayerName
- [x] `createGhost()` — linhas 4287–4292 — for=1, return=1 — chama: box, cylinder, multiplayerNameTexture, sanitizePlayerName
- [x] `updateMultiplayer()` — linhas 4293–4304 — if=4, for=1 — chama: nenhuma função nomeada detectada

## `29-game-loop-controls-gamepad.js`

- [x] `gameLoop()` — linhas 4305–4335 — if=15, return=1 — chama: auditPlayerMode, captureTrafficPositions, pollGamepad, qualityTier, refreshTechnicalPanel, resolveTrafficOverlaps, samplePerformance, updateAdventure, updateBuildPreview, updateCamera, updateCareerMissions, updateClouds (+18)
- [x] `setupControls()` — linhas 4336–4357 — if=21, else=2, return=5 — chama: closeModal, doAction, endBuildMode, firePower, openPauseMenu, requestJump, rotateBuildPreview, saveState, setScaleMode, spinPlayer, toast, toggleCrouch (+1)
- [x] `pollGamepad()` — linhas 4358–4377 — if=14, else=2, return=4 — chama: accountLinked, accountPromptWasHandled, applyAvatarCustomization, closeModal, doAction, equippedTool, evaluateMissions, firePower, gameLoop, hasValidPlayerName, initThree, openAccountCenter (+16)

## `30-pause-tests-public-api-bootstrap.js`

- [x] `stopGame()` — linhas 4378–4383 — if=10 — chama: endBuildMode, exitBoat, exitBusAtStop, exitVehicle, savePlayerPosition, showScreen, stopEngineSound, updateLobbyStats, updateSafetyPanel
- [x] `openPauseMenu()` — linhas 4384–4395 — if=4, return=1 — chama: closeModal, endBuildMode, openLifePanel, openModal, returnHome, startEngineSound, stopEngineSound, stopGame
- [x] `updateBridgeVisual()` — linhas 4396–4398 — sem fluxo contado — chama: nenhuma função nomeada detectada
- [x] `prepareVehicleTestArea()` — linhas 4399–4411 — if=2, return=1 — chama: clearMovementInputs, enterVehicle, exitVehicle, groundHeightAt
- [x] `stepVehicleSimulation()` — linhas 4412–4557 — if=9, for=5, return=35 — chama: activateFireIncident, applyAdaptiveRenderSettings, auditPlayerMode, beginBuildMode, buildRoutePoints, busAtStop, cameraRelativeVector, closeModal, completeActiveJob, constrainBoat, currentVehicleRef, detectStableAutoTier (+58)
