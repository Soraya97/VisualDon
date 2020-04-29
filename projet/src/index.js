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

svg.append("text")
  .attr("x", MARGIN_LEFT + 5)
  .attr("y", MARGIN_BOTTOM)
  .attr("text-anchor", "start")
  .style("fill", "black")
  .style("font-size", "16px")
  .text("Courbe des guéris");

let color = {
  0: ["Monde", "HotPink"],
  1: ["Afrique", "black"],
  2: ["Amérique", "FireBrick"],
  3: ["Asie", "Gold"],
  4: ["Europe", "RoyalBlue"],
  5: ["Océanie", "LimeGreen"],
  6: ["Autres", "RebeccaPurple"]
}

//** AXIS **//
/* Y axis */
const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.Monde.guéris)) // ce qui est marqué sur l'axe
  .range([HEIGHT - MARGIN_BOTTOM - 500, 0]) // où l'axe est placé

const yAxis = d3.axisLeft(yScale)
  .ticks(10)
  .tickFormat(d => `${d/1000}k`)
  .tickSize(-WIDTH)


const lAxis = svg.append('g')
  .attr("class", "yaxis")
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
  .call(yAxis)


// svg.append("text")
//   .attr("text-anchor", "start")
//   .attr('transform', `rotate(-90, ${WIDTH / MARGIN - MARGIN_LEFT}, ${HEIGHT})`)
//   .attr("x", HEIGHT / 5 + MARGIN_BOTTOM + 90)
//   .attr("y", HEIGHT - MARGIN_LEFT - 70)
//   .text("Nombre de victimes du Covid-19");

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

// svg.append("text")
//   .attr("text-anchor", "end")
//   .attr("y", HEIGHT - 10)
//   .attr("x", MARGIN_LEFT)
//   .text("Date")


//** affichage des courbes **//

let lineDraw = (region, color) => {
  let line = svg.append("path")
    .datum(data)
    .attr("d", region)
    .attr('stroke', color)
    .attr('fill', 'none')
    .attr('transform', `translate(${MARGIN_LEFT}, 0)`)
  return line
}
// svg.selectAll('yaxis')
//   .data(data)
//   .enter()
//   .append("line")

const world = d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale(d.Monde.guéris))
  .curve(d3.curveNatural)

const africa = d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale(d.Afrique.guéris))
  .curve(d3.curveNatural)

const america = d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale(d.Amérique.guéris))
  .curve(d3.curveNatural)

const asia = d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale(d.Asie.guéris))
  .curve(d3.curveNatural)

const europa = d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale(d.Europe.guéris))
  .curve(d3.curveNatural)

const oceania = d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale(d.Océanie.guéris))
  .curve(d3.curveNatural)

const other = d3.line()
  .x(d => xScale(parseTime(d.date)))
  .y(d => yScale(d.Autres.guéris))
  .curve(d3.curveNatural)


const worldAnim = lineDraw(world, color[0][1])
const africaAnim = lineDraw(africa, color[1][1])
const americaAnim = lineDraw(america, color[2][1])
const asiaAnim = lineDraw(asia, color[3][1])
const europaAnim = lineDraw(europa, color[4][1])
const oceaniaAnim = lineDraw(oceania, color[5][1])
const otherAnim = lineDraw(other, color[6][1])

const linePathWorld = worldAnim.node().getTotalLength();
const linePathAfrica = africaAnim.node().getTotalLength();
const linePathAmerica = americaAnim.node().getTotalLength();
const linePathAsia = asiaAnim.node().getTotalLength();
const linePathEuropa = europaAnim.node().getTotalLength();
const linePathOceania = oceaniaAnim.node().getTotalLength();
const linePathOther = otherAnim.node().getTotalLength();


let lineAnim = (line, linePath) => {
  line
    .attr("stroke-dasharray", linePath)
    .attr("stroke-dashoffset", linePath)
    .transition()
    .duration(3000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);
}

// setTimeout(function() {
//   lineAnim(worldAnim, linePathWorld)
// }, 0);
// setTimeout(function() {
//   lineAnim(asiaAnim, linePathAsia)
// }, 1000);



// lineAnim(africaAnim, linePathAfrica)
// lineAnim(americaAnim, linePathAmerica)
// lineAnim(europaAnim, linePathEuropa)
// lineAnim(oceaniaAnim, linePathOceania)
// lineAnim(otherAnim, linePathOther)

//** Légendes **//
let legend = svg.append("g")
  .attr("class", "legends")
  .attr("x", 0)
  .attr("y", 0)
  .attr("height", 100)
  .attr("width", 100)
// .attr('transform', 'translate(-500,50)');

legend.selectAll('g').data(data)
  .enter()
  .append('g')
  .each(function(d, i) {
    let g = d3.select(this).attr("class", "legend");
    g.append("rect")
      .attr("x", MARGIN_LEFT + 10)
      .attr("y", i * 25 + 480)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color[i][1]);

    g.append("text")
      .attr("x", MARGIN_LEFT + 25)
      .attr("y", i * 25 + 488)
      .attr("height", 30)
      .attr("width", 100)
      .style("fill", color[i][1])
      .text(color[i][0]);

  });
