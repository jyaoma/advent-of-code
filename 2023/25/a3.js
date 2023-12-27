const fs = require('fs');
const cytoscape = require('./cytoscape.min');

const isExample = false;

const file = fs.readFileSync(`${__dirname}/${isExample ? 'example' : 'input'}.txt`, { encoding: 'utf-8'});
const startingNode = isExample ? 'jqt' : 'jkf';

const lines = file.split('\r\n');

const DEBUG = !isExample;

const nodes = {};
let allNodes = new Set();

lines.forEach(line => {
    const [center, legs] = line.split(': ');
    const parsedLegs = legs.split(' ');
    nodes[center] = parsedLegs;
    allNodes = new Set([...allNodes, center, ...parsedLegs]);
});

const elements = [];

allNodes.forEach(node => {
    elements.push({ data: {
        group: 'nodes',
        id: node
    }})
});

Object.keys(nodes).forEach(center => {
    const legs = nodes[center];
    legs.forEach(leg => {
        let id = `${center}/${leg}`;
        if (leg < center) id = `${leg}/${center}`;
        elements.push({
            data: {
                group: 'edges',
                id,
                source: center,
                target: leg
            }
        });
    });
});

const cy = cytoscape({ elements });

// const test = cy.
const minCut = cy.elements().kargerStein();
const cuts = minCut.cut;
console.log(cuts);
const split = minCut.components
const filtered0 = split[0].filter((ele) => ele.group() === 'nodes');
const filtered1 = split[1].filter((ele) => ele.group() === 'nodes');

console.log(filtered0.length * filtered1.length)