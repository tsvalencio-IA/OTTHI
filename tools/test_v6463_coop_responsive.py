#!/usr/bin/env python3
from pathlib import Path
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]

def text(relative: str) -> str:
    return (ROOT / relative).read_text('utf-8')

class CoopResponsiveTests(unittest.TestCase):
    def test_all_requested_cooperative_missions_exist(self):
        source = text('src/modules/32-cooperative-missions.js')
        for mission in ['firefighter','paramedic','police','fishing','school','streetRace','ovalRace']:
            self.assertIn(f"{mission}:{{", source)
        for phrase in ['Você está preso', 'Pescaria e Peixe Assado', 'Todos para a Escola', 'Ginásio Oval']:
            self.assertIn(phrase, source)
        self.assertIn('solo adaptado', source)
        self.assertNotIn('arma de fogo', source.lower())
        self.assertNotIn('atirar', source.lower())

    def test_roles_and_shared_progress_are_online(self):
        backend = text('assets/js/multiplayer-rtdb.js')
        rules = text('firebase-database.rules.json')
        for token in [
            'createCoopMission','joinCoopMission','updateCoopParticipant',
            'setCoopMissionStatus','updateCoopMissionProgress','leaveCoopMission',
            'coopMissions','counterSet','options.mode'
        ]:
            self.assertIn(token, backend)
        for token in ['coopMissions','streetRace','ovalRace','stretcher','teacher','runner']:
            self.assertIn(token, rules)
        self.assertIn("child('communicationEnabled').val() === true", rules)

    def test_map_is_clustered_and_responsive_in_both_orientations(self):
        source = text('src/modules/08-map-parent-settings.js')
        css = text('src/styles/15-coop-map-responsive-v6463.css')
        for token in ['mapClusterLookup','mapVisualNodes','mapClusterSelectionMarkup','responsive-map','--map-size']:
            self.assertIn(token, source)
        self.assertIn('@media(orientation:portrait)', css)
        self.assertIn('@media(orientation:landscape) and (max-height:620px)', css)
        self.assertIn('overflow:hidden!important', css)
        self.assertIn('aspect-ratio:1/1!important', css)
        self.assertIn('.map-marker.clean.cluster', css)

    def test_state_persists_and_existing_systems_integrate(self):
        defaults = text('src/modules/01-build-persistence.js')
        persistence = text('src/modules/02-state-save-cloud-account.js')
        emergency = text('src/modules/16-emergency-services.js')
        hud = text('src/modules/06-missions-profile-hud-inventory-tools.js')
        for token in ['cooperative:', 'preferredMode', 'soloFallback']:
            self.assertIn(token, defaults)
        self.assertGreaterEqual(persistence.count('cooperative:'), 2)
        self.assertIn('activeCoopServiceJob', emergency)
        self.assertIn('coopMissionProgressLabel', hud)
        self.assertIn('coopMissionBriefingMarkup', hud)

    def test_school_fishing_and_race_runtime_contracts(self):
        source = text('src/modules/32-cooperative-missions.js')
        for token in [
            'updateCoopFishingProgress','cooked-fish','student-delivered',
            'followingNpcIds','updateCoopSchoolFollowers','updateCoopRaceProgress',
            'activateCoopRaceBots','createCooperativeMissionWorld',
            'counterSet:0','resetCoopMissionNpcs','coopMissionHash','resolveCoopMissionScene'
        ]:
            self.assertIn(token, source)
        world = text('src/modules/13-houses-npcs-vehicles-base.js')
        self.assertIn('createAthleticsGym', world)
        self.assertIn('Math.PI*2', world)
        self.assertIn('Ginásio oval', world)
        self.assertIn('OTTHI ARENA • 3 VOLTAS', world)

    def test_uniform_and_build_order_are_complete(self):
        avatar = text('src/modules/11-render-materials-player-model.js')
        order = json.loads(text('src/module-order.json'))
        self.assertIn("sport:{primary:", avatar)
        self.assertIn("uniform==='sport'", avatar)
        self.assertEqual(order['javascript'][-1]['file'], 'src/modules/32-cooperative-missions.js')
        self.assertEqual(order['styles'][-1]['file'], 'src/styles/15-coop-map-responsive-v6463.css')
        app = text('app.js')
        style = text('style.css')
        for token in ['COOP_MISSION_TEMPLATES','createCooperativeMissionWorld','mapClusterLookup']:
            self.assertIn(token, app)
        self.assertIn('.coop-template-grid', style)

if __name__ == '__main__':
    unittest.main(verbosity=2)
