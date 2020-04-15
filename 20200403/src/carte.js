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


const projectX = x => (x - xMin) / (xMax - xMin) * WIDTH
const projectY = y => HEIGHT - (y - yMin) / (yMax - yMin) * HEIGHT

let projection = d3.geoTransform({
  point: function(x, y) {
    this.stream.point(projectX(x), projectY(y))
  }
})

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


// Points sur le Mont-sur-Lausanne et Yverdon

let point = (x, y, name) => {
  svg.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 5)
    .attr('fill', 'PaleVioletRed')
    .on('mouseover', function(d) {
      svg.append('text').text(name).attr('x', x).attr('y', y - 10).attr('text-anchor', 'middle').attr('fill', 'PaleVioletRed')
    })
}

const mont = [2533555, 1149818]

const montX = projectX(mont[0])
const montY = projectY(mont[1])

point(montX, montY, 'Le Mont')

const yverdon = [2539070, 1181442]

const yverdonX = projectX(yverdon[0])
const yverdonY = projectY(yverdon[1])

point(yverdonX, yverdonY, 'Yverdon')
