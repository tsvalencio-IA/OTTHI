# Matriz completa de jogabilidades e testes — OTTHI World Edu V643

Esta matriz distingue duas coisas:

- `[x] Código preservado`: a função, estado ou fluxo existe na fonte modular e passou na equivalência estática com a V641.
- `[ ] Teste físico`: precisa ser executado no GitHub Pages, PWA ou APK em aparelho real antes de a experiência ser considerada aprovada.

## 1. Inicialização, conta e perfil

- [x] Código preservado — carregamento do lobby.
- [x] Código preservado — continuar progresso existente.
- [x] Código preservado — iniciar novo jogo.
- [x] Código preservado — cadastro de apelido do jogador.
- [x] Código preservado — abertura do centro de conta.
- [x] Código preservado — autenticação Firebase existente.
- [x] Código preservado — modo local quando conta não está conectada.
- [x] Código preservado — identificação segura por `playerId`.
- [x] Código preservado — migração dos saves V600–V641.
- [ ] Teste físico — primeiro acesso sem save.
- [ ] Teste físico — acesso com save antigo.
- [ ] Teste físico — login, logout e reconexão.
- [ ] Teste físico — conta conectada em dois aparelhos.
- [ ] Teste físico — apelido inválido, vazio, longo ou repetido.

## 2. Salvamento local, IndexedDB e nuvem

- [x] Código preservado — snapshot do estado.
- [x] Código preservado — gravação local.
- [x] Código preservado — banco IndexedDB auxiliar.
- [x] Código preservado — sincronização Firebase.
- [x] Código preservado — merge local/nuvem por versão e data.
- [x] Código preservado — salvamento periódico da posição.
- [x] Código preservado — salvamento em `pagehide`, `beforeunload` e ocultação.
- [x] Código preservado — proteção de construções por IDs e tombstones.
- [x] Código preservado — restauração de missão ativa.
- [x] Código preservado — restauração de veículos, barcos e propriedades.
- [ ] Teste físico — fechar à força e reabrir.
- [ ] Teste físico — perder internet durante gravação.
- [ ] Teste físico — voltar online e mesclar sem apagar progresso.
- [ ] Teste físico — save local mais novo que o remoto.
- [ ] Teste físico — save remoto mais novo que o local.
- [ ] Teste físico — dois aparelhos alterando o mesmo perfil.

## 3. Responsividade, retrato e paisagem

- [x] Código preservado — cálculo de viewport pelo `visualViewport` e documento.
- [x] Código preservado — classes automáticas de retrato/paisagem.
- [x] Código preservado — reorganização após `resize`.
- [x] Código preservado — reorganização após `orientationchange`.
- [x] Código preservado — atualização após voltar do segundo plano.
- [x] Código preservado — redefinição dos controles ao girar.
- [x] Código preservado — variáveis CSS dinâmicas de joystick, ações e skills.
- [x] Código preservado — altura máxima dos modais.
- [x] Código preservado — layout compacto e paisagem ultrabaixa.
- [ ] Teste físico — lobby 320×568.
- [ ] Teste físico — lobby 360×640.
- [ ] Teste físico — lobby 390×844.
- [ ] Teste físico — lobby 412×915.
- [ ] Teste físico — jogo 568×320.
- [ ] Teste físico — jogo 640×360.
- [ ] Teste físico — jogo 844×390.
- [ ] Teste físico — tablet retrato e paisagem.
- [ ] Teste físico — girar durante caminhada.
- [ ] Teste físico — girar durante direção.
- [ ] Teste físico — girar durante pescaria.
- [ ] Teste físico — girar durante construção.
- [ ] Teste físico — girar com modal aberto.

## 4. Desempenho e renderização 3D

- [x] Código preservado — seleção de qualidade.
- [x] Código preservado — DPR adaptativo.
- [x] Código preservado — sombras condicionais.
- [x] Código preservado — LOD e qualidade adaptativa.
- [x] Código preservado — pausas e frequências separadas para sistemas pesados.
- [x] Código preservado — tratamento de perda/restauração WebGL.
- [x] Código preservado — diagnóstico técnico público.
- [x] Código preservado — proporção dinâmica da câmera e canvas.
- [ ] Teste físico — FPS em celular básico sem auditor.
- [ ] Teste físico — FPS em celular intermediário sem auditor.
- [ ] Teste físico — draw calls, triângulos e memória.
- [ ] Teste físico — 10, 20 e 30 minutos de sessão.
- [ ] Teste físico — aquecimento e queda de FPS.
- [ ] Teste físico — perda e restauração de contexto WebGL.
- [ ] Teste físico — carregamento com internet lenta.
- [ ] Teste físico — comportamento quando Three.js externo não carrega.

