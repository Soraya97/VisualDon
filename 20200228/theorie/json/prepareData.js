const data = require('./dataBase.json')

const result = data
  .filter(d => d.plz === '1000')
  .filter(d => d.sexcode ==='w')
  .map(d => ({nom: d.nachname, nb: d.anzahl}))

console.log(JSON.stringify(result, null, 2));

// node prepareDate > data.json
