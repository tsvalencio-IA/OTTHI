#!/usr/bin/env python3
from pathlib import Path
import json,re,sys
ROOT=Path(__file__).resolve().parents[1]
checks=[]
def add(name,passed,detail=''):
    checks.append({'name':name,'passed':bool(passed),'detail':str(detail)})
def text(rel): return (ROOT/rel).read_text('utf-8')

cfg=text('assets/js/core/runtime-config.js')
manager=text('assets/js/multiplayer/room-manager.js')
rtdb=text('assets/js/multiplayer-rtdb.js')
world=text('src/modules/31-neighborhood-world-controller.js')
nav=text('src/modules/07-navigation-traffic-routes.js')
mapjs=text('src/modules/08-map-parent-settings.js')
css=text('src/styles/13-neighborhood-world-map-v644.css')
rules=json.loads(text('firebase-database.rules.json'))
manifest=json.loads(text('src/module-order.json'))

room_ids=['bairro-central','bairro-floresta','bairro-lago','bairro-montanha','bairro-escola']
for rid in room_ids:
    add(f'Bairro configurado {rid}',rid in cfg)
add('Cinco bairros únicos',sum(cfg.count(f"id:'{rid}'") for rid in room_ids)==5)
add('Capacidade 10 em todos',cfg.count('capacity:10')==5,cfg.count('capacity:10'))
add('Limite multiplayer 10','maxPlayersPerRoom: 10' in cfg)
add('Entradas físicas dos bairros',cfg.count('entry:{x:')==5,cfg.count('entry:{x:'))
add('Limites cartográficos dos bairros',cfg.count('bounds:{xMin:')==5,cfg.count('bounds:{xMin:'))
room_pattern=re.compile(r"\{ id:'([^']+)', name:'([^']+)', icon:'([^']+)', capacity:(\d+), entry:\{x:([-\d.]+),z:([-\d.]+),yaw:([-\d.]+)\}, bounds:\{xMin:([-\d.]+),xMax:([-\d.]+),zMin:([-\d.]+),zMax:([-\d.]+)\}")
room_records=[]
for match in room_pattern.finditer(cfg):
    rid,name,icon,capacity,ex,ez,yaw,xmin,xmax,zmin,zmax=match.groups()
    room_records.append({'id':rid,'name':name,'capacity':int(capacity),'entryX':float(ex),'entryZ':float(ez),'xMin':float(xmin),'xMax':float(xmax),'zMin':float(zmin),'zMax':float(zmax)})
add('Cinco geometrias de bairro interpretadas',len(room_records)==5,len(room_records))
for room in room_records:
    add(f"Entrada dentro dos limites {room['id']}",room['xMin']<=room['entryX']<=room['xMax'] and room['zMin']<=room['entryZ']<=room['zMax'],room)
    add(f"Limites dentro do mundo {room['id']}",all(-116<=room[key]<=116 for key in ['xMin','xMax','zMin','zMax']),room)
add('Mapa completo usa a mesma escala X/Z','(x+116)/232*100' in mapjs and '(116-z)/232*100' in mapjs)
add('Minimapa usa uma escala única X/Z','(x-player.x)*scale' in nav and '(z-player.z)*scale' in nav)

for token in ['reserveRoomSlot','watchRoomCounts','refreshRoomCounts','roomCapacity','otthi:room-changing','otthi:room-changed','onDisconnect(slotRef).remove','slots/${user.uid}']:
    add(f'RTDB {token}',token in rtdb)
add('Reserva antes de desconectar',rtdb.index('reserveRoomSlot(next,name)')<rtdb.index("dispatch('otthi:room-changing'"))
add('Rollback para bairro anterior','ROOM_ID=previous' in rtdb and "await connect({name,room:ROOM_ID})" in rtdb)
add('Contadores por sala','roomCountsCache' in rtdb and "dispatch('otthi:room-counts'" in rtdb)

for token in ['clearRemoteRoomEntities','resetMobilityForRoomChange','applyRoomWorld','focusCurrentRoom','roomHouseMarkers','mapHouseLocations','mapRegionsMarkup']:
    add(f'Controlador {token}',f'function {token}' in world)
add('Troca limpa mundo antes de conectar',"addEventListener('otthi:room-changing'" in world)
add('Transporte para entrada real','safePointNear(room.entry.x,room.entry.z' in world)
add('Estado salva bairro','state.multiplayer.room=room.id' in world)
add('Jogadores antigos removidos','world.ghosts.clear()' in world and 'remotePresence.clear()' in world)
add('Casas antigas removidas','cloudHouses.clear()' in world)

for token in ['miniMapLogicalSize','miniMapScale','OTTHI_ROOM_WORLD?.houseMarkers','room.bounds','room.accent']:
    add(f'Minimapa {token}',token in nav)
for token in ['currentMapLocations','mapRegionsMarkup','mapHouseLocations','mapLocations']:
    add(f'Mapa completo {token}',token in mapjs or token in world)
add('Mapa completo quadrado','aspect-ratio:1/1!important' in css)
add('Mapa retrato responsivo','@media(orientation:portrait)' in css and '42dvh' in css)
add('Mapa paisagem responsivo','@media(orientation:landscape)' in css)
add('Canvas minimapa acompanha caixa','.mini-nav canvas' in css and 'width:100%!important' in css)

slots=rules['rules']['otthosWorld']['rooms']['$roomId'].get('slots',{})
add('Regras possuem slots',bool(slots))
add('Regra limita 10',slots.get('.validate')=='!newData.exists() || newData.numChildren() <= 10',slots.get('.validate'))
add('Usuário escreve somente própria vaga',slots.get('$uid',{}).get('.write')=='auth != null && auth.uid === $uid')
add('Vaga valida bairro',"newData.child('room').val() === $roomId" in slots.get('$uid',{}).get('.validate',''))

add('UI mostra ocupação','${count}/${capacity}' in manager)
add('UI bloqueia lotado',"full||switching?'disabled'" in manager and 'Bairro lotado' in manager)
add('UI só seleciona após sucesso',manager.index('if(!result?.ok)')<manager.index('selected=room.id'))
add('Módulo 31 no manifesto',any(x.get('file')=='src/modules/31-neighborhood-world-controller.js' for x in manifest['javascript']))
add('CSS 13 no manifesto',any(x.get('file')=='src/styles/13-neighborhood-world-map-v644.css' for x in manifest['styles']))

report={'version':644,'passed':all(x['passed'] for x in checks),'counts':{'passed':sum(x['passed'] for x in checks),'failed':sum(not x['passed'] for x in checks),'total':len(checks)},'checks':checks}
(ROOT/'docs/RELATORIO-TESTE-BAIRROS-V644.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n','utf-8')
md=['# Relatório de teste — bairros V644','',f"- Resultado: **{'APROVADO' if report['passed'] else 'REPROVADO'}**",f"- Aprovados: **{report['counts']['passed']}**",f"- Falhas: **{report['counts']['failed']}**",'', '## Verificações','']+[f"- [{'x' if c['passed'] else ' '}] {c['name']}{' — '+c['detail'] if c['detail'] else ''}" for c in checks]
(ROOT/'docs/RELATORIO-TESTE-BAIRROS-V644.md').write_text('\n'.join(md)+'\n','utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
sys.exit(0 if report['passed'] else 1)
