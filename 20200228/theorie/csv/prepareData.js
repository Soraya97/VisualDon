const fs = require('fs')

const fichier = fs.readFileSync('data.csv', 'utf-8')

const data = fichier
  .split('\n')
  .map(ligne => ligne.split(';'))
  .map(d => ({
    canton: d[2],
    parti: d[5],
    elus: Number(d[12]),
  }))
  .filter(d => d.canton === 'Vaud' && d.elus > 0)
  .map(d => ({
    parti: d.part,
    elus: d.elus
  })) // ou .map(({parti, elus}) => ({parti, elus}))

console.log(data);

/** Autre façon de faire
const obj = { canton: 'Vaud', parti: 'PLR', elus: 5}

const { canton } = obj

*/
