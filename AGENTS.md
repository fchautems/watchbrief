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
2. Dédupliquer avec les 90 entrées de `src/data/watchbrief_seed.json`, les surcharges de `src/data/editorial.ts` et les issues ouvertes intitulées `Candidate ·`.
3. Toute détection devient une issue qui respecte `.github/ISSUE_TEMPLATE/watch-candidate.md` et `schemas/candidate.schema.json`.
4. Les états sont `candidate`, `needs-review`, `accepted`, `published`, `rejected` ou `duplicate`.
5. Seul un travail explicitement demandé sur une candidate `accepted` peut modifier `src/data/editorial.ts` puis ouvrir une pull request.

## Validation

Avant toute pull request qui touche au site : `npm run lint`, `npm run build`, `npm run check:links` et `npm run check:images`.
