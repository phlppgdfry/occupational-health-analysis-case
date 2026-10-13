# Privacy en toegangsontwerp

Ontwerpvoorwaarden voor de productieversie, geen juridisch advies of complianceverklaring. De browserdemo gebruikt uitsluitend fictieve identifiers en heeft geen beveiligde login.

## Dataminimalisatie

Deze module vraagt administratieve identifiers, werkpost, onderzoekstype en tijdslot. Diagnoses, medische uitslagen, vrije medische notities en documenten worden niet opgeslagen of getoond. Een annuleringsreden is beperkt tot administratieve toelichting; de productie-UI hoort expliciet te waarschuwen geen gezondheidsdetails in te voeren en bij voorkeur een beheerde redenlijst te gebruiken.

## Rechtenmatrix

| Actie | Planner | Coördinator | Waarnemer |
|---|---|---|---|
| Administratieve dossiers bekijken | Ja, binnen toegewezen organisatie | Ja, binnen toegewezen organisatie | Ja, binnen afgesproken leesbereik |
| Gegevens aanvullen, plannen, annuleren, heropenen | Ja | Ja | Nee |
| Administratieve uitkomst na afloop | Nee | Ja | Nee |
| Medisch dossier bekijken | Buiten scope | Buiten scope | Buiten scope |
| Audit verwijderen of wijzigen | Nee | Nee | Nee |

Het prototype controleert een opgegeven rol in de domeinfunctie. Productie haalt rol en organisatie uit de geverifieerde identiteit, nooit uit een vrij requestveld. De waarnemer wordt ook bij een retry opnieuw op rechten gecontroleerd.

## Dreigingen en ontwerpmaatregelen

| Dreiging | Maatregel voor productie | Demostatus |
|---|---|---|
| Horizontale toegang naar andere werkgever | Autorisatie per object en tenant, negatieve API-tests | Niet gebouwd |
| Vrije reden bevat gezondheidsinformatie | Beheerde redenen, UI-instructie, beperkte toelichting | Maxlengte; demo-instructie |
| Injectie via werkpostveld | Servervalidatie, parameterized queries, outputescaping | UI escapet dynamische tekst |
| Rol uit browser wordt vertrouwd | Server-side identiteit en autorisatie | Expliciet simulatie |
| Gemodificeerd activiteitenlog | Beschermde opslag, alleen appends via service, toegang beperken | Browserlog wijzigbaar |
| Overlappende reserveringen | Transactionele resourcecontrole | Sequentiële tests |
| Dubbele notificatie na retry | Atomische outbox, idempotente afleverings-ID | Eén simulated record per actie |
| Clientklok beïnvloedt beleid | Serverklok in UTC, presentatie Europe/Brussels | Vaste demoklok |

Retentie, rechtsgrond, informatieplicht, hostingregio en eventuele privacy-impactbeoordeling zijn beslispunten voor de verantwoordelijke organisatie. Deze case noemt geen standaardbewaartermijn en claimt geen wettelijke volledigheid. Publicatie bevat geen echte identifiers of contactgegevens van derden.

Vorige: [architectuur](architecture.md). Volgende: [API-contract](../05-integration/contract.md).
