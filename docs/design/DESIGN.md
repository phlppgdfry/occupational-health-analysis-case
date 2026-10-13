# Ontwerp van de werkplek

Referentie: [gegenereerd concept](concept.png), gemaakt met de ingebouwde Image Gen-tool. Het concept dient als ontwerpbron; de interface bestaat uit HTML, CSS en JavaScript. Geen rasterafbeelding vervangt een bedieningselement.

## Vast visueel systeem

Witte zijbalk en werkvlakken; koel lichtgrijze kop; navy tekst; teal selectie en primaire acties. Systeemfont, 40 px paginatitel op desktop, 26 px sectietitels, 16 px inhoud en controles, 14 px tabelkoppen. Zijbalk 266 px op 1536 px, inhoud verdeeld 62/38. Dunne grenzen, 6 px controleradius, geen schaduw op werkvlakken. Alleen statuslabels krijgen zachte achtergrondkleur.

Toegestane primaire koptekst: Aster / Preventie; Werkplek, Analyse, Beslissingen, Handleiding; Planning & opvolging; Fictieve preventiedienst · uitsluitend demogegevens; Rondleiding; Reset demo; Dossiers; Onderzoekstype; Werkpost; Gegevens aanvullen; Activiteiten; Beschikbare afspraken.

## Functionele aanvullingen op het concept

- Rolkeuze, statusfilter en melding na acties zijn nodig om autorisatie en foutpaden te demonstreren.
- Alle vier tijdslots worden getoond, met expliciete boekknoppen. Het concept toont er twee als visuele referentie.
- Activiteitendatum is de vaste demoklok in 2026. De afwijkende 2024-datums in de gegenereerde afbeelding worden niet overgenomen.
- De primaire knop heeft een egale tealkleur; de geringe rasterglans is geen beoogde gradient.
- Gegevensaanvulling is een formulier; annulering heeft een redenveld; heropening is een afzonderlijke knop.
- Een footer labelt browseropslag, de vaste demoklok en gesimuleerde berichten. Dit voorkomt productieclaims.
- Mobiel: zijbalk wordt horizontale navigatie; lijst, afspraken en detail staan onder elkaar. Dossierknoppen blijven met toetsenbord bereikbaar.

Analyse en beslissingen gebruiken hetzelfde systeem en tonen de canonieke requirements en ADR's uit `site/assets/case.json`. De handleiding gebruikt een taakgerichte leesweergave. De landing page is een sobere extra leesroute, met dezelfde tokens.

## Componenten en gedrag

Shell / dossierlijst / slotlijst / dossierformulier / activiteitenlog / rondleiding / analyseweergave zijn afzonderlijke renderfuncties. Domeinregels staan los van de UI in `domain.mjs`. Dossiers worden geselecteerd met echte knoppen. Meldingen gebruiken `aria-live`, inputs hebben labels, focus is zichtbaar. Verplichte velden en foutmeldingen verwijzen naar de werkelijke regel.

## Conceptprompt

De prompt vroeg een complete Nederlandse desktopwerkplek voor fictieve arbeidsgeneeskundige planning, wit en koelgrijs met navy en teal, zijbalk, vier dossiers, geselecteerde onvolledige aanvraag, formulier, activiteiten en beschikbare afspraken. De referentie is ingebouwd gegenereerd, zonder bedrijfslogo, foto's of externe assets.
