(() => {
  'use strict';
  const KEY='otthi_selected_room_v1';
  const rooms=window.OTTHI_CONFIG?.rooms||[];
  let selected=(()=>{try{return localStorage.getItem(KEY)||window.OTTHI_CONFIG?.defaultRoom||'bairro-central'}catch{return'bairro-central'}})();
  function roomInfo(id=selected){return rooms.find(room=>room.id===id)||rooms[0]||{id:'bairro-central',name:'Bairro Central',icon:'🏙️'};}
  function houses(){return window.OTTHOS_RTDB?.getHouses?.()||{};}
  function html(){const current=roomInfo();const houseList=Object.values(houses());return `<section class="room-hub"><div class="room-current"><span>${current.icon}</span><div><small>BAIRRO ATUAL</small><b>${current.name}</b><p>Somente crianças e casas deste bairro são carregadas.</p></div></div><div class="room-grid">${rooms.map(room=>`<button type="button" data-room="${room.id}" class="${room.id===selected?'selected':''}"><span>${room.icon}</span><b>${room.name}</b><small>Até ${room.capacity||20} jogadores por sala</small></button>`).join('')}</div><h3>Casas deste bairro</h3><div class="house-directory">${houseList.length?houseList.map(h=>`<div><span>🏠</span><b>${escapeText(h.name||`Casa de ${h.ownerName||'Jogador'}`)}</b><small>${escapeText(h.ownerName||'Morador')}</small></div>`).join(''):'<p>Nenhuma casa online registrada neste bairro ainda.</p>'}</div></section>`;}
  function escapeText(value){return String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));}
  function open(){window.OTTHI_MODAL?.open('Bairros e casas online',html(),root=>root.querySelectorAll('[data-room]').forEach(button=>button.addEventListener('click',()=>change(button.dataset.room))));}
  async function change(id){const room=roomInfo(id);if(!room?.id)return;selected=room.id;try{localStorage.setItem(KEY,selected)}catch{};if(window.OTTHI_CONFIG)window.OTTHI_CONFIG.defaultRoom=selected;const result=await window.OTTHOS_RTDB?.setRoom?.(selected);if(result?.ok===false){window.OTTHI_MODAL?.open('Não foi possível trocar de bairro',`<p>${escapeText(result.error||'Confira a internet e tente novamente.')}</p>`);return;}open();}
  function bind(){document.getElementById('neighborhoodBtn')?.addEventListener('click',open);document.getElementById('neighborhoodQuickBtn')?.addEventListener('click',open);addEventListener('otthos:houses',()=>{if(!document.getElementById('modal')?.hidden&&document.getElementById('modalTitle')?.textContent==='Bairros e casas online')open();});}
  document.addEventListener('DOMContentLoaded',bind,{once:true});
  window.OTTHI_ROOMS={open,change,current:()=>roomInfo(),houses};
})();
