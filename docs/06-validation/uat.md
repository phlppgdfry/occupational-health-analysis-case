# UAT-plan en sign-off

Voor planner, coördinator en module-owner. Dit zijn uitvoerbare reviewscenario's; er is geen echte klant-UAT uitgevoerd. Resultaatkolom wordt door de key user ingevuld in een echte pilot.

## Voorbereiding

Reset demo, rol Planner, vaste demoklok 13 oktober 2026. Gebruik uitsluitend de DEMO-identifiers. Controleer na iedere actie status, slot, versie en activiteiten. Browserdemo beoordeelt werkbaarheid; backendconcurrency vereist een andere omgeving.

| ID | Given / When | Then | Requirement / AC |
|---|---|---|---|
| UAT-01 | OH-001 mist werkpost; probeer te plannen | Geen boekbare actie; Onvolledig blijft zichtbaar | FR-01 / AC-01 |
| UAT-02 | OH-001; laat werkpost leeg | Formulier vraagt invoer; directe domeinopdracht geeft MISSING_DATA | FR-01 / AC-02 |
| UAT-03 | OH-001; vul Montage in | Klaar, versie 2, gebeurtenis toegevoegd | FR-01 / AC-03 |
| UAT-04 | OH-002 is Klaar; boek S-02 | Gepland, één gesimuleerde bevestiging | FR-02 / AC-04 |
| UAT-05 | S-01 bezet door OH-003 | Geen boekbare actie; directe domeinopdracht geeft SLOT_CONFLICT | FR-03 / AC-05 |
| UAT-06 | Intake OH-002; S-03 alleen periodiek | Slot toont Ander onderzoekstype | FR-02 / AC-10 |
| UAT-07 | Gepland OH-003; annuleer zonder reden | Formulier vraagt invoer; geen wijziging | FR-04 / AC-14 |
| UAT-08 | OH-003; annuleer met Medewerker verhinderd | Geannuleerd; S-01 opnieuw beschikbaar; historie bewaart S-01 | FR-04 / AC-15 |
| UAT-09 | OH-004 geannuleerd; heropen | Klaar zonder afspraak | FR-05 / AC-16 |
| UAT-10 | Heropend OH-004; boek S-04 | Gepland op nieuwe datum; aparte gebeurtenis | FR-05 / AC-16 |
| UAT-11 | Schakel naar Waarnemer | Leesbaar; geen muterende actie beschikbaar | NFR-03 / AC-17 |
| UAT-12 | Zoek UNKNOWN | Duidelijke lege toestand, geen verkeerde selectie in lijst | Browseracceptatie |
| UAT-13 | Maak wijziging en herlaad pagina | Wijziging behouden in dezelfde browser | Browseracceptatie |
| UAT-14 | Open `demo/?tour` | Acht stappen; terug/volgende/sluiten werken | Browseracceptatie |
| UAT-15 | Open op 375 px; loop aanvraag → planning | Geen horizontale pagina-overflow; controles bereikbaar | Browseracceptatie |
| UAT-16 | Twee planners hebben verschillende dossier-versies | STALE_VERSION; refresh en nieuwe bewuste opdracht | NFR-01 / AC-11, echte backend vereist |
| UAT-17 | Timeout na succesvolle cancel; identieke retry | Geen tweede gebeurtenis of bericht | NFR-02 / AC-12, echte backend vereist |
| UAT-18 | Coördinator registreert uitkomst vóór / na einde | TOO_EARLY vóór einde; Afgerond/Niet verschenen na einde | FR-06 / AC-19/21, domeintest met andere klok |

## Fictief defectlog als analyse-oefening

| ID | Reproductie | Ernst / prioriteit | Analyse en verwacht herstel |
|---|---|---|---|
| DEF-01 | Twee slot-ID's delen dezelfde arts en overlappen | S1 / P1 | ID-uniqueness mist interval; R-03 met AC-06 toegevoegd. Dit is een oefenvoorbeeld, geen gemeten klantincident. |
| DEF-02 | Annulering verwijdert ook historie van oorspronkelijke afspraak | S2 / P1 | Actieve reservering en historie scheiden; previousSlotId in audit, AC-15. |
| DEF-03 | Nieuwe datum wordt automatisch geboekt na annulering | S2 / P2 | Beleidsconflict met medewerker; aparte reopen en schedule, ADR-03. |

## Sign-offtemplate

Scopeversie: ____; omgeving/build: ____; uitvoerdatum: ____; geteste UAT-ID's: ____; afwijkingen en eigenaar: ____; resterende risico's geaccepteerd door: ____; module-owner: ____; planner-key-user: ____; coördinator: ____.

**Huidige status:** geen echte key-user-sign-off; geen productie-go. De geautomatiseerde repo-checks worden apart gerapporteerd.

Vorige: [strategie](test-strategy.md). Volgende: [pilot en implementatie](../07-delivery/rollout.md).
