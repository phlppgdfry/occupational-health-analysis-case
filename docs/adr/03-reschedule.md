# ADR-03 · Annulering en herplanning scheiden

Status: gekozen voor de case. Beslisser in productie: module-owner met planner en eindgebruiker.

## Context

Een annulering moet capaciteit vrijgeven. De planner wil soms meteen herboeken; de medewerker moet een nieuwe datum kunnen afstemmen. Automatisch herboeken maakt een afspraak zonder expliciete keuze.

## Beslissing en alternatief

Cancel maakt het dossier Geannuleerd en verwijdert de actieve slotkoppeling. Reopen maakt het Klaar, nog zonder afspraak. Schedule gebruikt alle gewone planningsregels. Het alternatief - direct de eerstvolgende plek vastleggen - is verworpen zolang beschikbaarheid en bevestigingsbeleid niet zijn gevalideerd.

## Gevolgen

Meer expliciete stappen, maar de planner kan iedere keuze uitleggen. De oude afspraak blijft in het activiteitenrecord als `previousSlotId`; het dossier bevat alleen actieve capaciteit. FR-04/05, AC-14/15/16 en FS-01/02 dragen de keuze.

Herzien bij een expliciet goedgekeurd aanbodproces; zie [CR-01](../07-delivery/change-request.md). Ook dan blijft vrijgave gescheiden van de acceptatie van een nieuwe afspraak.

Zie [functionele specificatie](../02-requirements/functional-spec.md).
