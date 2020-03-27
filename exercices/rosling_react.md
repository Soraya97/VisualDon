# Rosling

## Différences entre *d3.select* et *react*

> Comment les bulles sont-elles créées dans cette version?

```jsx
const Bubble = ({ data, yearIndex }) =>
  <circle
    cx={ xScale(data.gdp[yearIndex]) }
    cy={ yScale(data.lex[yearIndex]) }
    r={ rScale(data.pop[yearIndex]) }
    fill={ getColorByRegion(data) }
    stroke={ getColorByRegion(data) }
    fillOpacity="0.4"
    />
```

Ce composant prend un objet avec deux clés (data correspond aux données pour cette bulle spécifiquement et yearIndex correspond à une année particulière). Les échelles et la fonction pour coloriser les bulles selon la région ne changent pas par rapport à d3.

Les résultats entre {} sont des attributs dynamiques et les attributs statiques sont définis comme en HTML mais écrit comme en JavaScript. 

```jsx
const Bubbles = ({ year }) =>
  data.map(d => <Bubble key={d.geo} data={d} yearIndex={ year - 1800 }/>)
```

La fonction dans .map() retourne un élément Bubble. La définition du groupe de bulles diffère d'avec d3, où il fallait l'ajouter à l'élément svg.

La définition de l'emplacement des bulles diffèrent de d3. Dans la version avec d3, il a fallu faire une fonction avec l'année et à l'intérieur, la taille et l'emplacement des bulles, alors que dans react, cela se fait directement à la création de la bulle. Les autres éléments sont plutôt semblables, mis à part la façon de les écrire.

> Comment les données sont elles jointes aux éléments DOM avec `react`?

Dans le fichier HTML, il faut ajouter un <script> avec le fichier .jsx. 

`render` permet d'ajouter les données à un élément DOM choisi (`div`, par exemple).