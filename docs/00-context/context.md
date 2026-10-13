# Context, scope en aannames

Dit document begrenst de fictieve case voor opdrachtgever, analist en ontwikkelaar. Het beschrijft een denkbeeldige Belgische preventiedienst; alle organisaties, processen, cijfers en personen zijn casemateriaal.

## Probleem en doel

Aster Preventie verwerkt administratieve aanvragen voor arbeidsgeneeskundige afspraken. Een planner ontvangt een aanvraag van een werkgever, controleert de gegevens en reserveert een afspraak met een arts en kamer. De huidige werkwijze gebruikt losse lijsten en e-mail. Werkpostgegevens ontbreken soms, capaciteit wordt dubbel aangeboden en een geannuleerde plek blijft op de lijst bezet.

De case ontwerpt één module: ontvangen aanvraag → volledigheid → planning → annulering → expliciete herplanning → administratieve afsluiting. Het prototype start met vier bestaande aanvragen; invoer van nieuwe aanvragen is een upstream-integratie in het contract, geen gebouwd scherm.

## Scopegrenzen

| Binnen deze case | Afzonderlijke module of latere fase |
|---|---|
| Administratieve werkpost en onderzoekstype | Klinisch dossier, diagnose, medisch advies |
| Beschikbare afspraken en resourceconflicten | Artsenrooster beheren, complexe duurvarianten |
| Annulering en bewuste herplanning | Automatisch herboeken of wachtlijstselectie |
| Administratieve uitkomst | Medische uitslag, geschiktheidsbeoordeling |
| Gedeelde domeinregels met tests | Productiebackend, echte identiteit, verzonden berichten |

## Aannames die eerst gevalideerd moeten worden

| ID | Aanname | Waarom nodig | Validator / beslismoment |
|---|---|---|---|
| A-01 | Werkpost en type zijn administratief vereist vóór reserveren | Bepaalt R-01 | Module-owner, discovery |
| A-02 | Demo-afspraken duren 30 minuten | Houdt capaciteitsmodel afgebakend | Roosterbeheerder, refinement |
| A-03 | Een arts, kamer en medewerker kunnen niet gelijktijdig in twee afspraken voorkomen | Bepaalt R-03 | Coördinator, discovery |
| A-04 | Herplanning vereist een expliciete keuze | Vermijdt stilzwijgende afspraak | Planner en eindgebruiker, prototype-review |
| A-05 | Een begonnen afspraak wordt niet geannuleerd maar administratief afgesloten | Bepaalt tijdsgrens R-04/R-06 | Module-owner, refinement |
| A-06 | Labels DEMO-001 t/m DEMO-004 zijn fictieve identifiers | Geen echte persoonsgegevens | Review vóór publicatie |
| A-07 | Berichten volgen na een geslaagde transactie | Ontkoppelt verzending van reservering | Tech lead, ontwerp-review |

De case stelt geen wettelijke onderzoeksplicht of frequentie vast. Een bevoegde domeineigenaar moet de werkelijke beleidsregels goedkeuren. In deze case zijn de types `periodic` en `intake` enkel administratieve demo-opties.

## Data, bronnen en bijdrage

Seed-data staat in [domain.mjs](../../site/assets/domain.mjs). Requirements, beslissingen en KPI-definities staan in [case.json](../../site/assets/case.json). Alle data is voor deze case gegenereerd. Er zijn geen gegevens van een klant, werkgever of preventiedienst gebruikt. [Bronnen en licenties](sources.md) beschrijft standaarden en afhankelijkheden.

De repository toont analysestukken en een werkend browserprototype. Dat toont een uitgewerkte case, geen klantimplementatie of zelfstandig bewezen professionele ervaring. Persoonlijke sollicitatiegegevens staan buiten deze repo.

## Beperkingen

- De demoklok staat vast op 13 oktober 2026, 10:00 Europe/Brussels. Zo blijven scenarios reproduceerbaar.
- Browseropslag is leesbaar en wijzigbaar door de gebruiker. De rolkiezer is simulatie.
- Tests toetsen sequentiële domeinregels; geen database-transacties, distributed locks of echte gelijktijdige gebruikers.
- De outbox is een gegevensstructuur met status `simulated`; er wordt niets verstuurd.
- Interviews, UAT-defecten en beslisnotities zijn expliciet fictieve oefenartefacten.

Volgende stap: [discovery en stakeholders](../01-discovery/discovery.md).
