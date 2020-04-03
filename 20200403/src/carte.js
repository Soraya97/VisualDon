import * as d3 from 'd3';
import suisse from '../suisse.json';

// Dessin de la carte de la Suisse
let pathCreator = d3.geoPath();
let countryPaths = suisse.features.map(pathCreator);

const width = 1100;
const xMin = 2486148
const yMin = 1076498
const xMax = 2833837
const yMax = 1295165
const WIDTH = 1100
const HEIGHT = width * ((yMax - yMin) / (xMax - xMin))

const projection = d3.geoTransform({
  point: function(x, y) {
    this.stream.point(
      (x - xMin) / (xMax - xMin) * WIDTH,
      HEIGHT - (y - yMin) / (yMax - yMin) * HEIGHT
    )
  }
});
pathCreator = d3.geoPath().projection(projection)

const svg = d3.select('body')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT + 10)

svg.selectAll('path')
  .data(suisse.features)
  .enter()
  .append('path')
  .attr('d', pathCreator)
  .attr('stroke', 'SandyBrown')
  .attr('fill', 'PapayaWhip')


// Point sur le Mont-sur-Lausanne
const projectX = x => (x - xMin) / (xMax - xMin) * WIDTH
const projectY = y => HEIGHT - (y - yMin) / (yMax - yMin) * HEIGHT

const projectionPoint = d3.geoTransform({
  point: function(x, y) {
    this.stream.point(projectX(x), projectY(y)) // utiliser les fonctions
  }
})
const pathCreatorPoint = d3.geoPath().projection(projectionPoint)

svg.selectAll('path')
  .data(suisse.features)
  .enter()
  .append('path')
  .attr('d', pathCreatorPoint)

const mont = [2533555,1149818]

const montX = projectX(mont[0])
const montY = projectY(mont[1])

svg.append('circle')
  .attr('cx', montX)
  .attr('cy', montY)
  .attr('r', 5)
  .attr('fill', 'PaleVioletRed')
