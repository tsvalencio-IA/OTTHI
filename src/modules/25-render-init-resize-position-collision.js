/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 25-render-init-resize-position-collision.js
 * Escopo: Three.js, qualidade, viewport, resize, posição segura e colisões
 * Linhas de origem V642: 3755-3885
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function initThree(){
    if(!window.THREE){openModal('Erro ao carregar 3D','<p>A biblioteca Three.js não carregou. Verifique a internet e recarregue a página.</p>');return false;}
    scene=new THREE.Scene();clock=new THREE.Clock();const initialViewport=viewportMetrics();camera=new THREE.PerspectiveCamera(58,initialViewport.w/initialViewport.h,.05,1200);
    renderer=new THREE.WebGLRenderer({antialias:qualityTier()==='high'&&!perf.mobile,alpha:false,powerPreference:'high-performance',precision:'highp',depth:true,stencil:false});renderer.setPixelRatio(Math.min(devicePixelRatio||1,targetDpr()));renderer.setSize(initialViewport.w,initialViewport.h,false);renderer.shadowMap.enabled=qualityTier()==='high'&&!perf.mobile;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.94;els.stage.innerHTML='';els.stage.appendChild(renderer.domElement);renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();paused=true;toast('A placa gráfica reiniciou. Toque no menu para recarregar o jogo.','bad',5000);});renderer.domElement.addEventListener('webglcontextrestored',()=>{toast('Render restaurado.','good',1800);paused=false;});
    initMaterials();
    scene.add(new THREE.HemisphereLight(0xdff4ff,0x28401f,.72));sunLight=new THREE.DirectionalLight(0xffdf9a,1.28);sunLight.position.set(32,46,24);sunLight.castShadow=qualityTier()==='high'&&!perf.mobile;sunLight.shadow.mapSize.set(qualityTier()==='high'?1024:768,qualityTier()==='high'?1024:768);sunLight.shadow.camera.left=-80;sunLight.shadow.camera.right=80;sunLight.shadow.camera.top=80;sunLight.shadow.camera.bottom=-80;sunLight.shadow.camera.far=160;sunLight.shadow.bias=-.0015;scene.add(sunLight);
    const fill=new THREE.DirectionalLight(0xb9ddff,.16);fill.position.set(-28,20,-18);scene.add(fill); // preenchimento barato (sem sombra) para suavizar o lado escuro dos objetos
    createPlayerModel();playerModel.position.y=playerModel.userData.baseY;applyAvatarCustomization();buildWorld();restoreActiveJobRuntime();reconcileCloudHouses();lockStableSceneVisibility();freezeWorldFrustumCulling();restorePosition();initLocalMultiplayer();for(const [remoteUid,data] of remotePresence)remotePlayerEvent({uid:remoteUid,...data});applyQuality();applyAdaptiveRenderSettings(true);resize(true);return true;
  }
  function applyQuality(){ if(!renderer)return;applyAdaptiveRenderSettings(); }
  function viewportMetrics(){
    const vv=window.visualViewport,de=document.documentElement,rect=els.stage?.getBoundingClientRect?.()||{};
    // Dentro da PWA/WebView, visualViewport pode reportar uma área menor que o palco real.
    // O retângulo CSS do #stage é a fonte de verdade para o WebGL; isso impede a cena
    // de ocupar apenas parte da tela quando a qualidade usa pixelRatio abaixo de 1.
    const stageW=Number(rect.width||0),stageH=Number(rect.height||0);
    let w=Math.round(stageW>2?stageW:(de.clientWidth||vv?.width||innerWidth||390));
    let h=Math.round(stageH>2?stageH:(de.clientHeight||vv?.height||innerHeight||720));
    const offsetTop=0,offsetLeft=0;
    const type=String(screen.orientation?.type||''),cssLandscape=matchMedia('(orientation: landscape)').matches,dimensionLandscape=w>h,landscape=Math.abs(w-h)>12?dimensionLandscape:(type.includes('landscape')?true:type.includes('portrait')?false:cssLandscape);
    const layoutHeight=Math.round(de.clientHeight||innerHeight||h),keyboard=Math.max(0,layoutHeight-h)>120;
    return{w:Math.max(280,w),h:Math.max(220,h),landscape,offsetTop,offsetLeft,keyboard};
  }
  function resize(force=false){
    const metrics=viewportMetrics(),w=metrics.w,h=metrics.h,landscape=metrics.landscape,portrait=!landscape;
    const sizeChanged=Math.abs(w-perf.lastRenderW)>2||Math.abs(h-perf.lastRenderH)>2;const orientationChanged=resize._landscape!==undefined&&resize._landscape!==landscape;resize._landscape=landscape;
    if(renderer&&camera&&(sizeChanged||force||orientationChanged)){camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,targetDpr()));renderer.setSize(w,h,false);perf.lastRenderW=w;perf.lastRenderH=h;}
    const short=landscape&&h<560,ultraShort=landscape&&h<410,narrow=portrait&&w<390,tiny=h<620||w<350,compact=short||narrow||w<700;
    if(orientationChanged){clearMovementInputs();state.ui.quickOpen=false;state.ui.skillsOpen=false;state.ui.needsOpen=false;state.ui.missionOpen=false;els.game?.classList.remove('needs-expanded');els.missionCard?.classList.remove('expanded');document.body.classList.add('ui-orientation-changing');setTimeout(()=>document.body.classList.remove('ui-orientation-changing'),360);}
    const action=landscape?clamp(Math.min(h*.112,w*.075),ultraShort?38:42,58):clamp(Math.min(w*(narrow?.145:.155),h*.105),48,64);
    const joy=landscape?clamp(Math.min(h*.22,w*.14),ultraShort?74:82,108):clamp(Math.min(w*(narrow?.265:.28),h*.19),90,124);
    const skillGap=landscape?clamp(h*.009,3,6):clamp(w*.012,4,6),maxSkillPortrait=(w-36-skillGap*4)/5;
    const skill=landscape?clamp(h*.086,ultraShort?30:34,46):clamp(maxSkillPortrait,34,46),uiScale=clamp(Math.min(w/390,h/720),.72,1.06),hudScale=clamp(landscape?h/440:w/390,.78,1.02),panelScale=clamp(Math.min(w/390,h/700),.76,1.04),root=document.documentElement;
    const controlZone=Math.ceil(Math.max(joy,action*2+(landscape?6:8))+18),modalMax=Math.max(210,h-16);
    root.style.setProperty('--action',`${Math.round(action)}px`);root.style.setProperty('--joy',`${Math.round(joy)}px`);root.style.setProperty('--gap',`${landscape?6:8}px`);root.style.setProperty('--skill',`${Math.round(skill)}px`);root.style.setProperty('--skill-gap',`${Math.round(skillGap)}px`);root.style.setProperty('--ui-scale',uiScale.toFixed(3));root.style.setProperty('--hud-scale',hudScale.toFixed(3));root.style.setProperty('--panel-scale',panelScale.toFixed(3));root.style.setProperty('--control-zone',`${controlZone}px`);root.style.setProperty('--modal-max-height',`${modalMax}px`);root.style.setProperty('--vvh',`${h}px`);root.style.setProperty('--vvw',`${w}px`);root.style.setProperty('--vv-top',`${metrics.offsetTop}px`);root.style.setProperty('--vv-left',`${metrics.offsetLeft}px`);
    document.body.classList.toggle('ui-landscape',landscape);document.body.classList.toggle('ui-portrait',portrait);document.body.classList.toggle('ui-short',short);document.body.classList.toggle('ui-ultra-short',ultraShort);document.body.classList.toggle('ui-narrow',narrow);document.body.classList.toggle('ui-tiny',tiny);document.body.classList.toggle('ui-compact',compact);document.body.classList.toggle('ui-keyboard',metrics.keyboard);document.body.dataset.orientation=landscape?'landscape':'portrait';syncMobilePanels();
  }
  function scheduleStableResize(delay=120,force=false){clearTimeout(perf.resizeTimer);perf.resizeTimer=setTimeout(()=>resize(force),delay);}
  function ensureViewportCoherence(){
    const metrics=viewportMetrics(),classLandscape=document.body.classList.contains('ui-landscape'),bufferMismatch=Math.abs(metrics.w-Number(perf.lastRenderW||0))>2||Math.abs(metrics.h-Number(perf.lastRenderH||0))>2;
    if(classLandscape!==metrics.landscape||bufferMismatch){window.OTTHI_VIEWPORT?.measure?.();resize(true);return true;}return false;
  }
  function refreshOrientationLayout(){
    resize(true);requestAnimationFrame(()=>resize(true));[60,160,320,620,1000].forEach(delay=>setTimeout(()=>resize(true),delay));
  }
  window.addEventListener('resize',()=>scheduleStableResize(50,true),{passive:true});window.addEventListener('orientationchange',refreshOrientationLayout,{passive:true});window.addEventListener('pageshow',refreshOrientationLayout,{passive:true});window.addEventListener('focus',()=>scheduleStableResize(30,true),{passive:true});document.addEventListener('fullscreenchange',refreshOrientationLayout,{passive:true});if(window.visualViewport){window.visualViewport.addEventListener('resize',()=>scheduleStableResize(50,true),{passive:true});window.visualViewport.addEventListener('scroll',()=>scheduleStableResize(80,false),{passive:true});}screen.orientation?.addEventListener?.('change',refreshOrientationLayout);if(window.ResizeObserver&&els.stage)new ResizeObserver(()=>scheduleStableResize(40,true)).observe(els.stage);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshOrientationLayout();});

  function restorePosition(){
    const pos=state.position||{x:0,y:0,z:8,yaw:0};let x=Number.isFinite(pos.x)?pos.x:0,z=Number.isFinite(pos.z)?pos.z:8;
    cameraYaw=Number.isFinite(pos.yaw)?pos.yaw:0;
    if(Math.abs(x)>110||Math.abs(z)>110||isInsideLakeNavigable(x,z)){x=0;z=8;state.boats.activeBoatId='';state.boats.passengerOf='';}
    const safe=safePointNear(x,z,{ignoreTraffic:true,allowWater:false});player.x=safe.x;player.z=safe.z;player.y=safe.y;player.vx=player.vy=player.vz=0;player.grounded=true;rememberSafePlayerPosition(true);
  }
  function returnHome(){
    if(player.boating){player.x=-24.7;player.z=52;exitBoat(true);}
    if(player.vehicle)exitVehicle(true);
    if(player.transit.mode==='bus'){const bus=world.buses.find(b=>b.id===player.transit.busId);if(bus&&busAtStop(bus))exitBusAtStop(bus,{stopId:bus.lastStopId,stopName:bus.lastStopName});else{player.transit.mode='';player.transit.busId='';}}
    if(player.transit.mode==='metro'){player.transit.mode='';player.transit.metroUntil=0;if(metroOverlay){metroOverlay.hidden=true;metroOverlay.classList.remove('travelling','arriving');}if(playerModel)playerModel.visible=true;if(avatarLayer)avatarLayer.visible=true;if(contactShadow)contactShadow.visible=true;}
    if(currentHouse)exitHouse();const safe=safePointNear(0,23,{ignoreTraffic:true,allowWater:false});player.x=safe.x;player.z=safe.z;player.y=safe.y;player.vx=player.vz=player.vy=0;player.grounded=true;cameraYaw=Math.PI;rememberSafePlayerPosition(true);auditPlayerMode('return-home');toast('Você voltou para casa.','good');savePlayerPosition(true);
  }
  function savePlayerPosition(immediate=false){
    if(player.boating&&player.boat)state.boats.lastPosition={x:+player.x.toFixed(2),z:+player.z.toFixed(2),heading:+player.boat.heading.toFixed(3)};
    const transient=!!currentHouse||!!player.transit.mode||!!player.car.passengerOf||!!player.boat.passengerOf;
    const x=transient?Number(player.lastSafeX||state.position?.x||0):player.x,z=transient?Number(player.lastSafeZ||state.position?.z||8):player.z,y=transient?Number(player.lastSafeY||0):player.y,yaw=currentHouse?Number(enterHouse.outdoorYaw||cameraYaw):cameraYaw;
    if(Number.isFinite(x)&&Number.isFinite(z)&&!isInsideLakeNavigable(x,z))state.position={x:+x.toFixed(2),y:+Number(y||0).toFixed(2),z:+z.toFixed(2),yaw:+Number(yaw||0).toFixed(3)};
    saveState(immediate);
  }
  const autoSaveInterval=setInterval(()=>{if(running){savePlayerPosition(true);}},8000);
  window.addEventListener('pagehide',()=>{if(running)savePlayerPosition(true);else commitState();});
  window.addEventListener('beforeunload',()=>{if(running)savePlayerPosition(true);else commitState();});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){if(running)savePlayerPosition(true);else commitState();}});

  function groundHeightAt(x,z){
    let top=0;for(const p of world.platforms){if(p.bridgePart!==undefined&&!state.flags.bridgeFixed&&p.bridgePart%2===1)continue;if(Math.abs(x-p.x)<=p.w/2+.35&&Math.abs(z-p.z)<=p.d/2+.35&&p.top>top&&player.y>=p.top-.75)top=p.top;}return top;
  }
  function positionBlockedForPlayer(x,z,radius=.48,options={}){
    if(!Number.isFinite(x)||!Number.isFinite(z)||Math.abs(x)>116||Math.abs(z)>116)return true;
    if(!options.allowWater&&waterAt(x,z)&&groundHeightAt(x,z)<=.24)return true;
    for(const c of world.colliders){
      if(options.ignoreHouseId&&c.houseId===options.ignoreHouseId)continue;
      if(c.houseId&&currentHouse&&c.houseId===currentHouse.id)continue;
      if(Math.abs(x-c.x)<=c.w/2+radius&&Math.abs(z-c.z)<=c.d/2+radius)return true;
    }
    if(!options.ignoreParkedVehicles){for(const v of world.vehicles||[]){if(!v.group?.visible||v===options.ignoreActor)continue;if(Math.hypot(x-v.group.position.x,z-v.group.position.z)<1.18+radius)return true;}}
    if(!options.ignoreTraffic){
      for(const actor of trafficActorList()){
        if(options.ignoreActor&&actor.ref===options.ignoreActor)continue;
        if(Math.hypot(x-actor.group.position.x,z-actor.group.position.z)<(actor.radius||1.4)+radius)return true;
      }
    }
    return false;
  }
  function safePointNear(x,z,options={}){
    const radius=Number(options.radius||.48),heading=Number(options.heading||0),distances=options.distances||[0,1.4,2.2,3.1,4.2],angles=options.angles||[0,Math.PI/2,-Math.PI/2,Math.PI,-Math.PI/4,Math.PI/4];
    for(const distance of distances)for(const offset of angles){const angle=heading+offset,cx=clamp(x+Math.sin(angle)*distance,-115,115),cz=clamp(z+Math.cos(angle)*distance,-115,115);if(!positionBlockedForPlayer(cx,cz,radius,options))return{x:cx,z:cz,y:groundHeightAt(cx,cz)};}
    const fallback={x:clamp(Number(player.lastSafeX)||0,-115,115),z:clamp(Number(player.lastSafeZ)||8,-115,115)};return{x:fallback.x,z:fallback.z,y:groundHeightAt(fallback.x,fallback.z)};
  }
  function rememberSafePlayerPosition(force=false){
    const now=performance.now();if(!force&&now-Number(player.lastSafeAt||0)<450)return false;
    if(!player.grounded||player.vehicle||player.boating||player.transit.mode||positionBlockedForPlayer(player.x,player.z,.38,{ignoreTraffic:true}))return false;
    player.lastSafeX=player.x;player.lastSafeY=player.y;player.lastSafeZ=player.z;player.lastSafeAt=now;player.invalidSince=0;return true;
  }
  function recoverPlayerIfInvalid(){
    const impossible=!Number.isFinite(player.x)||!Number.isFinite(player.y)||!Number.isFinite(player.z)||Math.abs(player.x)>130||Math.abs(player.z)>130||player.y<-12||player.y>80;
    const penetrated=!player.vehicle&&!player.boating&&!player.transit.mode&&positionBlockedForPlayer(player.x,player.z,.24,{ignoreTraffic:true,allowWater:!!currentHouse});
    if(!impossible&&!penetrated){player.invalidSince=0;rememberSafePlayerPosition();return false;}
    player.invalidSince=player.invalidSince||performance.now();if(!impossible&&performance.now()-player.invalidSince<1100)return false;
    const safe=safePointNear(Number(player.lastSafeX)||0,Number(player.lastSafeZ)||8,{ignoreTraffic:true,allowWater:false});player.x=safe.x;player.z=safe.z;player.y=safe.y;player.vx=player.vy=player.vz=0;player.grounded=true;player.invalidSince=0;console.warn('[OTTHOS] Posição impossível recuperada para o último ponto seguro.');return true;
  }
  function safeVehicleExitPoint(vehicleRef=null){
    const heading=Number(player.car.heading||player.facing||0),x=player.x,z=player.z;
    return safePointNear(x,z,{heading,radius:.46,ignoreActor:vehicleRef,angles:[Math.PI/2,-Math.PI/2,Math.PI,0],distances:[2.25,2.9,3.6,4.4]});
  }
  function vehicleHitsCollider(x,z){
    const h=player.car.heading,fx=Math.sin(h),fz=Math.cos(h),rx=Math.cos(h),rz=-Math.sin(h),active=currentVehicleRef();
    const probes=[[0,0,.38],[fx*1.12,fz*1.12,.34],[-fx*1.08,-fz*1.08,.34],[fx*.88+rx*.72,fz*.88+rz*.72,.30],[fx*.88-rx*.72,fz*.88-rz*.72,.30],[-fx*.84+rx*.72,-fz*.84+rz*.72,.30],[-fx*.84-rx*.72,-fz*.84-rz*.72,.30]];
    const hitBox=c=>probes.some(([ox,oz,pad])=>Math.abs(x+ox-c.x)<=c.w/2+pad&&Math.abs(z+oz-c.z)<=c.d/2+pad);
    if(world.colliders.some(c=>!(c.houseId&&currentHouse&&c.houseId===currentHouse.id)&&hitBox(c)))return true;
    for(const v of world.vehicles||[]){if(v===active||!v.group?.visible)continue;if(Math.hypot(x-v.group.position.x,z-v.group.position.z)<2.05)return true;}
    for(const actor of trafficActorList()){if(actor.ref===active)continue;if(Math.hypot(x-actor.group.position.x,z-actor.group.position.z)<(actor.radius||1.5)+1.0)return true;}
    return false;
  }
  function registerVehicleImpact(){
    vehicleImpactCount++;player.car.speed*=.08;player.vx*=.1;player.vz*=.1;
    const t=performance.now();if(!registerVehicleImpact._cool||t>registerVehicleImpact._cool){registerVehicleImpact._cool=t+240;vibrate([18,35,18]);beep(135,65,'square');toast('Cuidado com a batida!','warn',900);}
  }
  function resolveCollisions(prevX,prevZ){
    if(player.vehicle){
      if(vehicleHitsCollider(player.x,player.z)){player.x=prevX;player.z=prevZ;registerVehicleImpact();}
      return;
    }
    const radius=.43*playerScaleValue()*(player.crouched?.82:1);
    for(const c of world.colliders){
      if(c.houseId&&currentHouse&&c.houseId===currentHouse.id)continue;
      if(Math.abs(player.x-c.x)>c.w/2+radius||Math.abs(player.z-c.z)>c.d/2+radius)continue;
      const fromLeft=prevX<=c.x-c.w/2-radius,fromRight=prevX>=c.x+c.w/2+radius,fromTop=prevZ<=c.z-c.d/2-radius,fromBottom=prevZ>=c.z+c.d/2+radius;
      if(fromLeft)player.x=c.x-c.w/2-radius;else if(fromRight)player.x=c.x+c.w/2+radius;else if(fromTop)player.z=c.z-c.d/2-radius;else if(fromBottom)player.z=c.z+c.d/2+radius;else{player.x=prevX;player.z=prevZ;}
    }
    if(currentHouse){const bounds=currentHouse.interiorBounds||{x:4.0,z:3.02};player.x=clamp(player.x,currentHouse.x-bounds.x,currentHouse.x+bounds.x);player.z=clamp(player.z,currentHouse.z-bounds.z,currentHouse.z+bounds.z);}
  }
