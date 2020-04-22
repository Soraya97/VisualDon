const fs = require('fs')
const R = require('ramda')

const file = fs.readFileSync('COVID-19_StatistiquesPandemie.tsv', 'utf-8')

const [head, ...rest] = file.split('\n')

const splitRow = row => row.split('\t')

const keys = splitRow(head)

const rows = rest.map(splitRow)

const fixDate = date => {
  const [day, month, year] = date.split('.')
  return `${year}-${month}-${day}`
}

const parDate = rows.map(row =>
  row
    .map((cell, index) => {
      const value = index === 0 ? fixDate(cell) : Number(cell)
      return { value, key: keys[index] }
    })
    .reduce((result, { value, key }) => ({ ...result, [key]: value }), {})
)

const fixIndicateur = d => {
  if (d === 'i') { return 'infectés' }
  if (d === 'm') { return 'morts' }
  if (d === 'g') { return 'guéris' }
  if (d === 'e') { return 'encore infectés' }
  throw new Error(`Indicateur inconnu: ${d}`)
}

const fixRegion = d => {
  if (d === 'amerique') { return 'Amérique' }
  if (d === 'oceanie') { return 'Océanie' }
  if (d === 'hors-chine') { return 'Monde hors Chine' }
  const [first, ...rest] = Array.from(d)
  return [first.toUpperCase(), ...rest].join('')
}

const result = R.flatten(parDate.map(d => {
  const date = d.date
  return R.keys(R.omit(['date'], d)).map(key => {
    const [region, indicateur] = key.split('_')
    return {
      date,
      region: fixRegion(region),
      indicateur: fixIndicateur(indicateur),
      valeur: d[key],
    }
  })
}))

console.log(
  JSON.stringify(result)
)
