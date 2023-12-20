const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let grid = [[0, 0]];
let row = 0;
let col = 0;

const right = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        grid.push([row, ++col]);
    }
}

const left = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        grid.push([row, --col]);
    }
}

const down = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        grid.push([++row, col]);
    }
}

const up = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        grid.push([--row, col]);
    }
}

const functions = {
    'R': right,
    'L': left,
    'U': up,
    'D': down
}

lines.forEach(line => {
    const [dir, quantityStr] = line.split(' ');
    functions[dir](parseInt(quantityStr));
});

// shoelace formula
let sum = 0;
for (let i = 0; i < grid.length - 1; i++) {
    sum += grid[i][1] * grid[i + 1][0] - grid[i][0] * grid[i + 1][1];
}

const shoelaceArea = Math.abs(sum / 2);

// console.log(shoelaceArea);

const picksB = (shoelaceArea - (grid.length - 1) / 2 + 1);

// console.log(picksB);

const answer = picksB + grid.length - 1;

console.log(answer);