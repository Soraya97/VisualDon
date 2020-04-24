# Topojson

## Topojson

> Expliquez à quoi sert le format `topojson` et en quoi il diffère du format `geojson`.

Il sert à représenter des données géographiques, comme `geojson`(c'en est d'ailleurs une extension), mais en prenant moins de place. En effet, au lieu de créer des géométries avec une série de points, `topojson` les créer avec un ensemble d'arcs. Cela permet aux géométries partageant les mêmes points d'être stockées dans le même fichier (comme deux pays partageant une même frontière, qui sera donc représentée une seule fois, par exemple).