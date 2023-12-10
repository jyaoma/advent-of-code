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
let counter = 0;
let started = false;

if (startLocation[0] > 0 && '|7F'.includes(tiles[startLocation[0] - 1][startLocation[1]])) {
    direction = 'up';
} else if (startLocation[0] < lines.length - 1 && '|JL'.includes(tiles[startLocation[0] + 1][startLocation[1]])) {
    direction = 'down';
} else if (startLocation[1] > 0 && '-J7'.includes(tiles[startLocation[0]][startLocation[1] - 1])) {
    direction = 'left';
}

console.log(direction);

while (!started || tiles[currentLocation[0]][currentLocation[1]] !== 'S') {
    started = true;
    counter++;
    if (direction === 'up') currentLocation[0]--;
    if (direction === 'down') currentLocation[0]++;
    if (direction === 'left') currentLocation[1]--;
    if (direction === 'right') currentLocation[1]++;

    const tile = tiles[currentLocation[0]][currentLocation[1]];

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

console.log(counter / 2);