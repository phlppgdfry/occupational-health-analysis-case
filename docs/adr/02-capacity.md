# ADR-02 · Interval en middelen bepalen capaciteit

Status: gekozen voor de case; production concurrency is een afzonderlijke bouwvoorwaarde.

## Context en opties

Uniciteit van slot-ID voorkomt geen overlap tussen twee verschillende slots met dezelfde arts. Alleen artscontrole mist een gedeelde kamer en een medewerker op twee plekken. Een volledige constraint moet tijd en de relevante middelen meenemen.

Opties: (1) unique slot-ID; (2) tijdsinterval per arts; (3) interval per arts, kamer en medewerker. Optie 3 is gekozen. Intervallen zijn halfopen: einde 09:30 en start 09:30 overlappen niet. Overlap bestaat als `startA < endB` en `startB < endA`.

## Implementatiebewijs

R-03 in [domain.mjs](../../site/assets/domain.mjs), AC-05 t/m AC-09. De tests toetsen dezelfde slot-ID, andere slot-ID, gedeelde arts, kamer, medewerker en aansluitende afspraken. Tijd wordt in UTC vergeleken, lokaal weergegeven in Europe/Brussels.

## Productieconsequentie

Twee verschillende dossiers kunnen dezelfde vrije capaciteit tegelijk lezen. Een versienummer op één dossier verhindert dat niet. Productie vereist transactionele resourcecontrole of een passende constraint/lockstrategie. Backendtest: twee gelijktijdige commands, maximaal één succes. Deze repo claimt die garantie niet.

Herzien bij andere duur, reistijd, voorbereidingstijd of meerdere toegestane gelijktijdige activiteiten. Die beleidsregels moeten eerst door roosterbeheer gevalideerd worden.

Zie [architectuur](../04-design/architecture.md) en [teststrategie](../06-validation/test-strategy.md).
