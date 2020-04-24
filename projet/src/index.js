import * as d3 from 'd3';
import data from '../data/dataCovid19.json';

const WIDTH = 1500
const HEIGHT = 500
const MARGIN = 5

const svg = d3.select('.covid')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

const MARGIN_LEFT = 50
const MARGIN_BOTTOM = 50

svg.append("text")
  .attr("x", MARGIN_LEFT + 5)
  .attr("y", MARGIN_BOTTOM)
  .attr("text-anchor", "start")
  .style("fill", "black")
  .style("font-weight", "300")
  .style("font-size", "16px")
  .text("Courbe des guéris");

//** AXIS **//
/* Y axis */
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.Monde.guéris)]) // ce qui est marqué sur l'axe
  .range([HEIGHT - MARGIN_BOTTOM, 0]) // où l'axe est placé

const yAxis = d3.axisLeft(yScale)
  .ticks(5)
  .tickFormat(d => `${d/1000}k`)

const lAxis = svg.append('g')
  .attr("class", "yaxis")
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
  .call(yAxis)

/* X axis */
const parseTime = d3.timeParse("%Y-%m-%d")
const mindate = d3.min(data, d => parseTime(d.date)),
  maxdate = d3.max(data, d => parseTime(d.date));
let date = parseTime(data.date)
const xScale = d3.scaleTime()
  .domain([mindate, maxdate])
  .range([0, WIDTH])

const xAxis = d3.axisBottom(xScale)
  .ticks(20)

const bAxis = svg.append('g')
  .attr("class", "xaxis")
  .attr('transform', `translate(${MARGIN_LEFT}, 450)`)
  .call(xAxis)


//** affichage des courbes **//

const line = d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale(d.Monde.guéris))

svg.selectAll('yaxis')
  .data(data)
  .enter()
  .append("line")

svg.append("path")
  .datum(data)
  .attr("d", line)
  .attr('stroke', 'red')
  .attr('fill', 'white')
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)

//** Couleur selon région **//

export const getColorByRegion = ({
  region
}) => {
  switch (region) {
    case 'Monde':
      return 'red'
    case 'Amérique':
      return '#fc8d62'
    case 'Europe':
      return '#8da0cb'
    case 'Asie':
      return '#e78ac3'
    case 'Océanie':
      return '#a6d854'
    case 'Afrique':
      return '#ffd92f'
  }
}
