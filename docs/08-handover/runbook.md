# Runbook: bevestiging ontbreekt na boeking

Voor support en integratiebeheer in de voorgestelde productieversie. Het prototype heeft geen echte berichtendienst; dit is een uitgewerkt operationeel scenario.

## Scenario INC-01

Planner meldt: “Het dossier is Gepland, maar de bevestiging kwam niet aan.” Een notificatiefout betekent niet dat de reservering ontbreekt. Nogmaals boeken kan een andere afspraak maken en is geen herstelactie.

1. **Detecteer:** dossier-ID, tijdstip, foutmelding en correlation-ID opvragen. Geen medische gegevens verzamelen.
2. **Bepaal toestand:** lees dossier en actieve reservering. Als Gepland en juiste slot-ID: boeking behouden.
3. **Controleer outbox:** bestaat committed message-ID? DeliveryState, retryCount, laatst bekende providerstatus en ouderdom bekijken.
4. **Triage:** geen outboxrecord = transactie-/implementatiefout; record pending = workervertraging; record failed = provider/inputfout; provider accepted zonder delivered = aflevering verder onderzoeken.
5. **Herstel:** retry met dezelfde message-ID als veilig en afleverstatus duidelijk is. Geen nieuwe schedule-opdracht sturen. Bij onduidelijke providerstatus eerst reconciliëren.
6. **Communiceer:** planner krijgt bevestiging dat afspraak wel/niet vastligt, plus afgesproken handmatige contactactie door een bevoegde medewerker.
7. **Sluit af:** deliveryState en audit consistent; root cause en corrigerende change vastleggen.

## Monitoringvoorstel

| Signaal | Illustratieve drempel | Eigenaar |
|---|---|---|
| Oudste pending outbox | Meer dan 15 minuten | Integratiebeheer |
| Aandeel mislukte aflevering | Meer dan 5% in 30 minuten | Service owner |
| Reservering zonder audit/outbox | Elke afwijking | Tech lead |
| Conflictmeldingen | Trendbreuk; niet automatisch incident | Module-owner |

Drempels eerst met het serviceproces afspreken. Een conflictmelding kan correcte bescherming zijn, geen fout. Meting van bevestigde overlap is een andere KPI.

## Incident, problem en change

Fictieve oefenketen: INC-01 ontbrekende bevestiging → PRB-01 worker herstart verloor status na aflevering → CHG-01 stabiele message-ID en idempotente ontvanger toevoegen → integratietest voor crash tussen aflevering en opslag → release en pilotmonitoring. Deze keten is een ontwerpvoorbeeld; geen echte incidenthistorie.

## Escalatie

Onjuiste capaciteit of toegang naar een ander dossier: stop mutaties voor betrokken scope en escaleer direct naar service owner/tech lead. Alleen ontbrekende bevestiging: reserveer niet opnieuw; volg outboxherstel. Beleidstwijfel over uitkomst of annulering: module-owner beslist, support verandert het beleid niet.

Vorige: [handleiding](user-guide.md). Volgende: [governance](../09-governance/governance.md).
