const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const grid = lines.map(line => line.split('').map(char => ({
    heatLoss: parseInt(char),
    n: [null, null, null, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
    e: [null, null, null, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
    s: [null, null, null, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
    w: [null, null, null, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
})));

const queuedSeeds = [
    {
        row: grid.length - 1,
        col: grid[0].length - 1
    }
];

grid[grid.length - 1][grid[0].length - 1] = {
    ...grid[grid.length - 1][grid[0].length - 1],
    n: [null, null, null, 0, 0, 0, 0, 0, 0, 0],
    e: [null, null, null, 0, 0, 0, 0, 0, 0, 0],
    s: [null, null, null, 0, 0, 0, 0, 0, 0, 0],
    w: [null, null, null, 0, 0, 0, 0, 0, 0, 0]
}

while (queuedSeeds.length) {
    // console.log(queuedSeeds.length);
    const currentSeed = queuedSeeds.shift();

    for (let i = 4; i <= 10; i++) {
        ['n', 'e', 's', 'w'].forEach(dir => {
            let stemRow = currentSeed.row;
            let stemCol = currentSeed.col;
            const relDir = { n: 's', s: 'n', w: 'e', e: 'w' }[dir];
            if (relDir === 'w') stemCol-=i;
            else if (relDir === 'e') stemCol+=i;
            else if (relDir === 'n') stemRow-=i;
            else if (relDir === 's') stemRow+=i;

            if (stemRow < 0 || stemRow >= lines.length || stemCol < 0 || stemCol >= lines[0].length) return;

            let runningSum = 0;
            let tempSum = 0;
            for (let j = 1; j <= i; j++) {
                let tempRow = stemRow;
                let tempCol = stemCol;
                
                if (dir === 'w') tempCol-=j;
                else if (dir === 'e') tempCol+=j;
                else if (dir === 'n') tempRow-=j;
                else if (dir === 's') tempRow+=j;
                if (tempRow < 0 || tempRow >= lines.length || tempCol < 0 || stemCol >= lines[0].length) break;
                const tempTile = grid[tempRow][tempCol];
                let min = Infinity;
                for (let axis = 3; axis < 10; axis++) {
                    if ('ew'.includes(dir)) {
                        if (tempTile.n[axis] < min) min = tempTile.n[axis];
                        if (tempTile.s[axis] < min) min = tempTile.s[axis];
                    } else if ('ns'.includes(dir)) {
                        if (tempTile.e[axis] < min) min = tempTile.e[axis];
                        if (tempTile.w[axis] < min) min = tempTile.w[axis];
                    }
                }

                runningSum += grid[tempRow][tempCol].heatLoss;
                tempSum = runningSum + min;
            }
            if (tempSum < grid[stemRow][stemCol][dir][i - 1]) {
                grid[stemRow][stemCol][dir][i - 1] = tempSum;
                queuedSeeds.push({ row: stemRow, col: stemCol });
            }
        });
    }
}

console.log(grid[0]);