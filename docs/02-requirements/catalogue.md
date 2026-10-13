# Requirements en traceerbaarheid

Voor analist, ontwikkelaar en tester. Gegenereerd uit `site/assets/case.json`; wijzig de bron en voer `python3 scripts/generate-catalogue.py` uit.

Alle behoeften en beleidsregels zijn fictieve case-aannames. De labels R-01 t/m R-10 verwijzen naar gedrag in de gedeelde domeinfunctie. Acceptatietests staan in [domain.test.mjs](../../tests/domain.test.mjs).

## Traceerbaarheidsmatrix

| Behoefte | Requirement | Prioriteit | Eigenaar | Regel | Acceptatietests | Meetplan |
|---|---|---|---|---|---|---|
| P-01 | FR-01 | Must | Planner | R-01 | AC-01, AC-02, AC-03 | K-01 |
| P-02 | FR-02 | Must | Module-owner | R-02 | AC-04, AC-10, AC-18, AC-22 | K-02 |
| P-02 | FR-03 | Must | Module-owner | R-03 | AC-05, AC-06, AC-07, AC-08, AC-09 | K-03 |
| P-03 | FR-04 | Must | Planner | R-04 | AC-14, AC-15, AC-24 | K-04 |
| P-03 | FR-05 | Must | Planner | R-05 | AC-16, AC-25 | K-04 |
| P-04 | FR-06 | Should | Coördinator | R-06 | AC-19, AC-20, AC-21 | K-05 |
| P-05 | NFR-01 | Must | Tech lead | R-07 | AC-11 | K-03 |
| P-05 | NFR-02 | Must | Tech lead | R-08 | AC-12, AC-13, AC-23 | K-03 |
| P-06 | NFR-03 | Must | Module-owner | R-09 | AC-17, AC-20 | K-06 |
| P-06 | NFR-04 | Must | Module-owner | R-10 | AC-03, AC-04, AC-15 | K-06 |

## Stories en acceptatie

### FR-01 · Onvolledige aanvragen zichtbaar houden en planning blokkeren

Als planner wil ik ontbrekende werkpostgegevens zien, zodat ik de aanvrager gericht kan laten aanvullen.

**Acceptatie:** Een ontbrekende of lege werkpost houdt het dossier Onvolledig; na geldige aanvulling wordt het Klaar.

**Trace:** P-01 → FR-01 → R-01 → AC-01, AC-02, AC-03 → K-01

### FR-02 · Een passend toekomstig tijdslot reserveren

Als planner wil ik een volledig dossier aan een passend tijdslot koppelen, zodat een afspraak ontstaat.

**Acceptatie:** Alleen Klaar kan naar Gepland; het tijdslot bestaat, ligt in de toekomst en ondersteunt het onderzoekstype.

**Trace:** P-02 → FR-02 → R-02 → AC-04, AC-10, AC-18, AC-22 → K-02

### FR-03 · Overlap voor arts, kamer en medewerker voorkomen

Als planner wil ik een conflictmelding bij overlappende capaciteit, zodat ik niemand dubbel boek.

**Acceptatie:** Tijdsintervallen zijn halfopen [start,einde); elke overlap met dezelfde arts, kamer of medewerker wordt geweigerd.

**Trace:** P-02 → FR-03 → R-03 → AC-05, AC-06, AC-07, AC-08, AC-09 → K-03

### FR-04 · Annuleren met reden en capaciteit vrijgeven

Als planner wil ik een toekomstige afspraak met reden annuleren, zodat de capaciteit weer beschikbaar wordt.

**Acceptatie:** De status wordt Geannuleerd, de actieve slotkoppeling verdwijnt en de oorspronkelijke afspraak blijft in het activiteitenlog.

**Trace:** P-03 → FR-04 → R-04 → AC-14, AC-15, AC-24 → K-04

### FR-05 · Expliciet heropenen voor herplanning

Als planner wil ik een geannuleerd dossier heropenen, zodat ik een nieuwe afspraak bewust kan kiezen.

**Acceptatie:** Geannuleerd wordt Klaar zonder reservering; een nieuwe planningsactie is verplicht.

**Trace:** P-03 → FR-05 → R-05 → AC-16, AC-25 → K-04

### FR-06 · Administratieve uitkomst registreren

Als coördinator wil ik na afloop Afgerond of Niet verschenen registreren, zodat opvolging mogelijk is.

**Acceptatie:** Alleen de coördinator kan na het einde van een geplande afspraak een administratieve uitkomst registreren.

