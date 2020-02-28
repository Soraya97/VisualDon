const data = require('./pokemon_full.json')

const result = data
  .filter(d => d.type[0|1] === 'Electric')
  .filter(d => d.gen = 1)
  .map(d => ({Nom: d.name, Espèce: d.species, Type: d.type, Vitesse: d.stats.speed}));


console.log(JSON.stringify(result, null, 2));

// node prepareDate > data.json
