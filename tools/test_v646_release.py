#!/usr/bin/env python3
from pathlib import Path
import hashlib
import json
import os
import shutil
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
ROOMS = [
    'bairro-central',
    'bairro-floresta',
    'bairro-lago',
    'bairro-montanha',
    'bairro-escola',
]
PHRASES = [
    'Oi!',
    'Vamos brincar?',
    'Quer correr?',
    'Vamos estudar juntos?',
    'Boa jogada!',
    'Parabéns!',
    'Até logo!',
    'Vamos visitar minha casa?',
    'Vamos pescar?',
    'Vamos construir?',
]


def text(relative: str) -> str:
    return (ROOT / relative).read_text('utf-8')


class ReleaseV646Tests(unittest.TestCase):
    def test_version_surfaces_are_unified(self):
        version = json.loads(text('VERSION.json'))
        module_order = json.loads(text('src/module-order.json'))
        self.assertEqual(version['version'], 646)
        self.assertEqual(version['build'], '646.0-safe-rooms-atomic-pwa')
        self.assertEqual(module_order['version'], 646)
        self.assertEqual(module_order['build'], version['build'])
        self.assertIn('data-otthi-build="646.0-safe-rooms-atomic-pwa"', text('index.html'))
        self.assertRegex(text('index.html'), r'data-otthi-revision="[a-f0-9]{16}"')
        self.assertGreaterEqual(text('index.html').count('?v=646'), 10)

    def test_save_migration_is_explicit(self):
        source = text('src/modules/00-runtime-foundation.js')
        self.assertIn("const STORAGE_KEY = 'otthos_life_world_roleplay_v646'", source)
        self.assertIn("'otthos_life_world_roleplay_v645'", source)

    def test_room_contract_has_no_legacy_public_room(self):
        critical = '\n'.join(text(path) for path in [
            'assets/js/core/runtime-config.js',
            'firebase-config.js',
            'assets/js/multiplayer-rtdb.js',
            'src/modules/02-state-save-cloud-account.js',
            'src/modules/27-npc-enemies-combat-camera-action.js',
            'src/modules/28-multiplayer-social-online.js',
        ])
        for room in ROOMS:
            self.assertIn(room, critical)
        self.assertNotIn('mundo-publico', critical)

    def test_slot_reservation_contract_is_atomic_and_recoverable(self):
        rtdb = text('assets/js/multiplayer-rtdb.js')
        self.assertIn('runTransaction', rtdb)
        self.assertIn('slotsRef', rtdb)
        self.assertIn('updatedAt', rtdb)
        self.assertIn('abandonedSlotMs', text('assets/js/core/runtime-config.js'))
        self.assertTrue('onDisconnect' in rtdb and 'remove' in rtdb)

    def test_production_runtime_harness(self):
        node = os.environ.get('OTTHI_NODE') or shutil.which('node')
        self.assertTrue(node, 'Node.js precisa estar disponivel')
        subprocess.run(
            [node, 'tools/test_v646_runtime.js'],
            cwd=ROOT,
            check=True,
            capture_output=True,
            text=True,
        )

    def test_child_safety_is_backend_enforced(self):
        config = text('assets/js/core/runtime-config.js')
        safety = text('assets/js/safety/child-safety.js')
        rules = text('firebase-database.rules.json')
        self.assertIn('freeChatEnabled: false', config)
        self.assertIn('approvedPhrasesOnly: true', config)
        for phrase in PHRASES:
            self.assertIn(phrase, safety)
            self.assertIn(phrase, rules)
        for token in ['blocks', 'reports', 'guardianSettings']:
            self.assertIn(token, rules)
        for token in [
            "child('communicationEnabled').val() === true",
            "newData.child('type').val() === 'coins' && newData.child('amount').val() === 10",
            "newData.child('type').val() === 'socialRequestResult'",
            '"$other": {',
            '".validate": false',
        ]:
            self.assertIn(token, rules)
        self.assertNotIn("extra:event.extra", text('assets/js/multiplayer-rtdb.js'))
        self.assertIn("const sender='Outro jogador'", text('src/modules/28-multiplayer-social-online.js'))
        self.assertIn("matches(/^Jogador [A-Z0-9]{4}$/)", rules)
        self.assertIn("child('socialRequests').child(newData.child('requestId').val())", rules)
        self.assertNotIn('state.profile.coins+=10', text('src/modules/28-multiplayer-social-online.js'))
        self.assertNotIn('addCoins(-10)', text('src/modules/28-multiplayer-social-online.js'))
        self.assertIn('Gesto simbólico, sem transferir saldo', text('src/modules/28-multiplayer-social-online.js'))
        self.assertIn('safeHouseName', text('assets/js/multiplayer/room-manager.js'))

    def test_guardian_communication_toggle_persists(self):
        backend = text('assets/js/multiplayer-rtdb.js')
        parent = text('src/modules/08-map-parent-settings.js')
        self.assertIn("requestedCommunication=settings?.communicationEnabled===true", backend)
        self.assertIn("chatEnabled:requestedCommunication", backend)
        self.assertIn("saved.communicationEnabled!==clean.communicationEnabled", backend)
        self.assertIn("draft.chatEnabled=draft.communicationEnabled===true", parent)
        self.assertIn("draft.chatEnabled=draft.communicationEnabled", parent)
        self.assertIn("const saved=result?.settings||result", parent)

    def test_parent_and_moderation_ui_are_present(self):
        parent = text('src/modules/08-map-parent-settings.js')
        social = text('src/modules/28-multiplayer-social-online.js')
        for token in ['sessionLimitMinutes', 'saveGuardianSettings', 'getBlockedPlayers', 'unblockPlayer']:
            self.assertIn(token, parent)
        for token in ['approvedChatPhrases', 'blockPlayer', 'reportPlayer', 'guardianCommunicationAllowed']:
            self.assertIn(token, social)
        account = text('src/modules/02-state-save-cloud-account.js')
        backend = text('assets/js/multiplayer-rtdb.js')
        self.assertIn('openAccountLogoutGate', account)
        self.assertIn('signOutPlayerAccount?.(password)', account)
        self.assertIn('reauthenticateAccount(password)', backend)
        self.assertIn('rememberGuestParentalControls', backend)
        usage = text('src/modules/29-game-loop-controls-gamepad.js')
        self.assertIn('state.usage.sessionLockedAt=now', usage)
        self.assertIn('Nova sessão exige um responsável', usage)
        self.assertIn('data-parent-new-session', parent)

    def test_presence_sessions_and_rotation_are_fail_closed(self):
        rules = text('firebase-database.rules.json')
        backend = text('assets/js/multiplayer-rtdb.js')
        resize = text('src/modules/25-render-init-resize-position-collision.js')
        loop = text('src/modules/29-game-loop-controls-gamepad.js')
        self.assertIn("child('slots').child('slot-10').child('uid').val() === auth.uid", rules)
        self.assertIn("child('slot-10').child('updatedAt').val() >= now - 30000", rules)
        self.assertIn("query.orderByChild == 'fromUid'", rules)
        self.assertIn("query.orderByChild == 'toUid'", rules)
        self.assertIn("newData.child('winnerScore').val() === newData.parent().child('players')", rules)
        self.assertLess(
            backend.index('runTransaction(refs.slot'),
            backend.index('api.update(refs.presence'),
        )
        self.assertIn('presenceIsFresh', backend)
        self.assertIn('"$other": {', rules)
        self.assertIn("newData.child('houseId').val() === $houseId", rules)
        self.assertIn('ensureViewportCoherence', resize)
        self.assertIn('ensureViewportCoherence();auditPlayerMode', loop)

    def test_legacy_house_lock_migrates_to_canonical_schema(self):
        backend = text('assets/js/multiplayer-rtdb.js')
        lock_start = backend.index('async function setHouseLock')
        lock_end = backend.index('function setDisplayName', lock_start)
        lock_body = backend[lock_start:lock_end]
        claim_start = backend.index('async function claimHouse')
        claim_end = lock_start
        claim_body = backend[claim_start:claim_end]
        self.assertIn('function canonicalHouseRecord', backend)
        self.assertIn('price:publicHousePrice(houseId)', backend)
        self.assertIn('runTransaction', lock_body)
        self.assertIn('canonicalHouseRecord', lock_body)
        self.assertNotIn('api.update(', lock_body)
        self.assertIn('canonicalHouseRecord', claim_body)
        self.assertNotIn('{...(current||{})', claim_body)

    def test_release_manifest_hashes_match(self):
        release = json.loads(text('release-manifest.json'))
        self.assertEqual(release['version'], 646)
        self.assertRegex(release['revision'], r'^[a-f0-9]{16}$')
        self.assertEqual(release['algorithm'], 'SHA-256')
        for relative, expected in release['files'].items():
            self.assertEqual(hashlib.sha256((ROOT / relative).read_bytes()).hexdigest(), expected, relative)

    def test_service_worker_rejects_mixed_shell(self):
        sw = text('sw.js')
        for token in [
            'fetchReleaseManifest',
            'verifyResponse',
            "crypto.subtle.digest('SHA-256'",
            'Release incompleta; cache anterior preservado',
            'activeReleaseManifest',
            'return cached || response',
            'manifest?.revision !== REVISION',
        ]:
            self.assertIn(token, sw)
        self.assertNotIn('await caches.match(request)', sw)
        self.assertIn('./assets/vendor/three-r128.min.js?v=646', sw)
        self.assertNotIn('cdnjs.cloudflare.com/ajax/libs/three.js', text('index.html'))

    def test_loading_failure_preserves_save(self):
        source = text('src/modules/29-game-loop-controls-gamepad.js')
        self.assertLess(source.index('await saveState(true)'), source.index('initThree()'))
        self.assertIn('O progresso não foi apagado', source)
        self.assertIn('updatePlayUsage', source)


    def test_world_retry_and_privacy_fail_closed(self):
        loading = text('src/modules/29-game-loop-controls-gamepad.js')
        social = text('src/modules/28-multiplayer-social-online.js')
        self.assertIn('worldInitializationReady', loading)
        self.assertIn('location.reload()', loading)
        self.assertIn('function publicPlayerName', social)
        self.assertIn('return`Jogador ${suffix}`', social)
        self.assertIn('function remotePlayerName', social)
        self.assertNotIn("safeNickname?.(state.profile.name)||sanitizePlayerName", social)

    def test_build_and_ci_do_not_publish_partial_outputs(self):
        build = text('tools/build_project.py')
        workflow = text('.github/workflows/build-modular-app.yml')
        self.assertIn('validate_candidates(candidates)', build)
        self.assertLess(build.index('validate_candidates(candidates)'), build.index('commit_candidates(candidates)'))
        self.assertIn('git diff --exit-code', workflow)
        self.assertNotIn('git push', workflow)


if __name__ == '__main__':
    unittest.main(verbosity=2)
