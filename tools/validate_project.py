#!/usr/bin/env python3
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
NODE = os.environ.get('OTTHI_NODE') or shutil.which('node') or 'node'
PYTHON = sys.executable
errors: list[str] = []
checks: list[dict] = []


def add(name: str, passed: bool, detail='') -> None:
    checks.append({'name': name, 'passed': bool(passed), 'detail': str(detail)})
    if not passed:
        errors.append(f'{name}: {detail}')


def run(command: list[str], name: str) -> None:
    try:
        result = subprocess.run(
            command,
            cwd=ROOT,
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
        )
        detail = (result.stderr or result.stdout or '').strip()[:3000]
        add(name, result.returncode == 0, detail)
    except Exception as error:
        add(name, False, error)


def read_json(relative: str):
    try:
        data = json.loads((ROOT / relative).read_text('utf-8'))
        add(f'JSON {relative}', True)
        return data
    except Exception as error:
        add(f'JSON {relative}', False, error)
        return {}


class HtmlAudit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids: list[str] = []
        self.local: list[str] = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get('id'):
            self.ids.append(values['id'])
        reference = values.get('src') if tag in {'script', 'img', 'source'} else values.get('href') if tag == 'link' else None
        if reference and reference.startswith('./'):
            self.local.append(reference.split('?', 1)[0].split('#', 1)[0][2:])


def body_after_marker(path: Path, marker: str) -> str:
    text = path.read_text('utf-8')
    if marker not in text:
        raise ValueError(f'{marker} ausente em {path}')
    return text.split(marker, 1)[1].lstrip('\r\n')


def generated_bundles(manifest: dict) -> tuple[str, str]:
    js_parts = ['(() => {\n']
    for item in manifest.get('javascript', []):
        path = ROOT / item['file']
        body = body_after_marker(path, '// @otthi-module-body')
        digest = hashlib.sha256(body.encode()).hexdigest()
        add(f"Hash-fonte {item['file']}", digest == item.get('sha256Body'), digest)
        js_parts.extend([f'\n  // ===== MODULE: {path.name} =====\n', body])
    js_parts.append('\n})();\n')
    css_parts: list[str] = []
    for item in manifest.get('styles', []):
        path = ROOT / item['file']
        body = body_after_marker(path, '/* @otthi-style-body */')
        digest = hashlib.sha256(body.encode()).hexdigest()
        add(f"Hash-fonte {item['file']}", digest == item.get('sha256Body'), digest)
        css_parts.extend([f'\n/* ===== MODULE: {path.name} ===== */\n', body])
    return ''.join(js_parts), ''.join(css_parts).lstrip()


def css_braces(text: str) -> tuple[int, int]:
    clean = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    clean = re.sub(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'', '', clean)
    return clean.count('{'), clean.count('}')


