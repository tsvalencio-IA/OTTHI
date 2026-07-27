#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import hashlib,json,re,sys
ROOT=Path(__file__).resolve().parents[1]; DOCS=ROOT/'docs'; DOCS.mkdir(exist_ok=True)
BASELINE_PATH=DOCS/'BASELINE-V641-FUNCOES-E-ASSETS.json'

def sha(path:Path): return hashlib.sha256(path.read_bytes()).hexdigest() if path.exists() else None
def function_order(text:str): return re.findall(r'^  function\s+([A-Za-z_$][\w$]*)\s*\(',text,re.M)

def main():
    baseline=json.loads(BASELINE_PATH.read_text('utf-8'))
    app=(ROOT/'app.js').read_text('utf-8'); all_js='\n'.join(p.read_text('utf-8',errors='ignore') for p in ROOT.rglob('*.js'))
    expected=baseline['functionOrder']; current=function_order(app)
    missing=[x for x in expected if x not in current]
    positions=[current.index(x) for x in expected if x in current]
    order_preserved=not missing and positions==sorted(positions)
    added=[x for x in current if x not in expected]
    required_added=['trafficPriority','busSpawnIndex','createShoreFisher','createShoreFishingLife','updateShoreFishers','mobilityDriverActive','updateMobilityControlLabels','mobilityThrottleIntent']
    asset_results=[]
    for rel,expected_sha in baseline['preservedAssetHashes'].items():
        path=ROOT/rel; actual=sha(path)
        asset_results.append({'file':rel,'exists':path.exists(),'unchanged':actual==expected_sha,'expectedSha256':expected_sha,'actualSha256':actual})
    required_tokens={
      'roupas_e_avatar':['applyAvatarCustomization','openAvatarStudio','uniform'],
      'skills':['setScaleMode','toggleCrouch','spinPlayer'],
      'bombeiros':['createFireTruck','openFireStationDesk','activateFireIncident'],
      'policia':['createPoliceCar','startPoliceAlert','updatePoliceSystem'],
      'ambulancias':['createAmbulance','createTrafficIncident','resolveTrafficIncident'],
      'construcao':['beginBuildMode','placeBuild','reconcileWorldBuilds'],
      'pescaria':['startFishing','updateFishingVisual','restoreFishingCamera','createShoreFishingLife'],
      'transporte':['createBusModel','enterBus','openMetroStation','trafficPriority','busSpawnIndex'],
      'mobilidade_v643':['mobilityThrottleIntent','updateMobilityControlLabels','mobilityAccelerate','mobilityBrake'],
      'multiplayer':['remotePlayerEvent','openSocialHub','updateMultiplayer'],
      'educacao':['openEducationHub','runEducationGame','OTTHI_LEARNING'],
    }
    systems={k:{'required':v,'present':[t for t in v if t in all_js],'complete':all(t in all_js for t in v)} for k,v in required_tokens.items()}
    result={
      'baseline':'OTTHI World Edu V641 / fonte modular V642',
      'candidate':'OTTHI World Edu V643 precision mobility traffic fishing',
      'functionCountBaseline':len(expected),'functionCountActual':len(current),
      'baselineFunctionsPreserved':not missing,'baselineFunctionOrderPreserved':order_preserved,
      'missingFunctions':missing,'addedFunctions':added,
      'requiredV643FunctionsPresent':all(x in current for x in required_added),
      'requiredV643Functions':required_added,
      'preservedAssetsChecked':len(asset_results),
      'preservedAssetsUnchanged':sum(x['unchanged'] for x in asset_results),
      'preservedAssetFailures':[x for x in asset_results if not x['unchanged']],
      'requiredSystemTokens':systems,
    }
    result['passed']=all([result['baselineFunctionsPreserved'],result['baselineFunctionOrderPreserved'],result['requiredV643FunctionsPresent'],not result['preservedAssetFailures'],all(x['complete'] for x in systems.values())])
    (DOCS/'RELATORIO-PRESERVACAO-V642-V643.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n','utf-8')
    md=['# Relatório de preservação — V642 → V643','',f"- Resultado: **{'APROVADO' if result['passed'] else 'REPROVADO'}**",f"- Funções-base preservadas: **{len(expected)-len(missing)} / {len(expected)}**",f"- Funções atuais: **{len(current)}**",f"- Ordem das funções-base preservada: **{'sim' if order_preserved else 'não'}**",f"- Novas funções V643 esperadas: **{sum(x in current for x in required_added)} / {len(required_added)}**",f"- Assets imutáveis preservados: **{result['preservedAssetsUnchanged']} / {result['preservedAssetsChecked']}**",'', '## Sistemas obrigatórios','']
    for k,v in systems.items(): md.append(f"- [{'x' if v['complete'] else ' '}] `{k}` — {', '.join(v['present'])}")
    md += ['', '## Funções novas da V643','']+[f'- `{x}()`' for x in added]
    if missing: md += ['', '## Funções-base ausentes','']+[f'- `{x}()`' for x in missing]
    (DOCS/'RELATORIO-PRESERVACAO-V642-V643.md').write_text('\n'.join(md)+'\n','utf-8')
    print(json.dumps(result,ensure_ascii=False,indent=2)); return 0 if result['passed'] else 1
if __name__=='__main__': sys.exit(main())
