# Le "scraping"

## Techniques de scraping

> Décrivez avec vos propres mots comment j'ai procédé pour télécharger ces deux jeux de données

### Jeu 1 : récupérer tous les modèles de chaussettes

1. Ouvrir la console développeur du navigateur, onglet *network (Réseau)* et se rendre sur la page dont les données nous intéressent.
2. Repérer les requêtes qui retournent du JSON et le plus de données.
3. Une fois la bonne requête trouvée, cliquer droite dessus et copier l'URL.
4. Il est possible d'obtenir des données différentes selon le message qui est envoyé au serveur (avec la méthode `curl`).
5. Une fois la requête modifiée pour obtenir les données voulues, il faut enregistrer les données dans un fichier JSON.
6. Créer un scripte pour charger ce fichier JSON et ramda.
7. Au vu de la taille du fichier et pour pouvoir visualiser les données voulues, il faut utiliser `path` afin de spécifier un chemin.
8. Créer une fonction pour n'obtenir réellement que les données intéressantes et sauver le résultat.
9. Créer un fichier JSON avec ces données.

### Jeu 2: Titres du 19h30

1. Ouvrir la console développeur du navigateur, onglet *network (Réseau)* et se rendre sur la page dont les données nous intéressent.
2. Repérer les requêtes qui retournent du JSON et le plus de données.
3. Une fois la bonne requête trouvée, cliquer droite dessus et copier l'URL.
4. Afin de manipuler les dates, il faut installer la librairie `dayjs` et créer une fonction pour trouver la date voulue.
5. Pour télécharger les données, il faut installer `node-fetch` et faire la requête pour trouver les données voulues.
6. Sauvegarder les données à chaque fois qu'elles sont obtenues, pour éviter de tout perdre en cas d'erreurs.
7. Pour cela, il faut créer un fichier ndjson, où chaque ligne est un objet JSON. Chaque nouvelle "vague" de données sera sauvée sur une nouvelle ligne.
8. Préparer les fonctions pour lire et écrire un fichier et faire une boucle pour répéter cela à chaque nouvelle date, avec une date butoir.
9. Pour avoir un épisode par ligne (il y a en 10 pour le moment), il faut utiliser `readline` avec une constante `reader`, qui lit ligne par ligne. 
10. Il faut ensuite transformer les dates avec un même format, les durées également.
11. Retirer ce qui est intéressant des segments et des épisodes.
12. Lire à nouveau chaque ligne et finalement, faire un fichier avec tous les sujets, en lisant ligne par ligne et avec les paramètres voulus.
