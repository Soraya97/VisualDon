import { select } from 'd3'
import * as d3 from 'd3';
import data from '../data/dataCovid19.json';

export default dessinerGraphique => {

const WIDTH = 1500
const HEIGHT = 1000
const MARGIN = 5

const svg = d3.select('.covid')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)
  svg.selectAll('*').remove()

const MARGIN_LEFT = 50
const MARGIN_BOTTOM = 50

svg.append("text")
  .attr('class', 'subTitle')
  .attr("x", MARGIN_LEFT + 5)
  .attr("y", MARGIN_BOTTOM)
  .attr("text-anchor", "start")
  .style("fill", "black")
  .style("font-size", "16px")
  .text("Courbe des infectés");


const continents = [{
    nom: 'Monde',
    color: 'HotPink'
  },
  {
    nom: 'Afrique',
    color: 'black'
  },
  {
    nom: 'Amérique',
    color: 'FireBrick'
  },
  {
    nom: 'Asie',
    color: 'Gold'
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
    color: 'RebeccaPurple'
  }
]

//** AXIS **//
/* Y axis */
const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.Monde.infectés)) // ce qui est marqué sur l'axe
  .range([HEIGHT - MARGIN_BOTTOM - 500, 0]) // où l'axe est placé

const yAxis = d3.axisLeft(yScale)
  .ticks(10)
  .tickFormat(d => `${d/1000}k`)
  .tickSize(-WIDTH, 0)

const lAxis = svg.append('g')
  .attr("class", "yaxis")
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
  .call(yAxis)


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


//** affichage des courbes **//

const getPath = ({
    nom
  }) =>
  d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale(d[nom].infectés))

const getLine = (path, color) =>
  svg.append("path")
  .datum(data)
  .attr("d", path)
  .attr('stroke', color)
  .attr('fill', 'none')
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
  .attr('opacity', 1)

const continentsData = continents
  .map(d => ({
    ...d,
    path: getPath(d)
  }))
  .map(d => ({
    ...d,
    line: getLine(d.path, d.color)
  }))

//** Légendes **//
let legend = svg.append("g")
  .attr("class", "legends")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", 100)
  .attr("width", 100)

const getColorByName = name => {
  const found = Object.keys(color).map(key => color[key]).find(d => d[0] === name)
  return found ? found[1] : 'black'
}

legend.selectAll('g')
  .data(continentsData)
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
    //**Animation**//
    g.on('click', () => {
      d.line.attr('opacity', d.line.attr('opacity') === '0' ? 1 : 0)
    })
  });

}
