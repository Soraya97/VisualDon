import dessinerGraphiqueG from './grapheGueris.js'
import dessinerGraphiqueM from './grapheMorts.js'
import dessinerGraphiqueI from './grapheInfectes.js'


import * as d3 from 'd3';

dessinerGraphiqueG('Guéris')

// var allGroup = ["Guéris", "Morts", "Infectés"]
//
// d3.select("#selectButton")
//       .selectAll('myOptions')
//      	.data(allGroup)
//       .enter()
//     	.append('option')
//       .text(function (d) { return d; }) // text showed in the menu
//       .attr("value", function (d) { return d; }) // corresponding value return


// if (button.value = 'Guéris') {
//   console.log('g');
//
// }
//
// if ('Morts') {
//   console.log('m');
//
// }
//
// if ('Infectés') {
//   // dessinerGraphiqueX('graphique-x')
//
// }
// console.log(allGroup.value);

d3.select("#morts").on("click", function(d) {
      dessinerGraphiqueM('Morts')
        console.log('m');
})

d3.select("#gueris").on("click", function(d) {
      dessinerGraphiqueG('Guéris')
      console.log('g');
})

d3.select("#infectes").on("click", function(d) {
        dessinerGraphiqueI('Infectes')
        console.log('i');
})
