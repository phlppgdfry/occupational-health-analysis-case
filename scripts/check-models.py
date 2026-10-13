#!/usr/bin/env python3
"""Structural checks, not full BPMN XSD or OpenAPI metaschema validation."""
import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
case = json.loads((ROOT/'site/assets/case.json').read_text())
source = (ROOT/'tests/domain.test.mjs').read_text()
test_ids = set(re.findall(r'AC-\d+', source))
requirements = case['requirements']
assert len({r['id'] for r in requirements}) == len(requirements), 'Duplicate requirement IDs'
assert len({r['rule'] for r in requirements}) == len(requirements), 'Duplicate rule IDs'
kpis = {k['id'] for k in case['kpis']}
for r in requirements:
    assert r['tests'] and set(r['tests']) <= test_ids, f"Missing test reference: {r['id']}"
    assert r['kpi'] in kpis, f"Missing KPI: {r['id']}"
    assert r['priority'] in ['Must', 'Should', 'Could']
for d in case['decisions']:
    assert (ROOT/d['path']).is_file(), d['path']
subprocess.run([sys.executable,str(ROOT/'scripts/generate-catalogue.py'),'--check'], check=True)

tree = ET.parse(ROOT/'docs/diagrams/to-be.bpmn')
nodes = list(tree.iter())
ids = [e.attrib['id'] for e in nodes if 'id' in e.attrib]
assert len(ids) == len(set(ids)), 'Duplicate BPMN IDs'
ids = set(ids)
for e in nodes:
    for key in ['sourceRef','targetRef','bpmnElement','processRef']:
        if key in e.attrib:
            assert e.attrib[key] in ids, f'Unknown BPMN reference {e.attrib[key]}'
assert any(e.tag.endswith('BPMNShape') for e in nodes), 'Missing diagram interchange'
assert any(e.tag.endswith('BPMNEdge') for e in nodes), 'Missing diagram edges'
assert any(e.tag.endswith('lane') for e in nodes), 'Missing lanes'

api = json.loads((ROOT/'data/openapi.json').read_text())
assert api['openapi'] == '3.1.1'
assert api['info']['title'] and api['info']['version']
assert api['security'] and api['components']['securitySchemes']
def walk(value):
    if isinstance(value,dict):
        if '$ref' in value:
            assert value['$ref'].startswith('#/'), 'External ref not supported by checker'
            target=api
            for part in value['$ref'][2:].split('/'):
                target=target[part.replace('~1','/').replace('~0','~')]
        if 'required' in value and isinstance(value['required'],list) and 'properties' in value:
            assert set(value['required']) <= set(value['properties'])
        for item in value.values(): walk(item)
    elif isinstance(value,list):
        for item in value: walk(item)
walk(api)
for source, published in [('data/openapi.json','site/downloads/openapi.json'),('docs/diagrams/to-be.bpmn','site/downloads/to-be.bpmn'),('docs/diagrams/to-be.svg','site/assets/to-be.svg')]:
    assert (ROOT/source).read_bytes() == (ROOT/published).read_bytes(), f'Published artefact drift: {published}'
for path,item in api['paths'].items():
    for method,operation in item.items():
        if method not in ['get','post']: continue
        assert 'responses' in operation and operation['operationId']
        for param in re.findall(r'\{([^}]+)\}',path):
            assert any(p.get('name')==param and p.get('in')=='path' and p.get('required') is True for p in operation.get('parameters',[]))
print(f'Models OK: {len(requirements)} requirements, {len(test_ids)} AC IDs, BPMN references/DI, API structure. Full schema/concurrency validation is outside this checker.')
