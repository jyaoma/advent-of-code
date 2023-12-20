const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let grid = [['S']];
// let grid = [['#']];
let row = 0;
let col = 0;

const right = (quantity, nextDir) => {
    for (let i = 0; i < quantity; i++) {
        let char = '-';
        if (i === quantity - 1) {
            if (nextDir === 'U') {
                char = 'J'
            } else if (nextDir === 'D') {
                char = '7'
            }
        }
        col++;
        if (!grid[row][col]) {
            grid = grid.map(r => [...r, '.'])
        }
        grid[row][col] = char;
    }
}

const left = (quantity, nextDir) => {
    for (let i = 0; i < quantity; i++) {
        let char = '-';
        if (i === quantity - 1) {
            if (nextDir === 'U') {
                char = 'L'
            } else if (nextDir === 'D') {
                char = 'F'
            }
        }
        col--;
        if (col < 0) {
            grid = grid.map(r => ['.', ...r]);
            col = 0;
        }
        grid[row][col] = char;
    }
}

const down = (quantity, nextDir) => {
    for (let i = 0; i < quantity; i++) {
        let char = '|';
        if (i === quantity - 1) {
            if (nextDir === 'L') {
                char = 'J'
            } else if (nextDir === 'R') {
                char = 'L'
            }
        }
        row++;
        if (!grid[row]) {
            const newRow = new Array(grid[0].length).fill(null).map(() => '.');
            grid.push(newRow);
        }
        grid[row][col] = char;
    }
}

const up = (quantity, nextDir) => {
    for (let i = 0; i < quantity; i++) {
        let char = '|';
        if (i === quantity - 1) {
            if (nextDir === 'L') {
                char = '7'
            } else if (nextDir === 'R') {
                char = 'F'
            }
        }
        row--;
        if (row < 0) {
            const newRow = new Array(grid[0].length).fill(null).map(() => '.');
            grid.unshift(newRow);
            row = 0;
        }
        grid[row][col] = char;
    }
}

const functions = {
    'R': right,
    'L': left,
    'U': up,
    'D': down
}

const firstDirection = lines[0].split(' ')[0];

lines.forEach((line, i) => {
    const [dir, quantityStr] = line.split(' ');
    let nextDir = firstDirection;
    if (i + 1 < lines.length) nextDir = lines[i + 1].split(' ')[0];
    const quantity = parseInt(quantityStr);
    functions[dir](quantity, nextDir);
});

// console.log(grid.map(row => row.join('')).join('\n'));

const tiles = grid;
let counter = 0;
let isIn = false;
let tempJoint;

let lineLength = tiles[0].length;
for (let r = 0; r < tiles.length; r++) {
    isIn = false;
    tempJoint = null;
    for (let c = 0; c < lineLength; c++) {
        // const foundTile = pathCoords.find((coord) => coord.row === r && coord.col === c);
        const tile = tiles[r][c];

        if ('-|7FJL'.includes(tile)) counter++;
        if (tile === '.') {
            if (isIn) {
                counter++;
            }
        } else {
            if (tile === '|') isIn = !isIn;
            else if ('FL'.includes(tile)) {
                tempJoint = tile;
            }
            else if ('7J'.includes(tile)) {
                if ((tempJoint === 'L' && tile === '7') ||
                    (tempJoint === 'F' && tile === 'J')   
                ) isIn = !isIn;

                tempJoint = null;
            }
        }
    }
}

console.log(counter);