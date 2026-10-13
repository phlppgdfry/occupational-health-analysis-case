# Van losse lijsten naar controleerbare afspraken

Aster Preventie is een fictieve preventiedienst. Deze case werkt één administratieve module uit: een aanvraag volledig maken, passende capaciteit boeken, annuleren en bewust herplannen. Geen klinische dossiers of echte klantgegevens worden gebruikt.

## 1. Het probleem begrijpen

De planner krijgt een aanvraag zonder werkpost, maar wil toch alvast een plek vasthouden. Een coördinator ziet capaciteit verloren gaan aan ongeschikte reserveringen. Na annulering blijft de plek soms in een andere lijst staan. De fictieve medewerker wil een nieuwe datum kunnen afstemmen.

De analistenopgave is de tegenstelling te verhelderen en beslisbare regels te maken. [Discovery](docs/01-discovery/discovery.md) legt rollen, vragen, spanningen en open punten vast. Geen interview wordt als werkelijk uitgevoerd voorgesteld.

## 2. Behoeften vertalen

De [catalogus](docs/02-requirements/catalogue.md) bevat functionele en niet-functionele requirements, user stories, acceptatiecriteria, eigenaar, prioriteit, regel en test. De centrale keten is P-03 → FR-04 → R-04 → AC-15 → K-04: annulering geeft capaciteit vrij en bewaart de oude afspraak in de historie.

De [specificatie](docs/02-requirements/functional-spec.md) definieert input, precondities, stappen, foutcodes en postcondities. Dat geeft ontwikkelaar en tester een gedeelde betekenis van “klaar”.

## 3. Modelleren

Het [proces en BPMN](docs/03-processes/processes.md) tonen volledigheidscontrole, resourceconflict en herplanning. De state machine voorkomt dat ieder scherm willekeurig een status schrijft. [Data en architectuur](docs/04-design/architecture.md) scheiden actieve reservering en historie, en onderscheiden browserdemo van productieontwerp.

## 4. De afwegingen

Eerst volledig maken voorkomt dat capaciteit zonder bruikbare administratieve gegevens bezet wordt ([ADR-01](docs/adr/01-completeness.md)). Middelen en tijdsintervallen toetsen voorkomt dat een andere slot-ID dezelfde arts dubbel boekt ([ADR-02](docs/adr/02-capacity.md)). Heropenen en opnieuw plannen zijn afzonderlijke keuzes ([ADR-03](docs/adr/03-reschedule.md)).

De demo blijft statisch zodat reviewers de case kunnen openen. Die keuze draagt ook expliciete beperkingen ([ADR-04](docs/adr/04-prototype.md)).

## 5. Werkend en controleerbaar

Het [prototype](https://phlppgdfry.github.io/occupational-health-analysis-case/demo/?tour) gebruikt dezelfde [domeinregels](site/assets/domain.mjs) als de [acceptatietests](tests/domain.test.mjs). De achtstappenrondleiding brengt probleem, keuzes, uitvoering, resultaat en beperkingen samen. Berichten zijn gesimuleerd en de demoklok staat vast.

Tests dekken onder andere ontbrekende gegevens, overlap voor arts/kamer/medewerker, tijdgrenzen, annulering, heropening, versies, retries en rollen. Browsertests tonen de daadwerkelijke klikflow, opslag, filters, tour en mobiele indeling. De repo bevat geen echte backendconcurrencytest; die is een expliciete voorwaarde in het productieplan.

## 6. Valideren en bijsturen

Het [UAT-plan](docs/06-validation/uat.md) laat key users taakgericht beoordelen. Fictieve defecten illustreren hoe een analist een ambiguïteit naar een nieuwe regel en test trekt. [CR-01](docs/07-delivery/change-request.md) analyseert de vraag naar een wachtlijst: automatisch boeken wordt niet ongemerkt toegevoegd, maar uitgewerkt als beleidskeuze met impact en alternatieven.

## 7. Overdragen en meten

[Rollout](docs/07-delivery/rollout.md) behandelt mapping uit losse lijsten, reconciliatie, cutover, rollback en go/no-go. De [handleiding](docs/08-handover/user-guide.md) helpt de planner taken uitvoeren; het [runbook](docs/08-handover/runbook.md) voorkomt dat een ontbrekende bevestiging leidt tot een tweede boeking.

[Waarde](docs/10-value/measurement.md) is een hypothese met meetplan en gevoeligheidsanalyse. Geen besparing of verbetering wordt als behaalde klantuitkomst gepresenteerd.

## Grenzen van het bewijs

De case toont een analyseontwerp en een getest browserprototype. Ze bewijst geen drie jaar professionele IT-ervaring, talenkennis, medische expertise of succesvolle productie-implementatie. Werkelijk begrip van de kandidaat moet in een gesprek en eigen aanpassingen zichtbaar worden.

Begin bij [START-HERE](START-HERE.md), bekijk [EVIDENCE](EVIDENCE.md), of open de [demo met rondleiding](https://phlppgdfry.github.io/occupational-health-analysis-case/demo/?tour).
