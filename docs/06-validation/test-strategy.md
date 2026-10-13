# Teststrategie en acceptatie

Voor module-owner, tester en ontwikkelaar. Testresultaten van de repo worden onderscheiden van fictieve UAT-oefeningen en nog uit te voeren productietests.

## Vier bewijsniveaus

| Niveau | Wie / uitvoering | Gedekt |
|---|---|---|
| Domeinacceptatie | Node test runner, `npm test` | Toestanden, volledigheid, intervalconflicten, tijdgrenzen, rol, versie, retry |
| Browseracceptatie | Playwright, `npm run test:ui` | Gegevens aanvullen, plannen, annuleren, capaciteit vrijgeven, herplannen, filters, tour, opslag, mobiel |
| Model en documentatie | Pythoncheckers, CI | Traceability, catalogusdrift, relatieve links, XML/DI en API-structuur |
| UAT en productie-integratie | Key users / echte omgeving | Klaargezet in UAT-plan; niet uitgevoerd bij een echte organisatie |

Elke domeintest noemt een AC-ID. [Requirementcatalogus](../02-requirements/catalogue.md) koppelt requirements aan tests. De checker weigert onbekende AC-referenties en requirements zonder test of KPI. Dit bewijst de verwijzing en de geautomatiseerde werking; het vervangt geen menselijke inhoudelijke review.

## Risicogerichte dekking

Dubbele boekingen krijgen tests voor hetzelfde slot, verschillende slots met dezelfde arts, dezelfde kamer met andere arts, dezelfde medewerker met andere middelen en aansluitende tijdslots. Annulering krijgt verplichte reden, vrijgave van capaciteit en de starttijdgrens. Retry krijgt identieke payload en gewijzigde payload met dezelfde sleutel. Autorisatie wordt in de domeinfunctie getest, niet alleen met grijze knoppen.

## Productietests vóór pilot

1. Twee verschillende dossiers boeken tegelijk een overlappend middel: maximaal één commit.
2. Client verliest HTTP-response na commit en probeert opnieuw: één reservering, één audit-event, één outboxrecord.
3. Outboxworker stopt na aflevering maar vóór statusopslag: ontvanger verwerkt message-ID één keer.
4. Cross-tenant dossier-ID met geldige login: 403/404 zonder dossierdata lekken.
5. Roosterwijziging raakt bestaande afspraak: expliciete blokkade of gecontroleerde wijzigingsflow.
6. Serverklok en Europe/Brussels rond wintertijd: vergelijking in UTC, juiste lokale labels.
7. Back-up/herstel: actieve reserveringen, versies, audit en outbox blijven consistent.

## Exitcriteria

Alle geautomatiseerde checks slagen; geen open severity 1/2-defecten; iedere Must requirement heeft geslaagde key-useracceptatie; concurrency- en autorisatietests op echte backend geslaagd; rooster- en bron-ID-mapping goedgekeurd; module-owner tekent scope en beleid af. Het prototype alleen geeft geen go-live-goedkeuring.

Vorige: [contract](../05-integration/contract.md). Volgende: [UAT](uat.md).
