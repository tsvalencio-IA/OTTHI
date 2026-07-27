(() => {
  'use strict';
  const KEY='otthi_selected_room_v1';
  const rooms=window.OTTHI_CONFIG?.rooms||[];
  let selected=(()=>{try{return localStorage.getItem(KEY)||window.OTTHI_CONFIG?.defaultRoom||'bairro-central'}catch{return'bairro-central'}})();
  let counts={};
  let switching=false;

  function escapeText(value){return String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));}
  function roomInfo(id=selected){return rooms.find(room=>room.id===id)||rooms[0]||{id:'bairro-central',name:'Bairro Central',icon:'🏙️',capacity:10};}
  function roomCount(id){return Math.max(0,Number(counts[id]??window.OTTHOS_RTDB?.getRoomCounts?.()?.[id]??0));}
  function houses(){return Object.values(window.OTTHOS_RTDB?.getHouses?.()||{});}
  function isOpen(){return !document.getElementById('modal')?.hidden&&document.getElementById('modalTitle')?.textContent==='Bairros e casas online';}

  function roomButton(room){
    const count=roomCount(room.id),capacity=Number(room.capacity||10),full=count>=capacity&&room.id!==selected;
    return `<button type="button" data-room="${room.id}" class="room-choice ${room.id===selected?'selected':''} ${full?'full':''}" ${full||switching?'disabled':''} aria-label="${escapeText(room.name)}: ${count} de ${capacity} jogadores">
      <span class="room-icon">${room.icon}</span><b>${escapeText(room.name)}</b>
      <small><strong>${count}/${capacity}</strong> jogadores ${full?'• LOTADO':room.id===selected?'• VOCÊ ESTÁ AQUI':'• TOQUE PARA ENTRAR'}</small>
      <i><em style="width:${Math.min(100,count/capacity*100)}%"></em></i>
    </button>`;
  }

  function html(){
    const current=roomInfo(),currentCount=roomCount(current.id),houseList=houses();
    return `<section class="room-hub ${switching?'switching':''}">
      <div class="room-current"><span>${current.icon}</span><div><small>BAIRRO ATUAL</small><b>${escapeText(current.name)}</b><p>${currentCount}/${current.capacity||10} jogadores. Somente crianças, casas e atividades online deste bairro são carregadas.</p></div></div>
      ${switching?'<div class="room-switch-status"><span class="room-spinner"></span><b>Fazendo a troca com segurança…</b><small>Saindo do bairro atual, reservando vaga e reorganizando o mapa.</small></div>':''}
      <div class="room-grid">${rooms.map(roomButton).join('')}</div>
      <div class="room-explanation"><b>O que muda ao entrar?</b><span>Você aparece na entrada real do bairro, o minimapa destaca a nova região, jogadores antigos saem da tela e entram somente as casas e crianças da nova sala.</span></div>
      <h3>Casas deste bairro</h3>
      <div class="house-directory">${houseList.length?houseList.map(h=>`<div><span>🏠</span><b>${escapeText(h.name||`Casa de ${h.ownerName||'Jogador'}`)}</b><small>${escapeText(h.ownerName||'Morador')}</small></div>`).join(''):'<p>Nenhuma casa online registrada neste bairro ainda.</p>'}</div>
    </section>`;
  }

  function bindButtons(root){root.querySelectorAll('[data-room]').forEach(button=>button.addEventListener('click',()=>change(button.dataset.room)));}
  function open(){window.OTTHI_MODAL?.open('Bairros e casas online',html(),bindButtons);window.OTTHOS_RTDB?.refreshRoomCounts?.();}
  function renderIfOpen(){if(isOpen())open();}
  function availableRooms(exclude=''){return rooms.filter(room=>room.id!==exclude&&roomCount(room.id)<Number(room.capacity||10));}
  function fullMessage(room){const alternatives=availableRooms(room.id);return `<div class="room-full-message"><span>🚧</span><h3>${escapeText(room.name)} está lotado</h3><p>O limite é de ${room.capacity||10} jogadores para manter o mundo rápido e estável.</p>${alternatives.length?`<h4>Bairros com vaga</h4><div>${alternatives.map(r=>`<button type="button" data-room="${r.id}">${r.icon} ${escapeText(r.name)} <b>${roomCount(r.id)}/${r.capacity||10}</b></button>`).join('')}</div>`:'<p>Nenhum bairro possui vaga neste momento. Tente novamente em instantes.</p>'}</div>`;}

  async function change(id){
    if(switching)return;
    const room=roomInfo(id);if(!room?.id)return;
    if(room.id===selected){window.OTTHI_MODAL?.close?.();window.OTTHI_ROOM_WORLD?.focusCurrentRoom?.();return;}
    const capacity=Number(room.capacity||10),count=roomCount(room.id);
    if(count>=capacity){window.OTTHI_MODAL?.open('Bairro lotado',fullMessage(room),bindButtons);return;}
    const preflight=window.OTTHI_ROOM_WORLD?.canChangeRoom?.(room.id);
    if(preflight?.ok===false){window.OTTHI_MODAL?.open('Finalize a atividade atual',`<p>${escapeText(preflight.error||'Não é possível trocar de bairro agora.')}</p>`);return;}
    switching=true;open();
    const result=await window.OTTHOS_RTDB?.setRoom?.(room.id);
    switching=false;
    if(!result?.ok){
      if(result?.full){counts[room.id]=Number(result.count||capacity);window.OTTHI_MODAL?.open('Bairro lotado',fullMessage(room),bindButtons);}
      else window.OTTHI_MODAL?.open('Não foi possível trocar de bairro',`<p>${escapeText(result?.error||'Confira a internet e tente novamente.')}</p>`);
      return;
    }
    selected=room.id;try{localStorage.setItem(KEY,selected)}catch{};
    if(window.OTTHI_CONFIG)window.OTTHI_CONFIG.defaultRoom=selected;
    window.OTTHI_MODAL?.close?.();
  }

  function bind(){
    document.getElementById('neighborhoodBtn')?.addEventListener('click',open);
    document.getElementById('neighborhoodQuickBtn')?.addEventListener('click',open);
    addEventListener('otthos:houses',renderIfOpen);
    addEventListener('otthi:room-counts',event=>{counts={...(event.detail?.counts||{})};renderIfOpen();});
    addEventListener('otthi:room-changed',event=>{if(event.detail?.connected!==false&&event.detail?.room){selected=event.detail.room;try{localStorage.setItem(KEY,selected)}catch{};}renderIfOpen();});
  }
  document.addEventListener('DOMContentLoaded',bind,{once:true});
  window.OTTHI_ROOMS={open,change,current:()=>roomInfo(),houses,counts:()=>({...counts})};
})();