## 5. Personagem, câmera e movimento

- [x] Código preservado — personagem GLB e fallback construído.
- [x] Código preservado — caminhada.
- [x] Código preservado — corrida/turbo.
- [x] Código preservado — pulo e buffer de pulo.
- [x] Código preservado — gravidade e aterrissagem.
- [x] Código preservado — colisões.
- [x] Código preservado — recuperação de posição impossível.
- [x] Código preservado — câmera orbital por arrasto.
- [x] Código preservado — zoom por controles e roda.
- [x] Código preservado — câmera interna de casas.
- [x] Código preservado — câmera de veículo e barco.
- [x] Código preservado — proteção de `setPointerCapture`.
- [x] Código preservado — joystick virtual.
- [x] Código preservado — teclado.
- [x] Código preservado — gamepad.
- [ ] Teste físico — caminhar em todas as direções.
- [ ] Teste físico — correr sem travar animação anterior.
- [ ] Teste físico — pular próximo a objetos e plataformas.
- [ ] Teste físico — câmera 360° sem inverter.
- [ ] Teste físico — zoom mínimo/máximo.
- [ ] Teste físico — joystick multitouch com botões de ação.
- [ ] Teste físico — retorno seguro após cair ou atravessar objeto.

## 6. Roupas, visual, uniformes e skills

- [x] Código preservado — estúdio de personagem.
- [x] Código preservado — roupas.
- [x] Código preservado — acessórios.
- [x] Código preservado — cores e aparência.
- [x] Código preservado — uniforme policial.
- [x] Código preservado — uniforme de bombeiro.
- [x] Código preservado — uniforme de entrega/professor e carreiras.
- [x] Código preservado — restauração da roupa anterior.
- [x] Código preservado — skill Mini.
- [x] Código preservado — skill Normal.
- [x] Código preservado — skill Grande.
- [x] Código preservado — Abaixar.
- [x] Código preservado — Girar.
- [x] Código preservado — bloqueios incompatíveis durante veículo.
- [ ] Teste físico — cada roupa e acessório no modelo.
- [ ] Teste físico — trocar visual e reabrir o jogo.
- [ ] Teste físico — aceitar missão e vestir uniforme correto.
- [ ] Teste físico — concluir/cancelar missão e restaurar visual.
- [ ] Teste físico — cada skill a pé, dentro de casa e perto de colisores.

## 7. Mundo, mapa e navegação

- [x] Código preservado — terreno e plataformas.
- [x] Código preservado — ruas, pontes, água, árvores, pedras e recursos.
- [x] Código preservado — cidade, praça e distritos.
- [x] Código preservado — mapa.
- [x] Código preservado — minimapa.
- [x] Código preservado — GPS e waypoint.
- [x] Código preservado — rotas viárias.
- [x] Código preservado — marcadores de objetivos.
- [x] Código preservado — casas online por bairro.
- [ ] Teste físico — mapa sem sobrepor HUD.
- [ ] Teste físico — waypoint até todos os distritos.
- [ ] Teste físico — ponte antes/depois do reparo.
- [ ] Teste físico — colisões em limites do mapa.
- [ ] Teste físico — nomes das casas no bairro correto.

## 8. Casas, interiores e propriedades

- [x] Código preservado — casas próprias e públicas.
- [x] Código preservado — compra/conquista de casa.
- [x] Código preservado — abrir/fechar porta.
- [x] Código preservado — entrar/sair.
- [x] Código preservado — câmera interna.
- [x] Código preservado — cama, sofá, televisão e banho.
- [x] Código preservado — cozinha, geladeira e pia.
- [x] Código preservado — baú.
- [x] Código preservado — guarda-roupa.
- [x] Código preservado — ampliações persistentes.
- [x] Código preservado — casa de outro jogador por bairro.
- [ ] Teste físico — entrar/sair de cada modelo de casa.
- [ ] Teste físico — usar todos os móveis.
- [ ] Teste físico — salvar conteúdo do baú.
- [ ] Teste físico — propriedade privada e visitante.
- [ ] Teste físico — extensão local/nuvem sem duplicação.

## 9. Construção

