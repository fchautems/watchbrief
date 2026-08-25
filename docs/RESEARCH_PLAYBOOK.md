# Playbook de recherche WatchBrief

## But

Détecter une annonce, constituer un dossier contrôlable, puis laisser une validation humaine décider si elle mérite d'entrer dans WatchBrief. La veille n'écrit jamais directement dans les données publiques.

## Ordre de recherche

1. Page produit, newsroom, communiqué ou compte officiel de la marque.
2. Revendeur officiel lorsque le produit est distribué ainsi.
3. Média horloger reconnu pour recouper une annonce ou une mesure : Fratello, Monochrome, Hodinkee, Time+Tide, Worn & Wound, Watchonista, SJX, Revolution ou WatchTime.

Une annonce de presse seule reste une candidate `needs-review` si elle ne permet pas d'identifier sans ambiguïté le modèle, la variante et l'image.

## Images

- Priorité à une image produit officielle de définition suffisante (au moins 900 px sur son petit côté lorsque l'information est disponible).
- Vérifier visuellement : référence, couleur de cadran, matière, bracelet et complication doivent correspondre.
- Écarter les vignettes de cache, les images de détail de cadran, les croppings imposés et les images floues.
- Noter dans `brand_patterns.json` le chemin qui fonctionne ; noter aussi les chemins qui échouent afin de ne pas les réessayer.

## Prix

Appliquer strictement `docs/PRICE_POLICY.md`. Enregistrer le prix brut et son contexte : devise, marché, TVA, URL et date de vérification. Une absence de prix ne bloque pas une candidate `needs-review`, mais interdit l'état `review` tant que le prix n'est pas clarifié ou explicitement annoncé comme non communiqué.

## Déduplication

Avant de créer une issue, comparer : marque, modèle, référence, collection, quantité, date annoncée et URL officielle avec :

- `src/data/watchbrief_seed.json` ;
- `src/data/editorial.ts` ;
- les issues ouvertes dont le titre commence par `Candidate ·`.

Si c'est le même modèle avec une nouvelle variante réellement distincte, créer une candidate séparée et l'expliquer.

## Sortie d'une veille

- Au plus trois candidates par passage.
- Zéro candidate vaut mieux qu'une candidate faible.
- Créer une issue GitHub seulement pour une candidate complète au minimum : modèle identifiable, URL source et raison d'intérêt.
- Conserver les doutes et contradictions dans l'issue ; ne pas les résoudre par supposition.
