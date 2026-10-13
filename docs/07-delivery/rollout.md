# Implementatie, migratie en pilot

Voor module-owner, releasecoördinator en support. Dit is een voorgesteld implementatieplan voor een echte omgeving; de case levert een prototype en ontwerp.

## Gefaseerde oplevering

| Fase | Output | Beslissing / eigenaar |
|---|---|---|
| Discovery | Scope, open vragen, administratieve velden, rolmatrix | Module-owner keurt beleid goed |
| Refinement | Stories, uitzonderingen, API, resource-lockstrategie | Tech lead en tester beoordelen bouwbaarheid |
| Prototype-review | Planner loopt kernflow en foutpaden | Key user bevestigt werkbaarheid |
| Backendbouw | Transacties, echte identiteit, API, outboxworker | Tech lead levert integratietests |
| Pilot | Eén planningsteam en afgebakend rooster | Module-owner go/no-go |
| Uitbreiding | Extra teams na evaluatie | Service owner beslist op meetgegevens |

Pilotduur: twee weken als illustratieve planningsaanname. Geen bewijs dat een echte implementatie binnen twee weken kan.

## Migratie uit losse lijsten

Bronkolommen: legacy aanvraag-ID, medewerker-ID, werkgever-ID, werkpost, type, start/einde, arts, kamer, status. Controleer identifiers tegen bronsystemen. Geen match op naam alleen. Dubbele aanvragen en overlappende reserveringen gaan naar een exceptionlijst; niets stil samenvoegen.

Mapping: ontbrekende werkpost → Onvolledig; complete ongeplande aanvraag → Klaar; bevestigde toekomstige afspraak → Gepland; geregistreerde annulering → Geannuleerd. Ambigue statussen en verstreken afspraken vragen menselijke beoordeling. Historie uit de bron wordt gemarkeerd als migratiebron, niet alsof de nieuwe app de oorspronkelijke actie uitvoerde.

Reconciliatie: aantallen per status vóór/na, aantal actieve reserveringen, lijst onverwerkte records, overlappende capaciteit = 0 na gecontroleerde correctie. Key user tekent exceptionafhandeling af. Dry-run en herhaalbare import-ID voorkomen dubbele migratie.

## Cutover en rollback

1. Bevries roosterwijzigingen gedurende afgesproken venster; leg eigenaar en eindtijd vast.
2. Exporteer bron en maak verifieerbare back-up.
3. Importeer, reconcilieer en controleer actieve capaciteit.
4. Voer smoke-tests uit met één nieuwe afspraak, annulering en outboxrecord.
5. Module-owner geeft vrij; communiceer één actieve planningsbron.

Rollback bij verkeerde reserveringen of toegangsfout: stop nieuwe mutaties, bewaar events/outbox vanaf cutover, bepaal welke afspraken al bevestigd zijn, herstel bron met bewuste reconciliatie. Alleen een database terugzetten kan inmiddels verstuurde bevestigingen niet ongedaan maken. Support communiceert wijzigingen via eigenaar; geen automatische massale annulering.

## Go/no-go

- Alle Must-acceptatiecriteria en echte concurrencytests geslaagd.
- Autorisatie op organisatie en rol negatief getest.
- Geen open S1/S2; bronmapping en migratiereconciliatie goedgekeurd.
- Roosterbeheer, outboxmonitoring, runbook en supporteigenaren beschikbaar.
- Privacy- en retentiebeslissingen vastgelegd door bevoegde eigenaar.
- Key users kunnen de kernflow zonder begeleiding uitvoeren.

## Hypercare

Dagelijks tijdens pilot: conflictmeldingen, onvolledige aanvragen, outboxouderdom en correctieverzoeken bekijken. Beleidstwijfel naar module-owner; codefout naar development; identifierfout naar bronbeheer. Aan het einde: gemeten baseline en pilotresultaat vergelijken, inclusief tijd die aan gegevensaanvulling wordt besteed.

Vorige: [UAT](../06-validation/uat.md). Volgende: [handleiding](../08-handover/user-guide.md).
