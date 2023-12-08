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

let curNode = 'AAA';
let count = 0;

while (curNode !== 'ZZZ') {
    curNode = paths[curNode][instructions[count++ % instructions.length]];
}

console.log(count);