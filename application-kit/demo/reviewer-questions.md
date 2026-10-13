# Vragen voor de inhoudelijke reviewer

Deze vragen helpen het analyseontwerp beoordelen. Persoonlijke interviewantwoorden of sollicitatiestrategie horen niet in deze publieke case.

- Welke requirement verandert als voorlopige reserveringen toch nodig zijn? Welke vervaltijd, eigenaar en tests ontbreken dan?
- Waarom kan een versienummer op een dossier geen dubbele boeking van twee verschillende dossiers voorkomen?
- Welke informatie moet een annulering bewaren als de actieve slotkoppeling verdwijnt?
- Wat betekent een timeout na een succesvolle commit? Welke sleutel mag bij retry veranderen?
- Welke policyvragen zitten verstopt in “boek automatisch de eerstvolgende wachtende”?
- Hoe onderscheid je een stijging in correcte conflictmeldingen van een stijging in daadwerkelijke dubbele afspraken?
- Wanneer is een prototype-review onvoldoende voor go-live?

De antwoorden zijn te reconstrueren via [ADR's](../../docs/adr/02-capacity.md), [architectuur](../../docs/04-design/architecture.md), [CR-01](../../docs/07-delivery/change-request.md) en [meetplan](../../docs/10-value/measurement.md).
