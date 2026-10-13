# Validatie van uitwisselbestanden

De lokale eindcontrole heeft twee niveaus gebruikt.

## Kerncheck zonder extra packages

`python3 scripts/check-models.py` controleert traceability, catalogusdrift, BPMN-ID's/referenties/DI en OpenAPI-basisstructuur. Dit is geen volledige schemavalidator.

## Volledige formatspecificaties

- BPMN is succesvol gevalideerd tegen de officiële OMG `BPMN20.xsd`, inclusief BPMNDI, Semantic, DI en DC. De schema's worden tijdelijk gedownload en niet in deze repo gekopieerd. De controle corrigeerde de volgorde van incoming/outgoing-elementen en eventdefinitions.
- OpenAPI 3.1.1 is succesvol gevalideerd met Redocly CLI **2.62.1**. De licentiewaarschuwing is opgelost door de documentatielicentie in het contract op te nemen.

Reproduceren:

```sh
python3 -m pip install -r requirements-validation.txt
python3 scripts/validate-exchange.py
npx --yes @redocly/cli@2.62.1 lint data/openapi.json
```

Deze checks vereisen netwerktoegang voor de officiële schema's en de CLI. XSD-validatie controleert syntax; ze bewijst geen uitvoerbaarheid, procesbeleid of capaciteitstransacties. Het API-contract is een ontwerp, geen server.

De gedownloade publicatiebestanden (`site/downloads/openapi.json` en `to-be.bpmn`) zijn identiek aan de bron. Modelwijzigingen worden met `scripts/build-models.py` gemaakt; kopieer de nieuwe bronnen daarna naar `site/downloads/`.
