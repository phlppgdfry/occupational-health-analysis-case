# CR-01: wachtlijst na annulering

Fictieve wijzigingsvraag voor de analist: na de eerste prototype-review wil de planner vrijgekomen plekken automatisch aan een wachtlijst aanbieden. Dit is bewust geen reeds gebouwde functionaliteit.

## Vraag en probleem

“Als iemand annuleert, geef de plek meteen aan de eerstvolgende wachtende.” Achter die zin zitten meerdere beleidsvragen: wie is eerst, welk type past, wie mag contacteren, hoelang geldt een aanbod en mag één medewerker meerdere aanbiedingen hebben?

## Impactanalyse

| Gebied | Benodigde wijziging |
|---|---|
| Proces | Cancel → eligible candidates → aanbod → acceptatie/verval; geen stille boeking |
| Model | WaitlistEntry, Offer, expiresAt, heldCapacity met expliciete eigenaar |
| Regels | Type, tijd, medewerkerbeschikbaarheid, eerlijke selectie, prioriteit bij gelijke rang |
| API | Aanbod accepteren/verwerpen; concurrency bij meerdere acceptaties |
| Privacy | Ontvangers en kanaal; geen open wachtlijst van andere medewerkers |
| Tests | Dubbele acceptatie, verlopen aanbod, annulering tijdens aanbod, notificatiefout |
| KPI | Vrijgekomen capaciteit benut; afzonderlijk meten of plannerwerk afneemt |

## Opties

**A · Automatisch boeken:** snel, maar kan onhaalbare afspraken veroorzaken en wijzigt de afspraak zonder bevestiging. Verworpen voor MVP.

**B · Beperkt aanbod met bevestiging:** bewaakt capaciteit en geeft medewerker keuze. Meer state- en integratielogica; pas na gevalideerd beleid bouwen.

**C · Planner krijgt een suggestielijst:** laagste implementatierisico; mens controleert geschiktheid. Voorkeursoptie voor eerstvolgende discovery-experiment.

## Voorstel en beslisser

MVP houdt FR-04/05 ongewijzigd. Module-owner beslist na review met planner en privacyverantwoordelijke. Illustratieve raming: C = 2–4 ontwikkel/testdagen; B = 5–10; geen offerte en geen bekende productvelocity. Herzien wanneer selectiebeleid, aanbodduur en bronkwaliteit vaststaan.

## Nieuw acceptatiecriterium voor optie C

Given een plek komt vrij en drie passende aanvragen wachten, when de planner de suggestielijst opent, then alleen aanvragen met passend onderzoekstype verschijnen, and de sortering en reden zijn zichtbaar, and er wordt nog geen afspraak vastgelegd. Dit criterium is een ontwerpopdracht, geen onderdeel van de huidige testresultaten.

Vorige: [rollout](rollout.md). Volgende: [governance](../09-governance/governance.md).
