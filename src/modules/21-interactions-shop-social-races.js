/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 21-interactions-shop-social-races.js
 * Escopo: Atividades, mercado, oficina, amizades, NPCs e corridas
 * Linhas de origem V642: 3241-3415
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function useActivity(type,house){
    if(type==='bed'){
      player.sitUntil=performance.now()+1400;state.needs.energy=100;state.needs.hunger=Math.max(0,state.needs.hunger-4);setFlag('slept');addXP(20);toast('Você dormiu e salvou o jogo.','good');saveState(true);
    }else if(type==='sofa'){
      player.sitUntil=performance.now()+2400;state.needs.fun=clamp(state.needs.fun+20,0,100);toast('Sentou no sofá.','good');addXP(5);
    }else if(type==='tv'){
      player.sitUntil=performance.now()+3000;state.needs.fun=clamp(state.needs.fun+34,0,100);state.needs.energy=clamp(state.needs.energy-3,0,100);toast(`Assistindo ao desenho de ${playerDisplayName()}!`,'good');addXP(8);
    }else if(type==='fridge'){
      openModal('Geladeira',`<p>Comida disponível: <b>${state.inventory.food}</b></p><div class="modal-actions"><button class="btn primary" data-eat>Comer lanche</button><button class="btn" data-close>Fechar</button></div>`,root=>{
        $('[data-eat]',root).onclick=()=>{if(state.inventory.food<=0){toast('A geladeira está vazia.','warn');return;}state.inventory.food--;state.needs.hunger=clamp(state.needs.hunger+32,0,100);setFlag('ateMeal');addXP(12);saveState();closeModal();toast('Lanche delicioso!','good');};$('[data-close]',root).onclick=closeModal;
      });
    }else if(type==='stove'){
      openModal('Cozinha',`<p>Cozinhar custa 1 comida e recupera muita fome.</p><div class="modal-actions"><button class="btn primary" data-cook>Cozinhar refeição</button><button class="btn" data-close>Cancelar</button></div>`,root=>{
        $('[data-cook]',root).onclick=()=>{if(state.inventory.food<=0){toast('Você precisa comprar ou colher comida.','warn');return;}state.inventory.food--;state.stats.cooked++;trackDaily('cook',1);state.needs.hunger=100;state.needs.fun=clamp(state.needs.fun+8,0,100);setFlag('ateMeal');addXP(20);saveState();closeModal();toast('Refeição pronta!','good');};$('[data-close]',root).onclick=closeModal;
      });
    }else if(type==='sink'){
      if(state.inventory.water>0)state.inventory.water--;state.needs.hunger=clamp(state.needs.hunger+5,0,100);state.needs.hygiene=clamp(state.needs.hygiene+8,0,100);toast('Bebeu água.','good');saveState();
    }else if(type==='shower'){
      state.needs.hygiene=100;state.needs.energy=clamp(state.needs.energy-2,0,100);player.sitUntil=performance.now()+1800;toast('Banho tomado!','good');addXP(8);saveState();
    }else if(type==='chest')openHomeChest();
    else if(type==='shop')openShop();
    else if(type==='workshop')openWorkshop();
    else if(type==='wardrobe')openAvatarStudio();
    else if(type==='school'){if(state.career.activeJob?.id==='teacher')openTeacherJobLesson(house);else openEducationHub(String(state.learning.lastLesson||'math').split('-')[0]);}
    else if(type==='police'){if(state.career.activeJob?.id==='police')toast('Patrulha ativa: siga os pontos marcados no GPS.','good',2200);else openSafetyLesson('station');}
    else if(type==='firestation')openFireStationDesk();
    updateHUD();
  }
  function openShop(){
    const items=[['Comida',15,'food',2,'🍎'],['Água',8,'water',2,'💧'],['Blocos',25,'blocks',4,'🧱'],['Cercas',20,'fences',3,'🪵']];
    openModal('Mercadinho da Vila',`<p>Moedas: <b>${state.profile.coins}</b></p><div class="choice-grid">${items.map(([name,price,key,amount,icon],i)=>`<button class="choice" data-buy="${i}"><b>${icon} ${name}</b><span>${price} moedas — +${amount}</span></button>`).join('')}</div>`,root=>{
      $$('[data-buy]',root).forEach(btn=>btn.onclick=()=>{const [name,price,key,amount]=items[Number(btn.dataset.buy)];if(state.profile.coins<price){toast('Moedas insuficientes.','warn');return;}addCoins(-price);state.inventory[key]+=amount;addXP(5);saveState();closeModal();toast(`${name} comprado!`,'good');});
    });
  }
  function openWorkshop(){
    const inv=state.inventory;
    openModal('Oficina e Fundição',`<div class="workshop-header"><div>🛠️</div><section><h3>Ferramentas, construção e ouro</h3><p>Escolha uma melhoria. Os materiais só são consumidos depois do toque.</p></section></div><div class="resource-summary"><span>🪵 ${inv.wood}</span><span>🪨 ${inv.stone}</span><span>🟨 ${inv.goldOre||0}</span><span>🏅 ${inv.goldBar||0}</span></div><div class="choice-grid workshop-grid"><button class="choice" data-sword><b>✨ Ferramenta de aventura</b><span>2 madeiras + 2 pedras</span></button><button class="choice" data-blocks><b>🧱 Kit construção</b><span>1 madeira + 1 pedra</span></button><button class="choice" data-smelt><b>🏅 Fundir ouro</b><span>3 minérios → 1 barra</span></button></div>`,root=>{
      $('[data-sword]',root).onclick=()=>{if(inv.wood<2||inv.stone<2){toast('Faltam materiais.','warn');return;}inv.wood-=2;inv.stone-=2;state.flags.swordUpgrade=(state.flags.swordUpgrade||0)+1;addXP(35);saveState();closeModal();toast('Ferramenta de aventura melhorada!','good');};
      $('[data-blocks]',root).onclick=()=>{if(inv.wood<1||inv.stone<1){toast('Faltam materiais.','warn');return;}inv.wood--;inv.stone--;inv.blocks+=3;inv.fences+=2;saveState();closeModal();toast('Kit de construção pronto!','good');};
      $('[data-smelt]',root).onclick=()=>{if((inv.goldOre||0)<3){toast('Você precisa de 3 minérios de ouro.','warn');return;}inv.goldOre-=3;inv.goldBar=(inv.goldBar||0)+1;addCoins(60);addXP(35);saveState(true);closeModal();toast('Barra de ouro criada: +60 moedas.','good',2200);};
    });
  }

  function friendshipTier(value){ return value>=60?'Melhor amigo':value>=30?'Amigo':value>=10?'Conhecido':'Vizinho'; }
  function changeFriendship(npc, amount, message){
    state.friendship[npc.id]=clamp((state.friendship[npc.id]||0)+amount,0,100);npc.friendship=state.friendship[npc.id];
    if(npc.id==='nino')setFlag('talkedNeighbor');
    if(message)toast(message,'good');addXP(Math.max(2,amount*2));addReputation(Math.max(1,Math.floor(amount/2)));evaluateMissions();saveState();
  }
  function talkToNPC(npc){
    if(npc.id==='maya'&&state.flags.deliveryActive&&player.vehicle&&distance2D(player,npc)<3.5){state.flags.deliveryActive=false;state.inventory.package=0;setFlag('deliveryDone');if(state.career.activeJob?.id==='delivery')completeActiveJob();else{addCoins(120);addReputation(30);}toast('Entrega concluída para Maya!','good',2400);}
    const value=state.friendship[npc.id]||0;
    const greetings={clara:'Sou Clara, professora. Na escola aprendemos brincando e respeitando todos.',rafa:'Sou Rafa, da patrulha educativa. Segurança vem sempre em primeiro lugar.',davi:'Sou Davi, bombeiro. Nossas missões são treinamentos controlados e seguros.',leo:'Sou Leo, entregador. Conhecer as melhores rotas deixa a cidade mais rápida.',nino:'Sou Nino. A vila tem casas, corridas e desafios esperando por você.',luna:'Quero ver sua casa cheia de estilo! Vamos decorar?',teo:'Trabalho e criatividade transformam materiais em conquistas.',bia:'Há cristais e caminhos secretos esperando por você.',maya:'Na garagem sempre existe um trabalho para quem quer crescer.'};
    openModal(npc.name,`<div class="dialogue-box">${greetings[npc.id]||'Olá, vizinho!'}</div><div class="friend-meter"><span>Amizade — ${friendshipTier(value)}</span><b>${value}/100</b><i style="width:${value}%"></i></div><div class="choice-grid social-actions">
      <button class="choice" data-social="talk"><b>💬 Conversar</b><span>Conhecer melhor</span></button>
      <button class="choice" data-social="joke"><b>😄 Contar piada</b><span>Aumenta diversão</span></button>
      <button class="choice" data-social="gift"><b>🎁 Dar presente</b><span>Usa comida ou cristal</span></button>
      <button class="choice" data-social="argue"><b>🤝 Resolver desacordo</b><span>Conversar com calma e respeito</span></button>
      <button class="choice" data-social="race"><b>🏃 Desafiar corrida</b><span>Corrida de velocidade</span></button>
      <button class="choice" data-social="coinrace"><b>🪙 Pega-moedas</b><span>Quem coleta mais?</span></button>
      <button class="choice" data-social="house"><b>🏠 Disputar casa</b><span>Ganhe uma propriedade</span></button>
      <button class="choice" data-social="job"><b>💼 Perguntar trabalho</b><span>Ganhar moedas</span></button>
      <button class="choice" data-social="invite"><b>🏡 Convidar para casa</b><span>Precisa de amizade 10</span></button>
      <button class="choice" data-social="wave"><b>👋 Acenar</b><span>Animação social rápida</span></button>
      <button class="choice" data-social="dance"><b>🕺 Dançar</b><span>Aumenta diversão</span></button>
      <button class="choice" data-social="play"><b>🎈 Brincar</b><span>Diversão e amizade</span></button>
      <button class="choice" data-social="selfie"><b>📸 Tirar selfie</b><span>Guarde uma lembrança</span></button>
      <button class="choice" data-social="follow"><b>${npc.following?'✋ Parar de seguir':'👣 Seguir junto'}</b><span>${npc.following?'Encerrar acompanhamento':'O vizinho acompanha você'}</span></button>
      <button class="choice" data-social="ride"><b>${(npc.pendingRide||npc.passengerMode)?'✋ Cancelar passeio':'🚗 Passear junto'}</b><span>${(npc.pendingRide||npc.passengerMode)?'Sair ou cancelar a carona':'Entra no próximo carro ou barco'}</span></button>
    </div>`,root=>{
      $$('[data-social]',root).forEach(btn=>btn.onclick=()=>{
        const action=btn.dataset.social;
        if(action==='talk'){state.stats.talks++;trackDaily('talk',1);changeFriendship(npc,2,`${npc.name} gostou da conversa.`);closeModal();}
        else if(action==='joke'){state.social.jokes++;state.needs.fun=clamp(state.needs.fun+12,0,100);changeFriendship(npc,3,`${npc.name} riu da piada!`);closeModal();}
        else if(action==='gift'){
          if(state.inventory.food>0){state.inventory.food--;state.social.gifts++;changeFriendship(npc,7,'Presente entregue!');closeModal();}
          else if(state.inventory.crystals>0){state.inventory.crystals--;state.social.gifts++;changeFriendship(npc,10,'Cristal presenteado!');closeModal();}
          else toast('Você não tem comida nem cristal para presentear.','warn');
        } else if(action==='argue'){
          state.social.arguments=(state.social.arguments||0)+1;state.friendship[npc.id]=clamp((state.friendship[npc.id]||0)+2,0,100);state.profile.reputation+=1;saveState(true);updateHUD();closeModal();toast(`${npc.name} e você resolveram tudo conversando.`,'good');
        } else if(action==='race'){closeModal();startRace('sprint',npc);}
        else if(action==='coinrace'){closeModal();startRace('coins',npc);}
        else if(action==='house'){closeModal();openHouseChallenge(npc);}
        else if(action==='job'){closeModal();openJobCenter(npc.id);}
        else if(action==='invite'){
          if((state.friendship[npc.id]||0)<10){toast('A amizade precisa chegar a 10.','warn');return;}
          if(!state.social.invited.includes(npc.id))state.social.invited.push(npc.id);changeFriendship(npc,2,`${npc.name} aceitou visitar sua casa!`);closeModal();
        }else if(action==='wave'){triggerEmote('wave',npc);changeFriendship(npc,1);closeModal();}
        else if(action==='dance'){triggerEmote('dance',npc);state.needs.fun=clamp(state.needs.fun+10,0,100);changeFriendship(npc,2);closeModal();}
        else if(action==='play'){triggerEmote('play',npc);state.needs.fun=clamp(state.needs.fun+14,0,100);changeFriendship(npc,3,`${npc.name} adorou brincar!`);closeModal();}
        else if(action==='selfie'){triggerEmote('selfie',npc);state.flags.selfies=(state.flags.selfies||0)+1;changeFriendship(npc,2);closeModal();}
        else if(action==='follow'){const stopping=!!npc.following;npc.following=!stopping;if(stopping){npc.pendingRide=false;npc.passengerMode=null;if(npc.group)npc.group.visible=true;}toast(stopping?`${npc.name} parou de acompanhar você.`:`${npc.name} vai acompanhar você.`,'good');closeModal();}
        else if(action==='ride'){if(npc.pendingRide||npc.passengerMode){npc.pendingRide=false;npc.following=false;npc.passengerMode=null;if(npc.group)npc.group.visible=true;toast(`Passeio com ${npc.name} cancelado.`,'good');}else{npc.pendingRide=true;npc.following=true;toast(`${npc.name} vai entrar no próximo carro ou barco com você.`,'good',2400);}closeModal();}
      });
    });
  }

  function openHouseChallenge(npc){
    const options=world.houses.filter(h=>!h.publicBuilding&&!state.houses[h.id]?.owned);
    if(!options.length){toast('Você já conquistou todas as casas disponíveis.','good');return;}
    openModal('Disputa de propriedade',`<p>Vença ${npc.name} numa corrida para conquistar a casa escolhida.</p><div class="choice-grid">${options.map(h=>`<button class="choice" data-house-race="${h.id}"><b>🏠 ${h.name}</b><span>Prêmio: propriedade destrancada</span></button>`).join('')}</div>`,root=>{
      $$('[data-house-race]',root).forEach(btn=>btn.onclick=()=>{const id=btn.dataset.houseRace;closeModal();startRace('sprint',npc,id);});
    });
  }
  function openRaceCenter(npc=null){
    const name=npc?.name||'um corredor da vila';
    openModal('Ginásio de Atletismo',`<p>Desafie ${name}. Os controles normais continuam funcionando.</p><div class="choice-grid"><button class="choice" data-race="sprint"><b>🏃 Corrida de velocidade</b><span>Chegue primeiro à linha final</span></button><button class="choice" data-race="coins"><b>🪙 Corrida pega-moedas</b><span>Colete 8 moedas antes do rival</span></button></div>`,root=>{
      $$('[data-race]',root).forEach(btn=>btn.onclick=()=>{closeModal();startRace(btn.dataset.race,npc||world.npcs[0]);});
    });
  }
  function createRaceOpponent(npc){
    const group=new THREE.Group();worldGroup.add(group);box(.78,1.12,.55,npc?.color||0xff72b6,0,1.1,0,group);box(.68,.68,.68,0xffd3a0,0,2.0,0,group);box(.08,.08,.04,0x111827,-.15,2.05,.36,group);box(.08,.08,.04,0x111827,.15,2.05,.36,group);return group;
  }
  function clearRaceObjects(){
    if(activeRace?.opponent)worldGroup.remove(activeRace.opponent);
    for(const coin of world.raceCoins)worldGroup.remove(coin.mesh);
    world.raceCoins=[];
  }
  function spawnRaceCoins(){
    world.raceCoins=[];
    for(let i=0;i<12;i++){
      const x=30+i*3.7,z=i%2?73:78;const mesh=cylinder(.35,.12,0xffd84d,x,.7,z,worldGroup,18);mesh.rotation.x=Math.PI/2;world.raceCoins.push({x,z,mesh,got:false});
    }
  }
  function startRace(type,npc,housePrize=null){
    if(activeRace){toast('Termine o desafio atual.','warn');return;}
    if(currentHouse)exitHouse();
    const gym=world.gym;if(!gym){toast('Ginásio ainda não carregou.','warn');return;}
    const opponent=createRaceOpponent(npc||world.npcs[0]);opponent.position.set(gym.startX,0,gym.lane2Z);
    activeRace={type,npcId:npc?.id||'nino',npcName:npc?.name||'Nino',housePrize,startAt:performance.now()+3000,started:false,opponent,opponentX:gym.startX,opponentScore:0,playerScore:0,timeLimit:type==='coins'?45:30,lastOpponentCoin:0};
    player.x=gym.startX;player.z=gym.lane1Z;player.y=0;player.vx=player.vz=player.vy=0;cameraYaw=Math.PI/2;cameraMode='openworld';state.waypoint={id:'gym',name:'Ginásio',x:gym.x,z:gym.z};updateWaypointMarker();
    if(type==='coins')spawnRaceCoins();
    els.raceBadge.hidden=false;els.raceTitle.textContent=type==='coins'?'Pega-moedas':housePrize?'Corrida pela casa':'Corrida de velocidade';els.raceStatus.textContent='3...';
    toast(`Desafio contra ${activeRace.npcName}!`,'good',2200);saveState(true);
  }
  function finishRace(won){
    if(!activeRace)return;const race=activeRace;state.stats.races++;trackDaily('race',1);clearRaceObjects();activeRace=null;els.raceBadge.hidden=true;
    if(won){
      state.races.wins++;if(race.type==='coins')state.races.coinWins++;
      addCoins(race.type==='coins'?90:120);addReputation(18);addXP(70);setFlag(race.type==='coins'?'wonCoinRace':'wonRace');
      if(race.housePrize){const old=state.houses[race.housePrize]||{};state.houses[race.housePrize]={...old,owned:true,locked:false};state.races.houseWins++;setFlag('wonHouseChallenge');setFlag('boughtHouse');awardMedal('Casa Conquistada');}
      toast(race.housePrize?'Você venceu e conquistou a casa!':'Você venceu o desafio!','good',2600);
    }else{state.races.losses++;toast(`${race.npcName} venceu. Tente novamente!`,'warn',2400);}
    player.x=45;player.z=82;player.y=0;player.vx=player.vz=player.vy=0;state.waypoint=null;updateWaypointMarker();saveState(true);evaluateMissions();
  }
  function updateRace(dt){
    if(!activeRace)return;const race=activeRace,gym=world.gym,now=performance.now();
    if(now<race.startAt){els.raceStatus.textContent=`${Math.max(1,Math.ceil((race.startAt-now)/1000))}...`;return;}
    if(!race.started){race.started=true;race.startedAt=now;els.raceStatus.textContent='VALENDO!';beep(880,100);}
    const elapsed=(now-race.startedAt)/1000;race.timeLeft=Math.max(0,race.timeLimit-elapsed);
    if(race.type==='sprint'){
      race.opponentX+=6.15*dt;race.opponent.position.x=race.opponentX;race.opponent.position.z=gym.lane2Z;race.opponent.rotation.y=Math.PI/2;
      els.raceStatus.textContent=`Chegue em ${gym.finishX}m • ${race.timeLeft.toFixed(1)}s`;
      if(player.x>=gym.finishX)finishRace(true);else if(race.opponentX>=gym.finishX||race.timeLeft<=0)finishRace(false);
    }else{
      race.opponent.position.x=lerp(race.opponent.position.x,gym.startX+Math.min(46,elapsed*1.1),dt*2);race.opponent.position.z=gym.lane2Z;
      if(elapsed-race.lastOpponentCoin>3.2){race.lastOpponentCoin=elapsed;race.opponentScore++;}
      for(const coin of world.raceCoins){if(coin.got)continue;coin.mesh.rotation.y+=dt*5;if(Math.hypot(player.x-coin.x,player.z-coin.z)<1.25){coin.got=true;coin.mesh.visible=false;race.playerScore++;beep(920,45);}}
      els.raceStatus.textContent=`Você ${race.playerScore}/8 • ${race.npcName} ${race.opponentScore}/8 • ${Math.ceil(race.timeLeft)}s`;
      if(race.playerScore>=8)finishRace(true);else if(race.opponentScore>=8)finishRace(false);else if(race.timeLeft<=0)finishRace(race.playerScore>race.opponentScore);
    }
  }


  const JOBS = [
    {id:'delivery',title:'Entregador da Vila',icon:'📦',reward:120,rep:30,description:'Pegue o carrinho e entregue o pacote para Maya.'},
    {id:'police',title:'Patrulha Educativa',icon:'👮',reward:160,rep:38,description:'Visite três pontos da cidade e oriente o trânsito com segurança.'},
    {id:'firefighter',title:'Bombeiro Kids',icon:'🚒',reward:180,rep:42,description:'Vista o uniforme, dirija o caminhão dos bombeiros e atenda uma emergência controlada.'},
    {id:'paramedic',title:'Socorrista da Vila',icon:'🚑',reward:175,rep:40,description:'Vista o uniforme, dirija a ambulância e responda a um acidente com segurança.'},
    {id:'teacher',title:'Professor por um Dia',icon:'🧑‍🏫',reward:150,rep:34,description:'Vá a uma escola e conduza uma atividade educativa.'},
    {id:'gather',title:'Ajudante da Oficina',icon:'🪵',reward:90,rep:18,description:'Colete 3 madeiras e 2 pedras.',target:{wood:3,stone:2}},
    {id:'crystals',title:'Explorador de Cristais',icon:'💎',reward:140,rep:24,description:'Colete 3 novos cristais.',target:{crystals:3}},
    {id:'builder',title:'Decorador do Bairro',icon:'🧱',reward:110,rep:20,description:'Construa 2 objetos perto de uma casa.',target:{builds:2}}
  ];
  const MISSION_STATES=Object.freeze({LOCKED:'LOCKED',AVAILABLE:'AVAILABLE',ACCEPTED:'ACCEPTED',PREPARING:'PREPARING',TRAVELLING:'TRAVELLING',AT_LOCATION:'AT_LOCATION',ACTION_REQUIRED:'ACTION_REQUIRED',RETURNING:'RETURNING',COMPLETING:'COMPLETING',COMPLETED:'COMPLETED',CANCELLED:'CANCELLED',FAILED_SAFE:'FAILED_SAFE'});
  const JOB_UNIFORMS={delivery:'delivery',police:'police',firefighter:'firefighter',paramedic:'paramedic',teacher:'teacher',gather:'mechanic',crystals:'miner',builder:'builder'};
