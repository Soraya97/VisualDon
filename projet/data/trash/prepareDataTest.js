const fs = require('fs')

const file = fs.readFileSync('COVID-19_StatistiquesPandemie.csv', 'utf-8')

console.log(
  file.split(`\n`)
  .map(line => line.split(','))
  .map(cells => ({
    date: cells[0],
    mondeInfectes: Number(cells[1]),
    mondeMorts: Number(cells[2]),
    mondeGueris: Number(cells[3]),
    afriqueInfectes: Number(cells[4]),
    afriqueMorts: Number(cells[5]),
    afriqueGueris: Number(cells[6]),
    ameriqueInfectes: Number(cells[7]),
    ameriqueMorts: Number(cells[8]),
    ameriqueGueris: Number(cells[9]),
    asieInfectes: Number(cells[10]),
    asieMorts: Number(cells[11]),
    asieGueris: Number(cells[12]),
    europeInfectes: Number(cells[13]),
    europeMorts: Number(cells[14]),
    europeGueris: Number(cells[15]),
    oceanieInfectes: Number(cells[16]),
    oceanieMorts: Number(cells[17]),
    oceanieGueris: Number(cells[18]),
    autreInfectes: Number(cells[19]),
    autreMorts: Number(cells[20]),
    autreGueris: Number(cells[21]),
  }))
  .filter((d, i) => i > 0)
)

// console.log(
//   JSON.stringify(file.split(`\n`)
//     .map(line => line.split(','))
//     .map(cells => ({
//       date: cells[0],
//       mondeInfectes: Number(cells[1]),
//       mondeMorts: Number(cells[2]),
//       mondeGueris: Number(cells[3]),
//       afriqueInfectes: Number(cells[4]),
//       afriqueMorts: Number(cells[5]),
//       afriqueGueris: Number(cells[6]),
//       ameriqueInfectes: Number(cells[7]),
//       ameriqueMorts: Number(cells[8]),
//       ameriqueGueris: Number(cells[9]),
//       asieInfectes: Number(cells[10]),
//       asieMorts: Number(cells[11]),
//       asieGueris: Number(cells[12]),
//       europeInfectes: Number(cells[13]),
//       europeMorts: Number(cells[14]),
//       europeGueris: Number(cells[15]),
//       oceanieInfectes: Number(cells[16]),
//       oceanieMorts: Number(cells[17]),
//       oceanieGueris: Number(cells[18]),
//       autreInfectes: Number(cells[19]),
//       autreMorts: Number(cells[20]),
//       autreGueris: Number(cells[21]),
//     }))
//     .filter((d, i) => i > 0)
//   ))
