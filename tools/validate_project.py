#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
from html.parser import HTMLParser
import hashlib,json,re,subprocess,sys
ROOT=Path(__file__).resolve().parents[1]; DOCS=ROOT/'docs'; errors=[]; checks=[]
def add(name,passed,detail=''):
    checks.append({'name':name,'passed':bool(passed),'detail':str(detail)})
    if not passed: errors.append(f'{name}: {detail}')
def run(cmd,name):
    r=subprocess.run(cmd,cwd=ROOT,capture_output=True,text=True); add(name,r.returncode==0,(r.stderr or r.stdout).strip()[:3000])
def parse_json(rel):
    try: json.loads((ROOT/rel).read_text('utf-8')); add(f'JSON {rel}',True)
    except Exception as e: add(f'JSON {rel}',False,e)
class Audit(HTMLParser):
    def __init__(self): super().__init__(); self.ids=[]; self.local=[]
    def handle_starttag(self,tag,attrs):
      d=dict(attrs)
      if d.get('id'): self.ids.append(d['id'])
      ref=d.get('src') if tag in {'script','img','source'} else d.get('href') if tag=='link' else None
      if ref:
        ref=ref.split('?',1)[0].split('#',1)[0]
        if ref.startswith('./'): self.local.append(ref[2:])
def css_braces(text):
    text=re.sub(r'/\*.*?\*/','',text,flags=re.S); text=re.sub(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'','',text); return text.count('{'),text.count('}')
