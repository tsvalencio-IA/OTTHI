# OTTHI World — Relatório de entrega V646.5

Data da entrega: 29/07/2026  
Base oficial auditada: `OTTHI-main (8).zip`  
SHA-256 da base: `4771711007608E3675441F99C7DD8F6AA70772250ED162CDF97BAA36004FF3C5`  
Build entregue: `646.5-multiplayer-missions-recovery`  
Revisão interna: `bdc719d3897953e0`

## Garantias de preservação

- O trabalho foi feito sobre a base oficial, sem reconstruir o jogo do zero.
- Nenhum arquivo da base foi removido.
- Login, Firebase, multiplayer, bairros, construções, veículos, progresso, PWA e sistemas anteriores foram preservados.
- Nenhuma publicação foi feita no GitHub.
- Nenhuma regra foi aplicada remotamente ao Firebase.
- Os arquivos gerados `app.js`, `style.css` e `release-manifest.json` foram reconstruídos a partir dos módulos da própria base.

## Correções de conectividade multiplayer

- Corrigida a falha de inicialização em `createRouteGuide` que interrompia o jogo antes da criação completa do mundo.
- Mantida a reserva atômica da sala como primeira tentativa.
- Adicionado fallback transacional por vaga quando a regra remota antiga recusa a transação do nó pai.
- Mantida a presença e a posição individual dos jogadores.
- A desconexão temporária deixa o participante recuperável e não destrói imediatamente seu progresso cooperativo.
- A retomada reaproveita o registro da missão e a vaga do participante.
- A missão pode continuar localmente em modo solo quando o parceiro cai.
- Eventos cooperativos são idempotentes e têm reserva de autoria para evitar contagem ou NPC duplicados.
- Convites sociais podem ser cancelados pelo remetente enquanto ainda estão pendentes.
- As regras locais corrigem a validação de `createdAt`, que antes invalidava respostas legítimas depois de dez segundos.

## Missões cooperativas entregues

### Bombeiros

- Funções separadas para motorista, operador da mangueira e apoio/resgate.
- Caminhão obrigatório, retirada da mangueira, quatro estágios visíveis de controle do incêndio e liberação da área.
- A intensidade visual de chamas e fumaça diminui progressivamente.
- A conclusão só ocorre depois do fogo controlado e do local liberado.

### Resgate

- Motorista da ambulância, socorrista e apoio de maca.
- Atendimento do NPC, carregamento cooperativo da maca, entrada do paciente e transporte ao ponto médico indicado.
- Fluxo sem conteúdo gráfico ou inadequado.

### Polícia Kids

- Uniformes, viatura, abordagem cooperativa, ação verbal “Você está preso” e acompanhamento do NPC.
- Sem armas, tiros, agressões ou violência.

### Pesca

- Pesca solo existente preservada.
- Contadores individual e coletivo.
- Meta compartilhada, entrega na fogueira e preparo dos peixes em grupo.

### Escola

- Convite voluntário de NPCs, acompanhamento até a escola e pontuação por aluno entregue.
- Reserva de eventos para impedir NPC duplicado.
- Recuperação de aluno preso ou perdido.
- Nenhum jogador online é controlado à força.

### Corridas

- Corrida de rua e pista oval.
- Voltas, checkpoints, posição, tempo e classificação.
- Bots com espaçamento e faixas determinísticas, desacelerando perto do jogador.
- Modos cooperativo por equipe e competitivo.

## Interface de missão, mapa e GPS

- Missão ativa mostra objetivo, funções, participantes, veículo necessário, localização do veículo, próximo destino e etapas concluídas/pendentes.
- Botões para marcar o próximo passo no GPS e cancelar a missão sem corromper o progresso.
- Marcadores individuais sincronizados para jogadores online.
- Marcadores próximos continuam agrupados e a missão ativa recebe prioridade visual.
- Ajustes adicionais para retrato, paisagem e aparelhos com pouca altura.
- Painel, mapa, rodapé e modais recalculam seu espaço sem empurrar botões para fora da tela.

## Visual e desempenho

- Materiais e texturas otimizados já existentes foram preservados e reutilizados nos novos elementos.
- Uniformes, serviços profissionais, pista oval e estados de missão continuam usando o sistema modular leve da base.
- Não foram adicionados modelos pesados nem dependências que prejudiquem celulares.

## Validações executadas

| Validação | Resultado |
|---|---:|
| Estrutura, módulos, assets e manifest | 198/198 |
| Contratos V646.5 de multiplayer e missões | 31/31 |
| Runtime JS, reserva de vagas e service worker | Aprovado |
| Release V646 | 15/15 |
| Serviços profissionais | 6/6 |
| Polimento comercial | 6/6 |
| Cooperativo e responsividade | 6/6 |
| Bairros e preservação | 87/87 |
| Sistemas de mundo | 34/34 |
| Mobilidade | 12/12 |
| Equivalência da arquitetura | 544 funções da base preservadas; 725 detectadas |

O testador F12 completo melhorou de 7/31 para 16/31 no ambiente local. Nele passaram carregamento da página e API, release, responsividade, conexão dos dois clientes, posição A↔B, chat seguro, interação direta, presente, missão cooperativa, desconexão/reconexão, troca de sala, PWA e ausência de exceções JavaScript. Uma repetição adaptada ao login também confirmou movimento, câmera, mapa, escala, salvamento, veículo e barco no cliente A antes de o testador ficar sobrecarregado por timeouts de CDP.

## Limites honestos da validação

- Não foi alegado teste físico em celular, pois nenhum aparelho foi controlado nesta execução.
- Os testes que escrevem convites, bloqueios, desafios e auditoria continuam dependendo da publicação das regras incluídas neste pacote.
- O Firebase remoto não foi alterado, respeitando o escopo. Portanto, resultados `PERMISSION_DENIED` nesses caminhos remotos não significam que o arquivo local de regras esteja ausente; significam que a versão corrigida ainda precisa ser aplicada manualmente pelo proprietário.

## Passo obrigatório antes de aprovar produção

1. Fazer backup das regras atuais do Firebase Realtime Database.
2. Comparar e aplicar manualmente o arquivo `firebase-database.rules.json` deste pacote no projeto correto.
3. Repetir o testador F12 com dois usuários reais.
4. Testar em pelo menos um celular Android em retrato e paisagem.
5. Somente depois publicar os arquivos do jogo no GitHub/hosting.

## Arquivos

A relação completa está em `docs/ARQUIVOS-ALTERADOS-V6465.txt`.
