# Bronnen en licenties

Dit register legt de herkomst vast voor reviewers. De case gebruikt zelfgemaakte fictieve data en geen medische of juridische beslisregels uit externe publicaties.

| Bron / artefact | Gebruik | Herkomst en status |
|---|---|---|
| `site/assets/domain.mjs` | Vier aanvragen, vier afspraken, vaste klok | Zelf gegenereerde fictieve data |
| `site/assets/case.json` | Requirements, ADR-samenvattingen, KPI's | Canonieke case-inhoud |
| [OMG BPMN 2.0.2](https://www.omg.org/spec/BPMN/2.0.2/) | Procesnotatie en uitwisselbestand | Officiële specificatie; model is niet executable |
| [OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html) | API-contract als ontwerp | Officiële specificatie; contract is geen werkende server |
| [Node.js test runner](https://nodejs.org/api/test.html) | Ingebouwde testomgeving | Geen runtime dependency toegevoegd |
| [Playwright](https://playwright.dev/) | Browseracceptatie en screenshots | Alleen development dependency, exact gepind in package-lock |
| `docs/design/concept.png` | Ontwerpreferentie | Ingebouwde Image Gen; geen UI als screenshot geleverd |
| Sollicitatie-playbooktemplate | Linkchecker, tourbasis, oorspronkelijke structuur | Eigen persoonlijke bibliotheek; herschreven case-inhoud |

Er zijn geen externe fonts, trackers, iconsets of patiëntendatasets. SVG-diagrammen en favicon zijn code-native. Alle implementatiecodes, scripts en workflows vallen onder [MIT](../../LICENSE). Documentatie, diagrammen, concept en fictieve data vallen onder [CC BY 4.0](../../LICENSE-DOCS.md). De officiële standaarden zijn alleen gelinkt, niet gekopieerd.

Bij verschillen zijn `case.json` voor de requirementcatalogus en `domain.mjs` voor uitvoerbaar gedrag de bronnen. `scripts/generate-catalogue.py` maakt de afgeleide catalogus; CI controleert op drift.

Terug: [context](context.md). Volgende: [discovery](../01-discovery/discovery.md).
