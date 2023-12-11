const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

// figure out how many rows, cols
const numRows = lines.length;
const numCols = lines[0].length;

// keep track of which rows/cols are empty
const emptyRows = new Array(numRows).fill(true);
const emptyCols = new Array(numCols).fill(true);

// map through each line, add each galaxy to array, mark non empty lines
let galaxies = [];
lines.forEach((line, rowNum) => {
    const spaces = line.split('');
    spaces.forEach((space, colNum) => {
        if (space === '#') {
            galaxies.push({ r: rowNum, c: colNum });
            emptyRows[rowNum] = false;
            emptyCols[colNum] = false;
        }
    });
});

// move galaxies
const emptyRowNumbers = [];
emptyRows.forEach((row, i) => {
    if (row) emptyRowNumbers.push(i);
});
const emptyColNumbers = [];
emptyCols.forEach((col, i) => {
    if (col) emptyColNumbers.push(i);
});

galaxies = galaxies.map(galaxy => ({
    r: galaxy.r + emptyRowNumbers.filter(n => n < galaxy.r).length,
    c: galaxy.c + emptyColNumbers.filter(n => n < galaxy.c).length
}));

// two indexes to map through each pair of galaxies
let sum = 0;
for (let ptr1 = 0; ptr1 < galaxies.length - 1; ptr1++) {
    for (let ptr2 = ptr1 + 1; ptr2 < galaxies.length; ptr2++) {
        // calculate length between each pair and add to sum
        sum += Math.abs(galaxies[ptr1].r - galaxies[ptr2].r) + Math.abs(galaxies[ptr1].c - galaxies[ptr2].c)
    }
}

console.log(sum);