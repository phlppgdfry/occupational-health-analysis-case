# Integratiecontract en foutafhandeling

Voor ontwikkelaar en integratiebeheerder. [openapi.json](../../data/openapi.json) is een ontwerpcontract; geen endpoint in deze repo verwerkt echte HTTP-mutaties.

## Grens van de module

Een upstream-bron heeft aanvraag en identiteit al vastgelegd. Deze module leest administratieve aanvragen en voert expliciete commands uit: complete, schedule, cancel, reopen, outcome. Een medische module levert geen diagnoses aan de planningsmodule.

| Gegevens | Bron → doel | Trigger | Foutafhandeling |
|---|---|---|---|
| Aanvraag-ID, medewerker-ID, werkgever-ID | Bronmodule → planning | Nieuwe aanvraag | Reject onbekende identifiers; reconciliatie door bron-eigenaar |
| Tijdslots, arts, kamer, types | Rooster → planning | Goedgekeurde roosterwijziging | Reeds geboekte slots niet stil wijzigen; changebeleid nodig |
| Bevestiging / annulering | Planning → berichtendienst | Committed command | Outbox retry; geen reservering terugdraaien bij afleverfout |
| Administratieve uitkomst | Coördinator → planning | Na einde afspraak | Rol- en tijdscontrole; geen klinische payload |

## Commandsemantiek

`POST /requests/{requestId}/commands` accepteert een actie, verwachte dossier-versie, idempotentiesleutel en actievelden. Voorbeeld:

```json
{"action":"cancel","version":3,"key":"client-9e08","reason":"Medewerker verhinderd"}
```

Succes: HTTP 200 met dossier-versie en `replayed`. Fouten zijn stabiele codes met een begrijpelijke boodschap. De browserfunctie gebruikt dezelfde codes zonder HTTP-server.

| Code | Voorgesteld HTTP | Gedrag gebruiker / integratie |
|---|---:|---|
| FORBIDDEN | 403 | Geen retry; rechten laten controleren |
| NOT_FOUND | 404 | Identifiers en organisatiebereik controleren |
| STALE_VERSION | 409 | Nieuwe toestand ophalen; keuze opnieuw laten bevestigen |
| SLOT_CONFLICT | 409 | Nieuwe capaciteit ophalen; ander slot kiezen |
| KEY_REUSED | 409 | Nieuwe opdracht vereist nieuwe sleutel; niet automatisch herschrijven |
| INVALID_STATE / PAST_SLOT / TOO_EARLY | 422 | Dossierstatus en serverklok controleren |
| MISSING_DATA / REASON_REQUIRED / INVALID_TYPE / INVALID_SLOT / INVALID_OUTCOME / KEY_REQUIRED | 422 | Input corrigeren |
| Tijdelijke server- of netwerkfout | 503 / timeout | Begrensde retry met dezelfde payload en sleutel; daarna status opvragen |

De fingerprint omvat de volledige opdracht en de geverifieerde rol. In productie hoort hij ook de tenant/actor te omvatten. Na een timeout wordt dezelfde sleutel gebruikt. Een opnieuw geladen dossier-versie is een nieuwe bewuste opdracht met een nieuwe sleutel.

## Outbox en herstel

Productie: schedule/cancel maken in dezelfde transactie een outboxrecord. Worker probeert aflevering met stabiele message-ID. Bij herhaalbare fout: backoff, maximum aantal pogingen, daarna exception queue. Support controleert dossierstatus vóór replay en verzoent berichtendienst-ID met outboxstatus. De ontvanger hoort duplicaten op message-ID te herkennen.

De demo toont alleen `simulated`, zonder aflevertijd, retry of externe credentials. [Runbook](../08-handover/runbook.md) werkt het herstel uit.

Vorige: [architectuur](../04-design/architecture.md). Volgende: [teststrategie](../06-validation/test-strategy.md).
