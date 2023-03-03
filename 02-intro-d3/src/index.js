import {select} from "d3-selection";

/*
  Créez 3 cercles de 40px de rayon et placez-les respectivement à : (50,50), (150,150), (250,250)
*/
d3.select('body')
  .append('div')
  .append('svg')
  .attr('width', 300)
  .attr('height', 400);

for (let i = 0; i < 3; i++) {
  d3.select('svg')
    .append('circle')
    .attr('id', `circle-${i}`)
    .attr('cx', 50 + i * 100)
    .attr('cy', 50 + i * 100)
    .attr('r', 40);

    const cx = 70 + i * 100;

    if (i == 2) {
      cx = 30 + i * 100;
    }

    d3.select('svg')
      .append('text')
      .attr('id', `text-${i}`)
      .attr('x', cx)
      .attr('y', 105 + i * 100)
      .text(`circle-${i}`);
}

d3.select('#circle-1')
  .attr('fill', 'red');

// Move 50px to the right
d3.selectAll('#circle-0, #circle-1')
  .attr('cx', (d, i) => 50 + i * 100 + 50);

d3.select('#circle-2')
  .on('click', () => {
    d3.selectAll('circle')
      .transition()
      .attr('cx', 100);
  })

/*
Vous avez à disposition les données suivantes: [20, 5, 25, 8, 15]
*/

const values = [20, 5, 25, 8, 15];

d3.select('svg')
  .selectAll('rect')
  .data(values)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * 30)
  .attr('y', d => 400 - d)
  .attr('width', 20)
  .attr('height', d => d)
  .attr('fill', 'blue');
