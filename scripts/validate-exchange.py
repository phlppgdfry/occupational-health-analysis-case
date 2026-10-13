#!/usr/bin/env python3
"""Optional full BPMN XSD validation using official OMG schema downloads."""
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.request import urlopen
from lxml import etree

ROOT=Path(__file__).resolve().parent.parent
with TemporaryDirectory(prefix='aster-bpmn-') as folder:
    base=Path(folder)
    for name in ['BPMN20','BPMNDI','Semantic','DI','DC']:
        with urlopen(f'https://www.omg.org/spec/BPMN/20100501/{name}.xsd',timeout=30) as response:
            (base/f'{name}.xsd').write_bytes(response.read())
    schema=etree.XMLSchema(etree.parse(str(base/'BPMN20.xsd')))
    schema.assertValid(etree.parse(str(ROOT/'docs/diagrams/to-be.bpmn')))
print('Official OMG BPMN XML Schema validation passed. This validates syntax, not execution semantics.')
