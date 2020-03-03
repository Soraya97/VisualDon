const data = require('./pokemon_full.json')

// const tot = data
// .filter(d => d.type[0|1] === 'Electric')
// .filter(d => d.gen = 1 && 2)
// .map(d => d.stats.attack).reduce((result, pop) => result + pop, 0);

const gen1 = data
  .filter(d => d.type[0 | 1] === 'Electric')
  .filter(d => d.gen = 1)
  .map(d => ({
    Nom: d.name,
    Type: d.type,
    Stats: d.stats.total,
    Génération: d.gen
  }));

const gen2 = data
  .filter(d => d.type[0 | 1] === 'Electric')
  .filter(d => d.gen = 2)
  .map(d => ({
    Nom: d.name,
    Type: d.type,
    Stats: d.stats.total,
    Génération: d.gen
  }));


console.log(JSON.stringify(gen1, null, 2));
console.log(JSON.stringify(gen2, null, 2));


// node prepareDate > data.json
