# Discovery: van vraag naar afspraakbeleid

Fictieve interview- en workshopopzet voor de functioneel analist. De notities zijn scenario-input, geen verslag van gesprekken met echte klanten.

## Stakeholders

| Rol | Belang / spanning | Vraag om te stellen | Betrokken bij |
|---|---|---|---|
| Planner | Snel plannen; wil tijdelijk gegevens overslaan | Laat je laatste onvolledige aanvraag zien: wat moest je later herstellen? | Proces, prototype, UAT |
| Werkgeveradministratie | Weinig invoer; tijdig een datum | Wie kent de werkpost en wie bevestigt een alternatieve datum? | Aanvraagvelden, notificatietekst |
| Medewerker | Passende datum; duidelijke wijziging | Wanneer beschouw jij een nieuwe afspraak als bevestigd? | Herplanning, gebruikersreview |
| Coördinator | Betrouwbare capaciteit en opvolging | Kan één arts op twee locaties staan? Wie mag een uitkomst corrigeren? | Middelen, uitkomstbeleid |
| Module-owner | Consistent modulebeleid | Welke regels zijn configureerbaar en wie beslist uitzonderingen? | Scope, prioriteit, sign-off |
| Ontwikkelaar / tech lead | Ondubbelzinnig gedrag, foutcodes, transacties | Hoe detecteren we stale versies en echte concurrerende reserveringen? | Model, contract, refinement |
| Privacyverantwoordelijke | Minimale administratie en passende toegang | Welke administratieve velden zijn noodzakelijk en wie ziet welke dossiers? | Productievoorwaarden |

## Workshop van 75 minuten

1. 0–10: doel en scope bevestigen; medische dossierinhoud blijft buiten deze module.
2. 10–25: laatste aanvraag stap voor stap volgen; timestamps, handovers en herstelwerk markeren.
3. 25–40: kaarten Received / Missing / Ready / Scheduled / Cancelled / Reopened / Completed / No-show ordenen. Vraag wie iedere overgang veroorzaakt.
4. 40–55: drie lastige voorbeelden: werkpost ontbreekt, twee planners boeken hetzelfde tijdslot, medewerker annuleert vlak vóór aanvang.
5. 55–65: prioriteiten beslissen; module-owner onderscheidt beleidskeuze van technisch mechanisme.
6. 65–75: open vragen met eigenaar; besluitvorming en vervolgreview afspreken.

## Fictieve uitspraken met echte ontwerpgevolgen

| Pijnpunt | Fictieve uitspraak | Analyse / vervolg |
|---|---|---|
| P-01 | Planner: “Ik wil alvast een plek vasthouden wanneer de werkpost ontbreekt.” | Spannend met coördinator: ongeschikte reserveringen blokkeren capaciteit. ADR-01 kiest volledigheid vooraf. |
| P-02 | Coördinator: “Twee verschillende tijdslots kunnen toch dezelfde arts overlappen.” | Slot-ID alleen volstaat niet; toets interval en drie middelen, R-03. |
| P-03 | Planner: “Bij een annulering vergeet ik de plek in de andere lijst vrij te maken.” | Eén reserveringsbron; annulering maakt capaciteit direct vrij, FR-04. |
| P-04 | Medewerker: “Een nieuwe datum is niet automatisch voor mij haalbaar.” | Expliciete herplanning, FR-05; geen automatische toewijzing. |
| P-05 | Tech lead: “Een klik of retry kan dezelfde opdracht twee keer aanbieden.” | Versiecontrole en idempotentie zijn afzonderlijke mechanismen. |
| P-06 | Module-owner: “Support moet kunnen zien wat veranderde, zonder medische inhoud.” | Beperkte gebeurtenissen, rolcontrole en productie-auditontwerp. |

## Open vragen vóór bouw in een echte omgeving

- OV-01: aanvraag-ID en medewerker-ID komen uit welke bronsystemen? Eigenaar: integratiebeheerder.
- OV-02: hoe worden werkpostcorrecties tijdens een bestaande afspraak behandeld? Eigenaar: module-owner. In de demo niet toegestaan.
- OV-03: welke uitkomsten bestaan echt en wie mag ze corrigeren? Eigenaar: coördinator. Demo beperkt tot twee administratieve labels.
- OV-04: welke toegang krijgt werkgeveradministratie over organisaties heen? Eigenaar: privacyverantwoordelijke. Geen portaal gebouwd.
- OV-05: afspraakduur per type en locatie? Eigenaar: roosterbeheerder. Demo gebruikt uitsluitend 30 minuten.

Een analist vult die antwoorden niet zelf in. De demo gebruikt expliciete aannames en houdt de productievragen in het [RAID-register](../09-governance/governance.md).

Vorige: [context](../00-context/context.md). Volgende: [requirements](../02-requirements/catalogue.md).
