# Bijdragen aan de case

Dit is een afgebakende analysecase. Wijzigingen beginnen bij het probleem en de gewenste betekenis, daarna pas code.

1. Beschrijf de behoefte en besliseigenaar in een issue of CR.
2. Pas `site/assets/case.json` en zo nodig proces, ADR en specificatie aan.
3. Pas `domain.mjs` aan met een acceptatietest die nieuw en fout gedrag onderscheidt.
4. Genereer de catalogus: `python3 scripts/generate-catalogue.py`.
5. Draai `npm run check`; bij UI-wijziging ook `npm run test:ui`.
6. Werk handleiding, beperkingen en screenshots bij wanneer het gedrag verandert.

Alle voorbeelden blijven fictief. Voeg geen medische data, echte identifiers of confidential informatie toe. Behandel vertalingen als ondersteunend materiaal, niet als bewijs van gesproken taalbeheersing.
