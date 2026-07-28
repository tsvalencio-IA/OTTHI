/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 23-vehicle-effects-driving.js
 * Escopo: Poeira, som, efeitos, controles, direção, passageiros e ponte
 * Linhas de origem V642: 3531-3644
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function clearServiceVehicleVisual(){
    const layer=vehicleVisual?.userData?.serviceLayer;if(layer){vehicleVisual.remove(layer);layer.traverse(o=>{if(o.isMesh){o.geometry?.dispose?.();const materials=Array.isArray(o.material)?o.material:[o.material];for(const material of materials){material?.map?.dispose?.();material?.dispose?.();}}});}
    if(vehicleVisual){vehicleVisual.userData.serviceLayer=null;vehicleVisual.userData.serviceLights=[];vehicleVisual.scale.set(1,1,1);}
  }
  function serviceVehicleIcon(kind='car'){return({police:'🚓',firefighter:'🚒',paramedic:'🚑',ambulance:'🚑',fire:'🚒'})[kind]||'🚗';}
  function applyServiceVehicleVisual(vehicle={}){
    if(!vehicleVisual)return;clearServiceVehicleVisual();const kind=String(vehicle.serviceType||vehicle.kind||'car');if(!['police','firefighter','fire','paramedic','ambulance'].includes(kind))return;
    const layer=new THREE.Group();layer.name=`OTTHI_SERVICE_${kind.toUpperCase()}`;vehicleVisual.add(layer);vehicleVisual.userData.serviceLayer=layer;vehicleVisual.userData.serviceLights=[];
    const addLight=(x,color,emissive)=>{const mesh=box(.46,.16,.3,renderMat(color,{emissive,emissiveIntensity:.95,roughness:.2}),x,1.39,-.1,layer);vehicleVisual.userData.serviceLights.push(mesh);return mesh;};
    if(kind==='police'){
      vehicleVisual.scale.set(1.04,1.04,1.08);box(1.86,.3,1.25,0xf3f6fa,0,.7,.15,layer);box(1.9,.22,.3,0x193f72,0,.62,.86,layer);box(.12,.36,2.25,0x193f72,-.94,.58,0,layer);box(.12,.36,2.25,0x193f72,.94,.58,0,layer);addLight(-.27,0xe53945,0xa50018);addLight(.27,0x42bfff,0x087db4);const patch=new THREE.Mesh(new THREE.PlaneGeometry(.78,.22),new THREE.MeshStandardMaterial({map:signTexture('POLÍCIA','#173d70','#ffffff'),transparent:true,side:THREE.DoubleSide}));patch.position.set(0,.77,1.31);layer.add(patch);
    }else if(kind==='paramedic'||kind==='ambulance'){
      vehicleVisual.scale.set(1.08,1.12,1.22);box(1.78,.9,1.45,0xf5f7f8,0,1.02,-.55,layer);box(1.82,.14,1.5,0xe34848,0,1.12,-.54,layer);box(.15,.58,.06,0xe34848,0,1.03,1.31,layer);box(.58,.15,.06,0xe34848,0,1.03,1.315,layer);addLight(-.27,0xe53945,0xa50018);addLight(.27,0x42bfff,0x087db4);const patch=new THREE.Mesh(new THREE.PlaneGeometry(.82,.23),new THREE.MeshStandardMaterial({map:signTexture('RESGATE','#ffffff','#d83e42'),transparent:true,side:THREE.DoubleSide}));patch.position.set(0,1.43,-1.3);patch.rotation.y=Math.PI;layer.add(patch);
    }else{
      vehicleVisual.scale.set(1.18,1.2,1.42);box(1.92,.88,1.65,0xc93431,0,1.02,-.58,layer);box(1.86,.14,2.15,0xf2d84d,0,.76,-.2,layer);box(.22,.22,2.5,0xe8edf0,-.45,1.62,-.2,layer);box(.22,.22,2.5,0xe8edf0,.45,1.62,-.2,layer);for(let z=-1.15;z<=.95;z+=.42)box(.95,.07,.07,0xe8edf0,0,1.64,z,layer);addLight(-.27,0xe53945,0xa50018);addLight(.27,0x42bfff,0x087db4);const patch=new THREE.Mesh(new THREE.PlaneGeometry(.92,.24),new THREE.MeshStandardMaterial({map:signTexture('BOMBEIROS','#b52d2a','#ffffff'),transparent:true,side:THREE.DoubleSide}));patch.position.set(0,1.28,1.31);layer.add(patch);
    }
    layer.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;addVoxelOutline(o,0x152235,.2);}});
  }
  function spawnDust(x,z,color=0xcfc6a8){
    if(fxParticles.length>=FX_MAX_PARTICLES){const oldest=fxParticles.shift();worldGroup.remove(oldest.mesh);oldest.mesh.geometry.dispose();oldest.mesh.material.dispose();}
    const mesh=new THREE.Mesh(new THREE.CircleGeometry(.2+Math.random()*.12,8),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.5,depthWrite:false}));
    mesh.rotation.x=-Math.PI/2; mesh.position.set(x,.06,z); worldGroup.add(mesh);
    fxParticles.push({mesh,life:.55,vx:(Math.random()-.5)*1.1,vz:(Math.random()-.5)*1.1});
  }
  function updateFX(dt){
    for(let i=fxParticles.length-1;i>=0;i--){
      const p=fxParticles[i]; p.life-=dt;
      p.mesh.position.x+=p.vx*dt; p.mesh.position.z+=p.vz*dt;
      p.mesh.scale.setScalar(1+(.55-p.life)*2.2);
      p.mesh.material.opacity=Math.max(0,p.life/.55*.5);
      if(p.life<=0){worldGroup.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();fxParticles.splice(i,1);}
    }
  }
  let engineAudio=null,driftSoundCooldown=0,vehicleImpactCount=0;
  function startEngineSound(){
    if(!state.settings.sound||engineAudio)return;
    try{
      const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
      const ctx=beep.ctx||(beep.ctx=new Ctx());
      const osc=ctx.createOscillator(),gain=ctx.createGain();
      osc.type='sawtooth';osc.frequency.value=65;gain.gain.value=0;
      osc.connect(gain);gain.connect(ctx.destination);osc.start();
      engineAudio={ctx,osc,gain};gain.gain.linearRampToValueAtTime(.018,ctx.currentTime+.18);
    }catch(_){}
  }
  function stopEngineSound(){
    if(!engineAudio)return;
    try{engineAudio.gain.gain.linearRampToValueAtTime(0,engineAudio.ctx.currentTime+.12);engineAudio.osc.stop(engineAudio.ctx.currentTime+.16);}catch(_){}
    engineAudio=null;
  }
  function updateVehicleFX(dt){
    if(!player.vehicle){if(engineAudio)stopEngineSound();return;}
    if(player.car.passengerOf){if(engineAudio)stopEngineSound();if(els.vehicleBadge)els.vehicleBadge.textContent=`${serviceVehicleIcon(player.car.kind)} Passageiro — AÇÃO para sair`;return;}
    const car=player.car,wheels=vehicleVisual.userData.wheels,fronts=vehicleVisual.userData.frontWheels;
    const spin=car.speed*dt*3.4;
    wheels.forEach(w=>w.rotation.x-=spin);
    fronts.forEach(h=>h.rotation.y=lerp(h.rotation.y,car.steerVisual*.5,Math.min(1,dt*10)));
    const speedDelta=car.speed-(car._prevSpeed??car.speed);car._prevSpeed=car.speed;
    const targetTiltX=clamp(-speedDelta*.55,-.13,.13);
    vehicleVisual.rotation.x=lerp(vehicleVisual.rotation.x,targetTiltX,Math.min(1,dt*6));
    vehicleVisual.rotation.z=lerp(vehicleVisual.rotation.z,-car.steerVisual*car.drift*.4,Math.min(1,dt*6));
    if(car.drift>.4&&Math.abs(car.speed)>3){
      updateVehicleFX.acc=(updateVehicleFX.acc||0)+dt;
      if(updateVehicleFX.acc>.045){updateVehicleFX.acc=0;spawnDust(player.x-Math.sin(car.heading)*1.05,player.z-Math.cos(car.heading)*1.05);}
      driftSoundCooldown-=dt;if(driftSoundCooldown<=0){driftSoundCooldown=.5;beep(180,55,'sawtooth');}
    }
    const serviceKind=String(car.kind||'car'),serviceIcon=serviceVehicleIcon(serviceKind);for(const [index,light] of (vehicleVisual.userData.serviceLights||[]).entries())light.material.emissiveIntensity=.32+(Math.floor(performance.now()/210)+index)%2*.9;if(els.vehicleBadge)els.vehicleBadge.textContent=`${serviceIcon} ${car.label||'Veículo'} • ${Math.round(Math.abs(car.speed)*6)} km/h${sprintRequested()?' • TURBO':''} — AÇÃO para sair`;
    if(!state.settings.sound&&engineAudio)stopEngineSound();
    else if(state.settings.sound&&!engineAudio)startEngineSound();
    else if(state.settings.sound&&engineAudio){
      const freq=68+Math.abs(car.speed)*11.5;
      try{engineAudio.osc.frequency.setTargetAtTime(freq,engineAudio.ctx.currentTime,.05);}catch(_){}
    }
  }

  function mobilityDriverActive(){return(player.vehicle&&!player.car.passengerOf)||(player.boating&&!player.boat.passengerOf);}
  function updateMobilityControlLabels(){
    const mobility=mobilityDriverActive(),isBoat=player.boating&&!player.boat.passengerOf,speed=isBoat?Number(player.boat.speed||0):Number(player.car.speed||0);
    const runIcon=$('b',els.runBtn),runLabel=$('span',els.runBtn),jumpIcon=$('b',els.jumpBtn),jumpLabel=$('span',els.jumpBtn),actionIcon=$('b',els.actionBtn),actionLabel=$('span',els.actionBtn);
    if(mobility){if(runIcon)runIcon.textContent='▲';if(runLabel)runLabel.textContent='Acelerar';if(jumpIcon)jumpIcon.textContent=speed>.04?'■':'▼';if(jumpLabel)jumpLabel.textContent=speed>.04?'Freio':'Ré';if(actionIcon)actionIcon.textContent=isBoat?'🛶':'🚗';if(actionLabel)actionLabel.textContent='Sair';}
    else{if(runIcon)runIcon.textContent='🏃';if(runLabel)runLabel.textContent='Correr';if(jumpIcon)jumpIcon.textContent='⬆';if(jumpLabel)jumpLabel.textContent='Pular';}
    els.runBtn?.classList.toggle('mobility-accelerate',mobility);els.runBtn?.classList.toggle('active',mobility?input.mobilityAccelerate:sprintRequested());els.jumpBtn?.classList.toggle('mobility-brake',mobility);els.jumpBtn?.classList.toggle('active',mobility&&input.mobilityBrake);
    if(els.runBtn)els.runBtn.setAttribute('aria-label',mobility?`Acelerar ${isBoat?'barco':'veículo'}`:'Correr');if(els.jumpBtn)els.jumpBtn.setAttribute('aria-label',mobility?(speed>.04?'Frear':'Engatar ré'):'Pular');
  }
  function updateVehicleControlsUI(){
    const vehiclePassenger=!!player.car.passengerOf,boatPassenger=!!player.boat.passengerOf,mobility=mobilityDriverActive();document.body.classList.toggle('mode-vehicle',!!player.vehicle);document.body.classList.toggle('mode-passenger',vehiclePassenger||boatPassenger);document.body.classList.toggle('mode-transit',!!player.transit.mode);document.body.classList.toggle('mode-boat',!!player.boating);document.body.classList.toggle('mode-mobility-driver',mobility);document.body.classList.toggle('mode-building',!!buildMode);document.body.classList.toggle('mode-fishing',!!fishingSession);
    els.secondaryActions?.classList.toggle('vehicle-hidden',!!player.vehicle||!!player.boating);
    els.jumpBtn?.classList.toggle('vehicle-disabled',(!!player.vehicle||!!player.boating)&&!mobility);
    els.specialBtn?.classList.toggle('vehicle-horn',mobility);
    const specialIcon=$('b',els.specialBtn),specialLabel=$('span',els.specialBtn);
    if(specialIcon)specialIcon.textContent=mobility?'📣':'🔥';if(specialLabel)specialLabel.textContent=mobility?'Buzina':'Poder';if(els.specialBtn)els.specialBtn.setAttribute('aria-label',mobility?`Buzina do ${player.boating?'barco':'carro'}`:`Poder de ${playerDisplayName()}`);updateMobilityControlLabels();
  }
  function vehicleHorn(){
    if(!mobilityDriverActive()||paused||!els.modal.hidden)return;const t=performance.now();if(t<player.hornUntil)return;player.hornUntil=t+360;const boat=player.boating;beep(boat?330:410,boat?125:95,boat?'sine':'square');setTimeout(()=>{if(mobilityDriverActive())beep(boat?390:520,boat?100:70,boat?'sine':'square');},105);vibrate(18);if(!boat&&vehicleVisual){vehicleVisual.scale.set(1.015,.99,1.015);setTimeout(()=>vehicleVisual?.scale?.set(1,1,1),120);}
  }
  function enterVehicle(vehicle=world.vehicle){
    if(player.vehicle||player.boating||player.transit.mode||!vehicle||vehicle.occupied||!canEnterMobility(PLAYER_MODES.VEHICLE_DRIVER))return false;
    activeVehicleRef=vehicle;world.activeVehicle=vehicle;player.preVehicleAbilities={scaleMode:player.scaleMode,crouched:player.crouched};player.sitUntil=0;player.attackUntil=0;player.spinUntil=0;player.jumpBuffer=0;player.vy=0;player.grounded=true;clearMovementInputs();
    input.mobilityAccelerate=false;input.mobilityBrake=false;player.vehicle=true;player.car.id=vehicle.id;player.car.kind=vehicle.serviceType||vehicle.kind||'car';player.car.label=vehicle.label||'Veículo';player.car.passengerOf='';player.car.passengerUid='';player.car.passengerBotId='';player.car.heading=vehicle.group.rotation.y||player.facing;player.car.speed=0;player.car.steerVisual=0;player.car.drift=0;player.car._prevSpeed=0;player.x=vehicle.group.position.x;player.z=vehicle.group.position.z;player.y=groundHeightAt(player.x,player.z);player.facing=player.car.heading;vehicle.occupied=true;
    player.scaleMode='normal';player.crouched=false;syncPlayerRootScale();updateAbilityUI();if(playerModel)playerModel.visible=false;if(avatarLayer)avatarLayer.visible=false;applyVehicleAppearance(vehicle);vehicleVisual.visible=true;vehicleVisual.scale.set(1,1,1);vehicleVisual.rotation.set(0,0,0);vehicle.group.visible=false;els.vehicleBadge.hidden=false;updateVehicleControlsUI();updateRunUI();setFlag('gotVehicle');state.vehicles.lastUsedId=vehicle.id;if(typeof onServiceVehicleBoarded==='function')onServiceVehicleBoarded(vehicle);
    if(state.career.activeJob?.id==='delivery'){setMissionState(state.career.activeJob,MISSION_STATES.TRAVELLING,'vehicle-boarded');state.waypoint={id:'delivery-maya',name:'Entregar para Maya',x:65,z:54,navX:55,navZ:48,arrived:false};world.routePath=buildRoutePoints(player,state.waypoint);updateWaypointMarker();}
    const companion=nearestRideCompanion();if(companion)boardNpcPassenger(companion,'car');toast(`${serviceVehicleIcon(player.car.kind)} ${vehicle.label||'Veículo'} ligado! Use o manche para dirigir.`,'good');startEngineSound();saveState(true);return true;
  }
  function enterVehicleAsPassenger(hostUid,vehicleId=''){
    const ghost=world.ghosts.get(hostUid),target=ghost?.userData?.target;
    if(!ghost||!target?.vehicle||target.vehicleRole==='passenger'){toast('O motorista ou o carro não está mais disponível.','warn');return false;}
    if(player.vehicle){toast('Você já está em um veículo.','warn');return false;}
    if(player.boating)exitBoat(true);
    if(player.transit.mode||!canEnterMobility(PLAYER_MODES.VEHICLE_PASSENGER))return false;
    player.preVehicleAbilities={scaleMode:player.scaleMode,crouched:player.crouched};clearMovementInputs();player.vehicle=true;player.car.id=vehicleId||target.vehicleId||'online-car';player.car.passengerOf=hostUid;player.car.passengerUid='';player.car.passengerBotId='';player.car.hostMissingAt=0;player.car.speed=0;player.scaleMode='normal';player.crouched=false;
    if(playerModel)playerModel.visible=false;if(avatarLayer)avatarLayer.visible=false;vehicleVisual.visible=false;els.vehicleBadge.hidden=false;updateVehicleControlsUI();updateRunUI();updateAbilityUI();auditPlayerMode('board-remote-car');toast('Você entrou como passageiro. O motorista controla o carro.','good',2500);saveState(true);return true;
  }
  function exitVehicle(silent=false){
    if(!player.vehicle)return false;
    const passengerHost=player.car.passengerOf,hostedPassenger=player.car.passengerUid,wasPassenger=!!passengerHost,drivenVehicle=currentVehicleRef(),parkX=player.x,parkZ=player.z,parkHeading=player.car.heading;const exitPoint=safeVehicleExitPoint(drivenVehicle);
    if(passengerHost)window.OTTHOS_RTDB?.sendInteraction?.(passengerHost,{type:'vehiclePassengerLeft'});else if(hostedPassenger)window.OTTHOS_RTDB?.sendInteraction?.(hostedPassenger,{type:'vehicleEnded'});
    releaseNpcPassenger('car');input.mobilityAccelerate=false;input.mobilityBrake=false;player.vehicle=false;player.vx=0;player.vz=0;player.car.speed=0;player.car._prevSpeed=0;player.car.passengerOf='';player.car.passengerUid='';player.car.hostMissingAt=0;clearMovementInputs();
    const prior=player.preVehicleAbilities||state.abilities||{scaleMode:'normal',crouched:false};player.scaleMode=['mini','normal','giant'].includes(prior.scaleMode)?prior.scaleMode:'normal';player.crouched=!!prior.crouched;player.preVehicleAbilities=null;syncPlayerRootScale();if(playerModel)playerModel.visible=true;if(avatarLayer)avatarLayer.visible=true;vehicleVisual.visible=false;vehicleVisual.rotation.set(0,0,0);els.vehicleBadge.hidden=true;updateVehicleControlsUI();updateRunUI();updateAbilityUI();stopEngineSound();
    if(drivenVehicle&&!wasPassenger){drivenVehicle.occupied=false;drivenVehicle.group.visible=true;drivenVehicle.group.position.set(parkX,groundHeightAt(parkX,parkZ),parkZ);drivenVehicle.group.rotation.y=parkHeading;drivenVehicle.x=parkX;drivenVehicle.z=parkZ;drivenVehicle.heading=parkHeading;persistParkedVehicle(drivenVehicle);}
    if(typeof onServiceVehicleExited==='function')onServiceVehicleExited(drivenVehicle);clearServiceVehicleVisual();activeVehicleRef=null;world.activeVehicle=null;player.x=exitPoint.x;player.z=exitPoint.z;player.y=exitPoint.y;player.vx=player.vy=player.vz=0;player.grounded=true;player.car.id='';player.car.kind='car';rememberSafePlayerPosition(true);auditPlayerMode('exit-vehicle');if(!silent)toast('Saiu do veículo em local seguro.','good');saveState(true);return true;
  }
  function repairBridge(){
    if(state.flags.bridgeFixed){toast('A ponte já está consertada.','good');return;}
    if(state.inventory.wood<3||state.inventory.stone<2){toast('Precisa de 3 madeiras e 2 pedras.','warn');return;}
    state.inventory.wood-=3;state.inventory.stone-=2;setFlag('bridgeFixed');addXP(70);addReputation(20);toast('Ponte consertada!','good',2200);saveState();
  }

  const BUILD_RECIPES={
    block:{name:'Bloco',icon:'🧱',cost:{blocks:1},description:'Bloco empilhável'},
    wall:{name:'Parede',icon:'🧱',cost:{stone:2,blocks:1},description:'Parede de pedra'},
    floor:{name:'Piso de madeira',icon:'🪵',cost:{wood:2},description:'Plataforma para o quintal'},
    fence:{name:'Cerca',icon:'🚧',cost:{fences:1},description:'Cerca orientada para a direção do personagem'},
    lamp:{name:'Poste',icon:'💡',cost:{wood:1,stone:1},description:'Iluminação para sua construção'},
    bench:{name:'Banco',icon:'🪑',cost:{wood:3},description:'Móvel externo para a vila'},
    planter:{name:'Jardineira',icon:'🌻',cost:{wood:2,stone:1},description:'Flores vivas para o terreno'}
  };
