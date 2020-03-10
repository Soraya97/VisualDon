import * as d3 from 'd3'

const DATA = [{
    Name: "Chinchou",
    Stats: 330,
  },
  {
    Name: "Lanturn",
    Stats: 460,
  },
  {
    Name: "Joltik",
    Stats: 319,
  },
  {
    Name: "Galvantula",
    Stats: 472,
  },
  {
    Name: "Stunfisk",
    Stats: 471,
  },
  {
    Name: "Zekrom",

    Stats: 680,
  },
  {
    Name: "Charjabug",
    Stats: 400,
  },
  {
    Name: "Vikavolt",
    Stats: 500,
  }
]

let getPieData = d3.pie().value(d => d.Stats)

let pieData = getPieData(DATA)

const width = 2000
const height = 2000

const WIDTH = width / 3
const HEIGHT = width / 4

const svg = d3.select('body')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)
  .attr('transform', 'translate(0, 15)')

const arcCreator = d3.arc()
  .innerRadius(0)
  .outerRadius(HEIGHT / 2 - 10) // pour que tout le camembert soit visible

const color = ({
  data
}) => {
  switch (data.Name) {
    case 'Chinchou':
      return 'Lavender'
    case 'Lanturn':
      return 'thistle'
    case 'Joltik':
      return 'tan'
    case 'Galvantula':
      return 'plum  '
    case 'Stunfisk':
      return 'palegreen'
    case 'Zekrom':
      return 'LightSeaGreen'
    case 'Charjabug':
      return 'turquoise'
    case 'Vikavolt':
      return 'AntiqueWhite'
    default:
      return 'indianred'
  }
}

const pie = svg.append('g')
  .attr('transform', `translate(${HEIGHT / 2}, ${HEIGHT / 2})`)

pie.selectAll('path')
  .data(pieData)
  .enter()
  .append('path')
  .attr('d', arcCreator)
  .attr('fill', color)

// un texte pour chaque tranche
pie.selectAll('text')
  .data(pieData)
  .enter()
  .append('text')
  // .centroid permet de trouver le centre de la tranche
  .attr('transform', d => `translate(${arcCreator.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .text(d => d.data.Stats)

// la légende
const legend = svg.append('g')
  .attr('transform', `translate(${HEIGHT-10})`)

const RECT_WIDTH = 25

// les carrés de couleur
legend.selectAll('rect')
  .data(pieData)
  .enter()
  .append('rect')
  .attr('y', (d, i) => i * RECT_WIDTH)
  .attr('width', RECT_WIDTH)
  .attr('height', RECT_WIDTH)
  .attr('fill', color)

// les noms de fruits
legend.selectAll('text')
  .data(pieData)
  .enter()
  .append('text')
  .attr('x', RECT_WIDTH * 1.5)
  .attr('y', (d, i) => i * RECT_WIDTH + RECT_WIDTH * 0.75)
  .attr('width', RECT_WIDTH)
  .attr('height', RECT_WIDTH)
  .text(d => d.data.Name)
