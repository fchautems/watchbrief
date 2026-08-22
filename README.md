# WatchBrief

Une veille horlogère statique, mobile-first et sans longs articles : photos exactes, dimensions utiles, prix, statut d’édition et sources.

## Contenu de la V0.6 (pilote)

- 90 nouveautés importées depuis l’historique WatchBrief
- 229 marques surveillées
- accueil éditorial, marques et archives en cartes ou en liste
- pages de marque harmonisées avec les mêmes cartes éditoriales
- liens directs vers les pages officielles, sans fiche intermédiaire
- recherche, filtres d’édition et tris conservés dans l’URL
- statuts éditoriaux explicites et premier lot de dix fiches recherché
- contrôle hebdomadaire automatisé des liens publiés
- pipeline de détection : candidates GitHub, règles de recherche, mémoire des sources et politique de prix CHF-first

Le processus d’enrichissement est décrit dans [`docs/EDITORIAL_WORKFLOW.md`](docs/EDITORIAL_WORKFLOW.md). La tâche de veille dépose des dossiers à valider : elle ne publie jamais une montre directement.
- statut explicite des données vérifiées ou encore issues du seed

## Développement

```bash
npm install
npm run dev
```

Le site est construit avec React, TypeScript et Vite. La branche `main` est déployée automatiquement sur GitHub Pages.
