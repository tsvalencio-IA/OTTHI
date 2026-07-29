const SDK='10.14.1',CONFIG_KEY='otthos_firebase_config_v1',ROOT=window.OTTHI_CONFIG?.firebaseRoot||'otthosWorld';
const VALID_ROOM_IDS=Object.freeze(['bairro-central','bairro-floresta','bairro-lago','bairro-montanha','bairro-escola']);
const VALID_ROOM_SET=new Set(VALID_ROOM_IDS),SLOT_TTL_MS=30000,PARENTAL_REAUTH_MS=5*60*1000,GUEST_GUARDIAN_KEY='otthi_guest_guardian_v646';
const APPROVED_CHAT_PHRASES=Object.freeze([
  'Oi!','Vamos brincar?','Quer correr?','Vamos estudar juntos?','Boa jogada!','Parabéns!','Até logo!','Vamos visitar minha casa?','Vamos pescar?','Vamos construir?'
]);
const sanitizeRoom=value=>{const clean=String(value||'bairro-central').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9-]/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').slice(0,32);return VALID_ROOM_SET.has(clean)?clean:'bairro-central'};
let ROOM_ID='bairro-central',WORLD=`rooms/${ROOM_ID}`;
const currentRoom=()=>ROOM_ID;
let api=null,app=null,auth=null,db=null,user=null,connected=false,connecting=null,connectionRepairing=null,presenceSweepTimer=0,refs={},unsubs=[],roomCountUnsubs=[],lastPresence=null,presenceWrite=0,slotTouchAt=0,progressTimer=0,pendingProgress=null,housesCache={},presenceCache={},roomCountsCache={},challengeCache={},sessionCache={},requestCache={},requestCooldown=new Map(),campfireCache={},extensionCache={},boatCache={},coopMissionCache={},blockedCache={},parentalControls=guestParentalControls(),reauthenticatedAt=0,serverTimeOffset=0,activeBoatLock='',boatTouchAt=0;
const dispatch=(name,detail)=>window.dispatchEvent(new CustomEvent(name,{detail}));
function containsPrivateData(text=''){return/(?:https?:\/\/|www\.|@[a-z0-9.-]+\.|\b\d{8,}\b|\(?\d{2}\)?\s*9?\d{4}[-\s]?\d{4})/i.test(String(text))}
function sanitizePublicName(value='Jogador'){
  let name=String(value||'Jogador').normalize('NFC').replace(/[\u0000-\u001f\u007f<>]/g,' ').replace(/\s+/g,' ').trim();
  if(containsPrivateData(name))return'Jogador';
  name=name.replace(/[^\p{L}\p{N} ._-]/gu,'').replace(/\s+/g,' ').trim().slice(0,24);
  return name.length>=3?name:'Jogador';
}
function neutralPublicName(uid=user?.uid||'0000'){const suffix=String(uid||'0000').replace(/[^a-z0-9]/gi,'').slice(-4).toUpperCase().padStart(4,'0');return`Jogador ${suffix}`}
function publicHouseName(houseId=''){return({home:'Casa inicial',blue:'Casa Azul',pink:'Casa Rosa',cabin:'Cabana da Floresta'})[String(houseId||'')]||'Casa online'}
function publicHousePrice(houseId=''){return({home:0,blue:250,pink:420,cabin:180})[String(houseId||'')]??0}
function canonicalHouseRecord(houseId,current={},overrides={}){
  const coordinate=(value,fallback)=>{const number=Number(value),previous=Number(fallback);return Math.max(-120,Math.min(120,Number.isFinite(number)?number:(Number.isFinite(previous)?previous:0)))};
  return{houseId,ownerUid:user.uid,ownerName:ownName(),name:publicHouseName(houseId),price:publicHousePrice(houseId),x:coordinate(overrides.x,current?.x),z:coordinate(overrides.z,current?.z),locked:overrides.locked===undefined?!!current?.locked:!!overrides.locked,updatedAt:api.serverTimestamp()};
}
function normalizeParentalControls(value={}){const sessionLimitMinutes=[0,15,30,45,60].includes(Number(value?.sessionLimitMinutes))?Number(value.sessionLimitMinutes):0;return{multiplayerEnabled:true,communicationEnabled:true,chatEnabled:true,sessionLimitMinutes}}
function guestParentalControls(){try{return normalizeParentalControls(JSON.parse(localStorage.getItem(GUEST_GUARDIAN_KEY)||'{}'))}catch{return normalizeParentalControls({})}}
function rememberGuestParentalControls(value={}){const clean=normalizeParentalControls(value);try{localStorage.setItem(GUEST_GUARDIAN_KEY,JSON.stringify(clean))}catch{}return clean}
function multiplayerAllowed(){return true}
function chatAllowed(){return true}
function isBlocked(uid){return!!(uid&&blockedCache[String(uid)])}
function serverNow(){return Date.now()+Number(serverTimeOffset||0)}
function storedConfig(){try{return JSON.parse(localStorage.getItem(CONFIG_KEY)||'null')}catch{return null}}
function getConfig(){const base=window.OTTHOS_FIREBASE_CONFIG||{},saved=storedConfig();return saved?.apiKey?{...base,...saved}:{...base}}
function validConfig(c){return!!(c?.enabled&&c.apiKey&&c.authDomain&&c.databaseURL&&c.projectId&&c.appId)}
function configuredRooms(){return(Array.isArray(window.OTTHI_CONFIG?.rooms)?window.OTTHI_CONFIG.rooms:[]).filter(room=>VALID_ROOM_SET.has(room?.id))}
function roomCapacity(room=currentRoom()){return Math.min(10,Math.max(1,Number(configuredRooms().find(item=>item.id===sanitizeRoom(room))?.capacity||window.OTTHI_CONFIG?.multiplayer?.maxPlayersPerRoom||10)))}
function status(extra={}){const players=Object.entries(presenceCache).filter(([uid])=>!isBlocked(uid)).map(([uid,data])=>({uid,...data}));return{configured:validConfig(getConfig()),connected,uid:user?.uid||'',room:currentRoom(),count:players.length,capacity:roomCapacity(),roomCounts:{...roomCountsCache},players,parental:{...parentalControls},...extra}}
function dispatchRoomCounts(){dispatch('otthi:room-counts',{counts:{...roomCountsCache},rooms:configuredRooms().map(room=>({...room,count:Number(roomCountsCache[room.id]||0)}))})}
const fixedRoomSlotKeys=(capacity=10)=>Array.from({length:Math.min(10,Math.max(1,Number(capacity)||10))},(_,index)=>`slot-${String(index+1).padStart(2,'0')}`);
function slotTimestamp(item={}){return Number(item?.updatedAt||item?.updatedAtClient||0)}
function slotIsFresh(item={},at=serverNow()){const touched=slotTimestamp(item),ttl=Number(item?.updatedAt)>0?SLOT_TTL_MS:120000;return!!(item?.uid&&touched&&touched>=at-ttl&&touched<=at+60000)}
function presenceIsFresh(item={},at=serverNow()){const touched=Number(item?.updatedAt||0);return!!(touched&&touched>=at-35000&&touched<=at+60000)}
function validRoomSlots(value={},capacity=10,includeStale=false){const allowed=new Set(fixedRoomSlotKeys(capacity)),at=serverNow();return Object.entries(value||{}).filter(([key,item])=>allowed.has(key)&&item&&typeof item==='object'&&item.uid&&(includeStale||slotIsFresh(item,at)));}
function roomSlotCount(value={},capacity=10){return validRoomSlots(value,capacity).length;}
function reserveSlotSnapshot(current,{uid,name,room,capacity=10,nowClient=Date.now(),nowServer=Date.now(),serverTimestamp=nowServer}={}){
  const keys=fixedRoomSlotKeys(capacity),slots=current&&typeof current==='object'?{...current}:{},owned=keys.filter(key=>slots[key]?.uid===uid);
  const slotKey=owned[0]||keys.find(key=>!slots[key]?.uid||!slotIsFresh(slots[key],nowServer));
  if(!uid||!slotKey)return null;
  for(const key of keys){if(key!==slotKey&&slots[key]?.uid===uid)delete slots[key]}
  const previous=slots[slotKey],sameOwner=previous?.uid===uid,joinedAtClient=sameOwner?Number(previous.joinedAtClient||nowClient):nowClient;
  slots[slotKey]={slot:slotKey,uid,name,room,joinedAt:sameOwner&&previous.joinedAt?previous.joinedAt:serverTimestamp,joinedAtClient,updatedAt:serverTimestamp,updatedAtClient:nowClient};
  return{slots,slotKey};
}
function reserveSlotRecord(current,{slotKey,uid,name,room,nowClient=Date.now(),nowServer=Date.now(),serverTimestamp=nowServer}={}){
  if(!slotKey||!uid)return null;
  if(current?.uid&&current.uid!==uid&&slotIsFresh(current,nowServer))return null;
  const sameOwner=current?.uid===uid;
  return{slot:slotKey,uid,name,room,joinedAt:sameOwner&&current?.joinedAt?current.joinedAt:serverTimestamp,joinedAtClient:sameOwner?Number(current?.joinedAtClient||nowClient):nowClient,updatedAt:serverTimestamp,updatedAtClient:nowClient};
}
async function watchRoomCounts(){for(const off of roomCountUnsubs.splice(0)){try{off()}catch{}}if(!api||!db)return;for(const room of configuredRooms()){const roomId=sanitizeRoom(room.id),capacity=roomCapacity(roomId),slotsRef=api.ref(db,`${ROOT}/rooms/${roomId}/slots`);roomCountUnsubs.push(api.onValue(slotsRef,snap=>{roomCountsCache[roomId]=roomSlotCount(snap.val()||{},capacity);dispatchRoomCounts()},listenerError(`vagas ${roomId}`)));}}
async function refreshRoomCounts(){if(!api||!db){try{await ensureServices()}catch{return{...roomCountsCache}}}await Promise.all(configuredRooms().map(async room=>{try{const roomId=sanitizeRoom(room.id),capacity=roomCapacity(roomId),snap=await api.get(api.ref(db,`${ROOT}/rooms/${roomId}/slots`));roomCountsCache[room.id]=roomSlotCount(snap.val()||{},capacity)}catch{}}));dispatchRoomCounts();return{...roomCountsCache}}
async function rollbackRoomSlot(reservation){
  if(!reservation?.slotRef||!api)return false;const ownerUid=String(reservation.uid||user?.uid||'');if(!ownerUid)return false;
  try{const tx=await api.runTransaction(reservation.slotRef,current=>current?.uid===ownerUid?null:undefined,{applyLocally:false});return!!tx.committed}catch{return false}
}
async function reserveRoomSlotIndividually(f,{room,capacity,name,nowClient,nowServer}){
  const slotsRef=f.ref(db,`${ROOT}/rooms/${room}/slots`),keys=fixedRoomSlotKeys(capacity);
  let snapshot=await f.get(slotsRef).catch(()=>null),slots=snapshot?.val?.()||{};
  const owned=keys.filter(key=>slots[key]?.uid===user.uid),ordered=[...owned,...keys.filter(key=>!owned.includes(key))];
  for(const slotKey of ordered){
    const slotRef=f.child(slotsRef,slotKey);
    const tx=await f.runTransaction(slotRef,current=>reserveSlotRecord(current,{slotKey,uid:user.uid,name,room,nowClient,nowServer,serverTimestamp:f.serverTimestamp()})||undefined,{applyLocally:false}).catch(()=>null);
    if(!tx?.committed||tx.snapshot?.val?.()?.uid!==user.uid)continue;
    snapshot=await f.get(slotsRef).catch(()=>null);slots=snapshot?.val?.()||{};
    const duplicates=keys.filter(key=>key!==slotKey&&slots[key]?.uid===user.uid);
    await Promise.all(duplicates.map(key=>rollbackRoomSlot({slotRef:f.child(slotsRef,key),uid:user.uid})));
    snapshot=await f.get(slotsRef).catch(()=>null);slots=snapshot?.val?.()||{};
    return{ok:true,room,count:roomSlotCount(slots,capacity),capacity,slotRef,slotKey,uid:user.uid,reservationMode:'child-transaction'};
  }
  return null;
}
function stopPresenceSweep(){if(presenceSweepTimer){clearInterval(presenceSweepTimer);presenceSweepTimer=0;}}
function sweepStalePresence(){const at=serverNow();for(const[uid,value]of Object.entries(presenceCache)){if(uid===user?.uid)continue;if(!presenceIsFresh(value,at)){delete presenceCache[uid];dispatch('otthos:mp-leave',{uid,stale:true})}}}
function startPresenceSweep(){stopPresenceSweep();presenceSweepTimer=setInterval(sweepStalePresence,10000);}
async function ensureRoomReservation(f=api){
  if(!f||!db||!user||!multiplayerAllowed())return{ok:false,error:'Sessão online indisponível.'};
  if(connectionRepairing)return connectionRepairing;
  connectionRepairing=(async()=>{
    try{
      if(refs.slot){
        const current=await f.get(refs.slot).catch(()=>null),value=current?.val?.();
        if(value?.uid===user.uid){await f.onDisconnect(refs.slot).remove().catch(()=>{});return{ok:true,room:currentRoom(),slotRef:refs.slot,slotKey:String(value.slot||'').slice(0,16),uid:user.uid,count:Number(roomCountsCache[currentRoom()]||0),capacity:roomCapacity()};}
      }
      const reservation=await reserveRoomSlot(currentRoom(),ownName());
      if(!reservation?.ok)return reservation||{ok:false,error:'Não foi possível recuperar a vaga online.'};
      refs.slot=reservation.slotRef;slotTouchAt=0;await f.onDisconnect(refs.slot).remove().catch(()=>{});return reservation;
    }finally{connectionRepairing=null}
  })();
  return connectionRepairing;
}
async function recoverOnlineSession(reason=''){
  if(!api||!db||!user||!multiplayerAllowed())return false;
  const reservation=await ensureRoomReservation(api).catch(()=>null);
  if(!reservation?.ok)return false;
  connected=true;
  await api.onDisconnect(refs.presence).remove().catch(()=>{});
  await api.onDisconnect(refs.slot).remove().catch(()=>{});
  const nowClient=Date.now();
  const tx=await api.runTransaction(refs.slot,current=>current?.uid===user.uid?{...current,name:ownName(),room:currentRoom(),updatedAt:api.serverTimestamp(),updatedAtClient:nowClient}:undefined,{applyLocally:false}).catch(()=>null);
  if(!tx?.committed)return false;
  await api.update(refs.presence,{...lastPresence,name:ownName(),room:currentRoom(),updatedAt:api.serverTimestamp()}).catch(()=>{});
  startPresenceSweep();
  dispatch('otthos:mp-status',status({mode:'firebase-public',recovered:true,reason:String(reason||'')}));
  return true;
}
async function reserveRoomSlot(roomId,name=ownName()){
  const f=await ensureServices();user=auth.currentUser||(await f.signInAnonymously(auth)).user;window.OTTHOS_RTDB.uid=user.uid;
  await refreshParentalControls();if(!multiplayerAllowed())return{ok:false,disabled:true,room:sanitizeRoom(roomId),count:0,capacity:roomCapacity(roomId),error:'O modo online foi desativado pelos responsáveis.'};
  try{const offset=await f.get(f.ref(db,'.info/serverTimeOffset'));serverTimeOffset=Number(offset.val()||0)}catch{}
  const next=sanitizeRoom(roomId),capacity=roomCapacity(next),slotsRef=f.ref(db,`${ROOT}/rooms/${next}/slots`),playerName=sanitizePublicName(name),nowClient=Date.now(),nowServer=serverNow();
  const reservation=await reserveRoomSlotIndividually(f,{room:next,capacity,name:playerName,nowClient,nowServer}).catch(()=>null);
  if(reservation){
    try{await f.onDisconnect(reservation.slotRef).remove()}catch(error){await rollbackRoomSlot(reservation);throw error}
    roomCountsCache[next]=reservation.count;dispatchRoomCounts();return reservation;
  }
  const latest=await f.get(slotsRef).catch(()=>null),count=latest?roomSlotCount(latest.val()||{},capacity):capacity;roomCountsCache[next]=count;dispatchRoomCounts();return{ok:false,full:count>=capacity,room:next,count,capacity,error:count>=capacity?'Bairro lotado. Escolha outro bairro.':'Não foi possível reservar uma vaga. Tente novamente.'};
}
function configure(c){const clean={...c,enabled:true,room:sanitizeRoom(c?.room||currentRoom())};ROOM_ID=clean.room;WORLD=`rooms/${ROOM_ID}`;localStorage.setItem(CONFIG_KEY,JSON.stringify(clean));window.OTTHOS_FIREBASE_CONFIG=clean;window.OTTHOS_RTDB.configured=true;return clean}
function disable(){localStorage.removeItem(CONFIG_KEY);disconnect()}
async function loadSdk(){if(api)return api;const[a,u,d]=await Promise.all([import(`https://www.gstatic.com/firebasejs/${SDK}/firebase-app.js`),import(`https://www.gstatic.com/firebasejs/${SDK}/firebase-auth.js`),import(`https://www.gstatic.com/firebasejs/${SDK}/firebase-database.js`)]);api={...a,...u,...d};return api}
async function ensureServices(){
  const cfg=getConfig();if(!validConfig(cfg))throw new Error('Firebase não configurado');
  const f=await loadSdk();app=f.getApps().find(x=>x.options?.projectId===cfg.projectId)||f.initializeApp(cfg,'otthos-world');auth=f.getAuth(app);if(typeof auth.authStateReady==='function')await auth.authStateReady();db=f.getDatabase(app);return f;
}
function normalizeUsername(value=''){return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9._-]/g,'').replace(/\.+/g,'.').replace(/^[._-]+|[._-]+$/g,'').slice(0,20)}
function accountEmail(username=''){const clean=normalizeUsername(username);return clean?`${clean}@players.otthos.game`:''}
function accountStatus(){const current=user||auth?.currentUser;const email=String(current?.email||'');const suffix='@players.otthos.game';const username=email.endsWith(suffix)?email.slice(0,-suffix.length):'';return{uid:current?.uid||'',anonymous:current?!!current.isAnonymous:true,username,displayName:current?.displayName||username||'',email:username?email:''}}
function friendlyAuthError(error){const code=String(error?.code||'');if(code.includes('email-already-in-use')||code.includes('credential-already-in-use'))return'Esse nome de jogador já possui uma conta.';if(code.includes('invalid-credential')||code.includes('wrong-password')||code.includes('user-not-found')||code.includes('invalid-login-credentials'))return'Nome ou senha incorretos.';if(code.includes('weak-password'))return'A senha precisa ter pelo menos 6 caracteres.';if(code.includes('too-many-requests'))return'Muitas tentativas. Aguarde um pouco e tente novamente.';if(code.includes('network-request-failed'))return'Sem conexão com a internet.';if(code.includes('requires-recent-login'))return'Confirme sua senha novamente.';return error?.message||'Não foi possível acessar a conta.'}
function dispatchAccount(){const detail=accountStatus();window.OTTHOS_RTDB.uid=detail.uid;dispatch('otthos:account',detail);return detail}
async function createPlayerAccount(username,password,displayName=''){
  const clean=normalizeUsername(username),secret=String(password||'');if(clean.length<3)return{ok:false,error:'Use um nome de conta com 3 a 20 letras ou números.'};if(secret.length<6)return{ok:false,error:'A senha precisa ter pelo menos 6 caracteres.'};
  try{const f=await ensureServices(),email=accountEmail(clean);let credentialUser;
    if(auth.currentUser?.isAnonymous){credentialUser=(await f.linkWithCredential(auth.currentUser,f.EmailAuthProvider.credential(email,secret))).user;}
    else if(auth.currentUser?.email===email){credentialUser=auth.currentUser;}
    else{await disconnect();credentialUser=(await f.createUserWithEmailAndPassword(auth,email,secret)).user;}
    const publicName=sanitizePublicName(displayName||clean);user=credentialUser;reauthenticatedAt=0;await f.updateProfile(user,{displayName:publicName}).catch(()=>{});await f.update(f.ref(db,`${ROOT}/users/${user.uid}/profile`),{name:publicName,username:clean,accountLinked:true,updatedAt:f.serverTimestamp()});dispatchAccount();return{ok:true,...accountStatus()};
  }catch(error){return{ok:false,error:friendlyAuthError(error)}}
}
async function signInPlayerAccount(username,password,displayName=''){
  const clean=normalizeUsername(username),secret=String(password||'');if(clean.length<3||secret.length<6)return{ok:false,error:'Confira o nome da conta e a senha.'};
  try{const f=await ensureServices();await disconnect();user=(await f.signInWithEmailAndPassword(auth,accountEmail(clean),secret)).user;reauthenticatedAt=0;const publicName=sanitizePublicName(displayName||user.displayName||clean);await f.updateProfile(user,{displayName:publicName}).catch(()=>{});dispatchAccount();await connect({name:publicName});return{ok:true,...accountStatus()};}
  catch(error){return{ok:false,error:friendlyAuthError(error)}}
}
async function reauthenticateAccount(password){try{const f=await ensureServices(),current=auth.currentUser;if(!current||current.isAnonymous||!current.email)return{ok:false,error:'Vincule uma conta antes de abrir a área dos responsáveis.'};await f.reauthenticateWithCredential(current,f.EmailAuthProvider.credential(current.email,String(password||'')));await current.getIdToken(true);reauthenticatedAt=Date.now();return{ok:true,expiresAt:reauthenticatedAt+PARENTAL_REAUTH_MS}}catch(error){reauthenticatedAt=0;return{ok:false,error:friendlyAuthError(error)}}}
async function refreshParentalControls(){
  const current=user||auth?.currentUser,fallback=current?.isAnonymous?guestParentalControls():normalizeParentalControls({});if(!api||!db||!current){parentalControls=fallback;return parentalControls}
  try{const snap=await api.get(api.ref(db,`${ROOT}/users/${current.uid}/guardianSettings`));parentalControls=snap.exists()?normalizeParentalControls(snap.val()||{}):fallback;return parentalControls}catch{parentalControls=fallback;return parentalControls}
}
async function getGuardianSettings(){try{await ensureServices();user=auth.currentUser||user;if(!user)return{ok:false,error:'Conta indisponível.'};await refreshParentalControls();return{ok:true,...parentalControls,settings:{...parentalControls},requiresReauthentication:Date.now()-reauthenticatedAt>PARENTAL_REAUTH_MS}}catch(error){return{ok:false,error:friendlyAuthError(error)}}}
async function saveGuardianSettings(settings={}){
  try{
    const f=await ensureServices();user=auth.currentUser||user;if(!user||user.isAnonymous||!user.email)return{ok:false,error:'Vincule uma conta antes de alterar os controles parentais.'};
    if(Date.now()-reauthenticatedAt>PARENTAL_REAUTH_MS)return{ok:false,error:'Confirme a senha novamente antes de alterar os controles parentais.',requiresReauthentication:true};
    const clean=normalizeParentalControls({...settings,multiplayerEnabled:true,communicationEnabled:true,chatEnabled:true}),guardianRef=f.ref(db,`${ROOT}/users/${user.uid}/guardianSettings`);await user.getIdToken(true);await f.set(guardianRef,{...clean,updatedAt:f.serverTimestamp(),updatedByUid:user.uid});
    const savedSnapshot=await f.get(guardianRef),saved=normalizeParentalControls(savedSnapshot.val()||{});if(saved.multiplayerEnabled!==clean.multiplayerEnabled||saved.communicationEnabled!==clean.communicationEnabled||saved.sessionLimitMinutes!==clean.sessionLimitMinutes)return{ok:false,error:'O Firebase não confirmou os controles. Confirme a senha e tente novamente.'};
    parentalControls=saved;dispatch('otthi:guardian-settings',{...saved});if(!multiplayerAllowed())await disconnect();return{ok:true,...saved,settings:{...saved}};
  }catch(error){return{ok:false,error:friendlyAuthError(error)}}
}
async function signOutPlayerAccount(password=''){
  try{
    const f=await ensureServices(),current=auth.currentUser||user,preserved={...parentalControls};
    if(current&&!current.isAnonymous){const confirmed=await reauthenticateAccount(password);if(!confirmed.ok)return confirmed;}
    await disconnect();await f.signOut(auth);reauthenticatedAt=0;parentalControls=rememberGuestParentalControls(preserved);blockedCache={};user=(await f.signInAnonymously(auth)).user;dispatchAccount();dispatch('otthi:guardian-settings',{...parentalControls});if(multiplayerAllowed())await connect({name:lastPresence?.name||'Jogador'});return{ok:true,...accountStatus()};
  }catch(error){return{ok:false,error:friendlyAuthError(error)}}
}
function ownName(){return neutralPublicName(user?.uid)}
function listenerError(scope){return error=>{const message=error?.message||String(error);console.warn(`Firebase ${scope}:`,error);dispatch('otthos:firebase-warning',{scope,message,permissionDenied:/permission|denied/i.test(message)});return false}}
async function connect(options={}){
  const requestedRoom=sanitizeRoom(options.room||currentRoom());
  if(requestedRoom!==ROOM_ID){ROOM_ID=requestedRoom;WORLD=`rooms/${ROOM_ID}`;}
  if(connected&&user)return true;if(connecting)return connecting;
  connecting=(async()=>{const cfg=getConfig();if(!validConfig(cfg)){dispatch('otthos:mp-status',status({mode:'offline',error:'Firebase não configurado'}));return false}
    let reservation=null;
    try{
      const f=await ensureServices();user=auth.currentUser||(await f.signInAnonymously(auth)).user;window.OTTHOS_RTDB.uid=user.uid;dispatchAccount();
      await refreshParentalControls();if(!multiplayerAllowed()){dispatch('otthos:mp-status',status({mode:'offline',disabled:true,error:'O modo online foi desativado pelos responsáveis.'}));return false}
      try{const offset=await f.get(f.ref(db,'.info/serverTimeOffset'));serverTimeOffset=Number(offset.val()||0)}catch{}
      try{const blocks=await f.get(f.ref(db,`${ROOT}/users/${user.uid}/blocks`));blockedCache=blocks.val()||{}}catch{blockedCache={}}
      reservation=options.slotReservation?.ok&&options.slotReservation.room===ROOM_ID&&options.slotReservation.uid===user.uid?options.slotReservation:await reserveRoomSlot(ROOM_ID,neutralPublicName(user.uid));
      if(!reservation.ok){dispatch('otthos:mp-status',status({mode:'offline',disabled:!!reservation.disabled,error:reservation.error||(reservation.full?'Bairro lotado':'Não foi possível reservar uma vaga'),full:!!reservation.full,count:reservation.count,capacity:reservation.capacity}));return false;}
      refs.slot=reservation.slotRef;refs.presence=f.ref(db,`${ROOT}/${WORLD}/presence/${user.uid}`);refs.presences=f.ref(db,`${ROOT}/${WORLD}/presence`);refs.profile=f.ref(db,`${ROOT}/users/${user.uid}/profile`);refs.progress=f.ref(db,`${ROOT}/users/${user.uid}/progress`);refs.learning=f.ref(db,`${ROOT}/users/${user.uid}/learning`);refs.guardian=f.ref(db,`${ROOT}/users/${user.uid}/guardianSettings`);refs.activityAudit=f.ref(db,`${ROOT}/users/${user.uid}/activityAudit`);refs.blocks=f.ref(db,`${ROOT}/users/${user.uid}/blocks`);refs.houses=f.ref(db,`${ROOT}/${WORLD}/houses`);refs.campfires=f.ref(db,`${ROOT}/${WORLD}/campfires`);refs.extensions=f.ref(db,`${ROOT}/${WORLD}/houseExtensions`);refs.boats=f.ref(db,`${ROOT}/${WORLD}/boats`);refs.chat=f.ref(db,`${ROOT}/${WORLD}/chat`);refs.gifts=f.ref(db,`${ROOT}/users/${user.uid}/inbox`);refs.interactions=f.ref(db,`${ROOT}/users/${user.uid}/interactions`);refs.challenges=f.ref(db,`${ROOT}/users/${user.uid}/challenges`);refs.socialRequests=f.ref(db,`${ROOT}/users/${user.uid}/socialRequests`);refs.sessions=f.ref(db,`${ROOT}/${WORLD}/gameSessions`);refs.coopMissions=f.ref(db,`${ROOT}/${WORLD}/coopMissions`);lastPresence={name:neutralPublicName(user.uid),room:currentRoom(),x:0,y:0,z:0,r:0,color:0x5ad8ff};
      await watchRoomCounts();
      unsubs.push(f.onValue(refs.guardian,s=>{parentalControls=normalizeParentalControls(s.val()||{});dispatch('otthi:guardian-settings',{...parentalControls})},listenerError('controles parentais')));
      unsubs.push(f.onValue(refs.blocks,s=>{blockedCache=s.val()||{};for(const uid of Object.keys(blockedCache)){if(presenceCache[uid]){delete presenceCache[uid];dispatch('otthos:mp-leave',{uid,blocked:true})}}dispatch('otthi:blocked-players',{players:{...blockedCache}})},listenerError('bloqueios')));
      unsubs.push(f.onValue(f.ref(db,'.info/serverTimeOffset'),s=>{serverTimeOffset=Number(s.val()||0)}));
      unsubs.push(f.onValue(f.ref(db,'.info/connected'),async s=>{const networkOnline=s.val()===true&&multiplayerAllowed();connected=networkOnline;if(networkOnline){const reservation=await ensureRoomReservation(f).catch(()=>null);if(!reservation?.ok){connected=false;stopPresenceSweep();dispatch('otthos:mp-status',status({mode:'offline',disabled:!!reservation?.disabled,full:!!reservation?.full,error:reservation?.error||'Não foi possível recuperar a vaga online.'}));return;}await f.onDisconnect(refs.presence).remove().catch(()=>{});await f.onDisconnect(refs.slot).remove().catch(()=>{});await f.update(refs.profile,{name:ownName(),updatedAt:f.serverTimestamp()});await publish(lastPresence,true);startPresenceSweep()}else stopPresenceSweep();dispatch('otthos:mp-status',status({mode:connected?'firebase-public':'offline',disabled:!multiplayerAllowed(),error:connected?'':multiplayerAllowed()?'Sem conexão':'O modo online foi desativado pelos responsáveis.'}))},listenerError('conexão')));
      const emit=s=>{if(s.key===user.uid||isBlocked(s.key))return;const value=s.val()||{};if(!presenceIsFresh(value)){delete presenceCache[s.key];dispatch('otthos:mp-leave',{uid:s.key,stale:true});return;}presenceCache[s.key]=value;dispatch('otthos:mp-player',{uid:s.key,...value})};
      unsubs.push(f.onChildAdded(refs.presences,emit,listenerError('presença')));unsubs.push(f.onChildChanged(refs.presences,emit,listenerError('presença')));unsubs.push(f.onChildRemoved(refs.presences,s=>{delete presenceCache[s.key];dispatch('otthos:mp-leave',{uid:s.key})},listenerError('presença')));
      unsubs.push(f.onValue(refs.presences,s=>{presenceCache=Object.fromEntries(Object.entries(s.val()||{}).filter(([uid,value])=>!isBlocked(uid)&&presenceIsFresh(value)));dispatch('otthos:mp-status',status({mode:'firebase-public',count:Object.keys(presenceCache).length}))},listenerError('lista de presença')));
      unsubs.push(f.onValue(refs.houses,s=>{housesCache=Object.fromEntries(Object.entries(s.val()||{}).map(([id,value])=>[id,{...(value||{}),houseId:id,name:publicHouseName(id),ownerName:neutralPublicName(value?.ownerUid)}]));dispatch('otthos:houses',housesCache)},listenerError('casas')));
      unsubs.push(f.onValue(refs.campfires,s=>{campfireCache=s.val()||{};dispatch('otthos:campfires-cloud',campfireCache)},listenerError('fogueiras')));
      unsubs.push(f.onValue(refs.extensions,s=>{extensionCache=s.val()||{};dispatch('otthos:extensions-cloud',extensionCache)},listenerError('ampliações')));
      unsubs.push(f.onValue(refs.boats,s=>{boatCache=s.val()||{};dispatch('otthos:boats-cloud',boatCache)},listenerError('barcos')));
      const recentChat=f.query(refs.chat,f.limitToLast(40));unsubs.push(f.onChildAdded(recentChat,s=>{const value=s.val()||{};if(!isBlocked(value.senderUid)){dispatch('otthos:chat',{id:s.key,...value});if(value.senderUid&&value.senderUid!==user.uid)recordActivity('chat','message',{direction:'received',peerUid:value.senderUid,text:value.text,eventId:`chat-in-${s.key}`})}},listenerError('chat')));unsubs.push(f.onChildRemoved(recentChat,s=>dispatch('otthos:chat-removed',{id:s.key}),listenerError('chat')));
      unsubs.push(f.onChildAdded(refs.gifts,async s=>{const value=s.val()||{},safe=(value.type==='coins'&&Number(value.amount)===10)||(value.type==='crystal'&&Number(value.amount)===1);if(safe&&!isBlocked(value.senderUid)){dispatch('otthos:gift',{id:s.key,senderUid:String(value.senderUid||''),type:value.type,amount:Number(value.amount)});recordActivity('gift',value.type,{direction:'received',peerUid:value.senderUid,eventId:`gift-in-${s.key}`})}await f.remove(s.ref).catch(()=>{})},listenerError('presentes')));
      unsubs.push(f.onChildAdded(refs.interactions,async s=>{const value=s.val()||{},safe=INTERACTION_TYPES.includes(value.type)&&(value.type!=='socialRequestResult'||(SOCIAL_ACTIONS.includes(value.actionType)&&SOCIAL_RESULT_STATUSES.includes(value.status)&&typeof value.requestId==='string'));if(safe&&!isBlocked(value.senderUid)){dispatch('otthos:interaction',{id:s.key,senderUid:String(value.senderUid||''),type:value.type,requestId:String(value.requestId||''),actionType:String(value.actionType||''),status:String(value.status||'')});recordActivity('social',value.type,{direction:'received',peerUid:value.senderUid,eventId:`interaction-in-${s.key}`})}await f.remove(s.ref).catch(()=>{})},listenerError('interações')));
      const emitChallenge=s=>{const value=s.val()||{};if(isBlocked(value.fromUid))return;challengeCache[s.key]=value;dispatch('otthos:challenge',{id:s.key,...value});if(value.fromUid&&value.fromUid!==user.uid&&value.status==='pending')recordActivity('challenge',value.type||'challenge',{direction:'received',peerUid:value.fromUid,eventId:`challenge-in-${s.key}`})};
      unsubs.push(f.onChildAdded(refs.challenges,emitChallenge,listenerError('convites')));unsubs.push(f.onChildChanged(refs.challenges,emitChallenge,listenerError('convites')));unsubs.push(f.onChildRemoved(refs.challenges,s=>{delete challengeCache[s.key];dispatch('otthos:challenge-removed',{id:s.key})},listenerError('convites')));
      const emitSocialRequest=s=>{const value=s.val()||{};if(isBlocked(value.fromUid))return;requestCache[s.key]=value;dispatch('otthos:social-request',{id:s.key,...value});if(value.fromUid&&value.fromUid!==user.uid&&value.status==='pending')recordActivity('social',value.actionType||'request',{direction:'received',peerUid:value.fromUid,eventId:`social-in-${s.key}`})};
      unsubs.push(f.onChildAdded(refs.socialRequests,emitSocialRequest,listenerError('solicitações sociais')));unsubs.push(f.onChildChanged(refs.socialRequests,emitSocialRequest,listenerError('solicitações sociais')));unsubs.push(f.onChildRemoved(refs.socialRequests,s=>{delete requestCache[s.key];dispatch('otthos:social-request-removed',{id:s.key})},listenerError('solicitações sociais')));
      const emitSession=s=>{const value=s.val()||{};if((value.fromUid!==user.uid&&value.toUid!==user.uid)||isBlocked(value.fromUid===user.uid?value.toUid:value.fromUid))return;sessionCache[s.key]=value;dispatch('otthos:game-session',{id:s.key,...value})},removeSession=s=>{delete sessionCache[s.key];dispatch('otthos:game-session-removed',{id:s.key})};
      for(const field of['fromUid','toUid']){const ownSessions=f.query(refs.sessions,f.orderByChild(field),f.equalTo(user.uid),f.limitToLast(30));unsubs.push(f.onChildAdded(ownSessions,emitSession,listenerError('partidas')));unsubs.push(f.onChildChanged(ownSessions,emitSession,listenerError('partidas')));unsubs.push(f.onChildRemoved(ownSessions,removeSession,listenerError('partidas')));}
      const emitCoopMission=s=>{const value=s.val()||{};coopMissionCache[s.key]={id:s.key,...value};dispatch('otthi:coop-mission',{id:s.key,mission:coopMissionCache[s.key]});dispatch('otthi:coop-missions',{missions:{...coopMissionCache}})},removeCoopMission=s=>{delete coopMissionCache[s.key];dispatch('otthi:coop-mission-removed',{id:s.key});dispatch('otthi:coop-missions',{missions:{...coopMissionCache}})};
      const recentCoop=f.query(refs.coopMissions,f.orderByChild('updatedAtClient'),f.limitToLast(30));unsubs.push(f.onChildAdded(recentCoop,emitCoopMission,listenerError('missões cooperativas')));unsubs.push(f.onChildChanged(recentCoop,emitCoopMission,listenerError('missões cooperativas')));unsubs.push(f.onChildRemoved(recentCoop,removeCoopMission,listenerError('missões cooperativas')));
      const remoteProgress=(await f.get(refs.progress)).val();dispatch('otthos:cloud-profile',{progress:remoteProgress});dispatch('otthi:room-changed',{room:ROOM_ID,previousRoom:ROOM_ID,connected:true});dispatch('otthos:mp-status',status({mode:'firebase-public'}));return true;
    }catch(error){connected=false;if(refs.presence)await api?.remove(refs.presence).catch(()=>{});if(reservation)await rollbackRoomSlot(reservation);for(const off of unsubs.splice(0)){try{off()}catch{}}for(const off of roomCountUnsubs.splice(0)){try{off()}catch{}}refs={};dispatch('otthos:mp-status',status({mode:'offline',error:error?.message||String(error)}));console.warn('Firebase multiplayer:',error);return false}finally{connecting=null}
  })();return connecting;
}
async function publish(payload,force=false){
  lastPresence={...lastPresence,...payload,name:neutralPublicName(user?.uid),room:currentRoom(),emoteType:String(payload.emoteType||lastPresence?.emoteType||'').slice(0,16),emoteSeq:Number(payload.emoteSeq??lastPresence?.emoteSeq??0)};
  if(!connected||!multiplayerAllowed()||!refs.presence||!api)return false;const nowPerf=performance.now();if(!force&&nowPerf-presenceWrite<200)return false;presenceWrite=nowPerf;
  try{
    if(refs.slot&&(force||nowPerf-slotTouchAt>5000)){
      slotTouchAt=nowPerf;const nowClient=Date.now(),tx=await api.runTransaction(refs.slot,current=>current?.uid===user.uid?{...current,name:ownName(),room:currentRoom(),updatedAt:api.serverTimestamp(),updatedAtClient:nowClient}:undefined,{applyLocally:false});
      if(!tx.committed)throw new Error('A reserva desta sala expirou.');
    }
    await api.update(refs.presence,{...lastPresence,updatedAt:api.serverTimestamp()});
    if(activeBoatLock&&lastPresence.boating&&lastPresence.boatRole==='driver'&&(force||nowPerf-boatTouchAt>5000)){boatTouchAt=nowPerf;await api.update(api.ref(db,`${ROOT}/${WORLD}/boats/${activeBoatLock}`),{driverName:ownName(),room:currentRoom(),updatedAt:api.serverTimestamp(),updatedAtClient:Date.now()}).catch(()=>{});}
    return true;
  }catch(error){
    const lost=/reserva|permission|denied/i.test(String(error?.message||error||''));if(lost){const recovered=await recoverOnlineSession(error?.message||error).catch(()=>false);if(recovered)return true;connected=false;await api.remove(refs.presence).catch(()=>{});dispatch('otthos:mp-status',status({mode:'offline',error:'Não foi possível recuperar a vaga deste bairro.',full:true}));setTimeout(()=>disconnect().catch(()=>{}),0);}else listenerError('publicação')(error);return false;
  }
}
function syncProgress(progress,force=false){pendingProgress=progress;clearTimeout(progressTimer);const run=async()=>{if(!connected||!refs.progress||!pendingProgress||!api)return false;const data=pendingProgress;pendingProgress=null;try{await api.set(refs.progress,{...data,lastSaved:Number(data.lastSaved||Date.now())});await api.update(refs.profile,{name:sanitizePublicName(data.profile?.name||ownName()),level:Number(data.profile?.level||1),reputation:Number(data.profile?.reputation||0),updatedAt:api.serverTimestamp()});return true}catch(e){console.warn('Cloud save:',e);return false}};if(force)return run();progressTimer=setTimeout(run,1800);return true}
function validAccountId(accountId){return/^[a-f0-9]{64}$/.test(String(accountId||''))}
function accountReadyFor(accountId){const current=accountStatus();return!!(current.uid&&!current.anonymous&&validAccountId(accountId))}
async function loadGameAccount(accountId){
  if(!connected||!api||!db)return{ok:false,error:'Conecte-se para recuperar a conta'};if(!accountReadyFor(accountId))return{ok:false,error:'Entre na conta protegida antes de recuperar o progresso'};
  try{const current=accountStatus(),snap=await api.get(api.ref(db,`${ROOT}/gameAccounts/${current.uid}`));if(!snap.exists())return{ok:true,exists:false,record:null};const record=snap.val()||{};if(record.accountId!==accountId)return{ok:false,error:'Esta conta não corresponde ao progresso protegido.'};return{ok:true,exists:true,record};}catch(error){listenerError('conta do jogo')(error);return{ok:false,error:error?.message||'Não foi possível abrir a conta'}}
}
async function saveGameAccount(accountId,payload){
  if(!connected||!api||!db)return{ok:false,error:'Conecte-se para salvar a conta'};if(!accountReadyFor(accountId))return{ok:false,error:'Entre na conta protegida antes de salvar'};
  const iv=String(payload?.iv||''),ciphertext=String(payload?.ciphertext||'');if(!iv||!ciphertext||ciphertext.length>450000)return{ok:false,error:'Progresso inválido'};
  try{const current=accountStatus();await api.set(api.ref(db,`${ROOT}/gameAccounts/${current.uid}`),{schema:2,ownerUid:current.uid,accountId,username:current.username,iv:iv.slice(0,64),ciphertext,updatedAt:api.serverTimestamp(),updatedAtClient:Number(payload?.updatedAtClient||Date.now())});return{ok:true}}catch(error){listenerError('salvamento da conta')(error);return{ok:false,error:error?.message||'Não foi possível salvar a conta'}}
}
function validPublicUid(value){return/^[A-Za-z0-9_-]{6,128}$/.test(String(value||''))}
async function blockPlayer(targetUid){
  targetUid=String(targetUid||'');if(!user||!api||!db||!validPublicUid(targetUid)||targetUid===user.uid)return{ok:false,error:'Jogador inválido.'};
  try{const record={uid:targetUid,name:sanitizePublicName(presenceCache[targetUid]?.name||'Jogador'),createdAt:api.serverTimestamp()};await api.set(api.ref(db,`${ROOT}/users/${user.uid}/blocks/${targetUid}`),record);recordActivity('safety','block',{direction:'performed',peerUid:targetUid,eventId:`safety-block-${targetUid}`});blockedCache[targetUid]=record;delete presenceCache[targetUid];dispatch('otthos:mp-leave',{uid:targetUid,blocked:true});dispatch('otthi:blocked-players',{players:{...blockedCache}});return{ok:true}}catch(error){return{ok:false,error:error?.message||String(error)}}
}
async function unblockPlayer(targetUid){
  targetUid=String(targetUid||'');if(!user||!api||!db||!validPublicUid(targetUid))return{ok:false,error:'Jogador inválido.'};
  try{await api.remove(api.ref(db,`${ROOT}/users/${user.uid}/blocks/${targetUid}`));recordActivity('safety','unblock',{direction:'performed',peerUid:targetUid,eventId:`safety-unblock-${targetUid}-${Date.now()}`});delete blockedCache[targetUid];dispatch('otthi:blocked-players',{players:{...blockedCache}});return{ok:true}}catch(error){return{ok:false,error:error?.message||String(error)}}
}
function getBlockedPlayers(){return{...blockedCache}}
function isPlayerBlocked(uid){return isBlocked(uid)}
async function reportPlayer(targetUid,reason='other'){
  targetUid=String(targetUid||'');if(!user||!api||!db||!validPublicUid(targetUid)||targetUid===user.uid)return{ok:false,error:'Jogador inválido.'};
  const allowed=['language','privacy','inappropriate-name','unsafe-chat','bullying','personal-data','other'],cleanReason=String(reason||'other').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z-]/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');reason=allowed.includes(cleanReason)?cleanReason:'other';
  try{const reportRef=api.push(api.ref(db,`${ROOT}/reports`));await api.set(reportRef,{reporterUid:user.uid,targetUid,reason,room:currentRoom(),createdAt:api.serverTimestamp()});recordActivity('safety',`report-${reason}`,{direction:'performed',peerUid:targetUid,eventId:`safety-report-${reportRef.key}`});return{ok:true,id:reportRef.key}}catch(error){return{ok:false,error:error?.message||String(error)}}
}
const AUDIT_CATEGORIES=Object.freeze(['chat','social','gift','challenge','coop','safety','system']);
const AUDIT_DIRECTIONS=Object.freeze(['sent','received','performed']);
function safeAuditId(value=''){return String(value||'').replace(/[^A-Za-z0-9_-]/g,'').slice(0,120)}
function safeAuditAction(value='activity'){return String(value||'activity').toLowerCase().replace(/[^a-z0-9_-]/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').slice(0,40)||'activity'}
function activityAuditRecord(category,action,options={}){const peerUid=validPublicUid(options.peerUid)?String(options.peerUid):'',text=APPROVED_CHAT_PHRASES.includes(String(options.text||''))?String(options.text):'';return{actorUid:user.uid,direction:AUDIT_DIRECTIONS.includes(options.direction)?options.direction:'performed',category:AUDIT_CATEGORIES.includes(category)?category:'system',action:safeAuditAction(action),peerUid,peerName:peerUid?neutralPublicName(peerUid):'',room:currentRoom(),text,createdAt:api.serverTimestamp(),createdAtClient:Date.now()}}
async function recordActivity(category,action,options={}){if(!api||!db||!user)return false;const id=safeAuditId(options.eventId)||api.push(api.ref(db,`${ROOT}/users/${user.uid}/activityAudit`)).key,ref=api.ref(db,`${ROOT}/users/${user.uid}/activityAudit/${id}`);try{await api.set(ref,activityAuditRecord(category,action,options));return true}catch(error){if(!/permission|denied/i.test(String(error?.message||error||'')))console.warn('Firebase auditoria:',error);return false}}
async function getActivityAudit(limit=120){if(!api||!db||!user)return{ok:false,items:[]};const safeLimit=Math.max(10,Math.min(200,Number(limit)||120));try{const query=api.query(api.ref(db,`${ROOT}/users/${user.uid}/activityAudit`),api.orderByChild('createdAtClient'),api.limitToLast(safeLimit)),snap=await api.get(query),items=[];snap.forEach(child=>items.push({id:child.key,...(child.val()||{})}));items.sort((a,b)=>Number(b.createdAtClient||b.createdAt||0)-Number(a.createdAtClient||a.createdAt||0));return{ok:true,items}}catch(error){return{ok:false,items:[],error:error?.message||String(error)}}}
async function sendChat(text){text=String(text||'').trim();if(!connected||!APPROVED_CHAT_PHRASES.includes(text))return false;try{const r=api.push(refs.chat);await api.set(r,{senderUid:user.uid,name:ownName(),text,createdAt:api.serverTimestamp()});recordActivity('chat','message',{direction:'sent',text,eventId:`chat-out-${r.key}`});return true}catch(error){listenerError('chat')(error);return false}}
async function deleteOwnChatMessages(){if(!connected||!refs.chat||!user)return{ok:false,error:'Você está offline'};try{const q=api.query(refs.chat,api.orderByChild('senderUid'),api.equalTo(user.uid)),snap=await api.get(q),updates={};snap.forEach(child=>{updates[child.key]=null});const count=Object.keys(updates).length;if(count)await api.update(refs.chat,updates);return{ok:true,count}}catch(error){listenerError('exclusão do chat')(error);return{ok:false,error:error?.message||String(error)}}}
const SOCIAL_ACTIONS=['dance','play','highfive','hug','selfie','vehiclePassenger','boatPassenger','fishTogether','campfireJoin','huntTogether'];
const SOCIAL_STATUSES=['pending','accepted','declined','expired','cancelled','completed'];
const SOCIAL_RESULT_STATUSES=['accepted','declined','expired','cancelled','completed'];
const INTERACTION_TYPES=['wave','socialRequestResult','challengeAccepted','challengeDeclined','boatPassengerLeft','boatEnded','vehiclePassengerLeft','vehicleEnded'];
async function sendGift(targetUid,gift){
  if(!connected||!targetUid||targetUid===user.uid||isBlocked(targetUid))return false;const type=gift?.type,amount=type==='coins'?10:type==='crystal'?1:0;if(!amount)return false;
  try{const r=api.push(api.ref(db,`${ROOT}/users/${targetUid}/inbox`));await api.set(r,{senderUid:user.uid,senderName:ownName(),type,amount,createdAt:api.serverTimestamp()});recordActivity('gift',type,{direction:'sent',peerUid:targetUid,eventId:`gift-out-${r.key}`});return true}catch(error){listenerError('presente')(error);return false}
}
async function sendInteraction(targetUid,event={}){
  if(!connected||!targetUid||targetUid===user.uid||isBlocked(targetUid))return false;const type=String(event.type||'');if(!INTERACTION_TYPES.includes(type))return false;
  const record={senderUid:user.uid,senderName:ownName(),type,createdAt:api.serverTimestamp()};
  if(type==='socialRequestResult'){const requestId=String(event.requestId||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,80),actionType=String(event.actionType||''),status=String(event.status||'');if(!requestId||!SOCIAL_ACTIONS.includes(actionType)||!SOCIAL_RESULT_STATUSES.includes(status))return false;Object.assign(record,{requestId,actionType,status});}
  try{const r=api.push(api.ref(db,`${ROOT}/users/${targetUid}/interactions`));await api.set(r,record);recordActivity('social',type,{direction:'sent',peerUid:targetUid,eventId:`interaction-out-${r.key}`});return true}catch(error){listenerError('interação')(error);return false}
}
function socialDistanceRequired(type){return['dance','play','highfive','hug','selfie','vehiclePassenger','boatPassenger','fishTogether','campfireJoin','huntTogether'].includes(type)}
async function sendSocialRequest(targetUid,actionType,targetName='Jogador',extra={}){
  if(!connected||!targetUid||targetUid===user.uid||isBlocked(targetUid))return{ok:false,error:'Jogador indisponível'};
  actionType=String(actionType||'').slice(0,32);if(!SOCIAL_ACTIONS.includes(actionType))return{ok:false,error:'Ação inválida'};
  const cooldownKey=`${targetUid}:${actionType}`,now=Date.now(),last=Number(requestCooldown.get(cooldownKey)||0);if(now-last<4500)return{ok:false,error:'Espere alguns segundos antes de repetir o convite'};
  const target=presenceCache[targetUid];if(!target)return{ok:false,error:'O jogador não está mais online'};
  if(String(target.room||currentRoom())!==String(lastPresence?.room||currentRoom()))return{ok:false,error:'O jogador está em outra sala'};
  if(socialDistanceRequired(actionType)&&Math.hypot(Number(target.x||0)-Number(lastPresence?.x||0),Number(target.z||0)-Number(lastPresence?.z||0))>6.5)return{ok:false,error:'Chegue mais perto do jogador'};
  if(actionType==='boatPassenger'&&(!lastPresence?.boating||lastPresence?.boatRole!=='driver'||!lastPresence?.boatId))return{ok:false,error:'Entre no barco como motorista antes de convidar'};
  if(actionType==='boatPassenger'&&(target.boating||target.vehicle||target.transitMode))return{ok:false,error:'O jogador já está em outro transporte'};
  if(actionType==='vehiclePassenger'&&(!lastPresence?.vehicle||lastPresence?.vehicleRole!=='driver'||!lastPresence?.vehicleId))return{ok:false,error:'Entre no carro como motorista antes de convidar'};
  if(actionType==='vehiclePassenger'&&(target.vehicle||target.boating||target.transitMode))return{ok:false,error:'O jogador já está em outro transporte'};
  try{
    const inbox=api.ref(db,`${ROOT}/users/${targetUid}/socialRequests`),bucket=Math.floor(now/30000),safeUid=String(user.uid).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,64),id=`req_${safeUid}_${actionType}_${bucket}`,r=api.child(inbox,id);
    const safeExtra={boatId:String(extra?.boatId||'').slice(0,40),vehicleId:String(extra?.vehicleId||'').slice(0,40),campfireId:String(extra?.campfireId||'').slice(0,80),fromX:Number(lastPresence?.x||0),fromZ:Number(lastPresence?.z||0)};
    const request={fromUid:user.uid,fromName:ownName(),toUid:targetUid,toName:sanitizePublicName(targetName),actionType,room:currentRoom(),status:'pending',createdAt:api.serverTimestamp(),createdAtClient:now,expiresAt:now+30000,extra:safeExtra};
    await api.set(r,request);requestCooldown.set(cooldownKey,now);recordActivity('social',actionType,{direction:'sent',peerUid:targetUid,eventId:`social-out-${id}`});return{ok:true,id,...request};
  }catch(error){listenerError('envio de solicitação social')(error);const message=String(error?.message||error||'');return{ok:false,error:/permission|denied/i.test(message)?'Este convite já está pendente ou foi enviado há poucos segundos':message}}
}
async function respondSocialRequest(requestId,decision){
  if(!connected||!requestId)return{ok:false,error:'Solicitação inválida'};const ref=api.ref(db,`${ROOT}/users/${user.uid}/socialRequests/${requestId}`);
  try{
    const snap=await api.get(ref),request=snap.val();if(!request)return{ok:false,error:'Convite não encontrado'};if(request.toUid!==user.uid)return{ok:false,error:'Convite não pertence a este jogador'};if(isBlocked(request.fromUid))return{ok:false,error:'Jogador bloqueado'};if(request.status!=='pending')return{ok:false,error:'Este convite já foi respondido'};
    const now=Date.now(),sender=presenceCache[request.fromUid],sameRoom=sender&&String(sender.room||currentRoom())===String(request.room||currentRoom()),distance=sender?Math.hypot(Number(sender.x||0)-Number(lastPresence?.x||0),Number(sender.z||0)-Number(lastPresence?.z||0)):Infinity;
    let status=decision==='accepted'?'accepted':'declined',reason='';
    if(now>Number(request.expiresAt||0)){status='expired';reason='O convite expirou.'}
    else if(status==='accepted'&&!sender){status='cancelled';reason='O jogador saiu.'}
    else if(status==='accepted'&&!sameRoom){status='cancelled';reason='O jogador mudou de sala.'}
    else if(status==='accepted'&&socialDistanceRequired(request.actionType)&&distance>7){status='cancelled';reason='Os jogadores estão longe demais.'}
    else if(status==='accepted'&&request.actionType==='boatPassenger'&&(!sender.boating||sender.boatRole!=='driver'||sender.boatId!==request.extra?.boatId)){status='cancelled';reason='O barco não está mais disponível.'}
    else if(status==='accepted'&&request.actionType==='boatPassenger'&&(sender.boatPassengerUid||sender.boatPassengerBotId)){status='cancelled';reason='O barco já tem um passageiro.'}
    else if(status==='accepted'&&request.actionType==='boatPassenger'&&(lastPresence?.boating||lastPresence?.vehicle||lastPresence?.transitMode)){status='cancelled';reason='Você já está em outro transporte.'}
    else if(status==='accepted'&&request.actionType==='vehiclePassenger'&&(!sender.vehicle||sender.vehicleRole!=='driver'||sender.vehicleId!==request.extra?.vehicleId)){status='cancelled';reason='O carro não está mais disponível.'}
    else if(status==='accepted'&&request.actionType==='vehiclePassenger'&&(sender.vehiclePassengerUid||sender.vehiclePassengerBotId)){status='cancelled';reason='O carro já tem um passageiro.'}
    else if(status==='accepted'&&request.actionType==='vehiclePassenger'&&(lastPresence?.vehicle||lastPresence?.boating||lastPresence?.transitMode)){status='cancelled';reason='Você já está em outro transporte.'}
    await api.update(ref,{status,respondedAt:api.serverTimestamp(),respondedAtClient:now});requestCache[requestId]={...request,status,respondedAtClient:now};recordActivity('social',`${request.actionType}-${status}`,{direction:'performed',peerUid:request.fromUid,eventId:`social-response-${requestId}-${status}`});sendInteraction(request.fromUid,{type:'socialRequestResult',requestId,actionType:request.actionType,status}).catch(()=>false);
    return{ok:status==='accepted',status,reason,id:requestId,...request};
  }catch(error){listenerError('resposta social')(error);return{ok:false,error:error?.message||String(error)}}
}
async function completeSocialRequest(requestId){if(!connected||!requestId)return false;const ref=api.ref(db,`${ROOT}/users/${user.uid}/socialRequests/${requestId}`);try{const snap=await api.get(ref),v=snap.val();if(!v||v.toUid!==user.uid)return false;await api.update(ref,{status:'completed',completedAt:api.serverTimestamp(),respondedAtClient:Date.now()});setTimeout(()=>api.remove(ref).catch(()=>{}),1200);return true}catch{return false}}
async function cancelSocialRequest(targetUid,requestId){
  if(!connected||!user||!targetUid||!requestId)return{ok:false,error:'Convite indisponível.'};
  try{await api.update(api.ref(db,`${ROOT}/users/${targetUid}/socialRequests/${requestId}`),{status:'cancelled',respondedAt:api.serverTimestamp(),respondedAtClient:Date.now()});return{ok:true}}catch(error){return{ok:false,error:error?.message||String(error)}}
}
async function expireSocialRequests(){
  if(!connected||!refs.socialRequests)return false;const now=Date.now();
  for(const[id,v]of Object.entries(requestCache)){
    if(v.status==='pending'){
      const sender=presenceCache[v.fromUid],oldEnough=Number(v.createdAtClient||0)<now-5000;let status='',reason='';
      if(Number(v.expiresAt||0)<now){status='expired';reason='O convite expirou.'}
      else if(oldEnough&&(!sender||String(sender.room||currentRoom())!==String(v.room||currentRoom()))){status='cancelled';reason='O jogador saiu ou mudou de sala.'}
      if(status){v.status=status;v.respondedAtClient=now;const ref=api.ref(db,`${ROOT}/users/${user.uid}/socialRequests/${id}`);await api.update(ref,{status,respondedAt:api.serverTimestamp(),respondedAtClient:now}).catch(()=>{});await sendInteraction(v.fromUid,{type:'socialRequestResult',requestId:id,actionType:v.actionType,status}).catch(()=>{});}
    }else if(Number(v.respondedAtClient||v.expiresAt||0)<now-120000){await api.remove(api.ref(db,`${ROOT}/users/${user.uid}/socialRequests/${id}`)).catch(()=>{});}
  }
  return true;
}
async function claimBoat(boatId='lake-boat'){
  boatId=String(boatId||'lake-boat').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,40)||'lake-boat';
  if(!connected||!user||!api)return{ok:true,offline:true,boatId};
  const ref=api.ref(db,`${ROOT}/${WORLD}/boats/${boatId}`),nowClient=Date.now();
  try{
    const result=await api.runTransaction(ref,current=>{
      const stale=!current||current.driverUid===user.uid||Number(current.updatedAtClient||0)<nowClient-20000;
      if(!stale)return;
      return{boatId,driverUid:user.uid,driverName:ownName(),room:currentRoom(),claimedAt:current?.driverUid===user.uid?(current.claimedAt||api.serverTimestamp()):api.serverTimestamp(),updatedAt:api.serverTimestamp(),updatedAtClient:nowClient};
    },{applyLocally:false});
    if(!result.committed)return{ok:false,error:`O barco já está sendo usado por ${String(result.snapshot?.val()?.driverName||'outro jogador').slice(0,24)}.`};
    activeBoatLock=boatId;boatTouchAt=performance.now();await api.onDisconnect(ref).remove().catch(()=>{});boatCache[boatId]=result.snapshot.val()||{};return{ok:true,boatId,lock:boatCache[boatId]};
  }catch(error){listenerError('reserva do barco')(error);return{ok:false,error:error?.message||'Não foi possível reservar o barco'}}
}
async function releaseBoat(boatId=activeBoatLock||'lake-boat'){
  boatId=String(boatId||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,40);if(!boatId)return false;
  if(!connected||!user||!api){if(activeBoatLock===boatId)activeBoatLock='';return true;}
  const ref=api.ref(db,`${ROOT}/${WORLD}/boats/${boatId}`);
  try{const result=await api.runTransaction(ref,current=>current?.driverUid===user.uid?null:undefined,{applyLocally:false});if(activeBoatLock===boatId)activeBoatLock='';delete boatCache[boatId];return!!result.committed}catch{return false}
}
async function sendGameChallenge(targetUid,gameType='math',level=1,targetName='Jogador'){
  if(!connected||!targetUid||targetUid===user.uid||isBlocked(targetUid))return{ok:false,error:'Jogador indisponível'};
  const allowed=['math','portuguese','english'];if(!allowed.includes(gameType))gameType='math';
  const challengeRef=api.push(api.ref(db,`${ROOT}/users/${targetUid}/challenges`)),id=challengeRef.key,seed=(Date.now()+Math.floor(Math.random()*999999))%2147483647;
  level=Math.max(1,Math.min(6,Number(level)||1));const toName=sanitizePublicName(targetName),challenge={fromUid:user.uid,fromName:ownName(),toUid:targetUid,toName,type:gameType,level,seed,rounds:5,status:'pending',createdAt:api.serverTimestamp()};
  const session={fromUid:user.uid,fromName:ownName(),toUid:targetUid,toName,type:gameType,level,seed,rounds:5,status:'pending',createdAt:api.serverTimestamp(),players:{[user.uid]:{name:ownName(),score:0,total:5,finished:false,updatedAt:api.serverTimestamp()}}};
  try{const updates={};updates[`${ROOT}/users/${targetUid}/challenges/${id}`]=challenge;updates[`${ROOT}/${WORLD}/gameSessions/${id}`]=session;await api.update(api.ref(db),updates);recordActivity('challenge',gameType,{direction:'sent',peerUid:targetUid,eventId:`challenge-out-${id}`});return{ok:true,id,...challenge}}catch(error){listenerError('desafio')(error);return{ok:false,error:error?.message||String(error)}}
}
async function respondGameChallenge(challengeId,accepted){
  if(!connected||!challengeId)return{ok:false,error:'Convite indisponível'};const chRef=api.ref(db,`${ROOT}/users/${user.uid}/challenges/${challengeId}`),snap=await api.get(chRef),challenge=snap.val();if(!challenge)return{ok:false,error:'Convite não encontrado'};if(isBlocked(challenge.fromUid))return{ok:false,error:'Jogador bloqueado'};
  const status=accepted?'active':'declined',sessionRef=api.ref(db,`${ROOT}/${WORLD}/gameSessions/${challengeId}`),updates={};updates[`${ROOT}/users/${user.uid}/challenges/${challengeId}/status`]=accepted?'accepted':'declined';updates[`${ROOT}/users/${user.uid}/challenges/${challengeId}/respondedAt`]=api.serverTimestamp();updates[`${ROOT}/${WORLD}/gameSessions/${challengeId}/status`]=status;if(accepted)updates[`${ROOT}/${WORLD}/gameSessions/${challengeId}/players/${user.uid}`]={name:ownName(),score:0,total:5,finished:false,updatedAt:api.serverTimestamp()};
  try{await api.update(api.ref(db),updates);recordActivity('challenge',accepted?'accepted':'declined',{direction:'performed',peerUid:challenge.fromUid,eventId:`challenge-response-${challengeId}-${status}`});await sendInteraction(challenge.fromUid,{type:accepted?'challengeAccepted':'challengeDeclined',challengeId,gameType:challenge.type});const sessionSnap=await api.get(sessionRef),session={id:challengeId,...(sessionSnap.val()||{})};sessionCache[challengeId]=session;dispatch('otthos:game-session',session);return{ok:true,id:challengeId,...challenge,status,session}}catch(error){listenerError('resposta ao desafio')(error);return{ok:false,error:error?.message||String(error)}}
}
async function finalizeGameSession(sessionId){
  if(!connected||!sessionId)return{ok:false};const ref=api.ref(db,`${ROOT}/${WORLD}/gameSessions/${sessionId}`);
  try{
    const snapshot=await api.get(ref),current=snapshot.val();if(!current||(current.fromUid!==user.uid&&current.toUid!==user.uid))return{ok:false};const entries=Object.entries(current.players||{}).filter(([uid])=>uid===current.fromUid||uid===current.toUid);if(entries.length!==2||!entries.every(([,p])=>p?.finished))return{ok:false,pending:true};const sorted=entries.sort((a,b)=>Number(b[1].score||0)-Number(a[1].score||0)||Number(a[1].elapsed||0)-Number(b[1].elapsed||0)),a=sorted[0],b=sorted[1],draw=Number(a[1].score||0)===Number(b[1].score||0)&&Number(a[1].elapsed||0)===Number(b[1].elapsed||0),result={finalized:true,draw,winnerUid:draw?'':a[0],winnerName:draw?'Empate':String(a[1].name||'Jogador').slice(0,24),loserUid:draw?'':b[0],loserName:draw?'':String(b[1].name||'Jogador').slice(0,24),winnerScore:Number(a[1].score||0),loserScore:Number(b[1].score||0),winnerElapsed:Number(a[1].elapsed||0),loserElapsed:Number(b[1].elapsed||0),type:current.type,completedAt:api.serverTimestamp()},resultRef=api.child(ref,'result');
    const tx=await api.runTransaction(resultRef,existing=>existing?.finalized?undefined:result,{applyLocally:false});if(!tx.committed&&!tx.snapshot.val()?.finalized)return{ok:false};await api.update(ref,{status:'completed',completedAt:api.serverTimestamp()});const value=(await api.get(ref)).val();if(value){sessionCache[sessionId]=value;dispatch('otthos:game-session',{id:sessionId,...value})}return{ok:true,session:value};
  }catch(error){listenerError('finalização da partida')(error);return{ok:false,error:error?.message||String(error)}}
}
async function submitGameResult(sessionId,result){
  if(!connected||!sessionId)return false;const path=`${ROOT}/${WORLD}/gameSessions/${sessionId}/players/${user.uid}`;try{await api.update(api.ref(db,path),{name:ownName(),score:Number(result.score||0),total:Number(result.total||5),elapsed:Number(result.elapsed||0),finished:true,updatedAt:api.serverTimestamp()});await finalizeGameSession(sessionId);return true}catch(error){listenerError('resultado')(error);return false}
}
async function getGameSession(sessionId){if(!db||!api||!sessionId)return null;try{const s=await api.get(api.ref(db,`${ROOT}/${WORLD}/gameSessions/${sessionId}`));return s.exists()?{id:sessionId,...(s.val()||{})}:null}catch{return null}}
async function closeGameSession(sessionId){const result=await finalizeGameSession(sessionId);return!!result?.ok}

