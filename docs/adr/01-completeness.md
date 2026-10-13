# ADR-01 · Eerst volledig, dan reserveren

Status: gekozen voor deze fictieve case; productiebeleid vereist bevestiging door module-owner.

## Context

De planner wil een plek alvast vasthouden zonder werkpost. De coördinator wil dat capaciteit alleen door bruikbare aanvragen wordt bezet. De werkpost is een administratieve demo-vereiste; de case bepaalt geen medische geschiktheid.

## Opties

1. Voorlopig reserveren: sneller een datum, maar capaciteit kan onnodig worden geblokkeerd; extra verval- en herinneringslogica nodig.
2. Volledigheid vóór reservering: heldere toestand en minder herstel; kan wachten op brongegevens verlengen.
3. Planner beslist per aanvraag: flexibel, maar beleid en audit worden inconsistent.

## Beslissing

Optie 2. Het dossier blijft zichtbaar als Onvolledig. Geldig type en werkpost maken het Klaar; planning is een afzonderlijke actie. Regel R-01 is in de gedeelde domeincode en tests AC-01/02/03 opgenomen.

## Gevolgen en herziening

K-01 en K-02 samen bekijken: meer volledigheid kan langere wachttijd tonen zonder dat actieve behandeltijd verslechtert. Herzien wanneer er een gevalideerd proces voor korte tijdelijke holds is, inclusief expiry, eigenaar en vrijgave. Een knop om de regel over te slaan komt niet stil in het prototype.

Zie [discovery](../01-discovery/discovery.md) en [catalogus](../02-requirements/catalogue.md).
