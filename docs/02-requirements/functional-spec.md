# Functionele specificatie: annulering en herplanning

Voor ontwikkelaar en tester. Deze specificatie werkt P-03 volledig uit; [catalogus](catalogue.md) bevat de overige requirements.

## FS-01 · Annulering

**Trigger:** planner kiest Afspraak annuleren op een gepland dossier. **Doel:** het dossier blijft bewaard en de capaciteit kan opnieuw geboekt worden. **Beleidsbeslisser:** module-owner. **Referenties:** FR-04, R-04, ADR-03, AC-14/15/24, K-04.

Precondities: bevoegde rol; huidige status `scheduled`; dezelfde dossier-versie als in de gelezen versie; afspraakstart later dan systeemklok; niet-lege reden van maximaal 160 tekens.

| Stap | Systeemgedrag | Postconditie |
|---|---|---|
| 1 | Valideer rol en idempotentiesleutel | Fout geeft geen wijziging |
| 2 | Zoek dossier en toets verwachte versie | Verouderde opdracht wordt afgewezen |
| 3 | Toets status, tijdsgrens en reden | Geen annulering na aanvang |
| 4 | Verwijder actieve slotkoppeling; zet status `cancelled` | Tijdslot kan opnieuw gebruikt worden |
| 5 | Verhoog versie; schrijf gebeurtenis met vorige slot-ID | Historie blijft te reconstrueren |
| 6 | Maak outboxrecord voor annulering | In de demo uitsluitend status `simulated` |

Productie-eis: stappen 4–6 horen bij dezelfde transactie. Een notificatiefout mag de annulering niet terugdraaien; retries gebeuren via de outboxworker. De browser laat alleen het functionele mechanisme zien.

## FS-02 · Herplanning

**Trigger:** planner kiest Heropenen voor herplanning op een geannuleerd dossier. **Referenties:** FR-05, R-05, AC-16, ADR-03.

1. `cancelled` → `ready`, zonder slotkoppeling; versie en gebeurtenis worden bijgewerkt.
2. Planner kiest expliciet een toekomstig passend tijdslot.
3. De gewone planningsregels gelden opnieuw, inclusief resourceconflict en versiecontrole.
4. Een nieuwe bevestiging wordt gesimuleerd. De oorspronkelijke afspraak blijft alleen in de historie.

**Geen shortcut:** een afgesloten dossier (`completed` / `no_show`) kan niet via heropenen of plannen worden gewijzigd. Een nieuw onderzoek heeft een nieuwe aanvraag nodig. Correctiebeleid voor afgesloten dossiers is een open productiepunt.

## Beslistabel

| Actie | Status | Tijd | Gegevens | Verwacht |
|---|---|---|---|---|
| Annuleren | Gepland | Voor start | Reden gevuld | Geannuleerd; slot vrij |
| Annuleren | Gepland | Start of later | Reden gevuld | PAST_SLOT |
| Annuleren | Gepland | Voor start | Reden leeg | REASON_REQUIRED |
| Annuleren | Klaar | — | — | INVALID_STATE |
| Heropenen | Geannuleerd | — | — | Klaar; geen slot |
| Heropenen | Afgerond | — | — | INVALID_STATE |
| Plannen | Klaar | Toekomst | Slot passend en vrij | Gepland |
| Plannen | Klaar | Toekomst | Overlap arts/kamer/medewerker | SLOT_CONFLICT |

## Voorbeeld in Given/When/Then

```gherkin
Scenario: AC-15 vrijgave na annulering
  Given OH-003 is gepland op S-01
  And OH-002 is klaar en kan het onderzoekstype op S-01 uitvoeren
  When de planner OH-003 annuleert met reden "Medewerker verhinderd"
  Then OH-003 is geannuleerd zonder actieve slotkoppeling
  And de gebeurtenis vermeldt S-01 als vorige slot-ID
  When de planner OH-002 plant op S-01
  Then OH-002 is gepland op S-01
```

Uitvoerbare versie: [domain.test.mjs](../../tests/domain.test.mjs). AC-15 is de directe acceptatietest; de Gherkin is een leesbare beschrijving en wordt niet door een afzonderlijke Gherkin-runner uitgevoerd.

Vorige: [catalogus](catalogue.md). Volgende: [processen en toestand](../03-processes/processes.md).
