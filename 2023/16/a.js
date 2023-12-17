const fs = require('fs');

const file = fs.readFileSync(`${__dirname}/input.txt`, { encoding: 'utf-8'});

const lines = file.split('\r\n');

let paths = [{ row: 0, col: 0, dir: 'e', completed: false, history: [] }];

const splitters = [];

const debug = () => {
    let spaces = [];
    paths.forEach(path => {
        spaces = spaces.concat(path.history);
    });

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

while (paths.filter(path => !path.completed).length > 0) {
    paths = paths.reduce((acc, cur) => {
        if (cur.completed) return acc.concat(cur);
        if (cur.row < 0 || cur.col < 0 || cur.row >= lines.length || cur.col >= lines[0].length)
            return acc.concat({ ...cur, completed: true });

        let updatedCurrentPath = { ...cur };
        updatedCurrentPath.history = updatedCurrentPath.history.concat({ row: cur.row, col: cur.col });

        const newPaths = [];
        const currentTile = lines[cur.row][cur.col];
        if (currentTile === '|' && 'ew'.includes(cur.dir)) {
            if (splitters.find(item => item.row === cur.row && item.col === cur.col)) {
                return acc.concat({ ...cur, completed: true });
            } else {
                updatedCurrentPath.completed = true;
                splitters.push({ row: cur.row, col: cur.col });
                newPaths.push({ row: cur.row - 1, col: cur.col, dir: 'n', completed: false, history: [] });
                newPaths.push({ row: cur.row + 1, col: cur.col, dir: 's', completed: false, history: [] });
            }
        } else if (currentTile === '-' && 'ns'.includes(cur.dir)) {
            if (splitters.find(item => item.row === cur.row && item.col === cur.col)) {
                return acc.concat({ ...cur, completed: true });
            } else {
                updatedCurrentPath.completed = true;
                splitters.push({ row: cur.row, col: cur.col });
                newPaths.push({ row: cur.row, col: cur.col - 1, dir: 'w', completed: false, history: [] });
                newPaths.push({ row: cur.row, col: cur.col + 1, dir: 'e', completed: false, history: [] });
            }
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

        return acc.concat(updatedCurrentPath, ...newPaths);
    }, []);
    // debug();
}

const coveredSquares = [];
paths.forEach(({ history }) => {
    history.forEach(historyItem => {
        if (!coveredSquares.find(covered => covered.row === historyItem.row && covered.col === historyItem.col)) {
            coveredSquares.push(historyItem);
        }
    })
})

console.log(coveredSquares.length);