(() => {
  'use strict';
  const repo = 'OTTHI';
  const baseUrl = new URL('./', location.href).href;
  const savedRoom = (() => { try { return localStorage.getItem('otthi_selected_room_v1') || ''; } catch { return ''; } })();
  window.OTTHI_CONFIG = {
    version: 643,
    build: '643.1-responsive-fullscreen-controls',
    repository: repo,
    baseUrl,
    firebaseRoot: 'otthosWorld',
    defaultRoom: savedRoom || 'bairro-central',
    rooms: [
      { id:'bairro-central', name:'Bairro Central', icon:'🏙️', capacity:20 },
      { id:'bairro-floresta', name:'Bairro da Floresta', icon:'🌲', capacity:20 },
      { id:'bairro-lago', name:'Bairro do Lago', icon:'🌊', capacity:20 },
      { id:'bairro-montanha', name:'Bairro da Montanha', icon:'⛰️', capacity:20 },
      { id:'bairro-escola', name:'Bairro da Academia', icon:'🎓', capacity:20 }
    ],
    multiplayer: {
      publishIntervalMs: 250,
      heartbeatMs: 2200,
      maxPlayersPerRoom: 20,
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
