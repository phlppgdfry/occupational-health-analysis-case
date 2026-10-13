# ADR-04 · Statische demo met gedeelde domeinregels

Status: gekozen voor de portfolio-case, geen architectuurkeuze voor een bestaand product.

## Context

Een reviewer moet zonder installatie de kernflow kunnen bekijken. De functie vraagt analyse en module-expertise; een productiebackend toevoegen zou veel beheer toevoegen zonder de beleidskeuzes duidelijker te maken.

## Opties en beslissing

Een document-only case mist interactie. Een volledige backend vraagt identiteit, hosting, gegevensbeheer en concurrency. Gekozen: vanilla HTML/CSS/ES-modules, gedeelde pure domeinfunctie, Node tests en browseropslag. De beperkte werkplek heeft geen framework nodig. Ontwerpreferentie en toegankelijkheid blijven onderdeel van de oplevering.

## Gevolgen

Dezelfde regels sturen prototype en tests. GitHub Pages kan de site statisch hosten. Er zijn geen runtimebundles, fonts of CDN-afhankelijkheden. De demo heeft geen echte login, concurrencygarantie, medische data of berichtaflevering. Echte productievoorwaarden staan expliciet in architectuur, privacy en rollout.

Alternatief met backend herzien zodra de case echte integratie-, identity- of concurrencywerking moet bewijzen. De kandidaat moet de regels zelfstandig kunnen verklaren; hoeveelheid code is geen vervanging voor begrip.

Zie [ontwerpsysteem](../design/DESIGN.md), [architectuur](../04-design/architecture.md) en [beperkingen](../00-context/context.md).
