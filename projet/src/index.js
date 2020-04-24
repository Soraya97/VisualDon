import * as d3 from 'd3';
import data from '../data/dataCovid19.json';

const WIDTH = 1500
const HEIGHT = 500
const MARGIN = 5

const svg = d3.select('.covid')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

const MARGIN_LEFT = 100
const MARGIN_BOTTOM = 50

svg.append("text")
    .attr("x", MARGIN_LEFT )
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
  .attr('transform', `translate(${MARGIN_LEFT  * 0.7}, 0)`)
  .call(yAxis)

svg.append("text")
  .attr("text-anchor", "start")
  .attr('transform', `rotate(-90, ${WIDTH / MARGIN - MARGIN_LEFT}, ${HEIGHT})`)
  .attr("x", HEIGHT / 5 + MARGIN_BOTTOM + 90)
  .attr("y", HEIGHT - MARGIN_LEFT - 70)
  .text("Nombre de victimes du Covid-19");

/* X axis */
const parseTime = d3.timeParse("%Y-%m-%d")
const mindate = d3.min(data, d => parseTime(d.date)),
  maxdate = d3.max(data, d => parseTime(d.date));
let date = parseTime(data.date)
const xScale = d3.scaleTime()
  .domain([mindate, maxdate])
  .range([0, WIDTH])

const xAxis = d3.axisBottom(xScale)
  .ticks(10)

const bAxis = svg.append('g')
  .attr("class", "xaxis")
  .attr('transform', `translate(${MARGIN_LEFT  * 0.7}, 450)`)
  .call(xAxis)

svg.append("text")
  .attr("text-anchor", "end")
  .attr("y", HEIGHT - 10)
  .attr("x", MARGIN_LEFT)
  .text("Date")


//** affichage des courbes **//

// const batons = svg.append('g')
//   .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
//
// batons.selectAll('rect')
//   .data(data)
//   .enter()
//   .append('rect')
//   .attr('x', (d, i) =>  i * ((WIDTH - MARGIN_LEFT) / data.length))
//   .attr('width', ((WIDTH - MARGIN_LEFT) / data.length) - MARGIN)
//   .attr('y', d => yScale(d.Monde.guéris))
//   .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.Monde.guéris))
//   .attr('fill', 'steelblue')

const line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.Monde.guéris));

svg.selectAll('yaxis')
  .data(data)
  // .data(yScale.ticks(10))
  .enter()
  .append("line")
  .attr("x1", 0)
  .attr("x2", WIDTH)
  .attr("y1", d => yScale(d))
  .attr("y2", d => yScale(d))

svg.append("path")
  .data(data)
  .attr("d", line);


//** Couleur selon région **//

// export const getColorByRegion = ({
//   region
// }) => {
//   switch (region) {
//     case 'Monde':
//       return '#66c2a5'
//     case 'Amérique':
//       return '#fc8d62'
//     case 'Europe':
//       return '#8da0cb'
//     case 'Asie':
//       return '#e78ac3'
//     case 'Océanie':
//       return '#a6d854'
//     case 'Afrique':
//       return '#ffd92f'
//   }
// }