def main() -> int:
    required = [
        'index.html', 'app.js', 'style.css', 'sw.js', 'manifest.webmanifest',
        'release-manifest.json', 'firebase-config.js', 'firebase-database.rules.json',
        'athos.glb', 'VERSION.json', 'src/module-order.json',
        'tools/build_project.py', 'tools/verify_equivalence.py', 'tools/validate_project.py',
        'tools/test_v643_mobility.js', 'tools/test_v643_world_systems.py',
        'tools/test_v644_neighborhoods.py', 'tools/test_v646_release.py',
        '.github/workflows/build-modular-app.yml', '.github/workflows/gerar-apk.yml',
        'android-app/app/build.gradle', 'assets/textures/water-ripples-v643.png',
        'src/modules/31-neighborhood-world-controller.js',
        'src/styles/13-neighborhood-world-map-v644.css',
    ]
    for relative in required:
        add(f'Arquivo obrigatório {relative}', (ROOT / relative).is_file())

    manifest = read_json('src/module-order.json')
    version = read_json('VERSION.json')
    webmanifest = read_json('manifest.webmanifest')
    rules = read_json('firebase-database.rules.json')
    release = read_json('release-manifest.json')
    js_modules = sorted((ROOT / 'src/modules').glob('*.js'))
    css_modules = sorted((ROOT / 'src/styles').glob('*.css'))
    add('32 módulos JavaScript', len(js_modules) == 32, len(js_modules))
    add('14 módulos CSS', len(css_modules) == 14, len(css_modules))
    add('Manifesto JS completo', len(manifest.get('javascript', [])) == 32)
    add('Manifesto CSS completo', len(manifest.get('styles', [])) == 14)
    add('Ordem JS corresponde aos arquivos', [Path(item['file']).name for item in manifest.get('javascript', [])] == [path.name for path in js_modules])
    add('Ordem CSS corresponde aos arquivos', [Path(item['file']).name for item in manifest.get('styles', [])] == [path.name for path in css_modules])
    add('Versões centrais unificadas', version.get('version') == 646 and version.get('build') == '646.0-safe-rooms-atomic-pwa' and manifest.get('version') == 646 and manifest.get('build') == version.get('build'))

    run([NODE, '--check', 'app.js'], 'Sintaxe app.js')
    run([NODE, '--check', 'sw.js'], 'Sintaxe sw.js')
    for path in js_modules:
        run([NODE, '--check', str(path.relative_to(ROOT))], f'Sintaxe {path.relative_to(ROOT)}')
    for path in sorted((ROOT / 'assets/js').rglob('*.js')):
        run([NODE, '--check', str(path.relative_to(ROOT))], f'Sintaxe {path.relative_to(ROOT)}')
    run([NODE, 'tools/test_v643_mobility.js'], '12 testes determinísticos de mobilidade V643')
    run([PYTHON, 'tools/test_v643_world_systems.py'], '34 testes de mundo V643')
    run([PYTHON, 'tools/test_v644_neighborhoods.py'], 'Testes de bairros e mapa')
    run([NODE, 'tools/test_v646_runtime.js'], 'Harness real de slots e Service Worker V646')
    run([PYTHON, 'tools/test_v646_release.py'], 'Testes de segurança e release V646')

    index = (ROOT / 'index.html').read_text('utf-8')
    html = HtmlAudit()
    html.feed(index)
    duplicates = sorted({value for value in html.ids if html.ids.count(value) > 1})
    missing = sorted(value for value in html.local if not (ROOT / value).exists())
    add('IDs HTML únicos', not duplicates, duplicates)
    add('Referências locais existem', not missing, missing)
    add('Versão 646 no index', index.count('?v=646') >= 10, index.count('?v=646'))
    add('Build V646 no HTML', 'data-otthi-build="646.0-safe-rooms-atomic-pwa"' in index)
    index_revision_match = re.search(r'data-otthi-revision="([a-f0-9]{16})"', index)
    add('Revisão imutável no HTML', bool(index_revision_match), index_revision_match.group(1) if index_revision_match else '')
    add('Three.js local e versionado', './assets/vendor/three-r128.min.js?v=646' in index and 'cdnjs.cloudflare.com/ajax/libs/three.js' not in index)

    app = (ROOT / 'app.js').read_text('utf-8')
    style = (ROOT / 'style.css').read_text('utf-8')
    functions = re.findall(r'^  function\s+([A-Za-z_$][\w$]*)\s*\(', app, re.M)
    add('Funções preservadas e ampliadas', len(functions) >= 564, len(functions))
    add('Runtime V646', "window.OTTHI_GAME_VERSION = 646;" in app and "const APP_VERSION = 646;" in app)
    add('Save V646 migra V645', "roleplay_v646'" in app and "roleplay_v645'" in app)
    for token in [
        'mobilityThrottleIntent', 'Acelerar', 'Freio', 'createShoreFishingLife',
        'trafficPriority', 'busSpawnIndex', 'miniMapLogicalSize', 'miniMapScale',
        'clearRemoteRoomEntities', 'applyRoomWorld', 'mapRegionsMarkup',
        'approvedChatPhrases', 'openReportPlayer', 'updatePlayUsage',
        'OTTHI_RELEASE_COHERENT',
    ]:
        add(f'Token preservado {token}', token in app)
    opened, closed = css_braces(style)
    add('Chaves CSS balanceadas', opened == closed, f'{opened}/{closed}')
    add('Canvas ocupa 100%', '12-fullscreen-responsive-hotfix-v6431.css' in style and 'min-width:100%!important' in style)
    add('Mapa principal escala 1:1', '13-neighborhood-world-map-v644.css' in style and 'aspect-ratio:1/1!important' in style)

    config = (ROOT / 'assets/js/core/runtime-config.js').read_text('utf-8')
    add('Cinco bairros com 10 vagas', config.count('capacity:10') == 5 and 'maxPlayersPerRoom: 10' in config, config.count('capacity:10'))
    add('Segurança infantil padrão', 'freeChatEnabled: false' in config and 'approvedPhrasesOnly: true' in config)
    add('Sala padrão correta', "validRoomIds.includes(value)" in config and "defaultRoom: savedRoom || 'bairro-central'" in config)
    add('Manifesto PWA V646', webmanifest.get('name') == 'OTTHI World Edu V646' and 'v=646' in webmanifest.get('start_url', ''))

    rules_text = json.dumps(rules, ensure_ascii=False)
    for token in ['bairro-central', 'bairro-floresta', 'bairro-lago', 'bairro-montanha', 'bairro-escola', 'slot-01', 'slot-10', 'guardianSettings', 'reports', 'blocks']:
        add(f'Regras Firebase contêm {token}', token in rules_text)
    add('Regras contêm frases aprovadas', all(phrase in rules_text for phrase in ['Oi!', 'Vamos brincar?', 'Vamos estudar juntos?', 'Até logo!']))
    add('Perfis não são públicos', '"profiles": {".read": "auth != null"' not in rules_text)

    sw = (ROOT / 'sw.js').read_text('utf-8')
    worker_revision_match = re.search(r"const REVISION = '([a-f0-9]{16})';", sw)
    add('Service Worker V646', bool(worker_revision_match) and 'const CACHE = `otthi-v646-${REVISION}`' in sw and '646.0-safe-rooms-atomic-pwa' in sw)
    add('Cache PWA validado por SHA-256', 'release-manifest.json?v=646' in sw and 'verifyResponse' in sw and "crypto.subtle.digest('SHA-256'" in sw)
    add('Fallback HTTP usa cache válido', 'return cached || response' in sw)
    bad_hashes = [
        relative for relative, digest in release.get('files', {}).items()
        if not (ROOT / relative).is_file() or hashlib.sha256((ROOT / relative).read_bytes()).hexdigest() != digest
    ]
    release_revision = release.get('revision', '')
    add('Manifesto de release V646', release.get('version') == 646 and release.get('build') == version.get('build') and release.get('algorithm') == 'SHA-256')
    add('Revisão coerente HTML/SW/manifesto', bool(index_revision_match and worker_revision_match) and release_revision == index_revision_match.group(1) == worker_revision_match.group(1))
    add('Hashes da release conferem', not bad_hashes, bad_hashes)

    expected_app, expected_style = generated_bundles(manifest)
    add('app.js sincronizado com fontes', app == expected_app)
    add('style.css sincronizado com fontes', style == expected_style)
    gradle = (ROOT / 'android-app/app/build.gradle').read_text('utf-8')
    add('Android V646', 'versionCode 646' in gradle and "versionName '6.46'" in gradle)

    report = {
        'version': 646,
        'build': version.get('build'),
        'passed': not errors,
        'checks': checks,
        'errors': errors,
        'counts': {
            'checks': len(checks),
            'passed': sum(item['passed'] for item in checks),
            'failed': sum(not item['passed'] for item in checks),
            'functions': len(functions),
            'javascriptModules': len(js_modules),
            'styleModules': len(css_modules),
            'htmlIds': len(html.ids),
        },
        'hashes': {
            relative: hashlib.sha256((ROOT / relative).read_bytes()).hexdigest()
            for relative in ['app.js', 'style.css', 'src/module-order.json', 'release-manifest.json']
        },
    }
    DOCS.mkdir(exist_ok=True)
    (DOCS / 'VALIDACAO-ESTRUTURAL-V646.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', 'utf-8')
    markdown = [
        '# Validação estrutural automática — V646',
        '',
        f"- Resultado: **{'APROVADO' if report['passed'] else 'REPROVADO'}**",
        f"- Verificações: **{report['counts']['passed']} aprovadas / {report['counts']['failed']} falhas**",
        '',
        '## Verificações',
        '',
        *[f"- [{'x' if item['passed'] else ' '}] {item['name']}{' — '+item['detail'] if item['detail'] else ''}" for item in checks],
        '',
        '## Limites',
        '',
        '- Não substitui teste físico de orientação instalada, multiplayer entre dois aparelhos, Firebase remoto, AR e APK.',
        '- Os testes V646 validam contratos estáticos, cache atômico, bairros, controles e simulações locais.',
    ]
    (DOCS / 'VALIDACAO-ESTRUTURAL-V646.md').write_text('\n'.join(markdown) + '\n', 'utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report['passed'] else 1


if __name__ == '__main__':
    sys.exit(main())
