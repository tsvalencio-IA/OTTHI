# Arquitetura V642

A V642 preserva o motor legado em `app.js` para evitar perda de funções. As novas áreas são independentes:

- `assets/js/core/`: configuração, viewport, ponteiros e desempenho;
- `assets/js/education/`: aprendizado adaptativo;
- `assets/js/multiplayer/`: seleção de bairros e diretório de casas;
- `assets/js/safety/`: proteção inicial de nomes e mensagens;
- `assets/js/ui/`: modal compartilhado pelos módulos.

## Próxima modularização segura

1. mover renderização e materiais para `engine/render`;
2. mover veículos e física para `gameplay/vehicles`;
3. mover profissões para `gameplay/jobs`;
4. mover pesca e construção para módulos separados;
5. criar carregamento por setores do mapa;
6. substituir objetos repetidos por `THREE.InstancedMesh`;
7. criar testes automatizados por API pública.

Nenhuma etapa deve remover a camada legada antes de os testes de equivalência passarem.
