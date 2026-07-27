/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 16-emergency-services.js
 * Escopo: Bombeiros, incêndios, polícia, ambulância, segurança e incidentes
 * Linhas de origem V642: 2723-2864
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function decorateCityServices(){
    const fire=world.fireStation,police=world.policeStation,west=world.policeStations?.find(x=>x.id==='police-west');
    if(fire){for(const x of [-2.35,0,2.35]){premiumBox(1.9,2.35,.12,materials.cityGlass,fire.x+x,1.42,fire.z+3.56,fire.front);for(let y=.45;y<2.5;y+=.48)premiumBox(1.75,.06,.14,0xf4f5f2,fire.x+x,y,fire.z+3.62,fire.front);}premiumBox(7.2,.36,.24,materials.emergencyMetal,fire.x,3.02,fire.z+3.66,fire.front);const badge=new THREE.Mesh(new THREE.PlaneGeometry(1.05,1.05),new THREE.MeshStandardMaterial({map:iconTexture('🚒','#ffffff','#c83232'),transparent:true,side:THREE.DoubleSide}));badge.position.set(fire.x,3.85,fire.z+3.75);fire.front.add(badge);for(const z of [-64,-72]){premiumCylinder(.17,1.35,0xf2c23c,60.5,.68,z,worldGroup,10);premiumBox(.5,.18,.5,0xe8483f,60.5,1.45,z);}}
    for(const station of [police,west].filter(Boolean)){premiumBox(6.4,.28,.2,0x245da8,station.x,2.95,station.z+3.65,station.front);const badge=new THREE.Mesh(new THREE.PlaneGeometry(.9,.9),new THREE.MeshStandardMaterial({map:iconTexture('★','#ffffff','#245da8'),transparent:true,side:THREE.DoubleSide}));badge.position.set(station.x,3.7,station.z+3.72);station.front.add(badge);premiumBox(2.6,.1,1.1,materials.cityGlass,station.x,2.38,station.z+3.86,station.front);}
    for(const p of [[55,-45],[55,-75],[-55,12],[-55,32]]){premiumBox(.18,2.2,.18,0x2e3c4f,p[0],1.1,p[1]);premiumBox(.62,.62,.18,0x111827,p[0],2.08,p[1]);premiumBox(.16,.16,.08,0x46d66c,p[0],2.22,p[1]+.1);premiumBox(.16,.16,.08,0xf0c33c,p[0],2.05,p[1]+.1);premiumBox(.16,.16,.08,0xe74b4b,p[0],1.88,p[1]+.1);}
  }

  const FIRE_SITES=[
    {id:'market',name:'Alarme controlado no Mercadinho',x:-22,z:-11,navX:-22,navZ:-10},
    {id:'school',name:'Treinamento na Escola Vila do Sol',x:-63,z:-10,navX:-55,navZ:-10},
    {id:'workshop',name:'Simulação segura na Oficina',x:22,z:-11,navX:22,navZ:-10},
    {id:'farm',name:'Fogueira fora de controle na Fazenda',x:52,z:34,navX:55,navZ:34},
    {id:'castle',name:'Tocha do Castelo acesa demais',x:79,z:52,navX:55,navZ:52}
  ];
  function createFireIncidentSite(site){
    const group=new THREE.Group();group.position.set(site.x,0,site.z);group.visible=false;worldGroup.add(group);const flames=[];
    for(let i=0;i<6;i++){const flame=new THREE.Mesh(new THREE.ConeGeometry(.32+i%2*.1,.8+i%3*.18,7),renderMat(i%2?0xffcf3d:0xff5b35,{emissive:i%2?0xff8a00:0xc31b08,emissiveIntensity:1.5,roughness:.18}));flame.position.set((i%3-1)*.38,.45+Math.floor(i/3)*.2,(i<3?-.22:.22));group.add(flame);flames.push(flame);}const smoke=[];for(let i=0;i<4;i++){const puff=new THREE.Mesh(new THREE.DodecahedronGeometry(.32+i*.07,0),renderMat(0x66717d,{transparent:true,opacity:.34,roughness:1}));puff.position.set((i%2?-.18:.18),1.2+i*.35,0);group.add(puff);smoke.push(puff);}const fire={...site,group,flames,smoke,active:false,startedAt:0,playerHelping:false,truckHelping:false};world.fires.push(fire);registerInteractable({id:`fire-${site.id}`,type:'fire',icon:'🧯',label:`Ajudar: ${site.name}`,radius:4.2,priority:245,getPos:()=>({x:site.x,z:site.z}),action:()=>helpExtinguishFire(fire)});return fire;
  }
  function createFireTruck(id,copy=0){
    const g=new THREE.Group(),red=materials.emergencyMetal||renderMat(0xd63832,{roughness:.38,metalness:.25}),white=renderMat(0xf5f6f4,{roughness:.42}),glass=materials.cityGlass||renderMat(0x8ddcff,{transparent:true,opacity:.5});
    premiumBox(2.35,.48,4.7,0x263746,0,.4,0,g);premiumBox(2.25,1.2,2.55,red,0,1.1,-.75,g);premiumBox(2.18,1.42,1.75,white,0,1.2,1.45,g);premiumBox(1.8,.72,.08,glass,0,1.65,2.34,g);premiumBox(2.08,.18,4.35,white,0,2.02,-.15,g);
    for(const z of [-1.7,-.75,.2])premiumBox(1.85,.12,.12,0xe8edf0,0,1.45,z,g);premiumCylinder(.58,.95,0xcfd8df,0,1.22,-.2,g,16);premiumBox(.22,.22,3.75,0xe8edf0,0,2.35,-.15,g);for(let z=-1.7;z<=1.4;z+=.52)premiumBox(1.25,.08,.08,0xe8edf0,0,2.36,z,g);
    const lightA=premiumBox(.58,.18,.32,renderMat(0xff3a42,{emissive:0xb80011,emissiveIntensity:1.2}),-.34,2.28,1.45,g),lightB=premiumBox(.58,.18,.32,renderMat(0x42bfff,{emissive:0x087db4,emissiveIntensity:1.2}),.34,2.28,1.45,g);const wheels=[];for(const p of [[-1.1,.38,-1.45],[1.1,.38,-1.45],[-1.1,.38,1.45],[1.1,.38,1.45]]){const wheel=premiumCylinder(.46,.28,0x111722,p[0],p[1],p[2],g,14);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}g.position.set(55,.02,-68-copy*5);worldGroup.add(g);const truck={id,group:g,wheels,lightA,lightB,speed:8.8,targetFireId:'',route:[],routeIndex:0,arrivedAt:0,patrol:[[55,-68],[55,-18],[0,-18],[0,0],[55,0],[55,-68]],patrolIndex:copy%3};world.fireTrucks.push(truck);return truck;
  }
  function createFireServiceWorld(){FIRE_SITES.forEach(createFireIncidentSite);createFireTruck('fire-01',0);createFireTruck('fire-02',1);world.nextFireAt=performance.now()+22000;}
  function activateFireIncident(siteId='',forced=false){if(world.fires.some(f=>f.active))return world.fires.find(f=>f.active);const available=world.fires.filter(f=>!f.active),fire=available.find(f=>f.id===siteId)||available[Math.floor(Math.random()*available.length)];if(!fire)return null;fire.active=true;fire.group.visible=true;fire.startedAt=performance.now();fire.playerHelping=false;fire.truckHelping=false;state.cityServices.emergencyCalls=(state.cityServices.emergencyCalls||0)+1;state.cityServices.lastFireAt=Date.now();world.nextFireAt=performance.now()+(forced?90000:65000+Math.random()*45000);toast(`🚨 Chamado dos bombeiros: ${fire.name}`,'warn',2600);saveState();return fire;}
  function ensureActiveFire(force=false){return world.fires.find(f=>f.active)||(force?activateFireIncident('',true):null);}
  function helpExtinguishFire(fire){if(!fire?.active){toast('A ocorrência já foi resolvida.','good');return;}if(Math.hypot(player.x-fire.x,player.z-fire.z)>5){toast('Chegue mais perto da área segura demarcada.','warn');return;}fire.playerHelping=true;player.sitUntil=performance.now()+2400;toast('Mangueira ativada. Mantenha distância segura!','good',1800);for(let i=0;i<8;i++)setTimeout(()=>spawnDust(lerp(player.x,fire.x,(i+1)/9),lerp(player.z,fire.z,(i+1)/9),0x70dcff),i*90);setTimeout(()=>{if(fire.active)extinguishFireIncident(fire,true);},2300);}
  function extinguishFireIncident(fire,byPlayer=false){if(!fire?.active)return;fire.active=false;fire.group.visible=false;fire.playerHelping=false;fire.truckHelping=false;state.cityServices.firesExtinguished=(state.cityServices.firesExtinguished||0)+1;if(byPlayer)state.stats.firesHelped=(state.stats.firesHelped||0)+1;for(const truck of world.fireTrucks)if(truck.targetFireId===fire.id){truck.targetFireId='';truck.route=[];truck.routeIndex=0;truck.arrivedAt=0;}if(state.career.activeJob?.id==='firefighter'){state.career.activeJob.completed=true;completeActiveJob();}if(state.waypoint?.id===`fire-${fire.id}`){state.waypoint=null;updateWaypointMarker();updateNavigation(0,true);}addXP(byPlayer?65:20);toast(byPlayer?'Emergência resolvida em equipe!':'Os bombeiros controlaram a ocorrência.','good',2400);saveState(true);}
  function serviceVehicleRoute(vehicle,target){if(!vehicle.route.length){vehicle.route=buildRoutePoints({x:vehicle.group.position.x,z:vehicle.group.position.z},target);vehicle.routeIndex=1;}return vehicle.route;}
  function moveServiceVehicle(vehicle,target,dt){if(performance.now()<Number(vehicle.trafficHoldUntil||0)){vehicle.currentSpeed=0;return Math.hypot(vehicle.group.position.x-target.x,vehicle.group.position.z-target.z);}const route=serviceVehicleRoute(vehicle,target),point=route[vehicle.routeIndex];if(!point)return 0;const dx=point.x-vehicle.group.position.x,dz=point.z-vehicle.group.position.z,d=Math.hypot(dx,dz);if(d<.45){vehicle.routeIndex++;if(vehicle.routeIndex>=route.length)return Math.hypot(vehicle.group.position.x-target.x,vehicle.group.position.z-target.z);return moveServiceVehicle(vehicle,target,dt);}const heading=Math.atan2(dx,dz),factor=trafficSpeedFactor(vehicle,heading,8),targetSpeed=vehicle.speed*factor;vehicle.currentSpeed=lerp(Number(vehicle.currentSpeed||0),targetSpeed,Math.min(1,dt*4));const move=Math.min(d,vehicle.currentSpeed*dt),previous={x:vehicle.group.position.x,z:vehicle.group.position.z};if(move>.0001){vehicle.group.position.x+=dx/d*move;vehicle.group.position.z+=dz/d*move;snapTrafficToRoad(vehicle.group,previous);vehicle.group.rotation.y=lerpAngle(vehicle.group.rotation.y,heading,Math.min(1,dt*6));for(const wheel of vehicle.wheels)wheel.rotation.x-=move*2.1;}return Math.hypot(vehicle.group.position.x-target.x,vehicle.group.position.z-target.z);}
  function updateFireService(dt){
    const now=performance.now();if(!world.fires.length)return;if(!world.fires.some(f=>f.active)&&now>world.nextFireAt&&!currentHouse)activateFireIncident();
    for(const fire of world.fires){if(!fire.active)continue;fire.flames.forEach((flame,i)=>{flame.scale.y=.82+Math.sin(now*.008+i)*.22;flame.rotation.y+=dt*(.7+i*.08);});fire.smoke.forEach((puff,i)=>{puff.position.y=1.25+i*.35+Math.sin(now*.002+i)*.14;puff.rotation.y+=dt*.35;});}
    const active=world.fires.find(f=>f.active);for(const truck of world.fireTrucks){truck.lightA.visible=Math.floor(now/230)%2===0;truck.lightB.visible=!truck.lightA.visible;if(truck.incidentTargetId)continue;if(active&&!truck.targetFireId){truck.targetFireId=active.id;truck.route=[];truck.routeIndex=0;}if(truck.targetFireId){const fire=world.fires.find(f=>f.id===truck.targetFireId&&f.active);if(!fire){truck.targetFireId='';truck.route=[];continue;}const distance=moveServiceVehicle(truck,{x:fire.navX,z:fire.navZ},dt);if(distance<5.5){if(!truck.arrivedAt)truck.arrivedAt=now;fire.truckHelping=true;truck.sprayAcc=(truck.sprayAcc||0)+dt;if(truck.sprayAcc>.1){truck.sprayAcc=0;spawnDust(lerp(truck.group.position.x,fire.x,.7),lerp(truck.group.position.z,fire.z,.7),0x69d8ff);}if(now-truck.arrivedAt>5200&&state.career.activeJob?.id!=='firefighter')extinguishFireIncident(fire,false);}}else{const patrol=truck.patrol[truck.patrolIndex];if(moveServiceVehicle(truck,{x:patrol[0],z:patrol[1]},dt)<1){truck.patrolIndex=(truck.patrolIndex+1)%truck.patrol.length;truck.route=[];truck.routeIndex=0;}}}
  }

  function createPoliceCar(id,route,routeIndex=0){
    const g=new THREE.Group(),white=renderMat(0xf4f7fb,{roughness:.38,metalness:.16}),blue=renderMat(0x215ea8,{roughness:.34,metalness:.25}),dark=renderMat(0x13253a,{roughness:.14,metalness:.35,transparent:true,opacity:.78});
    premiumBox(2.0,.4,3.0,0x26384e,0,.32,0,g);premiumBox(1.9,.5,1.65,white,0,.66,.46,g);premiumBox(1.58,.48,1.1,blue,0,.86,-.42,g);premiumBox(1.38,.32,.88,dark,0,1.02,-.36,g);
    premiumBox(2.02,.34,.24,blue,0,.56,.88,g);premiumBox(2.02,.34,.24,blue,0,.56,-.88,g);premiumBox(.12,.36,1.7,blue,-.96,.58,0,g);premiumBox(.12,.36,1.7,blue,.96,.58,0,g);
    const lightBar=new THREE.Group();lightBar.position.set(0,1.36,-.2);g.add(lightBar);const red=premiumBox(.62,.18,.34,renderMat(0xe9404a,{emissive:0xb10e22,emissiveIntensity:.9}),-.34,0,0,lightBar),cyan=premiumBox(.62,.18,.34,renderMat(0x35bfff,{emissive:0x087db4,emissiveIntensity:.9}),.34,0,0,lightBar);
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(.72,.72),new THREE.MeshStandardMaterial({map:iconTexture('★','#ffffff','#215ea8'),transparent:true,side:THREE.DoubleSide}));sign.position.set(1.02,.72,.2);sign.rotation.y=Math.PI/2;g.add(sign);
    const wheels=[];for(const p of [[-.94,.28,-.88],[.94,.28,-.88],[-.94,.28,.88],[.94,.28,.88]]){const wheel=premiumCylinder(.36,.25,0x10151d,p[0],p[1],p[2],g,14);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}
    g.traverse(o=>{if(o.isMesh)addVoxelOutline(o,0x132238,.22);});const start=route[routeIndex%route.length],car={id,group:g,route,routeIndex:(routeIndex+1)%route.length,speed:8.1,currentSpeed:0,wheels,red,cyan,npcTarget:'',npcChaseUntil:0,incidentTargetId:'',responseRoute:[],responseIndex:0};g.position.set(start.x,.02,start.z);worldGroup.add(g);world.policeCars.push(car);return car;
  }
  function createAmbulance(id='ambulance-1'){
    const g=new THREE.Group(),white=renderMat(0xf6f8fa,{roughness:.4,metalness:.12}),red=renderMat(0xe34848,{roughness:.36,metalness:.2}),glass=materials.cityGlass||renderMat(0x85d9f2,{transparent:true,opacity:.62});
    premiumBox(2.2,.46,3.7,0x263746,0,.38,0,g);premiumBox(2.08,1.38,2.45,white,0,1.14,-.35,g);premiumBox(2.0,1.12,1.1,white,0,1.0,1.45,g);premiumBox(1.65,.58,.08,glass,0,1.46,2.03,g);premiumBox(2.12,.22,.22,red,0,1.2,-1.55,g);premiumBox(.22,1.0,.08,red,0,1.32,-1.67,g);premiumBox(1.0,.22,.08,red,0,1.32,-1.67,g);
    const lightA=premiumBox(.55,.16,.3,renderMat(0xff3a42,{emissive:0xb80011,emissiveIntensity:1}),-.3,2.02,.65,g),lightB=premiumBox(.55,.16,.3,renderMat(0x42bfff,{emissive:0x087db4,emissiveIntensity:1}),.3,2.02,.65,g),wheels=[];
    for(const q of [[-1.0,.38,-1.15],[1.0,.38,-1.15],[-1.0,.38,1.15],[1.0,.38,1.15]]){const wheel=premiumCylinder(.43,.26,0x111722,q[0],q[1],q[2],g,14);wheel.rotation.z=Math.PI/2;wheels.push(wheel);}
    g.position.set(55,.02,-58);worldGroup.add(g);const ambulance={id,group:g,wheels,lightA,lightB,speed:9,currentSpeed:0,incidentTargetId:'',responseRoute:[],responseIndex:0};world.ambulances.push(ambulance);return ambulance;
  }
  function createPoliceSystem(){
    createPoliceCar('patrol-1',[{x:68,z:-12},{x:68,z:0},{x:100,z:0},{x:0,z:0},{x:-100,z:0},{x:0,z:0},{x:68,z:0}],0);
    createPoliceCar('patrol-2',[{x:55,z:0},{x:55,z:88},{x:55,z:0},{x:0,z:0},{x:0,z:-94},{x:0,z:0}],2);
    createAmbulance();
  }
  function movePoliceToward(car,target,dt,speed=car.speed){
    if(performance.now()<Number(car.trafficHoldUntil||0)){car.currentSpeed=0;return Math.hypot(car.group.position.x-target.x,car.group.position.z-target.z);}
    const dx=target.x-car.group.position.x,dz=target.z-car.group.position.z,d=Math.hypot(dx,dz);if(d<.08)return d;const heading=Math.atan2(dx,dz),factor=trafficSpeedFactor(car,heading,8),targetSpeed=speed*factor;car.currentSpeed=lerp(Number(car.currentSpeed||0),targetSpeed,Math.min(1,dt*4));const move=Math.min(d,car.currentSpeed*dt),previous={x:car.group.position.x,z:car.group.position.z};if(move>.0001){car.group.position.x+=dx/d*move;car.group.position.z+=dz/d*move;snapTrafficToRoad(car.group,previous);car.group.rotation.y=lerpAngle(car.group.rotation.y,heading,Math.min(1,dt*6));for(const wheel of car.wheels)wheel.rotation.x-=move*2.8;}return d;
  }
  function updatePolicePatrol(car,dt){
    const target=car.route[car.routeIndex],distance=movePoliceToward(car,target,dt);if(distance<.28)car.routeIndex=(car.routeIndex+1)%car.route.length;
  }
  function updateSafetyPanel(message=''){
    if(!els.safetyPanel)return;els.safetyPanel.hidden=!message;if(els.safetyStatus)els.safetyStatus.textContent=message;
  }
  function startPoliceAlert(car){
    if(world.policeAlert||!player.vehicle||player.car.passengerOf)return false;const now=performance.now();
    if(Date.now()-Number(state.safety.lastIncident||0)<5000)return false;
    state.safety.incidents=(state.safety.incidents||0)+1;state.safety.lastIncident=Date.now();world.policeAlert={carId:car.id,startedAt:now,slowSince:0};car.npcTarget='';saveState(true);updateSafetyPanel('Encoste com calma • solte o acelerador');toast('Patrulha de segurança: encoste com calma.','warn',2200);return true;
  }
  function finishSafetyStop(){
    const alert=world.policeAlert;if(!alert)return;world.policeAlert=null;state.safety.safeStops=(state.safety.safeStops||0)+1;
    if(player.vehicle)exitVehicle(true);clearMovementInputs();player.x=68;player.z=-12.2;player.y=groundHeightAt(player.x,player.z);player.vx=player.vy=player.vz=0;player.grounded=true;playerGroup?.position?.set(player.x,player.y,player.z);updateSafetyPanel('');saveState(true);setTimeout(()=>openSafetyLesson('incident'),120);
  }
  function openSafetyLesson(source='station'){
    const incident=source==='incident',questions=[
      {q:'Antes de dirigir, qual é a primeira atitude segura?',answers:['Colocar o cinto e observar ao redor','Acelerar para sair rápido','Olhar somente para a buzina'],correct:0},
      {q:'Ao ver outro veículo perto, o que devemos fazer?',answers:['Reduzir e manter distância','Fechar os olhos','Correr para chegar primeiro'],correct:0},
      {q:'Se acontecer uma batida no jogo, qual é a melhor escolha?',answers:['Parar, respirar e aprender','Bater novamente','Culpar alguém sem conversar'],correct:0}
    ],lesson=questions[(state.safety.lessons||0)%questions.length];
    openModal(incident?'Parada educativa':'Clube de Segurança',`<div class="safety-lesson"><span>🛡️</span><h3>${incident?'Todo mundo está bem!':'Vamos aprender trânsito seguro'}</h3><p>${incident?'A patrulha trouxe você ao posto para uma atividade rápida, sem violência e sem perda de conquistas.':'Treine escolhas seguras para pedestres, bicicletas e veículos.'}</p><b>${lesson.q}</b><div class="choice-grid">${lesson.answers.map((answer,index)=>`<button class="choice" data-safety-answer="${index}"><span>${answer}</span></button>`).join('')}</div><small>Ninguém perde moedas, itens ou progresso nesta atividade.</small></div>`,root=>{
      $$('[data-safety-answer]',root).forEach(button=>button.onclick=()=>{const correct=Number(button.dataset.safetyAnswer)===lesson.correct;state.safety.lessons=(state.safety.lessons||0)+1;if(correct){addXP(18);addReputation(3);awardMedal('Direção Segura');}saveState(true);closeModal();toast(correct?'Boa escolha! Segurança vem primeiro.':'Vamos lembrar: reduza, observe e cuide de todos.',correct?'good':'warn',2600);});
    });
  }
  function updatePoliceSystem(dt){
    const now=performance.now(),alert=world.policeAlert,alertCar=alert&&world.policeCars.find(car=>car.id===alert.carId);
    for(const car of world.policeCars){
      const active=alert&&car===alertCar;
      car.red.material.emissiveIntensity=(active||car.npcTarget||car.incidentTargetId)?(.45+Math.sin(now*.018)*.45):.16;car.cyan.material.emissiveIntensity=(active||car.npcTarget||car.incidentTargetId)?(.45+Math.sin(now*.018+Math.PI)*.45):.16;
      if(car.incidentTargetId)continue;
      if(active){
        const distance=movePoliceToward(car,player,dt,12.8);const stopped=Math.abs(player.car.speed)<1.15;
        alert.slowSince=stopped?(alert.slowSince||now):0;updateSafetyPanel(stopped?'Muito bem • aguarde a patrulha':'Encoste com calma • solte o acelerador');
        if(!player.vehicle||distance<2.15||(alert.slowSince&&now-alert.slowSince>1100)||now-alert.startedAt>15000)finishSafetyStop();
      }else if(car.npcTarget){
        const npc=world.npcs.find(item=>item.id===car.npcTarget);if(!npc||now>car.npcChaseUntil){if(npc)npcSpeech(npc,'Vou reduzir a velocidade e dirigir com cuidado.');car.npcTarget='';}
        else if(movePoliceToward(car,npc.group.position,dt,10.2)<2.25){npc.policeCooldown=now+45000;npcSpeech(npc,'Entendi, patrulha! Segurança primeiro.');car.npcTarget='';}
      }else updatePolicePatrol(car,dt);
    }
    if(!alert&&player.vehicle&&!player.car.passengerOf&&Math.abs(player.car.speed)>1.4){
      const hit=world.policeCars.find(car=>Math.hypot(player.x-car.group.position.x,player.z-car.group.position.z)<2.45);if(hit)startPoliceAlert(hit);
    }
    if(!alert){
      for(const car of world.policeCars){if(car.npcTarget)continue;const npc=world.npcs.find(item=>item.mobility&&['car','moto'].includes(item.mobility.type)&&now>Number(item.policeCooldown||0)&&Math.hypot(item.group.position.x-car.group.position.x,item.group.position.z-car.group.position.z)<2.0);if(npc){car.npcTarget=npc.id;car.npcChaseUntil=now+6500;npc.policeCooldown=now+45000;break;}}
    }
  }
  function moveIncidentResponder(vehicle,target,dt){if(performance.now()<Number(vehicle.trafficHoldUntil||0)){vehicle.currentSpeed=0;return Math.hypot(vehicle.group.position.x-target.x,vehicle.group.position.z-target.z);}
    if(!vehicle.responseRoute?.length){vehicle.responseRoute=buildRoutePoints({x:vehicle.group.position.x,z:vehicle.group.position.z},target);vehicle.responseIndex=1;}
    const point=vehicle.responseRoute[vehicle.responseIndex];if(!point)return Math.hypot(vehicle.group.position.x-target.x,vehicle.group.position.z-target.z);
    const dx=point.x-vehicle.group.position.x,dz=point.z-vehicle.group.position.z,d=Math.hypot(dx,dz);if(d<.45){vehicle.responseIndex++;if(vehicle.responseIndex>=vehicle.responseRoute.length)return Math.hypot(vehicle.group.position.x-target.x,vehicle.group.position.z-target.z);return moveIncidentResponder(vehicle,target,dt);}
    const heading=Math.atan2(dx,dz),factor=trafficSpeedFactor(vehicle,heading,8),targetSpeed=vehicle.speed*factor;vehicle.currentSpeed=lerp(Number(vehicle.currentSpeed||0),targetSpeed,Math.min(1,dt*4));const move=Math.min(d,vehicle.currentSpeed*dt),previous={x:vehicle.group.position.x,z:vehicle.group.position.z};if(move>.0001){vehicle.group.position.x+=dx/d*move;vehicle.group.position.z+=dz/d*move;snapTrafficToRoad(vehicle.group,previous);vehicle.group.rotation.y=lerpAngle(vehicle.group.rotation.y,heading,Math.min(1,dt*6));for(const wheel of vehicle.wheels||[])wheel.rotation.x-=move*2.3;}return Math.hypot(vehicle.group.position.x-target.x,vehicle.group.position.z-target.z);
  }
  function createTrafficIncident(a,b,severity='minor'){
    if(world.activeIncident||currentHouse)return null;const now=performance.now(),ax=a.group.position.x,az=a.group.position.z,bx=b.group.position.x,bz=b.group.position.z,x=(ax+bx)/2,z=(az+bz)/2,fire=severity==='fire';
    const group=new THREE.Group();group.position.set(x,0,z);worldGroup.add(group);for(const ox of [-1.3,0,1.3]){premiumCylinder(.18,.7,0xf47b20,ox,.35,.8,group,8);premiumBox(.5,.1,.5,0xffffff,ox,.16,.8,group);}if(fire){for(const ox of [-.4,.4]){const flame=new THREE.Mesh(new THREE.ConeGeometry(.3,.85,7),renderMat(0xff6a2f,{emissive:0xd83b12,emissiveIntensity:1.3}));flame.position.set(ox,.48,0);group.add(flame);}}
    const incident={id:`incident-${++world.emergencySeq}`,x,z,navX:nearestRoadProjection({x,z})?.point.x??x,navZ:nearestRoadProjection({x,z})?.point.z??z,group,fire,startedAt:now,resolved:false,policeArrived:false,ambulanceArrived:false,fireArrived:!fire,actors:[a.ref,b.ref]};world.activeIncident=incident;world.trafficIncidents.push(incident);for(const actor of incident.actors){if(actor)actor.incidentUntil=now+9000;}if(a.id==='player-car'||b.id==='player-car'){player.car.speed=0;state.stats.accidentsHelped=(state.stats.accidentsHelped||0)+1;}
    const police=world.policeCars.find(c=>!c.incidentTargetId),ambulance=world.ambulances.find(c=>!c.incidentTargetId),truck=fire?world.fireTrucks.find(c=>!c.incidentTargetId&&!c.targetFireId):null;
    if(police){police.incidentTargetId=incident.id;police.responseRoute=[];police.responseIndex=0;}if(ambulance){ambulance.incidentTargetId=incident.id;ambulance.responseRoute=[];ambulance.responseIndex=0;}if(truck){truck.incidentTargetId=incident.id;truck.responseRoute=[];truck.responseIndex=0;}
    state.cityServices.emergencyCalls=(state.cityServices.emergencyCalls||0)+1;toast(fire?'🚨 Acidente com princípio de incêndio: polícia, ambulância e bombeiros foram chamados.':'🚨 Acidente simulado: polícia e ambulância foram chamadas.','warn',3200);saveState();return incident;
  }
  function resolveTrafficIncident(incident){
    if(!incident||incident.resolved)return;incident.resolved=true;incident.group.visible=false;for(const actor of incident.actors||[]){if(actor)actor.incidentUntil=0;}for(const car of world.policeCars){if(car.incidentTargetId===incident.id){car.incidentTargetId='';car.responseRoute=[];}}for(const ambulance of world.ambulances){if(ambulance.incidentTargetId===incident.id){ambulance.incidentTargetId='';ambulance.responseRoute=[];}}for(const truck of world.fireTrucks){if(truck.incidentTargetId===incident.id){truck.incidentTargetId='';truck.responseRoute=[];}}state.cityServices.accidentsResolved=(state.cityServices.accidentsResolved||0)+1;state.cityServices.rescuesCompleted=(state.cityServices.rescuesCompleted||0)+1;world.activeIncident=null;toast('Atendimento concluído. Todos estão bem e a rua foi liberada.','good',2600);saveState(true);
  }
  function updateTrafficIncidents(dt){
    const now=performance.now(),incident=world.activeIncident;
    for(const ambulance of world.ambulances){ambulance.lightA.visible=Math.floor(now/220)%2===0;ambulance.lightB.visible=!ambulance.lightA.visible;}
    if(incident){
      const target={x:incident.navX,z:incident.navZ};for(const car of world.policeCars.filter(c=>c.incidentTargetId===incident.id)){if(moveIncidentResponder(car,target,dt)<3.5)incident.policeArrived=true;}
      for(const ambulance of world.ambulances.filter(c=>c.incidentTargetId===incident.id)){if(moveIncidentResponder(c,target,dt)<3.5)incident.ambulanceArrived=true;}
      for(const truck of world.fireTrucks.filter(c=>c.incidentTargetId===incident.id)){if(moveIncidentResponder(truck,target,dt)<4.2)incident.fireArrived=true;}
      if((incident.policeArrived&&incident.ambulanceArrived&&incident.fireArrived&&now-incident.startedAt>4200)||now-incident.startedAt>15000)resolveTrafficIncident(incident);return;
    }
    updateTrafficIncidents.acc=(updateTrafficIncidents.acc||0)+dt;if(updateTrafficIncidents.acc<.18)return;updateTrafficIncidents.acc=0;const actors=trafficActorList().filter(a=>a.speed>1.4&&!a.ref?.incidentUntil);if(player.vehicle&&!player.car.passengerOf&&Math.abs(player.car.speed)>1.4)actors.push({id:'player-car',type:'player',group:{position:{x:player.x,z:player.z}},radius:1.55,speed:Math.abs(player.car.speed),ref:player.car,isPlayer:true});
    for(let i=0;i<actors.length;i++)for(let j=i+1;j<actors.length;j++){const a=actors[i],b=actors[j],distance=Math.hypot(a.group.position.x-b.group.position.x,a.group.position.z-b.group.position.z),limit=(a.radius+b.radius)*.58;if(distance<limit&&a.speed+b.speed>5){createTrafficIncident(a,b,a.speed+b.speed>13&&Math.random()<.35?'fire':'minor');return;}}
  }

  function openTransitGuide(){
    openModal('Rede de transporte',`<div class="transport-summary"><article><b>${state.transport.metroTrips||0}</b><span>viagens de metrô</span></article><article><b>${state.transport.busTrips||0}</b><span>viagens de ônibus</span></article><article><b>${state.transport.busStops.length}</b><span>paradas visitadas</span></article></div><h3>Estações de metrô</h3><div class="transit-directory">${METRO_STATIONS.map(s=>`<button data-transit-waypoint="metro-${s.id}"><b>Ⓜ️ ${s.name}</b><span>${s.line}</span></button>`).join('')}</div><h3>Linhas de ônibus</h3><div class="transit-directory">${BUS_ROUTES.map(r=>`<article><b>🚌 ${r.number} • ${r.name}</b><span>${[...new Set(r.points.filter(p=>p.stopName).map(p=>p.stopName))].join(' → ')}</span></article>`).join('')}</div>`,root=>{$$('[data-transit-waypoint]',root).forEach(btn=>btn.onclick=()=>setWaypoint(btn.dataset.transitWaypoint));});
  }

