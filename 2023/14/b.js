const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/example.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const rows = [];

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

const checkPattern = testHistory => {
    if (testHistory.length % 4 !== 0) console.log('oof');
    else if (testHistory.length >= 8) {
        const maxCheck = Math.floor(testHistory.length / 8);
        for (let i = 0; i < maxCheck; i++) {
            const a = [];
            const b = [];
            let ptr0 = testHistory.length - ((i + i) * 8) + 3;
            let ptr1 = testHistory.length - ((i + i) * 4) + 3;
            while (ptr1 < testHistory.length) {
                a.push(testHistory[ptr0++]);
                b.push(testHistory[ptr1++]);
            }
            let isValid = true;
            a.forEach((pos, p) => {
                if (b[p] !== pos) isValid = false;
            });
            if (isValid) return i + 1;
        }
    }
    return 0;
}

for (let i = 0; i < 300; i++) {
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

    rocks = rocks.map(rock => {
        if (rock.pattern) return rock;
        const pattern = checkPattern(rock.history);
        if (pattern) return { ...rock, pattern };
        return rock;
    });
}

// console.log(rows.map(row => row.join('')).join('\n'))
console.log(rocks.filter(rock => !rock.pattern).length);
console.log(rocks[0]);

let sum = 0;

rows.forEach((row, i) => {
    const multiplier = rows.length - i;
    const count = row.filter(item => item === 'O').length;
    sum += multiplier * count;
});

// console.log(sum);