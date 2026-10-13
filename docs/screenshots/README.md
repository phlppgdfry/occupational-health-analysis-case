# Fallback: de case zonder JavaScript

Deze afbeeldingen zijn afkomstig van de werkende browserdemo. De acht tourbeelden volgen dezelfde analysejourney als de rondleiding.

[Desktopwerkplek](desktop.png) · [Mobiele werkplek](mobile.png) · [Landing](landing.png)

| Stap | Beeld | Betekenis |
|---|---|---|
| 1 | [Aanvraag](tour-01.png) | Begin bij onvolledige gegevens |
| 2 | [Volledigheidsregel](tour-02.png) | Eerst compleet, dan reserveren |
| 3 | [Klaar](tour-03.png) | Aanvulling en activiteitenrecord |
| 4 | [Gepland](tour-04.png) | Geschikt vrij slot geboekt |
| 5 | [Geannuleerd](tour-05.png) | Capaciteit vrij, historie bewaard |
| 6 | [Heropend](tour-06.png) | Klaar zonder automatische afspraak |
| 7 | [Herpland](tour-07.png) | Nieuwe afspraak en uitlegbare keten |
| 8 | [Analyse](tour-08.png) | Requirement, regel, test en beperkingen |

Reproduceren: `npm ci`, `npx playwright install chromium`, `npm run test:ui`. De laatste stap toont alleen de bovenkant van de volledige catalogus; de rest staat in [requirements](../02-requirements/catalogue.md).