def main():
    required=[
      'index.html','app.js','style.css','sw.js','manifest.webmanifest','firebase-config.js',
      'firebase-database.rules.json','athos.glb','VERSION.json','src/module-order.json',
      'tools/build_project.py','tools/verify_equivalence.py','tools/validate_project.py',
      'tools/test_v643_mobility.js','tools/test_v643_world_systems.py','tools/test_v644_neighborhoods.py',
      '.github/workflows/build-modular-app.yml','.github/workflows/gerar-apk.yml',
      'android-app/app/build.gradle','assets/textures/water-ripples-v643.png',
      'docs/CHECKLIST-ATUALIZACAO-V643.md','docs/RELATORIO-TESTE-BAIRROS-V644.md',
      'docs/RELATORIO-TESTE-BAIRROS-V644.json','src/modules/31-neighborhood-world-controller.js',
      'src/styles/13-neighborhood-world-map-v644.css'
    ]
    for rel in required:add(f'Arquivo obrigatório {rel}',(ROOT/rel).is_file())
    manifest=json.loads((ROOT/'src/module-order.json').read_text('utf-8')); js=sorted((ROOT/'src/modules').glob('*.js')); css=sorted((ROOT/'src/styles').glob('*.css'))
    add('32 módulos JavaScript',len(js)==32,len(js)); add('14 módulos CSS',len(css)==14,len(css)); add('Manifesto JS completo',len(manifest.get('javascript',[]))==32); add('Manifesto CSS completo',len(manifest.get('styles',[]))==14)
    add('Ordem JS corresponde aos arquivos',[Path(x['file']).name for x in manifest['javascript']]==[p.name for p in js]); add('Ordem CSS corresponde aos arquivos',[Path(x['file']).name for x in manifest['styles']]==[p.name for p in css])
    run(['node','--check','app.js'],'Sintaxe app.js'); run(['node','--check','sw.js'],'Sintaxe sw.js')
    run(['node','tools/test_v643_mobility.js'],'12 testes determinísticos de mobilidade V643')
    run(['python','tools/test_v643_world_systems.py'],'34 testes de mundo V643')
    run(['python','tools/test_v644_neighborhoods.py'],'Testes de bairros/mapa V644')
    for p in sorted((ROOT/'assets/js').rglob('*.js')): run(['node','--check',str(p.relative_to(ROOT))],f'Sintaxe {p.relative_to(ROOT)}')
    for rel in ['manifest.webmanifest','firebase-database.rules.json','VERSION.json','src/module-order.json']:parse_json(rel)
    index=(ROOT/'index.html').read_text('utf-8'); a=Audit();a.feed(index); dup=sorted({x for x in a.ids if a.ids.count(x)>1}); missing=sorted(x for x in a.local if not (ROOT/x).exists())
    add('IDs HTML únicos',not dup,dup);add('Referências locais existem',not missing,missing);add('Versão 645 no index',index.count('?v=645')>=10,index.count('?v=645'));add('GitHub Pages OTTHI',('OTTHI'+'-WORLD-EDU') not in index)
    op,cl=css_braces((ROOT/'style.css').read_text('utf-8'));add('Chaves CSS balanceadas',op==cl,f'{op}/{cl}')
    app=(ROOT/'app.js').read_text('utf-8'); funcs=re.findall(r'^  function\s+([A-Za-z_$][\w$]*)\s*\(',app,re.M)
    add('564 funções nomeadas',len(funcs)==564,len(funcs));add('Runtime V645',"window.OTTHI_GAME_VERSION = 645;" in app and "const APP_VERSION = 645;" in app);add('Save V645 e migração V644',"roleplay_v645'" in app and 'roleplay_v644' in app)
    for token in ['mobilityThrottleIntent','const steer=Math.abs(ix)<.06?0:-ix','const steer=Math.abs(ix)<.07?0:-ix','Acelerar','Freio','createShoreFishingLife','trafficPriority','busSpawnIndex','water-ripples-v643.png']:
      add(f'Token preservado {token}',token in app or token in (ROOT/'style.css').read_text('utf-8'))
    for token in ['miniMapLogicalSize','miniMapScale','currentMapLocations','clearRemoteRoomEntities','applyRoomWorld','mapRegionsMarkup','focusCurrentRoom']:
      add(f'Token V644 {token}',token in app)
    css_text=(ROOT/'style.css').read_text('utf-8')
    add('Viewport usa palco real','const stageW=Number(rect.width||0)' in app and 'stageW>2?stageW' in app)
    add('Viewport lógico sem DPR duplicado','renderer.domElement.width,renderer.domElement.height' not in app and 'const renderW=Math.max(1,perf.lastRenderW' in app)
    add('Canvas ocupa 100%','12-fullscreen-responsive-hotfix-v6431.css' in css_text and 'min-width:100%!important' in css_text)
    add('Zonas de paisagem separadas','right:calc(92px + var(--safe-right))!important' in css_text and 'top:calc(126px + var(--safe-top))!important' in css_text)
    add('Mapa principal escala 1:1','13-neighborhood-world-map-v644.css' in css_text and 'aspect-ratio:1/1!important' in css_text)
    add('Responsividade automática do mapa','@media(orientation:portrait)' in css_text and '@media(orientation:landscape)' in css_text)
    cfg=(ROOT/'assets/js/core/runtime-config.js').read_text('utf-8')
    add('Cinco bairros com 10 vagas',cfg.count('capacity:10')==5 and 'maxPlayersPerRoom: 10' in cfg,cfg.count('capacity:10'))
    rules=json.loads((ROOT/'firebase-database.rules.json').read_text('utf-8')); slots=rules['rules']['otthosWorld']['rooms']['$roomId'].get('slots',{})
    slot_rule=slots.get('$slotId',{}); rule_text=slot_rule.get('.write','')+' '+slot_rule.get('.validate',''); add('Regra Firebase limita 10 usuários',all(f"slot-{i:02d}" in rule_text for i in range(1,11)) and 'numChildren' not in json.dumps(rules),slot_rule.get('.validate'))
    sw=(ROOT/'sw.js').read_text('utf-8');add('Service Worker V645',"otthi-v645-1" in sw and "645.0-consolidated-neighborhood-world" in sw)
    gradle=(ROOT/'android-app/app/build.gradle').read_text('utf-8');add('Android V645',"versionCode 645" in gradle and "versionName '6.45'" in gradle)
    preservation=DOCS/'RELATORIO-PRESERVACAO-V642-V644.json'; data=json.loads(preservation.read_text('utf-8')) if preservation.exists() else {};add('Preservação V642/V644 aprovada',data.get('passed') is True)
    neighborhood=DOCS/'RELATORIO-TESTE-BAIRROS-V645.json'; ndata=json.loads(neighborhood.read_text('utf-8')) if neighborhood.exists() else {};add('Bairros/mapa V645 aprovados',ndata.get('passed') is True)
    report={'version':645,'passed':not errors,'checks':checks,'errors':errors,'counts':{'checks':len(checks),'passed':sum(x['passed'] for x in checks),'failed':sum(not x['passed'] for x in checks),'functions':len(funcs),'javascriptModules':len(js),'styleModules':len(css),'htmlIds':len(a.ids)},'hashes':{x:hashlib.sha256((ROOT/x).read_bytes()).hexdigest() for x in ['app.js','style.css','src/module-order.json']}}
    (DOCS/'VALIDACAO-ESTRUTURAL-V645.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n','utf-8')
    md=['# Validação estrutural automática — V645','',f"- Resultado: **{'APROVADO' if report['passed'] else 'REPROVADO'}**",f"- Verificações: **{report['counts']['passed']} aprovadas / {report['counts']['failed']} falhas**",'', '## Verificações','']+[f"- [{'x' if x['passed'] else ' '}] {x['name']}{' — '+x['detail'] if x['detail'] else ''}" for x in checks]+['','## Limites','', '- Não substitui teste físico de orientação instalada, multiplayer entre dois aparelhos, Firebase remoto, AR e APK.', '- Os testes V645 validam reserva de vaga, limpeza de bairro, transporte, mapa sem distorção e regras estruturais.']
    (DOCS/'VALIDACAO-ESTRUTURAL-V645.md').write_text('\n'.join(md)+'\n','utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2));return 0 if report['passed'] else 1
if __name__=='__main__':sys.exit(main())
