const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const grid = lines.map(line => line.split('').map(char => ({
    heatLoss: parseInt(char),
    n: [Infinity, Infinity, Infinity],
    e: [Infinity, Infinity, Infinity],
    s: [Infinity, Infinity, Infinity],
    w: [Infinity, Infinity, Infinity]
})));

const queuedSeeds = [
    {
        row: grid.length - 1,
        col: grid[0].length - 1,
        // heatLoss: grid[grid.length - 1][grid[0].length - 1].minHeatLoss
    }
];

grid[grid.length - 1][grid[0].length - 1] = {
    ...grid[grid.length - 1][grid[0].length - 1],
    n: [0, 0, 0],
    e: [0, 0, 0],
    s: [0, 0, 0],
    w: [0, 0, 0]
}

while (queuedSeeds.length) {
    const currentSeed = queuedSeeds.shift();
    const baseHeatLoss = currentSeed.heatLoss;
    // const baseDirection = currentSeed.dir;
    // const dir = { n: 's', s: 'n', w: 'e', e: 'w' }[baseDirection];

    // if (
    //     currentSeed.row < 0 ||
    //     currentSeed.row >= lines.length ||
    //     currentSeed.col < 0 ||
    //     currentSeed.col >= lines[0].length
    // ) continue;

    let curHeatLoss = baseHeatLoss;

    for (let i = 1; i <= 3; i++) {
        ['n', 'e', 's', 'w'].forEach(dir => {
            let stemRow = currentSeed.row;
            let stemCol = currentSeed.col;
            const relDir = { n: 's', s: 'n', w: 'e', e: 'w' }[dir];
            if (relDir === 'w') stemCol-=i;
            else if (relDir === 'e') stemCol+=i;
            else if (relDir === 'n') stemRow-=i;
            else if (relDir === 's') stemRow+=i;

            if (stemRow < 0 || stemRow >= lines.length || stemCol < 0 || stemCol >= lines[0].length) return;

            // tempSum = grid[currentSeed.row][currentSeed.col].heatLoss;
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
                for (let axis = 0; axis < 3; axis++) {
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

    //     const {
    //         heatLoss,
    //         minHeatLoss
    //     } = grid[curRow][curCol];

    //     if (curRow === 0 && curCol === 0 && curHeatLoss < answer) answer = curHeatLoss;
    //     curHeatLoss += heatLoss;
    //     if (curHeatLoss >= minHeatLoss) break;
    //     grid[curRow][curCol] = {
    //         heatLoss,
    //         minHeatLoss: curHeatLoss,
    //         direction: baseDirection
    //     };
    //     queuedSeeds.push({
    //         row: curRow,
    //         col: curCol,
    //         dir: 'ns'.includes(baseDirection) ? 'e' : 'n',
    //         heatLoss: curHeatLoss
    //     });
    //     queuedSeeds.push({
    //         row: curRow,
    //         col: curCol,
    //         dir: 'ns'.includes(baseDirection) ? 'w' : 's',
    //         heatLoss: curHeatLoss
    //     });
    }
}

console.log(grid[0]);