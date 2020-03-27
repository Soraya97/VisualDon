# Rosling

## Créer le graphique avec d3

> Comment et pourquoi le code est t-il divisé en plusieurs fichiers?

Afin d'éviter de tout écrire dans le même script et éviter ainsi que les fichiers ne soient trop longs. Cela permet également de retrouver plus facilement un bout de code s'il faut le changer.

> Comment le nom du pays est t-il affiché quand la souris passe sur une bulle?

Un élément <text> est créé. Son contenu sera remplacé selon la bulle sur laquelle passe la souris. Seuls l'élément et deux attributs de présentation sont définis (la taille du texte et son ancrage). La position et le contenu du texte sont définis selon l'emplacement de la souris et la bulle sur laquelle elle passe. Ce sont des événements qu'il faut définir dans le fichier JavaScript, grâce à _mouseover_.

Grâce à _mouseout_, lorsque la souris sort de la bulle, le texte disparait et grâce à _mousemove_, le texte suit la souris si elle bouge.

