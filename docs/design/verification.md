# Visuele verificatie

De Browser-skill is niet beschikbaar in deze sessie. De CUA-browserselectie gaf `No browser is available`. Daarom zijn browseracceptatie en screenshots met Playwright uitgevoerd. De ontwerpbron en de laatste desktoprender zijn in dezelfde QA-pass met `view_image` bekeken.

Native concept en desktopviewport: **1536 × 1024**. Mobiel: **375 × 812**, volledige pagina gecontroleerd. Bron: [concept](concept.png); render: [desktop](../screenshots/desktop.png), [mobiel](../screenshots/mobile.png), [landing](../screenshots/landing.png).

| Vergelijkingspunt | Concept | Render / besluit |
|---|---|---|
| Kleuren | Wit, koelgrijs, navy en teal | Dezelfde tokens; geen warme achtergrond of toegevoegde gradients |
| Compositie | Zijbalk, metrics, dossierlijst links, detail rechts | Dezelfde verdeling; detail begint op vaste kolomgrens |
| Typografie | Grote paginatitel, duidelijke sectiekoppen, rustige controltekst | System sans; expliciete groottes op inputs, buttons en labels |
| Tabel en selectie | Vier dossiers, gekleurde statuslabels, geselecteerd OH-001 | Zelfde seed en statuskleuren; selectie via echte dossierknoppen |
| Formulier en actie | Type, werkpost, primaire knop | Zelfde volgorde; validatie en opgeslagen toestand toegevoegd |
| Beschikbare afspraken | Vrij/bezet onder lijst | Alle vier slots tonen type/middel en echt werkende boekactie |
| Activiteiten | Korte historie in detail | Werkelijke events uit domeinfunctie met versie en gesimuleerde berichten |
| Mobiel | Niet in concept getekend | Zelfde tokens; lijst, slots en detail onder elkaar; geen horizontale pagina-overflow |

## Bewuste afwijkingen

Statusfilter en demorolkiezer zijn functioneel noodzakelijk. De conceptdatum 2024 is vervangen door de vaste casetijd 2026. Vier slots in plaats van twee maken passend type en herplanning zichtbaar. Zijbalk gebruikt tekstlabels zonder decoratieve iconen. De notificatie-/auditfooter maakt de simulatie zichtbaar. Deze aanvullingen stonden vóór implementatie in DESIGN.md.

Copycontrole: titel, navigatie, secties en hoofdactie volgen de toegestane lijst. Toegevoegde functionele tekst betreft filters, rol, tijdzone, versienummer en beperkingen. Geen extra marketingclaims of resultaten toegevoegd.

De interface is tegen het ontwerp gecontroleerd op koptekst, compositie, kleuren, typografie, controles, selectie en activiteitendetails. De vaste datum en gegevens volgen de casebron. Er zijn geen onbedoelde clipping, overlap of horizontale pagina-overflow waargenomen op de geteste viewports.

## Gedragsbewijs

De browsercheck doorloopt aanvullen → plannen → annuleren → vrijgekomen capaciteit op ander dossier beschikbaar → heropenen → nieuwe datum boeken → herladen. Ook filters, lege toestand, Waarnemer, outputescaping, leesweergaven, acht tourstappen, Terug/Sluiten/Escape en mobiele planning zijn gecontroleerd. Geen console- of page-errors. Zie [testscript](../../tests/browser.mjs).

Chromium is getest; Safari en Firefox zijn niet getest. Backendconcurrency, echte identiteit en echte notificaties bestaan niet in het prototype.
