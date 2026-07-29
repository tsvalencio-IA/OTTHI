'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const RULES_PATH = path.join(ROOT, 'firebase-database.rules.json');
const AUTHENTICATED = 'auth != null';
const OWNER = 'auth != null && auth.uid === $uid';

function removeValidationRules(node) {
  if (!node || typeof node !== 'object') return;
  delete node['.validate'];
  for (const [key, value] of Object.entries(node)) {
    if (!key.startsWith('.')) removeValidationRules(value);
  }
}

function removeWriteRules(node) {
  if (!node || typeof node !== 'object') return;
  delete node['.write'];
  for (const [key, value] of Object.entries(node)) {
    if (!key.startsWith('.')) removeWriteRules(value);
  }
}

function openAuthenticatedRecord(branch, recordKey) {
  if (!branch || !branch[recordKey]) {
    throw new Error(`Ramo Firebase ausente: ${recordKey}`);
  }
  delete branch['.write'];
  removeWriteRules(branch[recordKey]);
  branch[recordKey]['.write'] = AUTHENTICATED;
  removeValidationRules(branch[recordKey]);
}

const document = JSON.parse(fs.readFileSync(RULES_PATH, 'utf8'));
const world = document.rules?.otthosWorld;
const users = world?.users?.['$uid'];
const rooms = world?.rooms?.['$roomId'];

if (!world || !users || !rooms) {
  throw new Error('Estrutura otthosWorld inválida.');
}

// Login, configurações parentais e dados privados continuam pertencendo ao dono.
for (const key of ['profile', 'progress', 'learning']) {
  users[key]['.read'] = OWNER;
  users[key]['.write'] = OWNER;
  removeValidationRules(users[key]);
}
users.guardianSettings['.read'] = OWNER;
users.guardianSettings['.validate'] = "!newData.exists() || (newData.hasChildren(['sessionLimitMinutes','updatedAt','updatedByUid']) && (newData.child('sessionLimitMinutes').val() === 0 || newData.child('sessionLimitMinutes').val() === 15 || newData.child('sessionLimitMinutes').val() === 30 || newData.child('sessionLimitMinutes').val() === 45 || newData.child('sessionLimitMinutes').val() === 60) && newData.child('updatedAt').isNumber() && newData.child('updatedAt').val() <= now && newData.child('updatedAt').val() >= now - 10000 && newData.child('updatedByUid').val() === $uid)";
users.blocks['.read'] = OWNER;
users.activityAudit['.read'] = OWNER;
removeValidationRules(users.activityAudit['$eventId']);
users.activityAudit['$eventId']['.write'] = OWNER;
removeValidationRules(users.blocks['$blockedUid']);
users.blocks['$blockedUid']['.write'] = `${OWNER} && $blockedUid !== auth.uid`;

// Ações entre jogadores: qualquer sessão Firebase autenticada pode gravar o evento.
// A caixa continua legível somente pelo destinatário.
for (const [branchName, recordKey] of [
  ['inbox', '$giftId'],
  ['interactions', '$eventId'],
  ['challenges', '$challengeId'],
  ['socialRequests', '$requestId']
]) {
  users[branchName]['.read'] = OWNER;
  openAuthenticatedRecord(users[branchName], recordKey);
}

// Denúncia é uma ação de jogo autenticada; dados de conta não são alterados aqui.
openAuthenticatedRecord(world.reports, '$reportId');

// Mundo compartilhado: sem bloqueios de regras depois da autenticação.
for (const [branchName, recordKey] of [
  ['presence', '$uid'],
  ['chat', '$messageId'],
  ['houses', '$houseId'],
  ['gameSessions', '$sessionId'],
  ['boats', '$boatId'],
  ['campfires', '$ownerUid'],
  ['houseExtensions', '$ownerUid'],
  ['slots', '$slotId'],
  ['coopMissions', '$missionId']
]) {
  const branch = rooms[branchName];
  branch['.read'] = AUTHENTICATED;
  openAuthenticatedRecord(branch, recordKey);
}

// A reserva usa uma transação por vaga. Não há escrita no nó pai de slots.
delete rooms.slots['.write'];

fs.writeFileSync(RULES_PATH, `${JSON.stringify(document, null, 2)}\n`, 'utf8');
console.log('Regras Firebase simplificadas: gameplay autenticado liberado; conta, progresso e limite de tempo preservados.');
