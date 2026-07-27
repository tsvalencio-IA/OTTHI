/**
 * OTTHI World Edu V642 — módulo-fonte
 * Arquivo: 22-careers-jobs-uniforms.js
 * Escopo: Carreiras, estados de missão, uniformes, professor, bombeiro e entrega
 * Linhas de origem V642: 3416-3530
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function setMissionState(job,next,reason=''){if(!job)return false;const changed=job.missionState!==next||job.missionReason!==reason;if(!changed)return false;job.missionState=next;job.missionStateAt=Date.now();job.missionReason=reason;return true;}
  function equipJobUniform(jobId){
    const uniform=JOB_UNIFORMS[jobId]||'none',job=state.career?.activeJob;
    if(job&&job.id===jobId){job.uniform=uniform;job.uniformLocked=true;}
    state.avatar.uniform=uniform;applyAvatarCustomization();saveState(true);return uniform;
  }
  function focusActiveJob(){
    const job=state.career.activeJob;if(!job){toast('Nenhum trabalho ativo.','warn');return false;}
    if(currentHouse&&!(job.id==='teacher'&&currentHouse.id.startsWith('school')))exitHouse();
    if(job.id==='delivery')setWaypoint('garage');
    else if(job.id==='police'){const id=(job.route||[])[Number(job.progress||0)]||'police';setWaypoint(id);}
    else if(job.id==='firefighter'){const fire=ensureActiveFire(true);if(fire){state.waypoint={id:`fire-${fire.id}`,name:fire.name,x:fire.x,z:fire.z,navX:fire.navX,navZ:fire.navZ,arrived:false};world.routePath=buildRoutePoints(player,state.waypoint);updateWaypointMarker();updateNavigation(0,true);}}
    else if(job.id==='teacher')setWaypoint(job.schoolId||'school');
    else if(job.id==='gather')setWaypoint('forest');
    else if(job.id==='crystals')setWaypoint('crystal');
    else if(job.id==='builder')setWaypoint('home-extension');
    closeModal();updateMissionHUD();toast(`Missão ativa: ${job.title}. Siga a rota azul.`,'good',2300);return true;
  }
  async function cancelActiveJob(){
    const job=state.career.activeJob;if(!job||job.missionState===MISSION_STATES.COMPLETING)return false;
    const ok=await confirmModal('Cancelar trabalho',`Deseja encerrar "${job.title}"? Suas moedas, itens e conquistas continuam salvos.`,'Cancelar trabalho','Continuar missão');if(!ok)return false;
    setMissionState(job,MISSION_STATES.CANCELLED,'player-cancel');job.uniformLocked=false;
    if(job.id==='delivery'){state.flags.deliveryActive=false;state.inventory.package=Number(job.previousPackage||0);}
    state.avatar.uniform=job.previousUniform||'none';state.career.lastMission={...job,endedAt:Date.now()};state.career.activeJob=null;state.waypoint=null;world.routePath=[];updateWaypointMarker();applyAvatarCustomization();updateMissionHUD();saveState(true);closeModal();toast('Trabalho cancelado. Você pode escolher outro.','good',1900);return true;
  }

  function activeJobProgress(job){
    if(!job)return{percent:0,label:'0%'};
    const start=job.start||{};
    if(job.id==='delivery')return{percent:state.flags.deliveryDone?100:(player.vehicle?55:25),label:state.flags.deliveryDone?'concluído':player.vehicle?'Leve o pacote até Maya':'Pegue o carrinho'};
    if(job.id==='police'){const done=Number(job.progress||0),total=(job.route||[]).length||3;return{percent:clamp(done/total*100,0,100),label:`${done}/${total} pontos patrulhados`};}
    if(job.id==='firefighter'){const fire=world.fires.find(f=>f.active);return{percent:job.completed?100:(fire?.playerHelping?70:fire?35:15),label:job.completed?'emergência concluída':fire?.playerHelping?'Ajudando com a mangueira':fire?'Siga até a ocorrência':'Aguardando chamado'};}
    if(job.id==='teacher')return{percent:job.completed?100:(currentHouse?.id?.startsWith('school')?55:20),label:job.completed?'aula concluída':'Vá até uma escola e use o quadro'};
    if(job.id==='gather'){const w=Math.max(0,state.inventory.wood-(start.wood||0)),r=Math.max(0,state.inventory.stone-(start.stone||0));return{percent:clamp((w/3+r/2)*50,0,100),label:`${Math.min(w,3)}/3 madeiras • ${Math.min(r,2)}/2 pedras`};}
    if(job.id==='crystals'){const n=Math.max(0,state.inventory.crystals-(start.crystals||0));return{percent:clamp(n/3*100,0,100),label:`${Math.min(n,3)}/3 cristais`};}
    if(job.id==='builder'){const n=Math.max(0,state.builds.length-(start.builds||0));return{percent:clamp(n/2*100,0,100),label:`${Math.min(n,2)}/2 construções`};}
    return{percent:0,label:'Em andamento'};
  }
  function openJobCenter(){
    const active=state.career.activeJob,progress=active?activeJobProgress(active):null;
    openModal('Central de Trabalhos',`${active?`<div class="roleplay-card active-job"><small>TRABALHO ATIVO</small><h3>${active.icon||'💼'} ${active.title}</h3><p>${active.description}</p><b>${progress.label}</b><div class="job-progress"><i style="width:${progress.percent}%"></i></div><div class="modal-actions"><button class="btn primary" data-continue-job>Continuar missão</button><button class="btn" data-job-uniform>Vestir uniforme</button><button class="btn danger" data-cancel-job>Trocar/Cancelar trabalho</button></div></div>`:'<p>Escolha uma atividade. Você pode cancelar e trocar de profissão sem perder conquistas.</p>'}<div class="choice-grid">${JOBS.map(j=>`<button class="choice" data-job="${j.id}" ${active?'disabled':''}><b>${j.icon} ${j.title}</b><span>${j.description}<br><strong>${j.reward} moedas</strong></span></button>`).join('')}</div>`,root=>{
      $$('[data-job]',root).forEach(btn=>btn.onclick=()=>{const job=JOBS.find(j=>j.id===btn.dataset.job);startJob(job);});
      $('[data-continue-job]',root)?.addEventListener('click',focusActiveJob);
      $('[data-job-uniform]',root)?.addEventListener('click',()=>{equipJobUniform(active.id);toast('Uniforme equipado.','good',1200);});
      $('[data-cancel-job]',root)?.addEventListener('click',cancelActiveJob);
    });
  }
  function startJob(job,options={}){
    if(!job||state.career.activeJob){toast('Cancele ou conclua o trabalho atual antes de trocar.','warn');return false;}
    const inv=state.inventory,schoolId=Math.random()>.5?'school':'school-east',instanceId=`job-${job.id}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    state.career.activeJob={...job,instanceId,missionState:MISSION_STATES.ACCEPTED,missionStateAt:Date.now(),schoolId,previousUniform:state.avatar.uniform||'none',previousPackage:Number(inv.package||0),rewardClaimed:false,startedAt:Date.now(),progress:0,start:{wood:inv.wood,stone:inv.stone,crystals:inv.crystals,builds:state.builds.length}};
    equipJobUniform(job.id);setMissionState(state.career.activeJob,MISSION_STATES.PREPARING,'uniform-ready');
    if(job.id==='delivery'){state.flags.deliveryActive=true;state.flags.deliveryDone=false;state.inventory.package=Math.max(1,Number(state.inventory.package||0));}
    else if(job.id==='police'){state.career.activeJob.route=['village','school','fire-station'];state.career.activeJob.progress=0;}
    else if(job.id==='firefighter')ensureActiveFire(true);
    if(currentHouse&&!(job.id==='teacher'&&currentHouse.id.startsWith('school')))exitHouse();
    setMissionState(state.career.activeJob,MISSION_STATES.TRAVELLING,'route-created');saveState(true);updateMissionHUD();if(options.focus!==false)focusActiveJob();return true;
  }
  function completeActiveJob(){
    const job=state.career.activeJob;if(!job||job.missionState===MISSION_STATES.COMPLETING||job.missionState===MISSION_STATES.COMPLETED)return false;
    const token=String(job.instanceId||`job-${job.id}-${job.startedAt||0}`),tokens=state.career.completedMissionTokens||(state.career.completedMissionTokens=[]);
    if(job.rewardClaimed||tokens.includes(token)){console.warn('[OTTHOS] Recompensa duplicada bloqueada:',token);return false;}
    setMissionState(job,MISSION_STATES.COMPLETING,'objective-complete');job.rewardClaimed=true;tokens.push(token);if(tokens.length>120)tokens.splice(0,tokens.length-120);
    state.profile.coins+=Number(job.reward||0);state.profile.reputation+=Number(job.rep||0);state.career.completed++;state.stats.jobsCompleted=(state.stats.jobsCompleted||0)+1;
    if(job.id==='delivery'){state.flags.deliveryActive=false;state.inventory.package=Number(job.previousPackage||0);state.flags.deliveryDone=true;state.flags.completedDeliveryJob=true;state.cityServices.deliveries++;}
    if(job.id==='police'){state.flags.completedPoliceJob=true;state.cityServices.policePatrols++;state.stats.patrols++;}
    if(job.id==='firefighter'){state.flags.completedFirefighterJob=true;state.cityServices.rescuesCompleted=(state.cityServices.rescuesCompleted||0)+1;}
    if(job.id==='teacher'){state.flags.completedTeacherJob=true;state.cityServices.lessonsTaught++;state.stats.classesTaught++;}
    state.career.xp+=100;state.career.level=Math.floor(state.career.xp/300)+1;state.career.title=state.career.level>=4?'Profissional da Vila':state.career.level>=2?'Ajudante da Vila':'Morador da Vila';
    job.uniformLocked=false;state.avatar.uniform=job.previousUniform||'none';setMissionState(job,MISSION_STATES.COMPLETED,'reward-committed');job.completedAt=Date.now();state.career.lastMission={...job};state.objectives.history.push({id:token,type:'job',jobId:job.id,title:job.title,completedAt:job.completedAt,reward:Number(job.reward||0),rep:Number(job.rep||0)});if(state.objectives.history.length>80)state.objectives.history.splice(0,state.objectives.history.length-80);
    state.career.activeJob=null;state.waypoint=null;world.routePath=[];updateWaypointMarker();applyAvatarCustomization();setFlag('completedJob');evaluateMissions();updateMissionHUD();updateHUD();saveState(true);toast(`Trabalho concluído! +${job.reward} moedas`,'good',2600);return true;
  }
  function checkActiveJob(){
    const job=state.career.activeJob;if(!job)return;
    const start=job.start||{};
    if(job.id==='gather'&&state.inventory.wood-(start.wood||0)>=3&&state.inventory.stone-(start.stone||0)>=2)completeActiveJob();
    else if(job.id==='crystals'&&state.inventory.crystals-(start.crystals||0)>=3)completeActiveJob();
    else if(job.id==='builder'&&state.builds.length-(start.builds||0)>=2)completeActiveJob();
  }

  function restoreActiveJobRuntime(){
    const job=state.career?.activeJob;if(!job)return;job.uniform=JOB_UNIFORMS[job.id]||job.uniform||'none';job.uniformLocked=true;if(job.id==='delivery'){state.flags.deliveryActive=true;state.inventory.package=Math.max(1,Number(state.inventory.package||0));}if(job.id==='firefighter')ensureActiveFire(true);applyAvatarCustomization();updateMissionHUD();
  }
  function updateCareerMissions(){
    const job=state.career.activeJob;if(!job)return;const now=performance.now();if(now-Number(updateCareerMissions.lastAt||0)<180)return;updateCareerMissions.lastAt=now;
    let signature='';
    if(job.id==='police'){
      const route=job.route||[],targetId=route[Number(job.progress||0)],loc=MAP_LOCATIONS.find(x=>x.id===targetId);if(loc){const distance=Math.hypot(player.x-(loc.navX??loc.x),player.z-(loc.navZ??loc.z));setMissionState(job,distance<5?MISSION_STATES.ACTION_REQUIRED:MISSION_STATES.TRAVELLING,distance<5?'checkpoint':'route');if(distance<5&&!job.lastCheckpointAt){job.lastCheckpointAt=Date.now();job.progress=(job.progress||0)+1;toast(`Patrulha: ${loc.name} verificado com segurança.`,'good',1900);beep(720,70);if(job.progress>=route.length){completeActiveJob();state.waypoint=null;updateWaypointMarker();}else setWaypoint(route[job.progress]);saveState(true);}if(job.lastCheckpointAt&&Date.now()-job.lastCheckpointAt>1600)job.lastCheckpointAt=0;}
    }else if(job.id==='delivery'){const d=Math.hypot(player.x-65,player.z-54);setMissionState(job,d<5?MISSION_STATES.ACTION_REQUIRED:player.vehicle?MISSION_STATES.TRAVELLING:MISSION_STATES.PREPARING,d<5?'deliver-to-maya':player.vehicle?'driving':'need-vehicle');}
    else if(job.id==='teacher'){const atSchool=!!currentHouse?.id?.startsWith('school');setMissionState(job,atSchool?MISSION_STATES.ACTION_REQUIRED:MISSION_STATES.TRAVELLING,atSchool?'teach':'go-school');}
    else if(job.id==='firefighter'){const fire=world.fires.find(f=>f.active);setMissionState(job,fire&&Math.hypot(player.x-fire.x,player.z-fire.z)<5?MISSION_STATES.ACTION_REQUIRED:MISSION_STATES.TRAVELLING,fire?'respond':'await-call');}
    else setMissionState(job,MISSION_STATES.ACTION_REQUIRED,'collect-or-build');
    checkActiveJob();signature=`${job.id}|${job.missionState}|${activeJobProgress(job).label}`;if(signature!==updateCareerMissions.signature){updateCareerMissions.signature=signature;updateMissionHUD();}
  }
  function openTeacherJobLesson(house){
    const questions=[['Qual atitude ajuda toda a turma?',['Ouvir e respeitar','Gritar com os colegas','Esconder os materiais'],0],['O que fazemos antes de atravessar?',['Corremos sem olhar','Olhamos para os dois lados','Fechamos os olhos'],1],['Como cuidamos da escola?',['Organizamos e ajudamos','Quebramos objetos','Jogamos lixo no chão'],0]],q=questions[(state.cityServices.lessonsTaught||0)%questions.length];
    openModal('Missão de professor',`<div class="teacher-mission"><span>🧑‍🏫</span><h3>Conduza uma atividade segura</h3><p>${q[0]}</p><div class="choice-grid">${q[1].map((answer,i)=>`<button class="choice" data-teacher-answer="${i}"><b>${answer}</b></button>`).join('')}</div></div>`,root=>{$$('[data-teacher-answer]',root).forEach(btn=>btn.onclick=()=>{if(Number(btn.dataset.teacherAnswer)!==q[2]){toast('Vamos pensar de novo com calma.','warn',1400);return;}state.career.activeJob.completed=true;closeModal();completeActiveJob();addXP(55);toast(`Aula concluída na ${house.name}!`,'good',2400);});});
  }
  function openFireStationDesk(){
    const active=state.career.activeJob,fire=world.fires.find(f=>f.active)||null;
    openModal('Central dos Bombeiros',`<div class="fire-station-card"><span>🚒</span><h3>Equipe de emergência infantil</h3><p>Os incêndios são simulações controladas. Ninguém perde vida, moedas ou conquistas.</p>${active?.id==='firefighter'?`<div class="job-progress"><b>Missão em andamento</b><span>${active.completed?'Retorne à central para concluir.':fire?`Chamado: ${fire.name}`:'Buscando um chamado seguro...'}</span></div>`:''}<div class="modal-actions">${active?.id==='firefighter'?`<button class="btn primary" data-fire-continue>Continuar missão</button><button class="btn danger" data-fire-cancel>Trocar de trabalho</button>`:`<button class="btn primary" data-fire-job>Começar missão de bombeiro</button>`}<button class="btn" data-fire-call>Ver chamado atual</button><button class="btn" data-fire-uniform>Vestir uniforme</button></div></div>`,root=>{
      const startBtn=$('[data-fire-job]',root);if(startBtn)startBtn.onclick=()=>{if(state.career.activeJob){toast('Escolha “Trocar de trabalho” no painel de empregos.','warn');return;}startJob(JOBS.find(j=>j.id==='firefighter'));};
      const cont=$('[data-fire-continue]',root);if(cont)cont.onclick=()=>{closeModal();focusActiveJob();};
      const cancel=$('[data-fire-cancel]',root);if(cancel)cancel.onclick=async()=>{closeModal();await cancelActiveJob();};
      $('[data-fire-call]',root).onclick=()=>{const current=ensureActiveFire(false);if(!current){toast('Nenhum chamado ativo agora.','good');return;}state.waypoint={id:`fire-${current.id}`,name:current.name,x:current.x,z:current.z,navX:current.navX,navZ:current.navZ};world.routePath=buildRoutePoints(player,state.waypoint);updateWaypointMarker();closeModal();if(currentHouse)exitHouse();toast(`Chamado marcado: ${current.name}`,'good');};
      $('[data-fire-uniform]',root).onclick=()=>{equipJobUniform('firefighter');closeModal();};
    });
  }


  function startDeliveryJob(){
    if(state.flags.deliveryActive){toast('Você já está fazendo uma entrega.','warn');return;}state.flags.deliveryActive=true;state.inventory.package=1;toast('Pacote recebido. Leve até Maya!','good',2200);saveState();
  }
  let fxParticles=[];
  const FX_MAX_PARTICLES=40;
