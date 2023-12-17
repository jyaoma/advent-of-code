const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let paths = [];

const splitters = [];

const debug = (spaces) => {
    const canvas = new Array(lines.length)
        .fill(null)
        .map(() => new Array(lines[0].length)
            .fill(null)
            .map(() => '.'));

    spaces.forEach(space => {
        canvas[space.row][space.col] = '#'
    });

    canvas.forEach(row => {
        console.log(row.join(''))
    });
    console.log();
}

lines.forEach((line, row) => {
    line.split('').forEach((tile, col) => {
        if (tile === '-') {
            splitters.push({ row, col });
            paths.push({
                origin: { row, col },
                row,
                col: col - 1,
                dir: 'w',
                completed: false,
                history: [],
                splitter: null
            });
            paths.push({
                origin: { row, col },
                row,
                col: col + 1,
                dir: 'e',
                completed: false,
                history: [],
                splitter: null
            });
        } else if (tile === '|') {
            splitters.push({ row, col });
            paths.push({
                origin: { row, col },
                row: row - 1,
                col,
                dir: 'n',
                completed: false,
                history: [],
                splitter: null
            });
            paths.push({
                origin: { row, col },
                row: row + 1,
                col,
                dir: 's',
                completed: false,
                history: [],
                splitter: null
            });
        }
    });
});

const compute = cur => {
    if (cur.completed) return cur;
    if (cur.row < 0 || cur.col < 0 || cur.row >= lines.length || cur.col >= lines[0].length)
        return { ...cur, completed: true };

    let updatedCurrentPath = { ...cur };
    updatedCurrentPath.history = updatedCurrentPath.history.concat({ row: cur.row, col: cur.col });

    const currentTile = lines[cur.row][cur.col];
    if (
        (currentTile === '|' && 'ew'.includes(cur.dir)) ||
        (currentTile === '-' && 'ns'.includes(cur.dir))
    ) {
        return { ...cur, completed: true, splitter: { row: cur.row, col: cur.col } };
    } else if (currentTile === '/') {
        switch (cur.dir) {
            case 'e':
                updatedCurrentPath.dir = 'n';
                break;
            case 'w':
                updatedCurrentPath.dir = 's';
                break;
            case 'n':
                updatedCurrentPath.dir = 'e';
                break;
            case 's':
                updatedCurrentPath.dir = 'w';
                break;
        }
    } else if (currentTile === '\\') {
        switch (cur.dir) {
            case 'e':
                updatedCurrentPath.dir = 's';
                break;
            case 'w':
                updatedCurrentPath.dir = 'n';
                break;
            case 'n':
                updatedCurrentPath.dir = 'w';
                break;
            case 's':
                updatedCurrentPath.dir = 'e';
                break;
        }
    }
    if (
        './\\'.includes(currentTile) ||
        (currentTile === '-' && 'ew'.includes(cur.dir)) ||
        (currentTile === '|' && 'ns'.includes(cur.dir))
    ) {
        switch (updatedCurrentPath.dir) {
            case 'e':
                updatedCurrentPath.col++;
                break;
            case 'w':
                updatedCurrentPath.col--;
                break;
            case 'n':
                updatedCurrentPath.row--;
                break;
            case 's':
                updatedCurrentPath.row++;
                break;
        }
    }

    return updatedCurrentPath;
}

while (paths.filter(path => !path.completed).length > 0) {
    paths = paths.map(compute);
}

const computeScenario = ( row, col, dir ) => {
    let testPath = { row, col, dir, completed: false, history: [] };
    while (!testPath.completed) testPath = compute(testPath);

    const includedSplitters = [testPath.splitter];
    const coveredTiles = testPath.history;
    const queuedSplitters = [];
    if (testPath.splitter) {
        queuedSplitters.push(testPath.splitter);
        coveredTiles.push({ row: testPath.splitter.row, col: testPath.splitter.col });
    };
    while (queuedSplitters.length) {
        const nextSplitter = queuedSplitters.shift();
        const relevantPaths = paths.filter(({ origin }) => origin.row === nextSplitter.row && origin.col === nextSplitter.col);
        relevantPaths.forEach(path => {
            path.history.forEach(tile => {
                if (!coveredTiles.find(coveredTile => coveredTile.row === tile.row && coveredTile.col === tile.col))
                    coveredTiles.push({ row: tile.row, col: tile.col });
            });
            if (path.splitter) {
                if (!coveredTiles.find(coveredTile => coveredTile.row === path.splitter.row && coveredTile.col === path.splitter.col)) {
                    coveredTiles.push({ row: path.splitter.row, col: path.splitter.col });
                }
                if (!includedSplitters.find(includedSplitter => includedSplitter.row === path.splitter.row && includedSplitter.col === path.splitter.col)) {
                    queuedSplitters.push(path.splitter);
                    includedSplitters.push(path.splitter);
                }
            }
        })
    }

    // debug(coveredTiles);

    return coveredTiles.length;
}

let max = 0;
for (let r = 0; r < lines.length; r++) {
    const toEast = computeScenario(r, 0, 'e');
    const toWest = computeScenario(r, lines[0].length - 1, 'w');
    if (toEast > max) max = toEast;
    if (toWest > max) max = toWest;
}
for (let c = 0; c < lines[0].length; c++) {
    const toSouth = computeScenario(0, c, 's');
    const toNorth = computeScenario(lines.length - 1, c, 'n');
    if (toSouth > max) max = toSouth;
    if (toNorth > max) max = toNorth;
}

console.log(max);