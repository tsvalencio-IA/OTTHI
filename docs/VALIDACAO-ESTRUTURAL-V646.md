# Validação estrutural automática — V646

- Resultado: **APROVADO**
- Verificações: **198 aprovadas / 0 falhas**

## Verificações

- [x] Arquivo obrigatório index.html
- [x] Arquivo obrigatório app.js
- [x] Arquivo obrigatório style.css
- [x] Arquivo obrigatório sw.js
- [x] Arquivo obrigatório manifest.webmanifest
- [x] Arquivo obrigatório release-manifest.json
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
- [x] Arquivo obrigatório tools/test_v646_release.py
- [x] Arquivo obrigatório .github/workflows/build-modular-app.yml
- [x] Arquivo obrigatório .github/workflows/gerar-apk.yml
- [x] Arquivo obrigatório android-app/app/build.gradle
- [x] Arquivo obrigatório assets/textures/water-ripples-v643.png
- [x] Arquivo obrigatório src/modules/31-neighborhood-world-controller.js
- [x] Arquivo obrigatório src/styles/13-neighborhood-world-map-v644.css
- [x] Arquivo obrigatório src/styles/14-commercial-responsive-map-missions-furniture.css
- [x] Arquivo obrigatório tools/test_v6462_commercial_polish.py
- [x] Arquivo obrigatório src/modules/32-cooperative-missions.js
- [x] Arquivo obrigatório src/styles/15-coop-map-responsive-v6463.css
- [x] Arquivo obrigatório tools/test_v6463_coop_responsive.py
- [x] JSON src/module-order.json
- [x] JSON VERSION.json
- [x] JSON manifest.webmanifest
- [x] JSON firebase-database.rules.json
- [x] JSON release-manifest.json
- [x] 33 módulos JavaScript — 33
- [x] 16 módulos CSS — 16
- [x] Manifesto JS completo
- [x] Manifesto CSS completo
- [x] Ordem JS corresponde aos arquivos
- [x] Ordem CSS corresponde aos arquivos
- [x] Versões centrais unificadas
- [x] Sintaxe app.js
- [x] Sintaxe sw.js
- [x] Sintaxe src\modules\00-runtime-foundation.js
- [x] Sintaxe src\modules\01-build-persistence.js
- [x] Sintaxe src\modules\02-state-save-cloud-account.js
- [x] Sintaxe src\modules\03-ui-modal-install-pwa.js
- [x] Sintaxe src\modules\04-education-daily-quiz.js
- [x] Sintaxe src\modules\05-avatar-life-customization.js
- [x] Sintaxe src\modules\06-missions-profile-hud-inventory-tools.js
- [x] Sintaxe src\modules\07-navigation-traffic-routes.js
- [x] Sintaxe src\modules\08-map-parent-settings.js
- [x] Sintaxe src\modules\09-responsive-ar-quality-diagnostics.js
- [x] Sintaxe src\modules\10-player-skills.js
- [x] Sintaxe src\modules\11-render-materials-player-model.js
- [x] Sintaxe src\modules\12-world-resources-nature.js
- [x] Sintaxe src\modules\13-houses-npcs-vehicles-base.js
- [x] Sintaxe src\modules\14-world-district-decoration.js
- [x] Sintaxe src\modules\15-transit-bus-metro.js
- [x] Sintaxe src\modules\16-emergency-services.js
- [x] Sintaxe src\modules\17-adventures-learning-world.js
- [x] Sintaxe src\modules\18-water-fishing-boats.js
- [x] Sintaxe src\modules\19-campfire-hunting-house-extensions.js
- [x] Sintaxe src\modules\20-world-build-cloud-houses.js
- [x] Sintaxe src\modules\21-interactions-shop-social-races.js
- [x] Sintaxe src\modules\22-careers-jobs-uniforms.js
- [x] Sintaxe src\modules\23-vehicle-effects-driving.js
- [x] Sintaxe src\modules\24-construction-system.js
- [x] Sintaxe src\modules\25-render-init-resize-position-collision.js
- [x] Sintaxe src\modules\26-input-player-physics.js
- [x] Sintaxe src\modules\27-npc-enemies-combat-camera-action.js
- [x] Sintaxe src\modules\28-multiplayer-social-online.js
- [x] Sintaxe src\modules\29-game-loop-controls-gamepad.js
- [x] Sintaxe src\modules\30-pause-tests-public-api-bootstrap.js
- [x] Sintaxe src\modules\31-neighborhood-world-controller.js
- [x] Sintaxe src\modules\32-cooperative-missions.js
- [x] Sintaxe assets\js\core\performance-guardian.js
- [x] Sintaxe assets\js\core\runtime-config.js
- [x] Sintaxe assets\js\core\safe-pointer.js
- [x] Sintaxe assets\js\core\viewport-manager.js
- [x] Sintaxe assets\js\education\adaptive-learning.js
- [x] Sintaxe assets\js\game-account.js
- [x] Sintaxe assets\js\multiplayer\room-manager.js
- [x] Sintaxe assets\js\multiplayer-rtdb.js
- [x] Sintaxe assets\js\safety\child-safety.js
- [x] Sintaxe assets\js\save-db.js
- [x] Sintaxe assets\js\ui\shared-modal.js
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
      "name": "Pesca viva criada na expans�o do lago",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Textura de �gua PNG v�lida",
      "passed": true,
      "detail": "(512, 512)"
    },
    {
      "name": "Textura de �gua usada no material",
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
      "name": "Tr�nsito: trafficPriority",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Tr�nsito: trafficSpeedFactor",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Tr�nsito: captureTrafficPositions",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Tr�nsito: resolveTrafficOverlaps",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Tr�nsito: trafficHoldUntil",
      "passed": true,
      "detail": ""
    },
    {
      "name": "�nibus: busSpawnIndex",
      "passed": true,
      "detail": ""
    },
    {
      "name": "�nibus: buildBusRoadPath",
      "passed": true,
      "detail": ""
    },
    {
      "name": "�nibus: recoverBusRoute",
      "passed": true,
      "detail": ""
    },
    {
      "name": "�nibus: validateBusCoverage",
      "passed": true,
      "detail": ""
    },
    {
      "name": "�nibus: laneOffset",
      "passed": true,
      "detail": ""
    },
    {
      "name": "Servi�os de emerg�ncia respeitam reten��o",
      "passed": true,
      "detail": "3"
    },
    {
      "name": "NPCs/ve�culos respeitam reten��o",
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
- [x] Testes de bairros e mapa — {
  "version": 646,
  "passed": true,
  "counts": {
    "passed": 87,
    "failed": 0,
    "total": 87
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
      "name": "Cinco bairros �nicos",
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
      "name": "Entradas f�sicas dos bairros",
      "passed": true,
      "detail": "5"
    },
    {
      "name": "Limites cartogr�ficos dos bairros",
      "passed": true,
      "detail": "5"
    },
    {
      "name": "Cinco geometrias interpretadas",
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
      "detail": "{'id': 'bairro-montanha', 'name': 'Bairro da Mont
- [x] Harness real de slots e Service Worker V646 — V646 runtime: slots reais, fallback 503, instalação incompleta e revisão coerente aprovados.
- [x] Testes de segurança e release V646 — test_build_and_ci_do_not_publish_partial_outputs (__main__.ReleaseV646Tests.test_build_and_ci_do_not_publish_partial_outputs) ... ok
test_child_safety_is_backend_enforced (__main__.ReleaseV646Tests.test_child_safety_is_backend_enforced) ... ok
test_legacy_house_lock_migrates_to_canonical_schema (__main__.ReleaseV646Tests.test_legacy_house_lock_migrates_to_canonical_schema) ... ok
test_loading_failure_preserves_save (__main__.ReleaseV646Tests.test_loading_failure_preserves_save) ... ok
test_online_interactions_are_open_and_parent_audit_exists (__main__.ReleaseV646Tests.test_online_interactions_are_open_and_parent_audit_exists) ... ok
test_parent_and_moderation_ui_are_present (__main__.ReleaseV646Tests.test_parent_and_moderation_ui_are_present) ... ok
test_presence_sessions_and_rotation_are_fail_closed (__main__.ReleaseV646Tests.test_presence_sessions_and_rotation_are_fail_closed) ... ok
test_production_runtime_harness (__main__.ReleaseV646Tests.test_production_runtime_harness) ... ok
test_release_manifest_hashes_match (__main__.ReleaseV646Tests.test_release_manifest_hashes_match) ... ok
test_room_contract_has_no_legacy_public_room (__main__.ReleaseV646Tests.test_room_contract_has_no_legacy_public_room) ... ok
test_save_migration_is_explicit (__main__.ReleaseV646Tests.test_save_migration_is_explicit) ... ok
test_service_worker_rejects_mixed_shell (__main__.ReleaseV646Tests.test_service_worker_rejects_mixed_shell) ... ok
test_slot_reservation_contract_is_atomic_and_recoverable (__main__.ReleaseV646Tests.test_slot_reservation_contract_is_atomic_and_recoverable) ... ok
test_version_surfaces_are_unified (__main__.ReleaseV646Tests.test_version_surfaces_are_unified) ... ok
test_world_retry_and_privacy_fail_closed (__main__.ReleaseV646Tests.test_world_retry_and_privacy_fail_closed) ... ok

----------------------------------------------------------------------
Ran 15 tests in 0.248s

OK
- [x] Serviços profissionais preservados — test_accidents_stop_and_require_all_services (__main__.ProfessionalEmergencyServicesTests.test_accidents_stop_and_require_all_services) ... ok
test_buses_and_traffic_have_collision_protection (__main__.ProfessionalEmergencyServicesTests.test_buses_and_traffic_have_collision_protection) ... ok
test_missions_require_correct_vehicle (__main__.ProfessionalEmergencyServicesTests.test_missions_require_correct_vehicle) ... ok
test_service_jobs_and_visual_uniforms_exist (__main__.ProfessionalEmergencyServicesTests.test_service_jobs_and_visual_uniforms_exist) ... ok
test_service_vehicle_visuals_are_local_and_multiplayer_safe (__main__.ProfessionalEmergencyServicesTests.test_service_vehicle_visuals_are_local_and_multiplayer_safe) ... ok
test_service_vehicles_are_distinct_enterable_and_reserved (__main__.ProfessionalEmergencyServicesTests.test_service_vehicles_are_distinct_enterable_and_reserved) ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.015s

OK
- [x] Mapa, missões, móveis e roupas preservados — test_assigned_service_vehicle_is_real_map_target (__main__.CommercialPolishTests.test_assigned_service_vehicle_is_real_map_target) ... ok
test_map_is_dynamic_square_and_viewport_fitted (__main__.CommercialPolishTests.test_map_is_dynamic_square_and_viewport_fitted) ... ok
test_mission_card_opens_one_clear_briefing (__main__.CommercialPolishTests.test_mission_card_opens_one_clear_briefing) ... ok
test_new_style_is_last_and_build_outputs_match (__main__.CommercialPolishTests.test_new_style_is_last_and_build_outputs_match) ... ok
test_room_furniture_is_persistent_and_editable (__main__.CommercialPolishTests.test_room_furniture_is_persistent_and_editable) ... ok
test_uniforms_follow_animated_limbs (__main__.CommercialPolishTests.test_uniforms_follow_animated_limbs) ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.021s

OK
- [x] Missões cooperativas e responsividade V646.3 — test_all_requested_cooperative_missions_exist (__main__.CoopResponsiveTests.test_all_requested_cooperative_missions_exist) ... ok
test_map_is_clustered_and_responsive_in_both_orientations (__main__.CoopResponsiveTests.test_map_is_clustered_and_responsive_in_both_orientations) ... ok
test_roles_and_shared_progress_are_online (__main__.CoopResponsiveTests.test_roles_and_shared_progress_are_online) ... ok
test_school_fishing_and_race_runtime_contracts (__main__.CoopResponsiveTests.test_school_fishing_and_race_runtime_contracts) ... ok
test_state_persists_and_existing_systems_integrate (__main__.CoopResponsiveTests.test_state_persists_and_existing_systems_integrate) ... ok
test_uniform_and_build_order_are_complete (__main__.CoopResponsiveTests.test_uniform_and_build_order_are_complete) ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.022s

OK
- [x] IDs HTML únicos — []
- [x] Referências locais existem — []
- [x] Versão 646 no index — 16
- [x] Build V646 no HTML
- [x] Revisão imutável no HTML — bdc719d3897953e0
- [x] Three.js local e versionado
- [x] Funções preservadas e ampliadas — 686
- [x] Runtime V646
- [x] Save V646 migra V645
- [x] Token preservado mobilityThrottleIntent
- [x] Token preservado Acelerar
- [x] Token preservado Freio
- [x] Token preservado createShoreFishingLife
- [x] Token preservado trafficPriority
- [x] Token preservado busSpawnIndex
- [x] Token preservado miniMapLogicalSize
- [x] Token preservado miniMapScale
- [x] Token preservado clearRemoteRoomEntities
- [x] Token preservado applyRoomWorld
- [x] Token preservado mapRegionsMarkup
- [x] Token preservado approvedChatPhrases
- [x] Token preservado openReportPlayer
- [x] Token preservado updatePlayUsage
- [x] Token preservado OTTHI_RELEASE_COHERENT
- [x] Token preservado COOP_MISSION_TEMPLATES
- [x] Token preservado createCooperativeMissionWorld
- [x] Chaves CSS balanceadas — 2085/2085
- [x] Canvas ocupa 100%
- [x] Mapa principal escala 1:1
- [x] Cinco bairros com 10 vagas — 5
- [x] Segurança infantil padrão
- [x] Sala padrão correta
- [x] Manifesto PWA V646
- [x] Regras Firebase contêm bairro-central
- [x] Regras Firebase contêm bairro-floresta
- [x] Regras Firebase contêm bairro-lago
- [x] Regras Firebase contêm bairro-montanha
- [x] Regras Firebase contêm bairro-escola
- [x] Regras Firebase contêm slot-01
- [x] Regras Firebase contêm slot-10
- [x] Regras Firebase contêm guardianSettings
- [x] Regras Firebase contêm reports
- [x] Regras Firebase contêm blocks
- [x] Regras contêm frases aprovadas
- [x] Perfis não são públicos
- [x] Service Worker V646
- [x] Cache PWA validado por SHA-256
- [x] Fallback HTTP usa cache válido
- [x] Manifesto de release V646
- [x] Revisão coerente HTML/SW/manifesto
- [x] Hashes da release conferem — []
- [x] Hash-fonte src/modules/00-runtime-foundation.js — fbc4c4dcad628ba44fa3ca05668a0ffbecce1d9c20a6afc2405be4307425f89b
- [x] Hash-fonte src/modules/01-build-persistence.js — 4bfd48a6d3e2ae22d2e3226e588733eb1f09cea77bb9cdef5c5516e68510cfe7
- [x] Hash-fonte src/modules/02-state-save-cloud-account.js — da0a3856d23136e962e623d43c04cf3ef4e166f04b00b672eed69c4e1f8ee27d
- [x] Hash-fonte src/modules/03-ui-modal-install-pwa.js — d49232561be91aabe54e17ae6d1e18c9699c67ee5cf1848e731cbd811b8950ff
- [x] Hash-fonte src/modules/04-education-daily-quiz.js — 28bfae12189a8bfd6118d93fdeb881fff8c23a4fc4bccd32bfa8dd9cebd2baba
- [x] Hash-fonte src/modules/05-avatar-life-customization.js — 567d66e8535f1f5195f6c0b60984dff2934d70f2f643c12412bbad10e8e0acb9
- [x] Hash-fonte src/modules/06-missions-profile-hud-inventory-tools.js — 178d197114587ed9c603698409a36cd437f1b95ecd2a9e7b126d80f9c77c313b
- [x] Hash-fonte src/modules/07-navigation-traffic-routes.js — 2d042aa04eb6877c0ae464e09a866b3566a0814283cb0d4d481ce31c2a320ecc
- [x] Hash-fonte src/modules/08-map-parent-settings.js — f0c69a7ef66cebbb77b19f1d1d8e09a6f362776f70036aab0f15442d0c906a3b
- [x] Hash-fonte src/modules/09-responsive-ar-quality-diagnostics.js — 0ae733f48a4f75e09f4c64ffbd145f8525105cca3672399816556909eba1532a
- [x] Hash-fonte src/modules/10-player-skills.js — aea3d85401c518ddf4cbfefffe2e0ad720ae4faf46d27310a886b4d966674715
- [x] Hash-fonte src/modules/11-render-materials-player-model.js — 743e4bf46db2d49b5757d08466e470424f5c0f81d238b464309f2dcf56a45232
- [x] Hash-fonte src/modules/12-world-resources-nature.js — 51497c2edc37494f880fec25df5e5b9fc685f45992210f844ebd5efa9cbeb5d2
- [x] Hash-fonte src/modules/13-houses-npcs-vehicles-base.js — 3b53de4b0fa3d9a75d0a2f7a768c98ccb837c004c8956e4403fdb92b03ede954
- [x] Hash-fonte src/modules/14-world-district-decoration.js — 9c7b09925c8c83725bd0a8623dab7e9308b44c2157dbe9fd4eaa1bbb01907e19
- [x] Hash-fonte src/modules/15-transit-bus-metro.js — a275b556563cdd0b64b1f65924b8f2ba758e1f112cca7007d2643c97a460e4a3
- [x] Hash-fonte src/modules/16-emergency-services.js — e9a85a985db197fb3847f000ac7e0fa9fb9de0e15036f30a0504e84cdfb9213b
- [x] Hash-fonte src/modules/17-adventures-learning-world.js — 735b30a5f026eb52467df35c61c3d5e4af5c73d7bdc879581d1070c18d07a201
- [x] Hash-fonte src/modules/18-water-fishing-boats.js — 4c9c1581d29146594327bfbc15acb7643bd715f85c1a35f32dc1032a86e19afb
- [x] Hash-fonte src/modules/19-campfire-hunting-house-extensions.js — 7f86c48ac958e4ffdb72934f252616af915f3fa1c8a0c42fabd5acd3ecbbfca3
- [x] Hash-fonte src/modules/20-world-build-cloud-houses.js — 712fcc110bd8927592ba637c22f8c81b4ab42f6ba5d1d1863f5e2ad3978e21b9
- [x] Hash-fonte src/modules/21-interactions-shop-social-races.js — 8350f48f0306b34a20fa2a13eec7e48e88724dd06524117896d97dfe64176b8e
- [x] Hash-fonte src/modules/22-careers-jobs-uniforms.js — 5b8ccea7fe11dfd5bb6c050c6706dbecea3e5f8bf36ec666cf4baa6a7bf0e169
- [x] Hash-fonte src/modules/23-vehicle-effects-driving.js — 443fd48443692b0fe44b8e5b67b9e6aba094cd829c031bf59ee857fb9d820a01
- [x] Hash-fonte src/modules/24-construction-system.js — ecbecef3564a5d94f76ffd3d537aa25ad451c20514d64d05f6dca5519768ab48
- [x] Hash-fonte src/modules/25-render-init-resize-position-collision.js — 530244db62e871e89f980499a3898a09034eac47ab606ad03877f1ee28542c12
- [x] Hash-fonte src/modules/26-input-player-physics.js — 9ac178393a9f2f438bc629e0b980681ee21e4c98adbd6ba476ffc3e9649bc5f7
- [x] Hash-fonte src/modules/27-npc-enemies-combat-camera-action.js — e93543bd683176e6db4f61bb1e30723964b945757c79df0d22b2099f51547f58
- [x] Hash-fonte src/modules/28-multiplayer-social-online.js — 7ff00c575b422c06475c61714b203b37c73bcc14bb53113929861eb7b13f8296
- [x] Hash-fonte src/modules/29-game-loop-controls-gamepad.js — 9a0d36e129acbaa2afa4e9ff78d6d5601b76beefd6290cc199f385b81ea6d035
- [x] Hash-fonte src/modules/30-pause-tests-public-api-bootstrap.js — 8539dc76be417801be7672f65d3fe20108b13c402059ad777197920e5c604802
- [x] Hash-fonte src/modules/31-neighborhood-world-controller.js — c077d7777f196bc9dc03bc62dd3f73c9c15e8f8b5222cff0b94c926d78058ba7
- [x] Hash-fonte src/modules/32-cooperative-missions.js — fa20a73a5bd43545d754bcaddd039a10e4f5bb8eb8d8af8c84079379b0f9c95e
- [x] Hash-fonte src/styles/00-foundation-lobby-game-modal.css — ff7d8c3bf3169c75f4299c794fa9e874665a16a220ee1c4e6dbba19ee41759b8
- [x] Hash-fonte src/styles/01-legacy-v607-v613.css — 4bcd18c1b61afa8822aca9c4ba3e7a5d77165544d4bd49faa06ba3650d35815e
- [x] Hash-fonte src/styles/02-art-direction-v614-v617.css — c0f3710d71a87fb0d9f4b9e9cb0c9bac130a7522eb76bfa3a65634616236d666
- [x] Hash-fonte src/styles/03-responsive-social-v618-v623.css — 9bcad1abea60e6fbfa8aae53b4fcb579bc86b2c03f4d49ed65115f2c5c6bc10c
- [x] Hash-fonte src/styles/04-map-v624-v627.css — aa03c40f2feb1022e26a87f8f796a1dba7c94d3d9b63569aaec9edf6b5fa94bb
- [x] Hash-fonte src/styles/05-world-ui-v628-v631.css — d86fd4ed14be0a50f354aab3abc7b95673aeeab32faae3cba9f3f4dde1dd814b
- [x] Hash-fonte src/styles/06-install-build-v633-v636.css — fc9ec2784b052bfe5cae58cf29409a65e1d653c9b5c222156299648a580417b0
- [x] Hash-fonte src/styles/07-display-fishing-v637.css — bbbdccf84a35f2dc43606dfdf2e8921433c646c88ee4ca081d6f5941709b7a4f
- [x] Hash-fonte src/styles/08-construction-v638.css — 862e2964d6181b5f75f1e49d64216ff335a2ebcba1e0596ead6400061431fd30
- [x] Hash-fonte src/styles/09-gameplay-layout-camera-v640.css — d16c924b27e60a067d022437b46154f635e678de6052662e22f28a5ec77c1b5c
- [x] Hash-fonte src/styles/10-foundation-rooms-learning-v641-v642.css — f71f620f0e2e25835cc7f196627e8f2bdc35680fe16356e32dde598b6484f0f7
- [x] Hash-fonte src/styles/11-mobility-traffic-fishing-v643.css — 387201cfc25ccbc5df444932ac206d7c3e285c321da48f72007cbc09db40051e
- [x] Hash-fonte src/styles/12-fullscreen-responsive-hotfix-v6431.css — 36407f245dfd26972ef43b1c92dcf1f91d4f66f945e2946c627a36bd80fac7fd
- [x] Hash-fonte src/styles/13-neighborhood-world-map-v644.css — b9b6f6d86986f46d2be48800eec8b34375a96d1305a5a4ee99f5799c0b7d3262
- [x] Hash-fonte src/styles/14-commercial-responsive-map-missions-furniture.css — 01dc21a785a5a037029c6ed631524dbb01ad520fc3e2ca93d114345386551835
- [x] Hash-fonte src/styles/15-coop-map-responsive-v6463.css — 4e81741e689020453cb0cdd6d0740184a9a7804d6e5d8b7f0226a9cf9b0a722b
- [x] app.js sincronizado com fontes
- [x] style.css sincronizado com fontes
- [x] Android V646

## Limites

- Não substitui teste físico de orientação instalada, multiplayer entre dois aparelhos, Firebase remoto, AR e APK.
- Os testes V646 validam contratos estáticos, cache atômico, bairros, controles e simulações locais.
