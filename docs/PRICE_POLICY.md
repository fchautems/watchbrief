# Politique de prix WatchBrief

## Principe d'affichage

WatchBrief ne présente pas un prix converti artificiellement. Le prix affiché est toujours un prix officiel et sourcé.

1. **Maison suisse** : chercher en priorité une page officielle suisse et afficher le prix en CHF.
2. **Autre maison avec prix suisse officiel** : afficher aussi le CHF si la page suisse correspond exactement à la même référence.
3. **Pas de prix suisse officiel** : afficher le prix de la page officielle de référence, dans sa devise native, avec le marché si utile (`USD · États-Unis`, `EUR · zone euro`).
4. **Prix hors taxes** : le libellé `hors taxes` est obligatoire.
5. **Prix non publié** : afficher `Prix non communiqué` ; ne pas emprunter un prix d'une variante proche.

## Donnée structurée attendue

Les données de transition peuvent conserver `price` pour l'affichage, mais chaque nouvelle validation doit aussi documenter :

```json
{
  "amount": 41200,
  "currency": "CHF",
  "market": "CH",
  "taxMode": "incl-vat",
  "sourceUrl": "https://…",
  "checkedAt": "2026-08-22",
  "status": "official"
}
```

`market` décrit le marché de la page, pas le pays d'origine de la marque. Aucun taux de change n'est stocké ni appliqué.
