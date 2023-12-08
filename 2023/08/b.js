const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const paths = {};

const [instructionList, _, ...nodeList] = lines;

nodeList.forEach(line => {
    const [node, nodes] = line.split(' = ');
    const [L, R] = nodes.slice(1, 9).split(', ');
    paths[node] = { L, R };
});

const instructions = instructionList.split('');

// let curNode = 'AAA';
let curNodes = Object.keys(paths).filter(key => key[2] === 'A');

// while (curNodes.filter(node => node[2] !== 'Z').length !== 0) {
//     curNodes = curNodes.map(curNode => paths[curNode][instructions[count % instructions.length]])
//     count++;
// }

const factors = curNodes.map(curNode => {
    let count = 0;
    while (curNode[2] !== 'Z') {
        curNode = paths[curNode][instructions[count++ % instructions.length]]
    }
    return count;
});

console.log(factors);