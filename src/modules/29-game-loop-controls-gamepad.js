/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 29-game-loop-controls-gamepad.js
 * Escopo: Loop principal, controles, gamepad e início do jogo
 * Linhas de origem V642: 4305-4377
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function gameLoop(){
    if(!running)return;raf=requestAnimationFrame(gameLoop);const dt=Math.min(.033,clock.getDelta());samplePerformance(dt);
    if(!paused){
      const tier=qualityTier();pollGamepad();
      // Movimento e câmera permanecem em todo quadro; sistemas pesados usam orçamento próprio.
      updatePlayer(dt);updateCamera(dt);
      if(buildMode)updateBuildPreview();
      if(fishingSession||fishingVisual?.active)updateFishingVisual(dt);
      if(player.vehicle)updateVehicleFX(dt);
      if(typeof fxParticles!=='undefined'&&fxParticles.length)updateFX(dt);
      if(world.fireballs?.length)updateFireballs(dt);
      if(activeRace)updateRace(dt);

      perf.uiAcc+=dt;const uiRate=tier==='high'?1/20:tier==='balanced'?1/12:1/8;
      if(perf.uiAcc>=uiRate){const step=perf.uiAcc;perf.uiAcc=0;updateCareerMissions();updateNeeds(step);updateNavigation(step);}

      perf.trafficAcc+=dt;const trafficRate=tier==='high'?1/24:tier==='balanced'?1/15:1/10;
      if(perf.trafficAcc>=trafficRate){const trafficStep=Math.min(.1,perf.trafficAcc);perf.trafficAcc=0;const trafficBefore=captureTrafficPositions();updateTransitWorld(trafficStep);perf.trafficTicks++;updatePoliceSystem(trafficStep);updateFireService(trafficStep);updateTrafficIncidents(trafficStep);resolveTrafficOverlaps(trafficBefore);}

      perf.aiAcc+=dt;const aiRate=tier==='high'?1/20:tier==='balanced'?1/14:1/9;
      if(perf.aiAcc>=aiRate){const step=Math.min(.11,perf.aiAcc);perf.aiAcc=0;updateNPCs(step);perf.aiTicks++;updateNpcSociety(step);updateEnemies(step);updateMultiplayer(step);updateLifeActivities(step);updateAdventure(step);}

      perf.lodAcc+=dt;const lodRate=tier==='high'?1/10:tier==='balanced'?1/6:1/4;
      if(perf.lodAcc>=lodRate){const step=perf.lodAcc;perf.lodAcc=0;updateVisualLOD(step);}
      perf.cloudAcc+=dt;const cloudRate=tier==='high'?1/12:tier==='balanced'?1/8:1/5;if(perf.cloudAcc>=cloudRate){const step=perf.cloudAcc;perf.cloudAcc=0;updateClouds(step);}
      perf.modeAuditAcc+=dt;if(perf.modeAuditAcc>=.75){perf.modeAuditAcc=0;auditPlayerMode('loop');}
      perf.panelAcc+=dt;if(perf.panelAcc>=1){perf.panelAcc=0;refreshTechnicalPanel();}
    }
    renderer.setScissorTest(false);renderer.setViewport(0,0,renderer.domElement.width,renderer.domElement.height);renderer.autoClear=true;renderer.render(scene,camera);
  }

  function setupControls(){
    const resetJoy=()=>{input.joyId=null;input.joyX=0;input.joyZ=0;els.joystickKnob.style.transform='translate(-50%,-50%)';};
    els.joystick.addEventListener('pointerdown',e=>{e.preventDefault();input.joyId=e.pointerId;safePointerCapture(els.joystick,e.pointerId);updateJoy(e);});
    els.joystick.addEventListener('pointermove',e=>{if(e.pointerId===input.joyId)updateJoy(e);});
    els.joystick.addEventListener('pointerup',resetJoy);els.joystick.addEventListener('pointercancel',resetJoy);
    function updateJoy(e){const r=els.joystick.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,max=r.width*.32;let dx=e.clientX-cx,dy=e.clientY-cy;const mag=Math.hypot(dx,dy);if(mag>max){dx=dx/mag*max;dy=dy/mag*max;}input.joyX=dx/max;input.joyZ=-dy/max;els.joystickKnob.style.transform=`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px))`;}
    const press=(el,fn)=>el?.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();fn();},{passive:false});
    press(els.actionBtn,doAction);
    const setTouchSprint=active=>{input.touchSprint=!!active;updateRunUI();};
    const setAccelerate=active=>{if(mobilityDriverActive()){input.mobilityAccelerate=!!active;input.mobilityControlSource=active?'accelerator':'';if(active)input.mobilityBrake=false;updateMobilityControlLabels();}else setTouchSprint(active);};
    const setBrake=active=>{if(mobilityDriverActive()){input.mobilityBrake=!!active;input.mobilityControlSource=active?'brake':'';if(active)input.mobilityAccelerate=false;updateMobilityControlLabels();}else if(active)requestJump();};
    els.runBtn?.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();setAccelerate(true);safePointerCapture(els.runBtn,e.pointerId);},{passive:false});
    ['pointerup','pointercancel','lostpointercapture'].forEach(type=>els.runBtn?.addEventListener(type,()=>setAccelerate(false)));
    els.jumpBtn?.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();setBrake(true);safePointerCapture(els.jumpBtn,e.pointerId);},{passive:false});
    ['pointerup','pointercancel','lostpointercapture'].forEach(type=>els.jumpBtn?.addEventListener(type,()=>setBrake(false)));
    const adjustCamera=delta=>{cameraZoom=clamp(cameraZoom+delta,-4.5,9);state.settings.cameraZoom=+cameraZoom.toFixed(2);saveState();};
    press(els.cameraNearBtn,()=>adjustCamera(-1.6));press(els.cameraFarBtn,()=>adjustCamera(1.6));press(els.cameraResetBtn,()=>{cameraZoom=0;cameraPitch=.38;cameraYaw=currentHouse?0:player.facing;state.settings.cameraZoom=0;saveState();toast('Câmera centralizada.','good',900);});
    els.miniNav?.addEventListener('click',openMap);press(els.specialBtn,firePower);press(els.crouchBtn,()=>toggleCrouch());press(els.miniBtn,()=>setScaleMode('mini'));press(els.normalBtn,()=>setScaleMode('normal'));press(els.giantBtn,()=>setScaleMode('giant'));press(els.spinBtn,spinPlayer);
    [els.quickBar,els.inventoryBtn,els.buildBtn,els.mapBtn,els.gameSettingsBtn].forEach(el=>el?.addEventListener('pointerdown',e=>e.stopPropagation()));
    window.addEventListener('keydown',e=>{input.keys.add(e.code);if(['Space','KeyE','KeyF','KeyC','Digit1','Digit2','Digit3','KeyR','KeyQ','ShiftLeft','ShiftRight'].includes(e.code))e.preventDefault();if(mobilityDriverActive()&&e.code==='ShiftLeft'){input.mobilityAccelerate=true;input.mobilityBrake=false;}if(mobilityDriverActive()&&e.code==='Space'){input.mobilityBrake=true;input.mobilityAccelerate=false;}updateRunUI();updateMobilityControlLabels();if(e.code==='Space'&&!mobilityDriverActive())requestJump();if(e.code==='KeyE')doAction();if(e.code==='KeyF')firePower();if(e.code==='KeyC')toggleCrouch();if(e.code==='Digit1')setScaleMode('mini');if(e.code==='Digit2')setScaleMode('normal');if(e.code==='Digit3')setScaleMode('giant');if(e.code==='KeyR')spinPlayer();if(e.code==='KeyQ'&&buildMode)rotateBuildPreview();if(e.code==='Escape'){e.preventDefault();if(!running)return;if(buildMode){endBuildMode('cancelled');return;}if(pauseMenuOpen)closeModal();else if(!els.modal.hidden)closeModal();else openPauseMenu();}});window.addEventListener('keyup',e=>{input.keys.delete(e.code);if(e.code==='ShiftLeft'||e.code==='ShiftRight')input.mobilityAccelerate=false;if(e.code==='Space')input.mobilityBrake=false;updateRunUI();updateMobilityControlLabels();});
    els.stage.addEventListener('pointerdown',e=>{if(e.target!==renderer?.domElement)return;input.cameraDrag={id:e.pointerId,x:e.clientX,y:e.clientY};safePointerCapture(els.stage,e.pointerId);});
    els.stage.addEventListener('pointermove',e=>{const d=input.cameraDrag;if(!d||d.id!==e.pointerId)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;cameraYaw-=dx*.006;cameraPitch=clamp(cameraPitch+dy*.003,.05,.9);d.x=e.clientX;d.y=e.clientY;});
    const endDrag=e=>{if(input.cameraDrag?.id===e.pointerId)input.cameraDrag=null;};els.stage.addEventListener('pointerup',endDrag);els.stage.addEventListener('pointercancel',endDrag);
    els.stage.addEventListener('wheel',e=>{if(!running||!els.modal.hidden)return;e.preventDefault();cameraZoom=clamp(cameraZoom+Math.sign(e.deltaY)*.9,-4.5,9);state.settings.cameraZoom=+cameraZoom.toFixed(2);},{passive:false});
  }
  let gamepadJump=false,gamepadAction=false,gamepadPower=false,gamepadCrouch=false,gamepadSize=false;
  function pollGamepad(){
    const gp=[...(navigator.getGamepads?.()||[])].find(Boolean);
    if(!gp){input.gamepadX=0;input.gamepadZ=0;input.gamepadActive=false;input.gamepadSprint=false;updateRunUI();return;}
    const ax=gp.axes[0]||0,az=-(gp.axes[1]||0);
    input.gamepadActive=Math.hypot(ax,az)>.16;input.gamepadX=input.gamepadActive?ax:0;input.gamepadZ=input.gamepadActive?az:0;input.gamepadSprint=!!gp.buttons[10]?.pressed;if(mobilityDriverActive()){input.mobilityAccelerate=gp.buttons[7]?.value>.18;input.mobilityBrake=gp.buttons[6]?.value>.18;}updateRunUI();updateMobilityControlLabels();
    const jump=!!gp.buttons[0]?.pressed,action=!!gp.buttons[2]?.pressed,power=!!gp.buttons[1]?.pressed,crouch=!!gp.buttons[4]?.pressed,size=!!gp.buttons[5]?.pressed;
    if(jump&&!gamepadJump)requestJump();if(action&&!gamepadAction)doAction();if(power&&!gamepadPower)firePower();if(crouch&&!gamepadCrouch)toggleCrouch();if(size&&!gamepadSize)setScaleMode(player.scaleMode==='normal'?'mini':player.scaleMode==='mini'?'giant':'normal');
    gamepadJump=jump;gamepadAction=action;gamepadPower=power;gamepadCrouch=crouch;gamepadSize=size;
    const camX=gp.axes[2]||0;if(Math.abs(camX)>.18)cameraYaw-=camX*.035;const camY=gp.axes[3]||0;if(Math.abs(camY)>.18)cameraPitch=clamp(cameraPitch+camY*.018,.05,.9);
  }

  async function startGame(resetPosition=false){
    await dbReady;
    if((!hasValidPlayerName()||!accountLinked())&&!(accountPromptWasHandled())){openAccountCenter(true,()=>{state.flags.accountPromptedV635=true;saveState(true);startGame(resetPosition);});return;}
    if(!hasValidPlayerName()){openPlayerNameModal(true,()=>startGame(resetPosition));return;}
    closeModal();showScreen('game');
    state.ui.quickOpen=false;state.ui.skillsOpen=false;state.ui.needsOpen=false;state.ui.missionOpen=false;syncMobilePanels();els.game.classList.remove('needs-expanded');els.missionCard.classList.remove('expanded');if(!scene){if(!initThree()){showScreen('lobby');return;}setupControls();}else{applyAvatarCustomization();}
    if(els.toolsBtn){els.toolsBtn.firstChild.textContent=equippedTool().icon;$('span',els.toolsBtn).textContent=equippedTool().name;}
    if(resetPosition){player.x=0;player.z=8;player.y=0;}else restorePosition();player.scaleMode=state.abilities?.scaleMode||'normal';player.crouched=!!state.abilities?.crouched;updateAbilityUI();running=true;paused=false;clock.start();evaluateMissions();updateHUD();updateContext(true);updateNavigation(0,true);resize(true);cancelAnimationFrame(raf);gameLoop();toast('Bem-vindo à Vila do Sol!','good',2200);
  }