- [x] Código preservado — receitas e custos.
- [x] Código preservado — seleção do item.
- [x] Código preservado — preview translúcido.
- [x] Código preservado — preview válido/inválido.
- [x] Código preservado — giro.
- [x] Código preservado — confirmação.
- [x] Código preservado — cancelamento sem gasto.
- [x] Código preservado — terreno, água, inclinação e colisões.
- [x] Código preservado — sobreposição com outra construção.
- [x] Código preservado — propriedade da construção.
- [x] Código preservado — persistência por ID.
- [x] Código preservado — tombstone de remoção.
- [x] Código preservado — reconciliação runtime/save/nuvem.
- [ ] Teste físico — cada receita.
- [ ] Teste físico — colocar em terreno plano e inclinado.
- [ ] Teste físico — bloquear água e objetos.
- [ ] Teste físico — girar em retrato e paisagem.
- [ ] Teste físico — salvar/fechar/reabrir.
- [ ] Teste físico — sincronizar em dois aparelhos.
- [ ] Teste físico — remover e confirmar que não reaparece.
- [ ] Teste físico — impedir remoção da construção alheia.

## 10. Veículos comuns e profissionais

- [x] Código preservado — criação dos veículos.
- [x] Código preservado — IDs e posições individuais.
- [x] Código preservado — entrar/sair.
- [x] Código preservado — direção, aceleração, ré e esterço.
- [x] Código preservado — colisão e impacto.
- [x] Código preservado — som de motor.
- [x] Código preservado — poeira e efeitos.
- [x] Código preservado — passageiros NPC e online.
- [x] Código preservado — viatura policial.
- [x] Código preservado — ambulância.
- [x] Código preservado — caminhão de bombeiros.
- [x] Código preservado — ponto seguro de saída.
- [ ] Teste físico — cada veículo individualmente.
- [ ] Teste físico — dois veículos sem compartilhar posição/estado.
- [ ] Teste físico — direção em baixa e alta velocidade.
- [ ] Teste físico — colisões frontais, traseiras e laterais.
- [ ] Teste físico — entrar/sair perto de parede e trânsito.
- [ ] Teste físico — salvar veículo estacionado.
- [ ] Teste físico — passageiro entrando e saindo.

## 11. Ônibus e metrô

- [x] Código preservado — modelos de ônibus.
- [x] Código preservado — rota presa à malha viária.
- [x] Código preservado — paradas.
- [x] Código preservado — espera e chegada.
- [x] Código preservado — entrada e saída em ponto seguro.
- [x] Código preservado — recuperação de rota.
- [x] Código preservado — destinos seguintes.
- [x] Código preservado — entrada e viagem de metrô.
- [ ] Teste físico — todas as linhas e paradas.
- [ ] Teste físico — ônibus não sair da rua.
- [ ] Teste físico — ônibus não sobrepor outros veículos.
- [ ] Teste físico — entrar/sair em retrato e paisagem.
- [ ] Teste físico — completar uma volta inteira.
- [ ] Teste físico — metrô entre todos os destinos.

## 12. Bombeiros

- [x] Código preservado — quartel.
- [x] Código preservado — caminhão de bombeiros.
- [x] Código preservado — ocorrências de incêndio controladas.
- [x] Código preservado — ativação de ocorrência.
- [x] Código preservado — combate e extinção.
- [x] Código preservado — atualização visual do fogo.
- [x] Código preservado — missão e recompensa.
- [x] Código preservado — uniforme.
- [ ] Teste físico — aceitar missão no quartel.
- [ ] Teste físico — reservar/entrar no caminhão correto.
- [ ] Teste físico — localizar incêndio pelo mapa.
- [ ] Teste físico — extinguir e concluir apenas uma vez.
- [ ] Teste físico — cancelar e restaurar uniforme/veículo.

## 13. Polícia e segurança

- [x] Código preservado — delegacia.
- [x] Código preservado — viatura.
- [x] Código preservado — patrulha.
- [x] Código preservado — alerta policial.
- [x] Código preservado — aproximação da viatura.
- [x] Código preservado — atualização do sistema.
- [x] Código preservado — missão e uniforme.
- [x] Código preservado — lições educativas de segurança.
- [ ] Teste físico — aceitar missão policial.
- [ ] Teste físico — patrulhar pontos GPS.
- [ ] Teste físico — iniciar/resolver alerta.
- [ ] Teste físico — recompensa sem duplicação.
- [ ] Teste físico — cancelar missão e devolver viatura.

## 14. Ambulância e incidentes

- [x] Código preservado — ambulância.
- [x] Código preservado — incidentes de trânsito.
- [x] Código preservado — deslocamento de socorrista.
- [x] Código preservado — resolução de incidente.
- [x] Código preservado — estado e painel de segurança.
- [ ] Teste físico — gerar incidente.
- [ ] Teste físico — entrar na ambulância correta.
- [ ] Teste físico — chegar ao incidente.
- [ ] Teste físico — concluir e limpar cenário.
- [ ] Teste físico — impedir recompensa repetida.

