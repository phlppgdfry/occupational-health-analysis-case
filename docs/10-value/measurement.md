# Waarde meten zonder resultaten te verzinnen

Voor opdrachtgever en module-owner. De getallen hieronder zijn illustratieve aannames voor een meetplan; er zijn geen gemeten besparingen of klantresultaten.

## Hypothese

Eén administratieve planningsbron verlaagt herstelwerk en verkort tijd tot afspraak. Eerst meten waar tijd verloren gaat: input aanvullen, een passende plek vinden, correcties, annuleringen en wachten op bevestiging. Een sneller scherm helpt niet als de brongegevens ontbreken.

De canonieke KPI-definities, eigenaars en illustratieve baseline/targets staan in [case.json](../../site/assets/case.json) en de [requirementcatalogus](../02-requirements/catalogue.md). De site presenteert ze als meetplan, niet als behaalde resultaten.

## Rekenscenario

Illustratieve aannames: 600 aanvragen per maand; 3 minuten minder administratief herstelwerk per aanvraag; interne tijdswaarde 35 euro/uur. Tijdseffect = 600 × 3 / 60 = 30 uur/maand; capaciteitswaarde = 30 × 35 = 1.050 euro/maand. Dit is vrijgekomen capaciteit, geen automatisch bespaarde loonkost.

| Minder herstelwerk per aanvraag | Vrijgekomen tijd / maand | Capaciteitswaarde tegen 35 euro/uur |
|---|---:|---:|
| 1 minuut | 10 uur | 350 euro |
| 3 minuten | 30 uur | 1.050 euro |
| 5 minuten | 50 uur | 1.750 euro |

Bij een illustratieve eenmalige bouw-/implementatiekost van 12.000 euro en 150 euro maandelijkse beheerkost ligt eenvoudige terugverdientijd bij het middenscenario op 12.000 / (1.050 - 150) = 13,3 maanden. Dit is geen offerte of voorspelling. Bij slechts 1 minuut effect: 60 maanden; bij geen aantoonbaar effect: geen terugverdientijd. De aannames moeten vóór investering worden vervangen door echte baseline en raming.

## Meetontwerp

Twee weken baseline: timestamp ontvangst, eerste volledigheidscontrole, aanvulling, bevestiging, annulering en vrijgave. Registreer herstelminuten met een kleine gecontroleerde steekproef en scheid wachtduur van actieve behandeltijd. Geen medische details in het meetbestand.

Pilot met hetzelfde team en vergelijkbaar rooster; rapporteer volume, case-mix, volledigheid en ongeplande wijzigingen. Kleine steekproeven en seizoenseffecten worden benoemd. Module-owner beoordeelt na twee weken of proceskwaliteit verbetert, niet alleen gemiddelde snelheid.

## Bijsturingscriteria

- Volledigheid verbetert niet: aanvraagformulier en broneigenaar bespreken.
- Conflictmeldingen nemen toe, maar bevestigde overlap is nul: capaciteit of roostermodel onderzoeken; bescherming niet uitschakelen.
- Annulering geeft capaciteit direct vrij, maar bevestigingsberichten lopen achter: outboxprobleem afzonderlijk oplossen.
- Plannerwerk neemt niet af: observatie met key users; niet achteraf de rekenaannames aanpassen om een positief resultaat te krijgen.

Vorige: [governance](../09-governance/governance.md). Terug naar [case study](../../CASE_STUDY.md).
