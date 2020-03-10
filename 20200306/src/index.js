import * as d3 from 'd3'

const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5

const svg = d3.select('body')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)
  .attr('transform', 'translate(0, 15)')

const DATA = [{
    "Nom": "Chinchou",
    "Type": [
      "Water",
      "Electric"
    ],
    "Stats": 330,
    "Génération": 1
  },
  {
    "Nom": "Lanturn",
    "Type": [
      "Water",
      "Electric"
    ],
    "Stats": 460,
    "Génération": 1
  },
  {
    "Nom": "Joltik",
    "Type": [
      "Bug",
      "Electric"
    ],
    "Stats": 319,
    "Génération": 1
  },
  {
    "Nom": "Galvantula",
    "Type": [
      "Bug",
      "Electric"
    ],
    "Stats": 472,
    "Génération": 1
  },
  {
    "Nom": "Stunfisk",
    "Type": [
      "Ground",
      "Electric"
    ],
    "Stats": 471,
    "Génération": 1
  },
  {
    "Nom": "Zekrom",
    "Type": [
      "Dragon",
      "Electric"
    ],
    "Stats": 680,
    "Génération": 1
  },
  {
    "Nom": "Charjabug",
    "Type": [
      "Bug",
      "Electric"
    ],
    "Stats": 400,
    "Génération": 1
  },
  {
    "Nom": "Vikavolt",
    "Type": [
      "Bug",
      "Electric"
    ],
    "Stats": 500,
    "Génération": 1
  }
]

const MARGIN_LEFT = 100
const MARGIN_BOTTOM = 50
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / DATA.length
const BAR_HEIGHT = MARGIN_BOTTOM / DATA.length

const yScale = d3.scaleLinear()
  .domain([0, d3.max(DATA, d => d.Stats)])
  .range([HEIGHT - MARGIN_BOTTOM, 0])

const batons = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, -10)`)

const stats = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT * 0.9}, -20)`)

batons.selectAll('rect')
  .data(DATA)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.Stats))
  .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.Stats))
  .attr('fill', 'maroon')

batons.selectAll('text')
  .data(DATA)
  .enter()
  .append('text')
  .text(d => d.Nom)
  .attr('x', (d, i) => i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
  .attr('text-anchor', 'middle')
  .attr('font-size', '15px')

stats.selectAll('text')
  .data(DATA)
  .enter()
  .append('text')
  .text(d => d.Stats)
  .attr('x', (d, i) => i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', HEIGHT - MARGIN_BOTTOM)
  .attr('text-anchor', 'right')
  .attr('font-size', '10px')
  .attr('fill', 'white')

const axis = d3.axisLeft(yScale)
  .ticks(5)
  .tickFormat(d => d)

const gAxis = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT  * 0.7}, 0)`)
  .call(axis)
