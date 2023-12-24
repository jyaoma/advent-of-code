const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let startingPosition;
lines.forEach((line, r) => {
    if (line.includes('S')) startingPosition = [r, line.indexOf('S')];
})

const calculateMax = (start, filterFn) => {
    let nextQueuedPositions = [start];
    let queuedPositions = [];
    let lastUnseen = lines.length * lines[0].length;

    const grid = lines.map(line => line.split('').map(char => ({ char, distance: -1 })));

    let i = 1;
    grid[start[0]][start[1]].distance = 0;
    while (grid.flatMap(row => row).filter(item => item.char !== '#' && item.distance === -1).length !== lastUnseen) {
        lastUnseen = grid.flatMap(row => row).filter(item => item.char !== '#' && item.distance === -1).length;

        queuedPositions = nextQueuedPositions;
        nextQueuedPositions = [];

        queuedPositions.forEach(([row, col]) => {
            if (
                row < grid.length - 1 &&
                grid[row + 1][col].char !== '#' &&
                !nextQueuedPositions.find(queued => queued[0] === row + 1 && queued[1] === col) &&
                grid[row + 1][col].distance === -1
            ) {
                nextQueuedPositions.push([row + 1, col]);
                grid[row + 1][col].distance = i;
                // console.log({ row: row + 1, col, i })
            }

            if (
                row > 0 &&
                grid[row - 1][col].char !== '#' &&
                !nextQueuedPositions.find(queued => queued[0] === row - 1 && queued[1] === col) &&
                grid[row - 1][col].distance === -1
            ) {
                nextQueuedPositions.push([row - 1, col]);
                grid[row - 1][col].distance = i;
                // console.log({ row: row - 1, col, i })
            }

            if (
                col < grid[0].length - 1 &&
                grid[row][col + 1].char !== '#' &&
                !nextQueuedPositions.find(queued => queued[0] === row && queued[1] === col + 1) &&
                grid[row][col + 1].distance === -1
            ) {
                nextQueuedPositions.push([row, col + 1]);
                grid[row][col + 1].distance = i;
                // console.log({ row, col: col + 1, i })
            }

            if (
                col > 0 &&
                grid[row][col - 1].char !== '#' &&
                !nextQueuedPositions.find(queued => queued[0] === row && queued[1] === col - 1) &&
                grid[row][col - 1].distance === -1
            ) {
                nextQueuedPositions.push([row, col - 1]);
                grid[row][col - 1].distance = i;
                // console.log({ row, col: col - 1, i })
            }
        });
        i++;
    };
    // grid.forEach(row => {
    //     console.log(row.map(item => {
    //         if (item.distance === -1) return '### ';
    //         if (item.distance < 10) return `00${item.distance} `;
    //         else if (item.distance < 100) return `0${item.distance} `;
    //         return `${item.distance} `;
    //     }).join(''))
    // });
    // console.log();
    // return {
    //     a: grid.flatMap(row => row).filter(item => item.distance >= 0 && item.distance < 65).length,
    //     b: grid.flatMap(row => row).filter(item => item.distance >= 0 && item.distance <= 195).length
    // };
    return grid.flatMap(row => row).filter(filterFn).length
}

const oddSquare = calculateMax(startingPosition, item => item.distance % 2 === 1);
const evenSquare = calculateMax(startingPosition, item => item.distance % 2 === 0);
const seA = calculateMax([0, 0], item => item.distance % 2 === 0 && item.distance < 65);
const seB = calculateMax([0, 0], item => item.distance % 2 === 1 && item.distance <= 135);
const nwA = calculateMax([lines.length - 1, lines[0].length - 1], item => item.distance % 2 === 0 && item.distance < 65);
const nwB = calculateMax([lines.length - 1, lines[0].length - 1], item => item.distance % 2 === 1 && item.distance <= 135);
const swA = calculateMax([0, lines[0].length - 1], item => item.distance % 2 === 0 && item.distance < 65);
const swB = calculateMax([0, lines[0].length - 1], item => item.distance % 2 === 1 && item.distance <= 135);
const neA = calculateMax([lines.length - 1, 0], item => item.distance % 2 === 0 && item.distance < 65);
const neB = calculateMax([lines.length - 1, 0], item => item.distance % 2 === 1 && item.distance <= 135);

const south = calculateMax([0, (lines[0].length - 1) / 2], item => item.distance % 2 === 1 && item.distance <= 130);
const north = calculateMax([lines.length - 1, (lines[0].length - 1) / 2], item => item.distance % 2 === 1 && item.distance <= 130);
const east = calculateMax([(lines[0].length - 1) / 2, 0], item => item.distance % 2 === 1 && item.distance <= 130);
const west = calculateMax([(lines[0].length - 1) / 2, lines[0].length - 1], item => item.distance % 2 === 1 && item.distance <= 130);

const n = 202300;
let fullSquares = 4*(n - 1) + 1;
for (let i = 1; i < (n - 1); i++) {
    fullSquares += 4*i;
};
const numOddSquares = n ** 2;
const numEvenSquares = (n-1) ** 2;

const evenSquares = numEvenSquares * evenSquare;
const oddSquares = numOddSquares * oddSquare;
// const north = 11476;
// const south = 11458;
// const east = 11449;
// const west = 11485;

// const neA = 1904;
// const neB = 13356;
// const seA = 1897;
// const seB = 13380;
// const nwA = 1906;
// const nwB = 13389;
// const swA = 1931;
// const swB = 13383;

const A = n * (neA + nwA + seA + swA);
const B = (n - 1) * (neB + nwB + seB + swB);

console.log(evenSquares + oddSquares + north + south + east + west + A + B);
