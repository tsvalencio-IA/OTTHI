#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from html.parser import HTMLParser
import hashlib
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
errors: list[str] = []
checks: list[dict] = []


def add(name: str, passed: bool, detail: str = '') -> None:
    checks.append({'name': name, 'passed': bool(passed), 'detail': detail})
    if not passed:
        errors.append(f'{name}: {detail}')


def run(command: list[str], name: str) -> None:
    result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True)
    add(name, result.returncode == 0, (result.stderr or result.stdout).strip()[:2000])


def parse_json(relative: str) -> None:
    try:
        json.loads((ROOT / relative).read_text('utf-8'))
        add(f'JSON {relative}', True)
    except Exception as exc:
        add(f'JSON {relative}', False, str(exc))


class HtmlAudit(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.local_refs: list[str] = []
        self.external_refs: list[str] = []

    def handle_starttag(self, tag: str, attrs) -> None:
        data = dict(attrs)
        if data.get('id'):
            self.ids.append(data['id'])
        ref = data.get('src') if tag in {'script', 'img', 'source'} else data.get('href') if tag == 'link' else None
        if not ref:
            return
        clean = ref.split('?', 1)[0].split('#', 1)[0]
        if clean.startswith(('http://', 'https://')):
            self.external_refs.append(clean)
        elif clean.startswith('./'):
            self.local_refs.append(clean[2:])


def css_braces(text: str) -> tuple[int, int]:
    # Remove comments and quoted strings before counting structural braces.
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    text = re.sub(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'', '', text)
    return text.count('{'), text.count('}')


def main() -> int:
    required = [
        'index.html', 'app.js', 'style.css', 'sw.js', 'manifest.webmanifest',
        'firebase-config.js', 'firebase-database.rules.json', 'athos.glb',
        'src/module-order.json', 'tools/build_project.py', 'tools/audit_source.py',
        'tools/deep_inventory.py', 'tools/verify_equivalence.py', 'tools/validate_project.py',
        '.github/workflows/build-modular-app.yml', '.github/workflows/gerar-apk.yml',
        'android-app/app/build.gradle',
    ]
    for relative in required:
        add(f'Arquivo obrigatório {relative}', (ROOT / relative).is_file())

    manifest = json.loads((ROOT / 'src/module-order.json').read_text('utf-8'))
    js_modules = sorted((ROOT / 'src/modules').glob('*.js'))
    css_modules = sorted((ROOT / 'src/styles').glob('*.css'))
    add('31 módulos JavaScript', len(js_modules) == 31, str(len(js_modules)))
    add('11 módulos CSS', len(css_modules) == 11, str(len(css_modules)))
    add('Manifesto contém 31 módulos JS', len(manifest.get('javascript', [])) == 31, str(len(manifest.get('javascript', []))))
    add('Manifesto contém 11 módulos CSS', len(manifest.get('styles', [])) == 11, str(len(manifest.get('styles', []))))
    add('Ordem JS corresponde aos arquivos', [Path(x['file']).name for x in manifest['javascript']] == [p.name for p in js_modules])
    add('Ordem CSS corresponde aos arquivos', [Path(x['file']).name for x in manifest['styles']] == [p.name for p in css_modules])

    run(['node', '--check', 'app.js'], 'Sintaxe app.js')
    for path in sorted((ROOT / 'assets/js').rglob('*.js')):
        run(['node', '--check', str(path.relative_to(ROOT))], f'Sintaxe {path.relative_to(ROOT)}')
    for path in js_modules:
        run(['node', '--check', str(path.relative_to(ROOT))], f'Sintaxe {path.relative_to(ROOT)}')

    for relative in ['manifest.webmanifest', 'firebase-database.rules.json', 'VERSION.json', 'src/module-order.json']:
        parse_json(relative)

    index = (ROOT / 'index.html').read_text('utf-8')
    parser = HtmlAudit(); parser.feed(index)
    duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
    add('IDs HTML únicos', not duplicates, ', '.join(duplicates))
    missing_refs = sorted(ref for ref in parser.local_refs if not (ROOT / ref).exists())
    add('Referências locais do index existem', not missing_refs, ', '.join(missing_refs))
    add('Versão 642 no index', index.count('?v=642') >= 10, f"{index.count('?v=642')} referências")
    add('Meta PWA moderna', 'name="mobile-web-app-capable"' in index)

    css_open, css_close = css_braces((ROOT / 'style.css').read_text('utf-8'))
    add('Chaves CSS balanceadas', css_open == css_close, f'{css_open}/{css_close}')

    app = (ROOT / 'app.js').read_text('utf-8')
    funcs = re.findall(r'^  function\s+([A-Za-z_$][\w$]*)\s*\(', app, re.M)
    add('544 funções nomeadas', len(funcs) == 544, str(len(funcs)))
    add('Versão runtime 642', "window.OTTHI_GAME_VERSION = 642;" in app and "const APP_VERSION = 642;" in app)
    add('Migração inclui V641', 'otthos_life_world_roleplay_v641' in app)

    sw = (ROOT / 'sw.js').read_text('utf-8')
    add('Service Worker V642', "otthi-world-edu-v642-1" in sw and "BUILD = '642.0-complete-modular-source-equivalence'" in sw)
    for ref in parser.local_refs:
        if ref.endswith(('.js', '.css', '.webmanifest')) and ref not in {'v54-render-premium.js', 'v54-render-premium.css'}:
            add(f'SW referencia {ref}', ref in sw or ref in {'index.html'})

    equivalence = DOCS / 'RELATORIO-EQUIVALENCIA-V641-V642.json'
    if equivalence.exists():
        data = json.loads(equivalence.read_text('utf-8'))
        add('Equivalência V641/V642 aprovada', data.get('passed') is True)
    else:
        add('Equivalência V641/V642 aprovada', False, 'relatório ausente')

    report = {
        'version': 642,
        'passed': not errors,
        'checks': checks,
        'errors': errors,
        'counts': {
            'checks': len(checks),
            'passed': sum(item['passed'] for item in checks),
            'failed': sum(not item['passed'] for item in checks),
            'functions': len(funcs),
            'javascriptModules': len(js_modules),
            'styleModules': len(css_modules),
            'htmlIds': len(parser.ids),
            'externalDependencies': sorted(set(parser.external_refs)),
        },
        'hashes': {
            'app.js': hashlib.sha256((ROOT / 'app.js').read_bytes()).hexdigest(),
            'style.css': hashlib.sha256((ROOT / 'style.css').read_bytes()).hexdigest(),
            'src/module-order.json': hashlib.sha256((ROOT / 'src/module-order.json').read_bytes()).hexdigest(),
        },
    }
    (DOCS / 'VALIDACAO-ESTRUTURAL-V642.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', 'utf-8')
    md = ['# Validação estrutural automática — V642', '', f"- Resultado: **{'APROVADO' if report['passed'] else 'REPROVADO'}**", f"- Verificações: **{report['counts']['passed']} aprovadas / {report['counts']['failed']} falhas**", '', '## Verificações', '']
    md += [f"- [{'x' if item['passed'] else ' '}] {item['name']}{' — '+item['detail'] if item['detail'] else ''}" for item in checks]
    md += ['', '## Limites desta validação', '', '- Não comprova FPS em aparelho físico.', '- Não comprova WebGL no navegador do usuário.', '- Não comprova multiplayer real em duas contas.', '- Não comprova AR e APK em aparelho físico.', '- Dependências externas precisam de internet no primeiro carregamento, salvo se já estiverem em cache.']
    (DOCS / 'VALIDACAO-ESTRUTURAL-V642.md').write_text('\n'.join(md) + '\n', 'utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report['passed'] else 1


if __name__ == '__main__':
    sys.exit(main())