## 15. Pescaria e barcos

- [x] Código preservado — área de pesca.
- [x] Código preservado — vara, linha, boia e peixe.
- [x] Código preservado — lançamento.
- [x] Código preservado — espera e fisgada.
- [x] Código preservado — puxar peixe.
- [x] Código preservado — espécies e peso.
- [x] Código preservado — inventário/histórico da captura.
- [x] Código preservado — câmera especial e restauração.
- [x] Código preservado — entrada/saída do barco.
- [x] Código preservado — física náutica.
- [x] Código preservado — passageiros.
- [ ] Teste físico — câmera gira durante toda a pesca.
- [ ] Teste físico — personagem, vara, boia e peixe visíveis.
- [ ] Teste físico — painel não cobre a ação.
- [ ] Teste físico — pesca em retrato e paisagem.
- [ ] Teste físico — captura e cancelamento.
- [ ] Teste físico — barco apenas na água e saída no cais.

## 16. Recursos, oficina, fogueira e caça

- [x] Código preservado — madeira, pedra, cristal e ouro.
- [x] Código preservado — coleta.
- [x] Código preservado — mina e poço.
- [x] Código preservado — oficina e fundição.
- [x] Código preservado — fogueira.
- [x] Código preservado — cozinhar na fogueira.
- [x] Código preservado — animais e caça infantil controlada.
- [x] Código preservado — inventário e recompensas.
- [ ] Teste físico — coletar cada recurso.
- [ ] Teste físico — fabricar cada item.
- [ ] Teste físico — fundir ouro.
- [ ] Teste físico — fogueira local/nuvem.
- [ ] Teste físico — ações com animais sem travar NPCs.

## 17. NPCs, amizade e atividades sociais

- [x] Código preservado — conversar.
- [x] Código preservado — piada.
- [x] Código preservado — presente.
- [x] Código preservado — resolver desacordo.
- [x] Código preservado — acenar, dançar, brincar e selfie.
- [x] Código preservado — seguir jogador.
- [x] Código preservado — passeio como passageiro.
- [x] Código preservado — amizade e níveis.
- [x] Código preservado — corrida e pega-moedas.
- [x] Código preservado — disputa de propriedade.
- [x] Código preservado — sociedade e humor dos NPCs.
- [ ] Teste físico — cada ação com cada NPC compatível.
- [ ] Teste físico — amizade salva e restaurada.
- [ ] Teste físico — NPC seguindo sem atravessar objetos.
- [ ] Teste físico — NPC passageiro em carro e barco.
- [ ] Teste físico — corridas terminam e recompensam uma vez.

## 18. Inimigos, combate, poderes e aventuras

- [x] Código preservado — inimigos e vida.
- [x] Código preservado — patrulha e perseguição.
- [x] Código preservado — ataque/poder.
- [x] Código preservado — projéteis.
- [x] Código preservado — reaparecimento.
- [x] Código preservado — castelo, portais e áreas secretas.
- [x] Código preservado — cristais e desafios de aventura.
- [ ] Teste físico — atingir cada inimigo.
- [ ] Teste físico — receber impacto sem travar.
- [ ] Teste físico — atravessar portais e retornar.
- [ ] Teste físico — recompensas e respawn.

## 19. Carreiras, missões e recompensas

- [x] Código preservado — central de trabalhos.
- [x] Código preservado — entrega.
- [x] Código preservado — professor.
- [x] Código preservado — policial.
- [x] Código preservado — bombeiro.
- [x] Código preservado — objetivos e estados de missão.
- [x] Código preservado — retomada após recarregar.
- [x] Código preservado — uniforme e veículo da missão.
- [x] Código preservado — token contra recompensa duplicada.
- [x] Código preservado — conclusão e cancelamento.
- [ ] Teste físico — fluxo completo de cada carreira.
- [ ] Teste físico — fechar no meio e retomar.
- [ ] Teste físico — concluir duas vezes não duplica recompensa.
- [ ] Teste físico — cancelar limpa marcadores e devolve visual.

## 20. Educação e progressão adaptativa

- [x] Código preservado — matemática.
- [x] Código preservado — português.
- [x] Código preservado — inglês.
- [x] Código preservado — níveis e desbloqueios.
- [x] Código preservado — corações, estrelas e coroas.
- [x] Código preservado — desafios diários.
- [x] Código preservado — trilha adaptativa independente.
- [x] Código preservado — dificuldade por domínio.
- [x] Código preservado — registro de acerto/erro.
- [x] Código preservado — progresso local e merge na nuvem.
- [x] Código preservado — recompensa ligada ao mundo.
- [ ] Teste físico — todas as fases por matéria.
- [ ] Teste físico — alternativas sem repetição impossível.
- [ ] Teste físico — sequência de sílabas.
- [ ] Teste físico — dificuldade aumenta/diminui corretamente.
- [ ] Teste físico — sincronização do domínio em dois aparelhos.
- [ ] Teste físico — desafio multiplayer educativo.

