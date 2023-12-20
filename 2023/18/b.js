const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let lastCoord = [0, 0];
let row = 0;
let col = 0;

let sum = 0;

const right = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        col++;
        sum += lastCoord[1] * row - lastCoord[0] * col
        lastCoord = [row, col];
    }
}

const left = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        col--;
        sum += lastCoord[1] * row - lastCoord[0] * col
        lastCoord = [row, col];
    }
}

const down = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        row++;
        sum += lastCoord[1] * row - lastCoord[0] * col
        lastCoord = [row, col];
    }
}

const up = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        row--;
        sum += lastCoord[1] * row - lastCoord[0] * col
        lastCoord = [row, col];
    }
}

const functions = [right, down, left, up];

let boundaryPoints = 0;
lines.forEach(line => {
    const dirHex = line[line.length - 2];
    const quantityHex = line.slice(line.length - 7, line.length - 2);
    const quantity = parseInt(quantityHex, 16);
    boundaryPoints += quantity;
    functions[parseInt(dirHex, 10)](quantity);
});

// shoelace formula
// for (let i = 0; i < grid.length - 1; i++) {
//     sum += grid[i][1] * grid[i + 1][0] - grid[i][0] * grid[i + 1][1];
// }

const shoelaceArea = Math.abs(sum / 2);
const picksB = (shoelaceArea - boundaryPoints / 2 + 1);
const answer = picksB + boundaryPoints;
console.log(answer);