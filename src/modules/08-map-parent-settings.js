/**
 * OTTHI World Edu V642 — módulo-fonte
 * Arquivo: 08-map-parent-settings.js
 * Escopo: Mapa, marcadores, waypoint, reset, ferramentas parentais e configurações
 * Linhas de origem V642: 1201-1359
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function mapLocationDetails(loc){const d=MAP_LOCATION_DETAILS[loc.id]||MAP_LOCATION_DETAILS.default;return{description:d[0],actions:d[1]};}
  function worldToMap(x,z){ return { left:clamp((x+116)/232*100,2.5,97.5), top:clamp((116-z)/232*100,2.5,97.5) }; }
  function mapDistance(point){ return Math.round(Math.hypot(player.x-(point.navX??point.x),player.z-(point.navZ??point.z))); }
  let mapSelectedId='';
  function mapMarkerPlacements(locations,playerPoint,mapWidth=0,mapHeight=0){
    const portrait=window.matchMedia?.('(orientation: portrait)')?.matches??(innerHeight>=innerWidth);
    const lowLandscape=!portrait&&innerHeight<=600;
    const width=Math.max(220,Number(mapWidth)||Math.min(760,Math.max(280,innerWidth-(portrait?24:300))));
    const height=Math.max(150,Number(mapHeight)||Math.min(620,Math.max(180,innerHeight-(portrait?430:110))));
    // Usa o maior diâmetro visual (selecionado/ativo), evitando colisão também após o toque.
    const markerDiameter=portrait?36:(lowLandscape?34:38),safeGapPx=markerDiameter+4;
    const gapX=safeGapPx/width*100,gapY=safeGapPx/height*100;
    const playerGapX=(markerDiameter+15)/width*100,playerGapY=(markerDiameter+15)/height*100;
    const edgeX=(markerDiameter/2+5)/width*100,edgeY=(markerDiameter/2+5)/height*100;
    const minLeft=clamp(edgeX,3.5,11),maxLeft=100-minLeft,minTop=clamp(edgeY,4.5,16),maxTop=100-minTop;
    const points=locations.map((loc,index)=>{const pos=worldToMap(loc.navX??loc.x,loc.navZ??loc.z);return{loc,index,originLeft:pos.left,originTop:pos.top,left:clamp(pos.left,minLeft,maxLeft),top:clamp(pos.top,minTop,maxTop)};});
    const separate=(a,b,requiredX,requiredY,pushBoth=true)=>{
      let dx=b.left-a.left,dy=b.top-a.top,nx=dx/requiredX,ny=dy/requiredY,d=Math.hypot(nx,ny);
      if(d>=1)return false;
      if(d<.001){const angle=((a.index+1)*2.399963229728653+(b.index+1)*.731);nx=Math.cos(angle);ny=Math.sin(angle);d=1;}
      else{nx/=d;ny/=d;}
      const force=(1-d)+(pushBoth?.018:.035),mx=nx*requiredX*force,my=ny*requiredY*force;
      if(pushBoth){a.left-=mx*.5;a.top-=my*.5;b.left+=mx*.5;b.top+=my*.5;}
      else{b.left+=mx;b.top+=my;}
      return true;
    };
    const playerAnchor={index:-7,left:playerPoint.left,top:playerPoint.top};
    for(let pass=0;pass<72;pass++){
      let moved=false;
      for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)moved=separate(points[i],points[j],gapX,gapY,true)||moved;
      for(const point of points){
        moved=separate(playerAnchor,point,playerGapX,playerGapY,false)||moved;
        // Atrai suavemente para a posição real, sem desfazer a separação obtida.
        if(pass>38){point.left+=(point.originLeft-point.left)*.006;point.top+=(point.originTop-point.top)*.006;}
        point.left=clamp(point.left,minLeft,maxLeft);point.top=clamp(point.top,minTop,maxTop);
      }
      if(!moved&&pass>10)break;
    }
    return points;
  }
  function applyMapMarkerPlacements(root,placements){
    placements.forEach(({loc,left,top})=>{
      const marker=$(`[data-map-marker="${loc.id}"]`,root);if(!marker)return;
      marker.style.left=`${left.toFixed(2)}%`;marker.style.top=`${top.toFixed(2)}%`;
      marker.dataset.labelX=left<18?'left':left>82?'right':'center';
      marker.dataset.labelY=top>80?'above':'below';
    });
  }
  function mapSelectionMarkup(id){
    const loc=MAP_LOCATIONS.find(x=>x.id===id);if(!loc)return'<div class="map-selection empty"><b>Toque em um ícone</b><span>O nome aparecerá aqui antes de iniciar a rota.</span></div>';
    const details=mapLocationDetails(loc);return`<div class="map-selection detailed"><div class="map-selection-title"><b>${loc.icon} ${loc.name}</b><span>${loc.group}</span></div><p>${details.description}</p><div class="map-action-chips">${details.actions.map(action=>`<i>${action}</i>`).join('')}</div><footer><span>${mapDistance(loc)} m de distância</span><button class="btn primary compact" data-route-selected="${loc.id}">Ir para este local</button></footer></div>`;
  }
  function setWaypoint(id){
    const point=MAP_LOCATIONS.find(p=>p.id===id);if(!point)return;
    state.waypoint={id:point.id,name:point.name,x:point.x,z:point.z,navX:point.navX??point.x,navZ:point.navZ??point.z,arrived:false};world.routePath=buildRoutePoints(player,state.waypoint);
    updateWaypointMarker();updateNavigation(0,true);saveState(true);closeModal();toast(`Destino marcado: ${point.name} • siga as setas azuis`,'good',2600);
  }
  function clearWaypoint(){ state.waypoint=null; updateWaypointMarker(); updateNavigation(0,true); saveState(true); closeModal(); toast('Destino removido.','good'); }
  function openMap(){
    const pp=worldToMap(player.x,player.z),angleDeg=(Math.PI-(player.facing||0))*180/Math.PI,activeId=state.waypoint?.id||'',route=state.waypoint?(world.routePath.length?world.routePath:buildRoutePoints(player,state.waypoint)):[],routeInfo=state.waypoint?routeProgressInfo(route,player):null;
    if(!mapSelectedId||!MAP_LOCATIONS.some(x=>x.id===mapSelectedId))mapSelectedId=activeId||'home';
    const placements=mapMarkerPlacements(MAP_LOCATIONS,pp);
    const markers=placements.map(({loc,left,top})=>{const active=loc.id===activeId?' active':'',selected=loc.id===mapSelectedId?' selected':'';return `<button class="map-marker clean${active}${selected}" style="left:${left.toFixed(2)}%;top:${top.toFixed(2)}%" data-map-marker="${loc.id}" aria-label="${loc.name}" title="${loc.name}"><b>${loc.icon}</b><span>${loc.name}</span></button>`;}).join('');
    const grouped=[...new Set(MAP_LOCATIONS.map(x=>x.group))].map(group=>{const items=MAP_LOCATIONS.filter(x=>x.group===group).sort((a,b)=>mapDistance(a)-mapDistance(b)).map(loc=>`<button class="map-destination ${loc.id===activeId?'active':''}" data-map-list="${loc.id}"><b>${loc.icon}<em>${loc.name}</em></b><span>${mapDistance(loc)} m</span></button>`).join('');return `<section class="map-destination-group"><h4>${group}</h4><div>${items}</div></section>`;}).join('');
    const current=state.waypoint?`<div class="gps-current"><small>ROTA ATUAL</small><b>${state.waypoint.name}</b><span>${Math.round(routeInfo.remaining)} m • ${routeInfo.instruction}</span><button class="btn danger" data-clear-waypoint>Cancelar</button></div>`:`<div class="gps-current empty"><b>Para onde vamos?</b><span>Escolha um lugar no mapa ou na lista.</span></div>`;
    openModal('Mapa',`<div class="map-layout v626"><div class="map-main"><div class="world-map clean-map"><i class="map-road horizontal"></i><i class="map-road vertical"></i><i class="map-road west"></i><i class="map-road east"></i><i class="map-river"></i><div class="map-region forest">FLORESTA</div><div class="map-region city">VILA</div><div class="map-region adventure">AVENTURA</div>${route.length?routeSvgMarkup(route):''}${markers}<span class="player-dot" style="left:${pp.left}%;top:${pp.top}%;--player-angle:${angleDeg}deg"><i></i><b>VOCÊ</b></span><span class="map-north">N</span></div>${current}<div id="mapSelection">${mapSelectionMarkup(mapSelectedId)}</div></div><aside class="map-sidebar"><h3>Escolha um lugar</h3><div class="map-destinations grouped">${grouped}</div></aside></div>`,root=>{
      const refitMarkers=()=>{const map=$('.clean-map',root);if(!map)return;const rect=map.getBoundingClientRect();applyMapMarkerPlacements(root,mapMarkerPlacements(MAP_LOCATIONS,pp,rect.width,rect.height));};
      requestAnimationFrame(()=>{refitMarkers();requestAnimationFrame(refitMarkers);});
      const selectMapLocation=id=>{mapSelectedId=id;$$('[data-map-marker]',root).forEach(x=>x.classList.toggle('selected',x.dataset.mapMarker===id));$$('[data-map-list]',root).forEach(x=>x.classList.toggle('selected',x.dataset.mapList===id));selection.innerHTML=mapSelectionMarkup(id);bindRoute();selection.scrollIntoView?.({behavior:'smooth',block:'nearest'});};
      $$('[data-map-list]',root).forEach(btn=>btn.onclick=()=>selectMapLocation(btn.dataset.mapList));
      $('[data-clear-waypoint]',root)?.addEventListener('click',clearWaypoint);
      const selection=$('#mapSelection',root);
      const bindRoute=()=>{$('[data-route-selected]',selection)?.addEventListener('click',e=>setWaypoint(e.currentTarget.dataset.routeSelected));};bindRoute();
      $$('[data-map-marker]',root).forEach(btn=>btn.onclick=()=>selectMapLocation(btn.dataset.mapMarker));
    });els.modal.classList.add('map-modal');
  }
  let mapResizeTimer=0;
  function refreshOpenMapAfterResize(){if(els.modal.hidden||!els.modal.classList.contains('map-modal'))return;clearTimeout(mapResizeTimer);mapResizeTimer=setTimeout(()=>{if(!els.modal.hidden&&els.modal.classList.contains('map-modal'))openMap();},180);}
  window.addEventListener('resize',refreshOpenMapAfterResize,{passive:true});window.addEventListener('orientationchange',refreshOpenMapAfterResize,{passive:true});

  function performLocalReset(){
    window.OTTHOS_ACCOUNT?.clearSession?.();accountSession=null;safeLocalRemove(STORAGE_KEY);LEGACY_STORAGE_KEYS.forEach(safeLocalRemove);return window.OTTHOS_DB?.clear?.();
  }
  function openFinalResetConfirmation(inGame=false){
    openModal('Confirmação final',`<div class="parent-gate"><span>⚠️</span><h3>Esta ação reinicia somente este aparelho</h3><p>Uma conta sincronizada poderá recuperar o progresso. Para continuar, digite <b>APAGAR</b>.</p><label class="field"><span>Confirmação</span><input data-reset-word maxlength="6" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="APAGAR"></label><p data-reset-error class="account-error" hidden>Digite APAGAR exatamente.</p><button class="btn danger" data-reset-confirm>Recomeçar neste aparelho</button><button class="btn" data-reset-cancel>Cancelar</button></div>`,root=>{
      const input=$('[data-reset-word]',root),confirm=async()=>{if(String(input.value||'').trim().toUpperCase()!=='APAGAR'){$('[data-reset-error]',root).hidden=false;input.select();return;}if(!(await confirmModal('Última confirmação','Tem certeza de que deseja reiniciar os dados locais deste aparelho?','Sim, recomeçar','Cancelar')))return;await performLocalReset();state=defaultState();await commitState();location.reload();};
      $('[data-reset-confirm]',root).onclick=confirm;$('[data-reset-cancel]',root).onclick=()=>openParentTools(inGame);input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();confirm();}};setTimeout(()=>input.focus(),80);
    });
  }
  function openParentTools(inGame=false){
    openModal('Área dos responsáveis',`<div class="parent-area"><div class="parent-area-heading"><span>🛡️</span><div><b>Backup e dados do jogo</b><small>Área protegida e fora da interface infantil.</small></div></div><div class="choice-grid"><button class="choice" data-parent-export><b>📤 Exportar backup</b><span>Baixar uma cópia do progresso</span></button><button class="choice" data-parent-import><b>📥 Importar backup</b><span>Substitui os dados deste aparelho</span></button><button class="choice danger-zone" data-parent-reset><b>🗑️ Recomeçar neste aparelho</b><span>Exige senha, palavra APAGAR e confirmação final</span></button></div><input data-parent-import-file type="file" accept="application/json" hidden><div class="modal-actions"><button class="btn" data-parent-back>Voltar às configurações</button></div></div>`,root=>{
      $('[data-parent-export]',root).onclick=()=>window.OTTHOS_DB?.exportFile(state);
      const fileInput=$('[data-parent-import-file]',root);$('[data-parent-import]',root).onclick=()=>fileInput.click();
      fileInput.onchange=async()=>{const file=fileInput.files?.[0];if(!file)return;try{const imported=normalizeState(await window.OTTHOS_DB.importFile(file));if(!(await confirmModal('Importar backup','O progresso atual deste aparelho será substituído pelo arquivo escolhido. Continuar?','Importar','Cancelar')))return;state=imported;await window.OTTHOS_DB.save(state);safeLocalSet(STORAGE_KEY,JSON.stringify(state));location.reload();}catch(error){toast(error.message||'Backup inválido.','bad');}};
      $('[data-parent-reset]',root).onclick=()=>openFinalResetConfirmation(inGame);$('[data-parent-back]',root).onclick=()=>openSettings(inGame);
    });
  }
  function openParentGate(inGame=false){
    if(accountLinked()){
      openModal('Acesso de responsável',`<div class="parent-gate"><span>🛡️</span><h3>Confirme a senha da conta</h3><p>Esta área contém backup e reinício do aparelho.</p><label class="field"><span>Senha da conta</span><input data-parent-password type="password" maxlength="64" autocomplete="current-password"></label><p data-parent-gate-error class="account-error" hidden></p><button class="btn primary xl" data-parent-unlock>Continuar</button><button class="btn" data-parent-cancel>Cancelar</button></div>`,root=>{
        const input=$('[data-parent-password]',root),error=$('[data-parent-gate-error]',root),unlock=async()=>{const btn=$('[data-parent-unlock]',root);btn.disabled=true;btn.textContent='Confirmando...';const result=await window.OTTHOS_RTDB?.reauthenticateAccount?.(input.value);if(!result?.ok){error.textContent=result?.error||'Senha incorreta.';error.hidden=false;btn.disabled=false;btn.textContent='Continuar';input.select();return;}openParentTools(inGame);};
        $('[data-parent-unlock]',root).onclick=unlock;$('[data-parent-cancel]',root).onclick=()=>openSettings(inGame);input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();unlock();}};setTimeout(()=>input.focus(),80);
      });return;
    }
    const a=7+Math.floor(Math.random()*5),b=5+Math.floor(Math.random()*4),answer=a*b;
    openModal('Acesso de responsável',`<div class="parent-gate"><span>🛡️</span><h3>Peça ajuda a um adulto</h3><p>Para abrir backup e reinício, responda:</p><label class="field"><span>Quanto é ${a} × ${b}?</span><input data-parent-answer inputmode="numeric" pattern="[0-9]*" maxlength="3" autocomplete="off"></label><p data-parent-gate-error class="account-error" hidden>Resposta incorreta.</p><button class="btn primary xl" data-parent-unlock>Continuar</button><button class="btn" data-parent-cancel>Cancelar</button></div>`,root=>{const input=$('[data-parent-answer]',root),unlock=()=>{if(Number(input.value)!==answer){$('[data-parent-gate-error]',root).hidden=false;input.select();return;}openParentTools(inGame);};$('[data-parent-unlock]',root).onclick=unlock;$('[data-parent-cancel]',root).onclick=()=>openSettings(inGame);input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();unlock();}};setTimeout(()=>input.focus(),80);});
  }
  let deferredSettingsRefresh = null;
  function openSettings(inGame = false) {
    const sound = state.settings.sound, vibration = state.settings.vibration, quality = requestedQuality(), high = quality === 'high';
    const savedAt = state.lastSaved ? new Date(state.lastSaved).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}) : 'ainda não salvo';
    const isiOSInstall = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const installOption = !isStandalone() && (!!deferredInstallPrompt || isiOSInstall) ? '<button class="btn" data-install>Instalar aplicativo</button>' : '';
    openModal('Configurações', `<div class="settings-list">
      <div class="settings-row"><div><b>Som</b><small>Interface, coleta e combate</small></div><button class="toggle ${sound ? 'on' : ''}" data-toggle="sound"><i></i></button></div>
      <div class="settings-row"><div><b>Vibração</b><small>Feedback no celular</small></div><button class="toggle ${vibration ? 'on' : ''}" data-toggle="vibration"><i></i></button></div>
      <div class="settings-row"><div><b>Qualidade gráfica</b><small>${qualityLabel()}</small></div><button class="toggle ${quality !== 'low' ? 'on' : ''}" data-toggle="quality"><i></i></button></div><div class="settings-row"><div><b>Desempenho atual</b><small>${Math.round(perf.fps)} FPS • render ${qualityTier()}</small></div><span class="db-status">AUTO</span></div>
      <div class="settings-row"><div><b>Salvamento automático</b><small>IndexedDB no celular + cópia local. Último: ${savedAt}</small></div><span class="db-status">✓ Ativo</span></div>
      <div class="settings-row"><div><b>Nome público</b><small>${hasValidPlayerName()?state.profile.name:'Ainda não definido'}</small></div><button class="btn compact" data-player-name-settings>Editar</button></div>
      <div class="settings-row"><div><b>Conta do jogo</b><small>${accountStatusText()}</small></div><button class="btn compact" data-account-settings>Abrir</button></div>
      <div class="settings-row"><div><b>Mundo online</b><small id="mpSettingsStatus">${multiplayerStatusText()}</small></div><button class="btn compact" data-multiplayer-config>Abrir online</button></div>
    </div><div class="modal-actions">
      <button class="btn primary" data-save-now>Salvar agora</button>
      ${installOption}
      ${inGame ? '<button class="btn" data-home>Voltar para casa</button><button class="btn" data-exit>Sair para o menu</button>' : ''}
      <button class="btn subtle parent-access-btn" data-parent-area>🛡️ Área dos responsáveis</button>
    </div>`, root => {
      $('[data-player-name-settings]',root)?.addEventListener('click',()=>openPlayerNameModal(false,()=>openSettings(inGame)));$('[data-account-settings]',root)?.addEventListener('click',()=>openAccountCenter(false));$('[data-multiplayer-config]',root)?.addEventListener('click',openMultiplayerConfig);
      $$('[data-toggle]', root).forEach(btn => btn.onclick = () => {
        const key = btn.dataset.toggle;
        if (key === 'quality') state.settings.quality = requestedQuality() === 'auto' ? 'high' : requestedQuality() === 'high' ? 'low' : 'auto';
        else state.settings[key] = !state.settings[key];
        saveState(true); closeModal(); applyQuality(); openSettings(inGame);
      });
      $('[data-save-now]',root).onclick=async()=>{ if(running) savePlayerPosition(true); else await commitState(); toast('Progresso salvo no celular.','good'); closeModal(); };
      const install=$('[data-install]',root);if(install)install.onclick=installApp;
      const home = $('[data-home]', root); if (home) home.onclick = () => { closeModal(); returnHome(); };
      const exit = $('[data-exit]', root); if (exit) exit.onclick = () => { closeModal(); stopGame(); };
      $('[data-parent-area]',root).onclick=()=>openParentGate(inGame);
    });
  }


  els.quizBtn.onclick = () => openEducationHub('math');
  els.challengePromptAccept.onclick=()=>{if(promptSocialRequestId)acceptIncomingSocialRequest(promptSocialRequestId);else if(promptChallengeId)acceptIncomingChallenge(promptChallengeId);else if(promptSessionId){const s=gameSessions.get(promptSessionId);if(s)launchSessionWithCountdown(s);}};
  els.challengePromptDecline.onclick=()=>{if(promptSocialRequestId)declineIncomingSocialRequest(promptSocialRequestId);else if(promptChallengeId)declineIncomingChallenge(promptChallengeId);else closeChallengePrompt();};
  els.collectionBtn.onclick = openCollection;
  els.avatarBtn.onclick = openAvatarStudio;
  els.accountBtn.onclick = () => openAccountCenter(false);
  els.moldsBtn.onclick = openMolds;
  els.howBtn.onclick = openHow;
  els.settingsBtn.onclick = () => openSettings(false);els.multiplayerBadge.onclick=openSocialHub;els.profileNameBtn.onclick=()=>openPlayerNameModal(false);
  els.avatarGameBtn.onclick = openLifePanel;
  els.inventoryBtn.onclick = openInventory;
  els.toolsBtn.onclick = openToolbelt;
  els.mapBtn.onclick = openMap;
  els.dailyBtn.onclick = () => openEducationHub('math');
  els.onlineBtn.onclick = openSocialHub;
  els.gameSettingsBtn.onclick = () => openSettings(true);
