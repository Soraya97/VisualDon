# Faire des requêtes sur des données dans la console

## Faites une recherche sur les données du 19h30

> Écrivez un scripte pour faire la recherche de votre choix sur ces  données. Si vous n'êtes pas inspirés, donnez-moi les premiers titres des épisodes les plus vus (il y a une clé `views` dans [`episodes.ndjson`](https://github.com/idris-maps/heig-datavis-2020/blob/master/modules/19h30/episodes.ndjson).
>
> Le plus simple est de clôner mon repo:
>
> ```
> git clone git@github.com:idris-maps/heig-datavis-2020.git
> ```
>
> installer les librairies définies dans `node_modules`
>
> ```
> npm install
> ```
>
> et [installer les librairies "globalement"](https://github.com/idris-maps/heig-datavis-2020/blob/master/modules/19h30/donnees.md#point_up-installer-une-librairie-globalement) dont vous avez besoin.
>
> ```
> npm install ndjson-cli -g
> npm install vega-lite -g
> ```
>
> Allez dans le dossier `modules/19h30` pour faire tourner votre scripte
>
> ```
> cd modules/19h30
> ```
>
> Copiez votre commande et collez-là dans le fichier `exercices/recherche_19h30.md`.

ndjson-sort "a.views > b.views ? -1 : 1" < episodes.ndjson | head -5 | ndjson-map "{ firstTitle: d.segments[0].title, vues: d.views}" | ndjson-reduce