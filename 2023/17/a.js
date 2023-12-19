const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/example.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

const grid = lines.map(line => line.split('').map(char => ({ heatLoss: parseInt(char) })));

grid[grid.length - 1][grid[0].length - 1].minHeatLoss = grid[grid.length - 1][grid[0].length - 1].heatLoss;

const queuedSeeds = [
    {
        row: grid.length - 1,
        col: grid[0].length - 1,
        heatLoss: grid[grid.length - 1][grid[0].length - 1].minHeatLoss
    }
];

let answer = Infinity;

while (queuedSeeds.length) {
    const currentSeed = queuedSeeds.shift();
    // const { minHeatLoss: baseHeatLoss } = grid[currentSeed.row][currentSeed.col];
    const baseHeatLoss = currentSeed.heatLoss;
    const baseDirection = currentSeed.dir;
    const dir = { n: 's', s: 'n', w: 'e', e: 'w' }[baseDirection];

    if (
        currentSeed.row < 0 ||
        currentSeed.row >= lines.length ||
        currentSeed.col < 0 ||
        currentSeed.col >= lines[0].length
    ) continue;

    let curHeatLoss = baseHeatLoss;
    let curRow = currentSeed.row;
    let curCol = currentSeed.col;

    for (let i = 0; i < 3; i++) {
        if (dir === 'w') curCol--;
        else if (dir === 'e') curCol++;
        else if (dir === 'n') curRow--;
        else if (dir === 's') curRow++;

        // console.log({ curRow, curCol, dir });

        if (curRow < 0 || curRow >= lines.length || curCol < 0 || curCol >= lines[0].length) break;

        const {
            heatLoss,
            minHeatLoss
        } = grid[curRow][curCol];

        if (curRow === 0 && curCol === 0 && curHeatLoss < answer) answer = curHeatLoss;
        curHeatLoss += heatLoss;
        if (curHeatLoss >= minHeatLoss) break;
        grid[curRow][curCol] = {
            heatLoss,
            minHeatLoss: curHeatLoss,
            direction: baseDirection
        };
        queuedSeeds.push({
            row: curRow,
            col: curCol,
            dir: 'ns'.includes(baseDirection) ? 'e' : 'n',
            heatLoss: curHeatLoss
        });
        queuedSeeds.push({
            row: curRow,
            col: curCol,
            dir: 'ns'.includes(baseDirection) ? 'w' : 's',
            heatLoss: curHeatLoss
        });
    }
}

console.log(answer);