const fs = require('fs')

const fichier = fs.readFileSync('data.csv', 'utf-8')

const data = fichier
  .split('\n')
  .map(ligne => ligne.split('\t'))


console.log(data);
