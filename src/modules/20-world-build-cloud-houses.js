/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 20-world-build-cloud-houses.js
 * Escopo: Construção do mundo, recursos, baús, casas em nuvem e interiores
 * Linhas de origem V642: 3097-3240
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function createLifeExpansionWorld(){createLakeExpansion();createCampfireZone();createHuntingArea();restoreLifeExpansion();applyCloudWorldObjects();}
  function buildWorld(){
    worldGroup=new THREE.Group();scene.add(worldGroup);
    const ground=stableBox(250,.3,250,materials.grass,0,-.15,0,worldGroup,0);ground.receiveShadow=false;
    createSkyDome();
    scene.background=new THREE.Color(0x79cfff);scene.fog=new THREE.Fog(0xbce8ff,235,560);
    // roads
    createRoad(0,0,18,210);createRoad(0,0,210,18);createRoad(-55,-55,9,105);createRoad(55,48,9,92);createRoad(55,-55,9,105);createRoad(-55,22,9,44);createRoad(27.5,78,55,9);
    createDistrictVisuals();createLearningPlaza();
    // water, bridge, lava/secret zone
    createWater(-72,52,92,18);createWater(-100,70,38,34);
    // bridge visual and fixed flag
    for(let i=-5;i<=5;i++){const part=box(2.1,.35,5,materials.wood,-12+i*2.15,.25,52);world.bridgeParts.push(part);registerPlatform(-12+i*2.15,52,2.1,5,.43,{bridgePart:i+5});}
    createLava(96,-82,34,26);
    // trees forest
    for(let i=0;i<48;i++){const x=-92+(Math.random()-.5)*68,z=-52+(Math.random()-.5)*84;if(Math.abs(x+68)<10&&Math.abs(z-52)<12)continue;if(Math.abs(x+68)<11&&Math.abs(z+18)<11)continue;if(Math.abs(x+92)<14&&Math.abs(z+92)<13)continue;createTree(x,z,.75+Math.random()*.55,true);}
    for(let i=0;i<18;i++)createRock(-44+(Math.random()-.5)*60,-95+(Math.random()-.5)*54,.7+Math.random()*.6,true);
    for(let i=0;i<80;i++)createFlower((Math.random()-.5)*190,(Math.random()-.5)*190,Math.random()>.5?0xff74c9:0xffdf55);
    // village houses
    const home=createHouse({id:'home',name:`Casa de ${playerDisplayName()}`,x:0,z:18,color:0xc4843e,roofColor:0xd93a38});addHouseInterior(home,'home');
    const blue=createHouse({id:'blue',name:'Casa Azul',x:-25,z:17,color:0x4f9fd7,roofColor:0x225fa5,price:250});addHouseInterior(blue,'neighbor');
    const pink=createHouse({id:'pink',name:'Casa Rosa',x:25,z:17,color:0xe58aae,roofColor:0xb63871,price:420});addHouseInterior(pink,'neighbor');
    const cabin=createHouse({id:'cabin',name:'Cabana da Floresta',x:-88,z:-42,color:0x7e4a28,roofColor:0x4d2b1c,price:180});addHouseInterior(cabin,'neighbor');
    const shop=createHouse({id:'shop',name:'Mercadinho',x:-22,z:-18,color:0xf1b83e,roofColor:0xc83a2f,publicBuilding:true});addHouseInterior(shop,'shop');
    const workshop=createHouse({id:'workshop',name:'Oficina',x:22,z:-18,color:0x8c96a4,roofColor:0x3d4a5a,publicBuilding:true});addHouseInterior(workshop,'workshop');
    const school=createHouse({id:'school',name:'Escola Vila do Sol',x:-68,z:-18,color:0xf2c64e,roofColor:0x2f7fd8,publicBuilding:true});addHouseInterior(school,'school');world.school=school;
    const schoolEast=createHouse({id:'school-east',name:'Escola Horizonte',x:78,z:24,color:0xe9d68f,roofColor:0x2f7fd8,publicBuilding:true});addHouseInterior(schoolEast,'school');world.schools=[school,schoolEast];
    const policeStation=createHouse({id:'police',name:'Delegacia Central',x:68,z:-18,color:0xe8edf3,roofColor:0x245da8,publicBuilding:true});addHouseInterior(policeStation,'police');world.policeStation=policeStation;const policeWest=createHouse({id:'police-west',name:'Posto Policial do Bairro',x:-68,z:22,color:0xdfeaf2,roofColor:0x245da8,publicBuilding:true});addHouseInterior(policeWest,'police');world.policeStations=[policeStation,policeWest];const fireStation=createHouse({id:'fire-station',name:'Corpo de Bombeiros',x:68,z:-68,color:0xc83e3c,roofColor:0x3d4652,publicBuilding:true});addHouseInterior(fireStation,'firestation');world.fireStation=fireStation;
    createGoldMine();createVillageWell();createGoldFoundry();
    // yards/fences/lamps
    createFenceLine(-36,26,-14,26,9);createFenceLine(14,26,36,26,9);createFenceLine(-10,29,10,29,8);for(const p of [[-9,9],[9,9],[-33,8],[33,8],[-10,-7],[10,-7]])createLamp(p[0],p[1]);
    // NPCs com mobilidade própria
    const nino=createNPC('nino','Nino',4,3,0xffd84d,4),luna=createNPC('luna','Luna',-22,8,0xff72b6,4),teo=createNPC('teo','Teo',22,7,0x54c7ff,4),bia=createNPC('bia','Bia',-10,-10,0x8ee15c,3),maya=createNPC('maya','Maya',65,54,0xa66bff,3),clara=createNPC('clara','Clara',-66,-10,0xf0b62d,2),rafa=createNPC('rafa','Rafa',65,-10,0x2f7fd8,2),davi=createNPC('davi','Davi',65,-60,0xe54843,2),leo=createNPC('leo','Leo',48,44,0x38a66a,2);
    createNpcMobility(clara,'bike',[[-66,-10],[-55,-10],[-55,0],[-66,0]],2.7);createNpcMobility(rafa,'moto',[[65,-10],[55,-10],[55,0],[65,0]],3.8);createNpcMobility(davi,'car',[[65,-60],[55,-60],[55,-18],[65,-18]],4.1);createNpcMobility(leo,'skate',[[48,44],[55,44],[55,32],[48,32]],3.0);
    createNpcMobility(nino,'bike',[[4,3],[4,10],[-18,10],[-18,0],[4,0]],3.2);createNpcMobility(luna,'skate',[[-22,8],[-34,8],[-34,0],[-12,0],[-12,8]],2.8);createNpcMobility(teo,'moto',[[22,7],[8,7],[8,-12],[35,-12],[35,7]],4.7);createNpcMobility(bia,'bike',[[-10,-10],[-10,0],[-48,0],[-48,-10]],3.4);createNpcMobility(maya,'car',[[65,54],[55,54],[55,8],[68,8],[68,54]],4.5);
    // farm and garage
    createFenceLine(38,22,65,22,10);createFenceLine(65,22,65,43,8);for(let x=42;x<62;x+=4)for(let z=27;z<40;z+=4){box(2.8,.12,2.8,0x75451f,x,.06,z);box(.18,.55,.18,0x54c93e,x,.33,z);}
    createToyCar(52,48,{id:'garage-orange',label:'Carro da Garagem',primary:0xf28a22,secondary:0x0aa7b8});createToyCar(-31,-11,{id:'market-blue',label:'Compacto Azul',primary:0x2787d8,secondary:0x43c6e8,heading:Math.PI/2});createToyCar(31,-11,{id:'workshop-red',label:'Esportivo Vermelho',primary:0xe5484d,secondary:0xf3b33d,heading:-Math.PI/2});createToyCar(12,35,{id:'home-green',label:'Carro Verde',primary:0x31a76a,secondary:0x8edb65,heading:Math.PI});createToyCar(66,40,{id:'royal-purple',label:'Carro Real',primary:0x7d58c9,secondary:0xf1c94d});createToyCar(47,84,{id:'gym-yellow',label:'Carro do Ginásio',primary:0xf1c943,secondary:0xef6c3d,heading:Math.PI});createToyCar(-78,-5,{id:'forest-teal',label:'Carro da Floresta',primary:0x138d83,secondary:0x6bc08b,heading:Math.PI/2});
    registerInteractable({id:'job-board',type:'job',icon:'📦',label:'Central de trabalhos',x:49,z:45,radius:2.3,action:openJobCenter});world.deliveryPoint={x:65,z:54};
    createLifeExpansionWorld();
    createAthleticsGym();createSizeChallenges();createTransitWorld();createPoliceSystem();createFireServiceWorld();decorateCityServices();createWaypointMarker();createCooperativeMissionWorld();
    // placas de bairro/orientação (somente decorativas, não alteram colisão nem interação)
    createSignpost(12,4,'Vila do Sol',Math.PI/2); createSignpost(-30,-5,'Mercado e Oficina',Math.PI/2);
    createSignpost(-62,-30,'Floresta',Math.PI*.15); createSignpost(48,26,'Fazenda e Garagem',-Math.PI/2);
    createSignpost(70,40,'Castelo',Math.PI*.7); createSignpost(-58,50,'Lago',Math.PI*.4);
    // platform challenge
    const coords=[[48,0,-48],[53,1.2,-55],[59,2.3,-61],[66,3.5,-67],[74,4.6,-72],[82,5.8,-76]];coords.forEach(([x,y,z],i)=>{createPlatform(x,y+.5,z,3.2,3.2,i%2?0x7a4ed0:0x3e9fd8);createCrystal(x,y+1.7,z,i===coords.length-1);});world.secretChest=createChest('secret',86,-78,true);
    // castelo real e inimigos
    createRoyalCastle(88,62);
    createEnemy('slime',48,-25);createEnemy('slime',58,-32);createEnemy('bat',72,-43);createEnemy('golem',82,48);createEnemy('slime',96,56);
    // crystals spread
    for(const p of [[12,1,-2],[-14,1,-8],[36,1,-15],[-45,1,18],[-63,1,-35],[78,1,15],[95,1,-20]])createCrystal(...p);
    // public interactables
    registerInteractable({id:'bridge-repair',type:'repair',icon:'🛠',label:'Consertar/inspecionar ponte',x:-12,z:47,radius:3.2,action:repairBridge});
    createChest('village',8,-5,false);createChest('forest',-82,-50,false);
    // restored builds
    reconcileWorldBuilds();
    updateBridgeVisual();restoreActiveAdventure();
    // boundaries mountains
    for(let i=0;i<34;i++){const a=i/34*Math.PI*2,r=118+Math.random()*10,x=Math.cos(a)*r,z=Math.sin(a)*r;box(12,12+Math.random()*16,12,0x6d7d8a,x,6,z);}
  }

  function collectResource(id){
    const resource=world.resources.find(r=>r.id===id);if(!resource||resource.collected)return;
    const needed=resource.type==='wood'?'axe':'pickaxe';if(state.tools.equipped!==needed){toast(`Equipe ${needed==='axe'?'o machado':'a picareta'} em Ferramentas.`,'warn',1700);return;}
    resource.hits=(resource.hits||0)+1;playToolAnimation();resource.mesh.rotation.y+=(resource.hits%2?.08:-.08);
    if(resource.hits<Number(resource.hitsNeeded||1)){toast(`${resource.type==='wood'?'Árvore':'Rocha'}: ${resource.hits}/${resource.hitsNeeded}`,'good',850);return;}
    resource.collected=true;resource.mesh.visible=false;const inventoryKey=resource.type==='gold'?'goldOre':resource.type,amount=resource.type==='wood'?2:1;
    state.inventory[inventoryKey]=(state.inventory[inventoryKey]||0)+amount;state.tools.harvested[resource.type]=(state.tools.harvested[resource.type]||0)+amount;state.stats.collected++;trackDaily('collect',1);
    advanceAdventure('resources',resource.type==='gold'?'stone':resource.type);addXP(resource.type==='gold'?18:10);toast(resource.type==='wood'?'+2 madeira':resource.type==='gold'?'+1 minério de ouro':'+1 pedra','good',1300);beep(resource.type==='gold'?850:620);vibrate(25);evaluateMissions();checkActiveJob();saveState();
    setTimeout(()=>{resource.collected=false;resource.hits=0;resource.mesh.visible=true;resource.mesh.rotation.y=0;},90000);
  }
  function openChest(chest){
    if(chest.opened){toast('Este baú já foi aberto.','warn');return;}
    chest.opened=true;chest.lid.rotation.x=-.65;state.flags[`chest_${chest.id}`]=true;
    state.inventory.crystals+=chest.secret?3:1;addCoins(chest.secret?100:25);addXP(chest.secret?80:25);
    if(chest.secret)setFlag('secretChest');toast(chest.secret?'Baú secreto! +3 cristais e 100 moedas':'Baú aberto!','good',2200);evaluateMissions();saveState();
  }

  function cloudHouseRecord(houseId){return cloudHouses.get(houseId)||null;}
  function isMyCloudHouse(record){return !!record&&record.ownerUid===window.OTTHOS_RTDB?.uid;}
  function reconcileCloudHouses(){
    const uid=window.OTTHOS_RTDB?.uid;if(!uid)return;
    for(const h of world.houses||[]){if(h.publicBuilding)continue;const cloud=cloudHouseRecord(h.id);if(cloud){state.houses[h.id]={...(state.houses[h.id]||{}),owned:cloud.ownerUid===uid,locked:!!cloud.locked,ownerUid:cloud.ownerUid,ownerName:cloud.ownerName||'Jogador',price:h.price};}}
    saveState();
  }
  async function claimHouseOnline(house){
    if(!window.OTTHOS_RTDB?.connected?.()){toast('Conecte ao Firebase para comprar uma casa exclusiva.','warn',2600);return false;}
    const result=await window.OTTHOS_RTDB.claimHouse(house.id,{name:house.name,price:house.price,ownerName:publicPlayerName(),x:house.x,z:house.z});
    if(!result?.ok){toast(result?.ownerName?`Esta casa já pertence a ${result.ownerName}.`:'Não foi possível comprar a casa.','warn',2600);return false;}
    state.houses[house.id]={...(state.houses[house.id]||{}),owned:true,locked:false,ownerUid:window.OTTHOS_RTDB.uid,ownerName:state.profile.name,price:house.price};return true;
  }
  async function handleHouseDoor(house){
    const uid=window.OTTHOS_RTDB?.uid,cloud=cloudHouseRecord(house.id),mine=isMyCloudHouse(cloud),local=state.houses[house.id]||{};
    if(house.publicBuilding){if(await confirmModal(house.name,'Deseja entrar?','Entrar','Cancelar'))enterHouse(house);return;}
    if(cloud&&!mine){
      if(cloud.locked){toast(`Casa trancada por ${cloud.ownerName||'outro jogador'}.`,'warn',2500);return;}
      if(await confirmModal(house.name,`Casa de ${cloud.ownerName||'outro jogador'}. A porta está aberta. Deseja visitar?`,'Visitar','Cancelar'))enterHouse(house);return;
    }
    if(!cloud&&!local.owned){
      openModal(house.name,`<p>Casa disponível no mundo público por <b>${house.price} moedas</b>. Depois da compra, somente você poderá trancar ou destrancar.</p><div class="modal-actions"><button class="btn primary" data-buy-house>Comprar</button><button class="btn" data-race-house>Disputar em corrida</button><button class="btn" data-cancel>Cancelar</button></div>`,root=>{
        $('[data-buy-house]',root).onclick=async()=>{if(state.profile.coins<house.price){toast('Moedas insuficientes.','warn');return;}const ok=await claimHouseOnline(house);if(!ok)return;addCoins(-house.price);setFlag('boughtHouse');awardMedal('Nova Propriedade');saveState(true);closeModal();handleHouseDoor(house);};
        $('[data-race-house]',root).onclick=()=>{closeModal();startRace('sprint',world.npcs[0],house.id);};$('[data-cancel]',root).onclick=closeModal;
      });return;
    }
    const owned=mine||local.owned;if(owned){const locked=cloud?!!cloud.locked:!!local.locked;openModal(house.name,`<p>Esta casa pertence a <b>${state.profile.name}</b>.</p><div class="modal-actions"><button class="btn primary" data-enter>Entrar</button><button class="btn" data-lock>${locked?'Destrancar':'Trancar'}</button><button class="btn" data-cancel>Cancelar</button></div>`,root=>{
      $('[data-enter]',root).onclick=()=>{closeModal();enterHouse(house);};$('[data-lock]',root).onclick=async()=>{const next=!locked,ok=await window.OTTHOS_RTDB?.setHouseLock?.(house.id,next);if(ok){state.houses[house.id]={...(state.houses[house.id]||{}),owned:true,locked:next};saveState(true);closeModal();toast(next?'Casa trancada.':'Casa destrancada.','good');}else toast('Não foi possível alterar a fechadura.','warn');};$('[data-cancel]',root).onclick=closeModal;
    });return;}
    toast('Sincronizando propriedade da casa...','warn');
  }

  function enterHouse(house){
    if(!house||!canEnterMobility(PLAYER_MODES.INTERIOR)){toast('Saia do transporte antes de entrar.','warn');return false;}
    rememberSafePlayerPosition(true);enterHouse.outdoorPosition={x:player.x,y:player.y,z:player.z,yaw:cameraYaw};enterHouse.outdoorYaw=cameraYaw;cameraYaw=0;clearMovementInputs();
    currentHouse=house;cameraMode='interior';
    if(house.exteriorGroup){house.exteriorGroup.visible=false;if(house.interiorGroup)house.interiorGroup.visible=true;for(const item of house.interiorObjects||[])if(item?.visible!==undefined)item.visible=true;}
    else{house.roof.visible=false;house.front.visible=false;house.door.visible=false;}
    for(const bus of world.buses)bus.group.visible=false;
    for(const car of world.policeCars)car.group.visible=false;for(const truck of world.fireTrucks)truck.group.visible=false;for(const ambulance of world.ambulances)ambulance.group.visible=false;for(const fire of world.fires)fire.group.visible=false;
    const entry=safePointNear(Number.isFinite(house.entryX)?house.entryX:house.x,Number.isFinite(house.entryZ)?house.entryZ:house.z+1,{ignoreTraffic:true,ignoreHouseId:house.id,allowWater:false,radius:.35,distances:[0,.5,1]});
    player.x=entry.x;player.z=entry.z;player.y=entry.y;player.vx=player.vz=player.vy=0;player.grounded=true;updateCamera(1);auditPlayerMode('enter-interior');
    if(house.id==='home')setFlag('enteredHome');toast(`Entrou: ${house.name}`,'good');updateContext(true);savePlayerPosition(true);return true;
  }
  function exitHouse(){
    if(!currentHouse)return false;const h=currentHouse;
    if(h.exteriorGroup){h.exteriorGroup.visible=true;if(h.interiorGroup)h.interiorGroup.visible=false;for(const item of h.interiorObjects||[])if(item?.visible!==undefined)item.visible=false;}
    else{h.roof.visible=true;h.front.visible=true;h.door.visible=true;}
    for(const bus of world.buses)bus.group.visible=true;
    for(const car of world.policeCars)car.group.visible=true;for(const truck of world.fireTrucks)truck.group.visible=true;for(const ambulance of world.ambulances)ambulance.group.visible=true;for(const fire of world.fires)fire.group.visible=!!fire.active;
    currentHouse=null;cameraMode='openworld';cameraYaw=Number.isFinite(enterHouse.outdoorYaw)?enterHouse.outdoorYaw:0;clearMovementInputs();
    const preferred=enterHouse.outdoorPosition||{x:Number.isFinite(h.exitX)?h.exitX:h.x,z:Number.isFinite(h.exitZ)?h.exitZ:h.z+5.3};const safe=safePointNear(Number.isFinite(h.exitX)?h.exitX:preferred.x,Number.isFinite(h.exitZ)?h.exitZ:preferred.z,{ignoreTraffic:false,allowWater:false,radius:.44});
    player.x=safe.x;player.z=safe.z;player.y=safe.y;player.vx=player.vz=player.vy=0;player.grounded=true;rememberSafePlayerPosition(true);auditPlayerMode('exit-interior');toast(`Saiu: ${h.name}.`,'good');savePlayerPosition(true);return true;
  }


  function openHomeChest(){
    const keys=[['wood','Madeira','🪵'],['stone','Pedra','🪨'],['goldOre','Minério de ouro','🟨'],['goldBar','Barra de ouro','🏅'],['food','Comida','🍎'],['water','Água','💧'],['crystals','Cristais','💎']];
    const rows=keys.map(([key,name,icon])=>`<div class="storage-row"><span>${icon} ${name}</span><b>Mochila ${state.inventory[key]||0} • Baú ${state.homeStorage[key]||0}</b><div><button data-store="${key}">Guardar 1</button><button data-take="${key}">Retirar 1</button></div></div>`).join('');
    openModal(`Baú da casa de ${playerDisplayName()}`,`<p>Guarde recursos sem abrir o inventário geral.</p><div class="storage-list">${rows}</div>`,root=>{
      $$('[data-store]',root).forEach(btn=>btn.onclick=()=>{const key=btn.dataset.store;if((state.inventory[key]||0)<=0){toast('Você não tem esse item.','warn');return;}state.inventory[key]--;state.homeStorage[key]=(state.homeStorage[key]||0)+1;saveState(true);openHomeChest();});
      $$('[data-take]',root).forEach(btn=>btn.onclick=()=>{const key=btn.dataset.take;if((state.homeStorage[key]||0)<=0){toast('O baú não tem esse item.','warn');return;}state.homeStorage[key]--;state.inventory[key]=(state.inventory[key]||0)+1;saveState(true);openHomeChest();});
    });
  }
