# Handleiding voor de planner

Taakgerichte handleiding voor de fictieve werkplek. Gebruik alleen demogegevens; de app verstuurt geen berichten en slaat wijzigingen alleen op in deze browser.

## Een aanvraag voorbereiden

Selecteer OH-001 in Dossiers. De banner Informatie ontbreekt betekent dat Werkpost nog leeg is. Kies het onderzoekstype, vul bijvoorbeeld Montage in en klik Gegevens aanvullen. Het dossier wordt Klaar. In Activiteiten verschijnt een nieuwe gebeurtenis; het versienummer stijgt.

Er wordt nog geen afspraak gemaakt. Je kunt eerst de volledigheid controleren en daarna bewust capaciteit kiezen.

## Een afspraak plannen

Selecteer een dossier met status Klaar. Onder Beschikbare afspraken staan lokale tijden voor Europe/Brussels. Bezet kan niet worden geboekt; Ander onderzoekstype ondersteunt het geselecteerde type niet. Kies Afspraak boeken op een passend vrij slot. Status, afspraak en activiteitenlog veranderen.

Berichten in de demo zijn `simulated`. Er is geen e-mail of sms onderweg.

## Annuleren en herplannen

Open het geplande dossier. Geef een administratieve reden, bijvoorbeeld Medewerker verhinderd. Gebruik geen medische toelichting. Klik Afspraak annuleren. De status wordt Geannuleerd; de oude plek is weer beschikbaar. Het activiteitenlog houdt de oorspronkelijke afspraak bij.

Klik Heropenen voor herplanning wanneer een nieuwe datum nodig is. Het dossier wordt Klaar; kies daarna een nieuwe afspraak. Heropenen alleen reserveert niets.

## Zoeken, rollen en opslag

Zoek op dossier, fictieve medewerker-ID of werkgeverlabel. Filter op status om opvolging te bekijken. Geen dossiers gevonden betekent dat de filters geen resultaten geven; je kunt ze terugzetten.

De rolkeuze simuleert rechten. Waarnemer kan lezen; Planner kan plannen en annuleren; Coördinator mag in het domeinmodel ook een uitkomst na afloop registreren. Alle demo-afspraken liggen na de vaste demoklok, daarom is uitkomstregistratie in het scherm niet uitvoerbaar; de domeintests gebruiken een latere klok voor dat scenario.

Wijzigingen blijven bij herladen bewaard in dezelfde browser. Reset demo zet uitsluitend deze demo terug naar de vier seed-dossiers. De rondleiding reset die gegevens per stap om een reproduceerbaar verhaal te tonen.

## Wanneer iets niet lukt

| Melding | Actie |
|---|---|
| MISSING_DATA | Vul een geldige werkpost in; maximaal 80 tekens |
| SLOT_CONFLICT | Bekijk opnieuw de capaciteit en kies een ander tijdslot |
| STALE_VERSION | Ververs de gegevens en bevestig de keuze opnieuw |
| REASON_REQUIRED | Vul een korte administratieve annuleringsreden in |
| FORBIDDEN | Laat de bevoegde rol de actie uitvoeren |
| PAST_SLOT | Een begonnen afspraak wordt via administratieve uitkomst verwerkt |

Bij een echte supportmelding: geef dossier-ID, actie, tijd en foutcode; geen medische details. [Runbook](runbook.md) beschrijft de technische opvolging.

Vorige: [implementatie](../07-delivery/rollout.md). Volgende: [support](runbook.md).
