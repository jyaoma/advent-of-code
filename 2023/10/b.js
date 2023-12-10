const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let startLocation = [-1, -1];
const tiles = lines.map((line, i) => {
    if (line.includes('S')) startLocation = [i, line.indexOf('S')];
    return line.split('')
});

let direction;
let currentLocation = startLocation;
let started = false;
const pathCoords = [
    {
        row: startLocation[0],
        col: startLocation[1]
    }
]

if (startLocation[0] > 0 && '|7F'.includes(tiles[startLocation[0] - 1][startLocation[1]])) {
    direction = 'up';
} else if (startLocation[0] < lines.length - 1 && '|JL'.includes(tiles[startLocation[0] + 1][startLocation[1]])) {
    direction = 'down';
} else if (startLocation[1] > 0 && '-J7'.includes(tiles[startLocation[0]][startLocation[1] - 1])) {
    direction = 'left';
}

const startDirections = [direction.slice(), null];

while (!started || tiles[currentLocation[0]][currentLocation[1]] !== 'S') {
    started = true;
    if (direction === 'up') currentLocation[0]--;
    if (direction === 'down') currentLocation[0]++;
    if (direction === 'left') currentLocation[1]--;
    if (direction === 'right') currentLocation[1]++;
    startDirections[1] = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left'
    }[direction];

    const tile = tiles[currentLocation[0]][currentLocation[1]];

    pathCoords.push({
        row: currentLocation[0],
        col: currentLocation[1],
        tile
    });

    if (direction === 'up') {
        if (tile === '7') direction = 'left';
        else if (tile === 'F') direction = 'right';
    } else if (direction === 'down') {
        if (tile === 'J') direction = 'left';
        else if (tile === 'L') direction = 'right';
    } else if (direction === 'left') {
        if (tile === 'F') direction = 'down';
        else if (tile === 'L') direction = 'up';
    } else if (direction === 'right') {
        if (tile === '7') direction = 'down';
        else if (tile === 'J') direction = 'up';
    }
}

pathCoords.pop();

let sShape;
if (startDirections.includes('up')) {
    if (startDirections.includes('down')) sShape = '|';
    else if (startDirections.includes('left')) sShape = 'J';
    else if (startDirections.includes('right')) sShape = 'L';
} else if (startDirections.includes('right')) {
    if (startDirections.includes('down')) sShape = 'F';
    else if (startDirections.includes('left')) sShape = '-';
} else if (startDirections.includes('right') && startDirections.includes('down')) sShape = '7';

pathCoords[0].tile = sShape;

let counter = 0;
let isIn = false;
let tempJoint;

let lineLength = tiles[0].length;
for (let r = 0; r < tiles.length; r++) {
    isIn = false;
    tempJoint = null;
    for (let c = 0; c < lineLength; c++) {
        const foundTile = pathCoords.find((coord) => coord.row === r && coord.col === c);

        if (!foundTile) {
            if (isIn) {
                // console.log({ r, c });
                counter++;
            }
        } else {
            if (foundTile.tile === '|') isIn = !isIn;
            else if ('FL'.includes(foundTile.tile)) {
                tempJoint = foundTile.tile;
            }
            else if ('7J'.includes(foundTile.tile)) {
                if ((tempJoint === 'L' && foundTile.tile === '7') ||
                    (tempJoint === 'F' && foundTile.tile === 'J')   
                ) isIn = !isIn;

                tempJoint = null;
            }
            // console.log({ tile: foundTile.tile, isIn });
        }
    }
}

console.log(counter);