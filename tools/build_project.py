#!/usr/bin/env python3
from pathlib import Path
import hashlib
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / 'src/module-order.json').read_text('utf-8'))


def body_after_marker(path: Path, marker: str) -> str:
    text = path.read_text('utf-8')
    if marker not in text:
        raise RuntimeError(f'Marcador {marker!r} ausente em {path}')
    return text.split(marker, 1)[1].lstrip('\r\n')


def build_js() -> str:
    parts = ["(() => {\n"]
    for item in MANIFEST['javascript']:
        path = ROOT / item['file']
        body = body_after_marker(path, '// @otthi-module-body')
        digest = hashlib.sha256(body.encode()).hexdigest()
        if digest != item['sha256Body']:
            item['sha256Body'] = digest
        parts.append(f"\n  // ===== MODULE: {path.name} =====\n")
        parts.append(body)
    parts.append("\n})();\n")
    output = ''.join(parts)
    (ROOT / 'app.js').write_text(output, 'utf-8')
    return output


def build_css() -> str:
    parts = []
    for item in MANIFEST['styles']:
        path = ROOT / item['file']
        body = body_after_marker(path, '/* @otthi-style-body */')
        digest = hashlib.sha256(body.encode()).hexdigest()
        if digest != item['sha256Body']:
            item['sha256Body'] = digest
        parts.append(f"\n/* ===== MODULE: {path.name} ===== */\n")
        parts.append(body)
    output = ''.join(parts).lstrip()
    (ROOT / 'style.css').write_text(output, 'utf-8')
    return output


def validate() -> None:
    subprocess.run(['node', '--check', str(ROOT / 'app.js')], check=True)
    json.loads((ROOT / 'manifest.webmanifest').read_text('utf-8'))
    json.loads((ROOT / 'firebase-database.rules.json').read_text('utf-8'))
    json.loads((ROOT / 'VERSION.json').read_text('utf-8'))


if __name__ == '__main__':
    js = build_js()
    css = build_css()
    (ROOT / 'src/module-order.json').write_text(json.dumps(MANIFEST, ensure_ascii=False, indent=2) + '\n', 'utf-8')
    validate()
    print(f'app.js: {len(js):,} caracteres')
    print(f'style.css: {len(css):,} caracteres')
    print('Build modular concluído.')
