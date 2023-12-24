const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let startingPosition;
const grid = lines.map((line, r) => {
    if (line.includes('S')) startingPosition = [r, line.indexOf('S')];
    return line.split('');
});

let nextQueuedPositions = [startingPosition];
let queuedPositions = [];

for (let i = 0; i < 64; i++) {
    queuedPositions = nextQueuedPositions;
    nextQueuedPositions = [];

    queuedPositions.forEach(([row, col]) => {
        if (
            row < grid.length - 1 &&
            grid[row + 1][col] !== '#' &&
            !nextQueuedPositions.find(queued => queued[0] === row + 1 && queued[1] === col)
        ) {
            nextQueuedPositions.push([row + 1, col]);
        }

        if (
            row > 0 &&
            grid[row - 1][col] !== '#' &&
            !nextQueuedPositions.find(queued => queued[0] === row - 1 && queued[1] === col)
        ) {
            nextQueuedPositions.push([row - 1, col]);
        }

        if (
            col < grid[0].length - 1 &&
            grid[row][col + 1] !== '#' &&
            !nextQueuedPositions.find(queued => queued[0] === row && queued[1] === col + 1)
        ) {
            nextQueuedPositions.push([row, col + 1]);
        }

        if (
            col > 0 &&
            grid[row][col - 1] !== '#' &&
            !nextQueuedPositions.find(queued => queued[0] === row && queued[1] === col - 1)
        ) {
            nextQueuedPositions.push([row, col - 1]);
        }
    });
};

console.log(nextQueuedPositions.length);