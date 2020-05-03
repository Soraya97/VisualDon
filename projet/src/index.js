import * as d3 from 'd3';
import data from '../data/dataCovid19.json';

const WIDTH = 1500
const HEIGHT = 1000
const MARGIN = 5

const svg = d3.select('.covid')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

const MARGIN_LEFT = 50
const MARGIN_BOTTOM = 50

// tableau des continents avec les couleurs et les valeurs par graphique ajoutées
const continents = [{
    nom: 'Monde',
    color: 'HotPink'
  },
  {
    nom: 'Afrique',
    color: 'Coral'
  },
  {
    nom: 'Amérique',
    color: 'Crimson'
  },
  {
    nom: 'Asie',
    color: '#f2ce00'
  },
  {
    nom: 'Europe',
    color: 'RoyalBlue'
  },
  {
    nom: 'Océanie',
    color: 'LimeGreen'
  },
  {
    nom: 'Autres',
    color: 'MediumPurple'
  }
].map(({
  nom,
  color
}) => ({
  nom,
  color,
  gueris: data.map(d => ({
    value: d[nom]['guéris'],
    date: d.date
  })),
  infectes: data.map(d => ({
    value: d[nom]['infectés'],
    date: d.date
  })),
  morts: data.map(d => ({
    value: d[nom]['morts'],
    date: d.date
  })),
}))


//** AXIS **//
/* Y axis */
// fonction pour l'axe y, qui varie selon le graphique: fonction prend "quoi"(guéris, morts ou infectés) et retourne une échelle différente selon les valeurs du Monde
const createYScale = quoi => {
  const valeursMonde = continents.find(d => d.nom === 'Monde')[quoi].map(d => d.value)
  return d3.scaleLinear()
    .domain(d3.extent(valeursMonde))
    .range([HEIGHT - MARGIN_BOTTOM - 500, 0])
}

// Création d'une échelle par graphique
const yScale = {
  gueris: createYScale('gueris'),
  morts: createYScale('morts'),
  infectes: createYScale('infectes'),
}
// fonction de dessin de l'axe y selon "quoi"
const createYAxis = quoi =>
  d3.axisLeft(yScale[quoi])
  .ticks(10)
  .tickFormat(d => `${d/1000}k`)
  .tickSize(-WIDTH, 0)

// création d'un groupe avec les axes y (avec guéris pour valeur par défaut) et dessin
const yAxisGroup = svg.append('g')
  .attr("class", "yaxis")
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
  .call(createYAxis('gueris'))

/* X axis */
const parseTime = d3.timeParse("%Y-%m-%d")

let date = parseTime(data.date)
const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => parseTime(d.date)))
  .range([0, WIDTH])

const xAxis = d3.axisBottom(xScale)
  .ticks(20)

const bAxis = svg.append('g')
  .attr("class", "xaxis")
  .attr('transform', `translate(${MARGIN_LEFT}, 450)`)
  .call(xAxis)


//** COURBES **//
// fonction création d'une ligne, dépendemment de l'échelle Y
const getLineCreator = quoi =>
  d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale[quoi](d.value))
  .curve(d3.curveNatural)

// fonction de création des lignes (avec guéris pour valeur par défaut)
const getLine = d =>
  svg.append("path")
  .datum(d.gueris)
  .attr("d", getLineCreator('gueris'))
  .attr('stroke', d.color)
  .attr("stroke-width", 2)
  .attr('fill', 'none')
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
  .attr('opacity', 1)

// création d'un nouveau tableau withLines, similaire à continents mais avec les courbes en plus
const withLines = continents.map(d => ({
  ...d,
  line: getLine(d, 'gueris')
}))

// bouton #selectButton
const selectButton = document.getElementById('selectButton')

const getSub = d =>
  svg.append("text")
  .datum(d.gueris)
  .attr('class', 'subTitle')
  .attr("x", MARGIN_LEFT + 5)
  .attr("y", MARGIN_BOTTOM)
  .attr("text-anchor", "start")
  .style("fill", "black")
  .style("font-size", "16px")
  .text(`Graphe des ${d.sub}`);


// création d'un nouveau tableau withLines, similaire à continents mais avec les courbes en plus
// const subs = withLines.map(d => ({
//   ...d,
//   sub: getSub(d, 'gueris')
// }))
// console.log(subs);
// const subTitle = quoi => {
//   svg.append("text")
//   .attr('class', 'subTitle')
//   .attr("x", MARGIN_LEFT + 5)
//   .attr("y", MARGIN_BOTTOM)
//   .attr("text-anchor", "start")
//   .style("fill", "black")
//   .style("font-size", "16px")
//   .text(`Graphe des ${quoi}`);
// }
//
// subTitle('guéris')

// fonction mettant à jour le graphique quand le bouton change de valeur, elle prend "quoi" pour savoir quel graphique dessiner
const update = quoi => {
  withLines.map(d => {
    d.line.datum(d[quoi]) // màj des données pour chaque ligne (inclue dans d depuis continents en haut de la page)
      .transition()
      .duration(500)
      .attr('d', getLineCreator(quoi)) // d est changé avec une nouvelle ligne selon le jeu de données
  })
  yAxisGroup // màj de l'axe y
    .transition()
    .duration(500)
    .call(createYAxis(quoi)) // axe y est changé selon le jeu de données

  // subs.map(d => {
  //   d.sub.datum(d[quoi]) // màj des données pour chaque ligne (inclue dans d depuis continents en haut de la page)
  //     // .transition()
  //     // .duration(500)
  //     .attr('d', getSub(quoi)) // d est changé avec une nouvelle ligne selon le jeu de données
  // })

  // subTitle(quoi)

}

selectButton.addEventListener('click', e => update(e.target.value))


//** LÉGENDES **//
let legend = svg.append("g")
  .attr("class", "legends")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", 100)
  .attr("width", 100)

legend.selectAll('g')
  .data(withLines)
  .enter()
  .append('g')
  .each(function(d, i) {
    let g = d3.select(this).attr("class", "legend");
    g.append("rect")
      .attr("x", MARGIN_LEFT + 8)
      .attr("y", i * 25 + 478)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", d.color);
    g.append("text")
      .attr("x", MARGIN_LEFT + 25)
      .attr("y", i * 25 + 488)
      .attr("height", 30)
      .attr("width", 100)
      .style("fill", d.color)
      .text(d.nom)
      .on('mouseover', function(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '.20')
      })
      .on('mouseout', function(d, i) {
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '1')
      })

    //**Animation**//
    g.on('click', () => {
      d.line.attr('opacity', d.line.attr('opacity') === '0' ? 1 : 0)
    })
  });
