/**
 * OTTHI World Edu V643 — módulo-fonte
 * Arquivo: 00-runtime-foundation.js
 * Escopo: Runtime, utilitários, versão, storage e chaves de migração
 * Linhas de origem V642: 2-26
 *
 * Este arquivo é compilado em app.js por tools/build_project.py.
 * Não deve ser carregado diretamente por index.html.
 */
// @otthi-module-body
  'use strict';

  const OTTHI_GAME_LIVE_BASE = new URL('./', window.location.href).href;
  const OTTHI_GAME_WEB_BUILD = '643.1-responsive-fullscreen-controls';
  window.OTTHI_GAME_VERSION = 643;
  window.OTTHI_GAME_BUILD = OTTHI_GAME_WEB_BUILD;

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const approachNumber=(value,target,step)=>value<target?Math.min(target,value+Math.abs(step)):Math.max(target,value-Math.abs(step));
  const lerpAngle = (a, b, t) => { let d=((b-a+Math.PI)%(Math.PI*2))-Math.PI; if(d<-Math.PI)d+=Math.PI*2; return a+d*t; };
  const distance2D = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const safePointerCapture=(element,pointerId)=>{try{if(element?.setPointerCapture&&Number.isInteger(pointerId))element.setPointerCapture(pointerId);return true;}catch{return false;}};
  const safePointerRelease=(element,pointerId)=>{try{if(element?.hasPointerCapture?.(pointerId))element.releasePointerCapture(pointerId);return true;}catch{return false;}};
  const APP_VERSION = 643;
  const STORAGE_KEY = 'otthos_life_world_roleplay_v643';
  const LEGACY_STORAGE_KEYS = ['otthos_life_world_roleplay_v642','otthos_life_world_roleplay_v641','otthos_life_world_roleplay_v640','otthos_life_world_roleplay_v639','otthos_life_world_roleplay_v638','otthos_life_world_roleplay_v637','otthos_life_world_roleplay_v636','otthos_life_world_roleplay_v635','otthos_life_world_roleplay_v634','otthos_life_world_roleplay_v633','otthos_life_world_roleplay_v632','otthos_life_world_roleplay_v631','otthos_life_world_roleplay_v630','otthos_life_world_roleplay_v629','otthos_life_world_roleplay_v628','otthos_life_world_roleplay_v627','otthos_life_world_roleplay_v626','otthos_life_world_roleplay_v625','otthos_life_world_roleplay_v624','otthos_life_world_roleplay_v623','otthos_life_world_roleplay_v622','otthos_life_world_roleplay_v621','otthos_life_world_roleplay_v620','otthos_life_world_roleplay_v619','otthos_life_world_roleplay_v618','otthos_life_world_roleplay_v617','otthos_life_world_roleplay_v616','otthos_life_world_roleplay_v615','otthos_life_world_roleplay_v614','otthos_life_world_roleplay_v613','otthos_life_world_roleplay_v612','otthos_life_world_roleplay_v611','otthos_life_world_roleplay_v610','otthos_life_world_roleplay_v609','otthos_life_world_roleplay_v608','otthos_life_world_roleplay_v607','otthos_life_world_roleplay_v606','otthos_life_world_roleplay_v605','otthos_life_world_roleplay_v604','otthos_life_world_roleplay_v603','otthos_life_world_roleplay_v602','otthos_life_world_roleplay_v601','otthos_life_world_complete_v600'];
  const safeLocalGet = key => { try { return window.localStorage?.getItem(key) ?? null; } catch { return null; } };
  const safeLocalSet = (key, value) => { try { window.localStorage?.setItem(key, value); return true; } catch { return false; } };
  const safeLocalRemove = key => { try { window.localStorage?.removeItem(key); return true; } catch { return false; } };


  // V638: construções são entidades persistentes. Um save remoto antigo nunca pode apagar o save local.
