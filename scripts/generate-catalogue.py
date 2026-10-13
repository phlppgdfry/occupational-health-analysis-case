#!/usr/bin/env python3
"""Render requirements and measurement definitions from their canonical JSON."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def render():
    case = json.loads((ROOT / 'site/assets/case.json').read_text())
    lines = ['# Requirements en traceerbaarheid', '',
             'Voor analist, ontwikkelaar en tester. Gegenereerd uit `site/assets/case.json`; wijzig de bron en voer `python3 scripts/generate-catalogue.py` uit.', '',
             'Alle behoeften en beleidsregels zijn fictieve case-aannames. De labels R-01 t/m R-10 verwijzen naar gedrag in de gedeelde domeinfunctie. Acceptatietests staan in [domain.test.mjs](../../tests/domain.test.mjs).', '',
             '## Traceerbaarheidsmatrix', '',
             '| Behoefte | Requirement | Prioriteit | Eigenaar | Regel | Acceptatietests | Meetplan |',
             '|---|---|---|---|---|---|---|']
    for r in case['requirements']:
        lines.append(f"| {r['need']} | {r['id']} | {r['priority']} | {r['owner']} | {r['rule']} | {', '.join(r['tests'])} | {r['kpi']} |")
    lines += ['', '## Stories en acceptatie', '']
    for r in case['requirements']:
        lines += [f"### {r['id']} · {r['title']}", '', r['story'], '', f"**Acceptatie:** {r['acceptance']}", '',
                  f"**Trace:** {r['need']} → {r['id']} → {r['rule']} → {', '.join(r['tests'])} → {r['kpi']}", '']
    lines += ['## KPI-definities: illustratief meetplan', '', 'Geen getal hieronder is een gemeten resultaat. Baseline en targets zijn illustratieve aannames die vóór een echte pilot gevalideerd moeten worden.', '',
              '| KPI | Definitie | Baseline | Doel | Eigenaar / beperking |', '|---|---|---|---|---|']
    for k in case['kpis']:
        lines.append(f"| {k['id']} · {k['name']} | {k['definition']} | {k['baseline']} | {k['target']} | {k['owner']} · {k['caveat']} |")
    lines += ['', '## Niet-functionele productievoorwaarden', '',
              'Deze requirements beschrijven geteste sequentiële domeinlogica. Echte identiteit, tenantautorisatie, transactionele concurrency en beschermde auditopslag blijven productievoorwaarden, beschreven in [architectuur](../04-design/architecture.md) en [privacy](../04-design/privacy-security.md).', '',
              'Aanvullende kwaliteitsdoelen: toetsenbordbediening, leesbare labels en geen horizontale pagina-overflow op 375 px; browserchecks toetsen dit deels. Voor een echte omgeving: performancebudget en verwachte piekbelasting met productteam afspreken. Er is geen fictieve SLA als bewezen prestatie toegevoegd.', '',
              'Vorige: [discovery](../01-discovery/discovery.md). Volgende: [functionele specificatie](functional-spec.md).', '']
    return '\n'.join(lines)

if __name__ == '__main__':
    target = ROOT / 'docs/02-requirements/catalogue.md'
    content = render()
    if '--check' in sys.argv:
        if not target.exists() or target.read_text() != content:
            sys.exit('Catalogue drift: run python3 scripts/generate-catalogue.py')
        print('Canonical catalogue matches JSON.')
    else:
        target.write_text(content)
        print('Catalogue generated.')
