/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 17-adventures-learning-world.js
 * Escopo: Castelo, aventuras, desafios e praça educacional
 * Linhas de origem V642: 2865-2924
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function createRoyalCastle(x,z){
    const g=new THREE.Group();g.position.set(x,0,z);worldGroup.add(g);const stone=0x8996a5,dark=0x657587,trim=0xc9d0d8,roof=0x315aa8,gold=0xf5c846;
    const moatA=premiumBox(8.2,.18,2.5,materials.water,-8.1,.08,-13.8,g),moatB=premiumBox(8.2,.18,2.5,materials.water,8.1,.08,-13.8,g),moatBack=premiumBox(27,.18,2.2,materials.water,0,.08,13.5,g);for(const water of [moatA,moatB,moatBack])water.material.depthWrite=false;
    premiumBox(31,.7,25,dark,0,.35,0,g);premiumBox(27,.45,21,0xb5bac1,0,.82,0,g);
    premiumBox(10,6.4,2.1,stone,-8.5,4, -10,g);premiumBox(10,6.4,2.1,stone,8.5,4,-10,g);premiumBox(27,6.4,2.1,stone,0,4,10,g);premiumBox(2.1,6.4,18,stone,-13.5,4,0,g);premiumBox(2.1,6.4,18,stone,13.5,4,0,g);
    premiumBox(10,8.5,8.5,dark,0,5.1,3.5,g);premiumBox(8.6,7.5,7.2,stone,0,5.4,2.8,g);premiumBox(4.2,4.8,.8,0x20364f,0,3.2,-1.05,g);
    for(const [tx,tz] of [[-13,-10],[13,-10],[-13,10],[13,10]]){premiumCylinder(3.6,10,stone,tx,5.5,tz,g,12);premiumCylinder(4,1.1,trim,tx,10.2,tz,g,12);const cone=new THREE.Mesh(new THREE.ConeGeometry(4.25,4.8,12),renderMat(roof,{roughness:.55,metalness:.08}));cone.position.set(tx,13.05,tz);cone.castShadow=true;g.add(cone);premiumBox(.16,2,.16,gold,tx,16.2,tz,g);const flag=premiumBox(1.8,.8,.08,0xe43d4c,tx+.9,16.7,tz,g);flag.rotation.y=.15;}
    const battlement=(px,pz,alongX,count)=>{for(let i=0;i<count;i++){const offset=(i-(count-1)/2)*2.15;premiumBox(1.25,1.15,1.25,trim,px+(alongX?offset:0),7.75,pz+(alongX?0:offset),g);}};battlement(-8.3,-10,true,4);battlement(8.3,-10,true,4);battlement(0,10,true,11);battlement(-13.5,0,false,7);battlement(13.5,0,false,7);
    for(const wx of [-4.8,0,4.8]){premiumBox(1.2,1.9,.18,0x5ee7ff,wx,6.7,-1.05,g);premiumBox(.12,1.9,.2,trim,wx,6.7,-1.15,g);}premiumBox(5.2,.35,5.8,materials.wood,0,.34,-12.3,g);
    for(const px of [-9,-5,5,9]){premiumCylinder(.48,.56,0xc88a45,px,1.1,4.8,g,10);premiumBox(.82,.3,.82,px<0?0xff6fa8:0xffd34d,px,1.55,4.8,g);}
    for(const a of [-1,1]){const chain=premiumCylinder(.08,5.5,0x333b45,a*2.2,2.8,-11.4,g,8);chain.rotation.x=Math.PI/2;chain.rotation.z=.1*a;}const crown=new THREE.Mesh(new THREE.OctahedronGeometry(.85,0),mat(gold,{emissive:0xb87900,emissiveIntensity:.7}));crown.position.set(0,10.7,2.5);g.add(crown);addGlow(x,10.7,z+2.5,gold,5);
    createSignpost(x-8,z-13,'Castelo Real',0);
    const hall=new THREE.Group();hall.position.set(x,0,z);hall.visible=false;worldGroup.add(hall);
    premiumBox(18,.18,13.2,materials.interiorFloor,0,.1,0,hall);premiumBox(18,5,.35,renderMat(0x718096,{roughness:.78}),0,2.5,6.35,hall);premiumBox(.35,5,13,renderMat(0x718096,{roughness:.78}),-8.8,2.5,0,hall);premiumBox(.35,5,13,renderMat(0x718096,{roughness:.78}),8.8,2.5,0,hall);
    for(const px of [-6.6,-3.3,0,3.3,6.6]){premiumBox(1.8,3.0,.12,px===0?0xffd34d:0x315aa8,px,3.15,6.14,hall);premiumBox(.15,3.0,.18,0xe7e9ee,px,3.15,6.05,hall);}
    premiumBox(4.8,.65,3.1,0x9b6a38,0,.42,3.25,hall);premiumBox(2.5,2.4,1.4,0x7a2434,0,1.75,3.7,hall);premiumBox(2.85,.35,1.75,0xf0c85b,0,2.8,3.62,hall);premiumBox(.22,2.3,.22,0xf0c85b,-1.1,1.75,3.6,hall);premiumBox(.22,2.3,.22,0xf0c85b,1.1,1.75,3.6,hall);
    for(const side of [-1,1]){premiumBox(5.4,.12,1.3,0xcaa76b,side*4.8,.62,-.45,hall);for(const px of [-1.8,0,1.8])premiumBox(.18,.55,.18,0x70452e,side*4.8+px,.3,-.45,hall);}
    for(const [px,pz,c] of [[-6.4,-4.6,0x315aa8],[6.4,-4.6,0xe43d4c],[-6.4,2.2,0xe43d4c],[6.4,2.2,0x315aa8]]){premiumCylinder(.34,2.6,0xd6b866,px,1.3,pz,hall,12);const flame=new THREE.Mesh(new THREE.ConeGeometry(.38,.85,10),renderMat(c,{emissive:c,emissiveIntensity:.75,roughness:.32}));flame.position.set(px,3,pz);hall.add(flame);}
    const castleHouse={id:'castle-hall',name:'Salão Real do Castelo',x,z,w:18,d:13,publicBuilding:true,roof:new THREE.Group(),front:new THREE.Group(),door:new THREE.Group(),exteriorGroup:g,interiorGroup:hall,interiorObjects:[],interiorBounds:{x:8.25,z:5.65},entryX:x,entryZ:z-4.7,exitX:x,exitZ:z-14.2};world.houses.push(castleHouse);
    registerInteractable({id:'castle-enter',type:'door',icon:'🚪',label:'Entrar no Castelo',x,z:z-11.6,radius:3.6,priority:235,action:()=>handleHouseDoor(castleHouse)});
    registerInteractable({id:'castle-exit',type:'exit',icon:'🚪',label:'Sair do Castelo',x,z:z-5.45,radius:2,priority:245,houseId:'castle-hall',action:()=>exitHouse()});
    registerInteractable({id:'castle-throne',type:'activity',icon:'👑',label:'Sentar no trono',x,z:z+3.55,radius:2.2,priority:190,houseId:'castle-hall',action:()=>{player.sitUntil=performance.now()+2600;state.needs.fun=clamp(state.needs.fun+18,0,100);toast('Você visitou o trono real!','good');}});
    registerInteractable({id:'castle-wardrobe',type:'activity',icon:'👕',label:'Abrir guarda-roupa real',x:x-6.6,z:z+2.1,radius:2.1,priority:185,houseId:'castle-hall',action:openAvatarStudio});
    registerInteractable({id:'castle-adventures-inside',type:'adventure',icon:'🏰',label:'Mesa de desafios do Castelo',x:x+5.1,z:z-.45,radius:2.5,priority:195,houseId:'castle-hall',action:openAdventureHub});
    registerInteractable({id:'castle-adventures',type:'adventure',icon:'🏰',label:'Desafios do Castelo',x,z:z-11.5,radius:5.2,priority:195,action:openAdventureHub});world.castle=g;world.castleHouse=castleHouse;createCastleChallengeTokens();return g;
  }
  function createCastleChallengeTokens(){
    const coords=[[-10,-7],[10,-7],[-10,7],[10,7],[0,5],[-6,1]];world.challengeTokens=coords.map(([dx,dz],i)=>{const mesh=new THREE.Mesh(new THREE.OctahedronGeometry(.62,0),mat(0xffd34d,{emissive:0xc68400,emissiveIntensity:1.1,metalness:.22,roughness:.25}));mesh.position.set(88+dx,1.5,62+dz);mesh.visible=false;worldGroup.add(mesh);return{id:`crown-${i}`,x:88+dx,z:62+dz,mesh,got:false};});
  }
  function openAdventureHub(){
    const active=world.activeChallenge,completed=new Set(state.adventures.completed||[]);openModal('Desafios da cidade',`${active?`<div class="active-adventure"><b>${ADVENTURE_DEFS[active.type]?.icon} Em andamento: ${ADVENTURE_DEFS[active.type]?.name}</b><span>${active.progress.size}/${active.target}</span></div>`:''}<div class="adventure-grid">${Object.entries(ADVENTURE_DEFS).map(([id,d])=>`<button class="adventure-card ${completed.has(id)?'completed':''}" data-adventure="${id}" ${active?'disabled':''}><span>${d.icon}</span><b>${d.name}</b><small>${d.description}</small><em>${completed.has(id)?'✓ Concluído':`${d.reward} moedas • ${d.xp} XP`}</em></button>`).join('')}</div>`,root=>{$$('[data-adventure]',root).forEach(btn=>btn.onclick=()=>startAdventure(btn.dataset.adventure));});
  }
  function startAdventure(type){
    const def=ADVENTURE_DEFS[type];if(!def||world.activeChallenge||activeRace)return false;if(type==='castle'&&Math.hypot(player.x-88,player.z-52)>15){setWaypoint('castle');toast('Siga a rota até o Castelo para começar.','good',2200);return false;}closeModal();const startedAt=Date.now(),endsAt=type==='castle'?startedAt+75000:0;world.activeChallenge={type,target:def.target,progress:new Set(),startedAt:performance.now(),endsAt:type==='castle'?performance.now()+75000:0};state.adventures.active={type,startedAt,endsAt,progress:[]};if(type==='castle')for(const token of world.challengeTokens){token.got=false;token.mesh.visible=true;}els.raceBadge.hidden=false;els.raceTitle.textContent=`${def.icon} ${def.name}`;els.raceStatus.textContent=`0/${def.target}`;toast(`${def.name} começou!`,'good',1900);saveState(true);return true;
  }
  function restoreActiveAdventure(){
    const saved=state.adventures?.active,def=ADVENTURE_DEFS[saved?.type];if(!saved||!def)return false;const progress=new Set(Array.isArray(saved.progress)?saved.progress:[]),elapsed=Math.max(0,Date.now()-Number(saved.startedAt||Date.now())),remaining=saved.type==='castle'?Math.max(5000,Number(saved.endsAt||Date.now()+75000)-Date.now()):0;
    world.activeChallenge={type:saved.type,target:def.target,progress,startedAt:performance.now()-elapsed,endsAt:saved.type==='castle'?performance.now()+remaining:0};
    if(saved.type==='castle')for(const token of world.challengeTokens){token.got=progress.has(token.id);token.mesh.visible=!token.got;}
    els.raceBadge.hidden=false;els.raceTitle.textContent=`${def.icon} ${def.name}`;els.raceStatus.textContent=`${progress.size}/${def.target}`;return true;
  }
  function advanceAdventure(type,key){
    const active=world.activeChallenge;if(!active||active.type!==type||active.progress.has(key))return false;active.progress.add(key);if(state.adventures.active){state.adventures.active.progress=[...active.progress];state.adventures.active.updatedAt=Date.now();}els.raceStatus.textContent=`${active.progress.size}/${active.target}`;beep(780,55,'sine');if(active.progress.size>=active.target)finishAdventure(true);else saveState();return true;
  }
  function finishAdventure(success){
    const active=world.activeChallenge;if(!active)return;const def=ADVENTURE_DEFS[active.type];for(const token of world.challengeTokens)token.mesh.visible=false;world.activeChallenge=null;state.adventures.active=null;els.raceBadge.hidden=true;if(success){if(!state.adventures.completed.includes(active.type))state.adventures.completed.push(active.type);const elapsed=(performance.now()-active.startedAt)/1000,stateBest=Number(state.adventures.bestTimes[active.type]||Infinity);state.adventures.bestTimes[active.type]=Math.min(stateBest,elapsed);addCoins(def.reward);addXP(def.xp);addReputation(8);awardMedal(def.name);if(active.type==='castle')setFlag('castleChallenge');toast(`Desafio concluído! +${def.reward} moedas`,'good',2600);}else toast('Tempo esgotado. Tente novamente!','warn',2200);saveState(true);
  }
  function updateAdventure(){
    const active=world.activeChallenge;if(!active)return;if(active.type==='castle'){if(performance.now()>=active.endsAt){finishAdventure(false);return;}for(const token of world.challengeTokens){if(token.got)continue;token.mesh.rotation.y+=.08;token.mesh.position.y=1.45+Math.sin(animTime*3+token.x)*.18;if(Math.hypot(player.x-token.x,player.z-token.z)<1.5){token.got=true;token.mesh.visible=false;advanceAdventure('castle',token.id);}}if(world.activeChallenge)els.raceStatus.textContent=`${active.progress.size}/${active.target} • ${Math.ceil((active.endsAt-performance.now())/1000)} s`;}}

  function createLearningStation(id,subject,x,z,color,icon,label){
    const g=new THREE.Group();g.position.set(x,0,z);worldGroup.add(g);premiumBox(2.5,.35,2.5,0x34485e,0,.18,0,g);premiumBox(1.7,2.1,1.2,color,0,1.35,0,g);const panel=new THREE.Mesh(new THREE.PlaneGeometry(1.25,1.25),new THREE.MeshStandardMaterial({map:iconTexture(icon,color,'#ffffff'),roughness:.35,emissive:new THREE.Color(color),emissiveIntensity:.12,side:THREE.DoubleSide}));panel.position.set(0,1.55,.63);g.add(panel);const beacon=new THREE.Mesh(new THREE.OctahedronGeometry(.34,0),mat(color,{emissive:color,emissiveIntensity:1.1}));beacon.position.y=2.75;g.add(beacon);registerInteractable({id:`learning-${id}`,type:'education',icon,label,x,z,radius:3,priority:130,action:()=>openEducationHub(subject)});world.landmarks.push(g);return g;
  }
  function createLearningPlaza(){createLearningStation('math','math',22,-32,0x27b36a,'＋','Jogar Matemática Kids');createLearningStation('portuguese','portuguese',22,-40,0x7b5ce6,'A','Jogar Português Kids');createLearningStation('english','english',22,-48,0x168de2,'E','Jogar English Kids');createSignpost(22,-27,'Academia Kids',Math.PI/2);}

  const FISH_SPECIES=[
    {name:'Tilápia',rarity:'comum',weight:44,min:.25,max:1.8,xp:16,coins:5},{name:'Lambari',rarity:'comum',weight:30,min:.08,max:.35,xp:10,coins:3},{name:'Traíra',rarity:'incomum',weight:16,min:.5,max:2.8,xp:28,coins:9},{name:'Pacu',rarity:'raro',weight:8,min:1.1,max:4.8,xp:44,coins:16},{name:'Dourado',rarity:'lendário',weight:2,min:2.0,max:7.2,xp:90,coins:35}
  ];
  let fishingSession=null,fishingVisual=null,fishingCameraState=null,waterWarningAt=0,boatPanel=null,extensionPreview=null,extensionDraft=null;
  const ROOM_SPECS={bedroom:{name:'Quarto',icon:'🛏️',color:0x4f8ed7,cost:{wood:8,stone:4,blocks:4}},living:{name:'Sala',icon:'🛋️',color:0xe4a044,cost:{wood:7,stone:4,blocks:5}},kitchen:{name:'Cozinha',icon:'🍳',color:0xe8d7bd,cost:{wood:7,stone:6,blocks:4}},bathroom:{name:'Banheiro',icon:'🚿',color:0x65c7df,cost:{wood:5,stone:8,blocks:4}},workroom:{name:'Oficina',icon:'🛠️',color:0x7f8c98,cost:{wood:8,stone:8,blocks:6}},porch:{name:'Varanda',icon:'🌤️',color:0xb77942,cost:{wood:10,stone:2,blocks:2}},storage:{name:'Depósito',icon:'📦',color:0x94633b,cost:{wood:9,stone:5,blocks:4}}};
