const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let rows = [];

lines.forEach(line => {
    rows.push(line.split(''))
});

let rocks = [];

rows.forEach((row, r) => {
    row.forEach((tile, c) => {
        if (tile === 'O') {
            rocks.push({
                r,
                c,
                history: []
            });
        }
    })
});

const calculateWeight = () => {
    let weight = 0;
    rows.forEach((row, i) => {
        const multiplier = rows.length - i;
        const count = row.filter(item => item === 'O').length;
        weight += multiplier * count;     
    });
    return weight;
}

const cache = {};

for (let i = 0; i < 1000; i++) {
    console.log(`${i}: ${calculateWeight()}`)
    const key = rows.map(row => row.join('')).join('|');
    if (cache[key]) {
        rows = cache[key].split('|').map(line => line.split(''));
        continue;
    }
    // north
    rocks.sort((a, b) => a.r - b.r);
    const northRocks = [];
    rocks.forEach(({ r, c, history }) => {
        let target = r;
        while (target > 0 && rows[target - 1][c] === '.') {
            target--;
        }
        northRocks.push({
            r: target,
            c,
            history: [...history, `${target},${c}`]
        });
        rows[r][c] = '.';
        rows[target][c] = 'O';
    });

    rocks = northRocks;

    // west
    rocks.sort((a, b) => a.c - b.c);
    const westRocks = [];
    rocks.forEach(({ r, c, history }) => {
        let target = c;
        while (target > 0 && rows[r][target - 1] === '.') {
            target--;
        }
        westRocks.push({
            r,
            c: target,
            history: [...history, `${r},${target}`]
        });
        rows[r][c] = '.';
        rows[r][target] = 'O';
    });

    rocks = westRocks;

    // south
    rocks.sort((a, b) => b.r - a.r);
    const southRocks = [];
    rocks.forEach(({ r, c, history }) => {
        let target = r;
        while (target < rows.length - 1 && rows[target + 1][c] === '.') {
            target++;
        }
        southRocks.push({
            r: target,
            c,
            history: [...history, `${target},${c}`]
        });
        rows[r][c] = '.';
        rows[target][c] = 'O';
    });

    rocks = southRocks;

    // east
    rocks.sort((a, b) => b.c - a.c);
    const eastRocks = [];
    rocks.forEach(({ r, c, history }) => {
        let target = c;
        while (target < rows[r].length - 1 && rows[r][target + 1] === '.') {
            target++;
        }
        eastRocks.push({
            r,
            c: target,
            history: [...history, `${r},${target}`]
        });
        rows[r][c] = '.';
        rows[r][target] = 'O';
    });

    rocks = eastRocks;

    const value = rows.map(row => row.join('')).join('|');
    cache[key] = value;
}

// console.log(rows.map(row => row.join('')).join('\n'))

// let sum = 0;



// console.log(sum);