# Aster Prévention · Synthèse

Étude de cas indépendante fondée sur une organisation fictive. Aucune donnée confidentielle d'un employeur réel n'est utilisée. Cette traduction accompagne le projet; elle ne constitue pas une preuve du niveau de français oral du candidat.

## Problème

Un service de prévention fictif organise ses rendez-vous administratifs à partir de listes et de courriels distincts. Certaines demandes sont incomplètes, des ressources sont réservées deux fois et les annulations ne libèrent pas toujours la capacité dans toutes les listes.

## Démarche

L'analyse clarifie les besoins du planificateur, du coordinateur et de l'utilisateur final. Les exigences sont reliées au processus, au modèle de données, aux règles et aux tests d'acceptation. Le prototype illustre une demande incomplète, sa préparation, la réservation d'un créneau, l'annulation motivée et une nouvelle planification explicite.

## Décisions

Une demande doit être complète avant la réservation. Les conflits sont vérifiés sur l'intervalle horaire et sur le médecin, la salle et la personne concernée. Annuler et replanifier sont deux décisions distinctes. L'historique conserve la référence du rendez-vous précédent.

## Validation et limites

Le prototype et les tests utilisent les mêmes règles de domaine. Les contrôles du navigateur couvrent le parcours principal, le stockage local, les filtres et la visite guidée. Le plan UAT, la migration et la mise en production restent des propositions; aucune validation client réelle n'est revendiquée.

Les données sont fictives. L'identité, les notifications et le journal sont simulés dans le navigateur. Les transactions, la concurrence et l'autorisation d'une véritable API doivent encore être mises en œuvre et testées. Les indicateurs chiffrés sont des hypothèses illustratives, pas des résultats obtenus.

[Parcours de lecture](../../START-HERE.md) · [Prototype](../../site/demo/index.html?tour)
