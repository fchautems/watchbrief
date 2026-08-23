# Publication immédiate — configuration

La page `/review` est volontairement hors navigation. Son bouton de publication ne devient actif qu'après le raccordement du Worker ci-dessous. Ce Worker n'expose aucun secret dans GitHub Pages : Cloudflare Access protège le Worker et celui-ci écrit avec une GitHub App limitée à `fchautems/watchbrief`.

## 1. Créer une GitHub App

Dans **GitHub → Settings → Developer settings → GitHub Apps → New GitHub App** :

- nom : `WatchBrief Review` ;
- Homepage URL : `https://fchautems.github.io/watchbrief/review` ;
- désactiver les webhooks ;
- Repository permissions : **Contents: Read and write**, **Metadata: Read-only** ;
- installer l'app uniquement sur le dépôt `fchautems/watchbrief` ;
- générer une private key et relever l'App ID. L'installation est détectée automatiquement, car l'app n'est autorisée que sur `watchbrief`.

## 2. Déployer et protéger le Worker Cloudflare

Installer Wrangler, se connecter à Cloudflare, puis depuis `review-worker/` :

```bash
npx wrangler secret put GITHUB_APP_ID
npx wrangler secret put GITHUB_APP_PRIVATE_KEY
npx wrangler deploy
```

Pour `GITHUB_APP_PRIVATE_KEY`, coller la clé PEM complète. Cloudflare donne ensuite une URL `https://watchbrief-review.<compte>.workers.dev`.

Dans **Workers & Pages → watchbrief-review → Access**, choisir **Protect this Worker behind Access**, **All traffic**, puis la politique **Cloudflare account**. L'authentification est alors gérée par Cloudflare ; aucune OAuth App GitHub n'est nécessaire.

## 3. Raccorder la page

Définir `VITE_REVIEW_API_BASE` avec cette URL dans le build GitHub Pages (variable de dépôt ou workflow), puis redéployer. Tant que la variable est absente, la page affiche seulement « Publication sécurisée en cours de raccordement ».

## Flux

1. La tâche de veille ajoute des brouillons complets dans `src/data/review-candidates.json` avec le statut `review`.
2. La page `/review` affiche les cartes, hors navigation publique.
3. Après connexion Cloudflare, **Publier** change le statut en `published` dans ce fichier.
4. `src/lib/data.ts` inclut uniquement les candidates `published` dans le site public ; GitHub Pages déploie le commit.
