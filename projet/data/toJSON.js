const R = require('ramda')
const dataBrut = require('./dataBrut.json')
const data = dataBrut
  .filter(d => d.region !== 'Monde hors Chine')
  .filter(d => d.indicateur !== 'encore infectés')

const dates = R.uniq(data.map(d => d.date)).sort()

const regions = R.uniq(data.map(d => d.region)).sort()

const indicateursParRegionEtDate = (region, date) =>
  data
  .filter(d => d.region === region && d.date === date)
  .reduce((r, d) => ({
    ...r,
    [d.indicateur]: d.valeur
  }), {})

const result = dates.map(date => ({
  date,
  ...regions.reduce((r, region) => ({
    ...r,
    [region]: indicateursParRegionEtDate(region, date)
  }), {})
}))

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
)
