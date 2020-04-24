# Turf

## Turf

> Expliquez ce que font chacune des 4 fonctions `turf` utilisées dans l'exemple avec les bars autour de la HEIG.

### Fonction `circle`

Cette fonction demande trois arguments: les coordonnées du centre du cercle, son rayon et l'unité, décrite dans une configuration (`{units: 'unit'}`). Elle retourne un objet `geojson` de type `Polygon`.

### Fonction `bbox`

Cette fonction demande un objet `geojson` en argument (ainsi que d'éventuelles options) et retourne une *bounding box*. Un *bbox* permet d'inclure des informations sur la plage de coordonnées de géométries, entre autres, de l'objet `geojson`. Cette fonction permet de délimiter le périmètre (un *bbox* représentant les longitudes et latitudes minimum et maximum d'une zone géographique).

### Fonction `bboxPolygon`

Cette fonction permet de dessiner un polygone avec l'information reçue en retour de la fonction `bbox`.

### Fonction `distance`

Cette fonction permet de calculer une distance entre un point de départ et un point d'arrivée, selon une unité de mesure (`{units: 'unit'}`). Ces éléments doivent être mis en argument de la fonction. 