# Arquitetura modular — OTTHI World Edu V643

## Regra de fonte

`src/modules/` e `src/styles/` são a fonte oficial. `tools/build_project.py` concatena os módulos na ordem de `src/module-order.json`, gerando `app.js` e `style.css` para GitHub Pages.

A concatenação mantém um único escopo fechado, necessário porque o motor atual possui centenas de referências internas compartilhadas. Assim, a fonte fica separada por domínio sem quebrar a execução existente.

## Áreas alteradas na V643

- `07-navigation-traffic-routes.js`: prioridade, previsão e separação do trânsito;
- `11-render-materials-player-model.js`: textura de água V643;
- `14-world-district-decoration.js`: quantidade, velocidade e faixa das linhas de ônibus;
- `15-transit-bus-metro.js`: spawn livre, faixa e recuperação das rotas;
- `16-emergency-services.js`: viaturas respeitam retenção de conflito;
- `18-water-fishing-boats.js`: física do barco e pescadores de margem;
- `19-campfire-hunting-house-extensions.js`: margem do lago e criação da pesca viva;
- `23-vehicle-effects-driving.js`: interface Acelerar/Freio-Ré e buzina;
- `26-input-player-physics.js`: física e direção do carro;
- `27-npc-enemies-combat-camera-action.js`: NPC pescador e ações de mobilidade;
- `29-game-loop-controls-gamepad.js`: toque, teclado e gamepad;
- `30-pause-tests-public-api-bootstrap.js`: API técnica V643;
- `11-mobility-traffic-fishing-v643.css`: layout dos controles em retrato/paisagem.

## Build e validação

O workflow `.github/workflows/build-modular-app.yml` executa:

1. `tools/build_project.py`;
2. `tools/audit_source.py`;
3. `tools/deep_inventory.py`;
4. `tools/verify_equivalence.py`;
5. `tools/test_v643_mobility.js`;
6. `tools/validate_project.py`.

A V643 preserva as 544 funções-base e acrescenta oito funções nomeadas, totalizando 552.
