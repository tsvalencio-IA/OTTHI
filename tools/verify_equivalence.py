#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
DOCS.mkdir(exist_ok=True)
BASELINE_PATH = DOCS / 'BASELINE-V641-FUNCOES-E-ASSETS.json'


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def normalized_js(text: str) -> str:
    rows: list[str] = []
    for line in text.splitlines():
        if re.match(r'^\s*// ===== MODULE:', line) or not line.strip():
            continue
        line = re.sub(r"const OTTHI_GAME_WEB_BUILD = '[^']+';", "const OTTHI_GAME_WEB_BUILD = '<BUILD>';", line)
        line = re.sub(r'window\.OTTHI_GAME_VERSION = \d+;', 'window.OTTHI_GAME_VERSION = <VERSION>;', line)
        line = re.sub(r'const APP_VERSION = \d+;', 'const APP_VERSION = <VERSION>;', line)
        line = re.sub(r"const STORAGE_KEY = 'otthos_life_world_roleplay_v\d+';", "const STORAGE_KEY = '<STORAGE>';", line)
        line = re.sub(r"const LEGACY_STORAGE_KEYS = \[.*?\];", "const LEGACY_STORAGE_KEYS = <LEGACY>;", line)
        line = re.sub(r"version:'V\d+_[^']+'", "version:'<TEST_API>'", line)
        rows.append(line.rstrip())
    return '\n'.join(rows) + '\n'


def normalized_css(text: str) -> str:
    rows: list[str] = []
    for line in text.splitlines():
        if re.match(r'^/\* ===== MODULE:', line) or not line.strip():
            continue
        line = re.sub(r'OTTHI WORLD EDU V\d+', 'OTTHI WORLD EDU V<VERSION>', line)
        rows.append(line.rstrip())
    return '\n'.join(rows) + '\n'


def function_order(text: str) -> list[str]:
    return re.findall(r'^  function\s+([A-Za-z_$][\w$]*)\s*\(', text, re.M)


def main() -> int:
    if not BASELINE_PATH.exists():
        raise SystemExit(f'Baseline ausente: {BASELINE_PATH}')
    baseline = json.loads(BASELINE_PATH.read_text('utf-8'))
    app = (ROOT / 'app.js').read_text('utf-8')
    style = (ROOT / 'style.css').read_text('utf-8')
    all_javascript = '\n'.join(path.read_text('utf-8', errors='ignore') for path in ROOT.rglob('*.js'))
    current_functions = function_order(app)

    expected_functions = baseline['functionOrder']
    missing = [name for name in expected_functions if name not in current_functions]
    added = [name for name in current_functions if name not in expected_functions]
    function_order_equal = current_functions == expected_functions
    js_normalized_sha = sha256_bytes(normalized_js(app).encode())
    css_normalized_sha = sha256_bytes(normalized_css(style).encode())

    asset_results = []
    for relative, expected_sha in baseline['preservedAssetHashes'].items():
        path = ROOT / relative
        actual = sha256_bytes(path.read_bytes()) if path.exists() else None
        asset_results.append({
            'file': relative,
            'exists': path.exists(),
            'expectedSha256': expected_sha,
            'actualSha256': actual,
            'unchanged': actual == expected_sha,
        })

    required_tokens = {
        'roupas_e_avatar': ['applyAvatarCustomization', 'openAvatarStudio', 'uniform'],
        'skills': ['setScaleMode', 'toggleCrouch', 'spinPlayer'],
        'bombeiros': ['createFireTruck', 'openFireStationDesk', 'activateFireIncident'],
        'policia': ['createPoliceCar', 'startPoliceAlert', 'updatePoliceSystem'],
        'ambulancias': ['createAmbulance', 'createTrafficIncident', 'resolveTrafficIncident'],
        'construcao': ['beginBuildMode', 'placeBuild', 'reconcileWorldBuilds'],
        'pescaria': ['startFishing', 'updateFishingVisual', 'restoreFishingCamera'],
        'transporte': ['createBusModel', 'enterBus', 'openMetroStation'],
        'multiplayer': ['remotePlayerEvent', 'openSocialHub', 'updateMultiplayer'],
        'educacao': ['openEducationHub', 'runEducationGame', 'OTTHI_LEARNING'],
    }
    token_results = {
        system: {
            'required': tokens,
            'present': [token for token in tokens if token in all_javascript],
            'complete': all(token in all_javascript for token in tokens),
        }
        for system, tokens in required_tokens.items()
    }

    result = {
        'baseline': 'OTTHI World Edu V641',
        'candidate': 'OTTHI World Edu V642 modular',
        'functionCountExpected': len(expected_functions),
        'functionCountActual': len(current_functions),
        'functionOrderEqual': function_order_equal,
        'missingFunctions': missing,
        'addedFunctions': added,
        'normalizedJavascriptShaExpected': baseline['normalizedJavascriptSha256'],
        'normalizedJavascriptShaActual': js_normalized_sha,
        'normalizedJavascriptEquivalent': js_normalized_sha == baseline['normalizedJavascriptSha256'],
        'normalizedStylesheetShaExpected': baseline['normalizedStylesheetSha256'],
        'normalizedStylesheetShaActual': css_normalized_sha,
        'normalizedStylesheetEquivalent': css_normalized_sha == baseline['normalizedStylesheetSha256'],
        'preservedAssetsChecked': len(asset_results),
        'preservedAssetsUnchanged': sum(item['unchanged'] for item in asset_results),
        'preservedAssetFailures': [item for item in asset_results if not item['unchanged']],
        'requiredSystemTokens': token_results,
    }
    result['passed'] = all([
        result['functionOrderEqual'],
        result['normalizedJavascriptEquivalent'],
        result['normalizedStylesheetEquivalent'],
        not result['preservedAssetFailures'],
        all(item['complete'] for item in token_results.values()),
    ])

    (DOCS / 'RELATORIO-EQUIVALENCIA-V641-V642.json').write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + '\n', 'utf-8'
    )
    md = [
        '# Relatório de equivalência — V641 → V642 modular', '',
        f"- Resultado: **{'APROVADO' if result['passed'] else 'REPROVADO'}**",
        f"- Funções esperadas/atuais: **{len(expected_functions)} / {len(current_functions)}**",
        f"- Mesma ordem de funções: **{'sim' if function_order_equal else 'não'}**",
        f"- SHA normalizado do JavaScript equivalente: **{'sim' if result['normalizedJavascriptEquivalent'] else 'não'}**",
        f"- SHA normalizado do CSS equivalente: **{'sim' if result['normalizedStylesheetEquivalent'] else 'não'}**",
        f"- Assets preservados sem alteração: **{result['preservedAssetsUnchanged']} / {result['preservedAssetsChecked']}**",
        '',
        'A normalização ignora somente comentários de separação de módulos, número/build da versão, chave nova de save, lista de migração e rótulo da API de testes. Não ignora funções, condições ou lógica executável.',
        '', '## Sistemas obrigatórios', ''
    ]
    for system, details in token_results.items():
        md.append(f"- [{'x' if details['complete'] else ' '}] `{system}` — {', '.join(details['present'])}")
    if missing:
        md += ['', '## Funções ausentes', '', *[f'- `{name}`' for name in missing]]
    if added:
        md += ['', '## Funções adicionadas', '', *[f'- `{name}`' for name in added]]
    (DOCS / 'RELATORIO-EQUIVALENCIA-V641-V642.md').write_text('\n'.join(md) + '\n', 'utf-8')

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result['passed'] else 1


if __name__ == '__main__':
    sys.exit(main())
