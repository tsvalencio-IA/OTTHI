(() => {
  'use strict';
  const repo = 'OTTHI';
  const baseUrl = new URL('./', location.href).href;
  const savedRoom = (() => { try { return localStorage.getItem('otthi_selected_room_v1') || ''; } catch { return ''; } })();
  window.OTTHI_CONFIG = {
    version: 644,
    build: '644.0-neighborhoods-capacity-map',
    repository: repo,
    baseUrl,
    firebaseRoot: 'otthosWorld',
    defaultRoom: savedRoom || 'bairro-central',
    rooms: [
      { id:'bairro-central', name:'Bairro Central', icon:'🏙️', capacity:10, entry:{x:0,z:8,yaw:0}, bounds:{xMin:-48,xMax:48,zMin:-22,zMax:38}, accent:'#55d8ff' },
      { id:'bairro-floresta', name:'Bairro da Floresta', icon:'🌲', capacity:10, entry:{x:-82,z:-35,yaw:0.8}, bounds:{xMin:-116,xMax:-48,zMin:-108,zMax:24}, accent:'#4fd173' },
      { id:'bairro-lago', name:'Bairro do Lago', icon:'🌊', capacity:10, entry:{x:-25,z:45,yaw:-0.5}, bounds:{xMin:-62,xMax:-8,zMin:28,zMax:82}, accent:'#48bfff' },
      { id:'bairro-montanha', name:'Bairro da Montanha', icon:'⛰️', capacity:10, entry:{x:82,z:62,yaw:-1.2}, bounds:{xMin:48,xMax:116,zMin:30,zMax:112}, accent:'#d3b074' },
      { id:'bairro-escola', name:'Bairro da Academia', icon:'🎓', capacity:10, entry:{x:18,z:-32,yaw:3.14}, bounds:{xMin:8,xMax:46,zMin:-62,zMax:-20}, accent:'#c884ff' }
    ],
    multiplayer: {
      publishIntervalMs: 250,
      heartbeatMs: 2200,
      maxPlayersPerRoom: 10,
      interpolationMs: 180
    },
    performance: {
      targetFps: 30,
      downgradeFps: 24,
      recoveryFps: 48,
      sampleIntervalMs: 3000
    },
    childSafety: {
      freeChatEnabled: false,
      approvedPhrasesOnly: false,
      hideRealNames: true
    }
  };
  window.dispatchEvent(new CustomEvent('otthi:config-ready', { detail: window.OTTHI_CONFIG }));
})();