## 21. Multiplayer, bairros e casas online

- [x] Código preservado — presença Firebase.
- [x] Código preservado — `onDisconnect` no adaptador existente.
- [x] Código preservado — fantasmas dos jogadores.
- [x] Código preservado — interpolação.
- [x] Código preservado — apelido sobre personagem.
- [x] Código preservado — bairros/salas.
- [x] Código preservado — diretório de casas do bairro.
- [x] Código preservado — chat controlado.
- [x] Código preservado — convites e ações sociais.
- [x] Código preservado — desafios educativos online.
- [x] Código preservado — resultados e histórico de duelos.
- [x] Código preservado — objetos de mundo compartilhados.
- [ ] Teste físico — duas sessões no mesmo bairro.
- [ ] Teste físico — sessões em bairros diferentes não se enxergam.
- [ ] Teste físico — entrada/saída remove presença.
- [ ] Teste físico — posição fluida com internet lenta.
- [ ] Teste físico — casa do outro aparece com apelido correto.
- [ ] Teste físico — convite, aceitação, recusa e resultado.
- [ ] Teste físico — limite de jogadores por sala.
- [ ] Teste físico — consumo de dados por jogador/hora.

## 22. Segurança infantil e controles parentais

- [x] Código preservado — apelido em vez de nome completo.
- [x] Código preservado — frases e ações sociais controladas.
- [x] Código preservado — ocultar mensagens antigas.
- [x] Código preservado — ferramentas parentais iniciais.
- [x] Código preservado — estrutura de privacidade da casa.
- [ ] Teste/revisão — filtro de apelidos impróprios.
- [ ] Teste/revisão — bloquear e denunciar usuário.
- [ ] Teste/revisão — aprovação de amizade pelo responsável.
- [ ] Teste/revisão — política de retenção de dados.
- [ ] Teste/revisão — revisão jurídica e privacidade infantil.

## 23. PWA, cache, atualização e offline

- [x] Código preservado — manifesto.
- [x] Código preservado — Service Worker.
- [x] Código preservado — instalação PWA.
- [x] Código preservado — atualização de versão.
- [x] Código preservado — arquivos do jogo em cache.
- [x] Código preservado — limpeza de caches antigos do próprio projeto.
- [ ] Teste físico — instalar em Android.
- [ ] Teste físico — fechar e abrir instalado.
- [ ] Teste físico — publicar nova versão e atualizar automaticamente.
- [ ] Teste físico — comportamento offline dos arquivos já cacheados.
- [ ] Teste físico — dependência externa do Three.js durante primeiro carregamento.

## 24. AR

- [x] Código preservado — visualizador AR.
- [x] Código preservado — modelo GLB.
- [x] Código preservado — abertura interna/externa conforme suporte.
- [ ] Teste físico — Android compatível.
- [ ] Teste físico — escala e orientação do personagem em AR.
- [ ] Teste físico — retorno ao jogo sem perder estado.

## 25. APK Android

- [x] Código preservado — projeto Android.
- [x] Código preservado — WebView e URL detectada pelo workflow.
- [x] Código preservado — permissões e orientação.
- [x] Código preservado — workflow do GitHub Actions.
- [x] Código preservado — nome do APK V643.
- [ ] Teste físico — gerar APK pelo Actions.
- [ ] Teste físico — instalar sobre versão anterior.
- [ ] Teste físico — retrato/paisagem automáticos.
- [ ] Teste físico — segundo plano e retorno.
- [ ] Teste físico — upload de arquivo, áudio e câmera quando aplicável.
- [ ] Teste físico — atualização web sem recompilar APK.

## Critério de aprovação

A modularização está aprovada quando a equivalência estática passa. O jogo só deve ser chamado de versão final aprovada depois que todos os itens de teste físico críticos forem executados e as metas mínimas forem atendidas:

- 30 FPS estáveis em celular básico de referência;
- nenhuma sobreposição crítica em retrato/paisagem;
- nenhuma perda de save;
- nenhuma recompensa duplicada;
- construções e casas persistentes;
- multiplayer limitado por bairro e sem vazamento de dados entre salas;
- fluxo educacional adaptativo registrando domínio corretamente;
- roupas, skills e serviços profissionais preservados.
