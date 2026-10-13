# Eigenaarschap, prioriteiten en risico's

Voor de module-owner. Een analist faciliteert en documenteert keuzes; de eigenaar bepaalt beleid en accepteert resterend risico.

## RACI

| Activiteit | Analist | Module-owner | Planner/key user | Tech lead | Privacyverantwoordelijke |
|---|---|---|---|---|---|
| Behoeften en uitzonderingen uitwerken | R | A | C | C | C |
| Prioriteit en modulebeleid | C | A/R | C | C | C |
| Functionele specificatie | R | A | C | C | C |
| Transactioneel ontwerp en beveiliging | C | C | I | A/R | C |
| UAT-scenario's | R | A | R | C | I |
| Privacyvoorwaarden | C | C | I | R | A |
| Go-live | C | A | C | R | C |

R = uitvoerend; A = eindverantwoordelijk; C = geraadpleegd; I = geïnformeerd. De analist is geen vervanger voor medische, technische of privacybeslissers.

## RAID

| ID / soort | Onderwerp | Impact | Maatregel / eigenaar |
|---|---|---|---|
| RK-01 risico | Onvolledige brondata | Geen passende afspraak | Volledigheidsregel, exceptionlijst; planner |
| RK-02 risico | Gelijktijdige reserveringen | Dubbele boeking | Resourcecontrole in transactie; tech lead |
| RK-03 risico | Vrije tekst bevat medische informatie | Onnodige blootstelling | Beheerde redenen en minimisatie; privacyverantwoordelijke |
| RK-04 risico | Planner wil toch voorlopige reservering | Omzeiling proces | Scenario-review en ADR-01; module-owner |
| RK-05 risico | Berichten versturen dubbel na timeout | Verwarring medewerker | Idempotente outbox en ontvanger; integratiebeheer |
| AS-01 aanname | 30 minuten per type | Model te eenvoudig voor productie | Duurregels valideren; roosterbeheer |
| IS-01 issue | Bron-ID-mapping nog onbekend | Migratie/integratie geblokkeerd | Mappingreview vóór backendbouw; bronbeheer |
| DP-01 dependency | Echte identiteit en tenantautorisatie | Geen veilige productieomgeving | IAM/service owner oplevering vóór pilot |

## Prioritering

Must: volledigheid, passende planning, resourceconflict, annulering/vrijgave, expliciete herplanning, versie, idempotentie, rolcontrole en gebeurtenissen. Should: administratieve uitkomst. Could: planner-suggestielijst voor wachtenden. Buiten MVP: automatische wachtlijstaanbieding, medische dossierinhoud, roosteroptimalisatie.

De uitkomstregel is als extra domeinbewijs geïmplementeerd en getest, maar het scherm gebruikt een vaste klok vóór alle afspraken. Het kernprototype concentreert zich op aanvraag en herplanning.

## Fictief statusbericht

Ontwerpbesluiten ADR-01 t/m 04 vastgelegd voor deze case. Sequentiële domeinlogica en browserflow zijn gebouwd. Echte productie-integratie, identiteit, concurrency en UAT-sign-off blijven voorwaarden voor pilot. Volgende echte beslissing: modulebeleid A-01 t/m A-05 valideren. Wachtlijst CR-01 niet in MVP opgenomen.

Vorige: [runbook](../08-handover/runbook.md). Volgende: [waardemeting](../10-value/measurement.md).
