# Paradigmes de programmation

## PF et POO

> Décrivez ce qu'est la programmation fonctionnelle

React, c'est de la programmation fonctionnelle, avec la fonction Graph qui prend une année `year` et créer du DOM virtuel qui vient s'ajouter au vrai DOM grâce à `render`.

La programmation fonctionnelle doit permettre d'écrire de manière déclarative plutôt qu'impérative.

Les valeurs en-dehors des fonctions ne doivent pas être changées.

Les fonctions doivent être pures, sans effets secondaires, c'est-à-dire qu'elle retourne toujours la même chose avec les mêmes arguments. Le but de ceci est d'avoir plus de contrôle sur ce qui se passe.

Il faut essayer de ne pas changer les choses, de les laisser immuables, mais plutôt d'en créer de nouvelles. Il est d'ailleurs possible de partager une nouvelle version avec une ancienne structure.

Les fonctions d'ordre supérieur(qui retournent une autre fonction) peuvent également être utilisées (comme `map()`, `reduce()` ou `filter()`).

> Décrivez ce qu'est la programmation orientée objets

D3, c'est la programmation orientée objets, avec `d3.select`, qui permet la création d'un objet `div` avec des méthodes qui permettent d'ajouter des éléments.

Un objet, qui représente ce qu'on veut du monde physique, contient un constructeur et des méthodes pour modifier l'état interne. Il possède une structure interne et un comportement, ainsi qu'une interaction avec d'autres objets.