**Trace:** P-04 → FR-06 → R-06 → AC-19, AC-20, AC-21 → K-05

### NFR-01 · Verouderde wijzigingen afwijzen

Als planner wil ik een melding wanneer iemand hetzelfde dossier heeft gewijzigd, zodat ik geen wijzigingen overschrijf.

**Acceptatie:** De verwachte versie moet gelijk zijn aan de huidige versie; mislukking wijzigt niets.

**Trace:** P-05 → NFR-01 → R-07 → AC-11 → K-03

### NFR-02 · Herhaalde opdrachten zonder extra effect verwerken

Als integratiebeheerder wil ik een identieke opdracht veilig opnieuw aanbieden, zodat retries geen dubbele afspraak of melding maken.

**Acceptatie:** Dezelfde sleutel en opdracht leveren geen nieuwe mutatie; een andere opdracht met dezelfde sleutel wordt geweigerd.

**Trace:** P-05 → NFR-02 → R-08 → AC-12, AC-13, AC-23 → K-03

### NFR-03 · Acties per rol beperken

Als module-owner wil ik dat iedere wijziging de rol controleert, zodat alleen bevoegde rollen muteren.

**Acceptatie:** Een waarnemer kan geen wijziging uitvoeren; uitkomstregistratie vereist de coördinatorrol. De UI-rolkiezer is uitsluitend simulatie.

**Trace:** P-06 → NFR-03 → R-09 → AC-17, AC-20 → K-06

### NFR-04 · Wijzigingen herleidbaar vastleggen

Als module-owner wil ik weten welke actie is uitgevoerd, zodat support het dossierverloop kan reconstrueren.

**Acceptatie:** Elke geslaagde wijziging verhoogt de versie en schrijft een gebeurtenis met dossier, actie, rol, tijd en vorige/nieuwe slotkoppeling.

**Trace:** P-06 → NFR-04 → R-10 → AC-03, AC-04, AC-15 → K-06

## KPI-definities: illustratief meetplan

Geen getal hieronder is een gemeten resultaat. Baseline en targets zijn illustratieve aannames die vóór een echte pilot gevalideerd moeten worden.

| KPI | Definitie | Baseline | Doel | Eigenaar / beperking |
|---|---|---|---|---|
| K-01 · Volledigheid bij eerste beoordeling | Aanvragen die bij eerste controle volledig zijn / alle nieuwe aanvragen | 62% | 85% | Planner · Illustratieve aanname; eerst 2 weken baseline meten. |
| K-02 · Tijd tot afspraak | Mediaan uren van ontvangen aanvraag tot bevestigde afspraak, met apart rapport voor ontbrekende gegevens | 48 uur | 24 uur | Module-owner · Illustratieve aanname; werkdagen en bron-tijdstippen valideren. |
| K-03 · Capaciteitsconflicten | Bevestigde overlappende boekingen per 100 bevestigingen | 3 / 100 | 0 / 100 | Tech lead · Illustratief doel; unit tests bewijzen geen productieconcurrency. |
| K-04 · Vrijgave na annulering | Tijd tussen bevestigde annulering en opnieuw reserveerbare capaciteit | 30 minuten | Direct na commit | Planner · Illustratieve aanname; notificatievertraging apart meten. |
| K-05 · Opvolging niet verschenen | Niet-verschenen afspraken met administratieve opvolging binnen 1 werkdag / alle niet-verschenen afspraken | Onbekend | 95% | Coördinator · Illustratief doel; geen automatisch nieuwe afspraak. |
| K-06 · Herleidbaarheid | Geslaagde wijzigingen met volledig activiteitenrecord / alle geslaagde wijzigingen | Onbekend | 100% | Module-owner · Illustratief doel; productie vereist beschermde opslag en controle op retentie. |

## Niet-functionele productievoorwaarden

Deze requirements beschrijven geteste sequentiële domeinlogica. Echte identiteit, tenantautorisatie, transactionele concurrency en beschermde auditopslag blijven productievoorwaarden, beschreven in [architectuur](../04-design/architecture.md) en [privacy](../04-design/privacy-security.md).

Aanvullende kwaliteitsdoelen: toetsenbordbediening, leesbare labels en geen horizontale pagina-overflow op 375 px; browserchecks toetsen dit deels. Voor een echte omgeving: performancebudget en verwachte piekbelasting met productteam afspreken. Er is geen fictieve SLA als bewezen prestatie toegevoegd.

Vorige: [discovery](../01-discovery/discovery.md). Volgende: [functionele specificatie](functional-spec.md).
