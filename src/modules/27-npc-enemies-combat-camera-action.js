/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 27-npc-enemies-combat-camera-action.js
 * Escopo: Sociedade NPC, inimigos, combate, câmera, contexto, ação e necessidades
 * Linhas de origem V642: 4001-4157
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function nearestRideCompanion(radius=7){
    return world.npcs.filter(n=>!n.passengerMode&&(n.pendingRide||n.following)).sort((a,b)=>distance2D(player,a.group.position)-distance2D(player,b.group.position)).find(n=>distance2D(player,n.group.position)<=radius)||null;
  }
  function nearestBoardableNpc(radius=4.8){
    return world.npcs.filter(n=>!n.passengerMode).sort((a,b)=>distance2D(player,a.group.position)-distance2D(player,b.group.position)).find(n=>distance2D(player,n.group.position)<=radius)||null;
  }
  function boardNpcPassenger(npc,kind){
    if(!npc)return false;const current=kind==='boat'?player.boat:player.car;if(current.passengerUid||current.passengerBotId)return false;current.passengerBotId=npc.id;npc.passengerMode=kind;npc.pendingRide=false;npc.following=false;if(npc.mobility?.ride)npc.mobility.ride.visible=false;toast(`${npc.name} entrou como passageiro no ${kind==='boat'?'barco':'carro'}.`,'good',2300);saveState();return true;
  }
  function releaseNpcPassenger(kind){
    const current=kind==='boat'?player.boat:player.car,id=current.passengerBotId;if(!id)return;const npc=world.npcs.find(n=>n.id===id);if(npc){const exitX=kind==='boat'?BOAT_DOCK.exitX+1.2:player.x+1.8,exitZ=kind==='boat'?clamp(player.z,BOAT_DOCK.minZ+.25,BOAT_DOCK.maxZ-.25):player.z;npc.passengerMode='';npc.group.position.set(exitX,groundHeightAt(exitX,exitZ),exitZ);npc.baseX=npc.group.position.x;npc.baseZ=npc.group.position.z;if(npc.mobility?.ride)npc.mobility.ride.visible=true;}current.passengerBotId='';
  }
  function updateNpcSociety(dt){
    updateNpcSociety.acc=(updateNpcSociety.acc||0)+dt;if(updateNpcSociety.acc<9)return;updateNpcSociety.acc=0;if(!world.npcs.length)return;
    const npc=world.npcs[Math.floor(Math.random()*world.npcs.length)],roll=Math.random();
    if(roll<.22){const gift=Math.random()<.5?'food':'coins';if(gift==='food'){state.inventory.food=(state.inventory.food||0)+1;npcSpeech(npc,'Trouxe uma comida para você!');}else{state.profile.coins+=8;npcSpeech(npc,'Ganhei algumas moedas e dividi com você!');}saveState();updateHUD();}
    else if(roll<.44){npcSpeech(npc,'Quer apostar uma corrida comigo?');npc.userDataChallengeUntil=performance.now()+12000;}
    else if(roll<.66){const other=world.npcs.find(n=>n!==npc);if(other){state.npcSociety.friendships[`${npc.id}-${other.id}`]=(state.npcSociety.friendships[`${npc.id}-${other.id}`]||0)+1;npcSpeech(npc,`Conversei com ${other.name} na praça.`);}}
    else if(roll<.82){npcSpeech(npc,'Hoje estou chateado. Podemos conversar com calma?','warn');state.npcSociety.moods[npc.id]='chateado';}
    else{const available=world.houses.find(h=>!h.publicBuilding&&!cloudHouseRecord(h.id)&&!state.npcSociety.houses[h.id]);if(available){state.npcSociety.houses[available.id]=npc.id;npcSpeech(npc,`Estou juntando moedas para morar na ${available.name}.`);saveState();}}
  }

  function updateNPCs(dt){
    for(const npc of world.npcs){
      const near=distance2D(player,npc.group.position)<3.2;
      const oldX=npc.group.position.x,oldZ=npc.group.position.z;
      if(npc.passengerMode){
        const heading=npc.passengerMode==='boat'?player.boat.heading:player.car.heading,lx=.65,lz=npc.passengerMode==='boat'?.62:-.18;npc.group.position.x=player.x+Math.cos(heading)*lx+Math.sin(heading)*lz;npc.group.position.z=player.z-Math.sin(heading)*lx+Math.cos(heading)*lz;npc.group.position.y=npc.passengerMode==='boat'?.75:.3;npc.group.rotation.y=heading;
      }else if(npc.fishingActivity){
        npc.group.position.x=npc.baseX;npc.group.position.z=npc.baseZ;npc.group.rotation.y=npc.fishingActivity.heading;
      }else if(npc.coopRaceMode){
        /* A posição é controlada por updateCoopRaceVisuals para manter a pista sincronizada. */
      }else if(npc.following){
        const backX=player.x-Math.sin(player.facing)*2.2,backZ=player.z-Math.cos(player.facing)*2.2;
        npc.group.position.x=lerp(npc.group.position.x,backX,Math.min(1,dt*2.4));npc.group.position.z=lerp(npc.group.position.z,backZ,Math.min(1,dt*2.4));npc.group.rotation.y=lerpAngle(npc.group.rotation.y,player.facing,Math.min(1,dt*5));
      }else if(near){
        const look=Math.atan2(player.x-npc.group.position.x,player.z-npc.group.position.z);
        npc.group.rotation.y=lerpAngle(npc.group.rotation.y,look,Math.min(1,dt*5.5));
      }else if(npc.mobility){
        const route=npc.mobility.route,target=route[npc.mobility.index],dx=target.x-npc.group.position.x,dz=target.z-npc.group.position.z,d=Math.hypot(dx,dz);if(performance.now()<Number(npc.mobility.trafficHoldUntil||0)){npc.mobility.currentSpeed=0;}else if(d<.2)npc.mobility.index=(npc.mobility.index+1)%route.length;else{const heading=Math.atan2(dx,dz),factor=trafficSpeedFactor(npc.mobility,heading,6),targetSpeed=npc.mobility.speed*factor;npc.mobility.currentSpeed=lerp(Number(npc.mobility.currentSpeed||0),targetSpeed,Math.min(1,dt*4));const step=Math.min(d,npc.mobility.currentSpeed*dt),previous={x:npc.group.position.x,z:npc.group.position.z};if(step>.0001){npc.group.position.x+=dx/d*step;npc.group.position.z+=dz/d*step;snapTrafficToRoad(npc.group,previous);npc.group.rotation.y=lerpAngle(npc.group.rotation.y,heading,Math.min(1,dt*5));for(const wheel of npc.mobility.wheels)wheel.rotation.x-=step*3;}}
      }else{
        npc.phase+=dt*.45;
        const tx=npc.baseX+Math.sin(npc.phase)*npc.pathRadius,tz=npc.baseZ+Math.cos(npc.phase*.83)*npc.pathRadius;
        npc.group.position.x=lerp(npc.group.position.x,tx,dt*.45);npc.group.position.z=lerp(npc.group.position.z,tz,dt*.45);
        npc.group.rotation.y=lerpAngle(npc.group.rotation.y,Math.atan2(tx-npc.group.position.x,tz-npc.group.position.z),Math.min(1,dt*5));
      }
      if(!npc.passengerMode)npc.group.position.y=lerp(npc.group.position.y,0,Math.min(1,dt*8));
      const moved=Math.hypot(npc.group.position.x-oldX,npc.group.position.z-oldZ);
      const riding=!!npc.mobility&&!npc.passengerMode&&!npc.following,walk=moved>.001&&!riding?Math.sin(animTime*8+npc.phase)*.52:0;
      const gesture=near?Math.sin(animTime*2.4+npc.phase)*.12:0,emote=performance.now()<npc.emoteUntil?npc.emoteType:'';
      if(npc.limbs){
        npc.limbs.leftArm.rotation.x=lerp(npc.limbs.leftArm.rotation.x,riding?-1.2:emote==='dance'?-1.4:walk+gesture,.18);
        npc.limbs.rightArm.rotation.x=lerp(npc.limbs.rightArm.rotation.x,riding?-1.2:emote==='wave'?-2.2:emote==='dance'?-1.4:-walk-gesture,.18);
        npc.limbs.leftLeg.rotation.x=lerp(npc.limbs.leftLeg.rotation.x,riding?1.05:-walk*.78,.18);
        npc.limbs.rightLeg.rotation.x=lerp(npc.limbs.rightLeg.rotation.x,riding?1.05:walk*.78,.18);
      }
      npc.body.position.y=(riding?1.42:1.1)+(moved>.001?Math.abs(Math.sin(animTime*8+npc.phase))*.035:Math.sin(animTime*2+npc.phase)*.012);
    }
  }
  function updateEnemies(dt){
    for(const e of world.enemies){
      if(e.dead){if(performance.now()-e.lastHit>18000){e.dead=false;e.hp=e.type==='golem'?3:1;e.group.visible=true;e.group.position.set(e.baseX,0,e.baseZ);}continue;}
      const d=distance2D(player,e);let tx=e.baseX+Math.sin(animTime*.55+e.phase)*4,tz=e.baseZ+Math.cos(animTime*.48+e.phase)*4;
      if(d<9&&!currentHouse){tx=player.x;tz=player.z;}
      const speed=e.type==='bat'?2.1:e.type==='golem'?1.0:1.45;e.group.position.x=lerp(e.group.position.x,tx,dt*speed);e.group.position.z=lerp(e.group.position.z,tz,dt*speed);e.group.position.y=e.type==='bat'?1.2+Math.sin(animTime*3+e.phase)*.35:0;e.group.rotation.y=Math.atan2(tx-e.group.position.x,tz-e.group.position.z);
      if(d<1.45&&performance.now()>player.damageUntil){player.damageUntil=performance.now()+1100;if(performance.now()<player.shieldUntil){toast('O Escudo Furtivo bloqueou o ataque!','good',1300);beep(690,60,'sine');continue;}state.needs.energy=clamp(state.needs.energy-12,0,100);state.needs.fun=clamp(state.needs.fun-4,0,100);toast('Monstro acertou!','bad');vibrate([35,40,35]);saveState();}
    }
  }
  function meleeAttack(){
    const target=world.enemies.filter(e=>!e.dead).sort((a,b)=>distance2D(player,a.group.position)-distance2D(player,b.group.position))[0];
    if(!target||distance2D(player,target.group.position)>2.35){toast('Nada para atacar por perto.','warn');return;}
    damageEnemy(target,1);player.attackUntil=performance.now()+280;beep(360,60,'sawtooth');
  }
  function damageEnemy(enemy,amount){
    if(enemy.dead)return;enemy.hp-=amount;enemy.lastHit=performance.now();enemy.group.scale.set(1.18,.82,1.18);setTimeout(()=>enemy.group&&enemy.group.scale.set(1,1,1),130);
    if(enemy.hp<=0){enemy.dead=true;enemy.group.visible=false;state.defeated++;addXP(enemy.type==='golem'?45:20);addCoins(enemy.type==='golem'?35:12);toast('Monstro derrotado!','good');evaluateMissions();saveState();}
  }
  function firePower(){
    if(!els.modal.hidden||paused||player.transit.mode)return;
    if(player.vehicle||player.boating){vehicleHorn();return;}
    if(currentHouse){toast('Use o poder do lado de fora.','warn');return;}
    const dir={x:Math.sin(player.facing),z:Math.cos(player.facing)};const mesh=new THREE.Mesh(new THREE.BoxGeometry(.42,.42,.42),mat(0xff5a12,{emissive:0xff2a00,emissiveIntensity:.9}));mesh.position.set(player.x,player.y+1.35,player.z);worldGroup.add(mesh);world.fireballs.push({mesh,x:player.x,y:player.y+1.35,z:player.z,vx:dir.x*12,vz:dir.z*12,life:1.4});beep(220,90,'sawtooth');vibrate(18);
  }
  function updateFireballs(dt){
    for(let i=world.fireballs.length-1;i>=0;i--){const f=world.fireballs[i];f.life-=dt;f.x+=f.vx*dt;f.z+=f.vz*dt;f.mesh.position.set(f.x,f.y,f.z);f.mesh.rotation.x+=dt*7;f.mesh.rotation.y+=dt*9;let hit=false;for(const e of world.enemies){if(!e.dead&&Math.hypot(f.x-e.group.position.x,f.z-e.group.position.z)<1.1){damageEnemy(e,1);hit=true;break;}}if(hit||f.life<=0){worldGroup.remove(f.mesh);world.fireballs.splice(i,1);}}
  }

  function updateCamera(dt){
    let desiredPos,look;
    if(player.transit.mode==='bus'){
      const bus=world.buses.find(item=>item.id===player.transit.busId);
      if(bus){
        bus.group.updateMatrixWorld(true);
        desiredPos=bus.group.localToWorld(new THREE.Vector3(.28,2.28,-2.56));
        look=bus.group.localToWorld(new THREE.Vector3(-.18,1.55,1.75));
        camera.fov=68;
      }
    }
    if(!desiredPos&&fishingVisual?.active){
      const portrait=innerHeight>innerWidth,v=fishingVisual,target=v.phase==='ready'?v.target:(v.bobber?.position||v.target);
      const focusX=lerp(player.x,Number(target?.x??player.x),.58),focusZ=lerp(player.z,Number(target?.z??player.z),.58),focusY=Math.max(.7,player.y+1.0);
      const dist=clamp((portrait?9.2:7.6)+cameraZoom,5.8,14.5),height=clamp((portrait?4.8:4.0)+cameraPitch*2.0,3.2,7.2);
      desiredPos=new THREE.Vector3(focusX-Math.sin(cameraYaw)*dist,focusY+height,focusZ+Math.cos(cameraYaw)*dist);
      look=new THREE.Vector3(focusX,focusY+.12,focusZ);camera.fov=portrait?52:49;
    }
    if(!desiredPos&&currentHouse&&cameraMode==='interior'){
      const h=currentHouse;const portrait=innerHeight>innerWidth;const orbit=clamp(cameraYaw,-1.18,1.18);const dist=clamp((portrait?8.2:7.2)+cameraZoom,5.2,12.5);const height=clamp((portrait?5.6:4.6)+cameraPitch*2.4+cameraZoom*.18,3.8,8.8);
      desiredPos=new THREE.Vector3(player.x-Math.sin(orbit)*dist,player.y+height,player.z+Math.cos(orbit)*dist);look=new THREE.Vector3(player.x,player.y+1.15,player.z);camera.fov=portrait?54:50;
    }else if(!desiredPos){
      const portrait=innerHeight>innerWidth;const speed=Math.hypot(player.vx,player.vz);
      if((player.vehicle||player.boating)&&!input.cameraDrag){const heading=player.vehicle?player.car.heading:player.boat.heading;cameraYaw=lerpAngle(cameraYaw,Math.PI-heading,Math.min(1,dt*3.2));}
      const speedKick=clamp(Math.abs(player.vehicle?player.car.speed:speed)/9,0,1.6);
      const dist=clamp((portrait?12.5:10.2)+(player.vehicle?3.4:player.boating?2.2:0)+speedKick*1.6+cameraZoom,6.5,24);const height=clamp((portrait?6.6:5.4)+(player.vehicle?.4:player.boating?.25:0)+cameraPitch*2.2+cameraZoom*.16,3.5,12);
      desiredPos=new THREE.Vector3(player.x-Math.sin(cameraYaw)*dist,player.y+height,player.z+Math.cos(cameraYaw)*dist);const visualHeight=1.4*playerScaleValue()*(player.crouched?.72:1);look=new THREE.Vector3(player.x+Math.sin(cameraYaw)*3.5,player.y+visualHeight,player.z-Math.cos(cameraYaw)*3.5);
      camera.fov=(portrait?57:60)+speedKick*(player.vehicle?7:player.boating?4:2);
    }
    const t=1-Math.exp(-dt*7.5);camera.position.lerp(desiredPos,t);camera.lookAt(look);camera.updateProjectionMatrix();
  }

  function nearestInteractable(){
    if(activeRace)return null;
    if(player.transit.mode==='metro')return null;
    if(player.transit.mode==='bus')return{id:'request-bus-stop',type:'bus',icon:'🔔',label:player.transit.requestStop?'Parada já solicitada':'Pedir próxima parada',radius:999,priority:999,action:()=>{player.transit.requestStop=true;updateTransitPanel();toast('Parada solicitada.','good',1200);}};
    if(player.boating){const free=!player.boat.passengerOf&&!player.boat.passengerUid&&!player.boat.passengerBotId,remote=free?nearestRemotePlayer():null,npc=free?nearestBoardableNpc():null;if(remote)return{id:`boat-remote-${remote.uid}`,type:'remote-player',icon:'🌐',label:`Convidar ${remote.ghost.userData.displayName||'Jogador'} para o barco`,radius:999,priority:1001,action:()=>openRemotePlayerActions(remote.uid,remote.ghost)};if(npc)return{id:`boat-invite-${npc.id}`,type:'boat',icon:'🛶',label:`Convidar ${npc.name} para o barco`,radius:999,priority:1000,action:()=>boardNpcPassenger(npc,'boat')};return{id:'exit-boat',type:'boat',icon:'🛶',label:'Sair do barco no píer',radius:999,priority:999,action:exitBoat};}
    if(player.vehicle){const free=!player.car.passengerOf&&!player.car.passengerUid&&!player.car.passengerBotId,remote=free?nearestRemotePlayer():null,npc=free?nearestBoardableNpc():null;if(remote)return{id:`car-remote-${remote.uid}`,type:'remote-player',icon:'🌐',label:`Convidar ${remote.ghost.userData.displayName||'Jogador'} para o carro`,radius:999,priority:1001,action:()=>openRemotePlayerActions(remote.uid,remote.ghost)};if(npc)return{id:`car-invite-${npc.id}`,type:'vehicle',icon:'🚗',label:`Convidar ${npc.name} para o carro`,radius:999,priority:1000,action:()=>boardNpcPassenger(npc,'car')};return{id:'exit-vehicle',type:'vehicle',icon:'🚗',label:'Sair do carro',radius:999,priority:999,action:exitVehicle};}
    if(buildMode)return{id:'place-build',type:'build',icon:'🧱',label:`Confirmar ${BUILD_RECIPES[buildMode]?.name||'construção'}`,radius:999,priority:999,action:placeBuild};
    const remote=nearestRemotePlayer();if(remote)return{id:`remote-${remote.uid}`,type:'remote-player',icon:'🌐',label:`Interagir: ${remote.ghost.userData.displayName||'Jogador'}`,radius:2.8,priority:980,x:remote.ghost.position.x,z:remote.ghost.position.z,action:()=>openRemotePlayerActions(remote.uid,remote.ghost)};
    let nearest=null,best=Infinity;
    for(const it of world.interactables){
      if(!isInteractionAvailable(it))continue;
      const pos=worldPos(it),d=Math.hypot(player.x-pos.x,player.z-pos.z);
      if(d>(it.radius||2))continue;
      const score=d-(it.priority||0)*.006;
      if(score<best){best=score;nearest=it;}
    }
    return nearest;
  }
  function updateContext(force=false){
    const now=performance.now(),moved=Math.hypot(player.x-lastContextScanX,player.z-lastContextScanZ);if(!force&&now-lastContextScanAt<85&&moved<.18)return;lastContextScanAt=now;lastContextScanX=player.x;lastContextScanZ=player.z;
    const next=nearestInteractable();const id=next?.id||'';if(!force&&id===lastContextId)return;lastContextId=id;currentContext=next;els.contextPrompt.hidden=!next;els.actionBtn.classList.toggle('pulse',!!next);els.contextIcon.textContent=next?.icon||'⚔';els.contextLabel.textContent=next?.label||'Atacar';els.contextHint.textContent=next?'Toque em AÇÃO':'Ataque próximo';const span=$('span',els.actionBtn);const icon=$('b',els.actionBtn);if(span)span.textContent=next?'Ação':'Espada';if(icon)icon.textContent=next?.icon||'⚔';
  }
  function doAction(){
    if(paused||!els.modal.hidden||performance.now()<actionLockedUntil)return;
    actionLockedUntil=performance.now()+90;state.stats.actions++;
    if(state.ui.quickOpen){state.ui.quickOpen=false;syncMobilePanels();}
    let target=currentContext;
    if(target&&target.radius!==999){const pos=worldPos(target);if(!isInteractionAvailable(target)||Math.hypot(player.x-pos.x,player.z-pos.z)>(target.radius||2)+.2)target=null;}
    if(!target)target=nearestInteractable();
    currentContext=target;lastActionSource=target?.id||'melee';
    if(target){target.action();updateContext(true);return;}
    meleeAttack();
  }

  function updateNeeds(dt){
    updateNeeds.acc=(updateNeeds.acc||0)+dt;if(updateNeeds.acc<1)return;const sec=updateNeeds.acc;updateNeeds.acc=0;state.needs.hunger=clamp(state.needs.hunger-sec*.065,0,100);state.needs.energy=clamp(state.needs.energy-sec*((player.vehicle||player.boating)?(sprintRequested()?.085:.035):(input.isSprinting?.16:.045)),0,100);state.needs.fun=clamp(state.needs.fun-sec*.025,0,100);state.needs.hygiene=clamp(state.needs.hygiene-sec*.028,0,100);if(state.needs.hunger<8&&Math.random()<.08)toast(`${playerDisplayName()} está com fome.`,'warn');updateHUD();if(!updateNeeds.lastSave||performance.now()-updateNeeds.lastSave>10000){updateNeeds.lastSave=performance.now();saveState();}
  }

  let localChannel=null,lastPublish=0,lastPublishSnapshot=null,lastPublishHeartbeat=0;

  let multiplayerState={mode:'solo',connected:false,count:0,room:normalizeRoomId(window.OTTHI_CONFIG?.defaultRoom),error:'',players:[]};const remotePresence=new Map();let pendingCloudCampfires={},pendingCloudExtensions={};
  const cloudHouses=new Map(),cloudChat=[],incomingChallenges=new Map(),incomingSocialRequests=new Map(),gameSessions=new Map(),shownChallengeToasts=new Set(),shownSocialToasts=new Set(),shownGameResults=new Set();let activeMultiplayerGameId='',promptChallengeId='',promptSessionId='',promptSocialRequestId='';
