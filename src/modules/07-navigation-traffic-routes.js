/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 07-navigation-traffic-routes.js
 * Escopo: Rotas, trânsito, grafo, GPS e minimapa
 * Linhas de origem V642: 1064-1200
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  function routeLength(points){let total=0;for(let i=1;i<points.length;i++)total+=Math.hypot(points[i].x-points[i-1].x,points[i].z-points[i-1].z);return total;}
  function compactRoute(points){const out=[];for(const p of points){if(!p)continue;const last=out[out.length-1];if(!last||Math.hypot(last.x-p.x,last.z-p.z)>.25)out.push({x:+p.x,z:+p.z});}return out;}
  function projectPointToSegment(p,a,b){const dx=b.x-a.x,dz=b.z-a.z,len2=dx*dx+dz*dz||1,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/len2));return{x:a.x+dx*t,z:a.z+dz*t,t};}
  function navBlocked(x,z){for(const h of world.hazards||[]){if(Math.abs(x-h.x)<=h.w/2+.55&&Math.abs(z-h.z)<=h.d/2+.55)return true;}for(const c of world.colliders||[]){if(c.houseId&&currentHouse&&c.houseId===currentHouse.id)continue;if(Math.abs(x-c.x)<=c.w/2+.45&&Math.abs(z-c.z)<=c.d/2+.45)return true;}return false;}
  function segmentClear(a,b){const len=Math.hypot(b.x-a.x,b.z-a.z),steps=Math.max(1,Math.ceil(len/1.8));for(let i=1;i<steps;i++){const t=i/steps;if(navBlocked(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t))return false;}return true;}
  function nearestRoadProjection(pos){let best=null;for(const [aId,bId] of NAV_BASE_EDGES){const a=NAV_BASE_NODES[aId],b=NAV_BASE_NODES[bId],p=projectPointToSegment(pos,a,b),distance=Math.hypot(pos.x-p.x,pos.z-p.z),clear=segmentClear(pos,p);const score=distance+(clear?0:120);if(!best||score<best.score)best={aId,bId,point:p,distance,clear,score};}return best;}
  function pointOnRoad(x,z,margin=.7){return WORLD_MAP_ROADS.some(r=>Math.abs(x-r.x)<=r.w/2+margin&&Math.abs(z-r.z)<=r.d/2+margin);}
  function projectPointToPolyline(pos,points){
    if(!points?.length)return null;let best=null;
    for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];if(!a||!b)continue;const point=projectPointToSegment(pos,a,b),distance=Math.hypot(pos.x-point.x,pos.z-point.z);if(!best||distance<best.distance)best={point,distance,index:i,nextIndex:(i+1)%points.length};}
    return best;
  }
  function snapTrafficToRoad(group,previous=null){
    if(!group||pointOnRoad(group.position.x,group.position.z,.15))return true;
    const guided=projectPointToPolyline(group.position,group.userData?.roadPath),projection=guided?.point?guided:nearestRoadProjection(group.position);
    if(projection?.point&&pointOnRoad(projection.point.x,projection.point.z,.05)){group.position.x=projection.point.x;group.position.z=projection.point.z;return true;}
    if(previous){group.position.x=previous.x;group.position.z=previous.z;}return false;
  }
  function trafficActorList(){
    const now=performance.now();
    if(world.trafficSnapshot&&now-(world.trafficSnapshotAt||0)<12)return world.trafficSnapshot;
    const actors=[];
    for(const bus of world.buses||[])if(bus.group?.visible)actors.push({id:`bus-${bus.id}`,type:'bus',group:bus.group,radius:3.05,speed:Math.abs(bus.currentSpeed||0),ref:bus});
    for(const car of world.policeCars||[])if(car.group?.visible)actors.push({id:`police-${car.id}`,type:'police',group:car.group,radius:1.8,speed:Math.abs(car.currentSpeed||car.speed||0),ref:car});
    for(const truck of world.fireTrucks||[])if(truck.group?.visible)actors.push({id:`fire-${truck.id}`,type:'fire',group:truck.group,radius:2.5,speed:Math.abs(truck.currentSpeed||truck.speed||0),ref:truck});
    for(const ambulance of world.ambulances||[])if(ambulance.group?.visible)actors.push({id:`ambulance-${ambulance.id}`,type:'ambulance',group:ambulance.group,radius:2.1,speed:Math.abs(ambulance.currentSpeed||ambulance.speed||0),ref:ambulance});
    for(const npc of world.npcs||[])if(npc.mobility?.group?.visible&&npc.mobility.type!=='walk')actors.push({id:`npc-${npc.id}`,type:npc.mobility.type,group:npc.mobility.group,radius:npc.mobility.radius||1.25,speed:Math.abs(npc.mobility.currentSpeed||npc.mobility.speed||0),ref:npc.mobility});
    world.trafficSnapshot=actors;world.trafficSnapshotAt=now;return actors;
  }

  function trafficPriority(actor){if(actor?.incidentTargetId||actor?.targetFireId)return 50;let type=actor?.route?.schoolBus?'school':actor?.route?'bus':actor?.type||actor?.kind||actor?.trafficType||'';if(!type&&world.ambulances?.includes(actor))type='ambulance';else if(!type&&world.fireTrucks?.includes(actor))type='fire';else if(!type&&world.policeCars?.includes(actor))type='police';return({ambulance:45,fire:44,police:43,school:28,bus:22,car:16,moto:14,bike:10,skate:8})[type]||18;}
  function trafficSpeedFactor(actor,heading,lookAhead=7){
    if(!actor?.group)return 1;const now=performance.now();if(actor.incidentLocked||now<Number(actor.incidentUntil||0)||now<Number(actor.trafficHoldUntil||0))return 0;
    const ax=actor.group.position.x,az=actor.group.position.z,fx=Math.sin(heading),fz=Math.cos(heading),rx=Math.cos(heading),rz=-Math.sin(heading),actorSpeed=Math.max(.15,Math.abs(actor.currentSpeed||actor.speed||0)),actorRadius=Number(actor.radius||(actor.route?3.05:1.55));let factor=1;
    for(const other of trafficActorList()){if(other.ref===actor||other.id===actor.id)continue;const dx=other.group.position.x-ax,dz=other.group.position.z-az,forward=dx*fx+dz*fz,side=Math.abs(dx*rx+dz*rz),gap=actorRadius+Number(other.radius||1.5)+.75;
      if(forward>-.15&&forward<lookAhead+gap&&side<gap*.9){const clearance=forward-gap;if(other.ref?.incidentLocked||other.ref?.incidentUntil===Number.MAX_SAFE_INTEGER||clearance<=.22)factor=0;else factor=Math.min(factor,clamp(clearance/Math.max(1.2,lookAhead*.72),0,1));}
      const otherHeading=Number(other.group.rotation?.y||0),horizon=clamp(.8+gap/Math.max(2,actorSpeed+other.speed),.65,1.65),futureAx=ax+fx*actorSpeed*horizon,futureAz=az+fz*actorSpeed*horizon,futureBx=other.group.position.x+Math.sin(otherHeading)*other.speed*horizon,futureBz=other.group.position.z+Math.cos(otherHeading)*other.speed*horizon,futureGap=Math.hypot(futureBx-futureAx,futureBz-futureAz);
      if(futureGap<gap*1.28&&Math.hypot(dx,dz)<lookAhead+gap+5){const myPriority=trafficPriority(actor),otherPriority=trafficPriority(other);if(myPriority<=otherPriority)factor=Math.min(factor,clamp((futureGap-gap*.82)/(gap*.65),0,.48));}
    }return clamp(factor,0,1);
  }

  function captureTrafficPositions(){const before=new Map();world.trafficSnapshot=null;for(const actor of trafficActorList())before.set(actor.id,{x:actor.group.position.x,z:actor.group.position.z,heading:Number(actor.group.rotation?.y||0)});return before;}
  function resolveTrafficOverlaps(before){
    world.trafficSnapshot=null;const actors=trafficActorList();for(const actor of actors)if(!pointOnRoad(actor.group.position.x,actor.group.position.z,.5))snapTrafficToRoad(actor.group,before?.get(actor.id));
    for(let pass=0;pass<2;pass++)for(let i=0;i<actors.length;i++)for(let j=i+1;j<actors.length;j++){
      const a=actors[i],b=actors[j],dx=b.group.position.x-a.group.position.x,dz=b.group.position.z-a.group.position.z,d=Math.hypot(dx,dz),gap=(a.radius+b.radius)*.94+.25;if(d>=gap)continue;if(a.ref?.incidentLocked&&b.ref?.incidentLocked)continue;
      const aEmergency=!!a.ref?.incidentTargetId||!!a.ref?.targetFireId,bEmergency=!!b.ref?.incidentTargetId||!!b.ref?.targetFireId;let yieldActor;if(aEmergency!==bEmergency)yieldActor=aEmergency?b:a;else{const pa=trafficPriority(a),pb=trafficPriority(b);yieldActor=pa===pb?(a.id>b.id?a:b):(pa<pb?a:b);}const other=yieldActor===a?b:a,old=before?.get(yieldActor.id),otherOld=before?.get(other.id);
      if(old){yieldActor.group.position.x=old.x;yieldActor.group.position.z=old.z;snapTrafficToRoad(yieldActor.group,old);}yieldActor.ref.currentSpeed=0;yieldActor.ref.trafficHoldUntil=performance.now()+950;
      let remain=Math.hypot(b.group.position.x-a.group.position.x,b.group.position.z-a.group.position.z);if(remain<gap*.9&&otherOld&&!other.ref?.incidentLocked){other.group.position.x=otherOld.x;other.group.position.z=otherOld.z;snapTrafficToRoad(other.group,otherOld);other.ref.currentSpeed=0;other.ref.trafficHoldUntil=performance.now()+620;remain=Math.hypot(b.group.position.x-a.group.position.x,b.group.position.z-a.group.position.z);}
      if(remain<gap*.82){const nx=(b.group.position.x-a.group.position.x)/(remain||1),nz=(b.group.position.z-a.group.position.z)/(remain||1),push=(gap-remain)*.56;yieldActor.group.position.x-=nx*push;yieldActor.group.position.z-=nz*push;snapTrafficToRoad(yieldActor.group,old);}
    }world.trafficSnapshot=null;
  }

  function graphAdd(adj,a,b,w){if(!adj.has(a))adj.set(a,[]);if(!adj.has(b))adj.set(b,[]);adj.get(a).push({id:b,w});adj.get(b).push({id:a,w});}
  function graphShortest(nodes,adj,startId,endId){const dist=new Map([[startId,0]]),prev=new Map(),open=new Set(nodes.keys());while(open.size){let current=null,best=Infinity;for(const id of open){const d=dist.get(id)??Infinity;if(d<best){best=d;current=id;}}if(current===null||current===endId)break;open.delete(current);for(const e of adj.get(current)||[]){if(!open.has(e.id))continue;const nd=best+e.w;if(nd<(dist.get(e.id)??Infinity)){dist.set(e.id,nd);prev.set(e.id,current);}}}if(!dist.has(endId))return[];const ids=[];let id=endId;while(id){ids.push(id);if(id===startId)break;id=prev.get(id);}return ids.reverse().map(id=>nodes.get(id));}
  function buildRoutePoints(from,to){
    const target={x:Number(to.navX??to.x),z:Number(to.navZ??to.z)},startProjection=nearestRoadProjection(from),targetProjection=nearestRoadProjection(target);
    if(!startProjection||!targetProjection)return compactRoute([from,target]);
    const cacheKey=`${startProjection.aId}:${startProjection.bId}:${Math.round(startProjection.point.x/4)},${Math.round(startProjection.point.z/4)}>${targetProjection.aId}:${targetProjection.bId}:${Math.round(targetProjection.point.x/4)},${Math.round(targetProjection.point.z/4)}`;
    const cached=world.navCache.get(cacheKey);if(cached)return compactRoute([{x:from.x,z:from.z},...cached.slice(1,-1),target]);
    const nodes=new Map(Object.entries(NAV_BASE_NODES).map(([id,p])=>[id,{...p}])),adj=new Map();
    for(const[aId,bId]of NAV_BASE_EDGES){const a=nodes.get(aId),b=nodes.get(bId);graphAdd(adj,aId,bId,Math.hypot(a.x-b.x,a.z-b.z));}
    nodes.set('START',startProjection.point);nodes.set('TARGET',targetProjection.point);
    for(const [id,projection] of [['START',startProjection],['TARGET',targetProjection]]){const a=nodes.get(projection.aId),b=nodes.get(projection.bId),p=nodes.get(id);graphAdd(adj,id,projection.aId,Math.hypot(p.x-a.x,p.z-a.z));graphAdd(adj,id,projection.bId,Math.hypot(p.x-b.x,p.z-b.z));}
    if(startProjection.aId===targetProjection.aId&&startProjection.bId===targetProjection.bId)graphAdd(adj,'START','TARGET',Math.hypot(startProjection.point.x-targetProjection.point.x,startProjection.point.z-targetProjection.point.z));
    const core=graphShortest(nodes,adj,'START','TARGET'),route=compactRoute([{x:from.x,z:from.z},...core,target]);world.navCache.set(cacheKey,route);if(world.navCache.size>60)world.navCache.delete(world.navCache.keys().next().value);return route;
  }
  function routeProgressInfo(route,pos){if(!route?.length)return{remaining:0,distance:Infinity,index:0,point:pos,next:pos,instruction:'sem rota'};let total=routeLength(route),before=0,best={distance:Infinity,index:0,t:0,point:route[0],along:0};for(let i=1;i<route.length;i++){const a=route[i-1],b=route[i],p=projectPointToSegment(pos,a,b),d=Math.hypot(pos.x-p.x,pos.z-p.z),seg=Math.hypot(b.x-a.x,b.z-a.z);if(d<best.distance)best={distance:d,index:i-1,t:p.t,point:p,along:before+seg*p.t};before+=seg;}const next=route[Math.min(route.length-1,best.index+1)]||route.at(-1),after=route[Math.min(route.length-1,best.index+2)]||next;const heading=Math.atan2(next.x-best.point.x,next.z-best.point.z),nextHeading=Math.atan2(after.x-next.x,after.z-next.z);let delta=((nextHeading-heading+Math.PI*3)%(Math.PI*2))-Math.PI;const turnDistance=Math.hypot(next.x-best.point.x,next.z-best.point.z);let instruction=turnDistance<4&&after!==next?(delta<-.35?'vire à direita':delta>.35?'vire à esquerda':'siga em frente'):(Math.abs(delta)>.35?`${Math.round(turnDistance)} m até a curva`:'siga em frente');return{...best,total,remaining:Math.max(0,total-best.along),next,after,heading,delta,instruction};}
  function remainingRoute(route,pos){const info=routeProgressInfo(route,pos);return compactRoute([{x:pos.x,z:pos.z},info.point,...route.slice(info.index+1)]);}
  function sampleRoute(points,spacing=3.1){const samples=[];for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),steps=Math.max(1,Math.floor(len/spacing));for(let s=1;s<=steps;s++){const t=s/steps;samples.push({x:a.x+dx*t,z:a.z+dz*t,angle:Math.atan2(dx,dz)});}}return samples;}
  function createRouteGuide(){if(world.routeGuide)return true;if(!worldGroup||!window.THREE)return false;world.routeGuide=new THREE.Group();world.routeGuide.name='OTTHOS_ROUTE_GUIDE';worldGroup.add(world.routeGuide);const material=mat(0x42eaff,{emissive:0x087fa0,emissiveIntensity:1.45,roughness:.2,transparent:true,opacity:.94});for(let i=0;i<46;i++){const arrow=new THREE.Mesh(new THREE.ConeGeometry(.34,.8,4),material);arrow.rotation.x=Math.PI/2;arrow.visible=false;arrow.frustumCulled=false;world.routeGuide.add(arrow);world.routeArrows.push(arrow);}return true;}
  function updateRouteGuide(force=false){if(!createRouteGuide())return;if(!state.waypoint){world.routeArrows.forEach(a=>a.visible=false);world.routePath=[];return;}const routeInfo=routeProgressInfo(world.routePath,player),offRoute=routeInfo.distance>7;if(force||!world.routePath.length||(offRoute&&performance.now()-world.routeLastBuild>1400)){world.routeLastBuild=performance.now();world.routePath=buildRoutePoints(player,state.waypoint);}const visibleRoute=remainingRoute(world.routePath,player),samples=sampleRoute(visibleRoute,3.15).filter((_,i)=>i>0).slice(0,world.routeArrows.length);world.routeArrows.forEach((arrow,i)=>{const p=samples[i];arrow.visible=!!p;if(!p)return;arrow.position.set(p.x,groundHeightAt(p.x,p.z)+.28,p.z);arrow.rotation.z=-p.angle;arrow.scale.setScalar(i<6?1.2:1);});}
  function miniPoint(x,z,scale,w,h){return{x:w/2+(x-player.x)*scale,y:h*.64-(z-player.z)*scale};}
  function miniMapLogicalSize(canvas){const rect=canvas.getBoundingClientRect(),ratio=Math.min(2,window.devicePixelRatio||1),width=Math.max(180,Math.round(rect.width*ratio)),height=Math.max(110,Math.round(rect.height*ratio));if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}return{w:width,h:height,ratio};}
  function miniMapScale(w,h){return clamp(Math.min(w/196,h/122),.72,1.75);}
  function drawMiniMap(){
    const canvas=els.miniMapCanvas;if(!canvas)return;const {w,h}=miniMapLogicalSize(canvas),ctx=canvas.getContext('2d'),scale=miniMapScale(w,h);ctx.clearRect(0,0,w,h);ctx.fillStyle='#67c957';ctx.fillRect(0,0,w,h);
    const room=window.OTTHI_ROOM_WORLD?.current?.();if(room?.bounds){const a=miniPoint(room.bounds.xMin,room.bounds.zMax,scale,w,h),b=miniPoint(room.bounds.xMax,room.bounds.zMin,scale,w,h);ctx.fillStyle='rgba(70,220,255,.12)';ctx.strokeStyle=room.accent||'#5ee7ff';ctx.lineWidth=2;ctx.setLineDash([6,5]);ctx.fillRect(a.x,a.y,b.x-a.x,b.y-a.y);ctx.strokeRect(a.x,a.y,b.x-a.x,b.y-a.y);ctx.setLineDash([]);}
    ctx.save();ctx.lineCap='round';for(const road of WORLD_MAP_ROADS){const horizontal=road.w>=road.d,a=horizontal?miniPoint(road.x-road.w/2,road.z,scale,w,h):miniPoint(road.x,road.z-road.d/2,scale,w,h),b=horizontal?miniPoint(road.x+road.w/2,road.z,scale,w,h):miniPoint(road.x,road.z+road.d/2,scale,w,h);ctx.strokeStyle='#dce1e6';ctx.lineWidth=(horizontal?road.d:road.w)*scale+4;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.strokeStyle='#424a55';ctx.lineWidth=(horizontal?road.d:road.w)*scale;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
    for(const house of window.OTTHI_ROOM_WORLD?.houseMarkers?.()||[]){const q=miniPoint(house.x,house.z,scale,w,h);if(q.x<4||q.x>w-4||q.y<4||q.y>h-4)continue;ctx.fillStyle=house.mine?'#ffe35b':'#fff';ctx.strokeStyle='#15314b';ctx.lineWidth=2;ctx.fillRect(q.x-4,q.y-4,8,8);ctx.strokeRect(q.x-4,q.y-4,8,8);}
    if(state.waypoint&&world.routePath.length){const route=remainingRoute(world.routePath,player);ctx.strokeStyle='#38e9ff';ctx.lineWidth=6;ctx.setLineDash([10,6]);ctx.beginPath();route.forEach((p,i)=>{const q=miniPoint(p.x,p.z,scale,w,h);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();ctx.setLineDash([]);const target=miniPoint(state.waypoint.navX??state.waypoint.x,state.waypoint.navZ??state.waypoint.z,scale,w,h);if(target.x>-12&&target.x<w+12&&target.y>-12&&target.y<h+12){ctx.fillStyle='#ffe33b';ctx.strokeStyle='#172738';ctx.lineWidth=2;ctx.beginPath();ctx.arc(target.x,target.y,7,0,Math.PI*2);ctx.fill();ctx.stroke();}}
    ctx.restore();ctx.fillStyle='rgba(5,20,35,.82)';ctx.fillRect(7,7,25,23);ctx.fillStyle='#fff';ctx.font=`900 ${Math.max(12,Math.round(h*.1))}px system-ui`;ctx.fillText('N',13,24);if(room){ctx.fillStyle='rgba(5,20,35,.78)';ctx.font=`800 ${Math.max(9,Math.round(h*.065))}px system-ui`;const label=`${room.icon||''} ${room.shortName||room.name||''}`;const width=Math.min(w-14,ctx.measureText(label).width+14);ctx.fillRect(7,h-25,width,18);ctx.fillStyle='#fff';ctx.fillText(label,13,h-12);}
    ctx.save();ctx.translate(w/2,h*.64);ctx.rotate(Math.PI-(player.facing||0));ctx.fillStyle='#1979ed';ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-11);ctx.lineTo(8,8);ctx.lineTo(-8,8);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
  }
  function updateNavigation(dt=0,force=false){updateNavigation.acc=(updateNavigation.acc||0)+dt;if(!force&&updateNavigation.acc<.14)return;updateNavigation.acc=0;updateRouteGuide(force);drawMiniMap();if(!els.miniNav)return;if(state.waypoint){const info=routeProgressInfo(world.routePath,player),dx=info.next.x-player.x,dz=info.next.z-player.z,arrival=Math.hypot((state.waypoint.navX??state.waypoint.x)-player.x,(state.waypoint.navZ??state.waypoint.z)-player.z);els.miniNavName.textContent=`Rota: ${state.waypoint.name}`;els.miniNavDistance.textContent=arrival<4?'Você chegou!':`${Math.round(info.remaining)} m • ${info.instruction}`;els.miniNavArrow.style.transform=`rotate(${player.facing-Math.atan2(dx,dz)}rad)`;els.miniNav.classList.add('active');if(arrival<4&&!state.waypoint.arrived){state.waypoint.arrived=true;toast(`Você chegou: ${state.waypoint.name}`,'good',1800);beep(850,90);saveState();}}else{els.miniNavName.textContent='GPS da Vila';els.miniNavDistance.textContent='Toque para escolher o destino';els.miniNavArrow.style.transform='rotate(0deg)';els.miniNav.classList.remove('active');}}
  function routeSvgMarkup(points){const mapped=points.map(p=>worldToMap(p.x,p.z));return `<svg class="map-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${mapped.map(p=>`${p.left},${p.top}`).join(' ')}"/></svg>`;}

  const METRO_STATIONS = [
    { id:'central', name:'Estação Central', x:-12, z:5, navX:-12, navZ:11, line:'Linha Solar' },
    { id:'academia', name:'Estação Academia', x:13, z:-40, navX:13, navZ:-40, line:'Linha Solar' },
    { id:'floresta', name:'Estação Floresta', x:-62, z:-34, navX:-62, navZ:-34, line:'Linha Verde' },
    { id:'lago', name:'Estação Lago', x:-25, z:59, navX:-25, navZ:59, line:'Linha Verde' },
    { id:'castelo', name:'Estação Castelo', x:71, z:49, navX:71, navZ:49, line:'Linha Real' },
    { id:'ginásio', name:'Estação Ginásio', x:63, z:80, navX:63, navZ:80, line:'Linha Real' }
  ];
  const MAP_LOCATIONS = [
    { id:'home', name:`Casa de ${playerDisplayName()}`, icon:'🏠', x:0, z:18, navX:0, navZ:23.3, group:'Casa' },
    { id:'village', name:'Praça da Vila', icon:'🏘', x:0, z:0, group:'Vila' },
    { id:'blue', name:'Casa Azul', icon:'🏡', x:-25, z:17, navX:-25, navZ:22.3, group:'Casas' },
    { id:'pink', name:'Casa Rosa', icon:'🏡', x:25, z:17, navX:25, navZ:22.3, group:'Casas' },
    { id:'shop', name:'Mercadinho', icon:'🛒', x:-22, z:-18, navX:-22, navZ:-12.7, group:'Serviços' },
    { id:'workshop', name:'Oficina', icon:'🛠', x:22, z:-18, navX:22, navZ:-12.7, group:'Serviços' },
    { id:'school', name:'Escola Vila do Sol', icon:'🏫', x:-68, z:-18, navX:-60, navZ:-12, group:'Serviços' },
    { id:'school-east', name:'Escola Horizonte', icon:'🏫', x:78, z:24, navX:68, navZ:18, group:'Serviços' },
    { id:'police', name:'Delegacia Central', icon:'🛡️', x:68, z:-18, navX:55, navZ:-12, group:'Serviços' },
    { id:'police-west', name:'Posto Policial do Bairro', icon:'👮', x:-68, z:22, navX:-55, navZ:22, group:'Serviços' },
    { id:'fire-station', name:'Corpo de Bombeiros', icon:'🚒', x:68, z:-68, navX:55, navZ:-68, group:'Serviços' },
    { id:'well', name:'Poço da Vila', icon:'🪣', x:38, z:10, navX:38, navZ:10, group:'Recursos' },
    { id:'mine', name:'Mina Dourada', icon:'⛏️', x:-92, z:-92, navX:-84, navZ:-86, group:'Recursos' },
    { id:'forest', name:'Floresta', icon:'🌲', x:-88, z:-42, navX:-82, navZ:-35, group:'Exploração' },
    { id:'lake', name:'Represa / Lago', icon:'🌊', x:-36, z:52, navX:-27, navZ:52, group:'Água e Natureza' },
    { id:'pier', name:'Píer do Lago', icon:'🛶', x:-29, z:52, navX:-25, navZ:52, group:'Água e Natureza' },
    { id:'fishing', name:'Área de Pesca', icon:'🎣', x:-31, z:45, navX:-25, navZ:45, group:'Água e Natureza' },
    { id:'camp', name:'Acampamento', icon:'🔥', x:-70, z:-62, navX:-62, navZ:-55, group:'Floresta e Campo' },
    { id:'hunt', name:'Área de Rastreamento', icon:'🐾', x:-98, z:-72, navX:-88, navZ:-65, group:'Floresta e Campo' },
    { id:'cabin', name:'Cabana da Floresta', icon:'🛖', x:-88, z:-42, navX:-82, navZ:-35, group:'Floresta e Campo' },
    { id:'home-extension', name:'Ampliação da Casa', icon:'🧰', x:9, z:24, navX:7, navZ:26, group:'Casa' },
    { id:'crystal', name:'Vale dos Cristais', icon:'💎', x:70, z:-60, group:'Desafios' },
    { id:'garage', name:'Garagem e Fazenda', icon:'🚗', x:52, z:48, navX:48, navZ:43, group:'Trabalho' },
    ...METRO_STATIONS.map(s=>({id:`metro-${s.id}`,name:s.name,icon:'Ⓜ️',x:s.x,z:s.z,navX:s.navX,navZ:s.navZ,group:'Transporte'})),
    { id:'gym', name:'Ginásio', icon:'🏃', x:45, z:78, navX:45, navZ:84, group:'Desafios' },
    { id:'castle', name:'Castelo', icon:'🏰', x:88, z:62, group:'Aventura' },
    { id:'mini', name:'Passagem Mini', icon:'◱', x:-38, z:42, group:'Habilidades' },
    { id:'crouch', name:'Túnel Baixo', icon:'▼', x:-53, z:24, group:'Habilidades' },
    { id:'giant', name:'Portão Grande', icon:'⬡', x:36, z:-35, group:'Habilidades' },
    { id:'edu-math', name:'Matemática Kids', icon:'🔢', x:22, z:-32, navX:18, navZ:-32, group:'Academia' },
    { id:'edu-portuguese', name:'Português Kids', icon:'📚', x:22, z:-40, navX:18, navZ:-40, group:'Academia' },
    { id:'edu-english', name:'English Kids', icon:'🌎', x:22, z:-48, navX:18, navZ:-48, group:'Academia' }
  ];
  const MAP_LOCATION_DETAILS={
    home:['Sua casa principal, com cozinha, quarto, sala, banho e baú de conquistas.',['Dormir','Cozinhar','Decorar']],
    village:['Coração da cidade, perto do transporte, moradores e eventos.',['Encontrar amigos','Iniciar rotas']],
    shop:['Mercadinho com compras, entregas e missões de reposição.',['Comprar','Trabalhar']],
    workshop:['Oficina para ferramentas, construção e fundição de ouro.',['Criar ferramentas','Fundir ouro']],
    school:['Escola Vila do Sol, com aulas, biblioteca e missões de professor.',['Estudar','Ensinar']],
    'school-east':['Escola Horizonte, com salas modernas e ônibus escolar.',['Estudar','Ensinar']],
    police:['Delegacia Central e início das patrulhas educativas.',['Missões policiais','Segurança']],
    'police-west':['Posto policial do bairro para apoio e orientação de trânsito.',['Patrulhar','Pedir ajuda']],
    'fire-station':['Quartel dos bombeiros, caminhões, treinamento e emergências controladas.',['Missões de bombeiro','Ver caminhões']],
    well:['Poço da vila para retirar água com o balde.',['Coletar água']],
    mine:['Mina infantil para extrair pedra e minério de ouro.',['Minerar','Explorar']],
    forest:['Área de árvores, madeira, pistas e aventuras sem violência.',['Cortar madeira','Explorar']],
    lake:['Represa com píer, barco e pesca.',['Pescar','Passear de barco']],
    castle:['Castelo real com desafios, coroas e áreas secretas.',['Explorar','Desafios']],
    gym:['Ginásio para corridas e desafios esportivos.',['Competir','Treinar']],
    garage:['Garagem, fazenda e central de entregas.',['Dirigir','Fazer entregas']],
    default:['Local importante da cidade OTTHOS.',['Explorar','Criar rota']]
  };
