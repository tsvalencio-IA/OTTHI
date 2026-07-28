/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 13-houses-npcs-vehicles-base.js
 * Escopo: Casas, interiores, NPCs, inimigos, cristais, veículos e academia
 * Linhas de origem V642: 2185-2417
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function shadeColor(hex,amount){
    const r=Math.max(0,Math.min(255,((hex>>16)&255)+amount));
    const g=Math.max(0,Math.min(255,((hex>>8)&255)+amount));
    const b=Math.max(0,Math.min(255,(hex&255)+amount));
    return (r<<16)|(g<<8)|b;
  }
  function decorateHouseCommercial(house,config){
    const {id,x,z,color,roofColor,publicBuilding}=config,trim=shadeColor(color,38),dark=shadeColor(color,-44);
    premiumBox(9.3,.18,.22,dark,x,2.76,z+3.5,house.front);
    makePlanter(house.front,x-2.45,.88,z+3.68,id==='blue'?0x52c7ff:id==='pink'?0xff6ba7:0xffd34d);makePlanter(house.front,x+2.45,.88,z+3.68,0x75e56e);
    if(publicBuilding){
      const awningColor=id==='shop'?0xe5483e:0x2f7fd8;
      for(let i=-4;i<=4;i++)box(.58,.18,1.25,i%2?0xfff5df:awningColor,x+i*.58,2.44,z+3.92,house.front);
      premiumBox(4.5,.78,.24,0x18334d,x,3.08,z+3.6,house.front);
      premiumBox(.62,.45,.62,trim,x-3.25,3.32,z+3.55,house.front);premiumBox(.62,.45,.62,trim,x+3.25,3.32,z+3.55,house.front);
    }else{
      premiumBox(2.25,.24,1.1,trim,x,2.37,z+3.78,house.front);premiumBox(.18,1.12,.18,trim,x-.9,1.77,z+3.8,house.front);premiumBox(.18,1.12,.18,trim,x+.9,1.77,z+3.8,house.front);
    }
    premiumBox(.45,1.2,.45,shadeColor(roofColor,-35),x+2.8,4.6,z-1.4,house.roof);premiumBox(.65,.18,.65,0xd8dce2,x+2.8,5.22,z-1.4,house.roof);
    house.roof.traverse(o=>{if(o.isMesh&&o.geometry?.type==='BoxGeometry')addVoxelOutline(o,0x182238,.24)});
    house.front.traverse(o=>{if(o.isMesh&&o.geometry?.type==='BoxGeometry')addVoxelOutline(o,0x182238,.25)});
  }

  function createHouse(config) {
    const {id,name,x,z,color,roofColor,price=0,publicBuilding=false}=config;
    const house={id,name,x,z,w:9,d:7,color,roofColor,price,publicBuilding,roof:new THREE.Group(),front:new THREE.Group(),interiorObjects:[],owned:!!state.houses[id]?.owned};
    worldGroup.add(house.roof,house.front);
    const wallTexture=id.startsWith('school')?textures.schoolWall:id.startsWith('police')?textures.policeWall:id==='fire-station'?textures.fireWall:id.startsWith('shop')?textures.marketWall:textures.brick,wallMat=tintedBrickMaterial(color,wallTexture),roofMat=texturedRoofMaterial(roofColor),roofLight=texturedRoofMaterial(shadeColor(roofColor,18)),corner=renderMat(new THREE.Color(color).lerp(new THREE.Color(0xffffff),.48).getHex(),{roughness:.78});
    const floorMat=id.startsWith('school')?materials.schoolFloor:id.startsWith('shop')?materials.marketFloor:(id.startsWith('police')||id==='fire-station')?materials.concrete:materials.interiorFloor;box(9,.25,7,floorMat,x,.12,z);
    box(9,2.8,.35,wallMat,x,1.5,z-3.32);box(.35,2.8,7,wallMat,x-4.32,1.5,z);box(.35,2.8,7,wallMat,x+4.32,1.5,z);
    box(3.6,2.8,.35,wallMat,x-2.7,1.5,z+3.32,house.front);box(3.6,2.8,.35,wallMat,x+2.7,1.5,z+3.32,house.front);
    for(const cx of [-4.12,4.12]){box(.24,2.82,.4,corner,x+cx,1.5,z-3.28);box(.24,2.82,.4,corner,x+cx,1.5,z+3.28,house.front);}
    box(9.8,.62,7.75,roofMat,x,3.18,z,house.roof);box(8.8,.35,6.8,roofLight,x,3.55,z,house.roof);
    box(7.5,.42,7.15,roofMat,x,3.86,z,house.roof);box(5.9,.4,5.85,texturedRoofMaterial(shadeColor(roofColor,26)),x,4.18,z,house.roof);
    const spotMat=renderMat(0xfff2df,{roughness:.52});
    [[-2.5,-1.7],[2.25,-1.45],[-.4,1.8],[1.2,.5],[-1.2,-.1]].forEach(([ox,oz],i)=>box(i%2?.72:.88,.16,i%2?.72:.88,spotMat,x+ox,4.42,z+oz,house.roof));
    const door=box(1.45,2.25,.18,materials.wood,x,1.12,z+3.48);door.userData.houseId=id;
    box(.18,2.0,.2,corner,x-.83,1.16,z+3.46,house.front);box(.18,2.0,.2,corner,x+.83,1.16,z+3.46,house.front);
    makeWindow(house.front,x-2.4,1.45,z+3.52,1.12,.86,0xf6efe1);makeWindow(house.front,x+2.4,1.45,z+3.52,1.12,.86,0xf6efe1);
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(1.8,.66),new THREE.MeshStandardMaterial({map:signTexture(name,'#18334d','#ffffff'),roughness:.65,side:THREE.DoubleSide}));
    sign.position.set(x,2.36,z+3.58);house.front.add(sign);
    box(.16,.55,.16,materials.wood,x-1.55,.28,z+4.7);box(.36,.25,.24,shadeColor(color,12),x-1.55,.62,z+4.7);
    if(!publicBuilding){createFlower(x-3.1,z+4.7,shadeColor(0xff70c8,(id.charCodeAt(0)%3)*20-20));createFlower(x+3.1,z+4.7,0xffdf55);}
    createLamp(x-3.7,z+4.0);createLamp(x+3.7,z+4.0);
    house.door=door;
    registerCollider(x,z-3.32,9,.35,{houseId:id});registerCollider(x-4.32,z,.35,7,{houseId:id});registerCollider(x+4.32,z,.35,7,{houseId:id});registerCollider(x-2.7,z+3.32,3.6,.35,{houseId:id});registerCollider(x+2.7,z+3.32,3.6,.35,{houseId:id});
    world.houses.push(house);registerInteractable({id:`door-${id}`,type:'door',icon:'🚪',label:`Abrir: ${name}`,x,z:z+4.0,radius:2.5,priority:230,action:()=>handleHouseDoor(house)});
    decorateHouseCommercial(house,config);return house;
  }

  function addHouseInterior(house, type='home') {
    if(type==='home'){
      const bed=createFurniture(house,'bed',-2.85,-1.95,0,'Dormir');
      const sofa=createFurniture(house,'sofa',.85,-1.95,0x8b5cf6,'Sentar no sofá');
      const tv=createFurniture(house,'tv',2.85,-.25,0,'Assistir televisão');
      const fridge=createFurniture(house,'fridge',-3.05,1.55,0,'Abrir geladeira');
      const stove=createFurniture(house,'stove',-1.65,1.55,0,'Cozinhar');
      const sink=createFurniture(house,'sink',-.25,1.55,0,'Beber água');
      const shower=createFurniture(house,'shower',3.1,1.6,0,'Tomar banho');
      const chest=createFurniture(house,'chest',3.15,-2.05,0,'Abrir baú');
      const wardrobe=createFurniture(house,'wardrobe',2.95,.65,0,'Trocar roupa');
      createFurniture(house,'table',-1.6,.15,0,'Mesa de refeições');createFurniture(house,'plant',1.65,.55,0,'Planta da casa');
      premiumBox(3.5,.04,2.2,0xd6a65d,house.x-1.7,.18,house.z+1.45,worldGroup,0x765228);
      premiumBox(3.2,.04,2.0,0x7057b7,house.x+1.1,.18,house.z-1.85,worldGroup,0x3f2c65);
      premiumBox(8.1,.12,.18,0x63b4e8,house.x,.78,house.z-3.08);premiumBox(.18,2.0,.18,0x63b4e8,house.x-3.9,1.05,house.z-2.95);premiumBox(.18,2.0,.18,0x63b4e8,house.x+3.9,1.05,house.z-2.95);
      const lampA=addGlow(house.x-2.1,2.25,house.z-.1,0xffc66e,5),lampB=addGlow(house.x+2.1,2.25,house.z-.1,0xffc66e,5);house.interiorObjects.push(lampA,lampB);
      registerActivity(house,bed,'bed');registerActivity(house,sofa,'sofa');registerActivity(house,tv,'tv');registerActivity(house,fridge,'fridge');registerActivity(house,stove,'stove');registerActivity(house,sink,'sink');registerActivity(house,shower,'shower');registerActivity(house,chest,'chest');registerActivity(house,wardrobe,'wardrobe');
    } else if(type==='shop'){
      premiumBox(8.2,.08,6.2,materials.marketFloor,house.x,.16,house.z);premiumBox(8.1,1.15,.12,materials.marketWall,house.x,.72,house.z-3.08);
      const table=createFurniture(house,'table',0,2.05,0,'Comprar itens');registerActivity(house,table,'shop');
      for(const x of [-2.7,0,2.7]){createFurniture(house,'bookshelf',x,-1.35,0,'Prateleira de produtos');for(const z of [-.95,-1.65])premiumBox(.55,.32,.42,[0xffd84d,0x5bd18b,0xff7b72][Math.abs(Math.round(x))%3],house.x+x,.95,house.z+z);}
      createFurniture(house,'fridge',3.05,1.25,0,'Geladeira de bebidas');createFurniture(house,'plant',-3.2,2.1,0,'Horta do mercado');
      const lampA=addGlow(house.x-2.3,2.35,house.z,0xffffff,5),lampB=addGlow(house.x+2.3,2.35,house.z,0xffffff,5);house.interiorObjects.push(lampA,lampB);premiumBox(2.4,.12,.82,0x4b7a5d,house.x-1.45,1.18,house.z+2.45);premiumBox(1.35,.42,.12,0xfff1b8,house.x-1.45,1.52,house.z+2.02);for(const px of [-2.8,-1.8,-.8,.8,1.8,2.8])premiumBox(.58,.08,.58,0xf7e9cb,house.x+px,2.55,house.z);
    } else if(type==='workshop'){
      const table=createFurniture(house,'table',0,-1.0,0,'Usar oficina');registerActivity(house,table,'workshop');
      createFurniture(house,'chest',2.8,-1.8,0,'Baú de ferramentas');
    } else if(type==='school'){
      premiumBox(8.2,.08,6.2,materials.schoolFloor,house.x,.16,house.z);premiumBox(8.1,1.0,.12,materials.interiorWall,house.x,.68,house.z-3.08);
      const board=createFurniture(house,'board',0,-2.75,0,'Começar aula');registerActivity(house,board,'school');
      for(const [x,z] of [[-2.6,-1.2],[0,-1.2],[2.6,-1.2],[-2.6,.65],[0,.65],[2.6,.65]])createFurniture(house,'desk',x,z,0,'Carteira escolar');
      createFurniture(house,'bookshelf',3.25,2.15,0,'Biblioteca');createFurniture(house,'plant',-3.3,2.1,0,'Horta da turma');createFurniture(house,'desk',0,2.15,0,'Mesa do professor');const teacherWardrobe=createFurniture(house,'wardrobe',-3.25,1.15,0,'Uniformes profissionais');registerActivity(house,teacherWardrobe,'wardrobe');for(const x of [-2.6,0,2.6])premiumBox(.7,.85,.28,0x4a90c4,house.x+x,.62,house.z+2.78);for(const [px,c] of [[-2.5,0xffd34d],[0,0x64d986],[2.5,0xff728e]])premiumBox(1.45,.85,.08,c,house.x+px,1.75,house.z-3.0);for(const px of [-2.7,0,2.7])premiumBox(.72,.08,.72,0xfff4d8,house.x+px,2.58,house.z);const lampA=addGlow(house.x-2.4,2.35,house.z,0xfff6cf,5),lampB=addGlow(house.x+2.4,2.35,house.z,0xfff6cf,5);house.interiorObjects.push(lampA,lampB);
    } else if(type==='police'){
      premiumBox(8.2,.08,6.2,materials.concrete,house.x,.16,house.z);premiumBox(8.1,1.05,.12,materials.interiorWall,house.x,.7,house.z-3.08);
      const radio=createFurniture(house,'radio',-2.7,-1.4,0,'Central de segurança');registerActivity(house,radio,'police');
      createFurniture(house,'desk',0,-1.1,0,'Mesa da patrulha');createFurniture(house,'bench',2.5,1.8,0,'Banco de espera');
      createFurniture(house,'board',0,2.7,0,'Regras de trânsito');createFurniture(house,'bookshelf',-3.25,1.7,0,'Guias de segurança');const policeWardrobe=createFurniture(house,'wardrobe',3.15,-1.85,0,'Armário de uniformes');registerActivity(house,policeWardrobe,'wardrobe');premiumBox(8.0,.22,.1,0x245da8,house.x,1.08,house.z-3.0);for(const px of [-1.0,0,1.0])premiumBox(.72,.42,.08,0x7edfff,house.x+px,1.48,house.z-2.94);premiumBox(1.65,.08,1.0,0x2a4058,house.x,2.55,house.z);
    } else if(type==='firestation'){
      premiumBox(8.2,.08,6.2,materials.concrete,house.x,.16,house.z);premiumBox(8.1,1.05,.12,materials.fireWall||materials.interiorWall,house.x,.7,house.z-3.08);
      const dispatch=createFurniture(house,'radio',-2.5,-1.35,0,'Central dos bombeiros');registerActivity(house,dispatch,'firestation');
      createFurniture(house,'desk',0,-1.15,0,'Mesa de emergência');const fireWardrobe=createFurniture(house,'wardrobe',2.9,-1.5,0,'Uniformes de bombeiro');registerActivity(house,fireWardrobe,'wardrobe');createFurniture(house,'bench',0,1.7,0,'Banco da equipe');createFurniture(house,'board',-2.8,2.35,0,'Treinamento de segurança');
      for(const x of [1.75,2.45,3.15])premiumCylinder(.18,1.7,0xe24b3f,house.x+x,.9,house.z+2.45,worldGroup,12);for(let line=-3;line<=3;line+=1.2)premiumBox(.48,.025,5.6,line<0?0xf1c83b:0x222b34,house.x+line,.205,house.z);for(const px of [-2.9,-2.15,-1.4]){premiumBox(.62,1.65,.55,0xc43d38,house.x+px,.88,house.z+2.35);premiumBox(.5,.18,.62,0xf1cc3d,house.x+px,1.8,house.z+2.35);}premiumBox(2.2,.08,1.0,0xfff0cf,house.x,2.55,house.z);
    } else if(type==='neighbor'){
      const sofa=createFurniture(house,'sofa',1,-1.5,0xef6c9d,'Sentar');registerActivity(house,sofa,'sofa');
      const tv=createFurniture(house,'tv',1,.2,0,'Assistir TV');registerActivity(house,tv,'tv');
      createFurniture(house,'bed',-2.5,-1.7,0,'Cama');
    }
    registerInteractable({id:`exit-${house.id}`,type:'exit',icon:'🚪',label:'Sair da casa',x:house.x,z:house.z+2.65,radius:1.5,priority:240,houseId:house.id,action:()=>exitHouse()});
  }
  function registerActivity(house,item,activity){
    const priority=({stove:180,fridge:170,sink:165,bed:160,shower:155,tv:150,sofa:145,wardrobe:140,chest:120,shop:170,workshop:170,school:185,police:185,firestation:190})[activity]||100;
    registerInteractable({id:`${activity}-${house.id}`,type:'activity',activity,icon:activityIcon(activity),label:item.label,x:item.x,z:item.z,radius:1.75,priority,houseId:house.id,action:()=>useActivity(activity,house)});
  }
  function activityIcon(type){return ({bed:'🛏',sofa:'🛋',tv:'📺',fridge:'🍎',stove:'🍳',sink:'💧',shower:'🚿',chest:'🎁',shop:'🛒',workshop:'🛠',wardrobe:'👕',school:'🏫',police:'🛡️',firestation:'🚒'})[type]||'✋';}

  function createNPC(id,name,x,z,color,pathRadius=3){
    const group=new THREE.Group();group.position.set(x,0,z);worldGroup.add(group);
    const hairPalette=[0x3b2415,0x111214,0xd9b45a,0xa4471f,0x2b3a55,0x8a8f99],skinPalette=[0xffd3a0,0xe7ad7d,0xb97853,0x8e5a3e];
    const hash=String(id).split('').reduce((a,c)=>a+c.charCodeAt(0),0),hairColor=hairPalette[hash%hairPalette.length],skin=skinPalette[hash%skinPalette.length];
    const shirt=renderMat(color,{roughness:.68}),shirtDark=renderMat(shadeColor(color,-28),{roughness:.72}),pants=renderMat(hash%2?0x294b75:0x44356f,{roughness:.76}),shoe=renderMat(hash%3===0?0xffffff:0x1b2635,{roughness:.58});
    const body=box(.82,1.06,.58,shirt,0,1.13,0,group),head=box(.7,.7,.7,skin,0,2.03,0,group);
    box(.76,.18,.64,hairColor,0,2.38,0,group);if(hash%3===0){box(.18,.42,.58,hairColor,-.34,2.15,0,group);box(.18,.42,.58,hairColor,.34,2.15,0,group);}else if(hash%3===1){box(.72,.12,.12,hairColor,0,2.14,.34,group);}
    box(.09,.09,.04,0x111827,-.16,2.08,.37,group);box(.09,.09,.04,0x111827,.16,2.08,.37,group);box(.18,.05,.04,0xa84b4b,0,1.91,.37,group);
    box(.72,.14,.6,shirtDark,0,.66,0,group);
    const leftArm=new THREE.Group(),rightArm=new THREE.Group(),leftLeg=new THREE.Group(),rightLeg=new THREE.Group();
    leftArm.position.set(-.52,1.4,0);rightArm.position.set(.52,1.4,0);leftLeg.position.set(-.21,.74,0);rightLeg.position.set(.21,.74,0);group.add(leftArm,rightArm,leftLeg,rightLeg);
    for(const arm of [leftArm,rightArm]){box(.24,.48,.24,shirt,0,-.22,0,arm);box(.22,.25,.22,skin,0,-.58,0,arm);}
    for(const leg of [leftLeg,rightLeg]){box(.24,.58,.25,pants,0,-.28,0,leg);box(.27,.18,.34,shoe,0,-.65,.06,leg);}
    if(hash%4===0)box(.9,.18,.7,0x2f7ed6,0,2.48,0,group);
    const npc={id,name,x,z,baseX:x,baseZ:z,color,group,pathRadius,phase:Math.random()*6.28,friendship:state.friendship[id]||0,body,head,limbs:{leftArm,rightArm,leftLeg,rightLeg}};
    group.traverse(o=>{if(o.isMesh)addVoxelOutline(o,0x172033,.3);});
    const badge=new THREE.Sprite(new THREE.SpriteMaterial({map:iconTexture(name.charAt(0),'#ffffff','#15314b'),transparent:true,depthWrite:false}));badge.position.set(0,2.95,0);badge.scale.set(.55,.55,.55);badge.visible=false;group.add(badge);npc.badge=badge;
    world.npcs.push(npc);registerInteractable({id:`npc-${id}`,type:'npc',icon:'💬',label:`Conversar com ${name}`,radius:2.7,priority:160,getPos:()=>({x:npc.group.position.x,z:npc.group.position.z}),action:()=>talkToNPC(npc)});return npc;
  }
  function createNpcMobility(npc,type,route,speed){
    if(!npc||!Array.isArray(route)||route.length<2)return npc;const ride=new THREE.Group();npc.group.add(ride);const wheels=[];
    if(type==='car'){
      premiumBox(1.72,.34,2.45,0x24364d,0,.35,0,ride);premiumBox(1.55,.45,1.12,npc.color,0,.62,.43,ride);premiumBox(1.3,.4,.78,0x163049,0,.82,-.45,ride);
      for(const p of [[-.78,.28,-.72],[.78,.28,-.72],[-.78,.28,.72],[.78,.28,.72]]){const wheel=premiumCylinder(.28,.24,0x121821,p[0],p[1],p[2],ride,10);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}
    }else if(type==='moto'){
      for(const z of [-.72,.72]){const wheel=premiumCylinder(.34,.13,0x111822,0,.36,z,ride,12);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}premiumBox(.28,.26,1.15,npc.color,0,.58,0,ride);premiumBox(.56,.15,.42,0x202c3b,0,.76,-.12,ride);premiumBox(.7,.06,.08,0xd7e2eb,0,1.05,.53,ride);
    }else if(type==='bike'){
      for(const z of [-.72,.72]){const wheel=premiumCylinder(.34,.07,0x17202b,0,.36,z,ride,14);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}premiumBox(.08,.65,1.2,npc.color,0,.62,0,ride);premiumBox(.58,.07,.08,0xe8eef3,0,1.05,.62,ride);premiumBox(.45,.12,.34,0x25364a,0,.84,-.2,ride);
    }else{
      premiumBox(.62,.1,1.2,npc.color,0,.12,0,ride);for(const p of [[-.25,.08,-.42],[.25,.08,-.42],[-.25,.08,.42],[.25,.08,.42]]){const wheel=premiumCylinder(.09,.08,0x1c2633,p[0],p[1],p[2],ride,8);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}
    }
    ride.traverse(o=>{if(o.isMesh)addVoxelOutline(o,0x132238,.22);});const projected=route.map(p=>{const q=nearestRoadProjection({x:p[0],z:p[1]})?.point;return q?{x:q.x,z:q.z}:{x:p[0],z:p[1]};});npc.group.position.set(projected[0].x,0,projected[0].z);npc.baseX=projected[0].x;npc.baseZ=projected[0].z;npc.mobility={id:`mobility-${npc.id}`,type,route:projected,index:1,speed:speed||({car:4.4,moto:4.8,bike:3.2,skate:2.8})[type]||3,currentSpeed:0,radius:type==='car'?1.45:type==='moto'?.9:.7,group:npc.group,ride,wheels};return npc;
  }
  function createEnemy(type,x,z){
    const group=new THREE.Group();group.position.set(x,0,z);worldGroup.add(group);
    if(type==='slime'){box(1.35,.85,1.35,0x31c65b,0,.45,0,group);box(.18,.12,.05,0xff2441,-.28,.55,.7,group);box(.18,.12,.05,0xff2441,.28,.55,.7,group);}
    else if(type==='bat'){box(1.0,.75,1.0,0x35165e,0,1.4,0,group);box(.8,.18,.45,0x8c4ddb,-.8,1.4,0,group);box(.8,.18,.45,0x8c4ddb,.8,1.4,0,group);box(.12,.1,.05,0xff31f5,-.22,1.48,.54,group);box(.12,.1,.05,0xff31f5,.22,1.48,.54,group);}
    else {box(1.5,1.8,1.2,0x788495,0,1.0,0,group);box(1.0,.8,1.0,0x647080,0,2.2,0,group);box(.14,.1,.05,0xff293f,-.22,2.25,.52,group);box(.14,.1,.05,0xff293f,.22,2.25,.52,group);}
    const enemy={id:`enemy-${type}-${world.enemies.length}`,type,x,z,baseX:x,baseZ:z,group,hp:type==='golem'?3:1,phase:Math.random()*6.28,dead:false,lastHit:0};world.enemies.push(enemy);return enemy;
  }
  function createCrystal(x,y,z,secret=false){
    const mesh=new THREE.Mesh(new THREE.OctahedronGeometry(.48,0),mat(secret?0xa855f7:0x38d8ff,{emissive:secret?0x7e22ce:0x0a9dc0,emissiveIntensity:.7,metalness:.08,roughness:.22}));mesh.position.set(x,y,z);mesh.castShadow=true;worldGroup.add(mesh);addGlow(x,y,z,secret?0xa855f7:0x38d8ff,3);
    world.crystals.push({id:`crystal-${world.crystals.length}`,x,y,z,mesh,got:false,secret});
  }
  function createChest(id,x,z,secret=false){
    const group=new THREE.Group();group.position.set(x,0,z);worldGroup.add(group);box(1.2,.72,.9,materials.wood,0,.36,0,group);const lid=box(1.25,.22,.95,secret?0xa855f7:0xffd84d,0,.84,0,group);const chest={id,x,z,group,lid,opened:!!state.flags[`chest_${id}`],secret};if(chest.opened)lid.rotation.x=-.6;registerInteractable({id:`chest-${id}`,type:'chest',icon:'🎁',label:secret?'Pegar presente secreto':'Abrir presente/baú',x,z,radius:2,priority:200,action:()=>openChest(chest)});return chest;
  }
  function createPlatform(x,y,z,w=3,d=3,color=0x8b5a2b){box(w,y,d,color,x,y/2,z);registerPlatform(x,z,w,d,y);}
  function vehicleById(id){return (world.vehicles||[]).find(v=>v.id===id)||null;}
  function currentVehicleRef(){if(activeVehicleRef)return activeVehicleRef;const byId=vehicleById(player.car.id);if(byId)return byId;if(world.activeVehicle)return world.activeVehicle;return player.car.id?null:(world.vehicle||null);}
  function applyVehicleAppearance(vehicle){
    const a=vehicle?.appearance||{},m=vehicleVisual?.userData?.appearanceMaterials;if(!m)return;
    m.chassis.color.setHex(Number(a.chassis??0x26384e));m.primary.color.setHex(Number(a.primary??0xf28a22));m.primaryDark.color.setHex(Number(a.primaryDark??a.primary??0xc85b16));m.secondary.color.setHex(Number(a.secondary??0x0aa7b8));m.glass.color.setHex(Number(a.glass??0x102338));
    if(typeof applyServiceVehicleVisual==='function')applyServiceVehicleVisual(vehicle);
  }
  function persistParkedVehicle(vehicle){
    if(!vehicle||!state.vehicles)return;state.vehicles.parked[vehicle.id]={x:+vehicle.group.position.x.toFixed(2),z:+vehicle.group.position.z.toFixed(2),heading:+vehicle.group.rotation.y.toFixed(3)};state.vehicles.lastUsedId=vehicle.id;
  }
  function createToyCar(x,z,options={}){
    const id=options.id||`city-car-${world.vehicles.length+1}`,saved=state.vehicles?.parked?.[id]||{},heading=Number(saved.heading??options.heading??0),group=new THREE.Group();group.position.set(Number(saved.x??x),0,Number(saved.z??z));group.rotation.y=heading;group.userData.vehicleId=id;worldGroup.add(group);
    const appearance={chassis:options.chassis??0x26384e,primary:options.primary??0xf28a22,primaryDark:options.primaryDark??options.primary??0xc85b16,secondary:options.secondary??0x0aa7b8,glass:options.glass??0x102338};
    const chassis=renderMat(appearance.chassis,{roughness:.5,metalness:.16}),orange=renderMat(appearance.primary,{roughness:.4,metalness:.18}),teal=renderMat(appearance.secondary,{roughness:.38,metalness:.22}),glass=renderMat(appearance.glass,{roughness:.12,metalness:.38,transparent:true,opacity:.84});
    box(1.84,.36,2.56,chassis,0,.28,0,group);box(1.72,.48,1.35,orange,0,.55,.55,group);box(1.48,.46,.92,teal,0,.78,-.48,group);box(1.32,.31,.72,glass,0,.93,-.42,group);
    box(1.94,.18,.28,0xf3f5f7,0,.32,1.34,group);box(.18,.34,2.2,teal,-.92,.42,0,group);box(.18,.34,2.2,teal,.92,.42,0,group);box(.72,.42,.58,0x151a23,0,.72,-.12,group);
    const headlight=renderMat(0xfff1a8,{emissive:0xffd75b,emissiveIntensity:.9,roughness:.2});box(.3,.17,.08,headlight,-.58,.5,1.27,group);box(.3,.17,.08,headlight,.58,.5,1.27,group);
    for(const p of [[-.84,.24,-.79],[.84,.24,-.79],[-.84,.24,.79],[.84,.24,.79]]){const wheel=cylinder(.34,.28,0x10151d,p[0],p[1],p[2],group,14);wheel.rotation.z=Math.PI/2;const hub=cylinder(.12,.3,0xf5a623,p[0],p[1],p[2],group,10);hub.rotation.z=Math.PI/2;}
    group.traverse(o=>{if(o.isMesh)addVoxelOutline(o,0x14243a,.28);});
    const vehicle={id,x:group.position.x,z:group.position.z,heading,group,label:options.label||'Carro da cidade',kind:options.kind||'car',serviceType:options.serviceType||'',appearance,occupied:false,radius:Number(options.radius||1.55)};world.vehicles.push(vehicle);if(!world.vehicle)world.vehicle=vehicle;
    registerInteractable({id:`vehicle-${id}`,type:'vehicle',icon:'🚗',label:`Entrar: ${vehicle.label}`,radius:2.5,priority:155,getPos:()=>({x:vehicle.group.position.x,z:vehicle.group.position.z}),available:()=>!vehicle.occupied&&vehicle.group.visible,action:()=>enterVehicle(vehicle)});return vehicle;
  }

  function createWaypointMarker(){
    const group=new THREE.Group();
    const beam=box(.32,6,.32,0x38d8ff,0,3,0,group);beam.material.transparent=true;beam.material.opacity=.48;
    const top=new THREE.Mesh(new THREE.OctahedronGeometry(.65,0),mat(0x6ee94b,{emissive:0x35c728,emissiveIntensity:.75}));top.position.y=6.4;group.add(top);
    group.visible=false;worldGroup.add(group);world.waypointMarker=group;updateWaypointMarker();
  }
  function updateWaypointMarker(){
    if(!world.waypointMarker)return;
    const wp=state.waypoint;world.waypointMarker.visible=!!wp;
    if(wp)world.waypointMarker.position.set(wp.x,0,wp.z);
  }
  function createAthleticsGym(){
    const gym={x:51,z:75.5,centerX:51,centerZ:75.5,radiusX:25,radiusZ:8,startX:76,finishX:76,lane1Z:75.5,lane2Z:77.4};world.gym=gym;
    // Ginásio oval: pista contínua com duas faixas, campo central e arquibancada.
    premiumBox(58,.12,23,0x315f3b,gym.centerX,.06,gym.centerZ,worldGroup);
    const trackMat=renderMat(0xc55f42,{roughness:.88}),lineMat=renderMat(0xf8f3da,{roughness:.72}),segments=64;
    for(let i=0;i<segments;i++){
      const a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2,mid=(a+b)/2;
      for(const offset of [0,2.15,-2.15]){
        const rx=gym.radiusX+offset,rz=gym.radiusZ+offset*.22,x=gym.centerX+Math.cos(mid)*rx,z=gym.centerZ+Math.sin(mid)*rz;
        const nextX=gym.centerX+Math.cos(b)*rx,nextZ=gym.centerZ+Math.sin(b)*rz,len=Math.hypot(nextX-(gym.centerX+Math.cos(a)*rx),nextZ-(gym.centerZ+Math.sin(a)*rz));
        const piece=new THREE.Mesh(new THREE.BoxGeometry(Math.max(.65,len+.12),.12,offset===0?4.15:.12),offset===0?trackMat:lineMat);piece.position.set(x,.16,z);piece.rotation.y=-Math.atan2(Math.sin(mid)*rz,Math.cos(mid)*rx);worldGroup.add(piece);
      }
    }
    // Gramado listrado, linha de largada, placar e arquibancada sem bloquear a pista.
    for(let stripe=-4;stripe<=4;stripe++)premiumBox(43,0.035,1.35,stripe%2?0x3b9b4d:0x46aa57,gym.centerX,.19,gym.centerZ+stripe*1.35,worldGroup);
    for(let j=-2;j<=2;j++)premiumBox(.18,.07,.72,j%2?0x111827:0xffffff,gym.finishX,.24,gym.centerZ+j*.72,worldGroup);
    premiumBox(14,3.4,5.2,0x315779,51,1.7,91,worldGroup);premiumBox(12,.72,4.3,0xffd84d,51,3.82,91,worldGroup);
    const arenaSign=new THREE.Mesh(new THREE.PlaneGeometry(9.8,1.15),new THREE.MeshStandardMaterial({map:signTexture('OTTHI ARENA • 3 VOLTAS','#123b63','#ffffff'),roughness:.55,side:THREE.DoubleSide}));arenaSign.position.set(51,3.86,88.35);arenaSign.rotation.y=Math.PI;worldGroup.add(arenaSign);
    for(let row=0;row<3;row++)premiumBox(16-row*1.1,.42,1.25,row%2?0x6f98b8:0x5d83a1,51,.45+row*.48,87.2+row*.72,worldGroup);
    for(const x of [27,39,51,63,75])premiumBox(.42,.09,.42,0xf5d84d,x,.25,66.5,worldGroup);
    createLamp(25,67);createLamp(77,67);createLamp(25,84);createLamp(77,84);
    registerInteractable({id:'athletics-gym',type:'race',icon:'🏃',label:'Abrir desafios do ginásio oval',x:51,z:86,radius:3.4,priority:120,action:()=>openRaceCenter()});
  }
  function createSizeChallenges(){
    // Passagem mini
    box(.7,2.5,5,0x64748b,-41,1.25,42);box(.7,2.5,5,0x64748b,-35,1.25,42);box(6.7,.65,5,0x64748b,-38,2.2,42);
    registerInteractable({id:'mini-tunnel',type:'challenge',icon:'◱',label:'Passagem pequena',x:-38,z:44.5,radius:3,priority:110,action:()=>{
      if(player.scaleMode!=='mini'){toast('Use o botão MINI para passar.','warn',2200);return;}player.z=39.5;setFlag('miniPassage');addXP(25);toast('Passagem mini concluída!','good');
    }});
    // Túnel baixo
    box(.7,1.55,4,0x8b5a2b,-56,.78,24);box(.7,1.55,4,0x8b5a2b,-50,.78,24);box(6.7,.45,4,0x8b5a2b,-53,1.55,24);
    registerInteractable({id:'crouch-tunnel',type:'challenge',icon:'▼',label:'Túnel baixo',x:-53,z:26,radius:3,priority:110,action:()=>{
      if(!player.crouched){toast('Use ABAIXAR para entrar.','warn',2200);return;}player.z=21.5;setFlag('crouchPassage');addXP(25);toast('Túnel baixo concluído!','good');
    }});
    // Portão grande
    box(8,4,.6,0x6b7280,36,2,-35);box(1,5,1,0x94a3b8,31.5,2.5,-35);box(1,5,1,0x94a3b8,40.5,2.5,-35);
    registerInteractable({id:'giant-gate',type:'challenge',icon:'⬡',label:'Abrir portão pesado',x:36,z:-32,radius:3.2,priority:110,action:()=>{
      if(player.scaleMode!=='giant'){toast('Use GRANDE para abrir o portão.','warn',2200);return;}setFlag('giantGate');addXP(35);toast('Portão pesado aberto!','good');
    }});
  }

  function createSkyDome(){
    const c=document.createElement('canvas');c.width=16;c.height=512;const ctx=c.getContext('2d'),g=ctx.createLinearGradient(0,0,0,512);
    g.addColorStop(0,'#087ee8');g.addColorStop(.34,'#42b9ff');g.addColorStop(.67,'#9de2ff');g.addColorStop(.88,'#d9f4ff');g.addColorStop(1,'#fff0bf');ctx.fillStyle=g;ctx.fillRect(0,0,16,512);
    const tex=new THREE.CanvasTexture(c);tex.magFilter=THREE.LinearFilter;tex.minFilter=THREE.LinearFilter;
    const sky=new THREE.Mesh(new THREE.SphereGeometry(430,20,18),new THREE.MeshBasicMaterial({map:tex,side:THREE.BackSide,fog:false,depthWrite:false}));scene.add(sky);
    const glowCanvas=document.createElement('canvas');glowCanvas.width=glowCanvas.height=128;const gx=glowCanvas.getContext('2d'),rad=gx.createRadialGradient(64,64,12,64,64,64);rad.addColorStop(0,'rgba(255,250,207,1)');rad.addColorStop(.35,'rgba(255,230,128,.72)');rad.addColorStop(1,'rgba(255,214,88,0)');gx.fillStyle=rad;gx.fillRect(0,0,128,128);
    const sunTex=new THREE.CanvasTexture(glowCanvas),sunGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:sunTex,transparent:true,depthWrite:false,fog:false}));sunGlow.position.set(-145,126,-235);sunGlow.scale.set(72,72,1);scene.add(sunGlow);
    const sun=new THREE.Mesh(new THREE.CircleGeometry(13,24),new THREE.MeshBasicMaterial({color:0xfff4c4,depthWrite:false,fog:false}));sun.position.set(-145,126,-232);sun.lookAt(0,70,0);scene.add(sun);
    const cloudMat=renderMat(0xffffff,{transparent:true,opacity:.9,roughness:.95});world.clouds=[];
    const cloudGeo=sharedBoxGeometry(1,1,1);
    for(let i=0;i<7;i++){
      const cloud=new THREE.Group(),parts=[[0,0,0,7,2.2,2.8],[-5.4,-.35,0,5.3,1.85,2.4],[5.1,-.2,0,5.8,2,2.5],[-.8,1.35,0,4.9,2.35,2.6],[3,1.05,0,3.7,1.8,2.3]];
      parts.forEach(([x,y,z,w,h,d])=>{const p=new THREE.Mesh(cloudGeo,cloudMat);p.scale.set(w,h,d);p.position.set(x,y,z);p.frustumCulled=false;cloud.add(p);});
      cloud.position.set((Math.random()-.5)*360,62+Math.random()*38,(Math.random()-.5)*330);cloud.scale.setScalar(.72+Math.random()*.8);scene.add(cloud);world.clouds.push({group:cloud,speed:.55+Math.random()*.85});
    }
  }
  function updateClouds(dt){
    if(textures.water){textures.water.offset.x=(textures.water.offset.x+dt*.012)%1;textures.water.offset.y=(textures.water.offset.y+dt*.007)%1;}
    if(!world.clouds)return;
    for(const c of world.clouds){c.group.position.x+=c.speed*dt;if(c.group.position.x>210)c.group.position.x=-210;}
  }

