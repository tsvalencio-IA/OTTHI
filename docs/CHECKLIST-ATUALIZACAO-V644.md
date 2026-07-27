# Checklist de atualização — OTTHI V644

## Bairros e capacidade

- [x] Cinco bairros configurados.
- [x] Limite de 10 jogadores por bairro.
- [x] Contagem de ocupação em tempo real.
- [x] Reserva de vaga antes de abandonar o bairro atual.
- [x] Bloqueio de entrada quando atingir 10/10.
- [x] Alternativas com vagas exibidas quando uma sala estiver lotada.
- [x] Liberação da vaga no `onDisconnect()`.
- [x] Liberação da vaga ao trocar de bairro.
- [x] Retorno ao bairro anterior quando a nova conexão falhar.

## Transição real do mundo

- [x] Jogadores remotos do bairro anterior removidos.
- [x] Casas online anteriores removidas.
- [x] Barcos, fogueiras e ampliações compartilhadas recarregados pela sala.
- [x] Chat e convites da sala anterior limpos.
- [x] Pesca, construção, casa, veículo, barco e transporte encerrados com segurança antes da troca.
- [x] Personagem transportado para a entrada física do bairro escolhido.
- [x] Posição e bairro persistidos no save V644.
- [x] Rota e contexto recalculados após a troca.

## Casas e presença

- [x] Casas separadas por caminho de bairro no Firebase.
- [x] Casa salva com coordenadas X/Z.
- [x] Casas online exibidas no diretório do bairro.
- [x] Casas online exibidas no mapa e no minimapa.
- [x] Somente presenças da sala atual são renderizadas.

## Mapa fiel e responsivo

- [x] Mundo lógico de 232 × 232 unidades.
- [x] Mapa completo com proporção 1:1.
- [x] Mesma escala visual nos eixos X e Z.
- [x] Regiões dos cinco bairros projetadas pelas coordenadas reais.
- [x] Região atual destacada.
- [x] Casas online projetadas pelas coordenadas reais.
- [x] Mapa redimensionado automaticamente em retrato.
- [x] Mapa redimensionado automaticamente em paisagem.
- [x] Minimapa recalcula largura, altura e DPR pela caixa real.
- [x] Minimapa usa uma única escala para X e Z.
- [x] Rota, estradas, casas e jogador mantêm coerência espacial.

## Responsividade geral preservada

- [x] Canvas 3D ocupa toda a área disponível.
- [x] Correção de DPR duplicado preservada.
- [x] Controles de paisagem separados do minimapa.
- [x] PWA permanece com orientação automática `any`.
- [x] Safe areas do aparelho preservadas.

## Sistemas preservados

- [x] Roupas e uniformes.
- [x] Skills.
- [x] Bombeiros.
- [x] Ambulâncias.
- [x] Polícia.
- [x] Veículos e barcos V643.
- [x] Ônibus e trânsito V643.
- [x] Pescaria e NPCs pescadores.
- [x] Construção, casas e interiores.
- [x] Missões e educação adaptativa.
- [x] Firebase, salvamento local, PWA e Android.

## Publicação manual obrigatória

- [ ] Enviar os arquivos extraídos preservando as pastas.
- [ ] Aguardar GitHub Actions e GitHub Pages terminarem.
- [ ] Publicar `firebase-database.rules.json` no Realtime Database.
- [ ] Fechar completamente a PWA instalada.
- [ ] Abrir com internet e confirmar a V644.
- [ ] Testar troca entre dois bairros em dois aparelhos.
- [ ] Testar sala lotada em ambiente controlado.
- [ ] Testar mapa em retrato e paisagem no aparelho físico.