function sanitizePublicItems(items,kind){const out={};for(const item of Array.isArray(items)?items:[]){if(!item?.id)continue;const id=String(item.id).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,80);if(!id)continue;if(kind==='campfire')out[id]={id,ownerUid:user.uid,ownerName:ownName(),x:Number(item.x||0),z:Number(item.z||0),createdAt:Number(item.createdAt||Date.now()),expiresAt:Number(item.expiresAt||Date.now()),cooking:item.cooking?{id:String(item.cooking.id||'').slice(0,80),endsAt:Number(item.cooking.endsAt||0)}:null,updatedAt:api.serverTimestamp()};else out[id]={id,ownerUid:user.uid,ownerName:ownName(),houseId:String(item.houseId||'home').slice(0,40),type:String(item.type||'storage').slice(0,24),x:Number(item.x||0),z:Number(item.z||0),rotation:Number(item.rotation||0),createdAt:Number(item.createdAt||Date.now()),updatedAt:api.serverTimestamp()};}return out}
async function syncCampfires(items){if(!connected||!user)return false;try{await api.set(api.ref(db,`${ROOT}/${WORLD}/campfires/${user.uid}`),sanitizePublicItems(items,'campfire'));return true}catch(error){listenerError('sincronização de fogueiras')(error);return false}}
async function syncHouseExtensions(items){if(!connected||!user)return false;try{await api.set(api.ref(db,`${ROOT}/${WORLD}/houseExtensions/${user.uid}`),sanitizePublicItems(items,'extension'));return true}catch(error){listenerError('sincronização de ampliações')(error);return false}}
async function claimHouse(houseId,data={}){if(!connected)return{ok:false};houseId=String(houseId||'');if(!['home','blue','pink','cabin'].includes(houseId))return{ok:false};const ref=api.ref(db,`${ROOT}/${WORLD}/houses/${houseId}`);const result=await api.runTransaction(ref,current=>{if(current?.ownerUid&&current.ownerUid!==user.uid)return;return canonicalHouseRecord(houseId,current,{x:data.x,z:data.z,locked:false})});const value=result.snapshot.val();return{ok:result.committed&&value?.ownerUid===user.uid,ownerName:value?.ownerUid?neutralPublicName(value.ownerUid):''}}
async function setHouseLock(houseId,locked){houseId=String(houseId||'');const current=housesCache[houseId];if(!connected||!['home','blue','pink','cabin'].includes(houseId)||!current||current.ownerUid!==user.uid)return false;const ref=api.ref(db,`${ROOT}/${WORLD}/houses/${houseId}`);const result=await api.runTransaction(ref,value=>value?.ownerUid===user.uid?canonicalHouseRecord(houseId,value,{locked}):undefined,{applyLocally:false});if(result.committed)housesCache[houseId]=result.snapshot.val()||{};return!!(result.committed&&result.snapshot.val()?.ownerUid===user.uid)}
function setDisplayName(){lastPresence={...(lastPresence||{}),name:neutralPublicName(user?.uid)};if(connected){api.update(refs.profile,{name:lastPresence.name,updatedAt:api.serverTimestamp()});publish(lastPresence,true)}return true}
const COOP_MISSION_TYPES=Object.freeze(['firefighter','paramedic','police','fishing','school','streetRace','ovalRace']);
const COOP_ROLES=Object.freeze(['driver','hose','rescuer','medic','stretcher','officer','fisher','cook','guide','teacher','runner','helper']);
function coopPublicRecord(value={}){const participants={};for(const[uid,item]of Object.entries(value.participants||{})){if(item&&typeof item==='object')participants[uid]={uid,name:neutralPublicName(uid),role:String(item.role||'helper').slice(0,20),ready:item.ready===true,joinedAtClient:Number(item.joinedAtClient||0),updatedAtClient:Number(item.updatedAtClient||0)}}return{...value,participants}}
async function armCoopParticipantDisconnect(participantRef){
  try{await api.onDisconnect(participantRef).update({ready:false,updatedAtClient:api.serverTimestamp()});return true}catch{return false}
}
async function createCoopMission(type,options={}){
  if(!connected||!refs.coopMissions||!user)return{ok:false,error:'Entre no modo online para criar uma equipe.'};
  type=String(type||'');if(!COOP_MISSION_TYPES.includes(type))return{ok:false,error:'Tipo de missão cooperativa inválido.'};
  const now=Date.now(),missionRef=api.push(refs.coopMissions),id=missionRef.key,maxPlayers=Math.max(1,Math.min(3,Number(options.maxPlayers||3))),role=COOP_ROLES.includes(options.role)?options.role:'helper';
  const mode=options.mode==='solo'?'solo':options.mode==='competitive'?'competitive':'coop';
  const record={id,type,title:String(options.title||type).slice(0,60),icon:String(options.icon||'🤝').slice(0,8),hostUid:user.uid,room:currentRoom(),status:'lobby',mode,minPlayers:Math.max(1,Math.min(maxPlayers,Number(options.minPlayers||1))),maxPlayers,createdAt:api.serverTimestamp(),createdAtClient:now,updatedAt:api.serverTimestamp(),updatedAtClient:now,participants:{[user.uid]:{uid:user.uid,name:ownName(),role,ready:mode==='solo',joinedAt:api.serverTimestamp(),joinedAtClient:now,updatedAtClient:now}},progress:{phase:0,counter:0,target:Number(options.target||1),events:{},updatedAt:api.serverTimestamp(),updatedAtClient:now}};
  try{await api.set(missionRef,record);const participantRef=api.ref(db,`${ROOT}/${WORLD}/coopMissions/${id}/participants/${user.uid}`);await armCoopParticipantDisconnect(participantRef);coopMissionCache[id]=coopPublicRecord(record);dispatch('otthi:coop-missions',{missions:{...coopMissionCache}});recordActivity('coop',`create-${type}`,{direction:'performed',eventId:`coop-create-${id}`});return{ok:true,id,mission:coopMissionCache[id]}}catch(error){listenerError('criação de missão cooperativa')(error);return{ok:false,error:error?.message||String(error)}}
}
async function joinCoopMission(missionId,role='helper'){
  if(!connected||!user||!missionId)return{ok:false,error:'Missão indisponível.'};role=COOP_ROLES.includes(role)?role:'helper';const ref=api.ref(db,`${ROOT}/${WORLD}/coopMissions/${missionId}`),now=Date.now();
  try{const tx=await api.runTransaction(ref,current=>{if(!current||current.status!=='lobby'||current.room!==currentRoom())return;const participants=current.participants&&typeof current.participants==='object'?{...current.participants}:{};const existing=participants[user.uid],count=Object.keys(participants).filter(uid=>participants[uid]).length;if(!existing&&count>=Math.max(1,Math.min(3,Number(current.maxPlayers||3))))return;participants[user.uid]={uid:user.uid,name:ownName(),role,ready:existing?.ready===true,joinedAt:existing?.joinedAt||api.serverTimestamp(),joinedAtClient:Number(existing?.joinedAtClient||now),updatedAtClient:now};return{...current,participants,updatedAt:api.serverTimestamp(),updatedAtClient:now}},{applyLocally:false});if(!tx.committed)return{ok:false,error:'A equipe já começou ou está completa.'};const participantRef=api.ref(db,`${ROOT}/${WORLD}/coopMissions/${missionId}/participants/${user.uid}`);await armCoopParticipantDisconnect(participantRef);const mission={id:missionId,...tx.snapshot.val()};coopMissionCache[missionId]=coopPublicRecord(mission);recordActivity('coop',`join-${mission.type||'mission'}`,{direction:'performed',peerUid:mission.hostUid,eventId:`coop-join-${missionId}`});return{ok:true,id:missionId,mission:coopMissionCache[missionId]}}catch(error){return{ok:false,error:error?.message||String(error)}}
}
async function updateCoopParticipant(missionId,patch={}){if(!connected||!user||!missionId)return{ok:false,error:'Equipe indisponível.'};const safe={};if(COOP_ROLES.includes(patch.role))safe.role=patch.role;if(typeof patch.ready==='boolean')safe.ready=patch.ready;safe.updatedAtClient=Date.now();try{await api.update(api.ref(db,`${ROOT}/${WORLD}/coopMissions/${missionId}/participants/${user.uid}`),safe);return{ok:true}}catch(error){return{ok:false,error:error?.message||String(error)}}}
async function setCoopMissionStatus(missionId,status,options={}){if(!connected||!user||!missionId)return{ok:false,error:'Equipe indisponível.'};if(!['lobby','active','completed','cancelled'].includes(status))return{ok:false,error:'Estado inválido.'};try{const mission=coopMissionCache[missionId];if(!mission||mission.hostUid!==user.uid)return{ok:false,error:'Somente quem criou a equipe pode iniciar ou encerrar.'};const mode=['solo','coop','competitive'].includes(options.mode)?options.mode:mission.mode;await api.update(api.ref(db,`${ROOT}/${WORLD}/coopMissions/${missionId}`),{status,mode,startedAt:status==='active'?api.serverTimestamp():mission.startedAt||null,completedAt:status==='completed'?api.serverTimestamp():mission.completedAt||null,updatedAt:api.serverTimestamp(),updatedAtClient:Date.now()});recordActivity('coop',status,{direction:'performed',eventId:`coop-status-${missionId}-${status}`});return{ok:true,mode}}catch(error){return{ok:false,error:error?.message||String(error)}}}
async function updateCoopMissionProgress(missionId,patch={}){
  if(!connected||!user||!missionId)return{ok:false,error:'Missão cooperativa indisponível.'};
  const ref=api.ref(db,`${ROOT}/${WORLD}/coopMissions/${missionId}/progress`),now=Date.now();
  try{
    const tx=await api.runTransaction(ref,current=>{
      const mission=coopMissionCache[missionId];if(!mission?.participants?.[user.uid]||mission.status!=='active')return;
      const id=patch.eventId?String(patch.eventId).replace(/[^A-Za-z0-9_-]/g,'').slice(0,80):'';
      const existing=id?current?.events?.[id]:null;
      if(existing&&(patch.reserveEvent||existing.uid===user.uid))return current;
      if(existing)return;
      const next={...(current||{}),updatedAt:api.serverTimestamp(),updatedAtClient:now};
      if(Number.isFinite(Number(patch.phase)))next.phase=Math.max(Number(current?.phase||0),Math.min(12,Number(patch.phase)));
      if(Number.isFinite(Number(patch.counterSet)))next.counter=Math.max(0,Math.min(999,Number(patch.counterSet)));
      else if(Number.isFinite(Number(patch.counterDelta)))next.counter=Math.max(0,Number(current?.counter||0)+Math.max(0,Math.min(20,Number(patch.counterDelta))));
      if(Number.isFinite(Number(patch.target)))next.target=Math.max(1,Math.min(99,Number(patch.target)));
      if(id){next.events={...(current?.events||{})};next.events[id]={uid:user.uid,role:String(mission.participants[user.uid]?.role||'helper'),kind:String(patch.kind||'action').slice(0,24),value:Math.max(0,Math.min(99,Number(patch.value??1))),createdAt:api.serverTimestamp(),createdAtClient:now}}
      return next;
    },{applyLocally:false});
    const progress=tx.snapshot?.val()||null,eventId=patch.eventId?String(patch.eventId).replace(/[^A-Za-z0-9_-]/g,'').slice(0,80):'';
    return{ok:!!tx.committed,progress,eventOwner:eventId?String(progress?.events?.[eventId]?.uid||''):''};
  }catch(error){return{ok:false,error:error?.message||String(error)}}
}
async function leaveCoopMission(missionId){if(!connected||!user||!missionId)return false;try{await api.remove(api.ref(db,`${ROOT}/${WORLD}/coopMissions/${missionId}/participants/${user.uid}`));recordActivity('coop','leave',{direction:'performed',eventId:`coop-leave-${missionId}`});return true}catch{return false}}
function getCoopMissions(){return Object.fromEntries(Object.entries(coopMissionCache).map(([id,value])=>[id,coopPublicRecord(value)]))}
async function setRoom(room){
  const next=sanitizeRoom(room),previous=ROOM_ID,name=ownName();if(next===ROOM_ID){dispatch('otthi:room-changed',{room:ROOM_ID,previousRoom:ROOM_ID,connected});return{ok:true,room:ROOM_ID,count:Number(roomCountsCache[ROOM_ID]||0),capacity:roomCapacity(ROOM_ID)}}
  let reservation=null;
  try{
    reservation=await reserveRoomSlot(next,name);if(!reservation.ok)return reservation;
    dispatch('otthi:room-changing',{room:next,previousRoom:previous});await disconnect();ROOM_ID=next;WORLD=`rooms/${ROOM_ID}`;const cfg=getConfig();if(cfg?.apiKey)localStorage.setItem(CONFIG_KEY,JSON.stringify({...cfg,enabled:true,room:ROOM_ID}));
    const ok=await connect({name,room:ROOM_ID,slotReservation:reservation});if(!ok)throw new Error('Não foi possível conectar ao novo bairro.');
    dispatch('otthi:room-changed',{room:ROOM_ID,previousRoom:previous,connected:true,count:reservation.count,capacity:reservation.capacity});return{ok:true,room:ROOM_ID,count:reservation.count,capacity:reservation.capacity};
  }catch(error){
    if(reservation?.slotRef&&api)await rollbackRoomSlot(reservation);ROOM_ID=previous;WORLD=`rooms/${ROOM_ID}`;await connect({name,room:ROOM_ID}).catch(()=>false);dispatch('otthi:room-changed',{room:ROOM_ID,previousRoom:next,connected});return{ok:false,room:ROOM_ID,error:error?.message||String(error)};
  }
}
async function syncLearning(payload={}){if(!connected||!user||!refs.learning)return false;try{const clean={schema:1,subjects:payload.subjects||{},streak:Number(payload.streak||0),totalAnswered:Number(payload.totalAnswered||0),updatedAt:api.serverTimestamp(),updatedAtClient:Date.now()};await api.set(refs.learning,clean);return true}catch(error){listenerError('aprendizado')(error);return false}}
async function loadLearning(){if(!db||!api||!user)return null;try{const snap=await api.get(api.ref(db,`${ROOT}/users/${user.uid}/learning`));return snap.exists()?snap.val():null}catch(error){listenerError('leitura do aprendizado')(error);return null}}
async function disconnect(){stopPresenceSweep();connectionRepairing=null;const reservation=refs.slot?{slotRef:refs.slot,uid:user?.uid}:null;if(activeBoatLock)await releaseBoat(activeBoatLock).catch(()=>{});for(const u of unsubs.splice(0)){try{u()}catch{}}for(const u of roomCountUnsubs.splice(0)){try{u()}catch{}}if(refs.presence&&api)await api.remove(refs.presence).catch(()=>{});if(reservation)await rollbackRoomSlot(reservation);connected=false;refs={};presenceCache={};housesCache={};challengeCache={};sessionCache={};requestCache={};campfireCache={};extensionCache={};boatCache={};coopMissionCache={};activeBoatLock='';dispatch('otthos:mp-status',status({mode:'offline',disabled:!multiplayerAllowed()}))}
window.OTTHOS_RTDB={configured:validConfig(getConfig()),uid:'',getConfig,configure,disable,connect,publish,syncProgress,loadGameAccount,saveGameAccount,accountStatus,createPlayerAccount,signInPlayerAccount,reauthenticateAccount,signOutPlayerAccount,normalizeUsername,sanitizePublicName,approvedPhrases:()=>APPROVED_CHAT_PHRASES.slice(),getGuardianSettings,saveGuardianSettings,blockPlayer,unblockPlayer,reportPlayer,isPlayerBlocked,getBlockedPlayers,recordActivity,getActivityAudit,sendChat,deleteOwnChatMessages,sendGift,sendInteraction,sendSocialRequest,respondSocialRequest,completeSocialRequest,cancelSocialRequest,expireSocialRequests,syncCampfires,syncHouseExtensions,claimBoat,releaseBoat,sendGameChallenge,respondGameChallenge,submitGameResult,finalizeGameSession,getGameSession,closeGameSession,claimHouse,setHouseLock,setDisplayName,createCoopMission,joinCoopMission,updateCoopParticipant,setCoopMissionStatus,updateCoopMissionProgress,leaveCoopMission,getCoopMissions,setRoom,getRoom:currentRoom,getRoomCounts:()=>({...roomCountsCache}),refreshRoomCounts,roomCapacity,syncLearning,loadLearning,disconnect,status,connected:()=>connected,getHouses:()=>({...housesCache}),getChallenges:()=>({...challengeCache}),getSessions:()=>({...sessionCache}),getSocialRequests:()=>({...requestCache}),getPresence:uid=>uid?(isBlocked(uid)?null:presenceCache[uid]||null):Object.fromEntries(Object.entries(presenceCache).filter(([id])=>!isBlocked(id))),getCampfires:()=>({...campfireCache}),getHouseExtensions:()=>({...extensionCache}),getBoats:()=>({...boatCache}),__testing:Object.freeze({fixedRoomSlotKeys,slotIsFresh,roomSlotCount,reserveSlotSnapshot,reserveSlotRecord})};dispatch('otthos:rtdb-ready',status());
