# Publication immédiate — configuration

La page `/review` est volontairement hors navigation. Son bouton de publication ne devient actif qu'après le raccordement du Worker ci-dessous. Ce Worker n'expose aucun secret dans GitHub Pages : il vérifie le compte GitHub du relecteur puis écrit avec une GitHub App limitée à `fchautems/watchbrief`.

## 1. Créer une GitHub App

Dans **GitHub → Settings → Developer settings → GitHub Apps → New GitHub App** :

- nom : `WatchBrief Review` ;
- Homepage URL : `https://fchautems.github.io/watchbrief/review` ;
- désactiver les webhooks ;
- Repository permissions : **Contents: Read and write**, **Metadata: Read-only** ;
- installer l'app uniquement sur le dépôt `fchautems/watchbrief` ;
- générer une private key et relever l'App ID et l'Installation ID.

## 2. Créer une OAuth App de connexion

Dans **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App** :

- nom : `WatchBrief Review Login` ;
- Homepage URL : `https://fchautems.github.io/watchbrief/review` ;
- Callback URL : `https://fchautems.github.io/watchbrief/review` ;
- activer **Device Flow** ;
- relever le Client ID.

Le Device Flow ne demande que `read:user` : il sert seulement à confirmer que le relecteur est `fchautems`. L'autorisation d'écriture est celle de la GitHub App, limitée au seul dépôt.

## 3. Déployer le Worker Cloudflare

Installer Wrangler, se connecter à Cloudflare, puis depuis `review-worker/` :

```bash
npx wrangler secret put GITHUB_OAUTH_CLIENT_ID
npx wrangler secret put GITHUB_APP_ID
npx wrangler secret put GITHUB_APP_INSTALLATION_ID
npx wrangler secret put GITHUB_APP_PRIVATE_KEY
npx wrangler deploy
```

Pour `GITHUB_APP_PRIVATE_KEY`, coller la clé PEM complète. Cloudflare donne ensuite une URL `https://watchbrief-review.<compte>.workers.dev`.

## 4. Raccorder la page

Définir `VITE_REVIEW_API_BASE` avec cette URL dans le build GitHub Pages (variable de dépôt ou workflow), puis redéployer. Tant que la variable est absente, la page affiche seulement « Publication sécurisée en cours de raccordement ».

## Flux

1. La tâche de veille ajoute des brouillons complets dans `src/data/review-candidates.json` avec le statut `review`.
2. La page `/review` affiche les cartes, hors navigation publique.
3. Après connexion GitHub, **Publier** change le statut en `published` dans ce fichier.
4. `src/lib/data.ts` inclut uniquement les candidates `published` dans le site public ; GitHub Pages déploie le commit.
