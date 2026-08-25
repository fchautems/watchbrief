# Flux éditorial WatchBrief

La veille récurrente dépose désormais des **candidates** dans GitHub. Elle ne modifie ni le seed ni le site public. La méthode complète est dans [`RESEARCH_PLAYBOOK.md`](RESEARCH_PLAYBOOK.md), la politique de prix dans [`PRICE_POLICY.md`](PRICE_POLICY.md) et les sources connues dans [`../data/source_registry.json`](../data/source_registry.json).

## États

- `backlog` : entrée importée, sans recherche éditoriale.
- `researching` : source trouvée, mais page produit, photo ou droit d’usage encore incomplet.
- `publishable` : page source, caractéristiques et photo officielle confirmées.
- `broken-link` : une source publiée renvoie explicitement une erreur 404 ou 410.

Seules les fiches `publishable` avec une photo apparaissent dans la sélection de l’accueil. Toutes les entrées restent consultables dans les archives et les pages de marque.

## Traitement d’une nouveauté

1. Examiner la fiche ajoutée par la veille dans `src/data/review-candidates.json` ; elle passe par `review` ou `needs-review`, puis `published` ou `rejected` après décision humaine (`duplicate` pour un doublon confirmé).
2. Identifier d’abord la page de la marque ou du partenaire commercial officiel.
3. Comparer dimensions, mouvement, prix et quantité avec le seed.
4. Ajouter un résumé original, court et factuel dans la candidate.
4. Utiliser une image servie par la marque uniquement lorsque la page l’identifie clairement comme image produit. Ne pas recopier une photo de presse dans le dépôt sans autorisation.
6. Renseigner `sources`, `sourceNotes`, `verifiedAt` et `editorialStatus`.
7. Exécuter `npm run check:data`, `npm run lint`, `npm run build`, `npm run check:links` et `npm run check:images`.

## Lot pilote V0.4

Le premier lot contient dix références. Venezianico, KIWAME TOKYO, IWC, Albishorn et Seiko sont publiables. Jacques Bianchi Marseille, Serica, AWAKE, Baltic et Furlan Marri restent en recherche : leurs annonces sont sourcées, mais leur page produit définitive ou leur image officielle réutilisable doit encore être confirmée.

## Contrôle des liens

Le workflow GitHub `Check editorial links` s’exécute chaque lundi et peut être lancé manuellement. Une réponse 404 ou 410 fait échouer le contrôle. Les blocages, limitations de débit et erreurs serveur sont signalés comme non concluants afin d’éviter les faux positifs.
