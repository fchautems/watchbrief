# WatchBrief — instructions de contribution

WatchBrief est une veille horlogère éditoriale. La fiabilité prévaut sur le volume.

## Règles non négociables

- Ne publie jamais automatiquement une candidate détectée par la veille.
- Une image doit représenter exactement la référence et la variante citées. Une image de cadran seul, une image floue, un cache miniature ou une variante voisine est invalide.
- Ne jamais estimer le lug-to-lug. Écrire `Non communiqué` lorsqu'il n'est pas publié par une source fiable.
- Préférer une page officielle. Une source de presse sérieuse sert de recoupement, pas de substitution à une page produit si celle-ci existe.
- Ne jamais convertir automatiquement un prix. Pour une maison suisse, rechercher d'abord le tarif suisse officiel en CHF ; sinon conserver le prix officiel dans son marché et sa devise d'origine, avec le marché et la TVA explicités.
- Chaque correction conserve sa trace dans `sourceNotes` ou dans l'issue candidate.

## Pipeline

1. Lire `docs/RESEARCH_PLAYBOOK.md`, `data/source_registry.json`, `data/brand_patterns.json` et `docs/PRICE_POLICY.md` avant une recherche.
2. Dédupliquer avec `src/data/watchbrief_seed.json`, `src/data/editorial.ts` et `src/data/review-candidates.json`.
3. Toute détection conforme à `schemas/candidate.schema.json` est ajoutée à `src/data/review-candidates.json`. Elle reste invisible du site public jusqu'à une décision humaine.
4. Les états sont `review`, `needs-review`, `approved`, `published`, `rejected` ou `duplicate`.
5. Le bouton de la page privée `/review` est le seul chemin normal pour passer une candidate à `published` ou `rejected`. Une publication remplace automatiquement une éventuelle entrée seed ayant le même id.

## Validation

Avant toute pull request qui touche au site : `npm run check:data`, `npm run lint`, `npm run build`, `npm run check:links` et `npm run check:images`.
