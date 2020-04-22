import * as d3 from 'd3';
import data from '../data/dataCovid19.json';

/**
https://github.com/d3/d3-shape#areas
https://github.com/idris-maps/heig-datavis-2020/tree/master/modules/rosling/graphique_d3 // interaction avec des bulles
https://observablehq.com/@idris-maps/visualisation-de-donnees?collection=@idris-maps/heig-visdom-2020 // Types de visualisation de données
https://www.d3-graph-gallery.com/ // galerie de graphes avec d3
https://www.d3-graph-gallery.com/graph/density_basic.html // graphe de densité avec d3
https://www.datavis.fr/index.php?page=transition // affichage interactif
https://www.datavis.fr/index.php?page=linearchart // dessiner une courbe
https://www.datavis.fr/index.php?page=twolinearchart // dessiner deux courbes
http://bl.ocks.org/phoebebright/3059392 // avoir des dates sur les axes
*/

const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5

const svg = d3.select('.covid')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT)

const MARGIN_LEFT = 100
const MARGIN_BOTTOM = 50

//** AXIS **//
/* Y axis */
const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.Monde.infectés)]) // ce qui est marqué sur l'axe
  .range([HEIGHT - MARGIN_BOTTOM, 0]) // où l'axe est placé

const yAxis = d3.axisLeft(yScale)
  .ticks(5)
  .tickFormat(d => `${d/1000}k`)

const lAxis = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT  * 0.7}, 0)`)
  .call(yAxis)

svg.append("text")
  .attr("text-anchor", "start")
  .attr('transform', `rotate(-90, ${WIDTH / MARGIN - MARGIN_LEFT}, ${HEIGHT})`)
  .attr("x", HEIGHT / 5 + MARGIN_BOTTOM)
  .attr("y", HEIGHT - 80)
  .text("Nombre de victimes du Covid-19");

/* X axis */
var mindate = new Date(2019, 12, 16),
  maxdate = new Date(2020, 4, 20);
const parseTime = d3.timeParse("%d/%m/%Y");
let date = parseTime(data.date)
const xScale = d3.scaleTime()
  .domain([mindate, maxdate])
  .range([WIDTH, 0])

const xAxis = d3.axisBottom(xScale)
  .ticks(25)
// .tickFormat(d => `${d/1000}k`)

const bAxis = svg.append('g')
  .attr("class", "xaxis")
  .attr('transform', `translate(${MARGIN_LEFT  * 0.7}, 450)`)
  .call(xAxis)

svg.append("text")
  .attr("text-anchor", "end")
  .attr("y", HEIGHT - 10)
  .attr("x", MARGIN_LEFT)
  .text("Date")



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

//** affichage des courbes **//
