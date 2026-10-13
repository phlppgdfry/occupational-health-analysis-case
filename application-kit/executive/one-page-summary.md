# Aster Preventie · One-pager

Een fictieve preventiedienst plant administratieve onderzoeken vanuit losse lijsten. Onvolledige aanvragen, overlappende capaciteit en vergeten annuleringen veroorzaken herstelwerk.

## Aanpak

Discovery brengt de tegenstelling tussen snelheid en volledigheid naar boven. Requirements leggen gedrag, eigenaar en prioriteit vast. Proces, state machine, datamodel en API maken het ontwerp bespreekbaar met ontwikkeling. Het prototype en de tests gebruiken dezelfde domeinregels.

## De kernflow

OH-001 openen → werkpost aanvullen → passend vrij slot boeken → met reden annuleren → capaciteit vrij → expliciet heropenen → nieuwe datum boeken → historie bekijken.

## Drie keuzes

Eerst volledig, dan reserveren. Overlap toetsen op arts, kamer, medewerker en tijd. Annulering en herplanning scheiden, zodat een nieuwe afspraak niet stilzwijgend ontstaat.

## Het bewijs

P-03 → FR-04 → R-04 → AC-15 → K-04 verbindt één klantvraag met specificatie, uitvoering, test en meetplan. UAT, wijzigingsvraag, pilot, handleiding en runbook tonen de overdracht.

## Grenzen

Alle data en organisaties zijn fictief. De demo heeft geen echte login, medische dossiers, servertransacties of berichtaflevering. Illustratieve KPI's zijn geen behaalde resultaten. Geen klant-UAT of productie-implementatie wordt geclaimd.

[Leesroute](../../START-HERE.md) · [Demo](../../site/demo/index.html?tour) · [Specificatie](../../docs/02-requirements/functional-spec.md)

Independent portfolio case study based on a fictional organisation. No confidential employer information.
