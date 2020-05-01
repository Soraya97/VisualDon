# Projet de fin de cours

> Projet en groupe avec Leyna Girardi
>

## À faire

- Passer d'un graphique à un autre (Soraya)
- Améliorer le visuel (Leyna)

## Jeu de données

[Nombre d'infectés, de morts et de guéris du Covid-19 par continent et dans le monde](https://docs.google.com/spreadsheets/d/1tjN4GNTzRV6nYWHu8xSLUM-rmyEwqrqpmpyOb6Je45I/edit#gid=717155371)

Ce jeu de données a été réalisé par [Nolanne Dunet](https://www.linkedin.com/in/noirdelune/) à titre personnel.

## Transformation des données

1. Les données ont été [modifiées](https://github.com/Soraya97/VisualDon/blob/master/projet/data/oldData/COVID-19_StatistiquesPandemie.tsv) une première fois afin de faciliter l'extraction.

2.  Les données représentent le nombre total de victimes accumulées depuis le début de la pandémie. En d'autres termes, le nombre de nouvelles victimes d'une journée était ajouté au total de la veille, ce qui donne une courbe exponentielle. Une deuxième modification a alors été faite en faisant la manipulation inverse (soustraire le total d'un jour au total de la veille) afin d'avoir le [nombre de nouvelles victimes par jour](https://github.com/Soraya97/VisualDon/blob/master/projet/data/COVID-19_StatsPandemie.tsv) et ainsi pouvoir présenter la fluctuation du nombre de victimes.
   
3. Un premier script [`prepareData.js` ](https://github.com/Soraya97/VisualDon/blob/master/projet/data/prepareData.js) a été créé afin d'extraire les informations afin d'avoir un objet JSON pour chaque valeur comme ceci `{"date":"2020-01-30","region":"Monde","indicateur":"infectés","valeur":9952}`, ce qui donne un [premier jeu de données](https://github.com/Soraya97/VisualDon/blob/master/projet/data/dataBrut.json).

4. Un deuxième script [`toJSON.js` ](https://github.com/Soraya97/VisualDon/blob/master/projet/data/toJSON.js) a été fait afin d'extraire les bonnes données au final sous cette forme et donne ainsi les [données finales](https://github.com/Soraya97/VisualDon/blob/master/projet/data/dataCovid19.json).

   ```json
   [
     {
       "date": "2019-12-16",
       "Afrique": {
         "infectés": 0,
         "morts": 0,
         "guéris": 0
       },
       "Amérique": {
         "infectés": 0,
         "morts": 0,
         "guéris": 0
       }
     }
   ]
   ```

## Idée

L'idée est de représenter les courbes des infectés, des morts et des guéris par continents de façon animée, afin de permettre une comparaison entre chacun.

## Code source

https://github.com/Soraya97/VisualDon/tree/master/projet/src

## Visualisation publiée

https://covid-visualdon.surge.sh/

## Scripte à utiliser

"deploy": "surge dist --domain covid-visualDon.surge.sh" 

## Liens utiles

[d3-area](https://github.com/d3/d3-shape#areas)

[Interaction avec des bulles](https://github.com/idris-maps/heig-datavis-2020/tree/master/modules/rosling/graphique_d3)

[Types de visualisation de données](https://observablehq.com/@idris-maps/visualisation-de-donnees?collection=@idris-maps/heig-visdom-2020)

[Galerie de graphes avec d3](https://www.d3-graph-gallery.com/)

[Graphe de densité avec d3](https://www.d3-graph-gallery.com/graph/density_basic.html)

[Affichage interactif](https://www.datavis.fr/index.php?page=transition)

[Dessiner une courbe](https://www.datavis.fr/index.php?page=linearchart)

[Dessiner deux courbes](https://www.datavis.fr/index.php?page=twolinearchart)

[Ajouter des dates sur les axes](http://bl.ocks.org/phoebebright/3059392)

[d3-line](https://observablehq.com/@d3/d3-line)

[Ajouter des légendes](https://webdevdesigner.com/q/adding-a-chart-legend-in-d3-93675/)
