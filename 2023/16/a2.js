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

let testPath = { row: 0, col: 0, dir: 'e', completed: false, history: [] };
while (!testPath.completed) testPath = compute(testPath);

const includedSplitters = [testPath.splitter];
const coveredTiles = testPath.history;
const queuedSplitters = [testPath.splitter];
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

console.log(coveredTiles.length);