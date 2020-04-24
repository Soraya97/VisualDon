const cheerio = require('cheerio')
const fs = require('fs')

const page = fs.readFileSync('page.html', 'utf-8')

const $ = cheerio.load(page)

const row = $('.col-md-9 > div:nth-child(2)')

const divs = $('div.caption', row)

let result = []

divs.each((index, div) => {
  if (index !== 0) {
    result.push({
      titre: $('.title', div).attr('title'),
      prix: $('.price', div).text()
    })
  }
})

console.log(
    result.map(d => ({Nom: d.titre, Prix: d.prix }))
)
