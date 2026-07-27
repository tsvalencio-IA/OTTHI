/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 26-input-player-physics.js
 * Escopo: Entrada, corrida, pulo, física do jogador/veículo e animação
 * Linhas de origem V642: 3886-4000
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function resolveMovementInput(){
    const left=input.keys.has('ArrowLeft')||input.keys.has('KeyA');
    const right=input.keys.has('ArrowRight')||input.keys.has('KeyD');
    const up=input.keys.has('ArrowUp')||input.keys.has('KeyW');
    const down=input.keys.has('ArrowDown')||input.keys.has('KeyS');
    const keyboardX=(right?1:0)-(left?1:0);
    const keyboardZ=(up?1:0)-(down?1:0);
    let sourceX=0,sourceZ=0;
    if(input.virtualActive){sourceX=input.virtualX;sourceZ=input.virtualZ;}
    else if(Math.abs(keyboardX)+Math.abs(keyboardZ)>0){sourceX=keyboardX;sourceZ=keyboardZ;}
    else if(input.joyId!==null||Math.abs(input.joyX)+Math.abs(input.joyZ)>.02){sourceX=input.joyX;sourceZ=input.joyZ;}
    else if(input.gamepadActive){sourceX=input.gamepadX;sourceZ=input.gamepadZ;}
    const worldMode=derivePlayerMode(),controlMode=!els.modal.hidden&&!fishingSession?PLAYER_MODES.DISABLED_DURING_MODAL:worldMode;
    const intent=normalizeControlIntent(sourceX,sourceZ,controlMode);
    input.targetX=intent.x;input.targetZ=intent.z;input.intent=intent;
    return {x:input.targetX,z:input.targetZ,mode:intent.mode,disabled:intent.disabled};
  }
  function sprintRequested(){return !!(input.touchSprint||input.gamepadSprint||input.keys.has('ShiftLeft')||input.keys.has('ShiftRight'));}
  function updateRunUI(){
    if(!els.runBtn)return;if(typeof mobilityDriverActive==='function'&&mobilityDriverActive()){updateMobilityControlLabels();return;}const active=sprintRequested();els.runBtn.classList.toggle('active',active);const icon=$('b',els.runBtn),label=$('span',els.runBtn);if(icon)icon.textContent='🏃';if(label)label.textContent='Correr';
  }
  function clearMovementInputs(){
    input.keys.clear();input.joyId=null;input.joyX=0;input.joyZ=0;
    input.gamepadX=0;input.gamepadZ=0;input.gamepadActive=false;
    input.virtualX=0;input.virtualZ=0;input.virtualActive=false;
    input.touchSprint=false;input.gamepadSprint=false;input.isSprinting=false;input.mobilityAccelerate=false;input.mobilityBrake=false;input.mobilityControlSource='';
    input.x=0;input.z=0;input.targetX=0;input.targetZ=0;updateRunUI();
    if(els.joystickKnob)els.joystickKnob.style.transform='translate(-50%,-50%)';
  }
  function canJump(){return !player.vehicle&&!player.boating&&!player.transit.mode&&(player.grounded||performance.now()-player.lastGrounded<125);}
  function requestJump(){if(!els.modal.hidden||paused||player.vehicle||player.boating||player.transit.mode)return;player.jumpBuffer=performance.now()+150;if(canJump())doJump();}
  function doJump(){if(!canJump())return;state.stats.jumps++;trackDaily('jump',1);player.vy=10.2;player.grounded=false;player.jumpBuffer=0;beep(540);vibrate(18);}
  function updatePlayer(dt){
    // Entrada é atualizada em todos os estados. O veículo tem prioridade absoluta:
    // uma animação anterior de sofá/cama/TV nunca pode bloquear aceleração ou direção.
    resolveMovementInput();
    input.x=lerp(input.x,input.targetX,Math.min(1,dt*34));
    input.z=lerp(input.z,input.targetZ,Math.min(1,dt*34));
    const mag=Math.hypot(input.x,input.z);let ix=input.x,iz=input.z;if(mag>1){ix/=mag;iz/=mag;}if(fishingSession||fishingVisual?.active){ix=0;iz=0;input.x=input.z=input.targetX=input.targetZ=0;}
    if(player.transit.mode){player.vx=player.vz=0;input.x=input.z=input.targetX=input.targetZ=0;playerGroup.position.set(player.x,player.y,player.z);playerGroup.rotation.y=player.facing;contactShadow.position.set(player.x,groundHeightAt(player.x,player.z)+.025,player.z);if(player.transit.mode==='bus')animatePlayer(dt);updateContext();return;}

    if(player.boating){
      updateBoatPhysics(dt,ix,iz);
    }else if(player.vehicle){
      updateVehiclePhysics(dt,ix,iz);
    }else if(performance.now()<player.sitUntil){
      player.vx*=.82;player.vz*=.82;
    }else{
      const movementYaw=currentHouse?clamp(cameraYaw,-1.18,1.18):cameraYaw,worldMove=cameraRelativeVector(ix,iz,movementYaw);
      const wantsSprint=sprintRequested()&&mag>.14&&!player.crouched&&state.needs.energy>4;input.isSprinting=wantsSprint;
      const needsPenalty=state.needs.energy<15?.72:state.needs.hunger<15?.82:1;const sizeSpeed=player.scaleMode==='mini'?1.12:player.scaleMode==='giant'?.84:1;
      const skillBoost=performance.now()<player.skillDashUntil?1.82:1;
      const speed=(wantsSprint?11.4:7.35)*needsPenalty*sizeSpeed*(player.crouched?.54:1)*skillBoost;
      const targetVx=worldMove.x*speed,targetVz=worldMove.z*speed;const accel=player.grounded?(wantsSprint?34:29):10;
      player.vx=lerp(player.vx,targetVx,Math.min(1,dt*accel));player.vz=lerp(player.vz,targetVz,Math.min(1,dt*accel));if(mag<.03){player.vx*=Math.pow(.0008,dt);player.vz*=Math.pow(.0008,dt);}
    }
    const prevX=player.x,prevZ=player.z;player.x+=player.vx*dt;player.z+=player.vz*dt;player.x=clamp(player.x,-116,116);player.z=clamp(player.z,-116,116);if(player.boating)constrainBoat(prevX,prevZ);else if(!(player.vehicle&&player.car.passengerOf)){resolveCollisions(prevX,prevZ);resolveWaterWalking(prevX,prevZ);}
    const movedNow=Math.hypot(player.x-prevX,player.z-prevZ);if(movedNow>.001){if(player.vehicle||player.boating){state.stats.driven+=movedNow;trackDaily('drive',movedNow);}else{state.stats.walked+=movedNow;trackDaily('walk',movedNow);}}
    const ground=player.boating?.78:groundHeightAt(player.x,player.z);if(!player.grounded)player.vy-=31*dt;player.y+=player.vy*dt;
    if(player.y<=ground&&player.vy<=0){const landed=!player.grounded&&player.vy<-4;player.y=ground;player.vy=0;player.grounded=true;player.lastGrounded=performance.now();if(landed){vibrate(20);beep(180,35,'sine');}}
    else if(player.y>ground+.03)player.grounded=false;
    if(player.jumpBuffer&&player.jumpBuffer>performance.now()&&canJump())doJump();
    if(!player.vehicle&&!player.boating&&Math.hypot(player.vx,player.vz)>.15)player.facing=Math.atan2(player.vx,player.vz);
    playerGroup.position.set(player.x,player.y,player.z);playerGroup.rotation.y=performance.now()<player.spinUntil?player.facing+(1-(player.spinUntil-performance.now())/980)*Math.PI*4:player.facing;syncPlayerRootScale();contactShadow.position.set(player.x,ground+.025,player.z);const air=Math.max(0,player.y-ground);const ss=clamp(1-air*.08,.48,1);contactShadow.scale.setScalar(ss);contactShadow.material.opacity=clamp(.27-air*.035,.06,.27);vehicleVisual.visible=player.vehicle&&!player.car.passengerOf;if(world.boat)world.boat.group.visible=true;updateBoatPanel();
    if(!recoverPlayerIfInvalid())rememberSafePlayerPosition();
    animatePlayer(dt);checkHazards();collectNearbyCrystals();updateContext();
  }
  function mobilityThrottleIntent(analogThrottle,currentSpeed){
    let throttle=Math.abs(analogThrottle)<.05?0:clamp(analogThrottle,-1,1);
    if(input.mobilityAccelerate)throttle=1;
    if(input.mobilityBrake){
      if(currentSpeed>.04)return{throttle:0,brake:true,reverse:false};
      if(currentSpeed<-.04)return{throttle:-1,brake:false,reverse:true};
      return{throttle:-1,brake:false,reverse:true};
    }
    if(input.mobilityAccelerate&&currentSpeed<-.04)return{throttle:0,brake:true,reverse:false};
    if(throttle<-.05&&currentSpeed>.04)return{throttle:0,brake:true,reverse:false};
    if(throttle>.05&&currentSpeed<-.04)return{throttle:0,brake:true,reverse:false};
    return{throttle,brake:false,reverse:throttle<0};
  }
  function updateVehiclePhysics(dt,ix,iz){
    const car=player.car;if(performance.now()<Number(car.incidentUntil||0)){car.speed=lerp(car.speed,0,Math.min(1,dt*8));player.vx=lerp(player.vx,0,Math.min(1,dt*10));player.vz=lerp(player.vz,0,Math.min(1,dt*10));updateMobilityControlLabels();return;}
    // V643: o eixo lateral foi invertido para que direita no manche vire fisicamente para a direita.
    const steer=Math.abs(ix)<.06?0:-ix;
    if(car.passengerOf){const ghost=world.ghosts.get(car.passengerOf),target=ghost?.userData?.target;if(!ghost||!target?.vehicle){car.hostMissingAt=car.hostMissingAt||performance.now();if(performance.now()-car.hostMissingAt>3500){toast('O motorista saiu. Você deixou o carro.','warn');exitVehicle(true);}player.vx=player.vz=0;return;}car.hostMissingAt=0;const heading=Number(target.r||ghost.rotation.y||car.heading),tx=Number(target.x??ghost.position.x)+Math.cos(heading)*.62-Math.sin(heading)*.12,tz=Number(target.z??ghost.position.z)-Math.sin(heading)*.62-Math.cos(heading)*.12;player.vx=clamp((tx-player.x)*10,-26,26);player.vz=clamp((tz-player.z)*10,-26,26);car.heading=heading;player.facing=heading;return;}
    const command=mobilityThrottleIntent(iz,car.speed),throttle=command.throttle;const turbo=sprintRequested()&&!input.mobilityAccelerate;const maxSpeed=turbo?29:23.5,maxReverse=-8.5;
    if(command.brake){car.speed=approachNumber(car.speed,0,(18+Math.abs(car.speed)*1.25)*dt);}
    else{const accelFactor=car.speed>=0?Math.max(.22,1-car.speed/maxSpeed):1;const crossing=(car.speed>0.2&&throttle<0)||(car.speed<-.2&&throttle>0);const throttleAccel=throttle>=0?throttle*(turbo?23:17.8)*accelFactor:throttle*10.8*(crossing?2.9:1);car.speed+=throttleAccel*dt;}
    if(!throttle&&!command.brake)car.speed*=Math.pow(.05,dt);if(Math.abs(car.speed)<.025&&!throttle)car.speed=0;car.speed=clamp(car.speed,maxReverse,maxSpeed);
    const speedRatio=clamp(Math.abs(car.speed)/7,0,1),highSpeedDamp=1/(1+Math.abs(car.speed)/20);car.steerVisual=lerp(car.steerVisual,steer,Math.min(1,dt*9));
    const steeringAuthority=Math.max(clamp(Math.abs(car.speed)/1.5,0,1),Math.abs(throttle)>.1?.2:0);const lowSpeedAssist=.72+speedRatio*.48,turnRate=3.05*lowSpeedAssist*highSpeedDamp*(car.speed<-.08?-1:1);car.heading+=car.steerVisual*turnRate*steeringAuthority*dt;
    const fx=Math.sin(car.heading),fz=Math.cos(car.heading),desiredVx=fx*car.speed,desiredVz=fz*car.speed;const turnHarshness=Math.abs(car.steerVisual)*speedRatio,grip=clamp(1-turnHarshness*.56,.38,1);
    player.vx=lerp(player.vx,desiredVx,Math.min(1,dt*13.5*grip));player.vz=lerp(player.vz,desiredVz,Math.min(1,dt*13.5*grip));car.drift=clamp((1-grip)*clamp(Math.abs(car.speed)/8,0,1),0,1);player.facing=car.heading;updateMobilityControlLabels();
  }
  let animTime=0;
  function animatePlayer(dt){
    if (!playerModel) return;
    animTime+=dt; playerMixer?.update(dt);
    const parts=playerModel.userData.parts;const speed=Math.hypot(player.vx,player.vz);const walking=speed>.25&&player.grounded&&!player.vehicle;const swing=walking?Math.sin(animTime*(8+speed*.45))*.62:0;
    if(parts){
      parts.leftArm.rotation.x=lerp(parts.leftArm.rotation.x,player.grounded?swing:-.65,.22);parts.rightArm.rotation.x=lerp(parts.rightArm.rotation.x,player.grounded?-swing:-.65,.22);parts.leftLeg.rotation.x=lerp(parts.leftLeg.rotation.x,player.grounded?-swing*.8:.38,.22);parts.rightLeg.rotation.x=lerp(parts.rightLeg.rotation.x,player.grounded?swing*.8:.38,.22);
      if(performance.now()<player.emoteUntil){if(player.emoteType==='wave'){parts.rightArm.rotation.x=-2.25;parts.rightArm.rotation.z=Math.sin(animTime*10)*.55;}else if(player.emoteType==='dance'){parts.leftArm.rotation.z=1.1;parts.rightArm.rotation.z=-1.1;playerModel.rotation.y=Math.sin(animTime*4)*.35;}else if(player.emoteType==='selfie'){parts.leftArm.rotation.x=-1.7;parts.rightArm.rotation.x=-.9;playerModel.rotation.z=.08;}else if(player.emoteType==='highfive'){parts.rightArm.rotation.x=-2.6;}else if(player.emoteType==='play'){parts.leftArm.rotation.x=-1.9;parts.rightArm.rotation.x=-1.9;parts.leftArm.rotation.z=.55;parts.rightArm.rotation.z=-.55;playerModel.position.y+=(Math.sin(animTime*10)+1)*.09;playerModel.rotation.y+=Math.sin(animTime*5)*.08;}else if(player.emoteType==='hug'){parts.leftArm.rotation.x=-1.45;parts.rightArm.rotation.x=-1.45;parts.leftArm.rotation.z=-.48;parts.rightArm.rotation.z=.48;}else if(player.emoteType==='tool'){parts.rightArm.rotation.x=-1.25-Math.sin(animTime*18)*1.0;parts.rightArm.rotation.z=-.22;parts.leftArm.rotation.x=-.45;}}else{parts.leftArm.rotation.z=lerp(parts.leftArm.rotation.z,0,.2);parts.rightArm.rotation.z=lerp(parts.rightArm.rotation.z,0,.2);playerModel.rotation.y=lerp(playerModel.rotation.y,0,.18);}
      if(fishingVisual?.active){const phase=fishingVisual.phase,cast=phase==='casting',pull=phase==='hooked'||phase==='pulling'||phase==='caught';parts.rightArm.rotation.x=lerp(parts.rightArm.rotation.x,pull?-2.35:cast?-1.95:-1.45,.38);parts.leftArm.rotation.x=lerp(parts.leftArm.rotation.x,pull?-1.85:cast?-1.35:-1.1,.38);parts.rightArm.rotation.z=lerp(parts.rightArm.rotation.z,-.22,.3);parts.leftArm.rotation.z=lerp(parts.leftArm.rotation.z,.28,.3);playerModel.rotation.z=lerp(playerModel.rotation.z,pull?-.08:.03,.2);}
      const breathe=Math.sin(animTime*2.2)*.02;parts.body.scale.y=(player.crouched?.78:1)+breathe;
      const visualBase=playerModel.userData.baseY??.24;
      const walkBob=walking?Math.abs(Math.sin(animTime*10))*.035:0;
      playerModel.position.y=visualBase+walkBob;
      if(performance.now()<player.sitUntil){parts.leftLeg.rotation.x=1.25;parts.rightLeg.rotation.x=1.25;playerModel.position.y=Math.max(.12,visualBase-.10);}
      // Defesa de regressão: nenhuma animação pode empurrar a sola para baixo do chão.
      playerModel.position.y=Math.max((-(playerModel.userData.minFootY??-.23))+.005,playerModel.position.y);
    } else {
      const base=playerModel.userData.baseY||0;
      const bob=walking?Math.abs(Math.sin(animTime*(8+speed*.4)))*.045:Math.sin(animTime*2.1)*.012;
      const jumpTilt=player.grounded?0:clamp(-player.vy*.012,-.12,.10);
      playerModel.position.y=base+bob+(performance.now()<player.sitUntil?-.22:0);
      playerModel.rotation.x=lerp(playerModel.rotation.x,jumpTilt,.18);
      playerModel.rotation.z=lerp(playerModel.rotation.z,walking?Math.sin(animTime*8)*.025:0,.18);
    }
    if(avatarLayer){avatarLayer.position.y=playerModel.position.y;avatarLayer.rotation.x=playerModel.rotation.x;avatarLayer.rotation.z=playerModel.rotation.z;}
  }
  function checkHazards(){
    for(const h of world.hazards){if(Math.abs(player.x-h.x)<=h.w/2&&Math.abs(player.z-h.z)<=h.d/2&&player.y<.6){if(h.type==='water'){if(!player.boating){player.vx*=.9;player.vz*=.9;}}else if(performance.now()>player.damageUntil){player.damageUntil=performance.now()+1200;state.needs.energy=clamp(state.needs.energy-18,0,100);toast('Cuidado com a lava!','bad');returnHome();}}}
  }
  function collectNearbyCrystals(){
    for(const c of world.crystals){if(c.got)continue;c.mesh.rotation.y+=.035;c.mesh.position.y=c.y+Math.sin(animTime*2+c.x)*.12;if(Math.hypot(player.x-c.x,player.z-c.z)<1.25&&Math.abs(player.y-c.mesh.position.y)<2)collectCrystal(c);}
  }

  function npcSpeech(npc,text,type='good'){if(distance2D(player,npc.group.position)<12)toast(`${npc.name}: ${text}`,type,2400);npc.emoteType=type==='warn'?'wave':'dance';npc.emoteUntil=performance.now()+1600;}
